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

        intro: "Got a document that's all out of order? Scanned pages in the wrong sequence? Knowing how to **organize PDF pages online** is essential for creating professional documents, academic submissions, and organized business records. Our **free PDF page organizer** allows you to visually **reorder PDF pages** using a simple drag-and-drop interface. No complicated menus, just your document, exactly how you want it, processed locally on your Canadian machine.",

        sections: [
            {
                id: "reorder-vs-merge",
                title: "Reordering vs. Merging: What's the Difference?",
                content: `Many people confuse organizing with merging. 
- **Merging**: Taking two or more separate files and sticking them together.
- **Organizing (Reordering)**: Taking a single file and changing the internal flow of its pages. 

Our tool excels at the latter. If you've scanned a double-sided document and the pages are interlaced incorrectly, or if you need to move a signature page from the end to the middle, our **reorder PDF pages free** tool is the fastest way to fix it.`
            },
            {
                id: "how-to",
                title: "Steps to Reorder Your PDF with Drag-and-Drop",
                content: `Using our browser-based tool is intuitive and requires zero installation:
1. **Upload**: Select your file. Each page will appear as a high-resolution, movable thumbnail.
2. **Rearrange**: Simply click and hold a page thumbnail, then move it to its new position. You'll see the other pages shift automatically to accommodate the change.
3. **Save and Secure**: Once you're happy with the sequence, click 'Organize PDF'. The new file structure is generated in your browser's memory, ensuring your **private data never touches a server**.`
            },
            {
                id: "batch-moving",
                title: "Batch Reordering and Organization",
                content: `For longer documents (like 50+ pages), manually moving one page at a time can be tedious. Our tool allows for **batch page organization**. You can select a range of pages and move them as a single block, making it simple to reorganize entire chapters or sections of a manual in one smooth motion.`
            }
        ],

        faq: [
            {
                q: "Can I organize PDF pages on a phone?",
                a: "Yes! Our organize tool supports multi-touch interaction. You can use your finger to tap and drag thumbnails on your iPhone, iPad, or Android device just as you would with a mouse."
            },
            {
                q: "Is there a limit on how many pages I can reorder?",
                a: "Since the tool runs locally on your device, the only limit is your computer's RAM. We've seen users reorder documents with hundreds of pages smoothly."
            },
            {
                q: "Will the original file be deleted?",
                a: "We never touch your original file. We create a modified copy in your browser's memory. Your original remains safely in its folder on your computer."
            }
        ],

        ctaTitle: "Fixed Your Document Order Now",
        ctaButton: "Organize PDF Pages",
        ctaSubtext: "Fast, Free, and 100% Private. Canadian-made."
    },
    fr: {
        seo: {
            title: "Organiser les Pages PDF en Ligne | Réorganiser PDF Gratuit | pdfcanada.ca",
            desc: "Organisez les pages PDF gratuitement. Apprenez comment réorganiser les pages d'un PDF, déplacer les pages et mélanger des documents en ligne en toute sécurité."
        },
        h1: "Comment Organiser et Réorganiser les Pages PDF",
        subtitle: "La façon la plus simple de mélanger et déplacer les pages de votre document PDF par simple glisser-déposer au Canada.",

        intro: "Votre document n'est pas dans le bon ordre? Scans inversés? Utilisez notre outil **gratuit d'organisation de PDF** pour réorganiser vos pages visuellement sans jamais quitter votre navigateur.",

        sections: [
            {
                id: "how-to",
                title: "Étapes pour réorganiser votre PDF",
                content: `C'est 100% visuel et sécurisé :
1. **Importez** : Sélectionnez votre fichier. Chaque page apparaît comme une icône.
2. **Glissez-déposez** : Déplacez les pages à la position souhaitée avec votre souris ou votre doigt.
3. **Enregistrez** : Téléchargez le nouveau document ordonné.`
            },
            {
                id: "privacy",
                title: "Confidentialité Garantie",
                content: `Contrairement aux sites qui traitent vos fichiers sur leurs serveurs, pdfcanada.ca fait tout le travail **sur votre ordinateur**. Vos documents confidentiels ne nous sont jamais envoyés.`
            }
        ],

        faq: [
            {
                q: "Puis-je organiser sur mobile?",
                a: "Oui, notre interface est optimisée pour le toucher sur iPhone et Android."
            },
            {
                q: "Est-ce gratuit ?",
                a: "Oui, c'est totalement gratuit et sans publicité."
            }
        ],

        ctaTitle: "Corrigez l'ordre maintenant",
        ctaButton: "Organiser les pages PDF",
        ctaSubtext: "Rapide, gratuit et privé."
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
