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

        intro: "Have you ever tried to select text in a scanned document only to realize it's just an image? This is where **OCR (Optical Character Recognition)** comes in. Our **OCR PDF online free** tool allow you to transform flat images into **searchable PDF** documents. Whether you need to **convert scanned PDF to text** or find a specific word in an old invoice, our local-first technology makes it possible without compromising your privacy.",

        sections: [
            {
                id: "what-is-ocr",
                title: "What is OCR for PDF?",
                content: `OCR stands for Optical Character Recognition. It's a technology that "reads" the pixels in an image (like a scan) and identifies the alphanumeric characters within. 
By running **OCR on a PDF**, you create an invisible layer of real text over the original image. This means:
- **Searchability**: You can use \`Ctrl+F\` to find keywords.
- **Selectability**: You can copy and paste text from the document.
- **Accessibility**: Screen readers for the visually impaired can finally read the content.`
            },
            {
                id: "how-to",
                title: "How to Make a PDF Searchable for Free",
                content: `1. **Upload Your Scanned File**: Select your image-based PDF.
2. **Choose Languages**: Our **OCR PDF software** supports English, French, and more.
3. **Recognize and Save**: Our tool processes the image locally. Once finished, you'll have a **searchable PDF converter** result ready for download.`
            }
        ],

        faq: [
            {
                q: "Is it safe to use OCR tools online?",
                a: "Most online tools require you to upload your sensitive scans. pdfcanada.ca is different: we use Tesseract.js to run the OCR directly in your browser. Your scans never touch a server."
            },
            {
                q: "How to extract text from a scanned PDF?",
                a: "Use our OCR tool to process the document. Once finished, you can either download the text as a file or download the PDF with a searchable text layer."
            }
        ],

        ctaTitle: "Ready to Unlock Your Documents?",
        ctaButton: "Use OCR Now",
        ctaSubtext: "Free, Secure, Locally Processed."
    },
    fr: {
        seo: {
            title: "OCR PDF Gratuit en Ligne | PDF Numérisé vers Texte | pdfcanada.ca",
            desc: "Convertissez les PDF numérisés en texte consultable gratuitement. Utilisez notre outil OCR PDF sécurisé pour extraire le texte et rendre vos documents consultables."
        },
        h1: "Le Guide Ultime de l'OCR : Rendre vos PDF Consultables",
        subtitle: "Déverrouillez le texte caché dans vos documents numérisés grâce à la reconnaissance optique de caractères.",

        intro: "Transformez vos images en documents **PDF consultables**. Notre outil **OCR PDF gratuit** vous permet de convertir des numérisations en texte sélectionnable sans jamais téléverser vos fichiers.",

        sections: [
            {
                id: "what-is-ocr",
                title: "Qu'est-ce que l'OCR pour PDF?",
                content: `L'OCR signifie reconnaissance optique de caractères. C'est une technologie qui « lit » les pixels d'une image et identifie les caractères alphanumériques.`
            }
        ],

        faq: [
            {
                q: "Est-ce sûr?",
                a: "Oui, tout est traité localement."
            }
        ],

        ctaTitle: "Prêt à déverrouiller vos documents?",
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

                    {/* FAQ */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold mb-6">FAQ</h3>
                        {t.faq.map((item, i) => (
                            <details key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl cursor-pointer">
                                <summary className="font-bold">{item.q}</summary>
                                <MarkdownContent content={item.a} className="mt-4 opacity-80" />
                            </details>
                        ))}
                    </div>
                </div>
            </PageLayout>
        </>
    );
};
