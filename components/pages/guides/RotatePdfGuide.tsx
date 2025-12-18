import React from 'react';
import { RotateCw, CheckCircle, Shield, Zap, ArrowRight, Globe, Lock, Clock, Monitor, RefreshCcw } from 'lucide-react';
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
            title: "Rotate PDF Online Free | Flip & Save PDF Orientation Permanently | pdfcanada.ca",
            desc: "Rotate PDF pages online for free. Learn how to rotate and save PDF orientation permanently. Fix upside down or sideways scans instantly and securely."
        },
        h1: "How to Rotate and Save PDF Orientation Online for Free",
        subtitle: "The simple guide to fixing incorrectly oriented documents permanently.",

        intro: "We've all been there: you open an important scan and it's sideways. Or worse, the entire document is upside down. If you're looking to **rotate PDF online free**, you've come to the right place. Unlike a standard PDF viewer where rotation is only temporary, our tool updates the file structure so the orientation is fixed permanently for everyone who opens it.",

        sections: [
            {
                id: "why-rotate",
                title: "Why Rotation Matters",
                content: `Incorrect orientation isn't just a minor annoyance; it can be a professional liability. 
- **Readability**: Sideways documents are impossible to read on mobile devices without constant zooming and panning.
- **Professionalism**: Sending a sideways contract to a client shows a lack of attention to detail.
- **Printing**: Saves paper and ink by ensuring the document matches the printer's output settings.

Using a **permanent PDF rotation tool** ensures your document looks exactly as intended, every time.`
            },
            {
                id: "how-to",
                title: "3 Easy Steps to Fix PDF Orientation",
                content: `1. **Select Your PDF**: Upload the file that needs fixing.
2. **Rotate Individual Pages**: Click the 'Rotate' button on specific pages or use 'Rotate All' to fix the whole document.
3. **Save Changes**: Click 'Process PDF' and download your perfectly aligned document.

This is the most **secure PDF rotator** because the processing happens entirely on your machine.`
            }
        ],

        faq: [
            {
                q: "Will rotating the PDF reduce the quality?",
                a: "No. Our tool only updates the orientation metadata within the PDF. The quality of your text and images remains identical."
            },
            {
                q: "Can I rotate just one page in a PDF?",
                a: "Yes! You can select specific pages to rotate 90°, 180°, or 270° without affecting the rest of the file."
            }
        ],

        ctaTitle: "Ready to Fix Your PDF?",
        ctaButton: "Rotate PDF Now",
        ctaSubtext: "100% Free. No Watermarks."
    },
    fr: {
        seo: {
            title: "Pivoter un PDF en Ligne Gratuit | Redresser l'Orientation PDF | pdfcanada.ca",
            desc: "Faites pivoter les pages PDF en ligne gratuitement. Apprenez à faire pivoter et à enregistrer l'orientation PDF de manière permanente."
        },
        h1: "Comment faire pivoter et enregistrer l'orientation d'un PDF en ligne gratuitement",
        subtitle: "Le guide simple pour redresser vos documents mal orientés de façon permanente.",

        intro: "Nous y avons tous été confrontés : vous ouvrez un scan important et il est de côté. Si vous cherchez à **pivoter un PDF en ligne**, vous êtes au bon endroit.",

        sections: [
            {
                id: "how-to",
                title: "3 étapes faciles pour redresser un PDF",
                content: `1. **Sélectionnez**\n2. **Pivotez**\n3. **Enregistrez**`
            }
        ],

        faq: [
            {
                q: "Est-ce que ça réduit la qualité ?",
                a: "Non, la qualité reste identique."
            }
        ],

        ctaTitle: "Prêt à redresser votre PDF ?",
        ctaButton: "Pivoter le PDF",
        ctaSubtext: "100% Gratuit."
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
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        {t.intro}
                    </p>

                    {t.sections && t.sections.map((section) => (
                        <section key={section.id}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                {section.content}
                            </div>
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
