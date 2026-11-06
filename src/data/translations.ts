export type Language = 'en' | 'te';

export interface RecordItem {
  id: string;
  label: string;
  value: string;
  secondaryValue?: string;
  isPlaceholder: boolean;
  placeholderNote?: string;
  isMono?: boolean;
}

export interface TranslationContent {
  meta: {
    langCode: Language;
    langName: string;
    pageTitle: string;
    skipToContent: string;
    previewBannerTitle: string;
    previewBannerText: string;
  };
  nav: {
    brandName: string;
    brandQualification: string;
    primaryNavAriaLabel: string;
    mobileNavAriaLabel: string;
    professional: string;
    enrolment: string;
    practice: string;
    contact: string;
    languageLabel: string;
    mobileMenuOpen: string;
    mobileMenuClose: string;
  };
  hero: {
    documentType: string;
    name: string;
    qualifications: string;
    qualificationsFull: string;
    location: string;
    ComplianceReference: string;
    printRecordButton: string;
    regulatoryNoticeButton: string;
  };
  professionalSection: {
    index: string;
    title: string;
    subtitle: string;
    verifiedStatusText: string;
    fields: RecordItem[];
  };
  enrolmentSection: {
    index: string;
    title: string;
    subtitle: string;
    fields: RecordItem[];
    statutoryDeclaration: string;
    unconfirmedReferencesTitle: string;
    unconfirmedReferencesSubtitle: string;
    unconfirmedReferencesItems: {
      id: string;
      name: string;
      secondaryName?: string;
      statusNote: string;
    }[];
    unconfirmedReferencesDisclaimer: string;
  };
  practiceSection: {
    index: string;
    title: string;
    subtitle: string;
    courtPracticeTitle: string;
    courtPracticeFields: RecordItem[];
    courtPracticeSummary: string;
    courtPracticeClarificationNote: string;
    practiceAreasHeading: string;
    items: {
      id: string;
      index: string;
      name: string;
      secondaryName?: string;
    }[];
    complianceNote: string;
  };
  contactSection: {
    index: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    addressLines: string[];
    addressSingleLine: string;
    JurisdictionLabel: string;
    JurisdictionValue: string;
    phoneLabel: string;
    phoneValue: string;
    phoneHref: string;
    emailLabel: string;
    emailValue: string;
    emailHref: string;
    officeHoursLabel: string;
    officeHoursValue: string;
    appointmentNotice: string;
    chamberHoursLabel: string;
    chamberHoursValue: string;
    languagesLabel: string;
    languagesValue: string;
    confidentialityNoticeTitle: string;
    confidentialityNotice: string;
    viewOnMapLabel: string;
    mapsUrl: string;
    copyButton: string;
    copiedButton: string;
    copyAddressButton: string;
    directCallLabel: string;
    directEmailLabel: string;
    noSolicitationNotice: string;
  };
  footer: {
    name: string;
    qualification: string;
    location: string;
    shortAddress: string;
    disclaimerHeading: string;
    disclaimerBody: string;
    developmentNotice: string;
    copyright: string;
    reviewRule36Button: string;
  };
  modal: {
    title: string;
    subtitle: string;
    acceptButton: string;
    closeButton: string;
    mandatoryEntranceNote: string;
    paragraphs: string[];
    placeholderSummaryTitle: string;
    placeholderSummaryItems: string[];
  };
}

