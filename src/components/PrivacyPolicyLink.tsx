import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { TranslationContent } from '../data/translations';

interface PrivacyPolicyLinkProps {
  content: TranslationContent['privacyPolicy'];
  className?: string;
}

export const PrivacyPolicyLink: React.FC<PrivacyPolicyLinkProps> = ({
  content,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 text-xs text-[#CBD5E1] hover:text-[#D4B46A] underline decoration-[#475569] hover:decoration-[#D4B46A] underline-offset-4 transition-colors py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4B46A] no-print ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 shrink-0 opacity-80" aria-hidden="true" />
        <span>{content.linkText}</span>
      </button>

      {isOpen && (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B192C]/75 backdrop-blur-xs no-print animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div className="bg-white border border-[#CBD5E1] max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col text-[#0B192C] rounded-none">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
              <div>
                <h2
                  id="privacy-modal-title"
                  className="font-display text-xl sm:text-2xl font-semibold text-[#0B192C] tracking-tight"
                >
                  {content.modalTitle}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#475569]">
                  {content.modalSubtitle}
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative after:content-[''] after:absolute after:-inset-1.5 after:rounded-md p-2 -mr-2 text-[#475569] hover:text-[#0B192C] hover:bg-[#F1F5F9] rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
                aria-label={content.closeButton}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Sections */}
            <div className="mt-5 space-y-4 overflow-y-auto pr-1 text-xs sm:text-sm text-[#334155] leading-relaxed divide-y divide-[#F1F5F9]">
              {content.sections.map((section, idx) => (
                <div key={idx} className={idx === 0 ? '' : 'pt-4'}>
                  <h3 className="font-semibold text-sm text-[#0B192C] tracking-wide mb-1.5">
                    {section.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 min-h-[44px] min-w-[44px] text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1E293B] rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
              >
                {content.closeButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
