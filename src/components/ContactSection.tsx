import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { TranslationContent } from '../data/translations';
import { SectionHeader } from './SectionHeader';

interface ContactSectionProps {
  content: TranslationContent['contactSection'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
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

  return (
    <section
      id="contact-info"
      aria-labelledby="heading-contact-info"
      className="print-section py-12 sm:py-16 scroll-mt-20"
    >
      <SectionHeader
        id="heading-contact-info"
        index={content.index}
        title={content.title}
        subtitle={content.subtitle}
      />

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {copiedField ? content.copiedButton : ''}
      </p>

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

          <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-4 no-print">
            <span className="text-xs text-[#475569]">
              {content.JurisdictionLabel}: {content.JurisdictionValue}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(content.addressSingleLine, 'address')}
              aria-label={`${content.copyAddressButton}: ${content.addressLabel}`}
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
                className="font-mono-tabular text-lg sm:text-xl font-medium text-[#0B192C] hover:text-[#9A7B38] underline decoration-[#CBD5E1] hover:decoration-[#9A7B38] underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
              >
                {content.phoneValue}
              </a>
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => handleCopy(content.phoneValue, 'phone')}
                  aria-label={`${content.copyButton} ${content.phoneLabel}`}
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
                className="font-mono-tabular text-base sm:text-lg font-medium text-[#0B192C] hover:text-[#9A7B38] underline decoration-[#CBD5E1] hover:decoration-[#9A7B38] underline-offset-4 transition-colors break-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8964C]"
              >
                {content.emailValue}
              </a>
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => handleCopy(content.emailValue, 'email')}
                  aria-label={`${content.copyButton} ${content.emailLabel}`}
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
        </div>
      </div>

      <p className="mt-4 text-xs text-[#475569] leading-relaxed">
        {content.noSolicitationNotice}
      </p>
    </section>
  );
};
