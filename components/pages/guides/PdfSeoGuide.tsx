import React from 'react';
import { Search, Info, CheckCircle2, Zap, ArrowRight, Globe, Lock, Shield, Eye, BarChart, FileText } from 'lucide-react';
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
            title: "How to Optimize PDFs for SEO | PDF Metadata & Search Guide | pdfcanada.ca",
            desc: "The definitive guide to PDF SEO. Learn how to rank your PDFs in Google with proper metadata, file naming, and mobile optimization tricks."
        },
        h1: "How to Optimize Your PDFs for Search Engines",
        subtitle: "Don't let your documents stay hidden. Learn the secrets of indexing and ranking PDFs like a pro.",

        intro: "Did you know that Google treats PDFs as regular web pages? If you have valuable content trapped in a document, you're missing out on organic traffic. By following **PDF SEO best practices**, you can ensure your reports, whitepapers, and guides rank alongside (or even above) your website pages. This guide explores the technical and structural tweaks needed to win at **PDF search engine optimization** in 2026.",

        sections: [
            {
                id: "metadata",
                title: "1. The Power of PDF Metadata",
                content: `Search engines use a PDF's internal metadata just like HTML tags. If these are blank, you're invisible.
- **Title Tag**: This is the most important element. Ensure your PDF title is descriptive and contains your primary keyword.
- **Author**: Set this to your brand or personal name to build E-E-A-T.
- **Subject/Description**: Essentially the meta description for your document.
- **Keywords**: While less important for Google, they help internal search engines in larger organizations.`
            },
            {
                id: "structure",
                title: "2. Text Quality & Readability",
                content: `Google cannot rank what it cannot read. If your PDF is a simple image of text, it holds zero SEO value.
- **OCR is Essential**: Always use an **OCR PDF tool** to ensure every character is machine-readable.
- **Heading Tags**: Use hierarchical headings (H1, H2, H3). While PDF headings aren't 1:1 with HTML, logical structure helps Google understand topical relevance.
- **Internal Linking**: Link your PDF back to your website, and link from your website to your PDF. This helps bots discover the document and passes "link juice".`
            },
            {
                id: "technical",
                title: "3. Technical Performance & Mobile",
                content: `User experience is a ranking factor, even for files.
- **File Size Management**: Large PDFs take forever to load on mobile. Optimize images and remove unnecessary bloat to keep the file under 5MB where possible.
- **Mobile Friendly Layout**: Use a standard portrait orientation and legible font sizes (at least 12pt) so users don't have to pinch and zoom constantly.
- **Descriptive File Names**: Use hyphens and lowercase letters in your filename (e.g., \`2026-seo-guide.pdf\` instead of \`IMG_9921_final_v2.pdf\`).`
            }
        ],

        faq: [
            {
                q: "Can Google index password protected PDFs?",
                a: "No. If a document is locked, search engine bots cannot crawl the content. Ensure your public PDFs are password-free."
            },
            {
                q: "Do images inside PDFs need alt-text for SEO?",
                a: "Yes! Just like web pages, search engines use alt-text in PDFs to understand the context of the visual content."
            },
            {
                q: "What is the best file size for PDF SEO?",
                a: "Ideally under 2-3MB. Faster loading times lead to better user retention and higher rankings."
            }
        ],

        ctaTitle: "Ready to optimize your metadata?",
        ctaButton: "Clean Your PDF Pages",
        ctaSubtext: "Removing extra pages helps keep your document focused and fast."
    },
    fr: {
        seo: {
            title: "Comment optimiser les PDF pour le SEO | Guide PDF Canada | pdfcanada.ca",
            desc: "Le guide définitif du SEO pour PDF. Apprenez à classer vos PDF dans Google avec des métadonnées appropriées et un nommage de fichier optimal."
        },
        h1: "Comment optimiser vos PDF pour les moteurs de recherche",
        subtitle: "Ne laissez pas vos documents cachés. Apprenez les secrets de l'indexation des PDF.",
        intro: "Saviez-vous que Google traite les PDF comme des pages Web ordinaires? Si vous avez du contenu précieux piégé dans un document, vous manquez du trafic organique. En suivant les **meilleures pratiques SEO pour PDF**, vous pouvez garantir que vos rapports, livres blancs et guides se classent aux côtés (ou même au-dessus) de vos pages Web.",
        sections: [
            {
                id: "metadata",
                title: "1. La puissance des métadonnées PDF",
                content: `Les moteurs de recherche utilisent les métadonnées internes.
- **Titre** : C'est l'élément le plus important. Utilisez vos mots-clés principaux.
- **Auteur** : Indiquez votre marque pour renforcer l'autorité.
- **Sujet** : Agit comme une méta-description pour votre document.`
            },
            {
                id: "tech-fr",
                title: "2. Structure et Lisibilité",
                content: `Google ne peut pas classer ce qu'il ne peut pas lire. 
- **L'OCR est essentiel** : Utilisez notre **outil OCR PDF** pour rendre le texte scanné lisible par les machines.
- **Hiérarchie** : Utilisez des titres logiques pour aider les algorithmes à comprendre le sujet traité.`
            },
            {
                id: "mobile-fr",
                title: "3. Performance et Mobile",
                content: `L'expérience utilisateur est un facteur de classement.
- **Taille du fichier** : Un PDF trop lourd est lent sur mobile. Visez moins de 5 Mo.
- **Nom de fichier** : Utilisez des tirets et des minuscules (ex: \`guide-seo-2026.pdf\`).`
            }
        ],
        faq: [
            {
                q: "Google peut-il indexer les PDF protégés par mot de passe?",
                a: "Non. Si un document est verrouillé, les robots ne peuvent pas explorer le contenu. Assurez-vous que vos PDF publics sont déverrouillés."
            },
            {
                q: "Le texte alternatif (Alt-text) fonctionne-t-il dans les PDF?",
                a: "Oui, tout comme sur le Web, les moteurs de recherche utilisent le texte alternatif des images pour comprendre le contexte visuel."
            }
        ],
        ctaTitle: "Prêt à optimiser?",
        ctaButton: "Nettoyer les pages PDF",
        ctaSubtext: "La suppression des pages inutiles aide à garder votre document rapide et efficace."
    }
};

