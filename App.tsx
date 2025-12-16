import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Download, FileText, X, AlertCircle, CheckCircle2, Shield, Trash2, RotateCw, Image, BookOpen, ArrowLeft, PenTool, RotateCcw, RefreshCcw, ScanLine, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Rnd } from 'react-rnd';
import { SortablePdfPageThumbnail } from './components/SortablePdfPageThumbnail';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MapleLeaf } from './components/MapleLeaf';
import { PricingPage, PrivacyPage, TermsPage, SorryPolicyPage, HowToPage, SupportLocalPage, MakePdfFillablePage } from './components/StaticPages';
import { PdfPageThumbnail } from './components/PdfPageThumbnail';
import { loadPdfDocument, getPdfJsDocument, deletePagesFromPdf, rotatePdfPages, convertHeicToPdf, convertPdfToEpub, convertEpubToPdf, formatFileSize, makePdfFillable, initPdfWorker, extractTextWithOcr, makeSearchablePdf, reorderPdfPages, saveFormFieldsToPdf, FormField } from './utils/pdfUtils';

// Initialize PDF.js worker early to ensure thumbnails can render
initPdfWorker();
import { translations, Language } from './utils/i18n';
import { SEO } from './components/SEO';

enum AppState {
  HOME,
  SELECTING,
  PROCESSING,
  DONE,
  ERROR,
  EDITING_OCR,
  EDITING_FORM
}

