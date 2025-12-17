import React from 'react';
import { Trash2, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock } from 'lucide-react';
import { Language } from '../../../utils/i18n';
import { SEO } from '../../SEO';
import { PageLayout } from '../../PageLayout';

interface GuideProps {
    lang: Language;
    onNavigate: (view: any, path?: string) => void;
}

const guideContent = {
    en: {
        seo: {
            title: "Delete Pages from PDF Free | Remove PDF Pages Online | pdfcanada.ca",
            desc: "Delete pages from PDF for free. Learn how to delete a page in PDF, remove pages from PDF documents online. Fast, secure, no upload required. Free PDF page remover tool."
        },
        h1: "Delete Pages from PDF",
        subtitle: "The easiest way to remove unwanted pages from your PDF documents",
        intro: "Need to delete pages from a PDF? Whether you want to remove a single page or multiple pages from your document, our free online tool makes it simple. No software installation, no signup required. Just upload, select, and delete PDF pages in seconds.",

        whyTitle: "Why Delete Pages from PDF?",
        whyReasons: [
            "Remove blank or unnecessary pages from scanned documents",
            "Delete sensitive information before sharing",
            "Reduce file size by removing unneeded content",
            "Clean up PDFs before printing to save paper",
            "Remove cover pages or appendices you don't need"
        ],

        howTitle: "How to Delete Pages from a PDF",
        steps: [
            {
                title: "Upload Your PDF File",
                desc: "Click 'Select File' or drag and drop your PDF document into the upload area. Our tool accepts any standard PDF file."
            },
            {
                title: "Select Pages to Delete",
                desc: "You'll see thumbnails of all pages in your PDF. Simply click on the pages you want to remove. Selected pages will be marked with a trash icon."
            },
            {
                title: "Remove and Download",
                desc: "Click 'Remove Pages' to instantly delete the selected pages. Your new PDF downloads automatically - that's it!"
            }
        ],

        featuresTitle: "Why Use Our PDF Page Remover?",
        features: [
            {
                icon: Lock,
                title: "100% Secure & Private",
                desc: "Your files never leave your device. All processing happens locally in your browser using advanced WebAssembly technology."
            },
            {
                icon: Globe,
                title: "Works Anywhere",
                desc: "Delete PDF pages online from any device - Windows, Mac, Linux, iPhone, or Android. No software to install."
            },
            {
                icon: Clock,
                title: "Fast & Free",
                desc: "Remove pages from PDF in seconds, completely free. No limits on file size or number of pages."
            }
        ],

        useCasesTitle: "Common Use Cases",
        useCases: [
            {
                title: "Remove Blank Pages",
                desc: "Scanned documents often have blank pages. Quickly delete them to clean up your PDF."
            },
            {
                title: "Delete Cover Pages",
                desc: "Remove title pages, disclaimers, or other front matter you don't need."
            },
            {
                title: "Extract Specific Content",
                desc: "Delete everything except the pages you need to create a focused document."
            },
            {
                title: "Prepare for Printing",
                desc: "Remove pages you don't want to print to save paper and ink."
            }
        ],

        faq: [
            {
                q: "How do I delete a page in a PDF document?",
                a: "Simply upload your PDF to our tool, click on the pages you want to remove (they'll be marked with a trash icon), then click 'Remove Pages'. Your new PDF without those pages will download automatically."
            },
            {
                q: "How do you delete pages from a PDF for free?",
                a: "Our tool is 100% free with no hidden costs. Upload your PDF, select the pages to delete, and download your new file. No signup, no payment, no limits."
            },
            {
                q: "Can I delete multiple pages from a PDF at once?",
                a: "Yes! You can select as many pages as you want to delete. Just click on each page you want to remove, or use Shift+Click to select a range of pages."
            },
            {
                q: "Is it safe to delete PDF pages online?",
                a: "With our tool, absolutely! Unlike other online services, we process your PDF entirely in your browser. Your file never uploads to any server, making it the most secure way to delete PDF pages online."
            },
            {
                q: "How to delete a page from a PDF on iPhone or Android?",
                a: "Just visit our website on your mobile browser, upload your PDF, tap the pages you want to remove, and download your new file. No app installation needed!"
            },
            {
                q: "Will deleting pages reduce my PDF file size?",
                a: "Yes! Removing pages will reduce your file size, especially if those pages contain images or graphics. Great for making PDFs easier to email or share."
            },
            {
                q: "Can I undo after deleting pages?",
                a: "Your original file is never modified. We create a new PDF without the deleted pages. Your original PDF remains unchanged on your device."
            },
            {
                q: "What's the difference between deleting and extracting PDF pages?",
                a: "Deleting removes pages you don't want, keeping the rest. Extracting creates a new file with only specific pages. Our tool does deletion - you select what to remove."
            }
        ],

        ctaTitle: "Ready to Delete PDF Pages?",
        ctaButton: "Delete Pages Now",
        ctaSubtext: "Free, fast, and secure. No signup required.",

        relatedTitle: "Related PDF Tools",
        relatedTools: [
            { name: "Rotate PDF", desc: "Fix upside-down pages", path: "/rotate-pdf" },
            { name: "Organize PDF", desc: "Reorder pages in your PDF", path: "/organize-pdf" },
            { name: "Make PDF Fillable", desc: "Add form fields to PDFs", path: "/make-pdf-fillable" }
        ],

        tipsTitle: "Pro Tips for Deleting PDF Pages",
        tips: [
            "Preview all pages before deleting to make sure you're removing the right ones",
            "Use Shift+Click to quickly select a range of consecutive pages",
            "Keep your original PDF as a backup before making changes",
            "If you need to remove many pages, it might be faster to extract just the pages you want to keep"
        ]
    },
    fr: {
        seo: {
            title: "Supprimer des Pages PDF Gratuit | Enlever Pages PDF en Ligne | pdfcanada.ca",
            desc: "Supprimer des pages PDF gratuitement. Apprenez comment supprimer une page d'un PDF, enlever des pages de documents PDF en ligne. Rapide, sécurisé, sans téléversement."
        },
        h1: "Supprimer des Pages PDF",
        subtitle: "La façon la plus simple d'enlever les pages indésirables de vos documents PDF",
        intro: "Besoin de supprimer des pages d'un PDF? Que vous vouliez enlever une seule page ou plusieurs pages de votre document, notre outil gratuit en ligne rend cela simple. Pas d'installation de logiciel, pas d'inscription requise. Téléversez, sélectionnez et supprimez des pages PDF en quelques secondes.",

        whyTitle: "Pourquoi Supprimer des Pages PDF?",
        whyReasons: [
            "Enlever les pages vierges ou inutiles des documents numérisés",
            "Supprimer les informations sensibles avant le partage",
            "Réduire la taille du fichier en enlevant le contenu inutile",
            "Nettoyer les PDF avant l'impression pour économiser du papier",
            "Enlever les pages de couverture ou annexes dont vous n'avez pas besoin"
        ],

        howTitle: "Comment Supprimer des Pages d'un PDF",
        steps: [
            {
                title: "Téléversez Votre Fichier PDF",
                desc: "Cliquez sur 'Choisir un fichier' ou glissez-déposez votre document PDF dans la zone de téléversement. Notre outil accepte tout fichier PDF standard."
            },
            {
                title: "Sélectionnez les Pages à Supprimer",
                desc: "Vous verrez les miniatures de toutes les pages de votre PDF. Cliquez simplement sur les pages que vous voulez enlever. Les pages sélectionnées seront marquées d'une icône de corbeille."
            },
            {
                title: "Supprimez et Téléchargez",
                desc: "Cliquez sur 'Supprimer' pour enlever instantanément les pages sélectionnées. Votre nouveau PDF se télécharge automatiquement - c'est tout!"
            }
        ],

        featuresTitle: "Pourquoi Utiliser Notre Outil?",
        features: [
            {
                icon: Lock,
                title: "100% Sécurisé et Privé",
                desc: "Vos fichiers ne quittent jamais votre appareil. Tout le traitement se fait localement dans votre navigateur."
            },
            {
                icon: Globe,
                title: "Fonctionne Partout",
                desc: "Supprimez des pages PDF en ligne depuis n'importe quel appareil - Windows, Mac, Linux, iPhone ou Android."
            },
            {
                icon: Clock,
                title: "Rapide et Gratuit",
                desc: "Enlevez des pages PDF en quelques secondes, entièrement gratuit. Pas de limite de taille ou de pages."
            }
        ],

        useCasesTitle: "Cas d'Utilisation Courants",
        useCases: [
            {
                title: "Enlever les Pages Vierges",
                desc: "Les documents numérisés ont souvent des pages vierges. Supprimez-les rapidement pour nettoyer votre PDF."
            },
            {
                title: "Supprimer les Pages de Couverture",
                desc: "Enlevez les pages de titre, avertissements ou autres contenus préliminaires dont vous n'avez pas besoin."
            },
            {
                title: "Extraire un Contenu Spécifique",
                desc: "Supprimez tout sauf les pages dont vous avez besoin pour créer un document ciblé."
            },
            {
                title: "Préparer pour l'Impression",
                desc: "Enlevez les pages que vous ne voulez pas imprimer pour économiser papier et encre."
            }
        ],

        faq: [
            {
                q: "Comment supprimer une page d'un document PDF?",
                a: "Téléversez simplement votre PDF dans notre outil, cliquez sur les pages que vous voulez enlever (elles seront marquées d'une icône de corbeille), puis cliquez sur 'Supprimer'. Votre nouveau PDF sans ces pages se téléchargera automatiquement."
            },
            {
                q: "Comment supprimer des pages d'un PDF gratuitement?",
                a: "Notre outil est 100% gratuit sans frais cachés. Téléversez votre PDF, sélectionnez les pages à supprimer, et téléchargez votre nouveau fichier. Pas d'inscription, pas de paiement, pas de limites."
            },
            {
                q: "Puis-je supprimer plusieurs pages d'un PDF en une fois?",
                a: "Oui! Vous pouvez sélectionner autant de pages que vous voulez supprimer. Cliquez simplement sur chaque page à enlever, ou utilisez Maj+Clic pour sélectionner une plage de pages."
            },
            {
                q: "Est-ce sécuritaire de supprimer des pages PDF en ligne?",
                a: "Avec notre outil, absolument! Contrairement aux autres services en ligne, nous traitons votre PDF entièrement dans votre navigateur. Votre fichier n'est jamais téléversé sur un serveur."
            },
            {
                q: "Comment supprimer une page d'un PDF sur iPhone ou Android?",
                a: "Visitez simplement notre site web sur votre navigateur mobile, téléversez votre PDF, touchez les pages à enlever, et téléchargez votre nouveau fichier. Aucune installation d'application nécessaire!"
            },
            {
                q: "La suppression de pages réduira-t-elle la taille de mon fichier PDF?",
                a: "Oui! Enlever des pages réduira la taille de votre fichier, surtout si ces pages contiennent des images ou graphiques."
            },
            {
                q: "Puis-je annuler après avoir supprimé des pages?",
                a: "Votre fichier original n'est jamais modifié. Nous créons un nouveau PDF sans les pages supprimées. Votre PDF original reste intact sur votre appareil."
            },
            {
                q: "Quelle est la différence entre supprimer et extraire des pages PDF?",
                a: "Supprimer enlève les pages dont vous ne voulez pas, gardant le reste. Extraire crée un nouveau fichier avec seulement certaines pages. Notre outil fait la suppression."
            }
        ],

        ctaTitle: "Prêt à Supprimer des Pages PDF?",
        ctaButton: "Supprimer Maintenant",
        ctaSubtext: "Gratuit, rapide et sécurisé. Aucune inscription requise.",

        relatedTitle: "Outils PDF Connexes",
        relatedTools: [
            { name: "Pivoter PDF", desc: "Corriger les pages à l'envers", path: "/rotate-pdf" },
            { name: "Organiser PDF", desc: "Réorganiser les pages", path: "/organize-pdf" },
            { name: "PDF Remplissable", desc: "Ajouter des champs de formulaire", path: "/make-pdf-fillable" }
        ],

        tipsTitle: "Conseils Pro pour Supprimer des Pages PDF",
        tips: [
            "Prévisualisez toutes les pages avant de supprimer pour vous assurer d'enlever les bonnes",
            "Utilisez Maj+Clic pour sélectionner rapidement une plage de pages consécutives",
            "Gardez votre PDF original comme sauvegarde avant de faire des changements",
            "Si vous devez enlever beaucoup de pages, il peut être plus rapide d'extraire seulement les pages à garder"
        ]
    }
};

