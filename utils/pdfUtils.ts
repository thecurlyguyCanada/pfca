import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib';
import * as pdfjsLibModule from 'pdfjs-dist';
import JSZip from 'jszip';
import heic2any from 'heic2any';

// Robustly resolve the library object
const pdfjsLib = (pdfjsLibModule as any).default || pdfjsLibModule;

let workerInitialized = false;

export const initPdfWorker = () => {
  if (!workerInitialized && typeof window !== 'undefined') {
    if (pdfjsLib.GlobalWorkerOptions) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
      workerInitialized = true;
    }
  }
};

export const getPdfJsDocument = async (file: File) => {
  try {
    initPdfWorker();
    const arrayBuffer = await file.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
    });

    return loadingTask.promise;
  } catch (error) {
    // Re-throw raw error for App.tsx to analyze (e.g. PasswordException)
    throw error;
  }
};

export const loadPdfDocument = async (file: File): Promise<{ doc: PDFDocument; pageCount: number }> => {
  const arrayBuffer = await file.arrayBuffer();
  // PDFDocument.load will throw if encrypted or corrupt
  const doc = await PDFDocument.load(arrayBuffer);
  return { doc, pageCount: doc.getPageCount() };
};

export const deletePagesFromPdf = async (originalFile: File, pageIndicesToDelete: number[]): Promise<Uint8Array> => {
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
  const arrayBuffer = await originalFile.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  const pages = doc.getPages();

  pages.forEach((page, index) => {
    const rotationToAdd = rotations[index] || 0;
    if (rotationToAdd !== 0) {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + rotationToAdd));
    }
  });

  return await doc.save();
};

export const makePdfFillable = async (originalFile: File, pageIndicesToFill: number[]): Promise<Uint8Array> => {
  // Initialize worker for text analysis
  initPdfWorker();

  const arrayBuffer = await originalFile.arrayBuffer();
  const doc = await PDFDocument.load(arrayBuffer);
  const form = doc.getForm();

  // Load PDF.js document for text analysis
  const pdfJsDoc = await pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
  }).promise;

  let fieldCount = 0;
  const timestamp = Date.now();

  for (const pageIndex of pageIndicesToFill) {
    if (pageIndex < 0 || pageIndex >= doc.getPageCount()) continue;

    const pdfLibPage = doc.getPage(pageIndex);
    const { width: pageWidth, height: pageHeight } = pdfLibPage.getSize();

    // Analyze page text to find underscores ____ or brackets [ ]
    let pageHasFields = false;

    try {
      const pdfJsPage = await pdfJsDoc.getPage(pageIndex + 1); // PDF.js is 1-based
      const textContent = await pdfJsPage.getTextContent();

      for (const item of textContent.items as any[]) {
        const str = item?.str || '';
        if (!str) continue;

        // Heuristic 1: Lines/Underscores (_____)
        // Looks for 3 or more underscores
        if (/__{3,}/.test(str)) {
          if (!item.transform) continue;
          const tx = item.transform[4];
          const ty = item.transform[5];
          const w = item.width || 0;
          // Use transform[3] (scaleY) as proxy for font height if height is missing
          const h = item.height || item.transform[3] || 12;

          const fieldName = `txt_${pageIndex}_${fieldCount++}`;
          const textField = form.createTextField(fieldName);

          // Align the text field over the underscores
          textField.addToPage(pdfLibPage, {
            x: tx,
            y: ty - 2, // Slight adjustment to cover baseline
            width: w,
            height: h + 4, // Slightly taller for comfort
            borderColor: rgb(0.9, 0.9, 0.9),
            borderWidth: 0, // No border, just fill over
          });

          pageHasFields = true;
        }
        // Heuristic 2: Checkboxes ([ ] or [x] or similar)
        else if (/\[\s*\]/.test(str) || /☐/.test(str)) {
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

    // Fallback: If no smart fields detected on this page, add the "General Notes" field
    if (!pageHasFields) {
      const margin = 50;
      const textField = form.createTextField(`notes_${pageIndex}_${timestamp}`);

      textField.addToPage(pdfLibPage, {
        x: margin,
        y: margin,
        width: pageWidth - (margin * 2),
        height: pageHeight - (margin * 2),
        borderWidth: 1,
        borderColor: rgb(0.8, 0.8, 0.8), // Light gray border
      });

      textField.enableMultiline();
      // Polite placeholder
      textField.setText("Enter your notes here...");
    }
  }

  return await doc.save();
};

export const convertHeicToPdf = async (file: File): Promise<Uint8Array> => {
  // Convert HEIC to JPEG blob
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
  initPdfWorker();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
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

  return await zip.generateAsync({ type: "blob" });
};

export const convertEpubToPdf = async (file: File): Promise<Uint8Array> => {
  const zip = new JSZip();
  const content = await zip.loadAsync(file);

  // Very basic text extraction strategy for "Simple" conversion
  let textContent = "";

  // Try to find HTML/XHTML files
  const htmlFiles: string[] = [];
  content.forEach((relativePath) => {
    if (relativePath.endsWith(".html") || relativePath.endsWith(".xhtml")) {
      htmlFiles.push(relativePath);
    }
  });

  // Sort vaguely to try and keep order (imperfect without parsing OPF properly, but "simple")
  htmlFiles.sort();

  for (const path of htmlFiles) {
    const html = await content.file(path)?.async("string");
    if (html) {
      // Strip tags
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

  // Basic pagination
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