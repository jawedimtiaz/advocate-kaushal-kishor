/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowUp, Clock, Globe, Printer } from 'lucide-react';
import { Language, translations } from './data/translations';
import { Header } from './components/Header';
import { BreadcrumbNav, BreadcrumbSection } from './components/BreadcrumbNav';
import { SectionHeader } from './components/SectionHeader';
import { DefinitionRecordList } from './components/DefinitionRecordList';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RegulatoryModal } from './components/RegulatoryModal';

const LANGUAGE_STORAGE_KEY = 'advocate_kk_language_pref';
const BCI_DISCLAIMER_STORAGE_KEY = 'bci_disclaimer_accepted';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'te') {
        return saved;
      }
    } catch {
      // Ignore storage access errors
    }
    return 'en';
  });

  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(BCI_DISCLAIMER_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isRegulatoryModalOpen, setIsRegulatoryModalOpen] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(BCI_DISCLAIMER_STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('masthead-info');

  const t = translations[language];

  useEffect(() => {
    const sectionIds = [
      'masthead-info',
      'professional-info',
      'enrolment-info',
      'areas-of-practice',
      'contact-info',
    ];

    const handleScroll = () => {
      const masthead = document.getElementById('masthead-info');
      if (masthead) {
        const rect = masthead.getBoundingClientRect();
        // Appears once the user scrolls beyond the first section (#masthead-info)
        setShowScrollTop(rect.bottom < 64);
      } else {
        setShowScrollTop(window.scrollY > 350);
      }

      // Track active section for breadcrumb navigation
      const scrollPosition = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSectionId(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleAfterPrint = () => {
      setIsPrinting(false);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.pageTitle;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage access errors
    }
  }, [language, t.meta.pageTitle]);

  useEffect(() => {
    const sectionIds = [
      'masthead-info',
      'professional-info',
      'enrolment-info',
      'areas-of-practice',
      'contact-info',
    ];

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisibleSections({
        'masthead-info': true,
        'professional-info': true,
        'enrolment-info': true,
        'areas-of-practice': true,
        'contact-info': true,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const getSectionFadeClass = (id: string) =>
    visibleSections[id]
      ? 'animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-forwards motion-reduce:animate-none motion-reduce:opacity-100'
      : 'opacity-0 motion-reduce:opacity-100';

  const handleAcceptDisclaimer = () => {
    try {
      window.localStorage.setItem(BCI_DISCLAIMER_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage access errors
    }
    setHasAcceptedDisclaimer(true);
    setIsRegulatoryModalOpen(false);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    const stampEl = document.getElementById('print-generated-stamp');
    if (stampEl) {
      const now = new Date();
      const updatedStamp = `Generated on: ${new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now)}`;
      const timestampInner = stampEl.querySelector('.print-generated-timestamp');
      if (timestampInner) {
        timestampInner.textContent = updatedStamp;
      } else {
        stampEl.textContent = updatedStamp;
      }
      stampEl.setAttribute('data-generated-on', updatedStamp);
    }

    const urlEl = document.querySelector('.print-source-url');
    if (urlEl && typeof window !== 'undefined') {
      urlEl.textContent = `Document URL: ${window.location.href}`;
    }

    // Defer window.print slightly to allow the UI to render the 'Printing...' feedback overlay
    window.setTimeout(() => {
      try {
        window.print();
      } finally {
        window.setTimeout(() => {
          setIsPrinting(false);
        }, 1200);
      }
    }, 120);
  };

  return (
    <div id="top" className="page-backdrop min-h-screen flex flex-col text-[#0B192C]">
      {/* Keyboard Skip-to-Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#0B192C] focus:text-white focus:text-xs focus:font-semibold focus:rounded focus:shadow-md focus:outline-2 focus:outline-[#B8964C]"
      >
        {t.meta.skipToContent}
      </a>

      {/* Non-intrusive Development Preview Notice Bar */}
      <div
        role="region"
        aria-label={t.meta.previewBannerTitle}
        className="bg-[#0B192C] text-[#F8FAFC] border-b border-[#B8964C]/40 px-4 py-2.5 text-xs no-print"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold text-[#D4B46A] tracking-wide uppercase">
              {t.meta.previewBannerTitle}
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-[#94A3B8]">
              ·
            </span>
            <span className="text-[#E2E8F0]">{t.meta.previewBannerText}</span>
          </div>
        </div>
      </div>

      {/* Section 1: Sticky Top Navigation & Bilingual Selector */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        content={t.nav}
        onPrint={handlePrint}
        printLabel={t.hero.printRecordButton}
        isPrinting={isPrinting}
      />

      {/* Discreet Breadcrumb Navigation */}
      <BreadcrumbNav
        homeLabel={t.nav.breadcrumbHome}
        brandName={t.hero.name}
        activeSectionId={activeSectionId}
        ariaLabel={t.nav.breadcrumbAriaLabel}
        sections={[
          { id: 'masthead-info', label: t.nav.breadcrumbOverview },
          { id: 'professional-info', label: t.professionalSection.title },
          { id: 'enrolment-info', label: t.enrolmentSection.title },
          { id: 'areas-of-practice', label: t.practiceSection.title },
          { id: 'contact-info', label: t.contactSection.title },
        ]}
      />

      {/* Main Content Container */}
      <main
        id="main-content"
        tabIndex={-1}
        className="print-main print-compact-layout main-dossier-container flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12 sm:border-x sm:border-[#CBD5E1]/80 focus:outline-none"
      >
        {/* Institutional Identity Masthead */}
        <section
          id="masthead-info"
          aria-labelledby="advocate-identity-heading"
          className={`print-section print-masthead-section py-10 sm:py-16 border-b border-[#E2E8F0] ${getSectionFadeClass('masthead-info')}`}
        >
          <div className="print-masthead bg-white border border-[#E2E8F0] p-6 sm:p-10 lg:p-12">
            <div className="print-masthead-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#785C22]">
                  {t.hero.documentType}
                </p>
                <h1
                  id="advocate-identity-heading"
                  className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0B192C] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {t.hero.name}
                </h1>
                <p className="mt-2 text-lg sm:text-xl font-medium text-[#1E293B]">
                  {t.hero.qualifications}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#475569]">
                  {t.hero.qualificationsFull}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 no-print">
                <button
                  type="button"
                  onClick={() => setIsRegulatoryModalOpen(true)}
                  className="relative after:content-[''] after:absolute after:-inset-1.5 after:rounded-md px-4 py-2.5 sm:py-2 min-h-[44px] min-w-[44px] sm:min-h-[40px] inline-flex items-center justify-center text-xs font-medium text-[#0B192C] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
                >
                  {t.hero.regulatoryNoticeButton}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={isPrinting}
                  aria-busy={isPrinting}
                  className="relative after:content-[''] after:absolute after:-inset-1.5 after:rounded-md inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 min-h-[44px] min-w-[44px] sm:min-h-[40px] text-xs font-medium text-white bg-[#0B192C] hover:bg-[#1E293B] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] disabled:opacity-80 disabled:pointer-events-none"
                >
                  <Printer
                    className={`w-3.5 h-3.5 ${isPrinting ? 'animate-pulse text-[#B8964C]' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{isPrinting ? t.hero.printingOverlayTitle : t.hero.printRecordButton}</span>
                </button>
              </div>
            </div>

            <div className="print-masthead-meta pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-[#334155]">
              <span className="font-medium">{t.hero.location}</span>
              <span className="text-xs text-[#475569]">
                {t.hero.ComplianceReference}
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Professional Information */}
        <section
          id="professional-info"
          aria-labelledby="heading-professional-info"
          className={`print-section py-12 sm:py-16 border-b border-[#E2E8F0] scroll-mt-20 ${getSectionFadeClass('professional-info')}`}
        >
          <SectionHeader
            id="heading-professional-info"
            index={t.professionalSection.index}
            title={t.professionalSection.title}
            subtitle={t.professionalSection.subtitle}
          />
          <DefinitionRecordList items={t.professionalSection.fields} />
        </section>

        {/* Section 3: Enrolment Information */}
        <section
          id="enrolment-info"
          aria-labelledby="heading-enrolment-info"
          className={`print-section py-12 sm:py-16 border-b border-[#E2E8F0] scroll-mt-20 ${getSectionFadeClass('enrolment-info')}`}
        >
          <SectionHeader
            id="heading-enrolment-info"
            index={t.enrolmentSection.index}
            title={t.enrolmentSection.title}
            subtitle={t.enrolmentSection.subtitle}
          />

          <DefinitionRecordList items={t.enrolmentSection.fields} />

          {/* Clearly Separated Unconfirmed References Pending Clarification */}
          <div className="print-unconfirmed-box mt-8 border border-dashed border-[#CBD5E1] bg-[#FBFBF9] p-6 sm:p-8">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0B192C]">
              {t.enrolmentSection.unconfirmedReferencesTitle}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#475569] leading-relaxed pb-4 border-b border-[#E2E8F0]">
              {t.enrolmentSection.unconfirmedReferencesSubtitle}
            </p>

            <ul className="divide-y divide-[#E2E8F0]">
              {t.enrolmentSection.unconfirmedReferencesItems.map((item) => (
                <li
                  key={item.id}
                  className="print-avoid-break py-4 flex flex-col gap-1"
                >
                  <span className="text-sm sm:text-base font-medium text-[#334155]">
                    {item.name}
                  </span>
                  <span className="text-xs text-[#785C22] font-medium leading-relaxed">
                    {item.statusNote}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 pt-4 border-t border-dashed border-[#CBD5E1] text-xs text-[#475569] leading-relaxed">
              {t.enrolmentSection.unconfirmedReferencesDisclaimer}
            </p>
          </div>

          {/* Statutory Declaration of Truth */}
          <div className="print-declaration-box mt-6 border-l-2 border-[#785C22] bg-white border border-[#E2E8F0] p-5 sm:p-6">
            <p className="text-xs sm:text-sm font-medium text-[#0B192C] leading-relaxed">
              {t.enrolmentSection.statutoryDeclaration}
            </p>
          </div>
        </section>

        {/* Section 4: Court Practice, Representation & Areas of Practice */}
        <section
          id="areas-of-practice"
          aria-labelledby="heading-areas-of-practice"
          className={`print-section py-12 sm:py-16 border-b border-[#E2E8F0] scroll-mt-20 ${getSectionFadeClass('areas-of-practice')}`}
        >
          <SectionHeader
            id="heading-areas-of-practice"
            index={t.practiceSection.index}
            title={t.practiceSection.title}
            subtitle={t.practiceSection.subtitle}
          />

          {/* Confirmed Court Practice & Representation */}
          <div className="print-avoid-break mb-10">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0B192C] mb-4">
              {t.practiceSection.courtPracticeTitle}
            </h3>

            <DefinitionRecordList items={t.practiceSection.courtPracticeFields} />

            <div className="print-summary-box mt-4 bg-white border border-[#E2E8F0] p-5 sm:p-6 space-y-2.5">
              <p className="text-sm sm:text-base text-[#0B192C] leading-relaxed font-medium">
                {t.practiceSection.courtPracticeSummary}
              </p>
              <p className="text-xs text-[#475569] leading-relaxed">
                {t.practiceSection.courtPracticeClarificationNote}
              </p>
            </div>
          </div>

          {/* Confirmed Areas of Practice */}
          <div className="print-avoid-break">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0B192C] mb-4">
              {t.practiceSection.practiceAreasHeading}
            </h3>

            <div className="print-practice-grid grid grid-cols-1 sm:grid-cols-2 border-t border-b border-[#E2E8F0] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
              {t.practiceSection.items.map((item) => (
                <div key={item.id} className="print-practice-card p-6 sm:p-8">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-tabular text-xs font-semibold tracking-widest text-[#785C22]">
                      {item.index}.
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-[#0B192C]">
                        {item.name}
                      </h4>
                      {item.secondaryName && (
                        <p className="mt-1 text-xs sm:text-sm text-[#475569]">
                          {item.secondaryName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-[#475569] leading-relaxed">
            {t.practiceSection.complianceNote}
          </p>
        </section>

        {/* Section 5: Contact Information */}
        <ContactSection
          content={t.contactSection}
          className={getSectionFadeClass('contact-info')}
        />
      </main>

      {/* Section 6: Footer */}
      <Footer
        content={t.footer}
        contact={t.contactSection}
        privacyPolicy={t.privacyPolicy}
        onOpenRegulatoryModal={() => setIsRegulatoryModalOpen(true)}
      >
        {/* Print-only document tracking metadata element */}
        <div
          id="print-generated-stamp"
          className="print-metadata-block hidden font-mono-tabular"
          aria-hidden="true"
        >
          <div className="print-metadata-item print-metadata-badge">
            <Printer className="print-metadata-icon w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="print-metadata-tag">Official Print Record</span>
          </div>
          <div className="print-metadata-item print-metadata-source">
            <Globe className="print-metadata-icon w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="print-source-url">
              Document URL: {typeof window !== 'undefined' ? window.location.href : ''}
            </span>
          </div>
          <div className="print-metadata-item print-metadata-timestamp">
            <Clock className="print-metadata-icon w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="print-generated-timestamp" />
          </div>
        </div>
      </Footer>

      {/* Subtle 'Printing...' Visual Feedback Overlay */}
      {isPrinting && (
        <div
          role="status"
          aria-live="polite"
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[#0B192C]/40 backdrop-blur-[2px] p-4 transition-opacity duration-200 animate-in fade-in"
        >
          <div className="bg-[#FAF9F5] border border-[#CBD5E1] shadow-2xl rounded-lg p-5 sm:p-6 max-w-sm w-full mx-auto flex items-center gap-4 text-[#0B192C]">
            <div className="w-11 h-11 rounded-full bg-[#0B192C] flex items-center justify-center shrink-0 text-[#B8964C] shadow-sm">
              <Printer className="w-5 h-5 animate-pulse" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[#0B192C] tracking-tight">
                {t.hero.printingOverlayTitle}
              </p>
              <p className="text-xs text-[#475569] mt-0.5 truncate">
                {t.hero.printingOverlaySubtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Regulatory & BCI Rule 36 Entrance / Review Modal */}
      <RegulatoryModal
        isOpen={!hasAcceptedDisclaimer || isRegulatoryModalOpen}
        isMandatoryEntrance={!hasAcceptedDisclaimer}
        onAccept={handleAcceptDisclaimer}
        onClose={() => setIsRegulatoryModalOpen(false)}
        content={t.modal}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Discreet, Low-Profile 'Scroll to Top' Button */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label={t.meta.scrollToTop}
        title={t.meta.scrollToTop}
        className={`no-print fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 group inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/95 text-[#334155] hover:text-[#0B192C] hover:bg-white border border-[#CBD5E1] hover:border-[#B8964C] shadow-sm hover:shadow-md backdrop-blur-xs transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp
          className="w-4 h-4 text-[#334155] group-hover:text-[#785C22] group-hover:-translate-y-0.5 transition-all duration-150 ease-out"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
