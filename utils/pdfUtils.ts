// Utility for dynamic imports of heavy libraries
const loadPdfLib = () => import('pdf-lib');
const loadPdfJs = () => import('pdfjs-dist');
const loadJsZip = () => import('jszip');
const loadHeic2Any = () => import('heic2any');
const loadTesseract = () => import('tesseract.js');

let workerInitialized = false;

export const initPdfWorker = async () => {
  if (workerInitialized || typeof window === 'undefined') return;

  const { default: pdfjsLibModule } = await loadPdfJs();
  const pdfjsLib = (pdfjsLibModule as any).default || pdfjsLibModule;
  const { default: pdfWorkerSrc } = await import('pdfjs-dist/build/pdf.worker.min.js?url' as any);

  if (pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc || 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    workerInitialized = true;
  }
};

export const getPdfJsDocument = async (source: File | ArrayBuffer) => {
  try {
    const { default: pdfjsLibModule } = await loadPdfJs();
    const pdfjsLib = (pdfjsLibModule as any).default || pdfjsLibModule;
    await initPdfWorker();

    const data = source instanceof File ? await source.arrayBuffer() : source;

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(data),
      cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
    });

    return loadingTask.promise;
  } catch (error) {
    throw error;
  }
};

export const loadPdfDocument = async (file: File): Promise<{ doc: any; pageCount: number }> => {
  const { PDFDocument } = await loadPdfLib();
  const arrayBuffer = await file.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  return { doc, pageCount: doc.getPageCount() };
};

export const reorderPdfPages = async (originalFile: File, newOrder: number[]): Promise<Uint8Array> => {
  const { PDFDocument } = await loadPdfLib();
  const arrayBuffer = await originalFile.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(doc, newOrder);

  copiedPages.forEach((page: any) => {
    newDoc.addPage(page);
  });

  return await newDoc.save();
};

export const deletePagesFromPdf = async (originalFile: File, pageIndicesToDelete: number[]): Promise<Uint8Array> => {
  const { PDFDocument } = await loadPdfLib();
  const arrayBuffer = await originalFile.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);

  const sortedIndices = [...pageIndicesToDelete].sort((a, b) => b - a);

  sortedIndices.forEach((index) => {
    if (index >= 0 && index < doc.getPageCount()) {
      doc.removePage(index);
    }
  });

  return await doc.save();
};

export const rotatePdfPages = async (originalFile: File, rotations: Record<number, number>): Promise<Uint8Array> => {
  const { PDFDocument, degrees } = await loadPdfLib();
  const arrayBuffer = await originalFile.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  const pages = doc.getPages();

  pages.forEach((page: any, index: number) => {
    const rotationToAdd = rotations[index] || 0;
    if (rotationToAdd !== 0) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + rotationToAdd));
    }
  });

  return await doc.save();
};

