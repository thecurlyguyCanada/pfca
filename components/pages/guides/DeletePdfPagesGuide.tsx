import React from 'react';
import { Trash2, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, MousePointer2, Smartphone, Monitor, Info, HelpCircle, FileText, MoveRight } from 'lucide-react';
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
            title: "Delete Pages from PDF Free | Remove PDF Pages Online | pdfcanada.ca",
            desc: "Learn how to delete pages from PDF free online. The ultimate guide to remove pages from PDF documents on Windows, Mac, iPhone, and Android. Fast, secure, and no upload required."
        },
        h1: "The Ultimate Guide: How to Delete Pages from PDF",
        subtitle: "Master the art of removing unwanted, blank, or sensitive pages from your PDF documents instantly.",

        intro: "Need to **delete pages from a PDF**? Whether you're trying to **remove pages from PDF** documents for work, school, or personal use, you've likely found that standard readers don't make it easy. Our guide and tool show you exactly **how do you delete pages from a PDF** quickly, securely, and for free. No software installation, no signups, and most importantly—no file uploads to risky servers. This is especially critical for Canadians handling sensitive medical, legal, or financial documents.",

        sections: [
            {
                id: "how-to",
                title: "How to Delete Pages from a PDF (Step-by-Step)",
                content: `If you're wondering **how do I delete pages from a PDF**, our local-first **pdf page remover** makes it effortless:

1. **Upload Your PDF File**: Click the 'Select File' button. Because we use WebAssembly, your file is processed in your device's RAM, never on our disks.
2. **Select Pages to Delete**: As you hover over thumbnails, you'll see a red trash icon. Click on the pages you want to **remove from pdf**. Selected pages will be highlighted.
3. **Download Your New PDF**: Click 'Remove Pages'. The tool instantly generates a new PDF excluding the selected pages and saves it to your downloads folder.

This is the fastest way to **delete pdf page online** without any privacy compromises.`
            },
            {
                id: "privacy-pii",
                title: "Removing Sensitive Information (PII)",
                content: `Deleting pages is often about security. 
- **Remove Signature Pages**: If you're sharing a contract but want to keep the signature page private, simply delete that specific page.
- **Data Minimization**: For AODA or CRA submissions, only send the pages required. **Permanently delete pages from PDF** that contain social insurance numbers or private bank details before sharing.
- **Local vs Cloud**: Other tools upload your file to a server, where a copy may exist for hours. pdfcanada.ca ensures that if you delete a page, it stays deleted and was never seen by anyone else.`
            },
            {
                id: "scenarios",
                title: "Common Fixes: Blank and Scanned Pages",
                content: `
- **Delete Blank Page from PDF**: Often, scanners add an extra page at the end. Use our tool to **remove blank page from pdf** in seconds.
- **Split and Clean**: If you have a 100-page document but only need the middle 10, it's easier to **delete multiple pages from PDF** at the start and end than to manually re-type the content.
- **Delete Last Page from PDF**: Many documents have an unnecessary 'Notes' page at the end. **Delete last page from pdf** to keep your files lean.`
            },
            {
                id: "device-guide",
                title: "Platform Specific Deletion",
                content: `
- **Windows/Mac**: Simply drag-and-drop. Our interface is optimized for high-resolution monitors to help you see fine text before you **delete pdf pages**.
- **Android/iPhone**: No need to download 'PDF Eraser' apps that might contain malware. Our site works as a **free pdf page remover** directly in your mobile browser.`
            }
        ],

        faq: [
            {
                q: "How can I delete pages from a PDF for free?",
                a: "You can use pdfcanada.ca. It is a 100% free tool that allows you to delete pdf pages online free. No signup, no email, no strings attached."
            },
            {
                q: "Does deleting a page reduce file size?",
                a: "Yes! By choosing to **remove pages from pdf**, the resulting file will be smaller, making it easier to email or upload to government portals."
            },
            {
                q: "Can I undo a deletion?",
                a: "Since the tool creates a *new* file, your original file remains untouched on your computer. If you make a mistake, just start again with the original!"
            },
            {
                q: "How to delete pages in a pdf on a Mac without Preview?",
                a: "While Preview can do basic deletions, our tool is often faster for batch deletions and works the same way across all browsers."
            }
        ],

        ctaTitle: "Ready to Clean Up Your Document?",
        ctaButton: "Remove PDF Pages Now",
        ctaSubtext: "100% Secure. 100% Local. 🇨🇦 Made.",

        supportingSections: [
            {
                title: "Pro Tip: Verify Before Deletion",
                content: "When you **delete pages from pdf**, always double-check the 'Selection' count at the bottom of our tool. It will tell you exactly how many pages are being removed to ensure you don't accidentally lose a critical page."
            }
        ]
    },
    fr: {
        seo: {
            title: "Supprimer des Pages PDF Gratuit | Enlever Pages PDF en Ligne | pdfcanada.ca",
            desc: "Apprenez comment supprimer des pages d'un PDF gratuitement en ligne. Le guide ultime pour enlever des pages de documents PDF au Canada en toute sécurité."
        },
        h1: "Comment Supprimer des Pages d'un PDF au Canada",
        subtitle: "Retirez les pages inutiles ou confidentielles de vos documents PDF instantanément et localement.",

        intro: "Besoin de **supprimer des pages d'un PDF**? Pour les documents juridiques ou fiscaux canadiens, la sécurité est primordiale. Notre outil vous permet d'**enlever des pages d'un PDF** sans jamais envoyer vos fichiers sur un serveur externe.",

        sections: [
            {
                id: "how-to",
                title: "3 Étapes pour Supprimer des Pages",
                content: `1. **Sélectionnez le fichier** : Votre document reste privé sur votre ordinateur.
2. **Cliquez sur les pages** : Choisissez les pages à retirer (marquées d'une icône rouge).
3. **Téléchargez** : Obtenez votre version épurée immédiatement.`
            },
            {
                id: "scenarios-fr",
                title: "Cas d'utilisation courants",
                content: `- **Supprimer une page vierge** : Nettoyez vos scans.
- **Protéger la vie privée** : Retirez les pages contenant des informations sensibles avant le partage.`
            }
        ],

        faq: [
            {
                q: "Est-ce gratuit ?",
                a: "Oui, totalement gratuit, sans filigrane et sans inscription."
            },
            {
                q: "Est-ce sécurisé ?",
                a: "Absolument. Tout se passe dans votre navigateur. Personne d'autre ne voit vos documents."
            }
        ],

        ctaTitle: "Prêt à nettoyer votre document ?",
        ctaButton: "Supprimer les pages maintenant",
        ctaSubtext: "Gratuit, rapide et local.",

        supportingSections: [
            {
                title: "Conseil de Pro",
                content: "Vérifiez toujours le nombre de pages sélectionnées avant de cliquer sur le bouton final."
            }
        ]
    }
};

