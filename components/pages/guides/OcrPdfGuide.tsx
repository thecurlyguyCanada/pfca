import React from 'react';
import { ScanLine, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, Search, FileText } from 'lucide-react';
import { Language } from '../../../utils/i18n';
import { SEO } from '../../SEO';
import { PageLayout } from '../../PageLayout';
import { MarkdownContent } from '../../MarkdownContent';

interface GuideProps {
    lang: Language;
    onNavigate: (view: any, path?: string) => void;
}

const guideContent = {
    en: {
        seo: {
            title: "OCR PDF Online Free | Scanned PDF to Searchable Text | pdfcanada.ca",
            desc: "Convert scanned PDFs to searchable text for free. Use our secure OCR PDF online tool to extract text and make documents searchable. No uploads required."
        },
        h1: "The Ultimate Guide to OCR: Making PDFs Searchable",
        subtitle: "Unlock the hidden text in your scanned documents with advanced Optical Character Recognition.",

        intro: "Have you ever tried to select text in a scanned document only to realize it's just an image? This is where **OCR (Optical Character Recognition)** comes in. Our **OCR PDF online free** tool allow you to transform flat images into **searchable PDF** documents. Whether you need to **convert scanned PDF to text** for a university paper or find a specific clause in a scanned lease agreement, our local-first technology makes it possible without compromising your privacy or data integrity.",

        sections: [
            {
                id: "what-is-ocr",
                title: "What is OCR for PDF?",
                content: `OCR stands for Optical Character Recognition. It's a technology that "reads" the pixels in an image (like a scan) and identifies the alphanumeric characters within. 
By running **OCR on a PDF**, you create an invisible layer of real text over the original image. This means:
- **Searchability**: Use \`Ctrl+F\` to find keywords instantly across hundreds of pages.
- **Selectability**: Copy and paste names, dates, and tables from your document.
- **Accessibility**: This is the first step for **PDF accessibility** (WCAG), allowing screen readers to interpret the page for visually impaired users.`
            },
            {
                id: "how-to",
                title: "How to Make a PDF Searchable locally",
                content: `Unlike other sites that require you to upload sensitive files, pdfcanada.ca processes your OCR on your device:
1. **Upload Your Scanned File**: We support PDFs, JPGs, and PNGs of your documents.
2. **Choose Languages**: Select the languages found in the text. For Canadian users, selecting both English and French significantly improves accuracy for bilingual documents.
3. **Recognize and Save**: Our tool parses the image. You can then download a **Searchable PDF** (image + text layer) or just the **Extracted Text** (.txt).`
            },
            {
                id: "quality-tips",
                title: "Tips for 100% OCR Accuracy",
                content: `The quality of the original scan matters. For the best **scanned PDF to text** results: 
- Use at least 300 DPI when scanning.
- Ensure the page is straight (no skew).
- Remove shadows or dark borders from the edges of the page.
- Our tool handles handwriting, but typed characters offer the highest precision.`
            },
            {
                id: "archival",
                title: "Archival and Government Use",
                content: `Many Canadian government portals (like the CRA or IRCC) require text to be searchable for faster processing. Using an **online OCR tool** that is local-first ensures that your personal records remain yours, while still meeting federal digital submission standards.`
            }
        ],

        faq: [
            {
                q: "Is it safe to use OCR tools for my private documents?",
                a: "Most online tools are 'cloud-based,' meaning your file exists on a foreign server. At pdfcanada.ca, we use **Tesseract.js** to run the OCR engine inside your browser's memory. Your file NEVER leaves your computer."
            },
            {
                q: "How long does OCR take?",
                a: "Since OCR is a compute-heavy task, it depends on your processor speed and the number of pages. On a modern laptop, it takes about 5-10 seconds per page for high-fidelity recognition."
            },
            {
                q: "Can I extract text from a low-quality photo?",
                a: "Yes, but accuracy will decrease. Our tool uses advanced image pre-processing to improve contrast, but high-resolution scans always work best."
            },
            {
                q: "Does this work for French documents?",
                a: "Absolutely. We include specific language models for French to handle accents and unique characters (é, à, ç) perfectly."
            }
        ],

        ctaTitle: "Ready to Make Your Scans Alive?",
        ctaButton: "Start OCR Processing",
        ctaSubtext: "Free, Secure, 100% Locally Processed in Canada."
    },
    fr: {
        seo: {
            title: "OCR PDF Gratuit en Ligne | PDF Numérisé vers Texte | pdfcanada.ca",
            desc: "Convertissez les PDF numérisés en texte consultable gratuitement. Utilisez notre outil OCR PDF sécurisé pour extraire le texte au Canada."
        },
        h1: "Le Guide de l'OCR : Rendre vos PDF Consultables",
        subtitle: "Déverrouillez le texte caché dans vos documents numérisés sans quitter votre ordinateur.",

        intro: "Transformez vos images en documents **PDF consultables**. Notre outil **OCR PDF gratuit** est conçu pour les Canadiens qui exigent la confidentialité totale de leurs documents personnels et professionnels.",

        sections: [
            {
                id: "what-is-ocr",
                title: "Qu'est-ce que l'OCR?",
                content: `La reconnaissance optique de caractères (OCR) permet de transformer une simple image de texte en un fichier où vous pouvez rechercher des mots, copier du texte et utiliser des lecteurs d'écran.`
            },
            {
                id: "why-local-fr",
                title: "Pourquoi le traitement local?",
                content: `Contrairement aux sites qui envoient vos scans à l'étranger, nous traitons tout sur votre appareil. C'est la seule façon de garantir que vos informations sensibles restent privées au Canada.`
            }
        ],

        faq: [
            {
                q: "Est-ce gratuit ?",
                a: "Oui, totalement gratuit et sans limite d'utilisation."
            },
            {
                q: "Puis-je extraire le texte en français ?",
                a: "Oui, notre moteur est optimisé pour reconnaître parfaitement les accents et caractères du français."
            }
        ],

        ctaTitle: "Prêt à déverrouiller vos documents ?",
        ctaButton: "Utiliser l'OCR maintenant",
        ctaSubtext: "Gratuit, sécurisé, traité localement."
    }
};

