import React from 'react';
import { PenTool, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, FileText, CheckSquare, PencilLine } from 'lucide-react';
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
            title: "Make PDF Fillable Online Free | Create PDF Forms Without Acrobat | pdfcanada.ca",
            desc: "Learn how to make a PDF fillable for free. Create interactive PDF forms, add text fields, checkboxes, and signatures online. Secure, local, and no signup."
        },
        h1: "How to Make a PDF Fillable Online for Free",
        subtitle: "The definitive guide to transforming flat documents into interactive, professional PDF forms.",

        intro: "Tired of asking clients to print, hand-sign, and scan documents back to you? You need to **make your PDF fillable**. Whether you're a small business owner in Toronto or a student in Vancouver, creating **interactive PDF forms** is essential for a modern workflow. Our **free PDF form creator** allows you to add text fields, checkboxes, and signature placeholders to any document without needing expensive software like Adobe Acrobat.",

        sections: [
            {
                id: "what-is-fillable",
                title: "What is a Fillable PDF?",
                content: `A fillable PDF (also known as an interactive PDF form) contains fields that users can interact with directly. Instead of being a static image of a document, it includes:
- **Text Input Fields**: For names, dates, and detailed responses.
- **Checkboxes**: For multi-choice selections.
- **Digital Signature Fields**: For capturing authorization.

Using a **fillable PDF creator online** ensures that your documents are easy to complete and look professional on any device.`
            },
            {
                id: "how-to",
                title: "3 Steps to Create Fillable PDF Forms",
                content: `1. **Upload Your File**: Select the PDF you want to make interactive.
2. **Add Fields**: Drag and drop text fields and checkboxes onto the document. Our tool is optimized for **Canadian government forms** and business contracts.
3. **Save and Share**: Click 'Process PDF' to download your new, interactive version.

This is the most **secure way to make a PDF fillable** because we process all edits locally in your browser.`
            },
            {
                id: "benefits",
                title: "Why Use Our Free PDF Form Filler?",
                content: `Most "free" tools online either watermark your files or force you to sign up for a subscription. At pdfcanada.ca, we offer a truly **free PDF editor for forms** with:
- **Privacy Focus**: Your sensitive business data stays on your machine.
- **No Account Needed**: Start editing instantly.
- **Mobile Friendly**: Create or fill out forms on your phone or tablet.`
            }
        ],

        faq: [
            {
                q: "Is it free to make a PDF fillable on this site?",
                a: "Yes! There are no hidden costs, limits, or watermarks. It is 100% free."
            },
            {
                q: "Can I add a signature field to my PDF?",
                a: "Absolutely. Our tool allows you to place signature placeholders so your recipients know exactly where to sign."
            },
            {
                q: "Do I need to download software?",
                a: "No. Our tool works entirely in your web browser (Chrome, Safari, Firefox, Edge) using advanced WebAssembly technology."
            }
        ],

        ctaTitle: "Start Creating Your Form Now",
        ctaButton: "Make PDF Fillable",
        ctaSubtext: "Free forever. Secure and local."
    },
    fr: {
        seo: {
            title: "Rendre un PDF Remplissable Gratuitement | Créer des Formulaires PDF | pdfcanada.ca",
            desc: "Apprenez comment rendre un PDF remplissable gratuitement. Créez des formulaires interactifs, ajoutez des champs de texte et des cases à cocher en ligne."
        },
        h1: "Comment Rendre un PDF Remplissable en Ligne Gratuitement",
        subtitle: "Le guide définitif pour transformer vos documents statiques en formulaires PDF interactifs et professionnels.",

        intro: "Vous en avez assez de demander à vos clients d'imprimer et de numériser des documents ? Vous devez **rendre votre PDF remplissable**. Notre outil gratuit vous permet d'ajouter des champs de texte et des cases à cocher en toute sécurité.",

        sections: [
            {
                id: "how-to",
                title: "3 étapes pour créer des formulaires PDF remplissables",
                content: `1. **Téléversez votre fichier**\n2. **Ajoutez des champs**\n3. **Enregistrez**`
            }
        ],

        faq: [
            {
                q: "Est-ce gratuit ?",
                a: "Oui, totalement gratuit et sécurisé."
            }
        ],

        ctaTitle: "Commencez à créer votre formulaire maintenant",
        ctaButton: "Rendre le PDF remplissable",
        ctaSubtext: "Gratuit pour toujours. Sécurisé et local."
    }
};

export const MakeFillableGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/make-pdf-fillable"
                lang={lang}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Guides', path: '/guides/ultimate-pdf-guide' },
                    { name: 'Make PDF Fillable', path: '/guides/make-pdf-fillable' }
                ]}
            />
            <PageLayout
                title={t.h1}
                subtitle={t.subtitle}
                icon={<PenTool size={32} />}
                breadcrumbs={[
                    { name: 'Home', onClick: () => onNavigate('HOME') },
                    { name: 'Guides', onClick: () => onNavigate('GUIDE_ULTIMATE') },
                    { name: 'Make Fillable Guide', onClick: () => { } }
                ]}
            >
                <div className="max-w-4xl mx-auto space-y-12">
                    <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        {t.intro}
                    </p>

                    {/* Content */}
                    <div className="space-y-16">
                        {t.sections && t.sections.map((section) => (
                            <section key={section.id}>
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-1 h-8 bg-canada-red rounded-full"></div>
                                    {section.title}
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                    {section.content}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Visual Pro Tip */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
                        <div className="flex items-start gap-4">
                            <Zap size={32} className="text-yellow-400 shrink-0" />
                            <div>
                                <h4 className="text-xl font-bold mb-2">Pro Tip: Auto-Detection</h4>
                                <p className="opacity-90 leading-relaxed">
                                    When creating forms, use underscore lines (e.g., Name: __________) or square brackets (e.g., [ ]) in your original document. Modern tools often use AI to detect these patterns and suggest field placements automatically!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <section className="bg-canada-red p-12 rounded-[2.5rem] text-center text-white shadow-2xl">
                        <h2 className="text-3xl font-black mb-4">{t.ctaTitle}</h2>
                        <p className="mb-8 text-white/80 font-medium">{t.ctaSubtext}</p>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/make-pdf-fillable')}
                            className="bg-white text-canada-red px-12 py-4 rounded-full font-black text-xl hover:scale-105 transition-all shadow-lg"
                        >
                            {t.ctaButton}
                        </button>
                    </section>

                    {/* FAQ */}
                    {t.faq && (
                        <section className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-3xl">
                            <h2 className="text-2xl font-black mb-8 text-center tracking-tight uppercase">Solutions to Common Problems</h2>
                            <div className="grid gap-6">
                                {t.faq.map((item, i) => (
                                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                        <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">{item.q}</h4>
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