export const DeletePdfPagesGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": t.h1,
            "description": t.seo.desc,
            "step": [
                { "@type": "HowToStep", "position": 1, "name": "Select File", "text": "Upload your PDF document to the tool locally." },
                { "@type": "HowToStep", "position": 2, "name": "Select Pages", "text": "Identify and click the pages you want to remove." },
                { "@type": "HowToStep", "position": 3, "name": "Remove and Download", "text": "Finalize the deletion and download the new file." }
            ]
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
                <div className="max-w-4xl mx-auto space-y-16 text-gray-700 dark:text-gray-300">

                    {/* Intro */}
                    <MarkdownContent content={t.intro} className="text-xl italic border-l-4 border-canada-red pl-6 py-2" />

                    {/* Table of Contents */}
                    <nav className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                            <MousePointer2 size={16} /> Jump to Section
                        </h3>
                        <div className="grid md:grid-cols-2 gap-2">
                            {t.sections.map(s => (
                                <a key={s.id} href={`#${s.id}`} className="text-sm hover:text-canada-red transition-colors flex items-center gap-2">
                                    <ArrowRight size={12} className="text-canada-red/50" /> {s.title}
                                </a>
                            ))}
                        </div>
                    </nav>

                    {/* Content Sections */}
                    {t.sections.map((section, idx) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-black text-gray-100 dark:text-gray-800">{idx + 1}</span>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                            </div>
                            <MarkdownContent content={section.content} />
                        </section>
                    ))}

                    {/* Device & Platform Icons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <Monitor className="text-blue-500" />
                            <span className="text-xs font-bold">Windows</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <Monitor className="text-gray-500" />
                            <span className="text-xs font-bold">macOS</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <Smartphone className="text-green-500" />
                            <span className="text-xs font-bold">iPhone</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <Smartphone className="text-orange-500" />
                            <span className="text-xs font-bold">Android</span>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <section className="bg-canada-red rounded-3xl p-12 text-center text-white shadow-xl">
                        <Zap className="mx-auto mb-6 opacity-50" size={48} />
                        <h2 className="text-3xl font-black mb-4">{t.ctaTitle}</h2>
                        <p className="text-white/80 mb-8 font-medium">{t.ctaSubtext}</p>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/delete-pdf-pages')}
                            className="bg-white text-canada-red px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-lg"
                        >
                            {t.ctaButton}
                        </button>
                    </section>

                    {/* Supporting Info */}
                    {t.supportingSections && t.supportingSections.map((s, i) => (
                        <section key={i} className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800/30">
                            <div className="flex items-center gap-3 mb-4">
                                <Info className="text-blue-600" />
                                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300">{s.title}</h3>
                            </div>
                            <MarkdownContent content={s.content} className="text-blue-800 dark:text-blue-400 leading-relaxed" />
                        </section>
                    ))}

                    {/* FAQ */}
                    <section aria-labelledby="faq-title">
                        <div className="flex items-center gap-3 mb-8">
                            <HelpCircle className="text-canada-red" size={32} />
                            <h2 id="faq-title" className="text-3xl font-bold text-gray-900 dark:text-white">Questions & Answers</h2>
                        </div>
                        <div className="grid gap-4">
                            {t.faq && t.faq.map((item, i) => (
                                <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-canada-red transition-all">
                                    <summary className="font-bold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center group-open:text-canada-red">
                                        {item.q}
                                        <span className="text-gray-300 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <MarkdownContent
                                        content={item.a}
                                        className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4"
                                    />
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Footer Nav Links */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-16 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <Globe size={16} /> Localized in Canada 🇨🇦
                        </div>
                        <button
                            onClick={() => onNavigate('HOME')}
                            className="flex items-center gap-2 text-canada-red font-bold hover:gap-4 transition-all"
                        >
                            Back to Tools <MoveRight size={18} />
                        </button>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};
