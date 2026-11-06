import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';

export interface BreadcrumbSection {
  id: string;
  label: string;
}

interface BreadcrumbNavProps {
  homeLabel: string;
  brandName: string;
  activeSectionId: string;
  ariaLabel: string;
  sections: BreadcrumbSection[];
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  homeLabel,
  brandName,
  activeSectionId,
  ariaLabel,
  sections,
}) => {
  const currentSection = sections.find((sec) => sec.id === activeSectionId) || sections[0];

  return (
    <nav
      aria-label={ariaLabel}
      className="no-print w-full border-b border-[#E2E8F0] bg-[#FAF9F5]/90 py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-[#64748B]"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <ol className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap min-w-0">
          {/* Breadcrumb Root: Directory */}
          <li className="inline-flex items-center shrink-0">
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#0B192C] transition-colors focus-visible:outline-2 focus-visible:outline-[#B8964C] rounded-xs"
            >
              <Building2 className="w-3.5 h-3.5 text-[#785C22] shrink-0" aria-hidden="true" />
              <span>{homeLabel}</span>
            </a>
          </li>

          <li aria-hidden="true" className="text-[#CBD5E1] shrink-0">
            <ChevronRight className="w-3.5 h-3.5" />
          </li>

          {/* Breadcrumb Level 2: Advocate Identity */}
          <li className="inline-flex items-center shrink-0">
            <a
              href="#masthead-info"
              className="text-[#64748B] hover:text-[#0B192C] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#B8964C] rounded-xs"
            >
              {brandName}
            </a>
          </li>

          <li aria-hidden="true" className="text-[#CBD5E1] shrink-0">
            <ChevronRight className="w-3.5 h-3.5" />
          </li>

          {/* Breadcrumb Current Active Section */}
          <li
            aria-current="location"
            className="inline-flex items-center font-semibold text-[#0B192C] truncate"
          >
            <span className="truncate">{currentSection ? currentSection.label : ''}</span>
          </li>
        </ol>

        {/* Quiet Document Type Kicker */}
        <span className="hidden md:inline text-[11px] text-[#64748B] whitespace-nowrap shrink-0">
          Legal Record &amp; Directory
        </span>
      </div>
    </nav>
  );
};
