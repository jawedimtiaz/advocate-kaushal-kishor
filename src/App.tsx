/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import { Language, translations } from './data/translations';
import { Header } from './components/Header';
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

  const t = translations[language];

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
    ];

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisibleSections({
        'masthead-info': true,
        'professional-info': true,
        'enrolment-info': true,
        'areas-of-practice': true,
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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
    window.print();
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
      />

      {/* Main Content Container */}
      <main
        id="main-content"
        tabIndex={-1}
        className="print-main main-dossier-container flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12 sm:border-x sm:border-[#CBD5E1]/80 focus:outline-none"
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
                  className="relative after:content-[''] after:absolute after:-inset-1.5 after:rounded-md inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 min-h-[44px] min-w-[44px] sm:min-h-[40px] text-xs font-medium text-white bg-[#0B192C] hover:bg-[#1E293B] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
                >
                  <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.hero.printRecordButton}</span>
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
        <ContactSection content={t.contactSection} />
      </main>

      {/* Section 6: Footer */}
      <Footer
        content={t.footer}
        contact={t.contactSection}
        onOpenRegulatoryModal={() => setIsRegulatoryModalOpen(true)}
      />

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
    </div>
  );
}
