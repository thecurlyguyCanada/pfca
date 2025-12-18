import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MobileZoomControlsProps {
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset?: () => void;
  showReset?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export const MobileZoomControls: React.FC<MobileZoomControlsProps> = ({
  zoom,
  minZoom = 0.5,
  maxZoom = 3,
  onZoomIn,
  onZoomOut,
  onReset,
  showReset = false,
  position = 'bottom-right'
}) => {
  const positionClasses = {
    'bottom-right': 'right-4 bottom-4',
    'bottom-left': 'left-4 bottom-4',
    'bottom-center': 'left-1/2 -translate-x-1/2 bottom-4'
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 md:hidden flex items-center gap-2 bg-white dark:bg-gray-900 rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 p-1.5`}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <button
        onClick={onZoomOut}
        disabled={zoom <= minZoom}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 active:bg-gray-200 dark:active:bg-gray-700 disabled:opacity-40 disabled:active:bg-gray-100 dark:disabled:active:bg-gray-800 transition-colors touch-manipulation"
        aria-label="Zoom Out"
      >
        <ZoomOut size={22} />
      </button>

      <span className="text-sm font-bold text-gray-600 dark:text-gray-300 min-w-[50px] text-center tabular-nums">
        {Math.round(zoom * 100)}%
      </span>

      <button
        onClick={onZoomIn}
        disabled={zoom >= maxZoom}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 active:bg-gray-200 dark:active:bg-gray-700 disabled:opacity-40 disabled:active:bg-gray-100 dark:disabled:active:bg-gray-800 transition-colors touch-manipulation"
        aria-label="Zoom In"
      >
        <ZoomIn size={22} />
      </button>

      {showReset && onReset && (
        <button
          onClick={onReset}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 active:bg-gray-200 dark:active:bg-gray-700 transition-colors touch-manipulation ml-1"
          aria-label="Reset Zoom"
        >
          <RotateCcw size={20} />
        </button>
      )}
    </div>
  );
};
