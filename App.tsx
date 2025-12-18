import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Download, FileText, X, AlertCircle, CheckCircle2, Shield, Trash2, RotateCw, Image, BookOpen, ArrowLeft, PenTool, RotateCcw, RefreshCcw, ScanLine, ZoomIn, ZoomOut, Move, History, Undo2, Redo2, Copy } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Rnd } from 'react-rnd';
import { SortablePdfPageThumbnail } from './components/SortablePdfPageThumbnail';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MapleLeaf } from './components/MapleLeaf';
import { PricingPage } from './components/pages/PricingPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { SorryPage as SorryPolicyPage } from './components/pages/SorryPage';
import { HowToPage } from './components/pages/HowToPage';
import { SupportPage as SupportLocalPage } from './components/pages/SupportPage';
import { MakePdfFillablePage } from './components/pages/MakePdfFillablePage';
import { ConvertirEpubEnPdfGuide } from './components/pages/guides/ConvertirEpubEnPdfGuide';
import { ConvertirPdfEnEpubGuide } from './components/pages/guides/ConvertirPdfEnEpubGuide';
import { DeletePdfPagesGuide } from './components/pages/guides/DeletePdfPagesGuide';
import { RotatePdfGuide } from './components/pages/guides/RotatePdfGuide';
import { PdfPageThumbnail } from './components/PdfPageThumbnail';
import { loadPdfDocument, getPdfJsDocument, deletePagesFromPdf, rotatePdfPages, convertHeicToPdf, convertPdfToEpub, convertEpubToPdf, formatFileSize, makePdfFillable, initPdfWorker, extractTextWithOcr, makeSearchablePdf, reorderPdfPages, saveFormFieldsToPdf, FormField } from './utils/pdfUtils';
import { saveSession, loadSession, clearSession, AppSessionState } from './utils/storageUtils';
import { FormPropertiesPanel } from './components/FormPropertiesPanel';
import { useSystemTheme } from './hooks/useSystemTheme';

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

