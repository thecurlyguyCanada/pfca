import React from 'react';
import { BookOpen, CheckCircle, Shield, Zap, ArrowRight } from 'lucide-react';
import { Language } from '../../../utils/i18n';
import { SEO } from '../../SEO';
import { PageLayout } from '../../PageLayout';

interface GuideProps {
    lang: Language;
    onNavigate: (view: string, path?: string) => void;
}

const guideContent = {
    fr: {
        seo: {
            title: "Convertir EPUB en PDF Gratuit | epub en pdf | pdfcanada.ca",
            desc: "Convertir epub en pdf facilement et gratuitement. Notre outil en ligne transforme vos fichiers EPUB en PDF en quelques secondes. Traitement local et sécurisé."
        },
        h1: "Convertir EPUB en PDF",
        subtitle: "Le guide complet pour transformer vos ebooks en PDF",
        intro: "Vous cherchez comment convertir un fichier EPUB en PDF? Notre outil gratuit vous permet de transformer vos livres numériques en format PDF universel en quelques clics. Que vous souhaitiez imprimer un ebook ou le partager avec quelqu'un qui n'a pas de liseuse, nous avons la solution.",
        whyTitle: "Pourquoi convertir EPUB en PDF?",
        whyReasons: [
            "Compatibilité universelle avec tous les appareils",
            "Facilité d'impression de vos ebooks",
            "Partage simplifié avec collègues et amis",
            "Conservation de la mise en page originale",
            "Lecture sur n'importe quel ordinateur ou tablette"
        ],
        howTitle: "Comment convertir un EPUB en PDF?",
        steps: [
            {
                title: "Sélectionnez votre fichier EPUB",
                desc: "Cliquez sur le bouton 'Choisir un fichier' ou glissez-déposez votre fichier .epub directement sur la zone de téléversement."
            },
            {
                title: "Conversion automatique",
                desc: "Notre outil analyse votre ebook et convertit chaque chapitre en pages PDF bien formatées. Tout se passe localement dans votre navigateur."
            },
            {
                title: "Téléchargez votre PDF",
                desc: "Une fois la conversion terminée, téléchargez votre nouveau fichier PDF prêt à être imprimé ou partagé."
            }
        ],
        securityTitle: "Sécurité et confidentialité",
        securityText: "Contrairement à d'autres services en ligne, vos fichiers ne quittent jamais votre ordinateur. Tout le traitement se fait localement dans votre navigateur grâce à notre technologie WebAssembly. Aucun téléversement sur nos serveurs.",
        faq: [
            {
                q: "Comment convertir un fichier EPUB en PDF gratuitement?",
                a: "Utilisez notre outil en ligne gratuit. Il suffit de téléverser votre fichier EPUB et de cliquer sur 'Convertir'. Votre PDF sera prêt en quelques secondes, sans inscription ni paiement."
            },
            {
                q: "Est-ce que la conversion EPUB vers PDF est sécurisée?",
                a: "Absolument! Notre outil fonctionne entièrement dans votre navigateur. Vos fichiers ne sont jamais envoyés sur un serveur externe. C'est la méthode la plus sécurisée pour convertir vos ebooks."
            },
            {
                q: "Puis-je convertir plusieurs fichiers EPUB en PDF?",
                a: "Oui, vous pouvez convertir autant de fichiers que vous le souhaitez, un à la fois. Il n'y a aucune limite sur le nombre de conversions."
            },
            {
                q: "La mise en page est-elle conservée lors de la conversion?",
                a: "Notre outil fait de son mieux pour préserver la structure et la mise en page de votre ebook. Les chapitres, paragraphes et images sont conservés dans le PDF final."
            },
            {
                q: "Fonctionne-t-il sur mobile?",
                a: "Oui! Notre convertisseur fonctionne sur tous les appareils: ordinateur, tablette et smartphone. Vous pouvez convertir vos EPUB en PDF directement depuis votre iPhone ou Android."
            }
        ],
        ctaTitle: "Prêt à convertir votre EPUB en PDF?",
        ctaButton: "Convertir maintenant",
        relatedTitle: "Outils connexes",
        relatedTools: [
            { name: "PDF vers EPUB", desc: "Convertissez vos PDF en ebooks", path: "/pdf-to-epub" },
            { name: "OCR PDF", desc: "Extrayez le texte de vos scans", path: "/ocr-pdf" }
        ]
    },
    en: {
        seo: {
            title: "Convert EPUB to PDF Free | Online Converter | pdfcanada.ca",
            desc: "Convert EPUB to PDF easily and for free. Our online tool transforms your EPUB files into PDF in seconds. Local and secure processing."
        },
        h1: "Convert EPUB to PDF",
        subtitle: "The complete guide to transform your ebooks to PDF",
        intro: "Looking to convert an EPUB file to PDF? Our free tool lets you transform your digital books to universal PDF format in just a few clicks. Whether you want to print an ebook or share it with someone who doesn't have an e-reader, we have the solution.",
        whyTitle: "Why convert EPUB to PDF?",
        whyReasons: [
            "Universal compatibility with all devices",
            "Easy printing of your ebooks",
            "Simple sharing with colleagues and friends",
            "Preservation of original layout",
            "Reading on any computer or tablet"
        ],
        howTitle: "How to convert EPUB to PDF?",
        steps: [
            {
                title: "Select your EPUB file",
                desc: "Click the 'Select File' button or drag and drop your .epub file directly onto the upload area."
            },
            {
                title: "Automatic conversion",
                desc: "Our tool analyzes your ebook and converts each chapter into well-formatted PDF pages. Everything happens locally in your browser."
            },
            {
                title: "Download your PDF",
                desc: "Once conversion is complete, download your new PDF file ready to print or share."
            }
        ],
        securityTitle: "Security and Privacy",
        securityText: "Unlike other online services, your files never leave your computer. All processing happens locally in your browser using our WebAssembly technology. No uploads to our servers.",
        faq: [
            {
                q: "How to convert EPUB to PDF for free?",
                a: "Use our free online tool. Simply upload your EPUB file and click 'Convert'. Your PDF will be ready in seconds, no signup or payment required."
            },
            {
                q: "Is EPUB to PDF conversion secure?",
                a: "Absolutely! Our tool runs entirely in your browser. Your files are never sent to an external server. It's the most secure way to convert your ebooks."
            },
            {
                q: "Can I convert multiple EPUB files to PDF?",
                a: "Yes, you can convert as many files as you want, one at a time. There's no limit on the number of conversions."
            },
            {
                q: "Is the layout preserved during conversion?",
                a: "Our tool does its best to preserve the structure and layout of your ebook. Chapters, paragraphs, and images are kept in the final PDF."
            },
            {
                q: "Does it work on mobile?",
                a: "Yes! Our converter works on all devices: computer, tablet, and smartphone. You can convert your EPUBs to PDF directly from your iPhone or Android."
            }
        ],
        ctaTitle: "Ready to convert your EPUB to PDF?",
        ctaButton: "Convert now",
        relatedTitle: "Related Tools",
        relatedTools: [
            { name: "PDF to EPUB", desc: "Convert your PDFs to ebooks", path: "/pdf-to-epub" },
            { name: "OCR PDF", desc: "Extract text from your scans", path: "/ocr-pdf" }
        ]
    }
};

export const ConvertirEpubEnPdfGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
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
                { "@type": "ListItem", "position": 2, "name": t.h1, "item": "https://pdfcanada.ca/guides/convertir-epub-en-pdf" }
            ]
        }
    ];

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/convertir-epub-en-pdf"
                lang={lang}
                schema={schema}
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<BookOpen size={32} />}>
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

                    {/* CTA */}
                    <section className="bg-canada-red/5 dark:bg-canada-red/10 border border-canada-red/20 p-8 rounded-xl text-center">
                        <Zap className="text-canada-red mx-auto mb-4" size={40} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.ctaTitle}</h2>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/epub-to-pdf')}
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
                        <div className="grid md:grid-cols-2 gap-4">
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
