import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { TranslationContent } from '../data/translations';

interface RegulatoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: TranslationContent['modal'];
}

export const RegulatoryModal: React.FC<RegulatoryModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const focusable = Array.from(focusableElements ?? []).filter(
        (element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true'
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B192C]/60 backdrop-blur-xs no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="regulatory-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white border border-[#CBD5E1] max-w-2xl w-full p-6 sm:p-8 shadow-lg max-h-[90vh] overflow-y-auto focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <h2
              id="regulatory-modal-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#0B192C]"
            >
              {content.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#475569]">
              {content.subtitle}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={content.closeButton}
            className="p-2 min-w-[40px] min-h-[40px] inline-flex items-center justify-center text-[#475569] hover:text-[#0B192C] hover:bg-[#F1F5F9] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#B8964C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm sm:text-base text-[#1E293B] leading-relaxed">
          {content.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          <div className="mt-6 pt-5 border-t border-dashed border-[#CBD5E1] bg-[#FBFBF9] p-4 sm:p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0B192C]">
              {content.placeholderSummaryTitle}
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm font-mono-tabular text-[#334155]">
              {content.placeholderSummaryItems.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-[40px] text-sm font-medium bg-[#0B192C] text-white hover:bg-[#1E293B] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
          >
            {content.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