export const PdfSeoGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang] || guideContent.en;

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/pdf-seo-guide"
                lang={lang}
                faq={t.faq}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Guides', path: '/guides/ultimate-pdf-guide' },
                    { name: 'PDF SEO', path: '/guides/pdf-seo-guide' }
                ]}
            />
            <PageLayout title={t.h1} subtitle={t.subtitle} icon={<BarChart size={32} />}>
                <div className="max-w-4xl mx-auto space-y-12">
                    <MarkdownContent content={t.intro} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 border-l-4 border-canada-red pl-6 py-2" />

                    {/* Content */}
                    <div className="space-y-16">
                        {t.sections.map((section: any, idx: number) => (
                            <section key={section.id} id={section.id}>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="text-canada-red font-black text-4xl opacity-10 leading-none">{idx + 1}</span>
                                    {section.title}
                                </h2>
                                <div className="pl-12">
                                    <MarkdownContent content={section.content} />
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Search className="text-canada-red" /> Deep Dive: FAQ
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {t.faq.map((item: any, i: number) => (
                                <div key={i} className="space-y-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white">{item.q}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center py-12 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-2xl font-bold mb-2">{t.ctaTitle}</h3>
                        <p className="text-gray-500 mb-8">{t.ctaSubtext}</p>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/delete-pdf-pages')}
                            className="bg-canada-red hover:bg-canada-darkRed text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all hover:scale-105 active:scale-95"
                        >
                            {t.ctaButton}
                        </button>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};
