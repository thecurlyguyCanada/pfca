import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, X, AlertCircle, CheckCircle2, Shield, Trash2, RotateCw, Image, BookOpen, ArrowLeft, ArrowRight, PenTool, RotateCcw, RefreshCcw, ScanLine, LayoutGrid, Search, MoveRight, Eye, BarChart } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MapleLeaf } from './components/MapleLeaf';
import { PricingPage, PrivacyPage, TermsPage, SorryPolicyPage, HowToPage, SupportLocalPage, MakePdfFillablePage } from './components/StaticPages.tsx';
import { DeletePdfPagesGuide, EpubToPdfGuide, HeicToPdfGuide, MakeFillableGuide, OcrPdfGuide, OrganizePdfGuide, PdfToEpubGuide, RotatePdfGuide, UltimatePdfGuide, AccessibilityGuide, PdfSeoGuide } from './components/pages/guides';
import { PdfPageThumbnail } from './components/PdfPageThumbnail';
import { loadPdfDocument, getPdfJsDocument, deletePagesFromPdf, rotatePdfPages, convertHeicToPdf, convertPdfToEpub, convertEpubToPdf, formatFileSize, makePdfFillable } from './utils/pdfUtils';
import { translations, Language } from './utils/i18n';
import { SEO } from './components/SEO';

enum AppState {
  HOME,
  SELECTING,
  PROCESSING,
  DONE,
  ERROR
}

type CurrentView = 'HOME' | 'PRICING' | 'PRIVACY' | 'TERMS' | 'SORRY' | 'HOW_TO' | 'SUPPORT' | 'MAKE_FILLABLE_INFO' | 'TOOL_PAGE' | 'GUIDE_DELETE_PAGES' | 'GUIDE_ROTATE' | 'GUIDE_HEIC_TO_PDF' | 'GUIDE_EPUB_TO_PDF' | 'GUIDE_PDF_TO_EPUB' | 'GUIDE_FILLABLE' | 'GUIDE_OCR' | 'GUIDE_ORGANIZE' | 'GUIDE_ULTIMATE' | 'GUIDE_ACCESSIBILITY' | 'GUIDE_SEO';

enum ToolType {
  DELETE = 'DELETE',
  ROTATE = 'ROTATE',
  HEIC_TO_PDF = 'HEIC_TO_PDF',
  EPUB_TO_PDF = 'EPUB_TO_PDF',
  PDF_TO_EPUB = 'PDF_TO_EPUB',
  MAKE_FILLABLE = 'MAKE_FILLABLE',
  OCR = 'OCR',
  ORGANIZE = 'ORGANIZE'
}