export const translations: Record<Language, TranslationContent> = {
  en: {
    meta: {
      langCode: 'en',
      langName: 'English',
      pageTitle: 'Advocate Kaushal Kishor, M.Sc., LL.B. | Gajuwaka, Visakhapatnam',
      skipToContent: 'Skip to main content',
      previewBannerTitle: 'Development Preview — Subject to Verification & Approval',
      previewBannerText:
        'Publication is subject to applicable professional rules and final confirmation of remaining unverified references.',
    },
    nav: {
      brandName: 'Advocate Kaushal Kishor',
      brandQualification: 'M.Sc., LL.B.',
      primaryNavAriaLabel: 'Primary section navigation',
      mobileNavAriaLabel: 'Mobile section navigation',
      professional: 'Profile',
      enrolment: 'Enrolment',
      practice: 'Practice',
      contact: 'Contact',
      languageLabel: 'Select language',
      mobileMenuOpen: 'Open navigation menu',
      mobileMenuClose: 'Close navigation menu',
    },
    hero: {
      documentType: 'Factual Professional Information Profile',
      name: 'Advocate Kaushal Kishor',
      qualifications: 'M.Sc., LL.B.',
      qualificationsFull: 'Master of Science (M.Sc.) · Bachelor of Laws (LL.B.)',
      location: 'Gajuwaka, Visakhapatnam, Andhra Pradesh, India',
      ComplianceReference:
        'Publication is subject to applicable professional rules and required approvals',
      printRecordButton: 'Print Information Sheet',
      regulatoryNoticeButton: 'Regulatory Notice',
    },
    professionalSection: {
      index: '01',
      title: 'Professional Information',
      subtitle: 'Factual identity, academic credentials, and office location.',
      verifiedStatusText: 'Supplied factual detail',
      fields: [
        {
          id: 'name',
          label: 'Full Name',
          value: 'Advocate Kaushal Kishor',
          isPlaceholder: false,
        },
        {
          id: 'designation',
          label: 'Professional Designation',
          value: 'Advocate',
          isPlaceholder: false,
        },
        {
          id: 'qualifications',
          label: 'Academic & Professional Qualifications',
          value: 'M.Sc., LL.B.',
          secondaryValue: 'Master of Science; Bachelor of Laws',
          isPlaceholder: false,
        },
        {
          id: 'location',
          label: 'Primary Location',
          value: 'Gajuwaka, Visakhapatnam, Andhra Pradesh, India',
          secondaryValue: 'PIN: 530026',
          isPlaceholder: false,
        },
        {
          id: 'languages',
          label: 'Languages Handled',
          value: 'Telugu, English, Hindi',
          isPlaceholder: false,
        },
      ],
    },
    enrolmentSection: {
      index: '02',
      title: 'Enrolment Information',
      subtitle: 'Confirmed State Bar Council enrolment particulars supplied by the advocate.',
      fields: [
        {
          id: 'enrolment-number',
          label: 'Enrolment Number',
          value: '1255/2020',
          secondaryValue:
            'Verification note: Standard State Bar Council prefix formatting is AP/1255/2020 (subject to roll certificate verification)',
          isPlaceholder: false,
          isMono: true,
        },
        {
          id: 'enrolment-date',
          label: 'Enrolment Date',
          value: '30-12-2020',
          isPlaceholder: false,
          isMono: true,
        },
        {
          id: 'original-sbc',
          label: 'State/Place of Original Enrolment',
          value: 'Amaravati',
          isPlaceholder: false,
        },
        {
          id: 'current-sbc',
          label: 'Current State Bar Council',
          value: 'Andhra Pradesh',
          isPlaceholder: false,
        },
      ],
      statutoryDeclaration:
        'Declaration: I hereby declare that the information given above is true and correct. — Advocate Kaushal Kishor',
      unconfirmedReferencesTitle:
        'Additional References Supplied by Advocate — Pending Clarification',
      unconfirmedReferencesSubtitle:
        'The following names were supplied earlier on reference materials. They are not presented as verified memberships or affiliations until their exact official names and nature of association are confirmed:',
      unconfirmedReferencesItems: [
        {
          id: 'visakhapatnam-bar-reference',
          name: 'Visakhapatnam Bar Council',
          statusNote:
            'Referred to by the advocate in connection with his Visakhapatnam District Court practice (exact official association/bar body name pending confirmation)',
        },
        {
          id: 'gajuwaka-bar-reference',
          name: 'Gajuwaka Bar Council',
          statusNote:
            'Unconfirmed reference — exact official institutional name and nature of association pending clarification',
        },
        {
          id: 'hc-ap-reference',
          name: 'High Court of Andhra Pradesh',
          statusNote:
            'Unconfirmed reference — nature of association or appearance context pending clarification (not presented as a membership)',
        },
      ],
      unconfirmedReferencesDisclaimer:
        'Note: None of the above three entries are represented as verified Bar Association memberships until formally confirmed.',
    },
    practiceSection: {
      index: '03',
      title: 'Court Practice, Representation & Areas of Practice',
      subtitle:
        'Confirmed court practice location, scope of representation, and areas of legal practice supplied by the advocate.',
      courtPracticeTitle: 'Court Practice & Scope of Representation',
      courtPracticeFields: [
        {
          id: 'practice-location',
          label: 'Practice Location',
          value: 'Visakhapatnam District Court',
          isPlaceholder: false,
        },
        {
          id: 'court-representation',
          label: 'Court Representation',
          value: 'Courts across India, excluding the Supreme Court of India',
          isPlaceholder: false,
        },
      ],
      courtPracticeSummary:
        'Practices at Visakhapatnam District Court. According to information supplied by the advocate, he represents clients before courts across India, excluding the Supreme Court of India.',
      courtPracticeClarificationNote:
        'Clarification: Eligibility or representation before courts across India is stated as supplied by the advocate and does not imply separate enrolment in every State Bar Council or membership in every court.',
      practiceAreasHeading: 'Confirmed Areas of Practice',
      items: [
        {
          id: 'family-law',
          index: '01',
          name: 'Family Law',
        },
        {
          id: 'criminal-law',
          index: '02',
          name: 'Criminal Law',
        },
      ],
      complianceNote:
        'No unverified specialisations, experience claims, or representations of past matters are displayed.',
    },
    contactSection: {
      index: '04',
      title: 'Contact Information',
      subtitle: 'Office address, correspondence details, and office hours.',
      addressLabel: 'Office Address',
      addressLines: [
        '26-2-20/1, Chaitanya Nagar,',
        'behind Mee Seva, R.K. Hospital Lane,',
        'Chinnagantyada, Gajuwaka,',
        'Visakhapatnam – 530026,',
        'Andhra Pradesh.',
      ],
      addressSingleLine:
        '26-2-20/1, Chaitanya Nagar, behind Mee Seva, R.K. Hospital Lane, Chinnagantyada, Gajuwaka, Visakhapatnam – 530026, Andhra Pradesh.',
      JurisdictionLabel: 'Location',
      JurisdictionValue: 'Gajuwaka, Visakhapatnam – 530026, Andhra Pradesh',
      phoneLabel: 'Telephone',
      phoneValue: '9885037796',
      phoneHref: 'tel:+919885037796',
      emailLabel: 'Email Address',
      emailValue: 'kaushalkisho@gmail.com',
      emailHref: 'mailto:kaushalkisho@gmail.com',
      officeHoursLabel: 'Office Hours',
      officeHoursValue: 'Monday to Friday, 10:00 AM - 5:00 PM',
      appointmentNotice:
        'Appointment Only: In-person office visits are strictly by prior appointment (subject to court appearance schedules).',
      chamberHoursLabel: 'Chamber Hours & Availability',
      chamberHoursValue:
        'Monday to Saturday: 6:00 PM – 9:00 PM (Prior appointment recommended); Court Hours: 10:30 AM – 4:30 PM',
      languagesLabel: 'Languages Handled',
      languagesValue: 'Telugu, English, Hindi',
      confidentialityNoticeTitle: 'Notice on Confidentiality & Advocate-Client Privilege',
      confidentialityNotice:
        'Notice on Confidentiality: All communications and documents shared are kept strictly confidential under statutory advocate-client privilege. Unsolicited transmission of information does not constitute an engagement or advocate-client relationship.',
      viewOnMapLabel: 'View Chamber Location on Google Maps',
      mapsUrl:
        'https://maps.google.com/?q=Chinnagantyada,+Gajuwaka,+Visakhapatnam,+Andhra+Pradesh+530026',
      copyButton: 'Copy',
      copiedButton: 'Copied',
      copyAddressButton: 'Copy Address',
      directCallLabel: 'Call',
      directEmailLabel: 'Email',
      noSolicitationNotice:
        'This section provides factual contact details only. No online consultation booking, appointment scheduling, or lead-generation forms are operated on this website.',
    },
    footer: {
      name: 'Advocate Kaushal Kishor, M.Sc., LL.B.',
      qualification: 'M.Sc., LL.B.',
      location: 'Gajuwaka, Visakhapatnam – 530026, Andhra Pradesh, India',
      shortAddress:
        '26-2-20/1, Chaitanya Nagar, behind Mee Seva, R.K. Hospital Lane, Chinnagantyada, Gajuwaka, Visakhapatnam – 530026, Andhra Pradesh',
      disclaimerHeading: 'Regulatory Notice & Factual Information Disclaimer',
      disclaimerBody:
        'This website is intended solely to provide basic factual professional and contact information. It is not intended to be, and must not be construed as, an advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever, nor does it provide legal advice or create a lawyer-client relationship.',
      developmentNotice:
        'Regulatory & Publication Notice: Publication of this website is subject to applicable professional rules (including Rule 36 of the Bar Council of India Rules) and required client/regulatory approvals. This preview does not claim Bar Council approval or legal certification.',
      copyright: `© ${new Date().getFullYear()} Advocate Kaushal Kishor. Factual Information Profile.`,
      reviewRule36Button: 'View Full Regulatory Notice',
    },
    modal: {
      title: 'Regulatory Notice & Clarification Disclosure',
      subtitle: 'Important notice regarding professional rules and items awaiting final clarification',
      acceptButton: 'I Agree & Enter',
      closeButton: 'Close Notice',
      mandatoryEntranceNote:
        'In accordance with Rule 36 of the Bar Council of India Rules, visitors must confirm that they are accessing this factual professional information profile of their own accord and that there has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort.',
      paragraphs: [
        'This website has been structured strictly as a factual professional information profile. It contains no promotional slogans, comparative claims, testimonials, case outcomes, consultation booking forms, or unsupported specialisation claims.',
        'Publication of any advocate information website is subject to applicable professional rules (including Rule 36 of the Bar Council of India Rules) and required approvals. This development preview does not claim or represent that it has been approved or certified by the Bar Council of India or any State Bar Council.',
        'Core identity, enrolment particulars (1255/2020), court practice at Visakhapatnam District Court, court representation across India (excluding the Supreme Court of India), and areas of practice (Family Law, Criminal Law) reflect information supplied by the advocate. Other institutional references remain clearly separated awaiting confirmation of their exact official names and nature of association.',
      ],
      placeholderSummaryTitle: 'References Separated & Awaiting Final Clarification:',
      placeholderSummaryItems: [
        'Visakhapatnam Bar Council: Referred to by the advocate in connection with his Visakhapatnam District Court practice; exact official bar body/association terminology pending confirmation.',
        'Gajuwaka Bar Council: Not presented as a verified membership; exact official institutional name and nature of association pending confirmation.',
        'High Court of Andhra Pradesh: Not presented as a membership or affiliation; nature of association pending confirmation.',
      ],
    },
  },
  te: {
    meta: {
      langCode: 'te',
      langName: 'తెలుగు',
      pageTitle: 'న్యాయవాది కౌశల్ కిషోర్, M.Sc., LL.B. | గాజువాక, విశాఖపట్నం',
      skipToContent: 'ప్రధాన సమాచారానికి వెళ్లండి',
      previewBannerTitle: 'డెవలప్‌మెంట్ ప్రివ్యూ — ధృవీకరణ మరియు ఆమోదానికి లోబడి ఉంటుంది',
      previewBannerText:
        'ఈ వెబ్‌సైట్ ప్రచురణ వర్తించే వృత్తిపరమైన నిబంధనలు మరియు మిగిలిన అంశాల తుది నిర్ధారణకు లోబడి ఉంటుంది.',
    },
    nav: {
      brandName: 'న్యాయవాది కౌశల్ కిషోర్',
      brandQualification: 'M.Sc., LL.B.',
      primaryNavAriaLabel: 'ప్రధాన విభాగాల నావిగేషన్',
      mobileNavAriaLabel: 'మొబైల్ విభాగాల నావిగేషన్',
      professional: 'వృత్తిపరమైన వివరాలు',
      enrolment: 'నమోదు వివరాలు',
      practice: 'ప్రాక్టీస్ రంగాలు',
      contact: 'సంప్రదింపు వివరాలు',
      languageLabel: 'భాషను ఎంచుకోండి',
      mobileMenuOpen: 'నావిగేషన్ మెనూ తెరవండి',
      mobileMenuClose: 'నావిగేషన్ మెనూ మూసివేయండి',
    },
    hero: {
      documentType: 'వాస్తవిక వృత్తిపరమైన సమాచార ప్రొఫైల్',
      name: 'న్యాయవాది కౌశల్ కిషోర్',
      qualifications: 'M.Sc., LL.B.',
      qualificationsFull: 'ఎం.ఎస్సీ., ఎల్.ఎల్.బి. (M.Sc., LL.B.)',
      location: 'గాజువాక, విశాఖపట్నం, ఆంధ్రప్రదేశ్, భారతదేశం',
      ComplianceReference:
        'ఈ సమాచార ప్రచురణ వర్తించే వృత్తిపరమైన నిబంధనలు మరియు అవసరమైన ఆమోదాలకు లోబడి ఉంటుంది',
      printRecordButton: 'సమాచార పత్రం ప్రింట్',
      regulatoryNoticeButton: 'నిబంధనల గమనిక',
    },
    professionalSection: {
      index: '01',
      title: 'వృత్తిపరమైన సమాచారం',
      subtitle: 'పేరు, విద్యార్హతలు మరియు కార్యాలయ ప్రాంత వివరాలు.',
      verifiedStatusText: 'అందించబడిన వాస్తవిక వివరాలు',
      fields: [
        {
          id: 'name',
          label: 'పూర్తి పేరు',
          value: 'న్యాయవాది కౌశల్ కిషోర్ (Advocate Kaushal Kishor)',
          isPlaceholder: false,
        },
        {
          id: 'designation',
          label: 'వృత్తి హోదా',
          value: 'న్యాయవాది (Advocate)',
          isPlaceholder: false,
        },
        {
          id: 'qualifications',
          label: 'విద్య మరియు వృత్తిపరమైన అర్హతలు',
          value: 'M.Sc., LL.B.',
          secondaryValue: 'ఎం.ఎస్సీ., ఎల్.ఎల్.బి.',
          isPlaceholder: false,
        },
        {
          id: 'location',
          label: 'ప్రాథమిక ప్రాంతం',
          value: 'గాజువాక, విశాఖపట్నం, ఆంధ్రప్రదేశ్, భారతదేశం',
          secondaryValue: 'పిన్ కోడ్: 530026',
          isPlaceholder: false,
        },
        {
          id: 'languages',
          label: 'వ్యవహరించే భాషలు (Languages Handled)',
          value: 'తెలుగు, ఇంగ్లీష్, హిందీ (Telugu, English, Hindi)',
          isPlaceholder: false,
        },
      ],
    },
    enrolmentSection: {
      index: '02',
      title: 'నమోదు (Enrolment) సమాచారం',
      subtitle: 'న్యాయవాది అందించిన నిర్ధారించబడిన స్టేట్ బార్ కౌన్సిల్ నమోదు వివరాలు.',
      fields: [
        {
          id: 'enrolment-number',
          label: 'నమోదు సంఖ్య (Enrolment Number)',
          value: '1255/2020',
          secondaryValue:
            'ధృవీకరణ గమనిక: ప్రామాణిక స్టేట్ బార్ కౌన్సిల్ ప్రిఫిక్స్ ఫార్మాట్ AP/1255/2020 (నమోదు ధృవీకరణ పత్రం పరిశీలనకు లోబడి ఉంటుంది)',
          isPlaceholder: false,
          isMono: true,
        },
        {
          id: 'enrolment-date',
          label: 'నమోదు తేదీ (Enrolment Date)',
          value: '30-12-2020',
          isPlaceholder: false,
          isMono: true,
        },
        {
          id: 'original-sbc',
          label: 'మొదటి నమోదు రాష్ట్రం / ప్రదేశం (State/Place of Original Enrolment)',
          value: 'అమరావతి (Amaravati)',
          isPlaceholder: false,
        },
        {
          id: 'current-sbc',
          label: 'ప్రస్తుత స్టేట్ బార్ కౌన్సిల్ (Current State Bar Council)',
          value: 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
          isPlaceholder: false,
        },
      ],
      statutoryDeclaration:
        'ప్రకటన: పైన పేర్కొన్న సమాచారం అంతా సత్యమని మరియు సరైనదని నేను ఇందుమూలంగా ప్రకటిస్తున్నాను. — న్యాయవాది కౌశల్ కిషోర్ (Declaration: I hereby declare that the information given above is true and correct. — Advocate Kaushal Kishor)',
      unconfirmedReferencesTitle:
        'న్యాయవాది అందించిన ఇతర ప్రస్తావనలు — స్పష్టత పెండింగ్‌లో ఉన్న వివరాలు',
      unconfirmedReferencesSubtitle:
        'దిగువ పేర్కొన్న పేర్లు ప్రాథమిక సమాచారంలో ప్రస్తావించబడ్డాయి. వీటి ఖచ్చితమైన అధికారిక పేర్లు మరియు సంబంధ స్వభావం నిర్ధారించబడే వరకు వీటిని ధృవీకరించబడిన సభ్యత్వాలుగా పరిగణించరాదు:',
      unconfirmedReferencesItems: [
        {
          id: 'visakhapatnam-bar-reference',
          name: 'విశాఖపట్నం బార్ కౌన్సిల్ (Visakhapatnam Bar Council)',
          statusNote:
            'విశాఖపట్నం జిల్లా కోర్టు ప్రాక్టీస్‌కు సంబంధించి న్యాయవాది దీనిని ప్రస్తావించారు (అధికారిక బార్ సంస్థ పేరు తుది నిర్ధారణ పెండింగ్‌లో ఉంది)',
        },
        {
          id: 'gajuwaka-bar-reference',
          name: 'గాజువాక బార్ కౌన్సిల్ (Gajuwaka Bar Council)',
          statusNote:
            'నిర్ధారణ పెండింగ్‌లో ఉన్న ప్రస్తావన — ఖచ్చితమైన అధికారిక సంస్థ పేరు మరియు అనుబంధ స్వభావం ఇంకా నిర్ధారించబడలేదు',
        },
        {
          id: 'hc-ap-reference',
          name: 'ఆంధ్రప్రదేశ్ హైకోర్టు (High Court of Andhra Pradesh)',
          statusNote:
            'నిర్ధారణ పెండింగ్‌లో ఉన్న ప్రస్తావన — సంబంధ స్వభావం ఇంకా నిర్ధారించబడలేదు (ఇది సభ్యత్వంగా చూపబడలేదు)',
        },
      ],
      unconfirmedReferencesDisclaimer:
        'గమనిక: అధికారిక నిర్ధారణ జరిగే వరకు పై మూడు అంశాలను ధృవీకరించబడిన బార్ అసోసియేషన్ సభ్యత్వాలుగా పేర్కొనడం లేదు.',
    },
    practiceSection: {
      index: '03',
      title: 'కోర్టు ప్రాక్టీస్, ప్రాతినిధ్యం & ప్రాక్టీస్ రంగాలు',
      subtitle:
        'న్యాయవాది అందించిన కోర్టు ప్రాక్టీస్ ప్రదేశం, కోర్టులలో ప్రాతినిధ్య పరిధి మరియు న్యాయ ప్రాక్టీస్ రంగాల వివరాలు.',
      courtPracticeTitle: 'కోర్టు ప్రాక్టీస్ & ప్రాతినిధ్య పరిధి (Court Practice & Representation)',
      courtPracticeFields: [
        {
          id: 'practice-location',
          label: 'ప్రాక్టీస్ చేసే కోర్టు (Practice Location)',
          value: 'విశాఖపట్నం జిల్లా కోర్టు (Visakhapatnam District Court)',
          isPlaceholder: false,
        },
        {
          id: 'court-representation',
          label: 'కోర్టులలో ప్రాతినిధ్యం (Court Representation)',
          value:
            'భారత సుప్రీంకోర్టు మినహా భారతదేశంలోని అన్ని కోర్టులు (Courts across India, excluding the Supreme Court of India)',
          isPlaceholder: false,
        },
      ],
      courtPracticeSummary:
        'విశాఖపట్నం జిల్లా కోర్టులో ప్రాక్టీస్ చేస్తున్నారు. న్యాయవాది అందించిన సమాచారం ప్రకారం, ఆయన భారత సుప్రీంకోర్టు మినహా భారతదేశంలోని ఇతర కోర్టులలో కక్షిదారుల తరపున వాదిస్తారు.',
      courtPracticeClarificationNote:
        'స్పష్టత: భారతదేశంలోని కోర్టులలో ప్రాతినిధ్యం గురించిన సమాచారం న్యాయవాది తెలిపిన మేరకు మాత్రమే ఇవ్వబడింది; ఇది ప్రతి రాష్ట్ర బార్ కౌన్సిల్‌లో వేర్వేరు నమోదు లేదా ప్రతి కోర్టులో సభ్యత్వం ఉన్నట్లు సూచించదు.',
      practiceAreasHeading: 'నిర్ధారించబడిన ప్రాక్టీస్ రంగాలు (Confirmed Areas of Practice)',
      items: [
        {
          id: 'family-law',
          index: '01',
          name: 'కుటుంబ న్యాయం',
          secondaryName: 'Family Law',
        },
        {
          id: 'criminal-law',
          index: '02',
          name: 'క్రిమినల్ న్యాయం (నేర న్యాయశాస్త్రం)',
          secondaryName: 'Criminal Law',
        },
      ],
      complianceNote:
        'ఇందులో ఎలాంటి ధృవీకరించని ప్రత్యేకతలు, అనుభవ ప్రకటనలు లేదా గత కేసుల వివరాలు చేర్చబడలేదు.',
    },
    contactSection: {
      index: '04',
      title: 'సంప్రదింపు సమాచారం',
      subtitle: 'కార్యాలయ చిరునామా, టెలిఫోన్ / ఈమెయిల్ మరియు కార్యాలయ సమయాల వివరాలు.',
      addressLabel: 'కార్యాలయ చిరునామా',
      addressLines: [
        '26-2-20/1, చైతన్య నగర్,',
        'మీ సేవ వెనుక, ఆర్.కె. హాస్పిటల్ లేన్,',
        'చిన్నగంట్యాడ, గాజువాక,',
        'విశాఖపట్నం – 530026,',
        'ఆంధ్రప్రదేశ్.',
      ],
      addressSingleLine:
        '26-2-20/1, చైతన్య నగర్, మీ సేవ వెనుక, ఆర్.కె. హాస్పిటల్ లేన్, చిన్నగంట్యాడ, గాజువాక, విశాఖపట్నం – 530026, ఆంధ్రప్రదేశ్ (26-2-20/1, Chaitanya Nagar, behind Mee Seva, R.K. Hospital Lane, Chinnagantyada, Gajuwaka, Visakhapatnam – 530026, Andhra Pradesh.)',
      JurisdictionLabel: 'ప్రాంతం',
      JurisdictionValue: 'గాజువాక, విశాఖపట్నం – 530026, ఆంధ్రప్రదేశ్',
      phoneLabel: 'టెలిఫోన్',
      phoneValue: '9885037796',
      phoneHref: 'tel:+919885037796',
      emailLabel: 'ఈమెయిల్ చిరునామా',
      emailValue: 'kaushalkisho@gmail.com',
      emailHref: 'mailto:kaushalkisho@gmail.com',
      officeHoursLabel: 'కార్యాలయ సమయాలు (Office Hours)',
      officeHoursValue:
        'సోమవారం నుండి శుక్రవారం వరకు, ఉదయం 10:00 - సాయంత్రం 5:00 (Monday to Friday, 10:00 AM - 5:00 PM)',
      appointmentNotice:
        'ముందస్తు అనుమతి మాత్రమే (Appointment Only): కార్యాలయ సందర్శనలు ముందస్తు అనుమతి ద్వారా మాత్రమే (కోర్టు విచారణ సమయాలకు లోబడి ఉంటుంది).',
      chamberHoursLabel: 'ఛాంబర్ సమయాలు & లభ్యత (Chamber Hours & Availability)',
      chamberHoursValue:
        'సోమవారం నుండి శనివారం వరకు: సాయంత్రం 6:00 – రాత్రి 9:00 (ముందస్తు అపాయింట్‌మెంట్ సిఫార్సు చేయబడింది); కోర్టు సమయాలు: ఉదయం 10:30 – సాయంత్రం 4:30 (Monday to Saturday: 6:00 PM – 9:00 PM; Court Hours: 10:30 AM – 4:30 PM)',
      languagesLabel: 'వ్యవహరించే భాషలు (Languages Handled)',
      languagesValue: 'తెలుగు, ఇంగ్లీష్, హిందీ (Telugu, English, Hindi)',
      confidentialityNoticeTitle: 'గోప్యతా ప్రకటన & న్యాయవాది-కక్షిదారుల హక్కు (Confidentiality & Privilege)',
      confidentialityNotice:
        'గోప్యతా ప్రకటన (Notice on Confidentiality): న్యాయవాది-కక్షిదారుల చట్టబద్ధమైన హక్కు ప్రకారం పంచుకోబడిన అన్ని సంప్రదింపులు మరియు పత్రాలు పూర్తిగా గోప్యంగా ఉంచబడతాయి. ముందస్తు అంగీకారం లేకుండా సమాచారాన్ని పంపడం వలన న్యాయవాది-కక్షిదారుల సంబంధం ఏర్పడదు (Notice on Confidentiality: All communications and documents shared are kept strictly confidential under statutory advocate-client privilege. Unsolicited transmission of information does not constitute an engagement or advocate-client relationship).',
      viewOnMapLabel: 'గూగుల్ మ్యాప్స్‌లో కార్యాలయ స్థానాన్ని చూడండి (View Chamber Location on Google Maps)',
      mapsUrl:
        'https://maps.google.com/?q=Chinnagantyada,+Gajuwaka,+Visakhapatnam,+Andhra+Pradesh+530026',
      copyButton: 'కాపీ చేయండి',
      copiedButton: 'కాపీ చేయబడింది',
      copyAddressButton: 'చిరునామా కాపీ చేయండి',
      directCallLabel: 'కాల్ చేయండి',
      directEmailLabel: 'ఈమెయిల్ పంపండి',
      noSolicitationNotice:
        'ఈ విభాగం కేవలం వాస్తవిక సంప్రదింపు వివరాలను మాత్రమే అందిస్తుంది. ఆన్‌లైన్ అపాయింట్‌మెంట్ బుకింగ్ లేదా సంప్రదింపు ఫారమ్‌లు ఇందులో లేవు.',
    },
    footer: {
      name: 'న్యాయవాది కౌశల్ కిషోర్, M.Sc., LL.B.',
      qualification: 'M.Sc., LL.B.',
      location: 'గాజువాక, విశాఖపట్నం – 530026, ఆంధ్రప్రదేశ్, భారతదేశం',
      shortAddress:
        '26-2-20/1, చైతన్య నగర్, మీ సేవ వెనుక, ఆర్.కె. హాస్పిటల్ లేన్, చిన్నగంట్యాడ, గాజువాక, విశాఖపట్నం – 530026, ఆంధ్రప్రదేశ్',
      disclaimerHeading: 'నిబంధనల గమనిక & వాస్తవిక సమాచార ప్రకటన',
      disclaimerBody:
        'ఈ వెబ్‌సైట్ కేవలం ప్రాథమిక వృత్తిపరమైన మరియు సంప్రదింపు సమాచారాన్ని అందించడానికి మాత్రమే ఉద్దేశించబడింది. ఇది ఎలాంటి ప్రచారం, ప్రకటన, ఆహ్వానం లేదా న్యాయ సలహాగా పరిగణించబడదు.',
      developmentNotice:
        'నిబంధనలు & ప్రచురణ గమనిక: ఈ వెబ్‌సైట్ ప్రచురణ వర్తించే వృత్తిపరమైన నిబంధనలు (బార్ కౌన్సిల్ ఆఫ్ ఇండియా నిబంధన 36 తో సహా) మరియు అవసరమైన ఆమోదాలకు లోబడి ఉంటుంది. ఈ డెవలప్‌మెంట్ ప్రివ్యూ బార్ కౌన్సిల్ ఆమోదం పొందినట్లుగానీ, చట్టపరంగా ధృవీకరించబడినట్లుగానీ పేర్కొనడం లేదు.',
      copyright: `© ${new Date().getFullYear()} న్యాయవాది కౌశల్ కిషోర్. వాస్తవిక సమాచార ప్రొఫైల్.`,
      reviewRule36Button: 'పూర్తి నిబంధనల గమనికను చూడండి',
    },
    modal: {
      title: 'నిబంధనల గమనిక & వివరణ ప్రకటన',
      subtitle: 'వృత్తిపరమైన నిబంధనలు మరియు తుది నిర్ధారణ కోసం వేచి ఉన్న అంశాల ముఖ్య గమనిక',
      acceptButton: 'అంగీకరించి కొనసాగండి (I Agree & Enter)',
      closeButton: 'మూసివేయండి',
      mandatoryEntranceNote:
        'బార్ కౌన్సిల్ ఆఫ్ ఇండియా నిబంధన 36 ప్రకారం, సందర్శకులు తమ స్వంత ఇష్టప్రకారం ఈ వాస్తవిక వృత్తిపరమైన సమాచారాన్ని వీక్షిస్తున్నారని మరియు ఇందులో ఎటువంటి ప్రకటన, వ్యక్తిగత సమాచారం, ఆహ్వానం లేదా ప్రలోభం లేదని ధృవీకరించాలి.',
      paragraphs: [
        'ఈ వెబ్‌సైట్ కేవలం వాస్తవిక వృత్తిపరమైన సమాచార ప్రొఫైల్‌గా మాత్రమే రూపొందించబడింది. ఇందులో ఎలాంటి ప్రచార నినాదాలు, క్లయింట్ సమీక్షలు, కేసుల ఫలితాలు, లేదా అపాయింట్‌మెంట్ బుకింగ్ ఫారమ్‌లు చేర్చబడలేదు.',
        'ఈ వెబ్‌సైట్ ప్రచురణ వర్తించే వృత్తిపరమైన నిబంధనలు (బార్ కౌన్సిల్ ఆఫ్ ఇండియా నిబంధన 36 తో సహా) మరియు అవసరమైన ఆమోదాలకు లోబడి ఉంటుంది. ఈ ప్రివ్యూ బార్ కౌన్సిల్ ఆమోదం పొందినట్లు ఎటువంటి దావా చేయదు.',
        'పేరు, నమోదు వివరాలు (1255/2020), విశాఖపట్నం జిల్లా కోర్టులో ప్రాక్టీస్, భారత సుప్రీంకోర్టు మినహా భారతదేశంలోని కోర్టులలో ప్రాతినిధ్యం, మరియు ప్రాక్టీస్ రంగాలు (కుటుంబ న్యాయం, క్రిమినల్ న్యాయం) న్యాయవాది అందించిన సమాచారం ప్రకారం చేర్చబడ్డాయి. ఇతర సంస్థాగత ప్రస్తావనలు తుది నిర్ధారణ కోసం వేరుగా ఉంచబడ్డాయి.',
      ],
      placeholderSummaryTitle: 'తుది స్పష్టత కోసం వేరుగా ఉంచబడిన ప్రస్తావనలు:',
      placeholderSummaryItems: [
        'విశాఖపట్నం బార్ కౌన్సిల్ (Visakhapatnam Bar Council): విశాఖపట్నం జిల్లా కోర్టు ప్రాక్టీస్‌కు సంబంధించి ప్రస్తావించబడింది; ఖచ్చితమైన అధికారిక సంస్థ పేరు నిర్ధారణ పెండింగ్‌లో ఉంది.',
        'గాజువాక బార్ కౌన్సిల్ (Gajuwaka Bar Council): ధృవీకరించబడిన సభ్యత్వంగా చూపబడలేదు; అధికారిక సంస్థ పేరు మరియు అనుబంధ స్వభావం నిర్ధారణ పెండింగ్‌లో ఉంది.',
        'ఆంధ్రప్రదేశ్ హైకోర్టు (High Court of Andhra Pradesh): సభ్యత్వంగా లేదా అనుబంధంగా చూపబడలేదు; సంబంధ స్వభావం నిర్ధారణ పెండింగ్‌లో ఉంది.',
      ],
    },
  },
};
