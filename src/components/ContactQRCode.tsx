import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Smartphone } from 'lucide-react';

export interface ContactQRCodeProps {
  name: string;
  phone: string;
  email: string;
  address: string;
  title?: string;
  subtitle?: string;
  downloadLabel?: string;
  ariaLabel?: string;
  className?: string;
}

export const ContactQRCode: React.FC<ContactQRCodeProps> = ({
  name,
  phone,
  email,
  address,
  title = 'Scan to Save Digital Contact Card (vCard)',
  subtitle = 'Point your smartphone camera at this QR code to quickly add Advocate Kaushal Kishor directly to your device contacts.',
  downloadLabel = 'Download Contact Card (.vcf)',
  ariaLabel = "QR code linking to Advocate Kaushal Kishor's vCard contact details",
  className = '',
}) => {
  // Construct standard vCard 3.0 formatted string
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    'N:Kishor;Kaushal;;Advocate;',
    'TITLE:Advocate',
    'ORG:Chambers of Advocate Kaushal Kishor',
    `TEL;TYPE=CELL,VOICE:${phone.startsWith('+') ? phone : '+91' + phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${email}`,
    `ADR;TYPE=WORK:;;${address.replace(/,/g, '\\,')};Gajuwaka;Visakhapatnam;530026;India`,
    'NOTE:Advocate practicing at Visakhapatnam District Court and Courts across India (excluding Supreme Court of India). Qualifications: M.Sc., LL.B. Enrolment No: 1255/2020.',
    'URL:https://maps.google.com/?q=Chinnagantyada,+Gajuwaka,+Visakhapatnam,+Andhra+Pradesh+530026',
    'END:VCARD',
  ].join('\r\n');

  const handleDownloadVCard = () => {
    try {
      const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Advocate_Kaushal_Kishor.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download vCard file:', err);
    }
  };

  return (
    <div
      role="region"
      aria-label={title}
      className={`no-print border border-[#E2E8F0] bg-white p-6 sm:p-7 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* QR Code Graphic Frame rendered with qrcode.react */}
        <div className="shrink-0 flex flex-col items-center">
          <div
            className="w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] bg-white border border-[#CBD5E1] p-2 flex items-center justify-center rounded shadow-xs relative"
            aria-label={ariaLabel}
            role="img"
          >
            <QRCodeSVG
              value={vCardData}
              size={144}
              level="M"
              fgColor="#0B192C"
              bgColor="#FFFFFF"
              aria-label={ariaLabel}
              role="img"
              className="w-full h-full"
            />
          </div>
          <span className="mt-2 text-[11px] font-mono-tabular font-medium text-[#64748B] uppercase tracking-wider">
            vCard 3.0 Standard
          </span>
        </div>

        {/* Informative Guidance & Mobile Direct Save Action */}
        <div className="flex-1 flex flex-col justify-between text-center sm:text-left min-w-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#785C22] bg-[#FAF9F5] border border-[#CBD5E1] rounded mb-2.5">
              <Smartphone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Digital Address Book</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0B192C] tracking-tight">
              {title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#475569] leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              type="button"
              onClick={handleDownloadVCard}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-semibold text-[#0B192C] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] hover:border-[#B8964C] rounded shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8964C] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#785C22]" aria-hidden="true" />
              <span>{downloadLabel}</span>
            </button>
            <span className="text-xs text-[#64748B]">
              Compatible with iOS, Android & macOS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
