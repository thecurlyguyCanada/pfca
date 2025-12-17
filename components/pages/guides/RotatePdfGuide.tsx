import React from 'react';
import { RotateCw, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, Save, FileCheck } from 'lucide-react';
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
            title: "Rotate PDF Free Online | How to Rotate PDF and Save Permanently | pdfcanada.ca",
            desc: "Rotate PDF pages online for free. Learn how to rotate a PDF and save it permanently. Rotate PDF documents 90° or 180°, save rotated PDF files. Free PDF rotator tool - no upload required."
        },
        h1: "Rotate PDF Pages",
        subtitle: "Rotate PDF documents and save them permanently - free online tool",
        intro: "Need to rotate a PDF? Whether you have an upside-down scanned document or a sideways page, our free PDF rotator lets you rotate PDF pages and save the changes permanently. No software to install, no account needed - just rotate and save your PDF in seconds.",

        whyTitle: "Why Rotate PDF Documents?",
        whyReasons: [
            "Fix upside-down or sideways scanned documents",
            "Correct page orientation before printing",
            "Rotate individual pages or entire documents",
            "Prepare PDFs for professional presentation",
            "Fix landscape/portrait orientation issues"
        ],

        howTitle: "How to Rotate a PDF and Save It",
        steps: [
            {
                title: "Upload Your PDF File",
                desc: "Click 'Select File' or drag and drop your PDF document. Our tool accepts any standard PDF file, including scanned documents."
            },
            {
                title: "Rotate Your Pages",
                desc: "Click the rotate button on individual pages to turn them 90° clockwise or counter-clockwise. Use 'Rotate All' to rotate the entire document at once."
            },
            {
                title: "Save Your Rotated PDF",
                desc: "Click 'Apply Rotation' to permanently save your changes. Your rotated PDF downloads automatically with all rotations preserved."
            }
        ],

        featuresTitle: "Why Use Our PDF Rotator?",
        features: [
            {
                icon: Save,
                title: "Permanently Save Rotations",
                desc: "Unlike PDF viewers that only rotate for viewing, we save rotations permanently to the file. Your PDF stays rotated when opened anywhere."
            },
            {
                icon: Lock,
                title: "100% Private & Secure",
                desc: "Your PDF never leaves your device. All rotation processing happens locally in your browser - no server uploads, ever."
            },
            {
                icon: Globe,
                title: "Works on Any Device",
                desc: "Rotate PDFs online from Windows, Mac, Linux, iPhone, iPad, or Android. No software installation required."
            },
            {
                icon: Clock,
                title: "Fast & Unlimited",
                desc: "Rotate as many PDF pages as you need, completely free. No file size limits, no page count restrictions."
            }
        ],

        rotationOptionsTitle: "Rotation Options",
        rotationOptions: [
            {
                title: "Rotate 90° Clockwise",
                desc: "Turn pages to the right. Perfect for landscape documents that should be portrait."
            },
            {
                title: "Rotate 90° Counter-Clockwise",
                desc: "Turn pages to the left. Fix documents scanned in the wrong orientation."
            },
            {
                title: "Rotate 180°",
                desc: "Flip pages upside down. Ideal for documents that are completely inverted."
            },
            {
                title: "Rotate Individual Pages",
                desc: "Select and rotate specific pages while leaving others unchanged."
            },
            {
                title: "Rotate All Pages",
                desc: "Apply the same rotation to every page in your document at once."
            }
        ],

        useCasesTitle: "Common Use Cases",
        useCases: [
            {
                title: "Fix Scanned Documents",
                desc: "Scanned a document upside down or sideways? Rotate it to the correct orientation and save."
            },
            {
                title: "Rotate for Printing",
                desc: "Ensure pages are oriented correctly before printing to avoid wasted paper."
            },
            {
                title: "Mixed Orientation PDFs",
                desc: "Have a PDF with some landscape and some portrait pages? Rotate individual pages to make them consistent."
            },
            {
                title: "Mobile Scans",
                desc: "Photos and scans from your phone often have wrong orientation. Rotate and save them correctly."
            }
        ],

        faq: [
            {
                q: "How do I rotate a PDF and save it permanently?",
                a: "Upload your PDF to our tool, click the rotate button on the pages you want to rotate, then click 'Apply Rotation'. Your PDF will be saved with the rotations permanently applied - they won't revert when you open the file elsewhere."
            },
            {
                q: "How do I rotate a PDF for free?",
                a: "Our PDF rotator is 100% free with no hidden costs. Simply upload your PDF, rotate the pages as needed, and download your rotated file. No signup, no payment, no limits."
            },
            {
                q: "Can I rotate individual pages in a PDF?",
                a: "Yes! You can rotate specific pages by clicking the rotate button on each page thumbnail. You can also rotate all pages at once using the 'Rotate All' button."
            },
            {
                q: "How do I permanently rotate a PDF?",
                a: "Most PDF viewers only rotate pages temporarily for viewing. Our tool actually modifies the PDF file to save rotations permanently. The rotated orientation will be preserved when you open the file in any PDF reader."
            },
            {
                q: "Can I rotate a scanned PDF document?",
                a: "Absolutely! Our tool works great with scanned PDFs. Upload your scanned document, rotate the pages to the correct orientation, and save. Works with any PDF regardless of how it was created."
            },
            {
                q: "How do I save a PDF after rotating?",
                a: "After rotating your pages, simply click the 'Apply Rotation' button. Your browser will automatically download the new PDF file with all rotations saved permanently."
            },
            {
                q: "Can you rotate a PDF on iPhone or Android?",
                a: "Yes! Our PDF rotator works on any device with a web browser. Just visit our website on your mobile device, upload your PDF, rotate the pages, and download the result."
            },
            {
                q: "How do I rotate a PDF 180 degrees?",
                a: "Click the rotate button twice on any page to rotate it 180 degrees (upside down). Each click rotates the page 90 degrees clockwise."
            },
            {
                q: "Is it safe to rotate my PDF online?",
                a: "With our tool, yes! Unlike other online services, we process your PDF entirely in your browser. Your file never uploads to any server - it stays on your device the entire time."
            },
            {
                q: "How do I flip a PDF and save it?",
                a: "To flip a PDF (rotate 180°), upload your document, click the rotate button twice on each page (or use Rotate All twice), then click 'Apply Rotation' to save your flipped PDF."
            }
        ],

        ctaTitle: "Ready to Rotate Your PDF?",
        ctaButton: "Rotate PDF Now",
        ctaSubtext: "Free, fast, and permanently saves your rotations.",

        tipsTitle: "Pro Tips for Rotating PDFs",
        tips: [
            "Preview each page before saving to ensure correct orientation",
            "Use 'Rotate All' for documents where every page needs the same rotation",
            "For mixed orientation documents, rotate pages individually",
            "Your original file is never modified - we create a new rotated copy",
            "Rotations are saved permanently and will display correctly in any PDF viewer"
        ],

        relatedTitle: "Related PDF Tools",
        relatedTools: [
            { name: "Delete PDF Pages", desc: "Remove unwanted pages", path: "/delete-pdf-pages" },
            { name: "Organize PDF", desc: "Reorder pages in your PDF", path: "/organize-pdf" },
            { name: "OCR PDF", desc: "Make scanned PDFs searchable", path: "/ocr-pdf" }
        ]
    },
    fr: {
        seo: {
            title: "Pivoter PDF Gratuit en Ligne | Comment Faire Pivoter un PDF | pdfcanada.ca",
            desc: "Pivoter des pages PDF en ligne gratuitement. Apprenez comment faire pivoter un PDF et l'enregistrer de façon permanente. Outil de rotation PDF gratuit - sans téléversement."
        },
        h1: "Pivoter des Pages PDF",
        subtitle: "Faites pivoter vos documents PDF et enregistrez-les définitivement - outil gratuit en ligne",
        intro: "Besoin de faire pivoter un PDF? Que vous ayez un document numérisé à l'envers ou une page de côté, notre outil gratuit vous permet de pivoter les pages PDF et d'enregistrer les modifications de façon permanente. Pas de logiciel à installer, pas de compte requis.",

        whyTitle: "Pourquoi Pivoter des Documents PDF?",
        whyReasons: [
            "Corriger les documents numérisés à l'envers ou de côté",
            "Ajuster l'orientation des pages avant l'impression",
            "Pivoter des pages individuelles ou des documents entiers",
            "Préparer des PDF pour une présentation professionnelle",
            "Corriger les problèmes d'orientation paysage/portrait"
        ],

        howTitle: "Comment Pivoter un PDF et l'Enregistrer",
        steps: [
            {
                title: "Téléversez Votre Fichier PDF",
                desc: "Cliquez sur 'Choisir un fichier' ou glissez-déposez votre document PDF. Notre outil accepte tout fichier PDF standard."
            },
            {
                title: "Pivotez Vos Pages",
                desc: "Cliquez sur le bouton de rotation sur les pages individuelles pour les tourner de 90°. Utilisez 'Tout Pivoter' pour faire pivoter tout le document."
            },
            {
                title: "Enregistrez Votre PDF Pivoté",
                desc: "Cliquez sur 'Appliquer' pour enregistrer définitivement vos modifications. Votre PDF pivoté se télécharge automatiquement."
            }
        ],

        featuresTitle: "Pourquoi Utiliser Notre Outil de Rotation PDF?",
        features: [
            {
                icon: Save,
                title: "Enregistrement Permanent",
                desc: "Contrairement aux visionneuses PDF qui pivotent temporairement, nous enregistrons les rotations de façon permanente dans le fichier."
            },
            {
                icon: Lock,
                title: "100% Privé et Sécurisé",
                desc: "Votre PDF ne quitte jamais votre appareil. Tout le traitement se fait localement dans votre navigateur."
            },
            {
                icon: Globe,
                title: "Fonctionne sur Tout Appareil",
                desc: "Pivotez des PDF en ligne depuis Windows, Mac, Linux, iPhone, iPad ou Android. Aucune installation requise."
            },
            {
                icon: Clock,
                title: "Rapide et Illimité",
                desc: "Pivotez autant de pages PDF que nécessaire, entièrement gratuit. Pas de limite de taille ou de pages."
            }
        ],

        rotationOptionsTitle: "Options de Rotation",
        rotationOptions: [
            {
                title: "Rotation 90° Horaire",
                desc: "Tournez les pages vers la droite. Parfait pour les documents paysage qui devraient être en portrait."
            },
            {
                title: "Rotation 90° Anti-horaire",
                desc: "Tournez les pages vers la gauche. Corrigez les documents numérisés dans la mauvaise orientation."
            },
            {
                title: "Rotation 180°",
                desc: "Retournez les pages à l'envers. Idéal pour les documents complètement inversés."
            },
            {
                title: "Pages Individuelles",
                desc: "Sélectionnez et pivotez des pages spécifiques tout en laissant les autres intactes."
            },
            {
                title: "Toutes les Pages",
                desc: "Appliquez la même rotation à chaque page de votre document en une fois."
            }
        ],

        useCasesTitle: "Cas d'Utilisation Courants",
        useCases: [
            {
                title: "Corriger les Documents Numérisés",
                desc: "Document numérisé à l'envers ou de côté? Pivotez-le dans la bonne orientation et enregistrez."
            },
            {
                title: "Pivoter pour l'Impression",
                desc: "Assurez-vous que les pages sont bien orientées avant d'imprimer pour éviter le gaspillage de papier."
            },
            {
                title: "PDF à Orientation Mixte",
                desc: "PDF avec des pages en paysage et en portrait? Pivotez les pages individuellement pour les uniformiser."
            },
            {
                title: "Scans Mobiles",
                desc: "Les photos et scans de votre téléphone ont souvent une mauvaise orientation. Pivotez et enregistrez correctement."
            }
        ],

        faq: [
            {
                q: "Comment pivoter un PDF et l'enregistrer définitivement?",
                a: "Téléversez votre PDF, cliquez sur le bouton de rotation sur les pages à pivoter, puis cliquez sur 'Appliquer'. Votre PDF sera enregistré avec les rotations appliquées de façon permanente."
            },
            {
                q: "Comment pivoter un PDF gratuitement?",
                a: "Notre outil de rotation PDF est 100% gratuit. Téléversez simplement votre PDF, pivotez les pages selon vos besoins, et téléchargez votre fichier. Pas d'inscription, pas de paiement."
            },
            {
                q: "Puis-je pivoter des pages individuelles dans un PDF?",
                a: "Oui! Vous pouvez pivoter des pages spécifiques en cliquant sur le bouton de rotation de chaque miniature. Vous pouvez aussi pivoter toutes les pages en une fois."
            },
            {
                q: "Comment faire pivoter un PDF de façon permanente?",
                a: "La plupart des visionneuses PDF ne pivotent que temporairement. Notre outil modifie réellement le fichier PDF pour enregistrer les rotations de façon permanente."
            },
            {
                q: "Puis-je pivoter un document PDF numérisé?",
                a: "Absolument! Notre outil fonctionne très bien avec les PDF numérisés. Téléversez votre document, pivotez les pages, et enregistrez."
            },
            {
                q: "Comment enregistrer un PDF après l'avoir pivoté?",
                a: "Après avoir pivoté vos pages, cliquez simplement sur 'Appliquer'. Votre navigateur téléchargera automatiquement le nouveau fichier PDF avec toutes les rotations enregistrées."
            },
            {
                q: "Peut-on pivoter un PDF sur iPhone ou Android?",
                a: "Oui! Notre outil fonctionne sur tout appareil avec un navigateur web. Visitez notre site sur votre mobile, téléversez votre PDF, pivotez et téléchargez."
            },
            {
                q: "Comment pivoter un PDF de 180 degrés?",
                a: "Cliquez deux fois sur le bouton de rotation de n'importe quelle page pour la pivoter de 180 degrés. Chaque clic pivote la page de 90 degrés."
            },
            {
                q: "Est-ce sécuritaire de pivoter mon PDF en ligne?",
                a: "Avec notre outil, oui! Nous traitons votre PDF entièrement dans votre navigateur. Votre fichier n'est jamais téléversé sur un serveur."
            },
            {
                q: "Comment retourner un PDF et l'enregistrer?",
                a: "Pour retourner un PDF (rotation 180°), téléversez votre document, cliquez deux fois sur le bouton de rotation de chaque page, puis cliquez sur 'Appliquer' pour enregistrer."
            }
        ],

        ctaTitle: "Prêt à Pivoter Votre PDF?",
        ctaButton: "Pivoter Maintenant",
        ctaSubtext: "Gratuit, rapide, et enregistre vos rotations de façon permanente.",

        tipsTitle: "Conseils Pro pour Pivoter des PDF",
        tips: [
            "Prévisualisez chaque page avant d'enregistrer pour vérifier l'orientation",
            "Utilisez 'Tout Pivoter' quand chaque page nécessite la même rotation",
            "Pour les documents à orientation mixte, pivotez les pages individuellement",
            "Votre fichier original n'est jamais modifié - nous créons une nouvelle copie pivotée",
            "Les rotations sont enregistrées de façon permanente et s'afficheront correctement partout"
        ],

        relatedTitle: "Outils PDF Connexes",
        relatedTools: [
            { name: "Supprimer Pages PDF", desc: "Enlever les pages indésirables", path: "/delete-pdf-pages" },
            { name: "Organiser PDF", desc: "Réorganiser les pages", path: "/organize-pdf" },
            { name: "OCR PDF", desc: "Rendre les scans cherchables", path: "/ocr-pdf" }
        ]
    }
};

