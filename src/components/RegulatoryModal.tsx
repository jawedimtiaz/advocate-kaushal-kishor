import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Language, TranslationContent } from '../data/translations';

interface RegulatoryModalProps {
  isOpen: boolean;
  isMandatoryEntrance?: boolean;
  onAccept?: () => void;
  onClose: () => void;
  content: TranslationContent['modal'];
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const RegulatoryModal: React.FC<RegulatoryModalProps> = ({
  isOpen,
  isMandatoryEntrance = false,
  onAccept,
  onClose,
  content,
  language,
  onLanguageChange,
}) => {
  const primaryActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    primaryActionRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isMandatoryEntrance) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, isMandatoryEntrance, onClose]);

  if (!isOpen) return null;

  const handlePrimaryAction = () => {
    if (isMandatoryEntrance && onAccept) {
      onAccept();
    } else {
      onClose();
    }
  };

  return (
    <div
      onClick={(event) => {
        if (!isMandatoryEntrance && event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B192C]/70 backdrop-blur-xs no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="regulatory-modal-title"
    >
      <div className="bg-white border border-[#CBD5E1] max-w-2xl w-full p-6 sm:p-8 shadow-lg max-h-[90vh] overflow-y-auto">
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

          <div className="flex items-center gap-2 shrink-0">
            {language && onLanguageChange && (
              <div
                role="group"
                aria-label="Language selection"
                className="inline-flex items-center border border-[#CBD5E1] rounded p-0.5 bg-[#F8FAFC]"
              >
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  aria-pressed={language === 'en'}
                  className={`px-2.5 py-1 min-h-[36px] text-xs font-medium rounded-xs transition-colors ${
                    language === 'en'
                      ? 'bg-[#0B192C] text-white'
                      : 'text-[#334155] hover:text-[#0B192C]'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('te')}
                  aria-pressed={language === 'te'}
                  lang="te"
                  className={`px-2.5 py-1 min-h-[36px] text-xs font-medium rounded-xs transition-colors ${
                    language === 'te'
                      ? 'bg-[#0B192C] text-white'
                      : 'text-[#334155] hover:text-[#0B192C]'
                  }`}
                >
                  తెలుగు
                </button>
              </div>
            )}

            {!isMandatoryEntrance && (
              <button
                type="button"
                onClick={onClose}
                aria-label={content.closeButton}
                className="p-2 min-w-[40px] min-h-[40px] inline-flex items-center justify-center text-[#475569] hover:text-[#0B192C] hover:bg-[#F1F5F9] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#B8964C]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm sm:text-base text-[#1E293B] leading-relaxed">
          <div className="border-l-2 border-[#785C22] bg-[#FBFBF9] px-4 py-3 text-xs sm:text-sm text-[#0B192C] font-medium">
            {content.mandatoryEntranceNote}
          </div>

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
            ref={primaryActionRef}
            type="button"
            onClick={handlePrimaryAction}
            className="px-5 py-2.5 min-h-[44px] text-sm font-medium bg-[#0B192C] text-white hover:bg-[#1E293B] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C]"
          >
            {isMandatoryEntrance ? content.acceptButton : content.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