type CurrentView = 'HOME' | 'PRICING' | 'PRIVACY' | 'TERMS' | 'SORRY' | 'HOW_TO' | 'SUPPORT' | 'MAKE_FILLABLE_INFO' | 'TOOL_PAGE' | 'GUIDE_EPUB_TO_PDF' | 'GUIDE_PDF_TO_EPUB' | 'GUIDE_DELETE_PDF_PAGES' | 'GUIDE_ROTATE_PDF';

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
  // Apply system theme preference automatically
  useSystemTheme();

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
  const [formZoom, setFormZoom] = useState<number>(1.0);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [history, setHistory] = useState<FormField[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Constants
  const MIN_FILE_SIZE = 100; // bytes
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const lastSelectedPageRef = useRef<number | null>(null);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');
  const [errorKey, setErrorKey] = useState<keyof typeof translations['en'] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  // Autosave State
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);
  const savedSessionData = useRef<AppSessionState | null>(null);

  // Load session on mount
  useEffect(() => {
    loadSession().then(session => {
      if (session && session.file) {
        savedSessionData.current = session;
        setHasSavedSession(true);
      }
    });
  }, []);

  // Autosave Effect
  useEffect(() => {
    if (!file) {
      // Only clear if we explicitly want to (e.g. user Reset). 
      // For now, let's not auto-clear on null file to avoid race conditions on reload vs mount.
      // actually, handleReset clears file.
      return;
    }

    const timer = setTimeout(() => {
      saveSession({
        file,
        currentTool: currentTool as string,
        selectedPages: Array.from(selectedPages),
        rotations,
        ocrText,
        items,
        formFields,
        timestamp: Date.now()
      });
    }, 1000); // Debounce 1s

    return () => clearTimeout(timer);
  }, [file, currentTool, selectedPages, rotations, ocrText, items, formFields]);

  const handleResume = async () => {
    const session = savedSessionData.current;
    if (!session) return;

    try {
      setFile(session.file);
      setCurrentTool(session.currentTool as ToolType);
      setSelectedPages(new Set(session.selectedPages));
      setRotations(session.rotations);
      setOcrText(session.ocrText);
      setItems(session.items);
      setFormFields(session.formFields);

      // Re-initialize PDF basics
      const { pageCount } = await loadPdfDocument(session.file);
      setPageCount(pageCount);
      const jsDoc = await getPdfJsDocument(session.file);
      setPdfJsDoc(jsDoc);

      // Restore State
      if (session.currentTool === ToolType.OCR) {
        setAppState(AppState.EDITING_OCR);
      } else if (session.currentTool === ToolType.MAKE_FILLABLE) { // Assuming saved during explicit Fillable usage
        // The saved state might be "EDITING_FORM" logically but `currentTool` is MAKE_FILLABLE.
        // In handleAction specific tools set specific states. 
        // If formFields has items, we probably want EDITING_FORM.
        if (session.formFields.length > 0) {
          setAppState(AppState.EDITING_FORM);
          // Also need currentFormPage? We didn't save it. Default 0 is fine.
          setCurrentFormPage(0);
        } else {
          setAppState(AppState.SELECTING);
        }
      } else if (session.currentTool === ToolType.ORGANIZE) {
        // Organize is usually SELECTING/Visual but has drag/drop context
        // We render renderToolInterface which handles ORGANIZE logic if isVisualTool is true
        setAppState(AppState.SELECTING);
      } else if (session.currentTool) {
        setAppState(AppState.SELECTING);
      } else {
        setAppState(AppState.HOME);
      }

      setHasSavedSession(false); // Hide button after resume
    } catch (e) {
      console.error("Failed to resume", e);
      alert(t.genericError);
    }
  };

  const clearAutosave = () => {
    clearSession();
    setHasSavedSession(false);
  };

  // Original handleReset needs to clear session


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

  // Routing Logic - Handles both /path and /fr/path URLs
  const extractLangFromPath = (path: string): { lang: Language; cleanPath: string } => {
    if (path.startsWith('/fr/') || path === '/fr') {
      return { lang: 'fr', cleanPath: path.replace(/^\/fr/, '') || '/' };
    }
    return { lang: 'en', cleanPath: path };
  };

  const syncStateFromUrl = () => {
    const path = window.location.pathname;
    const { lang: detectedLang, cleanPath } = extractLangFromPath(path);

    // Set language based on URL path
    setLang(detectedLang);

    const tool = getToolFromPath(cleanPath);
    if (tool) {
      setCurrentTool(tool);
      setView('TOOL_PAGE');
      setAppState(AppState.SELECTING);
      return;
    }

    if (cleanPath === '/pricing') setView('PRICING');
    else if (cleanPath === '/privacy') setView('PRIVACY');
    else if (cleanPath === '/terms') setView('TERMS');
    else if (cleanPath === '/howto') setView('HOW_TO');
    else if (cleanPath === '/support') setView('SUPPORT');
    else if (cleanPath === '/how-to-make-a-pdf-fillable') setView('MAKE_FILLABLE_INFO');
    else if (cleanPath === '/sorry') setView('SORRY');
    else if (cleanPath === '/guides/convertir-epub-en-pdf') setView('GUIDE_EPUB_TO_PDF');
    else if (cleanPath === '/guides/convertir-pdf-en-epub') setView('GUIDE_PDF_TO_EPUB');
    else if (cleanPath === '/guides/delete-pdf-pages') setView('GUIDE_DELETE_PDF_PAGES');
    else if (cleanPath === '/guides/rotate-pdf') setView('GUIDE_ROTATE_PDF');
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
        case 'GUIDE_EPUB_TO_PDF': path = '/guides/convertir-epub-en-pdf'; break;
        case 'GUIDE_PDF_TO_EPUB': path = '/guides/convertir-pdf-en-epub'; break;
        case 'GUIDE_DELETE_PDF_PAGES': path = '/guides/delete-pdf-pages'; break;
        case 'GUIDE_ROTATE_PDF': path = '/guides/rotate-pdf'; break;
        // Tools usually come with an explicit path or are handled below
      }
    }

    // Add language prefix for French URLs
    if (path && lang === 'fr' && !path.startsWith('/fr')) {
      path = `/fr${path}`;
    }

    if (path) {
      safePushState({}, '', path);
    }

    // Check if the path corresponds to a tool (use clean path without lang prefix)
    const cleanPath = path ? path.replace(/^\/fr/, '') || '/' : null;
    const tool = cleanPath ? getToolFromPath(cleanPath) : null;

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
      // Add language prefix for French URLs
      const urlPath = lang === 'fr' ? `/fr${tool.path}` : tool.path;
      safePushState({}, '', urlPath);
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
    clearAutosave();
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
          className="flex-grow flex flex-col items-center justify-center p-10 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group border-2 border-dashed border-transparent hover:border-canada-red/20 m-4 rounded-3xl"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              processFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {tool && <tool.icon size={32} />}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{tool?.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-2">{t.uploadDesc} ({tool?.accept})</p>

          <div className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400 mb-8">
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
      <div className="flex flex-col h-[500px] sm:h-[600px] md:h-[700px]">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-canada-red rounded-lg flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate max-w-[200px]">{file.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span>{file ? formatFileSize(file.size) : ''}</span>
              </p>
            </div>
          </div>
          <button onClick={handleSoftReset} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 custom-scrollbar flex flex-col items-center">

          {isVisualTool ? (
            <>
              <div className="w-full mb-4 sticky top-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 py-2">
                {currentTool === ToolType.ROTATE || currentTool === ToolType.ORGANIZE ? (
                  // Custom Toolbar for Rotate OR ORGANIZE
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {currentTool === ToolType.ROTATE && (
                      <>
                        <button onClick={() => rotateAll('left')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-canada-red/50 hover:text-canada-red transition-all text-sm font-medium text-gray-700 dark:text-gray-300">
                          <RotateCcw size={16} /> {t.rotateAllLeft}
                        </button>
                        <button onClick={() => rotateAll('right')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-canada-red/50 hover:text-canada-red transition-all text-sm font-medium text-gray-700 dark:text-gray-300">
                          <RotateCw size={16} /> {t.rotateAllRight}
                        </button>
                        <button onClick={resetRotations} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all text-sm font-medium text-gray-500 dark:text-gray-400">
                          <RefreshCcw size={16} /> {t.resetRotations}
                        </button>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                      </>
                    )}

                    <button onClick={() => setPreviewZoom(z => Math.max(0.5, z - 0.25))} disabled={previewZoom <= 0.5} className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 transition-colors" title="Zoom Out" aria-label="Zoom Out">
                      <ZoomOut size={16} />
                    </button>
                    <button onClick={() => setPreviewZoom(z => Math.min(3, z + 0.25))} disabled={previewZoom >= 3} className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 transition-colors" title="Zoom In" aria-label="Zoom In">
                      <ZoomIn size={16} />
                    </button>
                  </div>
                ) : (
                  // Standard Header for Delete/Fillable/OCR
                  <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {headerText}
                      </p>
                      {(currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR) && (
                        <span className="text-xs font-bold bg-canada-red text-white px-2 py-1 rounded-full shadow-sm">
                          {selectedPages.size} {t.selected}
                        </span>
                      )}
                    </div>

                    {/* Zoom Controls Shared */}
                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-1">
                      <button onClick={() => setPreviewZoom(z => Math.max(0.5, z - 0.25))} disabled={previewZoom <= 0.5} className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-canada-red disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent" aria-label="Zoom Out">
                        <ZoomOut size={14} />
                      </button>
                      <span className="text-xs font-mono w-10 text-center text-gray-500 dark:text-gray-300">{Math.round(previewZoom * 100)}%</span>
                      <button onClick={() => setPreviewZoom(z => Math.min(3, z + 0.25))} disabled={previewZoom >= 3} className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-canada-red disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent" aria-label="Zoom In">
                        <ZoomIn size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-4 w-full">
                {currentTool === ToolType.ORGANIZE ? (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items.map(String)} strategy={rectSortingStrategy}>
                      {items.map((pageIndex) => (
                        <SortablePdfPageThumbnail
                          key={`page-${pageIndex}`}
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
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-canada-red rounded-2xl flex items-center justify-center mb-4">
                {currentTool === ToolType.HEIC_TO_PDF && <Image size={32} />}
                {currentTool === ToolType.EPUB_TO_PDF && <BookOpen size={32} />}
                {currentTool === ToolType.PDF_TO_EPUB && <FileText size={32} />}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.btnConvert}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Ready to convert <strong>{file.name}</strong>. This might take a few moments depending on the file size, eh.
              </p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button
            onClick={handleAction}
            disabled={(currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR) && selectedPages.size === 0}
            className={`
              w-full py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2
              ${((currentTool === ToolType.DELETE || currentTool === ToolType.MAKE_FILLABLE || currentTool === ToolType.OCR) && selectedPages.size === 0)
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
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
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      {hasSavedSession && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-400">
              <History size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 dark:text-gray-100">Unsaved work found</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">You have a previous session available.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={clearAutosave} className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium text-sm focus:outline-none focus:text-canada-red focus:underline transition-colors">Dismiss</button>
            <button onClick={handleResume} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
              Resume Work
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left Side: Hero Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-canada-red text-xs font-bold uppercase tracking-wider shadow-sm">
            <MapleLeaf className="w-4 h-4" />
            {t.builtIn}
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 drop-shadow-sm">
            {t.title} <span className="text-canada-red">{t.subtitle}</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed font-medium">
            {t.description}
          </p>

          <div className="flex flex-col gap-4 max-w-md">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start gap-3 text-left shadow-sm">
              <Shield className="w-5 h-5 text-canada-red mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{t.localProcessing}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                  {t.localProcessingDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dashboard / Tool */}
        <div className="w-full md:w-1/2 max-w-xl">
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-800 overflow-hidden relative min-h-[500px] flex flex-col transition-all duration-300">

          {/* --- DASHBOARD: SELECT TOOL --- */}
          {appState === AppState.HOME && (
            <div className="p-8 h-full bg-gray-50/30 dark:bg-gray-800/30 overflow-y-auto custom-scrollbar">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                Select a Tool <span className="text-lg font-normal text-gray-400">eh?</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => selectTool(tool.id)}
                    className="flex flex-col items-start p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-canada-red hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 transition-all text-left group"
                  >
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 text-canada-red rounded-xl mb-3 group-hover:bg-canada-red group-hover:text-white transition-colors">
                      <tool.icon size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{tool.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tool.desc}</p>
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
                  <button onClick={handleReset} className="flex items-center gap-1 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm hover:shadow border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all">
                    <ArrowLeft size={16} /> {t.backToHome}
                  </button>
                )}
              </div>
              {renderToolInterface()}
            </>
          )}

          {/* --- PROCESSING --- */}
          {appState === AppState.PROCESSING && (
            <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8">
              <div className="animate-spin text-canada-red mb-4">
                <MapleLeaf className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t.working}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{t.workingDesc}</p>
            </div>
          )}

          {/* --- DONE --- */}
          {appState === AppState.DONE && downloadUrl && (
            <div className="flex flex-col h-full items-center justify-center p-10 text-center bg-gradient-to-br from-red-50/50 dark:from-red-900/20 to-white dark:to-gray-900">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.doneTitle}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">{t.doneDesc}</p>
              <div className="space-y-3 w-full max-w-xs">
                <a href={downloadUrl} download={downloadName} className="flex items-center justify-center gap-2 w-full bg-canada-red hover:bg-canada-darkRed text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5">
                  <Download size={20} /> {t.download}
                </a>
                <button onClick={handleReset} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 px-6 py-3 rounded-full font-medium transition-colors">
                  {t.doAnother}
                </button>
              </div>
            </div>
          )}

          {/* --- ERROR --- */}
          {appState === AppState.ERROR && (
            <div className="flex flex-col h-full items-center justify-center p-10 text-center relative">
              <button onClick={handleReset} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={24} />
              </button>
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-canada-red rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.errorTitle}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {(errorKey && typeof t[errorKey] === 'string') ? (t[errorKey] as string) : t.genericError}
              </p>
              <button onClick={handleReset} className="bg-gray-800 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-all">
                {t.backToHome}
              </button>
            </div>
          )}

        </div>
      </div>
      </div>

      {/* Trust / Privacy Section (Below Hero) */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t.builtIn}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">{t.privacyText1}</p>
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider shadow-sm hover:text-canada-red hover:border-canada-red transition-all"
          >
            <ArrowLeft size={12} />
            {t.backToHome}
          </button>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
            {content.h1}
          </h1>

          <p className="text-xl text-canada-red font-medium">
            {content.subtitle}
          </p>

          <div className="prose prose-lg text-gray-600 dark:text-gray-400 mx-auto md:mx-0">
            {content.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}

            {(content as any).steps && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t.navHowTo}</h3>
                <div className="space-y-4">
                  {(content as any).steps.map((step: string, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-canada-red flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                      <p className="pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(content as any).faq && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {(content as any).faq.map((item: { question: string, answer: string }, i: number) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">{item.question}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 max-w-xl">
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-800 overflow-hidden relative min-h-[500px] flex flex-col transition-all duration-300">

            {(appState === AppState.SELECTING || appState === AppState.PROCESSING) && (
              renderToolInterface()
            )}

            {appState === AppState.PROCESSING && (
              <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8">
                <div className="animate-spin text-canada-red mb-4">
                  <MapleLeaf className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t.working}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{t.workingDesc}</p>
              </div>
            )}

            {appState === AppState.DONE && downloadUrl && (
              <div className="flex flex-col h-full items-center justify-center p-10 text-center bg-gradient-to-br from-red-50/50 dark:from-red-900/20 to-white dark:to-gray-900">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.doneTitle}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">{t.doneDesc}</p>
                <div className="space-y-3 w-full max-w-xs">
                  <a href={downloadUrl} download={downloadName} className="flex items-center justify-center gap-2 w-full bg-canada-red hover:bg-canada-darkRed text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5">
                    <Download size={20} /> {t.download}
                  </a>
                  <button onClick={handleReset} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 px-6 py-3 rounded-full font-medium transition-colors">
                    {t.doAnother}
                  </button>
                </div>
              </div>
            )}

            {appState === AppState.ERROR && (
              <div className="flex flex-col h-full items-center justify-center p-10 text-center relative">
                <button onClick={handleReset} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X size={24} />
                </button>
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-canada-red rounded-full flex items-center justify-center mb-6">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.errorTitle}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  {(errorKey && typeof t[errorKey] === 'string') ? (t[errorKey] as string) : t.genericError}
                </p>
                <button onClick={handleReset} className="bg-gray-800 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold transition-all">
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
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">Source PDF</h3>
              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-canada-red px-2 py-1 rounded-full font-bold">LIVE</span>
            </div>
            <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-1">
              <button
                onClick={() => setOcrZoom(z => Math.max(0.5, z - 0.25))}
                disabled={ocrZoom <= 0.5}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-canada-red hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                aria-label="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs font-mono w-10 text-center text-gray-600 dark:text-gray-300">{Math.round(ocrZoom * 100)}%</span>
              <button
                onClick={() => setOcrZoom(z => Math.min(3, z + 0.25))}
                disabled={ocrZoom >= 3}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-canada-red hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                aria-label="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50 dark:bg-gray-800/50">
            {Array.from(selectedPages).length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 italic mt-10">Select pages first, eh?</p>
            ) : (
              Array.from(selectedPages).sort((a, b) => a - b).map(idx => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700" style={{ width: 'fit-content', margin: '0 auto' }}>
                  <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Page {idx + 1}</div>
                  <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
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
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-gray-500 dark:text-gray-400" />
              <h3 className="font-bold text-gray-700 dark:text-gray-200">Extracted Text</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
              className="w-full h-full p-6 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-canada-red/10 font-mono text-sm leading-relaxed text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900"
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

    // History Helper
    const pushToHistory = (newFields: FormField[]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newFields);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setFormFields(newFields);
    };

    const undo = () => {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setFormFields(history[newIndex]);
      }
    };

    const redo = () => {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setFormFields(history[newIndex]);
      }
    };

    const addField = (type: 'text' | 'checkbox' | 'signature') => {
      const newField: FormField = {
        id: `${type}_${Date.now()}`,
        type,
        pageIndex: currentFormPage,
        x: 40, // Default 40% from left
        y: 40, // Default 40% from top
        width: type === 'checkbox' ? 5 : 20,
        height: type === 'checkbox' ? 3 : 5,
        name: `${type}_${formFields.length + 1}`
      };
      pushToHistory([...formFields, newField]);
      setSelectedFieldId(newField.id);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
      const newFields = formFields.map(f => f.id === id ? { ...f, ...updates } : f);
      pushToHistory(newFields);
    };

    // For property updates that happen frequently (like typing), consider debouncing or separating "commit" from state update
    // For now, fast updates are fine but might bloat history. 
    // Optimization: separate setFormFields for typing vs pushToHistory for blur? 
    // Let's keep it simple: Property Panel calls this specific updater which we can make silent or history-pushing.
    // Actually, let's make the PropertyPanel callback update state directly, and only push to history on blur? 
    // For simplicity, we'll just push history on every change for now, or maybe just `setFormFields` and have a manual "save state" mechanism? 
    // Better: split updateField into `updateBitmap` (no history) and `commitUpdate` (history).
    // Compromise: Property panel updates are live. Drag/Resize updates push history on Stop.

    const updateFieldProperties = (id: string, updates: Partial<FormField>) => {
      // Just update state, don't push history for every keystroke? 
      // We need persistence. Let's update state directly and maybe debounce history?
      // Let's just update state using setFormFields and NOT push history for now to avoid lag, 
      // but that breaks Undo for properties. 
      // Let's push history. It's an array of objects, fairly cheap for small forms.
      const newFields = formFields.map(f => f.id === id ? { ...f, ...updates } : f);
      // We refrain from pushing history on every keystroke if possible, but for 'required' toggle it's fine.
      // For text input, it might be too much. 
      // TODO: Optimize if slow.
      pushToHistory(newFields);
    };

    const removeField = (id: string) => {
      const newFields = formFields.filter(f => f.id !== id);
      pushToHistory(newFields);
      if (selectedFieldId === id) setSelectedFieldId(null);
    };

    const duplicateField = (id: string) => {
      const field = formFields.find(f => f.id === id);
      if (!field) return;
      const newField: FormField = {
        ...field,
        id: `${field.type}_${Date.now()}`,
        x: field.x + 2,
        y: field.y + 2,
        name: `${field.name}_copy`
      };
      pushToHistory([...formFields, newField]);
      setSelectedFieldId(newField.id);
    };

    const downloadForm = async () => {
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
    const baseWidth = 800;
    const currentWidth = baseWidth * formZoom;
    const approxAspectRatio = 1.414; // A4/Letter approx
    const currentHeight = currentWidth * approxAspectRatio;

    const selectedField = formFields.find(f => f.id === selectedFieldId);

    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col h-[85vh]">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-6 flex justify-between items-center z-20 relative">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t.fbTitle}</h2>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

            <button onClick={() => addField('text')} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-sm">
              <FileText size={16} /> {t.fbAddText}
            </button>
            <button onClick={() => addField('checkbox')} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-sm">
              <CheckCircle2 size={16} /> {t.fbAddCheckbox}
            </button>
            <button onClick={() => addField('signature')} className="flex items-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-400 rounded-lg font-medium transition-colors text-sm">
              <PenTool size={16} /> Sign
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <button onClick={undo} disabled={historyIndex <= 0} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-canada-red transition-colors" title="Undo" aria-label="Undo">
              <Undo2 size={18} />
            </button>
            <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-canada-red transition-colors" title="Redo" aria-label="Redo">
              <Redo2 size={18} />
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <div className="flex items-center gap-2">
              <button onClick={() => setFormZoom(z => Math.max(0.5, z - 0.25))} disabled={formZoom <= 0.5} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-canada-red disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors" aria-label="Zoom Out">
                <ZoomOut size={18} />
              </button>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-12 text-center">{Math.round(formZoom * 100)}%</span>
              <button onClick={() => setFormZoom(z => Math.min(2.0, z + 0.25))} disabled={formZoom >= 2.0} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-canada-red disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors" aria-label="Zoom In">
                <ZoomIn size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium">{t.fbCancel}</button>
            <button onClick={downloadForm} className="px-6 py-2 bg-canada-red hover:bg-canada-darkRed text-white rounded-lg font-bold shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5">
              {t.fbDownload}
            </button>
          </div>
        </div>

        <div className="flex-grow flex gap-6 overflow-hidden">
          {/* Left Sidebar: Thumbnails */}
          <div className="w-48 flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentFormPage(idx)}
                className={`p-2 rounded-lg cursor-pointer border-2 transition-all ${currentFormPage === idx ? 'border-canada-red bg-red-50 dark:bg-red-900/20' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`}
              >
                <div className="pointer-events-none">
                  <PdfPageThumbnail pdfJsDoc={pdfJsDoc} pageIndex={idx} width={150} isSelected={false} onClick={() => { }} />
                </div>
                <div className="text-center text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">{t.fbPage} {idx + 1}</div>
              </div>
            ))}
          </div>

          {/* Main Canvas */}
          <div className="flex-grow bg-gray-100 dark:bg-gray-800 rounded-xl overflow-auto flex items-start justify-center p-8 relative" onClick={() => setSelectedFieldId(null)}>
            <div className="relative shadow-2xl bg-white dark:bg-gray-900" style={{ width: 'fit-content' }} onClick={(e) => e.stopPropagation()}>

              <div className="relative" style={{ width: currentWidth }}>
                <PdfPageThumbnail pdfJsDoc={pdfJsDoc} pageIndex={currentFormPage} width={currentWidth} isSelected={false} onClick={() => { }} />

                {/* Overlay Fields */}
                {pageFields.map(field => {
                  const isSelected = selectedFieldId === field.id;
                  return (
                    <Rnd
                      key={field.id}
                      bounds="parent"
                      size={{ width: `${field.width}%`, height: `${field.height}%` }}
                      position={{
                        x: (field.x / 100) * currentWidth,
                        y: (field.y / 100) * currentHeight
                      }}
                      onDragStart={() => setSelectedFieldId(field.id)}
                      onDragStop={(e, d) => {
                        updateField(field.id, { x: (d.x / currentWidth) * 100, y: (d.y / currentHeight) * 100 });
                      }}
                      onResizeStop={(e, direction, ref, delta, position) => {
                        updateField(field.id, {
                          width: (parseFloat(ref.style.width) / currentWidth) * 100,
                          height: (parseFloat(ref.style.height) / currentHeight) * 100,
                          x: (position.x / currentWidth) * 100,
                          y: (position.y / currentHeight) * 100
                        });
                      }}
                      style={{ zIndex: isSelected ? 20 : 10 }}
                    >
                      <div
                        onClick={(e) => { e.stopPropagation(); setSelectedFieldId(field.id); }}
                        className={`w-full h-full border-2 flex items-center justify-center relative group transition-colors
                           ${isSelected ? 'border-canada-red bg-red-50/40 ring-2 ring-canada-red/20' : 'border-canada-red/50 bg-red-50/20 hover:border-canada-red'}`}
                      >
                        {field.type === 'text' && <div className="text-[10px] font-bold text-canada-red opacity-50 px-1 truncate w-full text-center">{field.name || "Text"}</div>}
                        {field.type === 'checkbox' && <CheckCircle2 size={12} className="text-canada-red opacity-50" />}
                        {field.type === 'signature' && <div className="text-[10px] font-bold text-purple-600 opacity-70 flex items-center gap-1"><PenTool size={10} /> Sign</div>}

                        {isSelected && (
                          <>
                            <div className="absolute -top-8 right-0 flex gap-1 animate-in fade-in zoom-in duration-200">
                              <button
                                onClick={(e) => { e.stopPropagation(); duplicateField(field.id); }}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-canada-red hover:border-canada-red rounded shadow-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-canada-red"
                                title="Duplicate"
                                aria-label="Duplicate field"
                              >
                                <Copy size={12} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-canada-red hover:border-canada-red rounded shadow-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-canada-red"
                                title="Remove"
                                aria-label="Remove field"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-canada-red rounded-full cursor-se-resize"></div>
                          </>
                        )}
                      </div>
                    </Rnd>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          {selectedField && (
            <FormPropertiesPanel
              field={selectedField}
              onUpdate={updateFieldProperties}
              onClose={() => setSelectedFieldId(null)}
            />
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
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
        {view === 'GUIDE_EPUB_TO_PDF' && <ConvertirEpubEnPdfGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_PDF_TO_EPUB' && <ConvertirPdfEnEpubGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_DELETE_PDF_PAGES' && <DeletePdfPagesGuide lang={lang} onNavigate={handleNavigation} />}
        {view === 'GUIDE_ROTATE_PDF' && <RotatePdfGuide lang={lang} onNavigate={handleNavigation} />}
      </main>

      <Footer lang={lang} onNavigate={handleNavigation} />
    </div>
  );
}

export default App;