// Helper to safely update history without crashing in sandboxed environments
const safePushState = (data: any, unused: string, url?: string | URL | null) => {
  if (typeof window !== 'undefined' && window.history) {
    try {
      window.history.pushState(data, unused, url);
    } catch (e) {
      console.debug('Navigation URL update suppressed due to environment restrictions.', e);
    }
  }
};

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<CurrentView>('HOME');
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [currentTool, setCurrentTool] = useState<ToolType | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pdfJsDoc, setPdfJsDoc] = useState<any>(null);

  // Tool Specific State
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const lastSelectedPageRef = useRef<number | null>(null);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');
  const [errorKey, setErrorKey] = useState<keyof typeof translations['en'] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  // Routing Logic
  const syncStateFromUrl = () => {
    const path = window.location.pathname;

    // Map paths to tools
    if (path === '/delete-pdf-pages') {
      setCurrentTool(ToolType.DELETE);
      setView('TOOL_PAGE');
      // If we are deep-linked, we might be in selecting mode, but if no file, stay selecting
      setAppState(AppState.SELECTING);
    } else if (path === '/rotate-pdf') {
      setCurrentTool(ToolType.ROTATE);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
    } else if (path === '/heic-to-pdf') {
      setCurrentTool(ToolType.HEIC_TO_PDF);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
    } else if (path === '/epub-to-pdf') {
      setCurrentTool(ToolType.EPUB_TO_PDF);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
    } else if (path === '/pdf-to-epub') {
      setCurrentTool(ToolType.PDF_TO_EPUB);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
    } else if (path === '/make-pdf-fillable') {
      setCurrentTool(ToolType.MAKE_FILLABLE);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
    } else if (path === '/ocr-pdf') {
      setCurrentTool(ToolType.OCR);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
    } else if (path === '/organize-pdf') {
      setCurrentTool(ToolType.ORGANIZE);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
    } else if (path === '/pricing') setView('PRICING');
    else if (path === '/privacy') setView('PRIVACY');
    else if (path === '/terms') setView('TERMS');
    else if (path === '/howto') setView('HOW_TO');
    else if (path === '/support') setView('SUPPORT');
    else if (path === '/how-to-make-a-pdf-fillable') setView('MAKE_FILLABLE_INFO');
    else if (path === '/sorry') setView('SORRY');
    // Guides
    else if (path === '/guides/delete-pdf-pages') setView('GUIDE_DELETE_PAGES');
    else if (path === '/guides/rotate-pdf') setView('GUIDE_ROTATE');
    else if (path === '/guides/heic-to-pdf') setView('GUIDE_HEIC_TO_PDF');
    else if (path === '/guides/epub-to-pdf') setView('GUIDE_EPUB_TO_PDF');
    else if (path === '/guides/pdf-to-epub') setView('GUIDE_PDF_TO_EPUB');
    else if (path === '/guides/make-pdf-fillable') setView('GUIDE_FILLABLE');
    else if (path === '/guides/ocr-pdf') setView('GUIDE_OCR');
    else if (path === '/guides/organize-pdf') setView('GUIDE_ORGANIZE');
    else if (path === '/guides/ultimate-pdf-guide') setView('GUIDE_ULTIMATE');
    else if (path === '/guides/pdf-accessibility-canada') setView('GUIDE_ACCESSIBILITY');
    else if (path === '/guides/pdf-seo-guide') setView('GUIDE_SEO');
    else {
      // Default to Home if root or unknown
      setView('HOME');
      setAppState(AppState.HOME);
      setCurrentTool(null);
    }
  };

  useEffect(() => {
    // Initial sync
    syncStateFromUrl();

    // Listen for back/forward
    const handlePopState = () => {
      syncStateFromUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = (newView: CurrentView, path?: string) => {
    setView(newView);
    if (newView === 'HOME') {
      setAppState(AppState.HOME);
      setCurrentTool(null);
      safePushState({}, '', '/');
    } else if (path) {
      safePushState({}, '', path);
    }
    window.scrollTo(0, 0);
  };

  const tools = [
    { id: ToolType.DELETE, icon: Trash2, title: t.toolDelete, desc: t.toolDeleteDesc, accept: '.pdf', path: '/delete-pdf-pages' },
    { id: ToolType.ROTATE, icon: RotateCw, title: t.toolRotate, desc: t.toolRotateDesc, accept: '.pdf', path: '/rotate-pdf' },
    { id: ToolType.MAKE_FILLABLE, icon: PenTool, title: t.toolMakeFillable, desc: t.toolMakeFillableDesc, accept: '.pdf', path: '/make-pdf-fillable' },
    { id: ToolType.HEIC_TO_PDF, icon: Image, title: t.toolHeic, desc: t.toolHeicDesc, accept: '.heic', path: '/heic-to-pdf' },
    { id: ToolType.EPUB_TO_PDF, icon: BookOpen, title: t.toolEpubToPdf, desc: t.toolEpubToPdfDesc, accept: '.epub', path: '/epub-to-pdf' },
    { id: ToolType.PDF_TO_EPUB, icon: FileText, title: t.toolPdfToEpub, desc: t.toolPdfToEpubDesc, accept: '.pdf', path: '/pdf-to-epub' },
    { id: ToolType.OCR, icon: ScanLine, title: t.toolOcr, desc: t.toolOcrDesc, accept: '.pdf', path: '/ocr-pdf' },
    { id: ToolType.ORGANIZE, icon: LayoutGrid, title: t.organizePdf, desc: t.organizePdfDesc, accept: '.pdf', path: '/organize-pdf' },
  ];

  const selectTool = (toolId: ToolType) => {
    const tool = tools.find(t => t.id === toolId);
    setCurrentTool(toolId);
    setFile(null);
    setAppState(AppState.SELECTING);
    setView('TOOL_PAGE');
    if (tool) {
      safePushState({}, '', tool.path);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (uploadedFile: File) => {
    const fileName = uploadedFile.name.toLowerCase();
    const tool = tools.find(x => x.id === currentTool);

    if (tool) {
      const validExtensions = tool.accept.split(',').map(ext => ext.trim().toLowerCase());
      const isValid = validExtensions.some(ext => fileName.endsWith(ext));
      if (!isValid) {
        setErrorKey('fileTypeErr');
        setAppState(AppState.ERROR);
        return;
      }
    }

    try {
      setAppState(AppState.PROCESSING);
      setErrorKey(null);
      setFile(uploadedFile);

      if (currentTool === ToolType.DELETE || currentTool === ToolType.ROTATE || currentTool === ToolType.MAKE_FILLABLE) {
        try {
          const { pageCount } = await loadPdfDocument(uploadedFile);
          setPageCount(pageCount);

          try {
            const jsDoc = await getPdfJsDocument(uploadedFile);
            setPdfJsDoc(jsDoc);
          } catch (e) {
            console.warn("Preview failed (PDF.js)", e);
            setPdfJsDoc(null);
          }

          setSelectedPages(new Set());
          setRotations({});
          lastSelectedPageRef.current = null;
          setAppState(AppState.SELECTING);
        } catch (e: any) {
          console.error("Failed to load PDF structure:", e);
          // Handle specific PDF Load errors
          if (e?.message?.toLowerCase().includes('password') || e?.name === 'PasswordException' || e?.message?.includes('encrypted')) {
            setErrorKey('passwordErr');
          } else if (e?.message?.includes('Invalid PDF structure') || e?.message?.includes('No PDF header found')) {
            setErrorKey('corruptPdfErr');
          } else {
            setErrorKey('readErr');
          }
          setAppState(AppState.ERROR);
        }
      } else {
        setAppState(AppState.SELECTING);
      }

    } catch (error: any) {
      console.error("General file processing error:", error);
      setErrorKey('readErr');
      setAppState(AppState.ERROR);
    }
  };

  const handleAction = async () => {
    if (!file) return;

    try {
      setAppState(AppState.PROCESSING);
      await new Promise(resolve => setTimeout(resolve, 800));

      let resultBlob: Blob | Uint8Array | null = null;
      let outName = file.name;

      switch (currentTool) {
        case ToolType.DELETE:
          resultBlob = await deletePagesFromPdf(file, Array.from(selectedPages));
          outName = file.name.replace('.pdf', '_cleaned_eh.pdf');
          break;
        case ToolType.ROTATE:
          resultBlob = await rotatePdfPages(file, rotations);
          outName = file.name.replace('.pdf', '_rotated_eh.pdf');
          break;
        case ToolType.MAKE_FILLABLE:
          resultBlob = await makePdfFillable(file, Array.from(selectedPages));
          outName = file.name.replace('.pdf', '_fillable_eh.pdf');
          break;
        case ToolType.HEIC_TO_PDF:
          resultBlob = await convertHeicToPdf(file);
          outName = file.name.replace(/\.[^/.]+$/, "") + "_converted_eh.pdf";
          break;
        case ToolType.EPUB_TO_PDF:
          resultBlob = await convertEpubToPdf(file);
          outName = file.name.replace(/\.[^/.]+$/, "") + "_converted_eh.pdf";
          break;
        case ToolType.PDF_TO_EPUB:
          resultBlob = await convertPdfToEpub(file);
          outName = file.name.replace('.pdf', '_converted_eh.epub');
          break;
      }

      if (resultBlob) {
        const blob = resultBlob instanceof Blob ? resultBlob : new Blob([resultBlob as any], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setDownloadName(outName);
        setAppState(AppState.DONE);
      }
    } catch (error: any) {
      console.error("Action execution failed:", error);

      if (error?.message === "Could not extract text from EPUB") {
        setErrorKey('emptyEpubErr');
      } else if (error?.name === 'PasswordException' || error?.message?.toLowerCase().includes('password')) {
        setErrorKey('passwordErr');
      } else {
        // Fallback for conversion errors (HEIC/EPUB complex failures)
        if (currentTool === ToolType.HEIC_TO_PDF || currentTool === ToolType.EPUB_TO_PDF) {
          setErrorKey('conversionErr');
        } else {
          setErrorKey('genericError');
        }
      }
      setAppState(AppState.ERROR);
    }
  };

  const togglePageSelection = (e: React.MouseEvent, pageIndex: number) => {
    if (currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE) {
      const newSelection = new Set(selectedPages);
      const isRange = e.shiftKey;

      if (isRange && lastSelectedPageRef.current !== null) {
        const start = Math.min(lastSelectedPageRef.current, pageIndex);
        const end = Math.max(lastSelectedPageRef.current, pageIndex);

        // Ensure range selection adds to existing selection rather than replacing
        for (let i = start; i <= end; i++) {
          newSelection.add(i);
        }
      } else {
        // Default to Toggle behavior (Additive)
        if (newSelection.has(pageIndex)) {
          newSelection.delete(pageIndex);
        } else {
          newSelection.add(pageIndex);
        }
        lastSelectedPageRef.current = pageIndex;
      }
      setSelectedPages(newSelection);
    } else if (currentTool === ToolType.ROTATE) {
      setRotations(prev => ({
        ...prev,
        [pageIndex]: ((prev[pageIndex] || 0) + 90) % 360
      }));
    }
  };

  const rotateAll = (direction: 'left' | 'right') => {
    const newRotations = { ...rotations };
    for (let i = 0; i < pageCount; i++) {
      const current = newRotations[i] || 0;
      const delta = direction === 'right' ? 90 : -90;
      newRotations[i] = (current + delta + 360) % 360;
    }
    setRotations(newRotations);
  };

  const resetRotations = () => {
    setRotations({});
  };

  const handleReset = () => {
    // Return to landing page state for the tool, not home
    if (currentTool) {
      setFile(null);
      setAppState(AppState.SELECTING); // Logic to show tool interface with no file
      setPageCount(0);
      setPdfJsDoc(null);
      setSelectedPages(new Set());
      setRotations({});
      lastSelectedPageRef.current = null;
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
      setErrorKey(null);
    } else {
      setAppState(AppState.HOME);
      setView('HOME');
      safePushState({}, '', '/');
    }
  };

  const handleSoftReset = () => {
    setFile(null);
    setAppState(AppState.SELECTING);
    setDownloadUrl(null);
    lastSelectedPageRef.current = null;
  };

  // Structured Data for Home Page
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "pdfcanada.ca",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "PDF Tool, Document Management",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires a modern web browser (Edge, Chrome, Safari, Firefox)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock"
    },
    "description": t.description,
    "featureList": tools.map(tool => tool.title).join(", "),
    "softwareRequirements": "Modern Web Browser",
    "author": {
      "@id": "https://pdfcanada.ca/#organization"
    },
    "publisher": {
      "@id": "https://pdfcanada.ca/#organization"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    }
  };

  const getToolContent = (tool: ToolType) => {
    switch (tool) {
      case ToolType.DELETE: return t.features.delete;
      case ToolType.ROTATE: return t.features.rotate;
      case ToolType.HEIC_TO_PDF: return t.features.heic;
      case ToolType.EPUB_TO_PDF: return t.features.epubToPdf;
      case ToolType.PDF_TO_EPUB: return t.features.pdfToEpub;
      case ToolType.MAKE_FILLABLE: return t.features.fillable;
      case ToolType.OCR: return t.features.ocr;
      case ToolType.ORGANIZE: return t.features.organizePdf;
      default: return t.features.delete; // Fallback
    }
  };

  const renderToolInterface = () => {
    if (!file) {
      const tool = tools.find(t => t.id === currentTool);
      return (
        <div
          className="flex-grow flex flex-col items-center justify-center p-6 md:p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors group border-2 border-dashed border-transparent hover:border-canada-red/20 m-2 md:m-4 rounded-2xl md:rounded-3xl active:scale-[0.99]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              processFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {tool && <tool.icon size={28} className="md:w-8 md:h-8" />}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{tool?.title}</h3>
          <p className="text-sm md:text-base text-gray-500 mb-2">{t.uploadDesc} ({tool?.accept})</p>

          <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 mb-6 md:mb-8">
            <Shield size={12} /> {t.processedLocally}
          </div>

          <button className="w-full max-w-xs bg-canada-red hover:bg-canada-darkRed text-white px-6 md:px-8 py-4 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-base min-h-[56px]">
            {t.selectFile}
          </button>
          <input
            type="file"
            accept={tool?.accept}
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      );
    }

    const isVisualTool = currentTool === ToolType.DELETE || currentTool === ToolType.ROTATE || currentTool === ToolType.MAKE_FILLABLE;

    let headerText = '';
    if (currentTool === ToolType.DELETE) headerText = t.selectPagesHeader;
    else if (currentTool === ToolType.ROTATE) headerText = ''; // Render custom toolbar instead
    else if (currentTool === ToolType.MAKE_FILLABLE) headerText = t.selectPagesToFill;

    return (
      <div className="flex flex-col h-[calc(100vh-120px)] md:h-auto md:min-h-[500px]">
        {/* Header */}
        <div className="p-3 md:p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 md:w-10 md:h-10 bg-red-100 text-canada-red rounded-lg flex items-center justify-center shrink-0">
              <FileText size={18} className="md:w-5 md:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-gray-800 truncate text-sm md:text-base max-w-[180px] md:max-w-[200px]">{file.name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <span>{file ? formatFileSize(file.size) : ''}</span>
              </p>
            </div>
          </div>
          <button onClick={handleSoftReset} className="text-gray-400 hover:text-gray-600 p-3 hover:bg-gray-100 rounded-full transition-colors active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 bg-gray-50 custom-scrollbar flex flex-col items-center">

          {isVisualTool ? (
            <>
              <div className="w-full mb-4 sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-2">
                {currentTool === ToolType.ROTATE ? (
                  // Custom Toolbar for Rotate - Horizontal scroll on mobile
                  <div className="flex items-center justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                    <button onClick={() => rotateAll('left')} className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-canada-red/50 hover:text-canada-red active:scale-95 transition-all text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap min-h-[44px]">
                      <RotateCcw size={16} /> <span className="hidden sm:inline">{t.rotateAllLeft}</span><span className="sm:hidden">Left</span>
                    </button>
                    <button onClick={() => rotateAll('right')} className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-canada-red/50 hover:text-canada-red active:scale-95 transition-all text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap min-h-[44px]">
                      <RotateCw size={16} /> <span className="hidden sm:inline">{t.rotateAllRight}</span><span className="sm:hidden">Right</span>
                    </button>
                    <button onClick={resetRotations} className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-400 hover:text-gray-900 active:scale-95 transition-all text-xs md:text-sm font-medium text-gray-500 whitespace-nowrap min-h-[44px]">
                      <RefreshCcw size={16} /> <span className="hidden sm:inline">{t.resetRotations}</span><span className="sm:hidden">Reset</span>
                    </button>
                  </div>
                ) : (
                  // Standard Header for Delete/Fillable
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-600">
                      {headerText}
                    </p>
                    {(currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE) && (
                      <span className="text-xs font-bold bg-canada-red text-white px-2 py-1 rounded-full shadow-sm">
                        {selectedPages.size} {t.selected}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 w-full">
                {Array.from({ length: pageCount }).map((_, idx) => (
                  <PdfPageThumbnail
                    key={idx}
                    pdfJsDoc={pdfJsDoc}
                    pageIndex={idx}
                    isSelected={selectedPages.has(idx)}
                    rotation={rotations[idx] || 0}
                    mode={currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE ? 'delete' : 'rotate'}
                    onClick={(e) => togglePageSelection(e, idx)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-sm">
              <div className="w-16 h-16 bg-red-100 text-canada-red rounded-2xl flex items-center justify-center mb-4">
                {currentTool === ToolType.HEIC_TO_PDF && <Image size={32} />}
                {currentTool === ToolType.EPUB_TO_PDF && <BookOpen size={32} />}
                {currentTool === ToolType.PDF_TO_EPUB && <FileText size={32} />}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t.btnConvert}</h3>
              <p className="text-gray-500 mb-6">
                Ready to convert <strong>{file.name}</strong>. This might take a few moments depending on the file size, eh.
              </p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div
          className="p-3 md:p-4 border-t border-gray-100 bg-white"
          style={{ paddingBottom: 'max(12px, calc(var(--safe-area-inset-bottom) + 12px))' }}
        >
          <button
            onClick={handleAction}
            disabled={(currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE) && selectedPages.size === 0}
            className={`
              w-full py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-base min-h-[56px] active:scale-[0.98]
              ${((currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE) && selectedPages.size === 0)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-canada-red hover:bg-canada-darkRed text-white shadow-red-500/30 hover:-translate-y-0.5 animate-pulse-subtle'}
            `}
          >
            {currentTool === ToolType.DELETE && (
              <>
                <Trash2 size={20} />
                {selectedPages.size === 0 ? t.selectPagesHeader : `${t.btnRemove} ${selectedPages.size}`}
              </>
            )}
            {currentTool === ToolType.MAKE_FILLABLE && (
              <>
                <PenTool size={20} />
                {selectedPages.size === 0 ? t.selectPagesToFill : `${t.btnMakeFillable}`}
              </>
            )}
            {currentTool === ToolType.ROTATE && <><RotateCw size={20} /> {t.btnRotate}</>}
            {(currentTool === ToolType.HEIC_TO_PDF || currentTool === ToolType.EPUB_TO_PDF || currentTool === ToolType.PDF_TO_EPUB) && (
              <>{t.btnConvert}</>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <main className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Left Side: Copy */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-canada-red text-xs font-bold uppercase tracking-wider shadow-sm">
            <MapleLeaf className="w-4 h-4" />
            {t.builtIn}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 drop-shadow-sm">
            {t.title} <span className="text-canada-red">{t.subtitle}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
            {t.description}
          </p>

          <div className="flex flex-col gap-4 max-w-md mx-auto md:mx-0">
            <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-lg p-4 flex items-start gap-3 text-left shadow-sm">
              <Shield className="w-5 h-5 text-canada-red mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{t.localProcessing}</h4>
                <p className="text-gray-600 text-xs mt-1">
                  {t.localProcessingDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dashboard / Tool */}
        <div className="w-full md:w-1/2 max-w-xl">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative min-h-[500px] flex flex-col transition-all duration-300">

            {/* --- DASHBOARD: SELECT TOOL --- */}
            {appState === AppState.HOME && (
              <div className="p-8 h-full bg-gray-50/30 overflow-y-auto custom-scrollbar">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  Select a Tool <span className="text-lg font-normal text-gray-400">eh?</span>
                </h2>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {tools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => selectTool(tool.id)}
                      className="flex flex-col items-center md:items-start p-4 md:p-5 bg-white border border-gray-200 rounded-2xl hover:border-canada-red hover:shadow-lg hover:shadow-red-500/10 active:scale-95 transition-all text-center md:text-left group"
                    >
                      <div className="p-2 md:p-3 bg-red-50 text-canada-red rounded-xl mb-2 md:mb-3 group-hover:bg-canada-red group-hover:text-white transition-colors">
                        <tool.icon size={20} className="md:w-6 md:h-6" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{tool.title}</h3>
                      <p className="text-[10px] md:text-xs text-gray-500 mt-1 hidden md:block">{tool.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* --- TOOL INTERFACE (SELECTING) --- */}
            {appState === AppState.SELECTING && (
              <>
                <div className="absolute top-4 left-4 z-20">
                  {!file && (
                    <button onClick={handleReset} className="flex items-center gap-1 text-gray-500 hover:text-gray-800 text-sm font-medium bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm hover:shadow border border-transparent hover:border-gray-200 transition-all">
                      <ArrowLeft size={16} /> {t.backToHome}
                    </button>
                  )}
                </div>
                {renderToolInterface()}
              </>
            )}

            {/* --- PROCESSING --- */}
            {appState === AppState.PROCESSING && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8 animate-fade-in">
                <div className="animate-spin text-canada-red mb-4">
                  <MapleLeaf className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t.working}</h3>
                <p className="text-gray-500 mt-2">{t.workingDesc}</p>
              </div>
            )}

            {/* --- DONE --- */}
            {appState === AppState.DONE && downloadUrl && (
              <div className="flex flex-col h-full items-center justify-center p-10 text-center bg-gradient-to-br from-red-50/50 to-white animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.doneTitle}</h3>
                <p className="text-gray-500 mb-8 max-w-xs">{t.doneDesc}</p>
                <div className="space-y-3 w-full max-w-xs">
                  <a href={downloadUrl} download={downloadName} className="flex items-center justify-center gap-2 w-full bg-canada-red hover:bg-canada-darkRed text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5">
                    <Download size={20} /> {t.download}
                  </a>
                  <button onClick={handleReset} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3 rounded-full font-medium transition-colors">
                    {t.doAnother}
                  </button>
                </div>
              </div>
            )}

            {appState === AppState.ERROR && (
              <div className="flex flex-col h-full items-center justify-center p-10 text-center relative animate-fade-in">
                <button onClick={handleReset} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
                <div className="w-16 h-16 bg-red-100 text-canada-red rounded-full flex items-center justify-center mb-6">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.errorTitle}</h3>
                <p className="text-gray-500 mb-8">
                  {(errorKey && typeof t[errorKey] === 'string') ? (t[errorKey] as string) : t.genericError}
                </p>
                <button onClick={handleReset} className="bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-full font-bold transition-all">
                  {t.backToHome}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust / Privacy Section (Below Hero) */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{t.builtIn}</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">{t.seo.privacyDesc}</p>
      </section>

      {/* Internal Linking: Guides Section */}
      <section className="border-t border-gray-100 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">PDF Guides & Tutorials</h2>
            <p className="text-gray-500">Learn how to master your documents with our polite Canadian guides.</p>
          </div>
          <button
            onClick={() => handleNavigation('GUIDE_ULTIMATE', '/guides/ultimate-pdf-guide')}
            className="text-canada-red font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            {t.ultimateGuide} <MoveRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "How to Delete Pages", view: 'GUIDE_DELETE_PAGES', path: '/guides/delete-pdf-pages', icon: Trash2 },
            { title: "Rotate PDF Permanently", view: 'GUIDE_ROTATE', path: '/guides/rotate-pdf', icon: RotateCw },
            { title: "Convert HEIC to PDF", view: 'GUIDE_HEIC_TO_PDF', path: '/guides/heic-to-pdf', icon: Image },
            { title: "Make PDF Searchable (OCR)", view: 'GUIDE_OCR', path: '/guides/ocr-pdf', icon: ScanLine },
            { title: "Create Fillable Forms", view: 'GUIDE_FILLABLE', path: '/guides/make-pdf-fillable', icon: PenTool },
            { title: "Organize & Reorder Pages", view: 'GUIDE_ORGANIZE', path: '/guides/organize-pdf', icon: LayoutGrid },
            { title: "Convert EPUB to PDF", view: 'GUIDE_EPUB_TO_PDF', path: '/guides/convertir-epub-en-pdf', icon: FileText },
            { title: "Convert PDF to EPUB", view: 'GUIDE_PDF_TO_EPUB', path: '/guides/convertir-pdf-en-epub', icon: Tablet },
            { title: "Accessibility (AODA/WCAG)", view: 'GUIDE_ACCESSIBILITY', path: '/guides/pdf-accessibility-canada', icon: Eye },
            { title: "PDF SEO Optimization", view: 'GUIDE_SEO', path: '/guides/pdf-seo-guide', icon: BarChart },
          ].map((guide, i) => (
            <article key={i}>
              <button
                onClick={() => handleNavigation(guide.view as any, guide.path)}
                className="group p-6 bg-white border border-gray-100 rounded-3xl hover:border-canada-red/30 hover:shadow-xl transition-all text-left flex flex-col gap-4 w-full h-full"
              >
                <div className="w-12 h-12 bg-gray-50 text-gray-400 group-hover:bg-red-50 group-hover:text-canada-red rounded-2xl flex items-center justify-center transition-colors">
                  <guide.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-canada-red transition-colors">{guide.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">Read the guide <ArrowRight size={12} className="inline group-hover:translate-x-1 transition-transform" /></p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Home Page FAQ Section for SEO */}
      <section className="bg-gray-50 rounded-[3rem] p-12 mt-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.seo.homeFaq.map((faq, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-start gap-3">
                <div className="w-6 h-6 bg-canada-red/10 text-canada-red rounded-full flex items-center justify-center shrink-0 text-xs mt-0.5">Q</div>
                {faq.q}
              </h3>
              <p className="text-gray-600 leading-relaxed pl-9">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );


  const renderFeaturePage = () => {
    if (!currentTool) return null;
    const content = getToolContent(currentTool);
    const tool = tools.find(t => t.id === currentTool);

    return (
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 py-12 md:py-20 gap-12">
        <SEO
          title={content.title}
          description={content.desc}
          lang={lang}
          canonicalPath={tool?.path}
        />

        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <button
            onClick={() => handleNavigation('HOME')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider shadow-sm hover:text-canada-red hover:border-canada-red transition-all"
          >
            <ArrowLeft size={12} />
            {t.backToHome}
          </button>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
            {content.h1}
          </h1>

          <p className="text-xl text-canada-red font-medium">
            {content.subtitle}
          </p>

          <div className="prose prose-lg text-gray-600 mx-auto md:mx-0">
            <p>{content.content}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 max-w-xl">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative min-h-[500px] flex flex-col transition-all duration-300">

            {(appState === AppState.SELECTING || appState === AppState.PROCESSING) && (
              renderToolInterface()
            )}

            {appState === AppState.PROCESSING && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8">
                <div className="animate-spin text-canada-red mb-4">
                  <MapleLeaf className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t.working}</h3>
                <p className="text-gray-500 mt-2">{t.workingDesc}</p>
              </div>
            )}

            {appState === AppState.DONE && downloadUrl && (
              <div className="flex flex-col h-full items-center justify-center p-10 text-center bg-gradient-to-br from-red-50/50 to-white">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.doneTitle}</h3>
                <p className="text-gray-500 mb-8 max-w-xs">{t.doneDesc}</p>
                <div className="space-y-3 w-full max-w-xs">
                  <a href={downloadUrl} download={downloadName} className="flex items-center justify-center gap-2 w-full bg-canada-red hover:bg-canada-darkRed text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5">
                    <Download size={20} /> {t.download}
                  </a>
                  <button onClick={handleReset} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3 rounded-full font-medium transition-colors">
                    {t.doAnother}
                  </button>
                </div>
              </div>
            )}

            {appState === AppState.ERROR && (
              <div className="flex flex-col h-full items-center justify-center p-10 text-center relative">
                <button onClick={handleReset} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
                <div className="w-16 h-16 bg-red-100 text-canada-red rounded-full flex items-center justify-center mb-6">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.errorTitle}</h3>
                <p className="text-gray-500 mb-8">
                  {(errorKey && typeof t[errorKey] === 'string') ? (t[errorKey] as string) : t.genericError}
                </p>
                <button onClick={handleReset} className="bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-full font-bold transition-all">
                  {t.backToHome}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <Header lang={lang} setLang={setLang} onNavigate={handleNavigation} />

      <main className="flex-grow flex flex-col">
        {view === 'HOME' && (
          <>
            <SEO
              title={t.seo.homeTitle}
              description={t.seo.homeDesc}
              lang={lang}
              schema={softwareAppSchema}
            />
            {renderHome()}
          </>
        )}
        {view === 'TOOL_PAGE' && renderFeaturePage()}
        {view === 'PRICING' && <PricingPage lang={lang} />}
        {view === 'PRIVACY' && <PrivacyPage lang={lang} />}
        {view === 'TERMS' && <TermsPage lang={lang} />}
        {view === 'SORRY' && <SorryPolicyPage lang={lang} />}
        {view === 'HOW_TO' && <HowToPage lang={lang} />}
        {view === 'SUPPORT' && <SupportLocalPage lang={lang} />}
        {view === 'MAKE_FILLABLE_INFO' && <MakePdfFillablePage lang={lang} />}

        {/* Guides */}
        {view === 'GUIDE_DELETE_PAGES' && <DeletePdfPagesGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_ROTATE' && <RotatePdfGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_HEIC_TO_PDF' && <HeicToPdfGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_EPUB_TO_PDF' && <EpubToPdfGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_PDF_TO_EPUB' && <PdfToEpubGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_FILLABLE' && <MakeFillableGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_OCR' && <OcrPdfGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_ORGANIZE' && <OrganizePdfGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_ULTIMATE' && <UltimatePdfGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_ACCESSIBILITY' && <AccessibilityGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_SEO' && <PdfSeoGuide lang={lang} onNavigate={handleNavigation} />}
      </main>

      <Footer lang={lang} onNavigate={handleNavigation} />
    </div>
  );
}

export default App;