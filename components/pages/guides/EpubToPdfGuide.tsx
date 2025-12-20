import React from 'react';
import { BookOpen, CheckCircle, Shield, Zap, ArrowRight } from 'lucide-react';
import { Language } from '../../../utils/i18n';
import { SEO } from '../../SEO';
import { PageLayout } from '../../PageLayout';
import { MarkdownContent } from '../../MarkdownContent';

interface GuideProps {
    lang: Language;
    onNavigate: (view: any, path?: string) => void;
}

const guideContent = {
    fr: {
        seo: {
            title: "Convertir EPUB en PDF Gratuit | epub en pdf | pdfcanada.ca",
            desc: "Le guide ultime pour convertir vos EPUB en PDF au Canada. Apprenez à transformer vos ebooks en documents PDF professionnels pour l'impression ou le partage."
        },
        h1: "Le Guide Ultime : Convertir un EPUB en PDF",
        subtitle: "Transformez vos livres numériques en documents universels, sécurisés et prêts pour l'impression.",
        intro: "Vous cherchez comment convertir un fichier **EPUB en PDF**? Notre outil gratuit vous permet de transformer vos livres numériques en format PDF universel en quelques clics. Que vous soyez un étudiant devant imprimer un manuel numérique pour ses cours ou un professionnel ayant besoin de partager un rapport au format ebook avec des collègues, nous avons la solution. Contrairement aux services basés sur le cloud, notre **convertisseur EPUB vers PDF** traite tout本地ment, garantissant une confidentialité totale.",
        whyTitle: "Pourquoi convertir un ebook en PDF ?",
        whyReasons: [
            "Compatibilité universelle : Les PDF s'ouvrent sur tous les appareils sans application spéciale.",
            "Impression parfaite : Contrairement aux EPUB, les PDF conservent une mise en page fixe adaptée au papier (Lettre ou A4).",
            "Annotation facilitée : Les outils de commentaires sont plus robustes sur PDF pour le travail collaboratif.",
            "Conservation de la mise en page : Vos polices, images et tableaux resteront exactement là où vous les avez placés.",
            "Partage sécurisé : Idéal pour les soumissions académiques ou gouvernementales au Canada."
        ],
        howTitle: "Anatomie de la Conversion : Du Reflowable au Fixe",
        howDescription: "Le format EPUB est 'reflowable', ce qui signifie que le texte s'ajuste à la taille de l'écran. Le PDF est un format 'fixe'. Notre moteur de conversion effectue un rendu virtuel de votre livre pour créer une mise en page élégante et lisible sur n'importe quel support.",
        sections: [
            {
                id: "formatting",
                title: "Mise en page et polices",
                content: `Lors de la conversion de **EPUB à PDF**, nous utilisons des algorithmes avancés pour :
- **Optimiser les marges** : Pour une lecture confortable sur tablette ou papier.
- **Convertir les liens** : Vos tables des matières numériques deviennent des index PDF cliquables.
- **Gérer les images** : Les illustrations sont intégrées en haute résolution pour ne pas perdre en qualité lors d'un zoom.`
            },
            {
                id: "printing",
                title: "Optimisation pour l'impression",
                content: `Si vous prévoyez d'imprimer votre ebook, le passage par le format PDF est indispensable. Nos fichiers sont compatibles avec les standards d'impression canadiens, garantissant que vos têtes de chapitre et numéros de page ne bougeront pas.`
            }
        ],
        steps: [
            {
                title: "Sélectionnez votre fichier EPUB",
                desc: "Glissez-déposez votre fichier .epub. Nous supportons les fichiers jusqu'à 100 Mo pour vos manuscrits les plus volumineux."
            },
            {
                title: "Transformation locale",
                desc: "Notre technologie WebAssembly analyse le code HTML interne de l'EPUB et génère un PDF haute-fidélité directement dans votre navigateur."
            },
            {
                title: "Téléchargez votre PDF",
                desc: "Récupérez votre document instantanément. Il est prêt pour le partage, l'archivage ou l'impression."
            }
        ],
        securityTitle: "Confidentialité et Propriété Intellectuelle",
        securityText: "Vos œuvres littéraires sont précieuses. En utilisant pdfcanada.ca, votre livre ne quitte jamais votre appareil. C'est la solution la plus sûre pour les auteurs et chercheurs soucieux de la protection de leurs données personnelles au Canada.",
        faq: [
            {
                q: "Comment convertir un fichier EPUB en PDF gratuitement ?",
                a: "Il suffit d'utiliser notre outil en ligne. Le processus est 100% gratuit, sans filigrane et sans limite de pages. Tout le traitement se fait sur votre ordinateur."
            },
            {
                q: "Est-ce que la conversion conserve les images ?",
                a: "Oui, notre outil préserve toutes les images, illustrations et tableaux présents dans le fichier EPUB original en optimisant leur résolution pour le format PDF."
            },
            {
                q: "Puis-je convertir des livres avec DRM ?",
                a: "Non. Si votre livre est protégé par un verrou numérique (Digital Rights Management), notre outil ne pourra pas y accéder. Assurez-vous que votre fichier est libre de droits ou sans DRM."
            },
            {
                q: "Quelle taille de papier est utilisée ?",
                a: "Par défaut, notre convertisseur utilise le format Lettre (standard au Canada et aux États-Unis), ce qui est idéal pour l'impression locale."
            }
        ],
        ctaTitle: "Prêt à transformer votre livre ?",
        ctaButton: "Convertir en PDF maintenant",
        relatedTitle: "Outils de lecture recommandés",
        relatedTools: [
            { name: "PDF vers EPUB", desc: "Créez des ebooks à partir de documents", path: "/pdf-to-epub" },
            { name: "OCR PDF", desc: "Rendez vos scans consultables", path: "/ocr-pdf" },
            { name: "Supprimer des pages", desc: "Nettoyez vos documents PDF", path: "/delete-pdf-pages" }
        ]
    },
    en: {
        seo: {
            title: "Convert EPUB to PDF Free | Professional Online Converter | pdfcanada.ca",
            desc: "Expert guide on converting EPUB to PDF for owners of Kindle, Kobo, and reMarkable. High-fidelity rendering with total privacy and no uploads."
        },
        h1: "The Definitive Guide: Converting EPUB to PDF",
        subtitle: "Transform your digital library into a stable, printable, and universally accessible format.",
        intro: "Need to convert an **EPUB to PDF** for professional use or printing? While EPUB is fantastic for e-readers, the PDF format remains king for formal submissions, high-quality printing, and corporate documentation. Whether you are a student preparing materials for a Canadian university or a self-published author proofreading your latest manuscript, our **free online EPUB to PDF converter** provides a professional-grade result without the security risks of cloud-based competitors. We process everything locally in your browser memory.",
        whyTitle: "The Case for PDF over EPUB",
        whyReasons: [
            "Fixed Layout: Ensure every table, image, and page number stays exactly where you intended (ideal for textbooks).",
            "Universal Printing: PDFs are natively supported by every print shop and local printer across Canada.",
            "Cross-Platform Stability: A PDF looks the same on an iPhone, a Windows PC, and a Linux workstation.",
            "Advanced Annotation: Use industry-standard tools to sign, mark up, and highlight documents.",
            "Accessibility (WCAG): Properly structured PDFs are easier to optimize for screen readers in professional settings."
        ],
        howTitle: "The Science of High-Fidelity Conversion",
        howDescription: "EPUB files are essentially simplified websites (HTML/CSS) zipped into a container. To convert **EPUB to PDF** accurately, our engine performs a full layout calculation, determines appropriate page breaks, and embeds fonts to ensure the resulting document is a stable snapshot of your ebook.",
        sections: [
            {
                id: "layout-logic",
                title: "Preserving Book Structure",
                content: `Our converter doesn't just 'scrape' text; it respects the logic of your book:
- **Table of Contents**: Internal links are preserved, creating a clickable navigation sidebar in your PDF viewer.
- **Font Substitution**: If an EPUB has un-embedded fonts, we use high-quality open-source alternatives to maintain readability.
- **Chapter Breaks**: Every new chapter starts on a fresh PDF page, maintaining the rhythm of the original book.`
            },
            {
                id: "professional-use",
                title: "Legal and Academic Submissions",
                content: `Many institutional portals in Canada do not accept EPUB files due to their variable page counts. Converting to PDF provides a fixed reference (e.g., 'See page 42') that is essential for citations, legal filings, and government forms.`
            },
            {
                id: "media-handling",
                title: "Images, Tables, and Math",
                content: `Complex EPUBs containing SVG diagrams or mathematical formulas (MathML) require a sophisticated engine. Our local-first approach uses modern browser rendering to ensure these elements remain sharp and accurate in the final PDF export.`
            }
        ],
        steps: [
            {
                title: "Select your EPUB file",
                desc: "Choose your .epub file. We support both EPUB 2 and EPUB 3 standards, including those with complex embedded media."
            },
            {
                title: "Privacy-Protected Rendering",
                desc: "Our WebAssembly engine processes the conversion in a sandboxed environment on your device. Your intellectual property never touches our servers."
            },
            {
                title: "Finalize and Download",
                desc: "Click download to save your new PDF. It is optimized for standard 8.5x11 inch paper by default."
            }
        ],
        securityTitle: "Secure Local Processing (No Uploads)",
        securityText: "At pdfcanada.ca, we believe in 'Data Sovereignty'. Most online converters sell your reading data or keep copies of your manuscripts. Our tool runs strictly in your computer's RAM. When you close the tab, your file is gone. This is the **most secure way to convert EPUB to PDF** in Canada.",
        faq: [
            {
                q: "Why do some images look blurry after conversion?",
                a: "If the original EPUB contains low-resolution images optimized for small screens, they may appear soft when scaled to a full PDF page. Our tool attempts to maximize sharpness during the rendering phase."
            },
            {
                q: "Will my bookmarks and highlights be converted?",
                a: "Standard internal EPUB bookmarks (Table of Contents) are converted to PDF Bookmarks. However, personal highlights made within a specific e-reader app (like iBooks or Kindle) are not part of the file itself and cannot be converted."
            },
            {
                q: "Is there a limit on file size?",
                a: "We support files up to 100MB. Larger files may take a few more seconds to process as they require more of your device's CPU and RAM."
            },
            {
                q: "Does it work with reMarkable or Kindle Scribe?",
                a: "Yes! Converting EPUB to PDF is the primary way to get a stable layout for writing notes or 'inking' on devices like the reMarkable paper tablet."
            }
        ],
        ctaTitle: "Upgrade Your Library Today",
        ctaButton: "Convert EPUB to PDF",
        relatedTitle: "Complementary Document Tools",
        relatedTools: [
            { name: "PDF to EPUB", desc: "Turn fixed documents into reflowable ebooks", path: "/pdf-to-epub" },
            { name: "OCR PDF", desc: "Extract text from image-based scans", path: "/ocr-pdf" },
            { name: "Organize PDF", desc: "Rearrange your book's page order", path: "/organize-pdf" }
        ]
    }
};

