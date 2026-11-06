import React from 'react';
import { RecordItem } from '../data/translations';

interface DefinitionRecordListProps {
  items: RecordItem[];
  className?: string;
}

export const DefinitionRecordList: React.FC<DefinitionRecordListProps> = ({
  items,
  className = '',
}) => {
  return (
    <dl
      className={`print-record-list divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0] bg-white ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`print-record-row px-5 py-5 sm:px-7 sm:py-6 sm:grid sm:grid-cols-12 sm:gap-6 items-baseline ${
            item.isPlaceholder ? 'bg-[#FBFBF9]/70' : 'bg-white'
          }`}
        >
          <dt className="print-record-label sm:col-span-5 text-sm font-semibold text-[#1E293B]">
            {item.label}
          </dt>
          <dd className="print-record-value mt-1.5 sm:mt-0 sm:col-span-7 text-base text-[#0B192C] break-words">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span
                className={`${
                  item.isMono
                    ? 'font-mono-tabular text-sm sm:text-base font-medium tracking-wide'
                    : 'font-medium'
                } ${item.isPlaceholder ? 'text-[#334155]' : 'text-[#0B192C]'}`}
              >
                {item.value}
              </span>

              {item.isPlaceholder && item.placeholderNote && (
                <>
                  <span aria-hidden="true" className="text-[#64748B]">
                    ·
                  </span>
                  <span className="text-xs text-[#785C22] font-medium tracking-wide">
                    {item.placeholderNote}
                  </span>
                </>
              )}
            </div>

            {item.secondaryValue && (
              <p className="mt-1 text-xs sm:text-sm text-[#475569]">
                {item.secondaryValue}
              </p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
};
