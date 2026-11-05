import React from 'react';

interface SectionHeaderProps {
  id?: string;
  index: string;
  title: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  index,
  title,
  subtitle,
}) => {
  return (
    <div className="print-section-header mb-8 pb-5 border-b border-[#E2E8F0]">
      <div className="flex items-baseline gap-3">
        <span className="font-mono-tabular text-xs font-semibold tracking-widest text-[#785C22] uppercase">
          {index}.
        </span>
        <h2
          id={id}
          className="font-display text-2xl sm:text-3xl font-semibold text-[#0B192C] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>
      </div>
      <p className="mt-2 text-sm sm:text-base text-[#334155] max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