export const RotatePdfGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
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
                "name": "pdfcanada.ca PDF Rotator"
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
                { "@type": "ListItem", "position": 2, "name": t.h1, "item": "https://pdfcanada.ca/guides/rotate-pdf" }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Rotator - pdfcanada.ca",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CAD"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "2150"
            }
        }
    ];

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/rotate-pdf"
                lang={lang}
                schema={schema}
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<RotateCw size={32} />}>
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
                            onClick={() => onNavigate('TOOL_PAGE', '/rotate-pdf')}
                            className="inline-flex items-center gap-2 bg-canada-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2"
                        >
                            {t.ctaButton} <ArrowRight size={20} />
                        </button>
                    </section>

                    {/* Features */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.featuresTitle}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {t.features.map((feature, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <feature.icon className="text-canada-red mb-3" size={28} />
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Rotation Options */}
                    <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4">{t.rotationOptionsTitle}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {t.rotationOptions.map((option, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-blue-700">
                                    <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-2">
                                        <RotateCw size={16} />
                                        {option.title}
                                    </h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-400">{option.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Use Cases */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.useCasesTitle}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {t.useCases.map((useCase, i) => (
                                <div key={i} className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                    <h3 className="font-bold text-amber-900 dark:text-amber-300 mb-1">{useCase.title}</h3>
                                    <p className="text-sm text-amber-800 dark:text-amber-400">{useCase.desc}</p>
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
                                        ? "Contrairement à d'autres services en ligne, vos fichiers ne quittent jamais votre ordinateur. Tout le traitement de rotation se fait localement dans votre navigateur. Aucun téléversement sur nos serveurs, jamais."
                                        : "Unlike other online services, your files never leave your computer. All rotation processing happens locally in your browser using WebAssembly technology. No uploads to our servers, ever."
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
                                <li key={i} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                                    <FileCheck className="text-purple-600 shrink-0 mt-0.5" size={18} />
                                    <span className="text-purple-800 dark:text-purple-300">{tip}</span>
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
                            onClick={() => onNavigate('TOOL_PAGE', '/rotate-pdf')}
                            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2"
                        >
                            <RotateCw size={20} />
                            {t.ctaButton}
                        </button>
                    </section>
                </div>
            </PageLayout>
        </>
    );
};
