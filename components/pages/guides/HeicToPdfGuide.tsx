import React from 'react';
import { Image, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, Smartphone, Monitor, MousePointer2 } from 'lucide-react';
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
            title: "Convert HEIC to PDF Free Online | iPhone Photos to PDF | pdfcanada.ca",
            desc: "Convert HEIC to PDF for free. Learn how to convert iPhone photos (HEIC) to PDF on Windows, Mac, and Mobile. High quality, secure, and no upload required."
        },
        h1: "How to Convert HEIC to PDF Online for Free",
        subtitle: "The simplest, most secure way to transform your iPhone photos into professional PDF documents.",

        intro: "Are you struggling with **HEIC files**? High Efficiency Image Coding (HEIC) is the standard format for photos on iPhones, but it can be a nightmare to share with Windows users, print at local shops, or upload to Canadian government portals like the CRA or IRCC. Our **HEIC to PDF converter** is the ultimate solution. Whether you need to **convert HEIC to PDF on Windows**, **convert HEIC to PDF on Mac**, or simply want a **free HEIC to PDF converter** that respects your privacy, you're in the right place.",

        sections: [
            {
                id: "what-is-heic",
                title: "What is HEIC and Why Convert it?",
                content: `HEIC is Apple's version of the High Efficiency Image File format. While it's great for saving storage space on your phone, it lacks the universal compatibility of a PDF. 
- **Universal Viewing**: Anyone can open a PDF on any device—no special codecs required.
- **Professional Formatting**: Perfect for submitting receipts, IDs, or homework assignments.
- **Combined Files**: You can turn multiple individual photos into a single, multi-page PDF document, making it much easier to organize your documentation.`
            },
            {
                id: "compatibility",
                title: "Compatibility: Windows, Mac, and Global Standards",
                content: `If you're using a PC, you might notice that Windows doesn't natively open HEIC files without a paid extension from the Microsoft Store. By choosing to **convert HEIC to PDF online free**, you bypass these hurdles entirely. 

Furthermore, many professional and legal institutions in Canada explicitly require documents in PDF format to ensure that formatting and signatures remain intact during transmission.`
            },
            {
                id: "how-to",
                title: "How to Convert Multiple HEIC Photos to One PDF",
                content: `Our local-first tool is designed for bulk processing:
1. **Select Your Photos**: Click 'Select File' and pick as many .HEIC images as you need. Since we use **client-side processing**, there is no limit on file size.
2. **Review Order**: Our interface shows you the thumbnails. Ensure they are in the order you want for your document.
3. **Generate Locally**: Click 'Convert to PDF'. Our script handles the decompression and re-encapsulation into PDF layers right in your RAM.

This is the most **secure HEIC to PDF converter** because your personal photos never leave your device.`
            }
        ],

        faq: [
            {
                q: "How to convert HEIC to PDF on iPhone?",
                a: "Simply visit pdfcanada.ca on your mobile Safari browser, select your HEIC photos from your Photo Library, and our tool will generate a PDF that you can save directly to your Files app."
            },
            {
                q: "Does converting HEIC to PDF lose quality?",
                a: "Our converter preserves the high resolution of your original images. We translate the image data directly into the PDF container without aggressive compression."
            },
            {
                q: "What is the best free HEIC to PDF converter?",
                a: "pdfcanada.ca is the top choice for privacy because we use **Local-First technology**. Unlike other sites that upload your photos to a server, we process them in your browser. This means your private photos stay private."
            },
            {
                q: "Can I convert HEIC to PDF on a Windows PC?",
                a: "Yes! Our web-based tool works perfectly on any Windows browser (Chrome, Edge, Firefox), providing a free alternative to paid Microsoft Store extensions."
            }
        ],

        ctaTitle: "Ready to Transform Your iPhone Photos?",
        ctaButton: "Convert HEIC to PDF Now",
        ctaSubtext: "100% Free. No Signup. Safe for sensitive documents."
    },
    fr: {
        seo: {
            title: "Convertir HEIC en PDF Gratuit | Photos iPhone vers PDF | pdfcanada.ca",
            desc: "Convertissez HEIC en PDF gratuitement. Apprenez comment transformer vos photos iPhone (HEIC) en PDF sur Windows, Mac et Mobile sans téléchargement."
        },
        h1: "Comment Convertir HEIC en PDF Gratuitement",
        subtitle: "La façon la plus simple et sécurisée de transformer vos photos iPhone en documents PDF professionnels au Canada.",

        intro: "Vous avez des problèmes de compatibilité avec les fichiers **HEIC** de votre iPhone? Notre **convertisseur HEIC en PDF** est la solution idéale pour partager vos photos avec des utilisateurs Windows ou les soumettre à des portails officiels.",

        sections: [
            {
                id: "what-is-heic",
                title: "Pourquoi convertir HEIC en PDF ?",
                content: `Le format HEIC est propre à Apple. En convertissant en PDF, vous assurez une lecture universelle sur n'importe quel ordinateur ou smartphone, sans logiciel supplémentaire.`
            },
            {
                id: "how-to",
                title: "3 étapes simples pour la conversion",
                content: `C'est rapide et local :
1. **Sélectionnez vos photos** : Importez vos fichiers .HEIC.
2. **Organisez** : L'ordre des images sera l'ordre des pages.
3. **Convertissez** : Cliquez pour générer le PDF instantanément dans votre navigateur.`
            }
        ],

        faq: [
            {
                q: "Comment convertir sur iPhone ?",
                a: "Utilisez Safari pour accéder à pdfcanada.ca, choisissez vos photos et enregistrez le PDF résultant."
            },
            {
                q: "Est-ce sécurisé ?",
                a: "Oui, car vos photos ne quittent jamais votre appareil. Tout le traitement est fait localement."
            }
        ],

        ctaTitle: "Prêt à convertir vos photos ?",
        ctaButton: "Convertir HEIC maintenant",
        ctaSubtext: "Gratuit, rapide et privé."
    }
};

