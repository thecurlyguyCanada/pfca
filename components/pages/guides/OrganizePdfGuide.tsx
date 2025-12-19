import React from 'react';
import { FileText, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, Move } from 'lucide-react';
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
            title: "Organize PDF Pages Online | Reorder PDF Pages Free | pdfcanada.ca",
            desc: "Organize PDF pages for free. Learn how to reorder PDF pages, move pages within a PDF, and shuffle documents online securely."
        },
        h1: "How to Organize and Reorder PDF Pages",
        subtitle: "The easiest way to shuffle, flip, and move pages in your PDF document with drag-and-drop simplicity.",

        intro: "Got a document that's all out of order? Scanned pages in the wrong sequence? Knowing how to **organize PDF pages online** is essential for creating professional documents. Our **free PDF page organizer** allows you to visually **reorder PDF pages** using a simple drag-and-drop interface. No complicated menus, just your document, exactly how you want it.",

        sections: [
            {
                id: "how-to",
                title: "Steps to Reorder Your PDF",
                content: `Using our **reorder PDF pages free** tool is intuitive:
1. **Upload**: Select your file. Each page will appear as a movable thumbnail.
2. **Drag and Drop**: Simply click and hold a page thumbnail, then move it to its new position.
3. **Save**: Click 'Organize PDF' and your new, perfectly ordered file is ready.

This works perfectly on both desktop and mobile devices.`
            }
        ],

        faq: [
            {
                q: "Can I organize PDF pages on a phone?",
                a: "Yes! Our organize tool supports touch interaction, so you can drag and drop pages on your iPhone or Android phone easily."
            }
        ],

        ctaTitle: "Fixed Your Document Order Now",
        ctaButton: "Organize PDF",
        ctaSubtext: "Fast, Free, and No Uploads."
    },
    fr: {
        seo: {
            title: "Organiser les Pages PDF en Ligne | Réorganiser PDF Gratuit | pdfcanada.ca",
            desc: "Organisez les pages PDF gratuitement. Apprenez comment réorganiser les pages d'un PDF, déplacer les pages et mélanger des documents en ligne en toute sécurité."
        },
        h1: "Comment Organiser et Réorganiser les Pages PDF",
        subtitle: "La façon la plus simple de mélanger et déplacer les pages de votre document PDF par simple glisser-déposer.",

        intro: "Votre document n'est pas dans le bon ordre? Utilisez notre outil **gratuit d'organisation de PDF** pour réorganiser vos pages visuellement.",

        sections: [
            {
                id: "how-to",
                title: "Étapes pour réorganiser votre PDF",
                content: `L'utilisation de notre outil pour **réorganiser les pages PDF gratuitement** est intuitive.`
            }
        ],

        faq: [
            {
                q: "Puis-je organiser sur mobile?",
                a: "Oui, parfaitement."
            }
        ],

        ctaTitle: "Corrigez l'ordre maintenant",
        ctaButton: "Organiser PDF",
        ctaSubtext: "Rapide, gratuit et sans téléversement."
    }
};

export const OrganizePdfGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/organize-pdf"
                lang={lang}
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<Move size={32} />}>
                <div className="max-w-4xl mx-auto space-y-12">
                    <MarkdownContent content={t.intro} className="text-xl text-gray-500 dark:text-gray-400 font-medium" />

                    <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 flex gap-4">
                        <Zap className="text-amber-600 shrink-0" />
                        <p className="text-sm text-amber-800 dark:text-amber-300">
                            <strong>Insider Tip:</strong> You can combine this tool with our 'Delete Pages' tool to perfectly curate your final document before sharing.
                        </p>
                    </div>

                    {t.sections.map(s => (
                        <div key={s.id}>
                            <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
                            <MarkdownContent content={s.content} />
                        </div>
                    ))}

                    <section className="bg-canada-red p-12 rounded-[2.5rem] text-center text-white">
                        <h2 className="text-3xl font-black mb-4">{t.ctaTitle}</h2>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/organize-pdf')}
                            className="bg-white text-canada-red px-10 py-4 rounded-full font-black text-xl hover:scale-105 transition-all"
                        >
                            {t.ctaButton}
                        </button>
                    </section>
                </div>
            </PageLayout>
        </>
    );
};