export const makePdfFillable = async (originalFile: File, pageIndicesToFill: number[]): Promise<Uint8Array> => {
  const [{ PDFDocument, rgb }, pdfJsDocModule] = await Promise.all([loadPdfLib(), loadPdfJs()]);
  await initPdfWorker();

  const arrayBuffer = await originalFile.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  const form = doc.getForm();
  const pdfJsDoc = await getPdfJsDocument(arrayBuffer);

  let fieldCount = 0;
  const timestamp = Date.now();

  for (const pageIndex of pageIndicesToFill) {
    if (pageIndex < 0 || pageIndex >= doc.getPageCount()) continue;

    const pdfLibPage = doc.getPage(pageIndex);
    const { width: pageWidth, height: pageHeight } = pdfLibPage.getSize();

    let pageHasFields = false;

    try {
      const pdfJsPage = await pdfJsDoc.getPage(pageIndex + 1);
      const textContent = await pdfJsPage.getTextContent();

      for (const item of textContent.items as any[]) {
        const str = item?.str || '';
        if (!str) continue;

        if (/__{3,}/.test(str)) {
          if (!item.transform) continue;
          const tx = item.transform[4];
          const ty = item.transform[5];
          const w = item.width || 0;
          const h = item.height || item.transform[3] || 12;

          const fieldName = `txt_${pageIndex}_${fieldCount++}`;
          const textField = form.createTextField(fieldName);

          textField.addToPage(pdfLibPage, {
            x: tx,
            y: ty - 2,
            width: w,
            height: h + 4,
            borderColor: rgb(0.9, 0.9, 0.9),
            borderWidth: 0,
          });

          pageHasFields = true;
        } else if (/\[\s*\]/.test(str) || /☐/.test(str)) {
          if (!item.transform) continue;
          const tx = item.transform[4];
          const ty = item.transform[5];
          const size = (item.height || item.transform[3] || 12) * 1.2;

          const fieldName = `chk_${pageIndex}_${fieldCount++}`;
          const checkBox = form.createCheckBox(fieldName);
          checkBox.addToPage(pdfLibPage, {
            x: tx,
            y: ty,
            width: size,
            height: size,
            borderColor: rgb(0.5, 0.5, 0.5),
            borderWidth: 1,
          });
          pageHasFields = true;
        }
      }
    } catch (e) {
      console.warn(`Smart detection failed for page ${pageIndex}, falling back to manual mode.`, e);
    }

    if (!pageHasFields) {
      const margin = 50;
      const textField = form.createTextField(`notes_${pageIndex}_${timestamp}`);

      textField.addToPage(pdfLibPage, {
        x: margin,
        y: margin,
        width: pageWidth - (margin * 2),
        height: pageHeight - (margin * 2),
        borderWidth: 1,
        borderColor: rgb(0.8, 0.8, 0.8),
      });

      textField.enableMultiline();
      textField.setText("Enter your notes here...");
    }
  }

  return await doc.save();
};

export interface FormField {
  id: string;
  type: 'text' | 'checkbox' | 'signature';
  pageIndex: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  width: number; // Percentage
  height: number; // Percentage
  label?: string; // Internal ID Label
  name?: string; // Export Value Name
  required?: boolean;
  readOnly?: boolean;
  toolTip?: string;
}

export const saveFormFieldsToPdf = async (originalFile: File, fields: FormField[]): Promise<Uint8Array> => {
  const { PDFDocument, rgb } = await loadPdfLib();
  const arrayBuffer = await originalFile.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  const form = doc.getForm();

  for (const field of fields) {
    try {
      const page = doc.getPage(field.pageIndex);
      const { width: pageWidth, height: pageHeight } = page.getSize();

      const x = (field.x / 100) * pageWidth;
      const w = (field.width / 100) * pageWidth;
      const h = (field.height / 100) * pageHeight;
      const y = pageHeight - ((field.y / 100) * pageHeight) - h;

      const fieldName = field.name || field.id;

      if (field.type === 'text' || field.type === 'signature') {
        const textField = form.createTextField(fieldName);
        if (field.label) textField.setText(field.label);

        textField.addToPage(page, {
          x,
          y,
          width: w,
          height: h,
          borderWidth: field.type === 'signature' ? 0 : 1,
          borderColor: rgb(0, 0, 0),
          backgroundColor: field.type === 'signature' ? rgb(0.95, 0.95, 0.95) : undefined
        });

        if (field.required) textField.enableRequired();
        if (field.readOnly) textField.enableReadOnly();
      } else if (field.type === 'checkbox') {
        const checkBox = form.createCheckBox(fieldName);
        checkBox.addToPage(page, { x, y, width: w, height: h, borderWidth: 1, borderColor: rgb(0, 0, 0) });
        if (field.required) checkBox.enableRequired();
        if (field.readOnly) checkBox.enableReadOnly();
      }
    } catch (e) {
      console.warn("Failed to add field", field, e);
    }
  }

  return await doc.save();
};

