import React from 'react';

interface PageLayoutProps {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    breadcrumbs?: { name: string; onClick: () => void }[];
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, icon, children, breadcrumbs }) => (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
        {breadcrumbs && (
            <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {breadcrumbs.map((crumb, i) => (
                        <li key={i} className="inline-flex items-center">
                            {i > 0 && <span className="mx-2 text-gray-300">/</span>}
                            <button
                                onClick={crumb.onClick}
                                className={`hover:text-canada-red transition-colors ${i === breadcrumbs.length - 1 ? 'font-bold text-gray-900 dark:text-gray-200' : ''}`}
                            >
                                {crumb.name}
                            </button>
                        </li>
                    ))}
                </ol>
            </nav>
        )}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-900/20 text-canada-red rounded-2xl mb-6 shadow-sm">
                {icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h1>
            {subtitle && <p className="text-xl text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700">
            {children}
        </div>
    </div>
);
