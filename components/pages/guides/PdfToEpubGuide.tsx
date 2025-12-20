import React from 'react';
import { FileText, CheckCircle, Shield, Zap, ArrowRight, Tablet } from 'lucide-react';
import { Language } from '../../../utils/i18n';
import { SEO } from '../../SEO';
import { PageLayout } from '../../PageLayout';
import { MarkdownContent } from '../../MarkdownContent';

interface GuideProps {
    lang: Language;
    onNavigate: (view: any, path?: string) => void;
}

const guideContent = {
    fr: {
        seo: {
            title: "Convertir PDF en EPUB Gratuit | pdf a epub | pdfcanada.ca",
            desc: "Convertir pdf en epub facilement. Transformez vos documents PDF en ebooks lisibles sur Kindle, Kobo et toutes les liseuses. Conversion gratuite et sécurisée."
        },
        h1: "Convertir PDF en EPUB",
        subtitle: "Transformez vos PDF en ebooks pour liseuses",
        intro: "Vous souhaitez lire vos documents PDF sur votre liseuse Kindle ou Kobo? Notre convertisseur gratuit transforme vos fichiers PDF en format EPUB, le standard des livres numériques. Profitez d'une meilleure expérience de lecture avec un texte qui s'adapte automatiquement à la taille de votre écran. Que vous lisiez un rapport d'affaires ou un roman, la conversion **PDF vers EPUB** est le meilleur moyen de ménager vos yeux sur les appareils à encre électronique.",
        whyTitle: "Pourquoi convertir PDF en EPUB?",
        whyReasons: [
            "Lecture confortable sur liseuses (Kindle, Kobo, etc.) sans zoomer",
            "Texte redimensionnable selon vos préférences",
            "Optimisé pour le mode sombre et la lecture nocturne",
            "Navigation facile entre les chapitres via la table des matières",
            "Adapté aux écrans e-ink : meilleure autonomie de batterie",
            "Synchronisation des signets entre vos appareils mobiles"
        ],
        howTitle: "PDF vs EPUB : L'expérience de lecture",
        howSteps: "Sur un petit écran, un PDF nécessite souvent de zoomer et de se déplacer latéralement. En convertissant en EPUB, le texte devient 'fluide'. Il s'adapte à la largeur de votre écran, offrant une expérience similaire à celle d'un vrai livre numérique.",
        steps: [
            {
                title: "Choisissez votre fichier PDF",
                desc: "Sélectionnez le document PDF textuel que vous souhaitez transformer en ebook."
            },
            {
                title: "Analyse intelligente",
                desc: "Notre système extrait le texte et la structure, puis les convertit en format EPUB fluide directement dans votre navigateur."
            },
            {
                title: "Obtenez votre EPUB",
                desc: "Téléchargez votre fichier EPUB et transférez-le sur votre liseuse par USB ou courriel."
            }
        ],
        securityTitle: "Vos documents restent privés",
        securityText: "La confidentialité est notre priorité. Tout le traitement s'effectue localement sur votre appareil. Aucun fichier n'est envoyé sur nos serveurs. Vos œuvres restent entre vos mains.",
        compatTitle: "Compatible avec toutes les liseuses",
        compatText: "L'EPUB est le standard universel. Votre fichier fonctionnera sur :",
        compatList: ["Amazon Kindle (via 'Send to Kindle')", "Kobo", "Apple Books", "Google Play Books", "Tablettes Android", "Calibre"],
        faq: [
            {
                q: "Comment convertir un PDF en EPUB pour Kindle?",
                a: "Convertissez votre PDF en EPUB ici, puis utilisez le service 'Send to Kindle' d'Amazon. Amazon accepte désormais nativement les fichiers EPUB."
            },
            {
                q: "La conversion est-elle gratuite et sécurisée?",
                a: "Oui, c'est entièrement gratuit et 'Local-First'. Vos données ne quittent jamais votre navigateur, ce qui est idéal pour les documents confidentiels."
            },
            {
                q: "Puis-je convertir des PDF numérisés (scans)?",
                a: "Pour les scans, nous recommandons d'utiliser d'abord notre outil OCR pour extraire le texte, sinon l'EPUB ne contiendra que des images."
            }
        ],
        ctaTitle: "Prêt à convertir votre PDF en EPUB?",
        ctaButton: "Commencer la conversion",
        tipsTitle: "Conseils pour une meilleure conversion",
        tips: [
            "Utilisez des PDF avec du texte sélectionnable",
            "Une structure claire avec des titres donne de meilleurs résultats",
            "Évitez les mises en page complexes à plusieurs colonnes",
            "Vérifiez le résultat sur votre liseuse habituelle"
        ],
        relatedTitle: "Outils connexes",
        relatedTools: [
            { name: "EPUB vers PDF", desc: "Convertissez vos ebooks en PDF", path: "/epub-to-pdf" },
            { name: "OCR PDF", desc: "Rendez vos scans cherchables", path: "/ocr-pdf" },
            { name: "Organiser PDF", desc: "Réorganisez les pages", path: "/organize-pdf" }
        ]
    },
    en: {
        seo: {
            title: "Convert PDF to EPUB Free | Online Converter | pdfcanada.ca",
            desc: "Convert PDF to EPUB easily. Transform your PDF documents into readable ebooks for Kindle, Kobo, and all e-readers. Free and secure conversion."
        },
        h1: "Convert PDF to EPUB",
        subtitle: "Transform your PDFs into ebooks for e-readers",
        intro: "Want to read your PDF documents on your Kindle or Kobo e-reader? Our free converter transforms your PDF files into EPUB format, the standard for digital books. Enjoy a better reading experience with text that automatically adapts to your screen size. Whether you're catching up on a long business report or reading a self-published novel, converting **PDF to EPUB** is the best way to save your eyes and improve retention on e-ink devices.",
        whyTitle: "Why convert PDF to EPUB?",
        whyReasons: [
            "Comfortable reading on e-readers (Kindle, Kobo, etc.) without zooming",
            "Resizable text and fonts according to your preferences",
            "Optimized for Dark Mode and Night Reading on tablets",
            "Easy navigation via generated Table of Contents",
            "E-ink friendly: Better battery life and less screen refreshing",
            "Bookmark and highlight synchronization across mobile apps"
        ],
        howTitle: "PDF vs. EPUB: The Reading Experience",
        howSteps: "When you read a PDF on a small screen (like a phone or paper-white Kindle), you often have to pinch and zoom to read small text. By converting to EPUB, the text 'reflows'. This means the sentences adjust their length to fit your screen perfectly. It’s like turning a static photo of a book into a living, responsive document.",
        steps: [
            {
                title: "Choose your PDF file",
                desc: "Select the PDF document you want to transform. Our engine works best with text-based PDFs (e.g., from Word or Google Docs)."
            },
            {
                title: "Intelligent content analysis",
                desc: "Our script identifies headings, paragraphs, and images. It strips away fixed-page formatting to allow for a flexible ebook layout."
            },
            {
                title: "Get your EPUB",
                desc: "Download your EPUB file. You can now 'Send to Kindle' via email or drag it onto your Kobo via USB."
            }
        ],
        securityTitle: "Privacy for Authors and Readers",
        securityText: "Whether you're an author protecting a new manuscript or a business leader reading a confidential report, privacy is paramount. pdfcanada.ca uses **local browser processing**. Your document is never uploaded to a server, ensuring your intellectual property remains 100% on your device at all times.",
        compatTitle: "Compatible with Every Major Device",
        compatText: "EPUB is the international standard for digital publishing. Your converted file will work seamlessly on:",
        compatList: ["Amazon Kindle (using 'Send to Kindle')", "Rakuten Kobo", "PocketBook", "Apple Books (iPhone/iPad)", "Google Play Books", "Android tablets", "Calibre Ebook Management"],
        faq: [
            {
                q: "How to convert PDF to EPUB for Kindle?",
                a: "Convert your file to EPUB on our site, then use Amazon's 'Send to Kindle' service (email or web). Amazon now supports EPUB natively and will deliver it to your device in minutes."
            },
            {
                q: "Is PDF to EPUB conversion free and safe?",
                a: "Yes. Our service is 100% free with no account required. It is 'Local-First,' meaning your data stays safe in your browser and is never stored on a cloud server."
            },
            {
                q: "Can I convert scanned books to EPUB?",
                a: "Scanned PDFs (photos of pages) don't have selection text. To convert these, you should first use our **OCR PDF tool** to extract the text, otherwise, the EPUB will just be a series of images."
            }
        ],
        ctaTitle: "Ready to Start Reading Your PDF as an Ebook?",
        ctaButton: "Convert PDF to EPUB Now",
        tipsTitle: "Ebook Optimization Tips",
        tips: [
            "Use 'Clean' PDFs without background watermarks",
            "Ensure your PDF has a logical heading structure (H1, H2)",
            "Remove unnecessary headers/footers before converting",
            "Review the EPUB in a viewer like 'Apple Books' before syncing to Kobo"
        ],
        relatedTitle: "More Tools for E-Readers",
        relatedTools: [
            { name: "EPUB to PDF", desc: "Turn ebooks into printable documents", path: "/epub-to-pdf" },
            { name: "OCR PDF", desc: "Unlock text in scanned images", path: "/ocr-pdf" },
            { name: "Organize PDF", desc: "Rearrange pages", path: "/organize-pdf" }
        ]
    }
};

