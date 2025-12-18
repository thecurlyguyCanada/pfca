import React from 'react';
import { Image, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, Smartphone, Monitor, MousePointer2 } from 'lucide-react';
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
            title: "Convert HEIC to PDF Free Online | iPhone Photos to PDF | pdfcanada.ca",
            desc: "Convert HEIC to PDF for free. Learn how to convert iPhone photos (HEIC) to PDF on Windows, Mac, and Mobile. High quality, secure, and no upload required."
        },
        h1: "How to Convert HEIC to PDF Online for Free",
        subtitle: "The simplest, most secure way to transform your iPhone photos into professional PDF documents.",

        intro: "Are you struggling with **HEIC files**? High Efficiency Image Coding (HEIC) is the standard format for photos on iPhones, but it can be a nightmare to share with Windows users or upload to government portals. Our **HEIC to PDF converter** is the ultimate solution. Whether you need to **convert HEIC to PDF on Windows**, **convert HEIC to PDF on Mac**, or simply want a **free HEIC to PDF converter** that respects your privacy, you're in the right place.",

        sections: [
            {
                id: "what-is-heic",
                title: "What is HEIC and Why Convert to PDF?",
                content: `HEIC is Apple's version of the High Efficiency Image File format. While it's great for saving storage space, it lacks the universal compatibility of a PDF. By choosing to **convert HEIC to PDF**, you ensure:
- **Universal Viewing**: Anyone can open a PDF on any device.
- **Professional Formatting**: Perfect for submitting receipts, IDs, or homework.
- **Combined Files**: You can turn multiple photos into a single, multi-page PDF document.`
            },
            {
                id: "how-to",
                title: "3 Easy Steps to Convert HEIC to PDF",
                content: `Wondering **how to convert HEIC to PDF**? Our local-first tool makes it effortless:
1. **Select Your Photos**: Click 'Select File' and pick your .HEIC images.
2. **Arrange (Optional)**: If you've selected multiple, they will appear in order.
3. **Convert and Save**: Click 'Convert to PDF' and your file will be generated instantly in your browser.

This is the most **secure HEIC to PDF converter online** because your photos never leave your device.`
            }
        ],

        faq: [
            {
                q: "How to convert HEIC to PDF on iPhone?",
                a: "Just visit pdfcanada.ca on your iPhone, select your HEIC photos from your library, and our browser tool will convert them to a PDF instantly."
            },
            {
                q: "What is the best free HEIC to PDF converter?",
                a: "pdfcanada.ca is the best choice for privacy-conscious users because we process the conversion locally. No uploads mean your private photos stay private."
            },
            {
                q: "Can I convert multiple HEIC to PDF at once?",
                a: "Yes! You can select dozens of images and our tool will compile them into one high-quality PDF document."
            }
        ],

        ctaTitle: "Ready to Convert Your Photos?",
        ctaButton: "Convert HEIC Now",
        ctaSubtext: "100% Free. No Signup. Privacy Guaranteed."
    },
    fr: {
        seo: {
            title: "Convertir HEIC en PDF Gratuit | Photos iPhone vers PDF | pdfcanada.ca",
            desc: "Convertissez HEIC en PDF gratuitement. Apprenez comment transformer vos photos iPhone (HEIC) en PDF sur Windows, Mac et Mobile."
        },
        h1: "Comment Convertir HEIC en PDF Gratuitement",
        subtitle: "La façon la plus simple et sécurisée de transformer vos photos iPhone en documents PDF professionnels.",

        intro: "Vous avez des problèmes avec les fichiers **HEIC**? Notre **convertisseur HEIC en PDF** est la solution idéale. Que vous souhaitiez **convertir HEIC en PDF sur Windows** ou **Mac**, notre outil gratuit respecte votre vie privée.",

        sections: [
            {
                id: "how-to",
                title: "3 étapes simples pour convertir HEIC en PDF",
                content: `1. **Sélectionnez vos photos**\n2. **Organisez**\n3. **Convertissez**`
            }
        ],

        faq: [
            {
                q: "Comment convertir sur iPhone?",
                a: "Visitez pdfcanada.ca directement sur votre téléphone."
            }
        ],

        ctaTitle: "Prêt à convertir vos photos?",
        ctaButton: "Convertir HEIC maintenant",
        ctaSubtext: "100% Gratuit. Sans inscription."
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
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<Image size={32} />}>
                <div className="max-w-4xl mx-auto space-y-12">
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        {t.intro}
                    </p>

                    {/* Content Sections */}
                    {t.sections && t.sections.map((section) => (
                        <section key={section.id}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line text-gray-600 dark:text-gray-400">
                                {section.content}
                            </div>
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
                                        <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
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
