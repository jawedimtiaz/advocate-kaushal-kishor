import React, { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { RecordItem, TranslationContent } from '../data/translations';
import { SectionHeader } from './SectionHeader';
import { DefinitionRecordList } from './DefinitionRecordList';

interface ContactSectionProps {
  content: TranslationContent['contactSection'];
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  className = '',
}) => {
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | 'address' | null>(null);

  const handleCopy = async (value: string, field: 'phone' | 'email' | 'address') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2000);
    } catch {
      // Fallback if clipboard permission is unavailable
      setCopiedField(null);
    }
  };

  const contactDefinitionItems: RecordItem[] = [
    {
      id: 'chamber-hours-availability',
      label: content.chamberHoursLabel,
      value: content.chamberHoursValue,
      secondaryValue: content.appointmentNotice,
      isPlaceholder: false,
    },
    {
      id: 'languages-handled',
      label: content.languagesLabel,
      value: content.languagesValue,
      isPlaceholder: false,
    },
  ];

  return (
    <section
      id="contact-info"
      aria-labelledby="heading-contact-info"
      className={`print-section py-12 sm:py-16 scroll-mt-20 ${className}`}
    >
      <SectionHeader
        id="heading-contact-info"
        index={content.index}
        title={content.title}
        subtitle={content.subtitle}
      />

      <div className="print-contact-grid grid grid-cols-1 lg:grid-cols-12 border border-[#E2E8F0] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
        {/* Office Address Block */}
        <div className="print-contact-block lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              {content.addressLabel}
            </h3>
            <address className="mt-3 not-italic text-base sm:text-lg text-[#0B192C] leading-relaxed font-medium space-y-0.5">
              {content.addressLines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </address>
          </div>

          <div className="mt-6 pt-5 border-t border-[#F1F5F9] space-y-3 no-print">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#475569]">
                {content.JurisdictionLabel}: {content.JurisdictionValue}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(content.addressSingleLine, 'address')}
                aria-label={
                  copiedField === 'address'
                    ? `${content.addressLabel}: ${content.copiedAriaLabel}`
                    : `${content.copyAddressButton}: ${content.addressLabel}`
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] text-xs font-medium text-[#0B192C] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
              >
                {copiedField === 'address' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0B192C]" aria-hidden="true" />
                    <span>{content.copiedButton}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#475569]" aria-hidden="true" />
                    <span>{content.copyAddressButton}</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-1">
              <a
                href={content.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.viewOnMapAriaLabel}
                className="no-print inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] text-xs font-medium text-[#785C22] hover:text-[#0B192C] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
              >
                <span>{content.viewOnMapLabel}</span>
                <span className="sr-only"> ({content.opensInNewTab})</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#785C22]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Direct Telephone & Email Block */}
        <div className="lg:col-span-6 divide-y divide-[#E2E8F0] flex flex-col justify-between">
          {/* Telephone */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
              {content.phoneLabel}
            </h3>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-4">
              <a
                href={content.phoneHref}
                aria-label={`${content.directCallLabel} ${content.phoneLabel}: ${content.phoneValue}`}
                className="font-mono-tabular text-lg sm:text-xl font-medium text-[#0B192C] hover:text-[#9A7B38] underline decoration-[#CBD5E1] hover:decoration-[#9A7B38] underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
              >
                {content.phoneValue}
              </a>
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => handleCopy(content.phoneValue, 'phone')}
                  aria-label={
                    copiedField === 'phone'
                      ? `${content.phoneLabel}: ${content.copiedAriaLabel}`
                      : `${content.copyButton} ${content.phoneLabel}`
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] text-xs font-medium text-[#0B192C] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0B192C]" aria-hidden="true" />
                      <span>{content.copiedButton}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#475569]" aria-hidden="true" />
                      <span>{content.copyButton}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
              {content.emailLabel}
            </h3>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-4">
              <a
                href={content.emailHref}
                aria-label={`${content.directEmailLabel} ${content.emailLabel}: ${content.emailValue}`}
                className="font-mono-tabular text-base sm:text-lg font-medium text-[#0B192C] hover:text-[#9A7B38] underline decoration-[#CBD5E1] hover:decoration-[#9A7B38] underline-offset-4 transition-colors break-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
              >
                {content.emailValue}
              </a>
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => handleCopy(content.emailValue, 'email')}
                  aria-label={
                    copiedField === 'email'
                      ? `${content.emailLabel}: ${content.copiedAriaLabel}`
                      : `${content.copyButton} ${content.emailLabel}`
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] text-xs font-medium text-[#0B192C] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0B192C]" aria-hidden="true" />
                      <span>{content.copiedButton}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#475569]" aria-hidden="true" />
                      <span>{content.copyButton}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Chamber Hours & Availability / Prior Appointment Note */}
          <div className="p-6 sm:p-8 bg-[#FBFBF9]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
              {content.chamberHoursLabel}
            </h3>
            <p className="mt-2 font-mono-tabular text-sm sm:text-base font-medium text-[#0B192C]">
              {content.chamberHoursValue}
            </p>
            <p className="mt-2 border-l-2 border-[#785C22] pl-3 text-xs sm:text-sm font-medium text-[#334155] leading-relaxed">
              {content.appointmentNotice}
            </p>
          </div>
        </div>
      </div>

      {/* Chamber Hours & Languages Handled Definition Rows */}
      <div className="mt-8 border border-[#E2E8F0] bg-white">
        <DefinitionRecordList items={contactDefinitionItems} className="border-t-0 border-b-0" />
      </div>

      {/* Statutory Privilege & Confidentiality Disclaimer */}
      <div className="print-confidentiality-box mt-6 border-l-2 border-[#785C22] bg-[#FBFBF9] border border-[#CBD5E1] p-5 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-[#0B192C] leading-relaxed">
          {content.confidentialityNotice}
        </p>
      </div>

      <p className="mt-4 text-xs text-[#475569] leading-relaxed">
        {content.noSolicitationNotice}
      </p>

      {/* Screen reader live region for copy confirmation */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {copiedField === 'address' && `${content.addressLabel}: ${content.copiedAriaLabel}`}
        {copiedField === 'phone' && `${content.phoneLabel}: ${content.copiedAriaLabel}`}
        {copiedField === 'email' && `${content.emailLabel}: ${content.copiedAriaLabel}`}
      </div>
    </section>
  );
};