type CurrentView = 'HOME' | 'PRICING' | 'PRIVACY' | 'TERMS' | 'SORRY' | 'HOW_TO' | 'SUPPORT' | 'MAKE_FILLABLE_INFO' | 'TOOL_PAGE';

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

  // OCR specific state
  const [ocrText, setOcrText] = useState<string>('');
  const [ocrZoom, setOcrZoom] = useState<number>(1);

  // General Preview Zoom (Delete, Rotate, Fillable, Organize)
  const [previewZoom, setPreviewZoom] = useState<number>(1);

  // Organize State
  const [items, setItems] = useState<number[]>([]); // Array of page indices in order

  // Form Builder State
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [currentFormPage, setCurrentFormPage] = useState<number>(0);

  // Tool Specific State
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const lastSelectedPageRef = useRef<number | null>(null);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');
  const [errorKey, setErrorKey] = useState<keyof typeof translations['en'] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  // Memoize page indices array to avoid recreating on every render
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active.id));
        const newIndex = items.indexOf(Number(over!.id));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  const pageIndices = useMemo(() => Array.from({ length: pageCount }, (_, i) => i), [pageCount]);

  // Routing Logic
  const syncStateFromUrl = () => {
    const path = window.location.pathname;

    const tool = getToolFromPath(path);
    if (tool) {
      setCurrentTool(tool);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
      return;
    }

    if (path === '/pricing') setView('PRICING');
    else if (path === '/privacy') setView('PRIVACY');
    else if (path === '/terms') setView('TERMS');
    else if (path === '/howto') setView('HOW_TO');
    else if (path === '/support') setView('SUPPORT');
    else if (path === '/how-to-make-a-pdf-fillable') setView('MAKE_FILLABLE_INFO');
    else if (path === '/sorry') setView('SORRY');
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

  const getToolFromPath = (path: string): ToolType | null => {
    if (path === '/delete-pdf-pages') return ToolType.DELETE;
    if (path === '/rotate-pdf') return ToolType.ROTATE;
    if (path === '/heic-to-pdf') return ToolType.HEIC_TO_PDF;
    if (path === '/epub-to-pdf') return ToolType.EPUB_TO_PDF;
    if (path === '/pdf-to-epub') return ToolType.PDF_TO_EPUB;
    if (path === '/make-pdf-fillable') return ToolType.MAKE_FILLABLE;
    if (path === '/ocr-pdf') return ToolType.OCR;
    if (path === '/organize-pdf') return ToolType.ORGANIZE;
    return null;
  };

  const handleNavigation = (newView: CurrentView, pathOverride?: string) => {
    let path = pathOverride;

    // Auto-resolve path if not provided
    if (!path) {
      switch (newView) {
        case 'HOME': path = '/'; break;
        case 'PRICING': path = '/pricing'; break;
        case 'PRIVACY': path = '/privacy'; break;
        case 'TERMS': path = '/terms'; break;
        case 'HOW_TO': path = '/howto'; break;
        case 'SUPPORT': path = '/support'; break;
        case 'MAKE_FILLABLE_INFO': path = '/how-to-make-a-pdf-fillable'; break;
        case 'SORRY': path = '/sorry'; break;
        // Tools usually come with an explicit path or are handled below
      }
    }

    if (path) {
      safePushState({}, '', path);
    }

    // Check if the path corresponds to a tool
    const tool = path ? getToolFromPath(path) : null;

    if (tool) {
      setCurrentTool(tool);
      setAppState(AppState.SELECTING);
      setView('TOOL_PAGE');
      setFile(null);
    } else {
      setCurrentTool(null);
      if (newView === 'HOME') {
        setAppState(AppState.HOME);
      }
      setView(newView);
    }

    window.scrollTo(0, 0);
  };

  const tools = useMemo(() => [
    { id: ToolType.DELETE, icon: Trash2, title: t.toolDelete, desc: t.toolDeleteDesc, accept: '.pdf', path: '/delete-pdf-pages' },
    { id: ToolType.ROTATE, icon: RotateCw, title: t.toolRotate, desc: t.toolRotateDesc, accept: '.pdf', path: '/rotate-pdf' },
    { id: ToolType.MAKE_FILLABLE, icon: PenTool, title: t.toolMakeFillable, desc: t.toolMakeFillableDesc, accept: '.pdf', path: '/make-pdf-fillable' },
    { id: ToolType.ORGANIZE, icon: Move, title: "Organize PDF", desc: "Reorder pages", accept: '.pdf', path: '/organize-pdf' },
    { id: ToolType.OCR, icon: ScanLine, title: t.toolOcr, desc: t.toolOcrDesc, accept: '.pdf', path: '/ocr-pdf' },
    { id: ToolType.HEIC_TO_PDF, icon: Image, title: t.toolHeic, desc: t.toolHeicDesc, accept: '.heic', path: '/heic-to-pdf' },
    { id: ToolType.EPUB_TO_PDF, icon: BookOpen, title: t.toolEpubToPdf, desc: t.toolEpubToPdfDesc, accept: '.epub', path: '/epub-to-pdf' },
    { id: ToolType.PDF_TO_EPUB, icon: FileText, title: t.toolPdfToEpub, desc: t.toolPdfToEpubDesc, accept: '.pdf', path: '/pdf-to-epub' },
  ], [t]);

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

  const processFile = useCallback(async (uploadedFile: File) => {
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

      if (currentTool === ToolType.DELETE || currentTool === ToolType.ROTATE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR || currentTool === ToolType.ORGANIZE) {
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
          // Initialize items for Organize tool
          setItems(Array.from({ length: pageCount }, (_, i) => i));

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
  }, [tools, currentTool]);

  const handleAction = useCallback(async () => {
    if (!file) return;

    try {
      setAppState(AppState.PROCESSING);
      await new Promise(resolve => setTimeout(resolve, 800));

      let resultBlob: Blob | Uint8Array | null = null;
      let outName = file.name;

      switch (currentTool) {
        case ToolType.DELETE:
          resultBlob = await deletePagesFromPdf(file, Array.from(selectedPages));
          outName = file.name.replace(/\.pdf$/i, '_cleaned_eh.pdf');
          break;
        case ToolType.ROTATE:
          resultBlob = await rotatePdfPages(file, rotations);
          outName = file.name.replace(/\.pdf$/i, '_rotated_eh.pdf');
          break;
        case ToolType.MAKE_FILLABLE:
          // Switch to Form Builder Mode instead of auto-processing
          setFormFields([]);
          setCurrentFormPage(0);
          setAppState(AppState.EDITING_FORM);
          return;
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
          outName = file.name.replace(/\.[^/.]+$/, "") + '_converted_eh.epub';
          break;
        case ToolType.OCR:
          setOcrText(''); // Clear previous text
          setAppState(AppState.EDITING_OCR);
          // Start streaming OCR
          await extractTextWithOcr(
            file,
            Array.from(selectedPages),
            (progress, status) => {
              // We can still use the generic progress bar if we want, or just rely on the text appearing
              // For now, let's keep the PROCESSING generic indicator active if we were using it, 
              // but we switched to EDITING_OCR, so the processing overlay is gone.
              // We could show a small toast or localized spinner in the editor.
            },
            (pageIndex, text) => {
              setOcrText(prev => prev + `--- Page ${pageIndex + 1} ---\n${text}\n\n`);
            }
          );
          // We stay in EDITING_OCR mode
          return;
        case ToolType.ORGANIZE:
          resultBlob = await reorderPdfPages(file, items);
          outName = file.name.replace(/\.pdf$/i, '_organized.pdf');
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
  }, [file, currentTool, selectedPages, rotations, items]);

  const togglePageSelection = useCallback((e: React.MouseEvent, pageIndex: number) => {
    if (currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR) {
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
  }, [currentTool, selectedPages]);

  const rotateAll = useCallback((direction: 'left' | 'right') => {
    const newRotations = { ...rotations };
    for (let i = 0; i < pageCount; i++) {
      const current = newRotations[i] || 0;
      const delta = direction === 'right' ? 90 : -90;
      newRotations[i] = (current + delta + 360) % 360;
    }
    setRotations(newRotations);
  }, [rotations, pageCount]);

  const resetRotations = useCallback(() => {
    setRotations({});
  }, []);

  const handleReset = useCallback(() => {
    // Return to landing page state for the tool, not home
    if (currentTool) {
      setFile(null);
      setAppState(AppState.SELECTING); // Logic to show tool interface with no file
      setPageCount(0);
      setPdfJsDoc(null);
      setSelectedPages(new Set());
      setRotations({});
      setItems([]); // Reset items for organize tool
      lastSelectedPageRef.current = null;
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
      setErrorKey(null);
    } else {
      setAppState(AppState.HOME);
      setView('HOME');
      safePushState({}, '', '/');
    }
  }, [currentTool, downloadUrl]);

  const handleSoftReset = useCallback(() => {
    setFile(null);
    setAppState(AppState.SELECTING);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    lastSelectedPageRef.current = null;
  }, [downloadUrl]);

  // Cleanup blob URL on unmount or when downloadUrl changes
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  // Generate structured data for tool pages
  const generateToolSchema = useCallback((tool: typeof tools[0], content: any) => {
    const schemas: any[] = [];

    // Breadcrumb Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pdfcanada.ca/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": content.h1 || content.title,
          "item": `https://pdfcanada.ca${tool.path}`
        }
      ]
    });

    // HowTo Schema (if steps exist)
    if (content.steps && content.steps.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": content.h1 || content.title,
        "description": content.desc,
        "step": content.steps.map((step: string, index: number) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "text": step
        })),
        "tool": {
          "@type": "HowToTool",
          "name": "Web Browser"
        }
      });
    }

    // FAQPage Schema (if FAQ exists)
    if (content.faq && content.faq.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faq.map((item: { question: string; answer: string }) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      });
    }

    // WebApplication Schema for the tool
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": content.title,
      "description": content.desc,
      "url": `https://pdfcanada.ca${tool.path}`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CAD"
      },
      "provider": {
        "@type": "Organization",
        "name": "pdfcanada.ca",
        "url": "https://pdfcanada.ca"
      }
    });

    return schemas;
  }, []);

  // Structured Data for Home Page
  const softwareAppSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "pdfcanada.ca",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD"
    },
    "description": t.description,
    "featureList": tools.map(tool => tool.title).join(", "),
    "softwareRequirements": "Modern Web Browser",
    "author": {
      "@type": "Organization",
      "name": "pdfcanada.ca",
      "url": "https://pdfcanada.ca"
    }
  }), [t, tools]);

  const getToolContent = (tool: ToolType) => {
    switch (tool) {
      case ToolType.DELETE: return t.features.delete;
      case ToolType.ROTATE: return t.features.rotate;
      case ToolType.HEIC_TO_PDF: return t.features.heic;
      case ToolType.EPUB_TO_PDF: return t.features.epubToPdf;
      case ToolType.PDF_TO_EPUB: return t.features.pdfToEpub;
      case ToolType.MAKE_FILLABLE: return t.features.fillable;
      case ToolType.OCR: return t.features.ocr;
      case ToolType.ORGANIZE: return {
        title: "Organize PDF Pages | Reorder PDF | pdfcanada.ca",
        desc: "Rearrange PDF pages easily. Drag and drop to reorder pages in your PDF document.",
        h1: "Organize PDF Pages",
        subtitle: "Get your pages in order, eh?",
        content: "Need to fix the page order of your PDF? Our Organize PDF tool lets you drag and drop pages to rearrange them exactly how you want.",
        steps: ["Upload your valid PDF file.", "Drag and drop the page thumbnails to reorder them.", "Click 'Save Organized PDF' to download."],
        faq: []
      }; // We'll add proper translations later
      default: return t.features.delete; // Fallback
    }
  };
  const renderToolInterface = () => {
    if (!file) {
      const tool = tools.find(t => t.id === currentTool);
      return (
        <div
          className="flex-grow flex flex-col items-center justify-center p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors group border-2 border-dashed border-transparent hover:border-canada-red/20 m-4 rounded-3xl"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              processFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {tool && <tool.icon size={32} />}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{tool?.title}</h3>
          <p className="text-gray-500 mb-2">{t.uploadDesc} ({tool?.accept})</p>

          <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-500 mb-8">
            <Shield size={12} /> {t.processedLocally}
          </div>

          <button className="bg-canada-red hover:bg-canada-darkRed text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
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

    const isVisualTool = currentTool === ToolType.DELETE || currentTool === ToolType.ROTATE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR || currentTool === ToolType.ORGANIZE;

    let headerText = '';
    if (currentTool === ToolType.DELETE) headerText = t.selectPagesHeader;
    else if (currentTool === ToolType.ROTATE) headerText = ''; // Render custom toolbar instead
    else if (currentTool === ToolType.MAKE_FILLABLE) headerText = t.selectPagesToFill;
    else if (currentTool === ToolType.OCR) headerText = t.selectPagesForOcr;
    else if (currentTool === ToolType.ORGANIZE) headerText = "Drag pages to reorder";

    return (
      <div className="flex flex-col h-[600px]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 text-canada-red rounded-lg flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-800 truncate max-w-[200px]">{file.name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <span>{file ? formatFileSize(file.size) : ''}</span>
              </p>
            </div>
          </div>
          <button onClick={handleSoftReset} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 bg-gray-50 custom-scrollbar flex flex-col items-center">

          {isVisualTool ? (
            <>
              <div className="w-full mb-4 sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-2">
                {currentTool === ToolType.ROTATE || currentTool === ToolType.ORGANIZE ? (
                  // Custom Toolbar for Rotate OR ORGANIZE
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {currentTool === ToolType.ROTATE && (
                      <>
                        <button onClick={() => rotateAll('left')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-canada-red/50 hover:text-canada-red transition-all text-sm font-medium text-gray-700">
                          <RotateCcw size={16} /> {t.rotateAllLeft}
                        </button>
                        <button onClick={() => rotateAll('right')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-canada-red/50 hover:text-canada-red transition-all text-sm font-medium text-gray-700">
                          <RotateCw size={16} /> {t.rotateAllRight}
                        </button>
                        <button onClick={resetRotations} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-400 hover:text-gray-900 transition-all text-sm font-medium text-gray-500">
                          <RefreshCcw size={16} /> {t.resetRotations}
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      </>
                    )}

                    <button onClick={() => setPreviewZoom(z => Math.max(0.5, z - 0.25))} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="Zoom Out">
                      <ZoomOut size={16} />
                    </button>
                    <button onClick={() => setPreviewZoom(z => Math.min(3, z + 0.25))} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="Zoom In">
                      <ZoomIn size={16} />
                    </button>
                  </div>
                ) : (
                  // Standard Header for Delete/Fillable/OCR
                  <div className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-gray-600">
                        {headerText}
                      </p>
                      {(currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR) && (
                        <span className="text-xs font-bold bg-canada-red text-white px-2 py-1 rounded-full shadow-sm">
                          {selectedPages.size} {t.selected}
                        </span>
                      )}
                    </div>

                    {/* Zoom Controls Shared */}
                    <div className="flex items-center gap-1 bg-gray-50 rounded-lg border border-gray-200 p-1">
                      <button onClick={() => setPreviewZoom(z => Math.max(0.5, z - 0.25))} className="p-1 hover:bg-white rounded transition-colors text-gray-500">
                        <ZoomOut size={14} />
                      </button>
                      <span className="text-xs font-mono w-8 text-center text-gray-400">{Math.round(previewZoom * 100)}%</span>
                      <button onClick={() => setPreviewZoom(z => Math.min(3, z + 0.25))} className="p-1 hover:bg-white rounded transition-colors text-gray-500">
                        <ZoomIn size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-4 w-full">
                {currentTool === ToolType.ORGANIZE ? (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items} strategy={rectSortingStrategy}>
                      {items.map((pageIndex) => (
                        <SortablePdfPageThumbnail
                          key={pageIndex} // Key must comprise actual page index if we want items to track correctly, but arrayMove expects IDs to be consistent. 
                          // Actually dnd-kit normally wants stable IDs. 
                          // 'items' has the current order. The values in 'items' are the original page indices.
                          id={pageIndex.toString()}
                          pdfJsDoc={pdfJsDoc}
                          pageIndex={pageIndex}
                          width={200 * previewZoom}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                ) : (
                  pageIndices.map((idx) => (
                    <div key={idx} style={{ width: 'fit-content' }}>
                      <PdfPageThumbnail
                        pdfJsDoc={pdfJsDoc}
                        pageIndex={idx}
                        isSelected={selectedPages.has(idx)}
                        rotation={rotations[idx] || 0}
                        mode={currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR ? 'delete' : 'rotate'}
                        onClick={(e) => togglePageSelection(e, idx)}
                        width={200 * previewZoom}
                      />
                    </div>
                  ))
                )}
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
        <div className="p-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleAction}
            disabled={(currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR) && selectedPages.size === 0}
            className={`
              w-full py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2
              ${((currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR) && selectedPages.size === 0)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-canada-red hover:bg-canada-darkRed text-white shadow-red-500/30 hover:-translate-y-0.5'}
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
            {currentTool === ToolType.OCR && (
              <>
                <ScanLine size={20} />
                {selectedPages.size === 0 ? t.selectPagesForOcr : `${t.btnSearchablePdf}`}
              </>
            )}
            {currentTool === ToolType.ORGANIZE && (
              <>
                <Move size={20} />
                Save Organized PDF
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
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left Side: Copy */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-canada-red text-xs font-bold uppercase tracking-wider shadow-sm">
            <MapleLeaf className="w-4 h-4" />
            {t.builtIn}
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 drop-shadow-sm">
            {t.title} <span className="text-canada-red">{t.subtitle}</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => selectTool(tool.id)}
                      className="flex flex-col items-start p-5 bg-white border border-gray-200 rounded-2xl hover:border-canada-red hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 transition-all text-left group"
                    >
                      <div className="p-3 bg-red-50 text-canada-red rounded-xl mb-3 group-hover:bg-canada-red group-hover:text-white transition-colors">
                        <tool.icon size={24} />
                      </div>
                      <h3 className="font-bold text-gray-800">{tool.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
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
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8">
                <div className="animate-spin text-canada-red mb-4">
                  <MapleLeaf className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t.working}</h3>
                <p className="text-gray-500 mt-2">{t.workingDesc}</p>
              </div>
            )}

            {/* --- DONE --- */}
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

      {/* Trust / Privacy Section (Below Hero) */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{t.builtIn}</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">{t.seo.privacyDesc}</p>
      </div>
    </div>
  );

  const renderFeaturePage = () => {
    if (!currentTool) return null;
    const content = getToolContent(currentTool);
    const tool = tools.find(t => t.id === currentTool);
    const toolSchemas = tool ? generateToolSchema(tool, content) : undefined;

    return (
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 py-12 md:py-20 gap-12">
        <SEO
          title={content.title}
          description={content.desc}
          lang={lang}
          canonicalPath={tool?.path}
          ogType="website"
          schema={toolSchemas}
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
            {content.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}

            {(content as any).steps && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.navHowTo}</h3>
                <div className="space-y-4">
                  {(content as any).steps.map((step: string, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-canada-red flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                      <p className="pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(content as any).faq && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {(content as any).faq.map((item: { question: string, answer: string }, i: number) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{item.question}</h4>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

  const renderOcrEditor = () => {
    if (!file || !pdfJsDoc) return null;

    const downloadTxt = () => {
      const blob = new Blob([ocrText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, '_extracted.txt');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 h-[85vh]">
        {/* Left Column: Visuals */}
        <div className="w-full md:w-1/3 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-700">Source PDF</h3>
              <span className="text-xs bg-red-100 text-canada-red px-2 py-1 rounded-full font-bold">LIVE</span>
            </div>
            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setOcrZoom(z => Math.max(0.5, z - 0.25))}
                className="p-1 text-gray-500 hover:text-canada-red hover:bg-red-50 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs font-mono w-8 text-center">{Math.round(ocrZoom * 100)}%</span>
              <button
                onClick={() => setOcrZoom(z => Math.min(3, z + 0.25))}
                className="p-1 text-gray-500 hover:text-canada-red hover:bg-red-50 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50">
            {Array.from(selectedPages).length === 0 ? (
              <p className="text-center text-gray-500 italic mt-10">Select pages first, eh?</p>
            ) : (
              Array.from(selectedPages).sort((a, b) => a - b).map(idx => (
                <div key={idx} className="bg-white p-2 rounded-xl shadow-sm border border-gray-200" style={{ width: 'fit-content', margin: '0 auto' }}>
                  <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Page {idx + 1}</div>
                  <div className="rounded-lg overflow-hidden border border-gray-100">
                    <PdfPageThumbnail
                      pdfJsDoc={pdfJsDoc}
                      pageIndex={idx}
                      isSelected={false}
                      onClick={() => { }}
                      mode="rotate"
                      width={300 * ocrZoom}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Editor */}
        <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-gray-500" />
              <h3 className="font-bold text-gray-700">Extracted Text</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={downloadTxt}
                className="px-4 py-2 text-sm font-bold text-white bg-canada-red hover:bg-canada-darkRed rounded-lg shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
              >
                Download .txt
              </button>
            </div>
          </div>

          <div className="flex-grow relative">
            <textarea
              className="w-full h-full p-6 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-canada-red/10 font-mono text-sm leading-relaxed text-gray-700"
              value={ocrText}
              onChange={(e) => setOcrText(e.target.value)}
              placeholder="Text will appear here as we process your PDF..."
              spellCheck={false}
            />
            {ocrText.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-2 text-gray-400 animate-pulse">
                  <ScanLine size={20} />
                  <span>Initializing OCR engine...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFormEditor = () => {
    if (!file || !pdfJsDoc) return null;

    const addField = (type: 'text' | 'checkbox') => {
      const newField: FormField = {
        id: `${type}_${Date.now()}`,
        type,
        pageIndex: currentFormPage,
        x: 40, // Default 40% from left
        y: 40, // Default 40% from top
        width: type === 'checkbox' ? 5 : 20,
        height: type === 'checkbox' ? 3 : 5,
      };
      setFormFields([...formFields, newField]);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
      setFormFields(fields => fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const removeField = (id: string) => {
      setFormFields(fields => fields.filter(f => f.id !== id));
    };

    const downloadForm = async () => {
      // Generate PDF with fields
      // Show processing state locally if needed, or just do it
      const blob = await saveFormFieldsToPdf(file, formFields);
      const url = URL.createObjectURL(new Blob([blob as BlobPart], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, '_fillable.pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    // Filter fields for current page
    const pageFields = formFields.filter(f => f.pageIndex === currentFormPage);

    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col h-[85vh]">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-700">{t.fbTitle}</h2>
            <div className="h-6 w-px bg-gray-200"></div>
            <button onClick={() => addField('text')} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
              <FileText size={18} /> {t.fbAddText}
            </button>
            <button onClick={() => addField('checkbox')} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
              <CheckCircle2 size={18} /> {t.fbAddCheckbox}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">{t.fbCancel}</button>
            <button onClick={downloadForm} className="px-6 py-2 bg-canada-red hover:bg-canada-darkRed text-white rounded-lg font-bold shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5">
              {t.fbDownload}
            </button>
          </div>
        </div>

        <div className="flex-grow flex gap-6 overflow-hidden">
          {/* Left Sidebar: Thumbnails */}
          <div className="w-48 flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentFormPage(idx)}
                className={`p-2 rounded-lg cursor-pointer border-2 transition-all ${currentFormPage === idx ? 'border-canada-red bg-red-50' : 'border-transparent hover:border-gray-200'}`}
              >
                <div className="pointer-events-none">
                  <PdfPageThumbnail pdfJsDoc={pdfJsDoc} pageIndex={idx} width={150} isSelected={false} onClick={() => { }} />
                </div>
                <div className="text-center text-xs font-bold text-gray-500 mt-1">{t.fbPage} {idx + 1}</div>
              </div>
            ))}
          </div>

          {/* Main Canvas */}
          <div className="flex-grow bg-gray-100 rounded-xl overflow-auto flex items-start justify-center p-8 relative">
            <div className="relative shadow-2xl bg-white" style={{ width: 'fit-content' }}>
              {/* The Background PDF Page */}
              {/* We need a fixed width for the editor canvas to make percentage calc easy? 
                        Actually, PdfPageThumbnail renders canvas. We can set a large width, e.g. 800px.
                        And the Rnd will be relative to this container.
                    */}
              <div className="relative" style={{ width: 800 }}>
                <PdfPageThumbnail pdfJsDoc={pdfJsDoc} pageIndex={currentFormPage} width={800} isSelected={false} onClick={() => { }} />

                {/* Overlay Fields */}
                {pageFields.map(field => (
                  <Rnd
                    key={field.id}
                    bounds="parent"
                    size={{ width: `${field.width}%`, height: `${field.height}%` }}
                    position={{ x: (field.x / 100) * 800, y: (field.y / 100) * (800 * (1.414)) }} // Approx 1.414 aspect ratio, but we should rely on %
                    // Actually Rnd position is absolute pixels. We need to convert back and forth or just Use default position logic.
                    // Better: Use Rnd's `default` prop for initial, and onDragStop/onResizeStop to update state in %.
                    // But we need controlled component for re-renders?
                    // Let's use controlled position/size.
                    // We need to know the height of the container to translate % y to pixels.
                    // The container height depends on the aspect ratio of the PDF page.
                    // For now, let's assume standard Letter aspect roughly, or better, calculate from width.
                    // Since PdfPageThumbnail renders canvas with unknown aspect ratio until loaded... 
                    // We can use a simpler approach: Just let Rnd handle pixels, and convert to % only on save?
                    // No, we need state to persist between page swaps.
                    // Let's Assume 800px width.

                    default={{
                      x: (field.x / 100) * 800,
                      y: (field.y / 100) * 1131, // Approx letter height for 800px width (800 * 1.414)
                      width: (field.width / 100) * 800,
                      height: (field.height / 100) * 1131
                    }}
                    onDragStop={(e, d) => {
                      const parentWidth = 800;
                      const parentHeight = 1131; // Estimate
                      updateField(field.id, { x: (d.x / parentWidth) * 100, y: (d.y / parentHeight) * 100 });
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      const parentWidth = 800;
                      const parentHeight = 1131;
                      updateField(field.id, {
                        width: (parseFloat(ref.style.width) / parentWidth) * 100,
                        height: (parseFloat(ref.style.height) / parentHeight) * 100,
                        x: (position.x / parentWidth) * 100,
                        y: (position.y / parentHeight) * 100
                      });
                    }}
                    style={{ zIndex: 10 }}
                  >
                    <div className={`w-full h-full border-2 border-canada-red bg-red-50/50 flex items-center justify-center relative group`}>
                      {field.type === 'text' && <span className="text-xs font-bold text-canada-red opacity-50">Text Field</span>}
                      {field.type === 'checkbox' && <span className="text-xs font-bold text-canada-red opacity-50">Check</span>}

                      <button
                        onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/20 cursor-se-resize"></div>
                    </div>
                  </Rnd>
                ))}
              </div>
            </div>
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
        {view === 'TOOL_PAGE' && appState !== AppState.EDITING_OCR && appState !== AppState.EDITING_FORM && renderFeaturePage()}
        {appState === AppState.EDITING_OCR && renderOcrEditor()}
        {appState === AppState.EDITING_FORM && renderFormEditor()}
        {view === 'PRICING' && <PricingPage lang={lang} />}
        {view === 'PRIVACY' && <PrivacyPage lang={lang} />}
        {view === 'TERMS' && <TermsPage lang={lang} />}
        {view === 'SORRY' && <SorryPolicyPage lang={lang} />}
        {view === 'HOW_TO' && <HowToPage lang={lang} />}
        {view === 'SUPPORT' && <SupportLocalPage lang={lang} />}
        {view === 'MAKE_FILLABLE_INFO' && <MakePdfFillablePage lang={lang} />}
      </main>

      <Footer lang={lang} onNavigate={handleNavigation} />
    </div>
  );
}

export default App;