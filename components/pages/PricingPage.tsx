import React from 'react';
import { Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { translations, Language } from '../../utils/i18n';
import { SEO } from '../SEO';

interface PageProps {
    lang: Language;
}

export const PricingPage: React.FC<PageProps> = ({ lang }) => {
    const t = translations[lang];
    const pricingSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "pdfcanada.ca PDF Tools",
        "description": t.seo.pricingDesc,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CAD",
            "availability": "https://schema.org/InStock"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": t.pricingPage.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };
    return (
        <>
            <SEO title={t.seo.pricingTitle} description={t.seo.pricingDesc} canonicalPath="/pricing" ogType="product" schema={[pricingSchema, faqSchema]} />
            <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.pricingTitle}</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">{t.pricingSubtitle}</p>
                    <div className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400 prose dark:prose-invert">
                        <p>{t.pricingPage.content}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Free Tier */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-800 hover:border-canada-red/30 transition-all">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.freePlan}</h3>
                        <div className="text-4xl font-bold text-canada-red mb-6">{t.freeCost}</div>
                        <ul className="space-y-4">
                            {[t.freeFeature1, t.freeFeature2, t.freeFeature3, t.freeFeature4].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-8 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                            Start Now
                        </button>
                    </div>

                    {/* Timbits Tip Tier - Featured */}
                    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 rounded-3xl p-8 shadow-xl border-2 border-amber-400 dark:border-amber-600 relative overflow-hidden transform md:-translate-y-4 md:scale-105">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400"></div>
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Sparkles size={12} /> TIP JAR
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🍁</span>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t.timbitsPlan}</h3>
                        </div>
                        <div className="text-4xl font-bold text-amber-600 dark:text-amber-500 mb-1">{t.timbitsCost}</div>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mb-6 font-medium">{t.timbitsDesc}</p>
                        <ul className="space-y-3">
                            {[t.timbitsFeature1, t.timbitsFeature2, t.timbitsFeature3, t.timbitsFeature4].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                                        <Heart className="text-amber-500 shrink-0" size={12} fill="currentColor" />
                                    </div>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <a
                            href="https://buy.stripe.com/8x228t4yIdCx2mE2ic6Zy04"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full mt-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3.5 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            <span className="text-lg">🪙</span> {t.timbitsButton}
                        </a>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70 text-center mt-3">One-time payment • No subscription</p>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-900 rounded-3xl p-8 shadow-lg border-2 border-canada-red/20 relative overflow-hidden">
                        <div className="absolute top-4 right-4 bg-canada-red text-white text-xs font-bold px-3 py-1 rounded-full">MOST POLITE</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.enterprisePlan}</h3>
                        <div className="text-4xl font-bold text-canada-red mb-6">{t.enterpriseCost}</div>
                        <ul className="space-y-4">
                            {[t.enterpriseFeature1, t.enterpriseFeature2, t.enterpriseFeature3].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                    <CheckCircle2 className="text-canada-red shrink-0" size={20} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-8 bg-canada-red text-white py-3 rounded-xl font-bold hover:bg-canada-darkRed transition-all focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                            Contact Sales (Jk it's free)
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">Common Questions</h2>
                    <div className="space-y-6">
                        {t.pricingPage.faq.map((item, i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">{item.question}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
