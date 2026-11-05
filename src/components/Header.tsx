import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, TranslationContent } from '../data/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  content: TranslationContent['nav'];
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  content,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#professional-info', label: content.professional },
    { href: '#enrolment-info', label: content.enrolment },
    { href: '#areas-of-practice', label: content.practice },
    { href: '#contact-info', label: content.contact },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-sm border-b border-[#E2E8F0] no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg sm:text-2xl font-semibold tracking-tight text-[#0B192C] whitespace-nowrap shrink-0 truncate max-w-[190px] sm:max-w-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
        >
          {content.brandName}
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label={content.primaryNavAriaLabel}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#334155]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1.5 text-[#334155] hover:text-[#0B192C] border-b-2 border-transparent hover:border-[#B8964C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Bilingual Segmented Language Control + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label={content.languageLabel}
            className="inline-flex items-center p-0.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-md"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              lang="en"
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 min-h-[36px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] ${
                language === 'en'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#334155] hover:text-[#0B192C]'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('te')}
              aria-pressed={language === 'te'}
              lang="te"
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 min-h-[36px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] ${
                language === 'te'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#334155] hover:text-[#0B192C]'
              }`}
            >
              తెలుగు
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? content.mobileMenuClose : content.mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#CBD5E1] text-[#0B192C] hover:bg-[#F1F5F9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label={content.mobileNavAriaLabel}
          className="md:hidden border-t border-[#E2E8F0] bg-[#FBFBF9] px-4 py-3 space-y-1 shadow-xs"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="block py-3 px-3 text-sm font-medium text-[#0B192C] hover:bg-[#F1F5F9] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#B8964C]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