export const PdfToEpubGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang];

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": t.h1,
            "description": t.seo.desc,
            "step": t.steps.map((step: any, i: number) => ({
                "@type": "HowToStep",
                "position": i + 1,
                "name": step.title,
                "text": step.desc
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": t.faq.map((item: any) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a
                }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://pdfcanada.ca/" },
                { "@type": "ListItem", "position": 2, "name": t.h1, "item": "https://pdfcanada.ca/guides/convertir-pdf-en-epub" }
            ]
        }
    ];

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/convertir-pdf-en-epub"
                lang={lang}
                schema={schema}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Guides', path: '/guides/ultimate-pdf-guide' },
                    { name: 'PDF to EPUB', path: '/guides/convertir-pdf-en-epub' }
                ]}
            />
            <PageLayout
                title={t.h1}
                subtitle={t.subtitle}
                icon={<FileText size={32} />}
                breadcrumbs={[
                    { name: 'Home', onClick: () => onNavigate('HOME') },
                    { name: 'Guides', onClick: () => onNavigate('GUIDE_ULTIMATE') },
                    { name: 'PDF to EPUB Guide', onClick: () => { } }
                ]}
            >
                <div className="space-y-12 text-gray-700 dark:text-gray-300">
                    {/* Intro */}
                    <MarkdownContent content={t.intro} className="text-lg leading-relaxed" />

                    {/* Why Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{(t as any).whyTitle}</h2>
                        <ul className="space-y-3">
                            {(t as any).whyReasons.map((reason: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* How To Steps */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{(t as any).howTitle}</h2>
                        <div className="space-y-4">
                            {t.steps.map((step: any, i: number) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4">
                                    <div className="bg-canada-red text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-lg">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{step.title}</h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Compatibility Section */}
                    <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                            <Tablet className="text-blue-600 shrink-0" size={28} />
                            <div>
                                <h2 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-2">{(t as any).compatTitle}</h2>
                                <MarkdownContent content={(t as any).compatText} className="text-blue-800 dark:text-blue-400 mb-3" />
                                <ul className="grid grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-400">
                                    {(t as any).compatList.map((item: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Security Section */}
                    <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                            <Shield className="text-green-600 shrink-0" size={28} />
                            <div>
                                <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">{(t as any).securityTitle}</h2>
                                <MarkdownContent content={(t as any).securityText} className="text-green-800 dark:text-green-400" />
                            </div>
                        </div>
                    </section>

                    {/* Tips Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{(t as any).tipsTitle}</h2>
                        <ul className="space-y-2">
                            {(t as any).tips.map((tip: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                    <span className="text-amber-600 font-bold">{i + 1}.</span>
                                    <span className="text-amber-800 dark:text-amber-300">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* CTA */}
                    <section className="bg-canada-red/5 dark:bg-canada-red/10 border border-canada-red/20 p-8 rounded-xl text-center">
                        <Zap className="text-canada-red mx-auto mb-4" size={40} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{(t as any).ctaTitle}</h2>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/pdf-to-epub')}
                            className="inline-flex items-center gap-2 bg-canada-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2"
                        >
                            {(t as any).ctaButton} <ArrowRight size={20} />
                        </button>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQ</h2>
                        <div className="space-y-4">
                            {t.faq.map((item: any, i: number) => (
                                <details key={i} className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <summary className="p-4 font-bold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center hover:text-canada-red transition-colors">
                                        {item.q}
                                        <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Related Tools */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{(t as any).relatedTitle}</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {(t as any).relatedTools.map((tool: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => onNavigate('TOOL_PAGE', tool.path)}
                                    className="text-left p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-canada-red transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red"
                                >
                                    <h3 className="font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{tool.desc}</p>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </PageLayout>
        </>
    );
};