export const HeicToPdfGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": t.h1,
        "description": t.seo.desc,
        "step": [
            { "@type": "HowToStep", "position": 1, "name": "Select HEIC", "text": "Pick your iPhone photos." },
            { "@type": "HowToStep", "position": 2, "name": "Convert", "text": "Click convert to generate PDF locally." }
        ]
    };

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/heic-to-pdf"
                lang={lang}
                schema={schema}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Guides', path: '/guides/ultimate-pdf-guide' },
                    { name: 'HEIC to PDF', path: '/guides/heic-to-pdf' }
                ]}
            />
            <PageLayout
                title={t.h1}
                subtitle={t.subtitle}
                icon={<Image size={32} />}
                breadcrumbs={[
                    { name: 'Home', onClick: () => onNavigate('HOME') },
                    { name: 'Guides', onClick: () => onNavigate('GUIDE_ULTIMATE') },
                    { name: 'HEIC to PDF Guide', onClick: () => { } }
                ]}
            >
                <div className="max-w-4xl mx-auto space-y-12">
                    <MarkdownContent content={t.intro} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400" />

                    {/* Content Sections */}
                    {t.sections && t.sections.map((section) => (
                        <section key={section.id}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                            <MarkdownContent content={section.content} />
                        </section>
                    ))}

                    {/* Features Tiles */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <Lock className="text-canada-red mb-3" />
                            <h3 className="font-bold mb-2">Private</h3>
                            <p className="text-sm text-gray-500">Local processing. No uploads.</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <Zap className="text-canada-red mb-3" />
                            <h3 className="font-bold mb-2">Fast</h3>
                            <p className="text-sm text-gray-500">Instant conversion in browser.</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <Smartphone className="text-canada-red mb-3" />
                            <h3 className="font-bold mb-2">Mobile</h3>
                            <p className="text-sm text-gray-500">Works on all iPhones/Androids.</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <section className="bg-canada-red rounded-3xl p-10 text-center text-white shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">{t.ctaTitle}</h2>
                        <p className="mb-6 opacity-90">{t.ctaSubtext}</p>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/heic-to-pdf')}
                            className="bg-white text-canada-red px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            {t.ctaButton}
                        </button>
                    </section>

                    {/* FAQ */}
                    {t.faq && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
                            <div className="space-y-4">
                                {t.faq.map((item, i) => (
                                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                        <h4 className="font-bold mb-2 text-gray-900 dark:text-white">{item.q}</h4>
                                        <MarkdownContent content={item.a} className="text-gray-600 dark:text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </PageLayout>
        </>
    );
};
