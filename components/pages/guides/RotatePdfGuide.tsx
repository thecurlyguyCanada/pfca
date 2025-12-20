import React from 'react';
import { RotateCw, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, Monitor, RefreshCcw } from 'lucide-react';
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
            title: "Rotate PDF Online Free | Flip & Save PDF Orientation Permanently | pdfcanada.ca",
            desc: "Rotate PDF pages online for free. Learn how to rotate and save PDF orientation permanently. Fix upside down or sideways scans instantly and securely."
        },
        h1: "How to Rotate and Save PDF Orientation Online for Free",
        subtitle: "The simple guide to fixing incorrectly oriented documents permanently.",

        intro: "We've all been there: you open an important scan and it's sideways. Or worse, the entire document is upside down. If you're looking to **rotate PDF online free**, you've come to the right place. Unlike a standard PDF viewer where rotation is only temporary, our tool updates the file structure so the orientation is fixed permanently for everyone who opens it. This is essential for professional submissions, legal filings in Canada, and ensuring your receipts are readable for the CRA.",

        sections: [
            {
                id: "why-rotate",
                title: "Why Rotation Matters",
                content: `Incorrect orientation isn't just a minor annoyance; it can be a professional liability. 
- **Readability**: Sideways documents are impossible to read on mobile devices without constant zooming and panning.
- **Professionalism**: Sending a sideways contract to a client shows a lack of attention to detail and can cause delays in signing.
- **Printing**: Saves paper and ink by ensuring the document matches the printer's output settings. Many modern printers will cut off text if the PDF's internal orientation doesn't match the paper size.
- **Accessibility**: Screen readers and OCR engines often struggle with text that is sideways. By **straightening your PDF**, you allow automated tools to process your data accurately.

Using a **permanent PDF rotation tool** ensures your document looks exactly as intended, every time.`
            },
            {
                id: "view-vs-permanent",
                title: "View Rotation vs. Permanent Rotation",
                content: `Many users are confused by the difference. If you open a file in Adobe Reader or Chrome and click 'Rotate', you are only changing how it looks on *your* screen at that second. If you save that file and send it, it will still be sideways for the recipient. 

Our **browser-based PDF rotator** performs a "physical" rotation of the page coordinates. This means we rewrite the PDF dictionary to set the \`/Rotate\` entry to the correct degree (90, 180, or 270). When you download the result, the change is baked into the file forever.`
            },
            {
                id: "how-to",
                title: "3 Easy Steps to Fix PDF Orientation",
                content: `Using our local-first tool is the most secure way to manage your files:
1. **Select Your PDF**: Click the 'Select File' button. Because we use WebAssembly, your file stays on your computer and is never uploaded to our servers.
2. **Rotate Individual Pages**: You'll see thumbnails of every page. Hover over a page to rotate it individually, or use the 'Rotate All' buttons in the toolbar to fix a batch of scans at once.
3. **Save and Download**: Click the 'Rotate PDF' button to finalize the metadata changes. Your new, corrected file will download in seconds.

This is the most **secure PDF rotator** available in Canada because your sensitive data never leaves your device.`
            },
            {
                id: "scenarios",
                title: "Common Fixes: Upside Down & Sideways Scans",
                content: `Different scanning errors require different fixes:
- **The Upside Down Scan**: This usually happens when the document feeder is loaded incorrectly. Use the **180° rotation** to flip the entire document.
- **Mixed Orientations**: Often, a 50-page document will have two or three landscape charts. Our tool allows you to select just those pages and **rotate 90° clockwise** without touching the rest of the document.
- **The Mobile Sideways Snaps**: If you've taken a photo of a document with your iPhone, it might export with incorrect EXIF data. Converting and rotating to PDF ensures it stays the right way up.`
            }
        ],

        faq: [
            {
                q: "What is the degree for rotate pdf upside down?",
                a: "To fix an upside-down document, you need to rotate it 180 degrees. Our tool provides a quick option to do this in two clicks."
            },
            {
                q: "Will rotating the PDF reduce the quality?",
                a: "No. Our tool only updates the orientation metadata within the PDF. Unlike converting an image, the quality of your text and vector graphics remains 100% identical."
            },
            {
                q: "Can I rotate just one page in a PDF?",
                a: "Yes! You can select specific pages to rotate without affecting the rest of the file. This is perfect for documents with mixed portrait and landscape pages."
            },
            {
                q: "Is it safe to rotate private legal documents online?",
                a: "Most online tools are unsafe because they upload your file. However, pdfcanada.ca processes everything **locally in your browser**. Your private documents never touch our servers, making it the safest choice for legal and financial files."
            }
        ],

        ctaTitle: "Ready to Fix Your PDF Orientation?",
        ctaButton: "Rotate PDF Permanently",
        ctaSubtext: "Free, secure, and made for Canada. No signup required."
    },
    fr: {
        seo: {
            title: "Pivoter un PDF en Ligne Gratuit | Redresser l'Orientation PDF | pdfcanada.ca",
            desc: "Faites pivoter les pages PDF en ligne gratuitement. Apprenez à faire pivoter et à enregistrer l'orientation PDF de manière permanente. Fixez les scans à l'envers instantanément."
        },
        h1: "Comment pivoter et enregistrer l'orientation d'un PDF gratuitement",
        subtitle: "Le guide simple pour redresser vos documents mal orientés de façon permanente et sécurisée.",

        intro: "Nous y avons tous été confrontés : vous ouvrez un scan important et il est de côté. Ou pire, tout le document est à l'envers. Si vous cherchez à **pivoter un PDF en ligne**, vous êtes au bon endroit. Contrairement à un lecteur PDF standard où la rotation n'est que temporaire, notre outil met à jour la structure du fichier pour que l'orientation soit fixée de manière permanente.",

        sections: [
            {
                id: "why-rotate",
                title: "Pourquoi l'orientation est-elle importante ?",
                content: `Une mauvaise orientation peut nuire à votre professionnalisme :
- **Lisibilité** : Les documents de côté sont impossibles à lire sur mobile.
- **Professionnalisme** : Envoyer un contrat de travers à un client montre un manque d'attention aux détails.
- **Impression** : Évitez le gaspillage de papier en alignant le PDF avec les paramètres de votre imprimante.`
            },
            {
                id: "how-to",
                title: "3 étapes faciles pour redresser un PDF",
                content: `Notre outil local est la méthode la plus sûre au Canada :
1. **Sélectionnez votre PDF** : Cliquez sur 'Choisir un fichier'. Votre document reste sur votre appareil.
2. **Pivotez les pages** : Utilisez les boutons de rotation pour chaque page ou pour tout le document.
3. **Enregistrez** : Cliquez sur 'Pivoter le PDF' et téléchargez votre fichier corrigé.`
            }
        ],

        faq: [
            {
                q: "Est-ce que ça réduit la qualité ?",
                a: "Non, nous modifions uniquement les métadonnées de rotation. La qualité du texte et des images reste identique à 100%."
            },
            {
                q: "Puis-je pivoter une seule page ?",
                a: "Oui, vous pouvez sélectionner des pages spécifiques à pivoter sans toucher au reste du document."
            }
        ],

        ctaTitle: "Prêt à redresser votre PDF ?",
        ctaButton: "Pivoter le PDF maintenant",
        ctaSubtext: "100% Gratuit. Sans filigrane."
    }
};

