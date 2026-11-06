import React from 'react';
import { Clock, Globe, Mail, MapPin, Phone, Printer, Shield } from 'lucide-react';
import { TranslationContent } from '../data/translations';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';

interface FooterProps {
  content: TranslationContent['footer'];
  contact: TranslationContent['contactSection'];
  privacyPolicy: TranslationContent['privacyPolicy'];
  onOpenRegulatoryModal: () => void;
  children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  contact,
  privacyPolicy,
  onOpenRegulatoryModal,
  children,
}) => {
  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  const formatGeneratedStamp = () => {
    const now = new Date();
    const dateFormatted = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(now);
    return `Generated on: ${dateFormatted}`;
  };

  const [generatedOnDate, setGeneratedOnDate] = React.useState<string>(formatGeneratedStamp);

  React.useEffect(() => {
    const handleBeforePrint = () => {
      const updatedStamp = formatGeneratedStamp();
      setGeneratedOnDate(updatedStamp);
      const stampEl = document.getElementById('print-generated-stamp');
      if (stampEl) {
        stampEl.textContent = updatedStamp;
        stampEl.setAttribute('data-generated-on', updatedStamp);
      }
      const urlEl = document.querySelector('.print-source-url');
      if (urlEl && typeof window !== 'undefined') {
        urlEl.textContent = `Document URL: ${window.location.href}`;
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    return () => window.removeEventListener('beforeprint', handleBeforePrint);
  }, []);

  return (
    <footer className="print-footer bg-[#0B192C] text-[#F8FAFC] border-t-2 border-[#B8964C]/50">
      <div className="print-footer-inner max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Print-Only Chamber Dossier Verification Notice */}
        <div className="print-only-footer-notice hidden items-center gap-2 pb-2.5 mb-4 border-b border-black text-xs font-semibold uppercase tracking-wider text-black">
          <Printer className="print-footer-icon w-3.5 h-3.5 text-black shrink-0" aria-hidden="true" />
          <span>Official Chamber Information Sheet · Verification Record</span>
        </div>

        {/* Top Row: Advocate Identity & Factual Contact Particulars */}
        <div className="print-footer-top grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#1E293B]">
          <div className="md:col-span-6">
            <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
              {content.name}
            </h2>
            <p className="mt-1.5 text-sm text-[#CBD5E1] flex items-center gap-1.5">
              <MapPin className="print-footer-icon w-3.5 h-3.5 text-[#D4B46A] print:text-black shrink-0" aria-hidden="true" />
              <span>{content.location}</span>
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col md:items-end justify-center space-y-1.5 text-sm text-[#CBD5E1]">
            <div className="flex items-center gap-1.5">
              <Phone className="print-footer-icon w-3.5 h-3.5 text-[#D4B46A] print:text-black shrink-0" aria-hidden="true" />
              <span className="text-[#CBD5E1]">{contact.phoneLabel}: </span>
              <a
                href={contact.phoneHref}
                className="font-mono-tabular text-white hover:text-[#D4B46A] underline decoration-[#475569] hover:decoration-[#D4B46A] underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4B46A]"
              >
                {contact.phoneValue}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="print-footer-icon w-3.5 h-3.5 text-[#D4B46A] print:text-black shrink-0" aria-hidden="true" />
              <span className="text-[#CBD5E1]">{contact.emailLabel}: </span>
              <a
                href={contact.emailHref}
                className="font-mono-tabular text-white hover:text-[#D4B46A] underline decoration-[#475569] hover:decoration-[#D4B46A] underline-offset-4 transition-colors break-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4B46A]"
              >
                {contact.emailValue}
              </a>
            </div>
          </div>
        </div>

        {/* Middle Row: Factual Disclaimer Placeholder for Review */}
        <div className="py-8 border-b border-[#1E293B] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#D4B46A] flex items-center gap-1.5">
              <Shield className="print-footer-icon w-3.5 h-3.5 text-[#D4B46A] print:text-black shrink-0" aria-hidden="true" />
              <span>{content.disclaimerHeading}</span>
            </h3>
            <button
              type="button"
              onClick={onOpenRegulatoryModal}
              className="py-1.5 px-2 -mx-2 text-xs font-medium text-[#E2E8F0] hover:text-white underline decoration-[#B8964C] underline-offset-4 rounded transition-colors whitespace-nowrap shrink-0 no-print focus-visible:outline-2 focus-visible:outline-[#D4B46A]"
            >
              {content.reviewRule36Button}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed max-w-4xl">
            {content.disclaimerBody}
          </p>
          <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-4xl">
            {content.developmentNotice}
          </p>
        </div>

        {/* Bottom Row: Copyright Year, Privacy Policy & Last Updated Timestamp */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#CBD5E1]">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
            <p>{content.copyright}</p>
            <span aria-hidden="true" className="hidden sm:inline text-[#475569]">
              ·
            </span>
            <PrivacyPolicyLink content={privacyPolicy} />
            <span aria-hidden="true" className="hidden sm:inline text-[#475569]">
              ·
            </span>
            <span className="font-mono-tabular text-[#CBD5E1]/90">
              {content.lastUpdatedLabel} {new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date())}
            </span>
          </div>
          <p className="text-[#94A3B8] max-w-md sm:text-right">
            {content.shortAddress}
          </p>
        </div>

        {children ? (
          children
        ) : (
          /* Hidden Print-Only Document Tracking Metadata Block with Printer-Friendly Icons */
          <div
            id="print-generated-stamp"
            aria-hidden="true"
            className="print-metadata-block hidden font-mono-tabular"
            data-generated-on={generatedOnDate}
          >
            <div className="print-metadata-item print-metadata-badge">
              <Printer className="print-metadata-icon w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="print-metadata-tag">Official Print Record</span>
            </div>
            <div className="print-metadata-item print-metadata-source">
              <Globe className="print-metadata-icon w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="print-source-url">Document URL: {currentUrl}</span>
            </div>
            <div className="print-metadata-item print-metadata-timestamp">
              <Clock className="print-metadata-icon w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span
                className="print-generated-timestamp"
                data-generated-on={generatedOnDate}
              >
                {generatedOnDate}
              </span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