export const OcrPdfGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/ocr-pdf"
                lang={lang}
                faq={t.faq}
                howTo={{
                    name: "How to Make a PDF Searchable for Free",
                    description: "Learn how to use our free online OCR tool to convert scanned PDFs and images into searchable text documents locally in your browser.",
                    steps: [
                        { name: "Upload Your Scanned File", text: "Select your image-based PDF or scanned document from your device." },
                        { name: "Choose Languages", text: "Select the languages contained in the document (English, French, etc.) for better accuracy." },
                        { name: "Recognize and Save", text: "Our tool processes the image locally. Once finished, download your searchable PDF." }
                    ]
                }}
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<ScanLine size={32} />}>
                <div className="max-w-4xl mx-auto space-y-12">
                    <MarkdownContent content={t.intro} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 border-l-4 border-canada-red pl-6 py-2 italic font-medium" />

                    {/* Content */}
                    <div className="grid md:grid-cols-2 gap-12">
                        {t.sections.map((section) => (
                            <div key={section.id}>
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Search size={20} className="text-canada-red" /> {section.title}
                                </h2>
                                <MarkdownContent content={section.content} />
                            </div>
                        ))}
                    </div>

                    {/* Badge */}
                    <div className="bg-gray-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8">
                        <Zap size={48} className="text-yellow-400 shrink-0" />
                        <div>
                            <h4 className="text-xl font-bold mb-2">Did You Know?</h4>
                            <p className="opacity-80">Our OCR engine is powered by Tesseract.js, meaning the complex computations needed to recognize your handwriting or typed text happen entirely on your device.</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <section className="text-center py-8">
                        <h2 className="text-2xl font-bold mb-6">{t.ctaTitle}</h2>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/ocr-pdf')}
                            className="bg-canada-red text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all"
                        >
                            {t.ctaButton}
                        </button>
                    </section>

                    {/* Related Tools */}
                    <div className="pt-12 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold mb-6">Related Tools</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: 'PDF to EPUB', path: '/pdf-to-epub', desc: 'Convert scans to ebooks' },
                                { name: 'Make Fillable', path: '/make-fillable', desc: 'Add fields to scanned forms' },
                                { name: 'Organize PDF', path: '/organize-pdf', desc: 'Sort your scanned pages' }
                            ].map((tool, i) => (
                                <button
                                    key={i}
                                    onClick={() => onNavigate('TOOL_PAGE', tool.path)}
                                    className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-canada-red transition-all text-left"
                                >
                                    <h5 className="font-bold mb-1">{tool.name}</h5>
                                    <p className="text-sm opacity-60">{tool.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};