export const convertHeicToPdf = async (file: File): Promise<Uint8Array> => {
  const [{ default: heic2any }, { PDFDocument }] = await Promise.all([loadHeic2Any(), loadPdfLib()]);
  const convertedBlobOrBlobs = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.8
  });

  const blobs = Array.isArray(convertedBlobOrBlobs) ? convertedBlobOrBlobs : [convertedBlobOrBlobs];
  const doc = await PDFDocument.create();

  for (const blob of blobs) {
    const arrayBuffer = await blob.arrayBuffer();
    const image = await doc.embedJpg(arrayBuffer);
    const page = doc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return await doc.save();
};

export const convertPdfToEpub = async (file: File): Promise<Blob> => {
  const { default: JSZip } = await loadJsZip();
  const pdf = await getPdfJsDocument(file);

  const escapeXhtml = (text: string) =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => escapeXhtml(item.str ?? ''));
    fullText += `<h2>Page ${i}</h2><p>${strings.join(' ')}</p><hr/>`;
  }

  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip", { compression: "STORE" });
  zip.folder("META-INF")?.file("container.xml", `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

  const oebps = zip.folder("OEBPS");
  oebps?.file("content.xhtml", `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Converted PDF</title></head>
<body>${fullText}</body>
</html>`);

  oebps?.file("content.opf", `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>Converted PDF</dc:title>
    <dc:language>en</dc:language>
  </metadata>
  <manifest>
    <item id="content" href="content.xhtml" media-type="application/xhtml+xml"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="content"/>
  </spine>
</package>`);

  oebps?.file("toc.ncx", `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head><meta name="dtb:uid" content="urn:uuid:12345"/></head>
  <docTitle><text>Converted PDF</text></docTitle>
  <navMap>
    <navPoint id="navPoint-1" playOrder="1">
      <navLabel><text>Content</text></navLabel>
      <content src="content.xhtml"/>
    </navPoint>
  </navMap>
</ncx>`);

  return await zip.generateAsync({ type: "blob", mimeType: "application/epub+zip" });
};

export const convertEpubToPdf = async (file: File): Promise<Uint8Array> => {
  const [{ default: JSZip }, { PDFDocument, StandardFonts }] = await Promise.all([loadJsZip(), loadPdfLib()]);
  const zip = new JSZip();
  const content = await zip.loadAsync(file);

  let textContent = "";
  const htmlFiles: string[] = [];
  content.forEach((relativePath) => {
    if (relativePath.endsWith(".html") || relativePath.endsWith(".xhtml")) {
      htmlFiles.push(relativePath);
    }
  });

  htmlFiles.sort(new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare);

  for (const path of htmlFiles) {
    const html = await content.file(path)?.async("string");
    if (html) {
      const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      textContent += text + "\n\n";
    }
  }

  if (!textContent) {
    throw new Error("Could not extract text from EPUB");
  }

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);

  const fontSize = 12;
  const margin = 50;

  let page = doc.addPage();
  const { height } = page.getSize();
  let y = height - margin;

  const lines = textContent.match(/.{1,90}(\s|$)/g) || [];

  for (const line of lines) {
    if (y < margin + fontSize) {
      page = doc.addPage();
      y = height - margin;
    }
    page.drawText(line.trim(), { x: margin, y, size: fontSize, font });
    y -= (fontSize + 4);
  }

  return await doc.save();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// OCR function using Tesseract.js
export const extractTextWithOcr = async (
  file: File,
  pageIndices: number[],
  onProgress?: (progress: number, status: string) => void,
  onPageComplete?: (pageIndex: number, text: string) => void
): Promise<string> => {
  const { createWorker } = await loadTesseract();
  await initPdfWorker();

  const pdfJsDoc = await getPdfJsDocument(file);
  let fullText = '';

  let currentPageIndex = 0;
  const worker = await createWorker('eng+fra', 1, {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        const pageProgress = Math.round((currentPageIndex / pageIndices.length) * 100);
        const subProgress = Math.round(m.progress * (100 / pageIndices.length));
        onProgress?.(pageProgress + subProgress, `OCR on page ${pageIndices[currentPageIndex] + 1}...`);
      }
    }
  });

  try {
    for (let i = 0; i < pageIndices.length; i++) {
      currentPageIndex = i;
      const pageIndex = pageIndices[i];
      const pageNum = pageIndex + 1;

      onProgress?.(
        Math.round((i / pageIndices.length) * 100),
        `Processing page ${pageNum}...`
      );

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      try {
        const page = await pdfJsDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (!context) continue;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), 'image/png');
        });

        const result = await worker.recognize(blob);
        const pageText = result.data.text;
        fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`;
        onPageComplete?.(pageIndex, pageText);
      } catch (err) {
        console.error(`OCR failed for page ${pageNum}:`, err);
        fullText += `--- Page ${pageNum} ---\n[OCR failed for this page]\n\n`;
        onPageComplete?.(pageIndex, "[OCR failed for this page]");
      } finally {
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        canvas.width = 0;
        canvas.height = 0;
      }
    }
  } finally {
    await worker.terminate();
  }

  onProgress?.(100, 'Complete!');
  return fullText.trim();
};

