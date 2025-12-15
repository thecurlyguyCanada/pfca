import React from 'react';
import { translations, Language } from '../utils/i18n';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (view: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, onNavigate }) => {
  const t = translations[lang];

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md sticky top-0 z-50 border-t-4 border-t-canada-red border-b border-gray-100 shadow-sm">
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => onNavigate('HOME')}
      >
        <span className="text-xl font-bold text-gray-800 tracking-tight">pdfcanada<span className="text-canada-red">.ca</span></span>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <button onClick={() => onNavigate('HOW_TO')} className="hover:text-canada-red transition-colors">{t.navHowTo}</button>
        <button onClick={() => onNavigate('SUPPORT')} className="hover:text-canada-red transition-colors">{t.navSupport}</button>
        <button onClick={() => onNavigate('PRICING')} className="hover:text-canada-red transition-colors">{t.navPricing}</button>
      </nav>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
          className="text-xs font-bold bg-gray-50 border border-gray-200 hover:border-canada-red/30 hover:text-canada-red text-gray-600 px-3 py-1.5 rounded transition-all"
        >
          {lang === 'en' ? 'FR' : 'EN'}
        </button>
      </div>
    </header>
  );
};