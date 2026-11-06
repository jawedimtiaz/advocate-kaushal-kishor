import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../data/translations';

interface FloatingLanguageSwitcherProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  languageLabel: string;
  switcherEnActive: string;
  switcherEnInactive: string;
  switcherTeActive: string;
  switcherTeInactive: string;
}

export const FloatingLanguageSwitcher: React.FC<FloatingLanguageSwitcherProps> = ({
  language,
  onLanguageChange,
  languageLabel,
  switcherEnActive,
  switcherEnInactive,
  switcherTeActive,
  switcherTeInactive,
}) => {
  return (
    <aside
      aria-label={languageLabel}
      className="no-print fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-30 inline-flex items-center gap-1 p-1 bg-[#FBFBF9]/95 backdrop-blur-md border border-[#CBD5E1] hover:border-[#B8964C]/70 shadow-md hover:shadow-lg rounded-lg transition-all duration-200"
    >
      <div className="pl-1.5 pr-1 text-[#785C22] shrink-0" aria-hidden="true">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <div role="group" aria-label={languageLabel} className="inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => onLanguageChange('en')}
          aria-pressed={language === 'en'}
          aria-label={language === 'en' ? switcherEnActive : switcherEnInactive}
          lang="en"
          className={`min-h-[36px] min-w-[36px] px-2.5 py-1 text-xs font-semibold rounded transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#B8964C] ${
            language === 'en'
              ? 'bg-[#0B192C] text-white shadow-xs'
              : 'text-[#334155] hover:text-[#0B192C] hover:bg-[#F1F5F9]'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => onLanguageChange('te')}
          aria-pressed={language === 'te'}
          aria-label={language === 'te' ? switcherTeActive : switcherTeInactive}
          lang="te"
          className={`min-h-[36px] min-w-[36px] px-2.5 py-1 text-xs font-semibold rounded transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#B8964C] ${
            language === 'te'
              ? 'bg-[#0B192C] text-white shadow-xs'
              : 'text-[#334155] hover:text-[#0B192C] hover:bg-[#F1F5F9]'
          }`}
        >
          తెలుగు
        </button>
      </div>
    </aside>
  );
};
