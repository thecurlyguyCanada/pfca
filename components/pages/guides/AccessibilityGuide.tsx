import React from 'react';
import { ShieldCheck, Info, CheckCircle2, Zap, ArrowRight, Globe, Lock, Shield, Eye, Scale, FileText } from 'lucide-react';
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
            title: "PDF Accessibility Guide Canada | AODA & WCAG Compliance | pdfcanada.ca",
            desc: "Learn how to make PDFs accessible for AODA and WCAG 2.1 compliance in Canada. A deep dive into tags, alt-text, and read order for businesses and non-profits."
        },
        h1: "The Canadian Guide to PDF Accessibility (AODA & WCAG)",
        subtitle: "Ensuring your digital documents are inclusive, compliant, and accessible to everyone across Canada.",

        intro: "In Canada, accessibility isn't just a best practice—it's the law. Whether you're a small business in Ontario complying with the **AODA (Accessibility for Ontarians with Disabilities Act)** or a federal agency following **WCAG 2.1 standards**, making your PDFs accessible is critical. An accessible PDF ensures that people using screen readers, braille displays, or other assistive technologies can consume your content seamlessly.",

        sections: [
            {
                id: "what-is-accessible-pdf",
                title: "What is an Accessible PDF?",
                content: `An **accessible PDF** is a document that is structured so it can be read by assistive technology. Unlike a standard PDF which might just be a "printed image" of text, an accessible PDF includes:
- **Tags & Structure**: A hidden hierarchical map (H1, H2, Paragraphs, Lists) that tells screen readers the order of content.
- **Alternative Text (Alt-Text)**: Descriptions for images so visually impaired users understand the visual context.
- **Readable Text**: Actual digital text (not scanned images) that can be searched and read aloud.
- **Tab Order**: A logical navigation path for keyboard-only users.`
            },
            {
                id: "compliance-canada",
                title: "Understanding AODA and Federal Compliance",
                content: `If you operate in Canada, you likely fall under one of several regulatory frameworks:
1. **AODA (Ontario)**: Any organization with 50+ employees must ensure their public-facing web content (including PDFs) meets WCAG 2.0 Level AA standards.
2. **AMA (Manitoba)** and **Nova Scotia Accessibility Act**: Similar requirements for inclusive digital content.
3. **Federal Government (ACA)**: The Accessible Canada Act mandates that federal organizations provide barrier-free digital services.

**Pro-tip**: Don't wait for an audit. Transitioning your document workflow to be "Accessibility-First" saves time and legal risk.`
            },
            {
                id: "how-to-fix",
                title: "How to Make a PDF Accessible",
                content: `Creating an accessible document starts with the source, but you can remediate existing PDFs using these steps:
1. **Run OCR**: If your PDF is a scan, use our **OCR PDF tool** to convert it into real, selectable text.
2. **Set a Title**: Ensure the document has a metadata title so screen readers announce it correctly.
3. **Tag Headings**: Use proper levels (H1 for title, H2 for sections).
4. **Add Alt-Text**: Every meaningful image needs a short, descriptive text alternative.
5. **Check Contrast**: Ensure text is legible against the background color.`
            }
        ],

        faq: [
            {
                q: "Does AODA apply to old PDFs?",
                a: "In Ontario, AODA generally applies to content posted after January 1, 2012. However, for federal or larger provincial contracts, all active documents are often expected to be compliant."
            },
            {
                q: "What is the difference between WCAG 2.0 and 2.1?",
                a: "WCAG 2.1 builds on 2.0 by adding more criteria for mobile devices, low vision, and cognitive disabilities. Most Canadian regulations are moving towards 2.1 AA."
            },
            {
                q: "Can I use an automated tool to fix accessibility?",
                a: "Automated tools (checkers) are great for finding errors, but human review is necessary for things like 'meaningful alt-text' and 'logical read order'."
            }
        ],

        ctaTitle: "Need to start with OCR?",
        ctaButton: "Make PDF Searchable",
        ctaSubtext: "The first step to accessibility is turning scans into text."
    },
    fr: {
        seo: {
            title: "Guide d'accessibilité PDF Canada | Conformité WCAG | pdfcanada.ca",
            desc: "Apprenez à rendre vos PDF accessibles pour la conformité WCAG 2.1 au Canada. Guide approfondi sur les balises, le texte alternatif et l'ordre de lecture."
        },
        h1: "Le Guide Canadien de l'Accessibilité PDF (WCAG)",
        subtitle: "Garantir que vos documents numériques sont inclusifs et conformes aux normes d'accessibilité partout au Canada.",

        intro: "L'accessibilité numérique est essentielle pour l'inclusion au Canada. Que vous soyez une entreprise ou une organisation publique, rendre vos PDF accessibles permet aux personnes utilisant des technologies d'assistance de lire votre contenu.",

        sections: [
            {
                id: "what-is-accessible-pdf",
                title: "Qu'est-ce qu'un PDF accessible?",
                content: `Un PDF accessible est structuré de manière à être lu par des lecteurs d'écran. Cela inclut des balises, du texte alternatif et un ordre de lecture logique.`
            }
        ],

        faq: [
            {
                q: "Est-ce une obligation légale?",
                a: "Oui, dans de nombreuses provinces comme l'Ontario (LAPHO/AODA), l'accessibilité Web est obligatoire pour les organisations de plus de 50 employés."
            }
        ],

        ctaTitle: "Besoin de commencer par l'OCR?",
        ctaButton: "Rendre le PDF consultable",
        ctaSubtext: "La première étape est de convertir les scans en texte."
    }
};

export const AccessibilityGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/pdf-accessibility-canada"
                lang={lang}
                faq={t.faq}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Guides', path: '/guides/ultimate-pdf-guide' },
                    { name: 'Accessibility', path: '/guides/pdf-accessibility-canada' }
                ]}
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<Eye size={32} />}>
                <div className="max-w-4xl mx-auto space-y-12">
                    <MarkdownContent content={t.intro} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-6 py-2" />

                    {/* Content */}
                    <div className="space-y-16">
                        {t.sections.map((section: any, idx: number) => (
                            <section key={section.id} id={section.id}>
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">{idx + 1}</span>
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="prose dark:prose-invert max-w-none ml-11">
                                    <MarkdownContent content={section.content} />
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Educational Inset */}
                    <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-xl flex flex-col md:flex-row gap-8 items-center">
                        <Scale size={64} className="text-blue-400 shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold mb-3">Is your business ready?</h3>
                            <p className="opacity-80 leading-relaxed">As of 2021, most public websites in Ontario are required to be compliant with WCAG 2.0 Level AA. Failure to comply can result in administrative penalties. Accessible PDFs are a key part of this compliance.</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-[2rem]">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Info className="text-blue-500" /> FAQ
                        </h3>
                        <div className="space-y-6">
                            {t.faq.map((item: any, i: number) => (
                                <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                                    <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                                    <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center py-12 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-2xl font-bold mb-2">{t.ctaTitle}</h3>
                        <p className="text-gray-500 mb-8">{t.ctaSubtext}</p>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/ocr-pdf')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2 mx-auto"
                        >
                            {t.ctaButton} <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};