export const RotatePdfGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/rotate-pdf"
                lang={lang}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Guides', path: '/guides/ultimate-pdf-guide' },
                    { name: 'Rotate PDF', path: '/guides/rotate-pdf' }
                ]}
            />
            <PageLayout
                title={t.h1}
                subtitle={t.subtitle}
                icon={<RotateCw size={32} />}
                breadcrumbs={[
                    { name: 'Home', onClick: () => onNavigate('HOME') },
                    { name: 'Guides', onClick: () => onNavigate('GUIDE_ULTIMATE') },
                    { name: 'Rotate PDF Guide', onClick: () => { } }
                ]}
            >
                <div className="max-w-4xl mx-auto space-y-12">
                    <MarkdownContent content={t.intro} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400" />

                    {t.sections && t.sections.map((section) => (
                        <section key={section.id}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                            <MarkdownContent content={section.content} />
                        </section>
                    ))}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
                            <RefreshCcw className="mx-auto text-canada-red mb-2" />
                            <span className="text-xs font-bold">90° CW</span>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
                            <RefreshCcw className="mx-auto text-canada-red mb-2 -scale-x-100" />
                            <span className="text-xs font-bold">90° CCW</span>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
                            <Clock className="mx-auto text-canada-red mb-2" />
                            <span className="text-xs font-bold">Permanent</span>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
                            <Monitor className="mx-auto text-canada-red mb-2" />
                            <span className="text-xs font-bold">Cross-Device</span>
                        </div>
                    </div>

                    <section className="bg-canada-red p-10 rounded-3xl text-center text-white">
                        <h2 className="text-2xl font-bold mb-4">{t.ctaTitle}</h2>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/rotate-pdf')}
                            className="bg-white text-canada-red px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            {t.ctaButton}
                        </button>
                    </section>

                    {t.faq && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
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
