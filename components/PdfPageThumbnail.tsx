import React, { useEffect, useRef, useState } from 'react';
import { Trash2, FileText, RotateCw } from 'lucide-react';

interface PdfPageThumbnailProps {
  pdfJsDoc: any;
  pageIndex: number;
  isSelected: boolean;
  rotation?: number; // degrees
  onClick: (event: React.MouseEvent) => void;
  mode?: 'delete' | 'rotate';
  width?: number;
}

const PdfPageThumbnailComponent: React.FC<PdfPageThumbnailProps> = ({
  pdfJsDoc,
  pageIndex,
  isSelected,
  rotation = 0,
  onClick,
  mode = 'delete',
  width = 300
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for Lazy Loading
  useEffect(() => {
    const node = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stop observing once visible to render and keep rendered
            if (node) {
              observer.unobserve(node);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Start loading when 200px away from viewport
        threshold: 0.01
      }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  // PDF Rendering Logic
  useEffect(() => {
    if (!isVisible) return; // Only render if visible

    let mounted = true;
    let renderTask: any = null;

    const renderPage = async () => {
      // Reset states at the start of each render attempt
      if (mounted) {
        setError(false);
        setLoading(true);
      }

      if (!pdfJsDoc) {
        // If no document, just stay in loading state - it might arrive later
        // Don't set error here as the doc might be loading
        return;
      }

      if (!canvasRef.current) return;

      try {
        const page = await pdfJsDoc.getPage(pageIndex + 1);

        if (!mounted) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const desiredWidth = width;
        const viewport = page.getViewport({ scale: 1 });
        const scale = desiredWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        if (context) {
          renderTask = page.render({
            canvasContext: context,
            viewport: scaledViewport,
          });
          await renderTask.promise;
        }

        if (mounted) setLoading(false);
      } catch (err) {
        console.error(`Error rendering page ${pageIndex + 1}:`, err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      mounted = false;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfJsDoc, pageIndex, isVisible, width]); // Depend on isVisible and width for zoom

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`
        relative aspect-[3/4] rounded-lg border-2 cursor-pointer overflow-hidden transition-all duration-200 group bg-white dark:bg-gray-800
        ${isSelected && mode === 'delete'
          ? 'border-canada-red shadow-lg ring-2 ring-canada-red/20 transform scale-[0.98]'
          : 'border-gray-200 dark:border-gray-700 hover:border-canada-red/50 hover:shadow-md'}
        ${mode === 'rotate' ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
      `}
      role="button"
      aria-label={`${mode === 'delete' ? 'Delete' : 'Rotate'} page ${pageIndex + 1}`}
      aria-pressed={isSelected}
    >
      {/* Canvas for PDF Page - Wrapped for Rotation */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <canvas
          ref={canvasRef}
          className={`object-contain max-w-full max-h-full ${error ? 'hidden' : ''}`}
          role="img"
          aria-label={`Preview of PDF page ${pageIndex + 1}`}
        />
      </div>

      {/* Loading State */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 z-10">
          <div className="w-6 h-6 border-2 border-canada-red border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error / Fallback State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-400 p-2 text-center">
          <div className="w-12 h-12 mb-2 text-gray-300 dark:text-gray-600">
            <FileText className="w-full h-full" />
          </div>
          <span className="text-xs font-medium">Page {pageIndex + 1}</span>
        </div>
      )}

      {!error && (
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-20">
          Page {pageIndex + 1}
        </div>
      )}

      {/* Mode Specific Overlays */}
      <div className={`
        absolute inset-0 flex items-center justify-center transition-opacity duration-200 z-30 pointer-events-none
        ${isSelected && mode === 'delete' ? 'bg-canada-red/10 opacity-100' : 'bg-black/0 opacity-0 group-hover:opacity-10'}
      `}>
        {mode === 'delete' && isSelected && (
          <div className="bg-canada-red text-white p-3 rounded-full shadow-lg">
            <Trash2 size={24} />
          </div>
        )}
        {mode === 'rotate' && (
          <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <RotateCw size={24} />
          </div>
        )}
      </div>

      {/* Rotation Indicator Badge */}
      {rotation > 0 && mode === 'rotate' && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-20 flex items-center gap-1">
          <RotateCw size={10} /> {rotation}°
        </div>
      )}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export const PdfPageThumbnail = React.memo(PdfPageThumbnailComponent, (prevProps, nextProps) => {
  // Custom comparison - only re-render if these specific props change
  return prevProps.pageIndex === nextProps.pageIndex &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.rotation === nextProps.rotation &&
    prevProps.pdfJsDoc === nextProps.pdfJsDoc &&
    prevProps.mode === nextProps.mode &&
    prevProps.width === nextProps.width;
});