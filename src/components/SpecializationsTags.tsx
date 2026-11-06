import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';

export interface SpecializationItem {
  id: string;
  name: string;
  secondaryName?: string;
}

interface SpecializationsProps {
  title: string;
  subtitle?: string;
  items: SpecializationItem[];
  className?: string;
}

export const SpecializationsTags: React.FC<SpecializationsProps> = ({
  title,
  subtitle,
  items,
  className = '',
}) => {
  return (
    <div
      className={`mt-6 p-6 sm:p-7 border border-[#E2E8F0] bg-white shadow-2xs hover:shadow-xs transition-all duration-300 ease-out ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <Scale className="w-4 h-4 text-[#785C22] shrink-0 no-print" aria-hidden="true" />
        <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0B192C] tracking-tight">
          {title}
        </h3>
      </div>

      {subtitle && (
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
          {subtitle}
        </p>
      )}

      {/* Pill-shaped modern tags grid */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#0B192C] bg-[#F8FAFC] hover:bg-[#FAF9F5] border border-[#CBD5E1] hover:border-[#B8964C] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#785C22] group-hover:scale-125 transition-transform shrink-0" />
            <span>{item.name}</span>
            {item.secondaryName && (
              <span className="text-[11px] font-normal text-[#64748B] group-hover:text-[#475569]">
                ({item.secondaryName})
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] flex items-center gap-2 text-[11px] text-[#64748B]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#785C22] shrink-0 no-print" aria-hidden="true" />
        <span>Factual practice particulars provided under State Bar Council compliance rules.</span>
      </div>
    </div>
  );
};