export const DeletePdfPagesGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
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
            })),
            "tool": {
                "@type": "HowToTool",
                "name": "pdfcanada.ca PDF Page Remover"
            }
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
                { "@type": "ListItem", "position": 1, "name": lang === 'fr' ? "Accueil" : "Home", "item": "https://pdfcanada.ca/" },
                { "@type": "ListItem", "position": 2, "name": t.h1, "item": "https://pdfcanada.ca/guides/delete-pdf-pages" }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Page Remover - pdfcanada.ca",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CAD"
            }
        }
    ];

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/delete-pdf-pages"
                lang={lang}
                schema={schema}
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<Trash2 size={32} />}>
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

                    {/* CTA - Primary */}
                    <section className="bg-canada-red/5 dark:bg-canada-red/10 border border-canada-red/20 p-8 rounded-xl text-center">
                        <Zap className="text-canada-red mx-auto mb-4" size={40} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.ctaTitle}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.ctaSubtext}</p>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/delete-pdf-pages')}
                            className="inline-flex items-center gap-2 bg-canada-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2"
                        >
                            {t.ctaButton} <ArrowRight size={20} />
                        </button>
                    </section>

                    {/* Features */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.featuresTitle}</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {t.features.map((feature, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <feature.icon className="text-canada-red mb-3" size={28} />
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Use Cases */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.useCasesTitle}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {t.useCases.map((useCase, i) => (
                                <div key={i} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                    <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-1">{useCase.title}</h3>
                                    <p className="text-sm text-blue-800 dark:text-blue-400">{useCase.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Security Section */}
                    <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                            <Shield className="text-green-600 shrink-0" size={28} />
                            <div>
                                <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">
                                    {lang === 'fr' ? 'Vos Documents Restent Privés' : 'Your Documents Stay Private'}
                                </h2>
                                <p className="text-green-800 dark:text-green-400">
                                    {lang === 'fr'
                                        ? "Contrairement à d'autres services en ligne, vos fichiers ne quittent jamais votre ordinateur. Tout le traitement se fait localement dans votre navigateur. Aucun téléversement sur nos serveurs, jamais."
                                        : "Unlike other online services, your files never leave your computer. All processing happens locally in your browser using WebAssembly technology. No uploads to our servers, ever."
                                    }
                                </p>
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

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {lang === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
                        </h2>
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

                    {/* Final CTA */}
                    <section className="text-center py-8">
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/delete-pdf-pages')}
                            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2"
                        >
                            <Trash2 size={20} />
                            {t.ctaButton}
                        </button>
                    </section>
                </div>
            </PageLayout>
        </>
    );
};