export const EpubToPdfGuide: React.FC<GuideProps> = ({ lang, onNavigate }) => {
    const t = guideContent[lang];

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": t.h1,
            "description": t.seo.desc,
            "step": t.steps.map((step, i) => ({
                "@type": "HowToStep",
                "position": i + 1,
                "name": step.title,
                "text": step.desc
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": t.faq.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a
                }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://pdfcanada.ca/" },
                { "@type": "ListItem", "position": 2, "name": t.h1, "item": "https://pdfcanada.ca/guides/convertir-epub-en-pdf" }
            ]
        }
    ];

    return (
        <>
            <SEO
                title={t.seo.title}
                description={t.seo.desc}
                canonicalPath="/guides/convertir-epub-en-pdf"
                lang={lang}
                schema={schema}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Guides', path: '/guides/ultimate-pdf-guide' },
                    { name: 'EPUB to PDF', path: '/guides/convertir-epub-en-pdf' }
                ]}
            />
            <PageLayout
                title={t.h1}
                subtitle={t.subtitle}
                icon={<BookOpen size={32} />}
                breadcrumbs={[
                    { name: 'Home', onClick: () => onNavigate('HOME') },
                    { name: 'Guides', onClick: () => onNavigate('GUIDE_ULTIMATE') },
                    { name: 'EPUB to PDF Guide', onClick: () => { } }
                ]}
            >
                <div className="space-y-12 text-gray-700 dark:text-gray-300">
                    {/* Intro */}
                    <MarkdownContent content={t.intro} className="text-lg leading-relaxed" />

                    {/* Why Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.whyTitle}</h2>
                        <ul className="space-y-4 mb-8">
                            {t.whyReasons.map((reason, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-canada-red shrink-0 mt-0.5" size={20} />
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* New Detailed Sections */}
                    <div className="grid md:grid-cols-2 gap-12 border-t border-gray-100 dark:border-gray-800 pt-12">
                        {t.sections.map((section) => (
                            <div key={section.id} className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                                <MarkdownContent content={section.content} className="text-gray-600 dark:text-gray-400" />
                            </div>
                        ))}
                    </div>

                    {/* How To Steps */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.howTitle}</h2>
                        <div className="space-y-4">
                            {t.steps.map((step, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4">
                                    <div className="bg-canada-red text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-lg">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{step.title}</h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Security Section */}
                    <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                            <Shield className="text-green-600 shrink-0" size={28} />
                            <div>
                                <h2 className="text-xl font-bold text-green-900 dark:text-green-300 mb-2">{t.securityTitle}</h2>
                                <MarkdownContent content={t.securityText} className="text-green-800 dark:text-green-400" />
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="bg-canada-red/5 dark:bg-canada-red/10 border border-canada-red/20 p-8 rounded-xl text-center">
                        <Zap className="text-canada-red mx-auto mb-4" size={40} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.ctaTitle}</h2>
                        <button
                            onClick={() => onNavigate('TOOL_PAGE', '/epub-to-pdf')}
                            className="inline-flex items-center gap-2 bg-canada-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2"
                        >
                            {t.ctaButton} <ArrowRight size={20} />
                        </button>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQ</h2>
                        <div className="space-y-4">
                            {t.faq.map((item, i) => (
                                <details key={i} className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <summary className="p-4 font-bold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center hover:text-canada-red transition-colors">
                                        {item.q}
                                        <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <MarkdownContent content={item.a} />
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Related Tools */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.relatedTitle}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {t.relatedTools.map((tool, i) => (
                                <button
                                    key={i}
                                    onClick={() => onNavigate('TOOL_PAGE', tool.path)}
                                    className="text-left p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-canada-red transition-colors focus:outline-none focus:ring-2 focus:ring-canada-red"
                                >
                                    <h3 className="font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{tool.desc}</p>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </PageLayout>
        </>
    );
};
