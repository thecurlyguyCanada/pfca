import React from 'react';
import { FileText, CheckCircle, Shield, Zap, ArrowRight, Tablet } from 'lucide-react';
import { Language } from '../../../utils/i18n';
import { SEO } from '../../SEO';
import { PageLayout } from '../../PageLayout';

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
        intro: "Vous souhaitez lire vos documents PDF sur votre liseuse Kindle ou Kobo? Notre convertisseur gratuit transforme vos fichiers PDF en format EPUB, le standard des livres numériques. Profitez d'une meilleure expérience de lecture avec un texte qui s'adapte automatiquement à la taille de votre écran.",
        whyTitle: "Pourquoi convertir PDF en EPUB?",
        whyReasons: [
            "Lecture confortable sur liseuses (Kindle, Kobo, etc.)",
            "Texte redimensionnable selon vos préférences",
            "Navigation facile entre les chapitres",
            "Moins fatigant pour les yeux",
            "Synchronisation des signets entre appareils"
        ],
        howTitle: "Comment convertir un PDF en EPUB?",
        steps: [
            {
                title: "Choisissez votre fichier PDF",
                desc: "Sélectionnez le document PDF que vous souhaitez transformer en ebook. Notre outil accepte tous les types de PDF textuels."
            },
            {
                title: "Analyse intelligente du contenu",
                desc: "Notre système analyse la structure de votre document: paragraphes, titres, images. La conversion se fait entièrement dans votre navigateur."
            },
            {
                title: "Obtenez votre EPUB",
                desc: "Téléchargez votre fichier EPUB et transférez-le sur votre liseuse via USB ou par courriel. Bonne lecture!"
            }
        ],
        securityTitle: "Vos documents restent privés",
        securityText: "La confidentialité de vos documents est notre priorité. Tout le traitement s'effectue localement sur votre appareil. Aucun fichier n'est envoyé sur nos serveurs. Vos PDF personnels, professionnels ou confidentiels restent entre vos mains.",
        compatTitle: "Compatible avec toutes les liseuses",
        compatText: "Le format EPUB est le standard universel des ebooks. Votre fichier converti fonctionnera sur:",
        compatList: ["Amazon Kindle (avec conversion Calibre)", "Kobo", "Apple Books", "Google Play Books", "Tablettes Android", "Tous les lecteurs EPUB"],
        faq: [
            {
                q: "Comment convertir un PDF en EPUB pour Kindle?",
                a: "Utilisez notre outil pour convertir votre PDF en EPUB, puis utilisez le logiciel gratuit Calibre pour le convertir en format MOBI/AZW3 compatible Kindle. Vous pouvez aussi envoyer l'EPUB par courriel à votre Kindle."
            },
            {
                q: "La conversion PDF vers EPUB est-elle gratuite?",
                a: "Oui, notre service est entièrement gratuit. Pas d'inscription, pas de limite de fichiers, pas de frais cachés. C'est notre engagement envers les Canadiens."
            },
            {
                q: "Puis-je convertir des PDF numérisés (scannés)?",
                a: "Notre outil fonctionne mieux avec les PDF contenant du texte réel. Pour les documents numérisés, nous vous recommandons d'utiliser d'abord notre outil OCR pour extraire le texte."
            },
            {
                q: "Comment garder la mise en page lors de la conversion?",
                a: "Le format EPUB est 'fluide' par nature, ce qui signifie que le texte s'adapte à l'écran. Nous préservons la structure (titres, paragraphes) mais la mise en page exacte peut varier selon l'appareil de lecture."
            },
            {
                q: "Combien de temps prend la conversion?",
                a: "La plupart des conversions prennent quelques secondes. Les documents très longs peuvent prendre un peu plus de temps. Tout dépend de la puissance de votre ordinateur puisque le traitement est local."
            },
            {
                q: "Mes images sont-elles conservées?",
                a: "Oui, nous faisons de notre mieux pour inclure les images de votre PDF dans le fichier EPUB final. Les images complexes ou les graphiques peuvent nécessiter des ajustements."
            }
        ],
        ctaTitle: "Convertissez votre PDF en EPUB maintenant",
        ctaButton: "Commencer la conversion",
        tipsTitle: "Conseils pour une meilleure conversion",
        tips: [
            "Utilisez des PDF avec du texte sélectionnable (pas des scans)",
            "Les PDF bien structurés avec des titres donnent de meilleurs résultats",
            "Évitez les PDF avec des mises en page complexes (colonnes multiples)",
            "Vérifiez le résultat sur votre liseuse avant de supprimer l'original"
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
        intro: "Want to read your PDF documents on your Kindle or Kobo e-reader? Our free converter transforms your PDF files into EPUB format, the standard for digital books. Enjoy a better reading experience with text that automatically adapts to your screen size.",
        whyTitle: "Why convert PDF to EPUB?",
        whyReasons: [
            "Comfortable reading on e-readers (Kindle, Kobo, etc.)",
            "Resizable text according to your preferences",
            "Easy navigation between chapters",
            "Less tiring for your eyes",
            "Bookmark synchronization across devices"
        ],
        howTitle: "How to convert PDF to EPUB?",
        steps: [
            {
                title: "Choose your PDF file",
                desc: "Select the PDF document you want to transform into an ebook. Our tool accepts all types of text-based PDFs."
            },
            {
                title: "Intelligent content analysis",
                desc: "Our system analyzes your document's structure: paragraphs, headings, images. Conversion happens entirely in your browser."
            },
            {
                title: "Get your EPUB",
                desc: "Download your EPUB file and transfer it to your e-reader via USB or email. Happy reading!"
            }
        ],
        securityTitle: "Your documents stay private",
        securityText: "The privacy of your documents is our priority. All processing happens locally on your device. No files are sent to our servers. Your personal, professional, or confidential PDFs stay in your hands.",
        compatTitle: "Compatible with all e-readers",
        compatText: "EPUB format is the universal ebook standard. Your converted file will work on:",
        compatList: ["Amazon Kindle (with Calibre conversion)", "Kobo", "Apple Books", "Google Play Books", "Android tablets", "All EPUB readers"],
        faq: [
            {
                q: "How to convert PDF to EPUB for Kindle?",
                a: "Use our tool to convert your PDF to EPUB, then use the free Calibre software to convert it to MOBI/AZW3 Kindle-compatible format. You can also email the EPUB to your Kindle."
            },
            {
                q: "Is PDF to EPUB conversion free?",
                a: "Yes, our service is completely free. No signup, no file limits, no hidden fees. That's our commitment to Canadians."
            },
            {
                q: "Can I convert scanned PDFs?",
                a: "Our tool works best with PDFs containing real text. For scanned documents, we recommend using our OCR tool first to extract the text."
            },
            {
                q: "How to keep the layout during conversion?",
                a: "EPUB format is 'fluid' by nature, meaning text adapts to the screen. We preserve structure (headings, paragraphs) but exact layout may vary by reading device."
            },
            {
                q: "How long does conversion take?",
                a: "Most conversions take a few seconds. Very long documents may take slightly longer. It all depends on your computer's power since processing is local."
            },
            {
                q: "Are my images preserved?",
                a: "Yes, we do our best to include images from your PDF in the final EPUB file. Complex images or graphics may require adjustments."
            }
        ],
        ctaTitle: "Convert your PDF to EPUB now",
        ctaButton: "Start conversion",
        tipsTitle: "Tips for better conversion",
        tips: [
            "Use PDFs with selectable text (not scans)",
            "Well-structured PDFs with headings give better results",
            "Avoid PDFs with complex layouts (multiple columns)",
            "Check the result on your e-reader before deleting the original"
        ],
        relatedTitle: "Related Tools",
        relatedTools: [
            { name: "EPUB to PDF", desc: "Convert your ebooks to PDF", path: "/epub-to-pdf" },
            { name: "OCR PDF", desc: "Make your scans searchable", path: "/ocr-pdf" },
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
            "step": t.steps.map((step, i) => ({
                "@type": "HowToStep",
                "position": i + 1,
                "name": step.title,
                "text": step.desc
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": t.faq.map(item => ({
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
                    <p className="text-lg leading-relaxed">{t.intro}</p>

                    {/* Why Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.whyTitle}</h2>
                        <ul className="space-y-3">
                            {t.whyReasons.map((reason, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* How To Steps */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.howTitle}</h2>
                        <div className="space-y-4">
                            {t.steps.map((step, i) => (
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
                                <h2 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-2">{t.compatTitle}</h2>
                                <p className="text-blue-800 dark:text-blue-400 mb-3">{t.compatText}</p>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-400">
                                    {t.compatList.map((item, i) => (
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
                                <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">{t.securityTitle}</h2>
                                <p className="text-green-800 dark:text-green-400">{t.securityText}</p>
                            </div>
                        </div>
                    </section>

                    {/* Tips Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.tipsTitle}</h2>
                        <ul className="space-y-2">
                            {t.tips.map((tip, i) => (
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.ctaTitle}</h2>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/pdf-to-epub')}
                            className="inline-flex items-center gap-2 bg-canada-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2"
                        >
                            {t.ctaButton} <ArrowRight size={20} />
                        </button>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQ</h2>
                        <div className="space-y-4">
                            {t.faq.map((item, i) => (
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.relatedTitle}</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {t.relatedTools.map((tool, i) => (
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
