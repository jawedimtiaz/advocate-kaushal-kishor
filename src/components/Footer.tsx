import React from 'react';
import { TranslationContent } from '../data/translations';

interface FooterProps {
  content: TranslationContent['footer'];
  contact: TranslationContent['contactSection'];
  onOpenRegulatoryModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  contact,
  onOpenRegulatoryModal,
}) => {
  return (
    <footer className="print-footer bg-[#0B192C] text-[#F8FAFC] border-t-2 border-[#B8964C]/50">
      <div className="print-footer-inner max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Row: Advocate Identity & Factual Contact Particulars */}
        <div className="print-footer-top grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#1E293B]">
          <div className="md:col-span-6">
            <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
              {content.name}
            </h2>
            <p className="mt-1.5 text-sm text-[#CBD5E1]">
              {content.location}
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col md:items-end justify-center space-y-1.5 text-sm text-[#CBD5E1]">
            <div>
              <span className="text-[#CBD5E1]">{contact.phoneLabel}: </span>
              <a
                href={contact.phoneHref}
                className="font-mono-tabular text-white hover:text-[#D4B46A] underline decoration-[#475569] hover:decoration-[#D4B46A] underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4B46A]"
              >
                {contact.phoneValue}
              </a>
            </div>
            <div>
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
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#D4B46A]">
              {content.disclaimerHeading}
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

        {/* Bottom Row: Copyright Year */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#CBD5E1]">
          <p>{content.copyright}</p>
          <p className="text-[#94A3B8] max-w-md sm:text-right">
            {content.shortAddress}
          </p>
        </div>
      </div>
    </footer>
  );
};
