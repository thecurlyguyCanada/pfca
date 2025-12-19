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

        intro: "Need to **delete pages from a PDF**? Whether you're trying to **remove pages from PDF** documents for work, school, or personal use, you've likely found that standard readers don't make it easy. Our guide and tool show you exactly **how do you delete pages from a PDF** quickly, securely, and for free. No software installation, no signups, and most importantly—no file uploads to risky servers.",

        sections: [
            {
                id: "how-to",
                title: "How to Delete Pages from a PDF (Step-by-Step)",
                content: `If you're wondering **how do I delete pages from a PDF**, the process is simpler than you think. Using our local-first **pdf page remover**, follow these three steps:

1. **Upload Your PDF File**: Click the 'Select File' button or drag and drop your document. Because we use WebAssembly, your file stays on your device.
2. **Select Pages to Delete**: Click on the thumbnails of the pages you want to **remove from pdf**. You can **delete multiple pages from PDF** at once by clicking each one.
3. **Download Your New PDF**: Click 'Remove Pages' and your clean document will download automatically.

This is the fastest way to **delete pdf page online** without any hassle.`
            },
            {
                id: "mobile-vs-desktop",
                title: "Delete Pages from PDF on Any Device",
                content: `Our tool is built to be universal. Whether you need to **delete pages from pdf on windows**, **delete pages from pdf on mac**, or you're on the go with a mobile device, we have you covered.

- **On iPhone & Android**: You don't need a special app to **delete pages from pdf android** or iOS. Simply visit pdfcanada.ca in your mobile browser and use the same intuitive interface to **remove page from pdf**.
- **On Desktop**: For those working on complex documents, our interface allows you to see every detail before you **delete unwanted pages from pdf**.`
            },
            {
                id: "long-tail-wins",
                title: "Specific Scenarios: Scanned, Blank, and Single Pages",
                content: `Sometimes you need more than just general deletion. Here are some of the most common "easy win" tasks our users perform:

- **Delete Blank Page from PDF**: Scanners often add unnecessary blank pages. Quickly identify and **remove blank page from pdf** to make your document look professional.
- **Delete Scanned Pages from PDF**: If a scan went wrong, you don't need to re-scan the whole thing. Just **delete scanned pages from pdf** that are blurry or crooked.
- **Delete One Page from PDF**: Sometimes you just need to **delete last page from pdf** or **delete first page from pdf** to remove a cover note or appendix.
- **Permanently Delete Pages from PDF**: Unlike "hidden" deletions in some editors, our tool creates a new file that **permanently deletes pages from pdf**, ensuring they cannot be recovered by the recipient.`
            },
            {
                id: "why-local",
                title: "Why Use a Free PDF Page Remover Online?",
                content: `You might ask, "Why should I use this **pdf page deleter** instead of other sites?" Most "free" sites are actually **remove pdf pages online** services that harvest your data. 

As a **delete pages from pdf canada**-based service, we prioritize your privacy. Using a **free pdf page remover** that runs locally means your sensitive data (like tax forms or contracts) is never seen by us or anyone else. It's the most **secure and private** way to **delete pages in pdf** documents.`
            }
        ],

        faq: [
            {
                q: "How can I delete pages from a PDF for free?",
                a: "You can use pdfcanada.ca. It is a 100% free tool that allows you to delete pdf pages online free of charge. No signup is required."
            },
            {
                q: "Can I remove selected pages from pdf and keep them in order?",
                a: "Yes! Our tool keeps the remaining pages in their original order. If you need to reorder them, you can use our 'Organize PDF' tool after deleting."
            },
            {
                q: "How to delete pages in a pdf document on a Mac?",
                a: "Simply open Safari or Chrome on your Mac, visit our site, and use the feature. It works exactly like the Windows version."
            },
            {
                q: "Is it possible to delete multiple pages from pdf at once?",
                a: "Absolutely. You can select as many pages as you want. They will be highlighted with a red trash icon before you finalize the removal."
            }
        ],

        ctaTitle: "Ready to Remove PDF Pages?",
        ctaButton: "Delete Pages Now",
        ctaSubtext: "Free, fast, and secure. No signup required.",

        supportingSections: [
            {
                title: "Common Mistakes When Deleting PDF Pages",
                content: "The biggest mistake is not checking the page numbers. Because thumbnails can look similar, always zoom in or preview the page before you **delete pdf pages**. Another mistake is using cloud-based tools for sensitive documents—always stick to local-first processing."
            }
        ]
    },
    fr: {
        seo: {
            title: "Supprimer des Pages PDF Gratuit | Enlever Pages PDF en Ligne | pdfcanada.ca",
            desc: "Apprenez comment supprimer des pages d'un PDF gratuitement en ligne. Le guide ultime pour enlever des pages de documents PDF sur Windows, Mac, iPhone et Android."
        },
        h1: "Le Guide Ultime : Comment Supprimer des Pages d'un PDF",
        subtitle: "Maîtrisez l'art de retirer les pages indésirables, vierges ou sensibles de vos documents PDF instantanément.",

        intro: "Besoin de **supprimer des pages d'un PDF**? Que vous essayiez d'**enlever des pages d'un PDF** pour le travail, l'école ou un usage personnel, vous avez probablement constaté que les lecteurs standard ne facilitent pas la tâche. Notre guide vous montre exactement **comment supprimer des pages d'un document PDF** rapidement et en toute sécurité.",

        sections: [
            {
                id: "how-to",
                title: "Comment Supprimer des Pages d'un PDF (Étape par Étape)",
                content: `Si vous vous demandez **comment supprimer des pages d'un PDF**, le processus est plus simple que vous ne le pensez. En utilisant notre **outil de suppression de pages PDF** local, suivez ces trois étapes :
                
1. **Téléversez Votre Fichier PDF** : Cliquez sur 'Choisir un fichier'. Comme nous utilisons WebAssembly, votre fichier reste sur votre appareil.
2. **Sélectionnez les Pages à Supprimer** : Cliquez sur les miniatures des pages que vous souhaitez **enlever du PDF**.
3. **Téléchargez Votre Nouveau PDF** : Cliquez sur 'Supprimer' et votre document sera téléchargé automatiquement.`
            },
            {
                id: "mobile-vs-desktop",
                title: "Supprimer des Pages PDF sur N'importe Quel Appareil",
                content: `Notre outil est universel. Que vous ayez besoin de **supprimer des pages PDF sur Windows**, **Mac**, ou que vous soyez en déplacement avec un appareil mobile.
                
- **Sur iPhone et Android** : Pas besoin d'application spéciale. Ouvrez simplement pdfcanada.ca dans votre navigateur mobile.
- **Sur Ordinateur** : Pour les documents complexes, notre interface vous permet de voir chaque détail avant de **supprimer les pages indésirables**.`
            }
        ],

        faq: [
            {
                q: "Comment puis-je supprimer des pages d'un PDF gratuitement ?",
                a: "Vous pouvez utiliser pdfcanada.ca. C'est un outil 100% gratuit qui vous permet de supprimer des pages PDF en ligne sans frais et sans inscription."
            },
            {
                q: "Puis-je supprimer plusieurs pages à la fois ?",
                a: "Absolument. Vous pouvez sélectionner autant de pages que vous le souhaitez. Elles seront marquées d'une icône de corbeille rouge."
            }
        ],

        ctaTitle: "Prêt à supprimer des pages PDF ?",
        ctaButton: "Supprimer les pages maintenant",
        ctaSubtext: "Gratuit, rapide et sécurisé. Aucune inscription requise.",

        supportingSections: [
            {
                title: "Erreurs courantes lors de la suppression de pages PDF",
                content: "L'erreur la plus fréquente est de ne pas vérifier les numéros de page. Vérifiez toujours la miniature avant de valider la suppression."
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
