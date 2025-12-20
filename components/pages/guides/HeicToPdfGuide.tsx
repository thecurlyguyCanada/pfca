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
            desc: "The definitive guide to converting iPhone HEIC photos to PDF. Learn how to merge multiple HEIC images into a single PDF locally on Windows, Mac, and mobile."
        },
        h1: "How to Convert HEIC to PDF: The Ultimate 2026 Guide",
        subtitle: "The simplest, most secure way to transform your iPhone photos into professional PDF documents without leaving your browser.",

        intro: "Are you struggling with **HEIC files**? High Efficiency Image Coding (HEIC) is the standard format for photos on modern iPhones, but it frequently causes compatibility headaches. Whether you're trying to share photos with Windows users, print receipts at a local shop, or upload proof of identity to Canadian government portals like the **CRA (Canada Revenue Agency)** or **IRCC**, the PDF format is a much safer bet. Our **HEIC to PDF converter** provides a free, secure, and local-first solution to these digital hurdles.",

        sections: [
            {
                id: "what-is-heic",
                title: "What is HEIC and Why Does it Exist?",
                content: `HEIC is Apple's implementation of the HEIF (High Efficiency Image File) standard. It was designed to replace JPEG by offering better image quality at roughly half the file size. 
                
While efficient for storage, HEIC is notorious for lack of support:
- **Windows Limitation**: Most PCs cannot open HEIC files without purchasing a $1.29 extension from the Microsoft Store.
- **Web Standards**: Many websites and upload portals (including insurance and job boards) still do not accept raw HEIC uploads.
- **Legal Stability**: PDF is an ISO-standardized format that ensures your photos look exactly the same across all devices, making it the preferred choice for official documentation.`
            },
            {
                id: "merging",
                title: "Batch Conversion: Merge Multiple HEIC into One PDF",
                content: `One of the most powerful features of our **free HEIC to PDF converter** is the ability to merge multiple photos into a single document. Instead of sending 10 separate photo files of a multi-page contract, you can:
1. **Upload all HEIC files** at once.
2. **Reorder them** using our drag-and-drop interface.
3. **Download one PDF** containing all your images. This significantly simplifies the life of whoever is receiving your documents.`
            },
            {
                id: "privacy",
                title: "Maximum Privacy for Personal Photos",
                content: `Your photo gallery contains sensitive life moments. When you use a random 'cloud' converter, your photos are uploaded to a remote server. pdfcanada.ca is different. We use **WebAssembly and local processing** to convert your images within your browser's RAM. Your photos NEVER leave your computer or smartphone, ensuring that your private data stays private.`
            }
        ],

        faq: [
            {
                q: "How to convert HEIC to PDF on iPhone without an app?",
                a: "You don't need a dedicated app. Open Safari on your iPhone, go to pdfcanada.ca, select your photos from the library, and we will generate a PDF 'on the fly' that you can save to your Files or send via email."
            },
            {
                q: "Is converting to PDF better than converting to JPG?",
                a: "For sharing multiple photos or official documents, **PDF is superior**. It allows for multi-page support, smaller collective file sizes for documentation, and better printing control compared to raw JPEGs."
            },
            {
                q: "Does pdfcanada.ca store my photos?",
                a: "No. Unlike other websites, we have zero server-side storage for files. The conversion happens entirely on your device's CPU. As soon as you close the tab, all traces of your images are gone."
            },
            {
                q: "Can I convert large batches of 50+ photos?",
                a: "Yes. Because the processing is local, the only limit is your device's memory. Desktop users can easily convert massive batches in seconds."
            }
        ],

        ctaTitle: "Ready to Fix Your Compatibility Issues?",
        ctaButton: "Start HEIC to PDF Conversion",
        ctaSubtext: "100% Free. No Signup. Proudly Canadian and Local-First."
    },
    fr: {
        seo: {
            title: "Convertir HEIC en PDF Gratuit | Photos iPhone vers PDF | pdfcanada.ca",
            desc: "Guide ultime pour convertir vos photos iPhone HEIC en PDF. Apprenez à fusionner plusieurs images HEIC en un seul PDF localement sans téléversement."
        },
        h1: "Comment Convertir HEIC en PDF Gratuitement",
        subtitle: "La façon la plus simple et sécurisée de transformer vos photos iPhone en documents PDF professionnels au Canada.",

        intro: "Vous avez des problèmes de compatibilité avec les fichiers **HEIC** de votre iPhone? Bien que ce format soit excellent pour économiser de l'espace, il n'est souvent pas accepté par les portails du gouvernement canadien (ARC, IRCC) ou les utilisateurs Windows. Notre **convertisseur HEIC en PDF gratuit** est conçu pour les Canadiens qui exigent la confidentialité totale.",

        sections: [
            {
                id: "why-convert-fr",
                title: "Pourquoi convertir HEIC en PDF ?",
                content: `Le format PDF est universel. En convertissant vos photos HEIC, vous garantissez que n'importe qui pourra les ouvrir, les imprimer et les visionner sans erreur de format, que ce soit sur un PC Windows ou une liseuse.`
            },
            {
                id: "batch-fr",
                title: "Fusionnez plusieurs photos en un seul document",
                content: `Arrêtez d'envoyer 20 fichiers séparés. Notre outil vous permet de combiner toutes vos reçus ou pages de contrat en un seul document PDF organisé. Vous pouvez même réorganiser les pages avant la conversion.`
            },
            {
                id: "security-fr",
                title: "Sécurité locale : Vos photos restent chez vous",
                content: `Contrairement aux sites 'cloud' qui stockent vos images sur des serveurs étrangers, nous traitons tout sur votre appareil. Vos photos privées ne quittent jamais votre téléphone ou ordinateur.`
            }
        ],

        faq: [
            {
                q: "Est-ce gratuit ?",
                a: "Oui, totalement gratuit. Nous ne limitons pas le nombre de photos que vous pouvez convertir."
            },
            {
                q: "Cela fonctionne-t-il sur Android ?",
                a: "Oui, notre outil web est compatible avec tous les smartphones modernes (Android et iPhone) via Chrome ou Safari."
            },
            {
                q: "Puis-je l'utiliser pour l'ARC (CRA) ?",
                a: "Absolument. Le format PDF est le standard recommandé pour les soumissions de documents justificatifs auprès de l'Agence du revenu du Canada."
            }
        ],

        ctaTitle: "Prêt à convertir vos photos ?",
        ctaButton: "Convertir HEIC maintenant",
        ctaSubtext: "Gratuit, rapide et 100% privé au Canada."
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
            { "@type": "HowToStep", "position": 1, "name": "Select HEIC Photos", "text": "Pick your iPhone .heic images from your device or photo library." },
            { "@type": "HowToStep", "position": 2, "name": "Organize Pages", "text": "Arrange the thumbnails in the order you want them to appear in the PDF document." },
            { "@type": "HowToStep", "position": 3, "name": "Generate PDF", "text": "Click the convert button to process the images locally and download your single PDF." }
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