// OCR to searchable PDF - adds text layer to scanned PDF
export const makeSearchablePdf = async (
  file: File,
  pageIndices: number[],
  onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> => {
  const [{ PDFDocument, StandardFonts }, { createWorker }] = await Promise.all([loadPdfLib(), loadTesseract()]);
  await initPdfWorker();

  const arrayBuffer = await file.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  const pdfJsDoc = await getPdfJsDocument(arrayBuffer);
  const font = await doc.embedFont(StandardFonts.Helvetica);

  let currentPageIndex = 0;
  const worker = await createWorker('eng+fra', 1, {
    logger: (m) => {
      if (onProgress && m.status === 'recognizing text') {
        const pageProgress = Math.round((currentPageIndex / pageIndices.length) * 100);
        const subProgress = Math.round(m.progress * (100 / pageIndices.length));
        onProgress(pageProgress + subProgress, `OCR on page ${pageIndices[currentPageIndex] + 1}...`);
      }
    }
  });

  try {
    for (let i = 0; i < pageIndices.length; i++) {
      currentPageIndex = i;
      const pageIndex = pageIndices[i];
      const pageNum = pageIndex + 1;

      onProgress?.(Math.round((i / pageIndices.length) * 100), `OCR on page ${pageNum}...`);

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      try {
        const pdfJsPage = await pdfJsDoc.getPage(pageNum);
        const viewport = pdfJsPage.getViewport({ scale: 2 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (!context) continue;

        await pdfJsPage.render({ canvasContext: context, viewport }).promise;

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), 'image/png');
        });

        const result = await worker.recognize(blob);
        const pdfLibPage = doc.getPage(pageIndex);
        const { width: pageWidth, height: pageHeight } = pdfLibPage.getSize();
        const scaleX = pageWidth / viewport.width;
        const scaleY = pageHeight / viewport.height;

        const words = (result.data as any).words || [];
        for (const word of words) {
          if (!word.text || !word.bbox) continue;
          const x = word.bbox.x0 * scaleX;
          const y = pageHeight - (word.bbox.y1 * scaleY);
          const fontSize = Math.max(6, (word.bbox.y1 - word.bbox.y0) * scaleY * 0.8);

          pdfLibPage.drawText(word.text, { x, y, size: fontSize, font, opacity: 0 });
        }
      } catch (err) {
        console.error(`OCR failed for page ${pageNum}:`, err);
      } finally {
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        canvas.width = 0;
        canvas.height = 0;
      }
    }
  } finally {
    await worker.terminate();
  }

  onProgress?.(100, 'Complete!');
  return await doc.save();
};
