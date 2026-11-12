import React, { useEffect, useState } from 'react';
import { Check, Menu, Printer, Share2, X } from 'lucide-react';
import { Language, TranslationContent } from '../data/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  content: TranslationContent['nav'];
  onPrint?: () => void;
  printLabel?: string;
  isPrinting?: boolean;
}

const TOUCH_OVERLAY_CLASS =
  "relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[48px] after:min-h-[48px] after:w-full after:h-full after:rounded-md";

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  content,
  onPrint,
  printLabel = 'Print Information Sheet',
  isPrinting = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = window.location.href;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback failed silently
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: content.shareTitle || document.title,
      text: `${content.brandName} (${content.brandQualification}) — Official Chambers Profile`,
      url: window.location.href,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-sm border-b border-[#E2E8F0] no-print">
      {/* Screen Reader Live Region for Share Feedback */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? content.shareSuccess : ''}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Single text element wordmark with compact advocate emblem */}
        <a
          href="#top"
          aria-label={`${content.brandName} - ${content.brandQualification}`}
          className="inline-flex items-center gap-2.5 min-h-[48px] font-display text-lg sm:text-2xl font-semibold tracking-tight text-[#0B192C] whitespace-nowrap shrink-0 truncate max-w-[185px] sm:max-w-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
        >
          <img
            src="/advocate-logo.png"
            alt=""
            aria-hidden="true"
            className="w-7 h-7 object-contain shrink-0 rounded-full"
          />
          <span className="truncate">{content.brandName}</span>
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
              className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] px-3 -mx-1 text-[#334155] hover:text-[#0B192C] border-b-2 border-transparent hover:border-[#B8964C] transition-colors whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[48px] after:min-h-[48px] after:w-full after:h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Bilingual Segmented Language Control, Share Action, Print Action & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label={content.languageLabel}
            className="inline-flex items-center gap-1 p-1 bg-[#F1F5F9] border border-[#CBD5E1] rounded-md"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              aria-label={
                language === 'en'
                  ? content.languageSwitcherEnActive
                  : content.languageSwitcherEnInactive
              }
              lang="en"
              className={`${TOUCH_OVERLAY_CLASS} min-h-[48px] min-w-[48px] px-3.5 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] ${
                language === 'en'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#334155] hover:text-[#0B192C] hover:bg-white/60'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('te')}
              aria-pressed={language === 'te'}
              aria-label={
                language === 'te'
                  ? content.languageSwitcherTeActive
                  : content.languageSwitcherTeInactive
              }
              lang="te"
              className={`${TOUCH_OVERLAY_CLASS} min-h-[48px] min-w-[48px] px-3.5 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] ${
                language === 'te'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#334155] hover:text-[#0B192C] hover:bg-white/60'
              }`}
            >
              తెలుగు
            </button>
          </div>

          {/* Web Share Action Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label={copied ? content.shareSuccess : content.shareLabel}
            title={copied ? content.shareSuccess : content.shareLabel}
            className={`${TOUCH_OVERLAY_CLASS} group relative inline-flex items-center justify-center gap-2 min-h-[48px] min-w-[48px] px-3.5 py-2 rounded-md border border-[#CBD5E1] bg-white text-[#0B192C] hover:bg-[#F8FAFC] hover:border-[#B8964C]/70 hover:shadow-xs hover:scale-105 active:bg-[#F1F5F9] active:scale-[0.98] text-xs font-medium transition-all transition-transform duration-150 ease-out whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] cursor-pointer`}
          >
            {copied ? (
              <Check
                className="w-4 h-4 shrink-0 text-emerald-600 animate-in zoom-in-75 duration-200"
                aria-hidden="true"
              />
            ) : (
              <Share2
                className="w-4 h-4 shrink-0 text-[#475569] group-hover:text-[#785C22] group-hover:scale-110 transition-transform duration-150 ease-out"
                aria-hidden="true"
              />
            )}
            <span className="hidden sm:inline group-hover:text-[#0B192C] transition-colors duration-150">
              {copied ? content.shareSuccess : content.shareLabel}
            </span>
          </button>

          {onPrint && (
            <button
              type="button"
              onClick={onPrint}
              disabled={isPrinting}
              aria-busy={isPrinting}
              aria-label={printLabel}
              title={printLabel}
              className={`${TOUCH_OVERLAY_CLASS} group inline-flex items-center justify-center gap-2 min-h-[48px] min-w-[48px] px-3.5 py-2 rounded-md border border-[#CBD5E1] bg-white text-[#0B192C] hover:bg-[#F8FAFC] hover:border-[#B8964C]/70 hover:shadow-xs hover:scale-105 active:bg-[#F1F5F9] active:scale-[0.98] text-xs font-medium transition-all transition-transform duration-150 ease-out whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] cursor-pointer disabled:opacity-80 disabled:pointer-events-none`}
            >
              <Printer
                className={`w-4 h-4 shrink-0 transition-transform duration-150 ease-out ${
                  isPrinting
                    ? 'text-[#B8964C] animate-pulse'
                    : 'text-[#475569] group-hover:text-[#785C22] group-hover:scale-110'
                }`}
                aria-hidden="true"
              />
              <span className="hidden lg:inline group-hover:text-[#0B192C] transition-colors duration-150">
                {printLabel}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? content.mobileMenuClose : content.mobileMenuOpen}
            className={`${TOUCH_OVERLAY_CLASS} md:hidden inline-flex items-center justify-center min-w-[48px] min-h-[48px] w-12 h-12 rounded-md border border-[#CBD5E1] text-[#0B192C] hover:bg-[#F1F5F9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]`}
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
              className="flex items-center min-h-[48px] py-3 px-3 text-sm font-medium text-[#0B192C] hover:bg-[#F1F5F9] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#B8964C]"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              handleNavClick();
              handleShare();
            }}
            className="flex items-center justify-between w-full min-h-[48px] py-3 px-3 text-sm font-medium text-[#0B192C] hover:bg-[#F1F5F9] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#B8964C] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#785C22]" />
              {copied ? content.shareSuccess : content.shareLabel}
            </span>
            {copied && <Check className="w-4 h-4 text-emerald-600" />}
          </button>
        </nav>
      )}
    </header>
  );
};
