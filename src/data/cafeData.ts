export type Locale = 'en' | 'ar';
export type MenuCategoryId = 'all' | 'hot' | 'special' | 'flavours' | 'dessert';
export type SpaceId = 'terrace' | 'bar' | 'library' | 'lounge';

export interface MenuItem {
  id: string;
  category: Exclude<MenuCategoryId, 'all' | 'flavours'>;
  name: string;
  description: string;
  price: string;
  image?: string;
  mobileCategory?: 'hot' | 'specialties' | 'flavours' | 'desserts';
  featuredOnMobile?: boolean;
}

export interface SpaceItem {
  id: SpaceId;
  tabLabel: string;
  icon: string;
  badge: string;
  badgeStyle: 'secondary' | 'primary' | 'neutral';
  title: string;
  description: string;
  mobileSummary: string;
  bullets: string[];
  images: { src: string; alt: string }[];
  mobileImage: string;
}

export interface AmenityItem {
  id: string;
  icon: string;
  title: string;
  shortLabel: string;
  description: string;
}

export interface HeroThumb {
  id: string;
  label: string;
  caption: string;
  src: string;
  alt: string;
}

export interface CafeLocaleData {
  lang: Locale;
  dir: 'ltr' | 'rtl';
  brand: {
    monogram: string;
    name: string;
    mobileName: string;
    subtitle: string;
    fullName: string;
    announcement: string;
    mobileStatusBadge: string;
    hoursShort: string;
    whatsappNumberDisplay: string;
    whatsappDigits: string;
    mapsUrl: string;
    mapsDirectionsTitle: string;
  };
  nav: {
    about: string;
    spaces: string;
    menu: string;
    gallery: string;
    amenities: string;
    reserveCta: string;
    switchLangLabel: string;
    openMenuAria: string;
    closeMenuAria: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineAccent: string;
    headlineEnd: string;
    mobileHeadline: string;
    description: string;
    mobileDescription: string;
    serviceBadges: string[];
    primaryCta: string;
    secondaryCta: string;
    mobileWhatsappCta: string;
    mobileMenuCta: string;
    mobileDirectionsCta: string;
    trustItems: { icon: string; label: string }[];
    collageMainBadge: string;
    collageMainTitle: string;
    collageMainSubtitle: string;
    collageSnaps: { label: string; src: string; alt: string; accent?: boolean }[];
    mobileThumbs: HeroThumb[];
    mobileLocationTag: string;
  };
  identityBar: {
    title: string;
    subtitle: string;
    highlights: { icon: string; label: string }[];
  };
  menu: {
    eyebrow: string;
    mobileEyebrow: string;
    title: string;
    mobileTitle: string;
    subtitle: string;
    pricesNote: string;
    searchPlaceholder: string;
    noResults: string;
    resetFilter: string;
    categories: { id: MenuCategoryId; label: string; mobileLabel: string }[];
    groupMeta: {
      hot: { title: string; note: string; icon: string };
      special: { title: string; note: string; icon: string };
      flavours: { title: string; note: string; icon: string; syrupsTitle: string; sugarFreeBadge: string; sugarFreeNote: string };
      dessert: { title: string; note: string; icon: string };
    };
    items: MenuItem[];
    flavours: string[];
    chalkboard: {
      title: string;
      status: string;
      tapHint: string;
      mobileTitle: string;
      mobileSubtitle: string;
      viewBoardLabel: string;
      hideBoardLabel: string;
      askBaristaCta: string;
      whatsappPrompt: string;
      imageAlt: string;
    };
  };
  spaces: {
    eyebrow: string;
    mobileEyebrow: string;
    title: string;
    mobileTitle: string;
    subtitle: string;
    items: SpaceItem[];
  };
  gallery: {
    eyebrow: string;
    mobileBadge: string;
    overlayEyebrow: string;
    overlayTitle: string;
    title: string;
    mobileTitle: string;
    paragraphs: string[];
    mobileDescription: string;
    mobileTags: string[];
    highlights: { icon: string; title: string; subtitle: string }[];
    imageAlt: string;
  };
  sanctuary: {
    eyebrow: string;
    quote: string;
    subtitle: string;
    cta: string;
  };
  amenities: {
    eyebrow: string;
    mobileEyebrow: string;
    title: string;
    mobileTitle: string;
    subtitle: string;
    items: AmenityItem[];
    locationHub: {
      eyebrow: string;
      mobileEyebrow: string;
      title: string;
      address: string;
      satThuLabel: string;
      satThuHours: string;
      satThuHoursShort: string;
      friLabel: string;
      friShortLabel: string;
      friHours: string;
      friHoursShort: string;
      whatsappCta: string;
      mapsCta: string;
      mobileMapsCta: string;
      reserveBtnCta: string;
      directLineNote: string;
    };
  };
  footer: {
    aboutText: string;
    exploreTitle: string;
    exploreLinks: { label: string; href: string }[];
    hoursTitle: string;
    locationLabel: string;
    locationValue: string;
    satThuLabel: string;
    satThuValue: string;
    friLabel: string;
    friValue: string;
    directLabel: string;
    parkingNote: string;
    copyright: string;
    bottomLocation: string;
    mobileDockWhatsapp: string;
    mobileDockDirections: string;
  };
  reservationModal: {
    title: string;
    subtitle: string;
    guestNameLabel: string;
    guestNamePlaceholder: string;
    guestsLabel: string;
    spaceLabel: string;
    dateLabel: string;
    timeLabel: string;
    phoneLabel: string;
    phonePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitCta: string;
    submittingLabel: string;
    sendWhatsappCta: string;
    confirmationTitle: string;
    referenceLabel: string;
    yourReservationsTitle: string;
    noReservationsNote: string;
    cancelButton: string;
    closeButton: string;
    newInquiryButton: string;
  };
}

// Authentic Jungle Fever Cafe photographs from the Stitch design exports
export const CAFE_IMAGES = {
  terraceMain:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB20qFrfpzsWMJKsu4OZpLztAq_viPP_sIxnme6eMr7BMAlXNzoH2GxVGcnUBcT_9Z52Q7rkIjxqEC8rIexR6SlciW534jWmyLnttKaaZkGInPgHkPUG7sJq8v4ULFBJrBOc3QYZAgYiitoa9-aJfsguGqZaPMPl5tsAQU9jWlQNc9AgqGPf86EyD8g885tGhRl5JR1-uA84NerN0jnlwdiAxEe7BY53KiB8Lcp1LWcfFD3Opo1vhjtzA',
  terraceMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUNr_YZSG_NgNAdYurcABpVqY06t8VKPtCpLYEpxHyQFup7c7BtpMqA7q5raI08YKUyAQYtelz7qX9LxCSRr5RkGOdTxrXDiQ0U9R30-uD_25j4AqayXtQR_r5HzFV5zlEe_yGv70EbyZOJvxyAtwUGz8sACxCC4juT8Zxywt_3-776AWi2wxIfnRaAn6flOOKi-l3-PaZhx4VjhJDIXSPfzbNUgQhferzpicPMN2rk81lmOdlvJhu5A',
  skyline:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBhX1T4_h8-z6O_c5oCgtKlPQRufKEcD9UuLHDmQIfSZiZGZQ2zleOT8bo6yB8Kom8S7jXoWpAaTEJq-5RBPa_CwfWFCnT0Dr3OlYfWFzhr0arj926oa57gbSLhE2pI-4uS06VGd9nc1A0hzmLXFRE7FO3KNUdQUXVP_FSOq7Qme2xHWLabaGn7GmMwisQzMI-H7u5m_tHb6DyflMhrxRnKQSZgOFaaKEk-qzpzix_wiL3JIVHLd9LmSg',
  skylineMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlVELAV0pTyc0BE8Lzxsmk7K6xaCm1OLmuxZjDmXz8aw9pgb_slkhHZKyhUQmSe_Z6nUe4NueKDLNvsfw_9JSXceASGcUXBP5DDT0h6FO1RmjmXG_lSb8W_h2ZljtZb9_dBqMrQOjgLjn6REv4RTgDqBC0aAE1EpI-lgdZRYVCHECwrVo1CguC5XgHc-N1wSB0hTplFuml8uZMbBlMiF_jnHU6vl3winh2GWL9UymFo2ZGRIuj-x88tw',
  exterior:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAXr0uXPTBBAZd9w8X-L3o0Evtft40bJYwJ8KG7uFvhFwTO-mSxR0kocTHG405jP5pLro2qnknOqdE9_qwE24eNBi1tKxzEHlBwwRHdHHiZE9GjAwxXVv4z8Kv74qhAnvUOrJoqbBvfIrhKCAg9Fm9G5-OYcnlVaH8m0It7KM-58cGV4gyT-KrOG6cZNpohTZBtTrbb_FJ8GObRA69jlJ2J5GblOh_ZKyjAyPNSNzwJuX9Qs2gFBRm5aA',
  exteriorMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB5mQ7SZ4T1KkTuH5Re80ePG5PANX9qD4m-D9_X9UJ-9I5VqE-i4tWr6n4PolBj7FeZl8sdaAjmt4yex82E8B3jLUFg-aVgpqDS1xVDXFi668DcaXMIq1Tu_6kCQ383Vqm2iI5PE3hptoYsHq0mv-0CYoSq-Zzm5uDSX9OkHcaBy2eBLjJxF0Y0UNIxYM1AB9XUu0Clyu8KQgs1AOpaEONypSVfCZURkx2XZJJzNOQxxgxWSKO9VNxN4w',
  tiramisu:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCDDHmU45kvY8v9nI6SKpaUJ5oFEQHsrkHlZBFWbHuUEZCdyE3e2k1SOWyMdZm9DX4apBRQLYNbonUR6SirOZQ7zxbGp72NtH9nVsLbrbmrFmotNoRkavUKg2eVZmvuWBpUOHyZ64BJfKwS4f2ub4RkJuGEcXND4QDYYVxxeum4j0l_YEwzl1qkoyjRcllh7kW6l6CdJDebx2h9xyK9W6rShXuvCDdLkn0IwfzWF62aKL66wzNnFHJcnQ',
  tiramisuMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCCpqEDJZMIW7He41TGuZkmepK2pyPJ013V_MSwGlYC4nb0_2awxLocrYM5PviFAo94aOJs63eQjG1dW0EM_J14oRa9uRlruW3LgqRhyj0JJNpGYa5uM3SzaBDhRmem3Dpj1RowLpAutjE1qYUC4ThvB04NpJhkxrd15fhSIQnWHvrxKWouKKea_5EUb0gtKwBfQxt6jfCjin7d5mqOcZvA9VU2Sr6mh3YlwUXgSBxpJ8w8s_4_kw3iDg',
  chalkboard:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJNzWBQVhfcNl-8GUE88o3AdZFVG8nF9vmahy5C6yp_PMznEFDKCtKsYV103s3k1P0tgQeI7WcsePjRmGROzeZPi1AfODeJjEFrJave36QJJl52a2IRqsQ4zHJWjLwQMlru_VLfHAGvfh8oksaAvfEEwe2_kBnAJA-IYgZ6IuC_6m33pxsKAk0HcJGONKvGU-T7u8j-gnHY6ZtcS_sy8O4mf4AzDryndXgMbiazY8pcVqUCVjfU24GgA',
  chalkboardMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCPFVBN2mMuz8mEafFphB6sq4Y56l-dA_rUTNIKhjInHMjSgOX2fX1ydVpHCKTMfSDXf-SJV5wvhGP1bKSJL5l0Oc2CYGSdP1jKZEfPzhOTvNUOz4UNBPvIAyD20wHRqhSXgPjEqB1gOS2tZ7zD-0fnT4SLhuSrhAzec7LvTlowGlwkLHJ9NK7zIFJ5WHSIrXx5wbnBBi2WydMfM0dlZZTgHo4nD-D9u4y_5wq-KRaA6vbJtOsISF6EFw',
  barMural:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDeqmz9cS9hNTa2tWl7KNL8l5N3j3IzNtJ1WaTzX2hty6nmwqkC9Nd0kE16iBvrfBNXT-ByEvQDy4EqVUjxFfguvStilQkinmF93OrbfTuYqnwVYNYboz1BRVCTVU1XoIVlo2p6sv2dCyTNvJz5acLw0mkP0DSnMe2woZPUfUqTHs9WlQvVchNAHhLx9ZifMUGjRYAuvMAWRKflaG7PAGUSGi2MDf_64fTQLG1Yufu4KeOSyjfws7rFwQ',
  barMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAdxKELzSVzV0nFUv6mWb1xZunWWIcPQAw8-GkaYcdDrEebSVZ5plCEAjN6WgmWJFVIIcGp-m84_ysSnqSV1v0hO5gTDQGnsVRLm5u1jKftnN57V41f6ZKVZO0_ggHLJFXnlKDRD6f4nuix-wLA4KZn8VBSkzYDrwvGHFCA58FwyQ7QyRZU2HP5xnKDY4592MMV9C9tIU1N7E5JH9vuBN0J8Z2XU8U-O9NEY_RJ-O0z2WlQtpnWehM_3Q',
  mezzanine:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBEc9snL0T3JkdIii6ABcB-8Qs8bb77-j-dhJG9xtQDPjHwbpR2QSn4D00a_3eylukdMBORKQbOyMlPnlt2_lbG1LwCdWuveOJi4kFMULxSAwd_5CJczFyuioVHnMl-puC4p1rEpwPuTezoK6QfXDZqwA_EueTUpBs_3DSj8ydt6PfQZ8CHZKpxaK3AbFuZ0ggIRPhI2mrq1veWQMFeDPdRk2qXNs13lhyfRCNiuk2bcZSA8fRtJmA42w',
  libraryMain:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwLVJ0TWMc-bqvyrByfQDyQgBLyXkxrIXSiVpcvdhqhdeMoHVI1S0-DuZWXJQrd2aIte9s9sspCt5975TFVg3y6BUEAtSwOYCKzZNXgknOd0c_uCrEUFk5unWuhpPXZtITb_W4f3_8gBoR0jHZBkdMF8qNYcJy0eJV7NmUSZ_a74Jbb3xZoVRyTzQwbLVZgULAWN9itJ0ACs5t0cRHZgnRcm4gwUj5XveYvXKnvD9Uyxv5XNBAt8OLg',
  libraryMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRcXWZQInWOf0ohdGqS4hccBjwQtLdU4C0ioopoaKLoTcS4vgrpzC_Q3nC-lFwcBXEZ7yMA6MbAMXzdQ7HwewWc438U9UMhTsOnZhHsXgJ1Oe8-lFzQutpL-5-oVgeshSgcKQ6P__HyNM-sGFDlCw2Mj0qVxZfLxN_4SfEdU2lnb8jK4x85G75BMQqunh6JUp2DqnZCnYphYDzHU0CDRy8d8U_9XYYBCeTK2Cjca6jIRvw8GYjZXhSxQ',
  libraryDesk:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCBR3xQOJf9OT9H9MQh6zohvyLYFcox93S4Lzvjr-J3DvTKenM_y_DTtUuDIo156O0DSukthM6zroWPk1AGWuHqlysCgrZE-4hBAAQhzW9IxWxz7u2H1lvkakQlyXyF3U5TsWGJk9z1N1zLevJqPGDR-QgyKjR1ZrdHOsQxvIY_Ym6-01UcV9KAOfLrhJchXGg1eBtLvrzD2bWC5ShAcrtyb52AV8gDlr1VL-In-B7gMbBZSdTwSEqFBw',
  libraryCushions:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAOvUnvBRWNK4THVeR2wfS_cNAIRGjL7OYnjk5Z5NqW6DbWdATIP0RuP4up0Q11i01huqsatUd9URvKvtYFrEC7YG8-NELlHYvXh3IuQPYHrVm2NrVjl7YuAqTS8BlGjkXGknvep73FhgjS2GFQmNxNK7y4goleaGQWoVpHJpPj60fsPsVIwCXRtt5rPE0gxvmeMfhwpOAeF387YrZKWMkwqyskRBwLX6GgiyeDXMp0oAnl_93mRMQSgw',
  loungeCushions:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBwQe91QD3oXgdgE9YJMTvOaGCM4qeOYNY-yzt70TVzgwg9LSMrlpycqhVGceimjPO7DYQbSikM5_MCQVLUyUh7G-nBtFQMlQTZLSxclVRpXfGojLEfGj1snCSKwnXhQY8oXzdUnqGM8ZQW5orJ0nh6g8nrFDG30DAksblzu4UJDY9pnvv1xghfjoz5MxZoeHN3UETEAUzbWYL4svF4-etKQ2Nq78Ai8VNXxWzQAmzITpYnDb-9U9w02A',
  loungeCorridor:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD0ugLWJKuz0e0pNJGSrjv5fCxSLsJkg0xkD8T3Y8NdA-8k3hkyLDAs_k6BOPvFkGpS5dopPQBK5YjELgzpVIHbX_rDH7I6o2VG-FP39r0WtoxCRzS4dBOMeHFGGEzfX0_ZPu2TDDEA4p4jMuyI2-e46nc_y--uj7YruP5xk8c80koUfunjyQDZq2oz6wCizq143IwWKu8VYT5fKgIw6HvuGTyuJIS5osWejL7wzJ9lEsLpI2yNf2-l-g',
  loungeMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAM-b2B3YP2QR1cklFXLnEeOKnhupZQqYZdZCZX8s0dN9T1bPZ1zRtlD3sHClVD_QmSuW6qmUyPEMl7H8QFFZXPUG1do1EiTEXAYxiRss94YUVUiMPLRIy0lF4mAM7Jk8m-6Oh9Puru1_00Qi-qcmFcm7w0FuYVsdadr2znqvYELk3MfDEXDhy9RtJEzx3nno_rJHa-pjZVmLPPuovQASuFKHbyFwRVPPBMMQyMBf_2DwrIM43N3p9Qgw',
  galleryHall:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCj4UU8YzcbAQ8Pxg2yQwh8ad8w_eqT6q_5H7O2bAZ6g3F4RQz2xqLE0mUFVKKrb_U0ZsjWVRdOvhgACzIzhZlgtucx6oXJPtTJZPNmS5YCenvgTLv09zi0r2nGe85Ok230WdUB6wI-RzNrnzTtpyH1VM_nVZPduMFE4iMkbAuvr4Pn2L8oei3_d4fYi_DFp_3ckRq6OreKv1i0oNJ0Uam2Nf7lpt9nAtSfqsnbQcy39zd-SIUom-JdEg',
  galleryMobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBh9ato_JiP9PJf7Z-0JLT3_5fSb9G5X8e8qDDO8UUqK-u_NBrmmmNyS2Yh9QztNuK-ki_wic0qtbPfuRDxdmYk7tPn5sRqIS3d9WCE55a785S1WeKD2g3X6Zqq9zxHHJJUaa2txDofFiNzn7aSrGPpF7Vbko7CQ3XFOg10LuuYLrChAX0lBCN5WKjtg_Uc5IVxfUN9A8Xe9zzE5IdajiRhc_nuQwKQVBLhtqaC0r85Dl8R8Qz4Ql7IzA',
  botanicalBg:
    'https://lh3.googleusercontent.com/aida/ALJJyrBEoHt3lI1O9txqEXH4Y_sHEbUFggkH8D8VEnMCHM_rigT7UBMVpl2licEQ4g0QJJptp2Gxq_C7TZOpaADtly2O8EoLOrH8RAEfz0c_dDRurf_K7c4DemvXF3m-sPQ-PeY02rWdhlx4afaUH_RBWRF2Qohne9BkGsJGUzME7LKEztyiLwzjKXn4i7eCVWjGECMsT-gl717vjA01RvRSgQRRhgNRDKpfHcXkcD6IavvXIg',
} as const;

export const CAFE_CONTENT: Record<Locale, CafeLocaleData> = {
  en: {
    lang: 'en',
    dir: 'ltr',
    brand: {
      monogram: 'JF',
      name: 'Jungle Fever',
      mobileName: 'Jungle Fever',
      subtitle: 'Coffee & Tea House • Rooftop',
      fullName: 'Jungle Fever Coffee & Tea House',
      announcement: 'Open Today at the Jordan National Gallery of Fine Arts Rooftop • Jabal Al-Weibdeh',
      mobileStatusBadge: 'Open Today • National Gallery Rooftop',
      hoursShort: 'Sat–Thu: 9:30 AM – Midnight | Fri: 12:30 PM – Midnight',
      whatsappNumberDisplay: '07 7599 9303',
      whatsappDigits: '962775999303',
      mapsUrl: 'https://maps.google.com/?q=Jordan+National+Gallery+of+Fine+Arts+Amman',
      mapsDirectionsTitle: 'Google Maps Directions',
    },
    nav: {
      about: 'Our Story & Sanctuary',
      spaces: 'The Spaces',
      menu: 'Artisan Menu',
      gallery: 'The Fine Arts Gallery',
      amenities: 'Visitor Guide',
      reserveCta: 'Reserve via WhatsApp',
      switchLangLabel: 'العربية',
      openMenuAria: 'Open navigation drawer',
      closeMenuAria: 'Close navigation drawer',
    },
    hero: {
      eyebrow: 'Rooftop • Jordan National Gallery of Fine Arts',
      headlineLine1: 'Amman’s Scenic',
      headlineAccent: 'Rooftop Oasis',
      headlineEnd: 'of Art, Books & Coffee.',
      mobileHeadline: 'Amman’s Scenic Rooftop Oasis of Art, Books & Coffee.',
      description:
        'Perched above the historic National Gallery of Fine Arts in bohemian Jabal Al-Weibdeh. Bask in open-air terrace breezes, a tranquil sunlit library study salon, artisan coffee, and breathtaking panoramic views over the old city and park canopy.',
      mobileDescription:
        'Unwind on our open-air terrace overlooking Jabal Al-Weibdeh, settle into the quiet library study salon, and sip artisan coffee above the National Gallery.',
      serviceBadges: ['Dine-in Rooftop Terrace', 'Library & Study Salon', 'Artisan Takeout', 'Private Gatherings'],
      primaryCta: 'Explore Chalkboard Menu',
      secondaryCta: 'WhatsApp: 07 7599 9303',
      mobileWhatsappCta: 'Message on WhatsApp (07 7599 9303)',
      mobileMenuCta: 'Explore Menu',
      mobileDirectionsCta: 'Get Directions',
      trustItems: [
        { icon: 'wifi', label: 'Free High-Speed Wi-Fi' },
        { icon: 'local_parking', label: 'Free Gallery Parking' },
        { icon: 'accessible', label: 'Wheelchair Accessible' },
      ],
      collageMainBadge: 'Rooftop Seating',
      collageMainTitle: 'Breezy Terrace & City Vista',
      collageMainSubtitle: 'Overlooking Weibdeh Park & Blue Domes',
      collageSnaps: [
        {
          label: 'Skyline View',
          src: CAFE_IMAGES.skyline,
          alt: 'Panoramic Amman skyline view from Jungle Fever cafe terrace',
        },
        {
          label: 'Gallery Rooftop',
          src: CAFE_IMAGES.exterior,
          alt: 'Exterior view of Jungle Fever perched atop the Jordan National Gallery of Fine Arts building',
        },
        {
          label: 'House Tiramisu',
          src: CAFE_IMAGES.tiramisu,
          alt: 'Handcrafted signature Tiramisu on patterned ceramic plate at Jungle Fever',
          accent: true,
        },
      ],
      mobileLocationTag: 'Jabal Al-Weibdeh',
      mobileThumbs: [
        {
          id: 'terrace',
          label: 'Terrace',
          caption: 'Rooftop Terrace • Golden Hour',
          src: CAFE_IMAGES.terraceMobile,
          alt: 'Jungle Fever Cafe rooftop terrace',
        },
        {
          id: 'skyline',
          label: 'Skyline',
          caption: 'Weibdeh Skyline View',
          src: CAFE_IMAGES.skylineMobile,
          alt: 'Amman skyline view from terrace',
        },
        {
          id: 'exterior',
          label: 'Exterior',
          caption: 'National Gallery Exterior',
          src: CAFE_IMAGES.exteriorMobile,
          alt: 'Jordan National Gallery exterior rooftop',
        },
        {
          id: 'tiramisu',
          label: 'Tiramisu',
          caption: 'House Jungle Fever Tiramisu',
          src: CAFE_IMAGES.tiramisuMobile,
          alt: 'House Jungle Fever Tiramisu',
        },
      ],
    },
    identityBar: {
      title: 'Directly Atop The National Gallery of Fine Arts',
      subtitle: 'Explore modern Arab and international art exhibitions downstairs before your coffee.',
      highlights: [
        { icon: 'nature_people', label: 'In Weibdeh Arts Park' },
        { icon: 'menu_book', label: 'Working Art Library' },
        { icon: 'local_cafe', label: 'Specialty Hot & Cold Brews' },
      ],
    },
    menu: {
      eyebrow: 'Authentic Blackboard Selections',
      mobileEyebrow: 'Freshly Brewed',
      title: 'Specialty Coffee, Tea & Desserts',
      mobileTitle: 'Chalkboard Menu',
      subtitle:
        'Hand-prepared by our passionate baristas with single-origin beans, authentic Turkish pots, and slow-steeped loose leaves. All prices in Jordanian Dinars (JOD).',
      pricesNote: 'Prices in JOD',
      searchPlaceholder: 'Search drinks, teas, or desserts...',
      noResults: 'No menu items match your search.',
      resetFilter: 'Show All Items',
      categories: [
        { id: 'all', label: 'All Items', mobileLabel: 'All' },
        { id: 'hot', label: 'Hot Drinks', mobileLabel: 'Hot Drinks' },
        { id: 'special', label: 'JF Specialities', mobileLabel: 'JF Specialties' },
        { id: 'flavours', label: 'Add Flavours', mobileLabel: 'Flavours' },
        { id: 'dessert', label: 'Desserts & Bakes', mobileLabel: 'Desserts' },
      ],
      groupMeta: {
        hot: { title: 'Hot Drinks', note: 'Single / Double (JOD)', icon: 'local_cafe' },
        special: { title: 'JF Specialities', note: 'Signature Craft', icon: 'star' },
        flavours: {
          title: 'Add Flavours & Modifiers',
          note: '+0.5 JOD per shot',
          icon: 'tune',
          syrupsTitle: 'Flavour Syrups & Botanical Spices (+0.5 JOD):',
          sugarFreeBadge: 'Sugar Free Available',
          sugarFreeNote:
            'Sugar Free Vanilla, Caramel & Hazelnut options readily available. Oat & Almond milk on request.',
        },
        dessert: { title: 'Signature Desserts & Bakes', note: 'Baked Daily', icon: 'bakery_dining' },
      },
      items: [
        {
          id: 'espresso',
          category: 'hot',
          name: 'Espresso',
          description: 'Rich golden crema, balanced arabica profile',
          price: '2.0 / 2.5 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'turkish-coffee',
          category: 'hot',
          name: 'Turkish Coffee',
          description: 'Traditional finjan with aromatic cardamom option',
          price: '2.0 / 2.5 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'americano',
          category: 'hot',
          name: 'Americano',
          description: 'Hot water pour over double espresso',
          price: '3.0 JOD',
        },
        {
          id: 'filtered-coffee',
          category: 'hot',
          name: 'Filtered Coffee',
          description: 'Slow batch brew, light and nuanced cup',
          price: '3.0 JOD',
        },
        {
          id: 'cappuccino',
          category: 'hot',
          name: 'Cappuccino',
          description: 'Thick velvety microfoam with cocoa dust',
          price: '3.0 JOD',
        },
        {
          id: 'flat-white',
          category: 'hot',
          name: 'Flat White',
          description: 'Double shot topped with glossy silky steamed milk',
          price: '3.0 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'latte',
          category: 'hot',
          name: 'Latte’',
          description: 'Creamy steamed milk balanced with rich espresso',
          price: '3.0 / 3.5 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'espresso-macchiato',
          category: 'hot',
          name: 'Espresso Macchiato',
          description: 'Stained with a dollop of hot milk froth',
          price: '2.5 / 3.0 JOD',
        },
        {
          id: 'caramel-macchiato',
          category: 'hot',
          name: 'Caramel Macchiato',
          description: 'Espresso over vanilla milk drizzled with caramel',
          price: '3.5 / 4.0 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'mocha',
          category: 'hot',
          name: 'Mocha',
          description: 'Decadent chocolate ganache with espresso',
          price: '3.5 / 4.0 JOD',
        },
        {
          id: 'cinnamon-ginger-milk',
          category: 'hot',
          name: 'Cinnamon / Ginger Milk',
          description: 'Warming steamed milk infused with real spices',
          price: '2.5 / 3.0 JOD',
        },
        {
          id: 'hot-tea-pot',
          category: 'hot',
          name: 'Hot Tea (Pot Selection)',
          description: 'Botanical herbal tisanes, black & green leaves',
          price: '3.0 JOD',
        },
        {
          id: 'indian-frappe',
          category: 'special',
          name: 'Indian Frappé',
          description: 'Chilled whipped spiced coffee froth with condensed milk',
          price: '3.5 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'greek-frappe',
          category: 'special',
          name: 'Greek Frappé',
          description: 'Classic Mediterranean iced foam coffee with crisp finish',
          price: '3.5 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'masala-hot-chocolate',
          category: 'special',
          name: 'Masala Hot Chocolate',
          description: 'Dark rich cocoa slow simmered with cardamom, clove & ginger',
          price: '3.0 / 3.5 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'freddo',
          category: 'special',
          name: 'Espresso Freddo & Cappuccino Freddo',
          description: 'Shaken chilled double espresso over ice with whipped cold milk',
          price: '3.5 JOD',
        },
        {
          id: 'iced-turkish',
          category: 'special',
          name: 'Filtered Iced Turkish',
          description: "Jungle Fever's inventive chilled extraction of Turkish roast",
          price: '3.5 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'iced-tea-lemonade',
          category: 'special',
          name: 'Fresh Iced Tea & Pink Lemonade',
          description: 'House-brewed botanical tea infusion and freshly squeezed citrus',
          price: '3.0 JOD',
          featuredOnMobile: true,
        },
        {
          id: 'tiramisu',
          category: 'dessert',
          name: 'Jungle Fever Tiramisu',
          description: 'Our house-made classic with ladyfingers, rich mascarpone cream, and Jungle Fever espresso soak.',
          price: '4.5 JOD',
          image: CAFE_IMAGES.tiramisu,
          featuredOnMobile: true,
        },
        {
          id: 'cheesecakes-tarts',
          category: 'dessert',
          name: 'Artisan Cheesecakes & Tarts',
          description: 'Seasonal rotation of pistachio, lotus, and lemon passionfruit tarts served with fresh tea.',
          price: '4.0 JOD',
        },
      ],
      flavours: [
        'Vanilla',
        'Caramel',
        'Hazelnut',
        'Toffee Nut',
        'Chai Tea',
        'Cinnamon',
        'Ginger',
        'Green Mint',
        'Maple Spice',
        'Pumpkin Spice',
      ],
      chalkboard: {
        title: 'In-Store Chalkboard',
        status: 'Live Weibdeh Counter',
        tapHint: 'Tap to view original handwritten counter menu',
        mobileTitle: 'Real Handwritten Chalkboard',
        mobileSubtitle: 'Tap to peek at today’s board',
        viewBoardLabel: 'View Board',
        hideBoardLabel: 'Hide Board',
        askBaristaCta: 'Ask Barista on WhatsApp',
        whatsappPrompt: "Hi Jungle Fever, I'd like to ask about today's fresh dessert and coffee specialties.",
        imageAlt: 'Handwritten blackboard menu of Jungle Fever showing hot drinks, flavours and JF specialties',
      },
    },
    spaces: {
      eyebrow: 'Four Unique Ambiances',
      mobileEyebrow: 'Four Ambiances',
      title: 'The Spaces of Jungle Fever',
      mobileTitle: 'The Spaces',
      subtitle:
        'Whether you seek sunny rooftop breezes, a quiet library study table with power outlets, vibrant counter energy, or floor cushions by the panoramic windows.',
      items: [
        {
          id: 'terrace',
          tabLabel: 'The Rooftop Terrace',
          icon: 'wb_sunny',
          badge: 'Open-Air & Shaded Terrace',
          badgeStyle: 'secondary',
          title: 'Breathtaking Vistas Over Jabal Al-Weibdeh',
          description:
            'Step out onto the open-air deck atop the National Gallery building. Framed by canopy sails and panoramic glass facades, watch the sun set over Amman’s stone hills, minarets, church steeples, and the modern Abdali towers while sipping a cold Freddo or hot mint tea.',
          mobileSummary: 'Open-air seating with sweeping views of Jabal Al-Weibdeh.',
          bullets: [
            'Shaded awning tables & open breeze banquettes',
            'Golden hour & sunset views across the Weibdeh valley',
            'Perfect for intimate conversations, coffee dates, and photography',
          ],
          images: [
            { src: CAFE_IMAGES.terraceMain, alt: 'Rooftop terrace exterior tables' },
            { src: CAFE_IMAGES.skyline, alt: 'Skyline view over Amman from Jungle Fever terrace' },
          ],
          mobileImage: CAFE_IMAGES.terraceMobile,
        },
        {
          id: 'bar',
          tabLabel: 'Art & Coffee Bar',
          icon: 'palette',
          badge: 'Vibrant Interior Bar',
          badgeStyle: 'primary',
          title: 'The Colorful Bohemian Bar & Mezzanine',
          description:
            'Centering the cafe is our iconic, hand-painted floral mural wall, warm stone tile accents, and artisanal wood espresso bar. Watch our baristas grind fresh beans, display chilled refreshments, and craft intricate latte art beneath warm suspended glass lamps.',
          mobileSummary: 'Watch your espresso pulled beside rotating local artworks.',
          bullets: [
            'Handcrafted board games & community book exchange',
            'Freshly packaged whole-bean micro-lots available to take home',
            'Mezzanine atrium view connecting the cafe levels',
          ],
          images: [
            { src: CAFE_IMAGES.barMural, alt: 'Vibrant counter with hand-painted mural wall' },
            { src: CAFE_IMAGES.mezzanine, alt: 'Mezzanine level overlooking the cafe bar' },
          ],
          mobileImage: CAFE_IMAGES.barMobile,
        },
        {
          id: 'library',
          tabLabel: 'Gallery Library & Study',
          icon: 'menu_book',
          badge: 'Study & Laptop Oasis',
          badgeStyle: 'neutral',
          title: 'Floor-to-Ceiling Art Books & Focus Desks',
          description:
            "A haven for Amman's architects, writers, designers, and students. Embedded within the gallery’s public art reference library, this room provides generous wooden tables, dedicated reading lamps, power outlets, and peaceful natural daylight streaming from overhead skylights.",
          mobileSummary: 'Quiet, sunlit tables ideal for reading, sketching, or remote work.',
          bullets: [
            'Extensive curated collection of art, history & design monographs',
            'Silent laptop zones with accessible power outlets',
            'Warm wooden reading desks and cozy floor cushion nooks',
          ],
          images: [
            { src: CAFE_IMAGES.libraryMain, alt: 'Sunlit library study with readers and books' },
            { src: CAFE_IMAGES.libraryDesk, alt: 'Bookshelves and quiet wooden desk' },
            { src: CAFE_IMAGES.libraryCushions, alt: 'Cozy reading corner with colorful floor cushions' },
          ],
          mobileImage: CAFE_IMAGES.libraryMobile,
        },
        {
          id: 'lounge',
          tabLabel: 'Sunlit Sunken Lounge',
          icon: 'weekend',
          badge: 'Boho Window Lounges',
          badgeStyle: 'secondary',
          title: 'Traditional Embroidered Cushions & Park Views',
          description:
            'Relax on our signature low benches wrapped in authentic Levantine patterned textiles and vibrant poufs. Floor-to-ceiling windows immerse you in the lush greenery of the surrounding park while protecting you in climate-controlled comfort all year round.',
          mobileSummary: 'Cozy cushioned corners bathed in warm afternoon light.',
          bullets: [
            'Large panoramic glass bays overlooking Weibdeh art park',
            'Embroidered ethnic floor seating and low rustic coffee tables',
            'Perfect for groups, book club circles, and tea pots',
          ],
          images: [
            { src: CAFE_IMAGES.loungeCushions, alt: 'Bohemian window lounge with colorful patterned cushions' },
            { src: CAFE_IMAGES.loungeCorridor, alt: 'Sunlit wooden floor corridor with window seating' },
          ],
          mobileImage: CAFE_IMAGES.loungeMobile,
        },
      ],
    },
    gallery: {
      eyebrow: 'A Cultural Destination in Amman',
      mobileBadge: 'Downstairs',
      overlayEyebrow: 'Downstairs Exhibition Hall',
      overlayTitle: 'The Jordan National Gallery of Fine Arts',
      title: 'Where Specialty Brews Meet Contemporary Fine Art.',
      mobileTitle: 'Jordan National Gallery of Fine Arts',
      paragraphs: [
        'Jungle Fever was conceived as a living cultural salon situated directly atop Jordan’s foremost fine arts institution. Established under the Royal Society of Fine Arts, the museum downstairs houses an extraordinary collection of over 3,000 works from the Arab and Islamic world.',
        'Combine an afternoon of world-class contemporary exhibitions, sculpture garden walks, and quiet inspiration with our signature Masala hot chocolate or a crisp pour of Ethiopian micro-lot on the terrace above.',
      ],
      mobileDescription:
        'Pair your coffee with a stroll through contemporary Arab & international art downstairs, a free sculpture garden & park, and step-free elevator access straight to our rooftop.',
      mobileTags: ['Free Sculpture Park', 'Step-Free Elevator'],
      highlights: [
        { icon: 'explore', title: 'Park & Sculpture Garden', subtitle: 'Lush green pathways just outside' },
        { icon: 'elevator', title: 'Elevator to Rooftop', subtitle: 'Full step-free accessibility' },
      ],
      imageAlt: 'Jordan National Gallery of Fine Arts spacious exhibition hall downstairs with contemporary paintings and sculptures',
    },
    sanctuary: {
      eyebrow: 'Sanctuary Experience',
      quote: '“A tranquil green refuge above the heartbeat of Jabal Al-Weibdeh.”',
      subtitle: 'Surrounded by potted monsteras, hanging ferns, soft jazz, and the rhythmic sound of espresso grinders.',
      cta: 'Plan Your Visit Today',
    },
    amenities: {
      eyebrow: 'Plan Your Day',
      mobileEyebrow: 'Plan Your Visit',
      title: 'Visitor Information & Amenities',
      mobileTitle: 'Amenities & Location',
      subtitle: 'Everything you need to know before visiting our rooftop cafe and library.',
      items: [
        {
          id: 'wifi',
          icon: 'wifi',
          title: 'High-Speed Free Wi-Fi',
          shortLabel: 'Free High-Speed Wi-Fi',
          description:
            'Ultra-fast and reliable connection throughout the indoor salon, library desks, and rooftop terrace. Perfect for remote work, study sessions, and video calls.',
        },
        {
          id: 'study',
          icon: 'laptop_mac',
          title: 'Laptop & Study Friendly',
          shortLabel: 'Laptop & Study Friendly',
          description:
            'Equipped with convenient electrical sockets, wide wooden study tables, and a dedicated quiet library ambiance tailored for concentration and reading.',
        },
        {
          id: 'parking',
          icon: 'local_parking',
          title: 'Free Dedicated Parking',
          shortLabel: 'Free Dedicated Parking',
          description:
            "Enjoy a hassle-free visit with the Jordan National Gallery's free private parking lot directly adjacent to the building, plus calm neighborhood street parking.",
        },
        {
          id: 'accessibility',
          icon: 'accessible',
          title: 'Wheelchair Accessible & Elevator',
          shortLabel: 'Wheelchair & Elevator',
          description:
            'Step-free ramp entry into the National Gallery building and modern elevator service directly up to the rooftop cafe, indoor salons, and restrooms.',
        },
        {
          id: 'payments',
          icon: 'payments',
          title: 'Payment Flexibility',
          shortLabel: 'Card / NFC / Cash',
          description:
            'We welcome Visa, Mastercard, contactless NFC smartphone payments, CLIQ transfers, and cash in Jordanian Dinars with zero minimum transaction fee.',
        },
        {
          id: 'events',
          icon: 'groups',
          title: 'Gatherings & Private Events',
          shortLabel: 'Private Gatherings',
          description:
            'Host private book clubs, creative workshops, corporate off-sites, and sunset receptions on our terrace or mezzanine. Inquire directly via WhatsApp.',
        },
      ],
      locationHub: {
        eyebrow: 'Find Us in Jabal Al-Weibdeh',
        mobileEyebrow: 'Jabal Al-Weibdeh, Amman',
        title: 'Jordan National Gallery of Fine Arts Rooftop',
        address: "Hosni Fareez St. / Ba'ouniyah St., Jabal Al-Weibdeh, Amman, Jordan. Directly overlooking the National Gallery Park.",
        satThuLabel: 'Saturday – Thursday',
        satThuHours: '9:30 AM – 12:00 AM (Midnight)',
        satThuHoursShort: '9:30 AM – 12:00 AM',
        friLabel: 'Friday Gathering',
        friShortLabel: 'Friday',
        friHours: '12:30 PM – 12:00 AM (Midnight)',
        friHoursShort: '12:30 PM – 12:00 AM',
        whatsappCta: 'Message on WhatsApp: 07 7599 9303',
        mapsCta: 'Open in Google Maps (Free Parking Lot)',
        mobileMapsCta: 'Open in Google Maps',
        reserveBtnCta: 'Reserve Table or Gathering',
        directLineNote: 'Phone Direct: 07 7599 9303 • Takeout & Dine-in Available',
      },
    },
    footer: {
      aboutText:
        'Perched atop the Jordan National Gallery of Fine Arts in Jabal Al-Weibdeh. A botanical haven for specialty roast lovers, loose-leaf teas, tranquil reading, and panoramic sunset terraces.',
      exploreTitle: 'Explore',
      exploreLinks: [
        { label: 'The Rooftop Terrace', href: '#spaces' },
        { label: 'Art Gallery Reference Library', href: '#spaces' },
        { label: 'Specialty Coffee & Tea Menu', href: '#menu' },
        { label: 'House Tiramisu & Pastries', href: '#menu' },
        { label: 'The National Gallery Downstairs', href: '#gallery-heritage' },
      ],
      hoursTitle: 'Hours & Location',
      locationLabel: 'Location:',
      locationValue: 'Atop Jordan National Gallery of Fine Arts, Jabal Al-Weibdeh, Amman',
      satThuLabel: 'Saturday – Thursday:',
      satThuValue: '9:30 AM – 12:00 AM (Midnight)',
      friLabel: 'Friday:',
      friValue: '12:30 PM – 12:00 AM (Midnight)',
      directLabel: 'Direct Line / WhatsApp:',
      parkingNote: 'Free dedicated gallery parking lot available for all guests.',
      copyright: '© 2026 Jungle Fever Coffee and Tea House. All rights reserved.',
      bottomLocation: 'Jabal Al-Weibdeh, Amman • Rooftop at Jordan National Gallery of Fine Arts',
      mobileDockWhatsapp: 'Message on WhatsApp',
      mobileDockDirections: 'Directions',
    },
    reservationModal: {
      title: 'Reserve a Table or Gathering',
      subtitle: 'Book a rooftop table, study desk, or sunset gathering at the National Gallery Rooftop.',
      guestNameLabel: 'Full Name',
      guestNamePlaceholder: 'e.g. Layla Mansour',
      guestsLabel: 'Guests',
      spaceLabel: 'Preferred Space',
      dateLabel: 'Visit Date',
      timeLabel: 'Arrival Time',
      phoneLabel: 'WhatsApp / Phone Number',
      phonePlaceholder: '07 7XXX XXXX',
      notesLabel: 'Special Requests (Optional)',
      notesPlaceholder: 'Sunset table, birthday tiramisu, power outlets...',
      submitCta: 'Confirm Reservation Request',
      submittingLabel: 'Saving inquiry...',
      sendWhatsappCta: 'Send Confirmation via WhatsApp',
      confirmationTitle: 'Reservation Inquiry Recorded',
      referenceLabel: 'Reference Code',
      yourReservationsTitle: 'Recent Requests',
      noReservationsNote: 'No table requests recorded yet.',
      cancelButton: 'Cancel',
      closeButton: 'Close',
      newInquiryButton: 'New Request',
    },
  },
  ar: {
    lang: 'ar',
    dir: 'rtl',
    brand: {
      monogram: 'JF',
      name: 'جنغل فيفر',
      mobileName: 'واحة جنغل فيفر',
      subtitle: 'بيت القهوة والشاي • التراس العلوي',
      fullName: 'جنغل فيفر للقهوة والشاي',
      announcement: 'مفتوح اليوم على سطح المتحف الوطني الأردني للفنون الجميلة • جبل اللويبدة',
      mobileStatusBadge: 'مفتوح اليوم • سطح المتحف الوطني',
      hoursShort: 'السبت–الخميس: 9:30 صباحاً – منتصف الليل | الجمعة: 12:30 ظهراً – منتصف الليل',
      whatsappNumberDisplay: '07 7599 9303',
      whatsappDigits: '962775999303',
      mapsUrl: 'https://maps.google.com/?q=Jordan+National+Gallery+of+Fine+Arts+Amman',
      mapsDirectionsTitle: 'الاتجاهات عبر خرائط جوجل',
    },
    nav: {
      about: 'قصتنا والملاذ',
      spaces: 'المساحات',
      menu: 'القائمة المختارة',
      gallery: 'متحف الفنون الجميلة',
      amenities: 'دليل الزوار',
      reserveCta: 'احجز عبر واتساب',
      switchLangLabel: 'EN',
      openMenuAria: 'فتح القائمة',
      closeMenuAria: 'إغلاق القائمة',
    },
    hero: {
      eyebrow: 'التراس العلوي • المتحف الوطني الأردني للفنون الجميلة',
      headlineLine1: 'واحة عمّان الساحرة',
      headlineAccent: 'بين الفن والكتب',
      headlineEnd: 'والقهوة المختصة.',
      mobileHeadline: 'واحة عمّان الساحرة للفن والكتب والقهوة.',
      description:
        'نتربّع فوق المتحف الوطني للفنون الجميلة في قلب جبل اللويبدة البوهيمي. استمتع بنسمات التراس المفتوح، وصالون المكتبة الهادئ المغمور بأشعة الشمس، والقهوة المختصة مع إطلالات بانورامية خلابة على المدينة القديمة وحديقة المتحف.',
      mobileDescription:
        'استرخِ على شرفتنا المفتوحة المطلّة على جبل اللويبدة، وانعم بالهدوء في صالون المكتبة والدراسة، وتذوّق القهوة المختصة فوق المتحف الوطني للفنون الجميلة.',
      serviceBadges: ['تراس علوي مفتوح', 'مكتبة وصالون دراسة', 'طلبات خارجية مختصة', 'جلسات وفعاليات خاصة'],
      primaryCta: 'تصفح قائمة السبورة',
      secondaryCta: 'واتساب: 07 7599 9303',
      mobileWhatsappCta: 'راسلنا عبر واتساب (07 7599 9303)',
      mobileMenuCta: 'استكشف القائمة',
      mobileDirectionsCta: 'الاتجاهات',
      trustItems: [
        { icon: 'wifi', label: 'واي فاي مجاني سريع' },
        { icon: 'local_parking', label: 'مواقف مجانية بالمتحف' },
        { icon: 'accessible', label: 'مهيأ لذوي الاحتياجات' },
      ],
      collageMainBadge: 'جلسات التراس',
      collageMainTitle: 'تراس عليل وإطلالة بانورامية',
      collageMainSubtitle: 'إطلالة مباشرة على حديقة اللويبدة والقباب الزرقاء',
      collageSnaps: [
        {
          label: 'أفق عمّان',
          src: CAFE_IMAGES.skyline,
          alt: 'إطلالة بانورامية لأفق مدينة عمّان من تراس مقهى جنغل فيفر',
        },
        {
          label: 'سطح المتحف',
          src: CAFE_IMAGES.exterior,
          alt: 'منظر خارجي لمقهى جنغل فيفر فوق مبنى المتحف الوطني الأردني للفنون الجميلة',
        },
        {
          label: 'تيراميسو الدار',
          src: CAFE_IMAGES.tiramisu,
          alt: 'تيراميسو جنغل فيفر المحضر يدوياً على طبق خزفي مزخرف',
          accent: true,
        },
      ],
      mobileLocationTag: 'جبل اللويبدة',
      mobileThumbs: [
        {
          id: 'terrace',
          label: 'التراس',
          caption: 'التراس العلوي • الساعة الذهبية',
          src: CAFE_IMAGES.terraceMobile,
          alt: 'تراس مقهى جنغل فيفر',
        },
        {
          id: 'skyline',
          label: 'الإطلالة',
          caption: 'إطلالة أفق اللويبدة',
          src: CAFE_IMAGES.skylineMobile,
          alt: 'إطلالة أفق عمّان',
        },
        {
          id: 'exterior',
          label: 'المتحف',
          caption: 'الواجهة الخارجية للمتحف الوطني',
          src: CAFE_IMAGES.exteriorMobile,
          alt: 'الواجهة الخارجية للمتحف',
        },
        {
          id: 'tiramisu',
          label: 'تيراميسو',
          caption: 'تيراميسو جنغل فيفر المحضّر يومياً',
          src: CAFE_IMAGES.tiramisuMobile,
          alt: 'تيراميسو المحل',
        },
      ],
    },
    identityBar: {
      title: 'مباشرة فوق المتحف الوطني للفنون الجميلة',
      subtitle: 'تجوّل بين معارض الفن العربي والعالمي الحديث في الطابق السفلي قبل احتساء قهوتك.',
      highlights: [
        { icon: 'nature_people', label: 'في حديقة الفنون باللويبدة' },
        { icon: 'menu_book', label: 'مكتبة فنية عاملة' },
        { icon: 'local_cafe', label: 'مشروبات ساخنة وباردة مختصة' },
      ],
    },
    menu: {
      eyebrow: 'مختارات السبورة الأصيلة',
      mobileEyebrow: 'محضّرة طازجة',
      title: 'القهوة المختصة، الشاي والحلويات',
      mobileTitle: 'قائمة اللوح',
      subtitle:
        'تُحضّر يدوياً على يد باريستا شغوفين باستخدام حبوب أحادية المصدر، وركوة القهوة التركية الأصيلة، وأوراق الشاي المنقوعة بعناية. جميع الأسعار بالدينار الأردني.',
      pricesNote: 'الأسعار بالدينار الأردني',
      searchPlaceholder: 'ابحث عن مشروب، شاي، أو حلوى...',
      noResults: 'لا توجد أصناف مطابقة لبحثك.',
      resetFilter: 'عرض جميع الأصناف',
      categories: [
        { id: 'all', label: 'جميع الأصناف', mobileLabel: 'الكل' },
        { id: 'hot', label: 'المشروبات الساخنة', mobileLabel: 'مشروبات ساخنة' },
        { id: 'special', label: 'مختارات جنغل فيفر', mobileLabel: 'مختصات جنغل فيفر' },
        { id: 'flavours', label: 'إضافة النكهات', mobileLabel: 'نكهات مميزة' },
        { id: 'dessert', label: 'الحلويات والمخبوزات', mobileLabel: 'الحلويات' },
      ],
      groupMeta: {
        hot: { title: 'المشروبات الساخنة', note: 'سنجل / دبل (دينار أردني)', icon: 'local_cafe' },
        special: { title: 'مختارات جنغل فيفر الخاصة', note: 'تحضير خاص', icon: 'star' },
        flavours: {
          title: 'إضافة النكهات والتعديلات',
          note: '+0.5 دينار للجرعة',
          icon: 'tune',
          syrupsTitle: 'نكهات الشراب والتوابل النباتية (+0.5 دينار):',
          sugarFreeBadge: 'خيارات خالية من السكر',
          sugarFreeNote: 'تتوفر نكهات الفانيلا والكراميل والبندق الخالية من السكر. يتوفر حليب الشوفان واللوز عند الطلب.',
        },
        dessert: { title: 'الحلويات والمخبوزات المختارة', note: 'تُخبز يومياً', icon: 'bakery_dining' },
      },
      items: [
        {
          id: 'espresso',
          category: 'hot',
          name: 'إسبريسو',
          description: 'كريما ذهبية غنية بنكهة أرابيكا متوازنة',
          price: '2.0 / 2.5 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'turkish-coffee',
          category: 'hot',
          name: 'قهوة تركية',
          description: 'فنجان تقليدي مع خيار الهيل العطري',
          price: '2.0 / 2.5 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'americano',
          category: 'hot',
          name: 'أمريكانو',
          description: 'ماء ساخن يُصب فوق جرعة إسبريسو مزدوجة',
          price: '3.0 دينار',
        },
        {
          id: 'filtered-coffee',
          category: 'hot',
          name: 'قهوة مقطرة (فلتر)',
          description: 'تخمير بطيء ومتوازن، كوب خفيف وغني بالإيحاءات',
          price: '3.0 دينار',
        },
        {
          id: 'cappuccino',
          category: 'hot',
          name: 'كابتشينو',
          description: 'رغوة حليب مخملية كثيفة مع رشة كاكاو',
          price: '3.0 دينار',
        },
        {
          id: 'flat-white',
          category: 'hot',
          name: 'فلات وايت',
          description: 'جرعة مزدوجة يعلوها حليب مبخر ناعم ولامع',
          price: '3.0 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'latte',
          category: 'hot',
          name: 'لاتيه',
          description: 'حليب مبخر كريمي متوازن مع الإسبريسو الغني',
          price: '3.0 / 3.5 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'espresso-macchiato',
          category: 'hot',
          name: 'إسبريسو ماكياتو',
          description: 'إسبريسو مع لمسة من رغوة الحليب الساخن',
          price: '2.5 / 3.0 دينار',
        },
        {
          id: 'caramel-macchiato',
          category: 'hot',
          name: 'كراميل ماكياتو',
          description: 'إسبريسو فوق حليب الفانيلا مزين بصلصة الكراميل',
          price: '3.5 / 4.0 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'mocha',
          category: 'hot',
          name: 'موكا',
          description: 'غناش الشوكولاتة الفاخرة ممزوجة بالإسبريسو',
          price: '3.5 / 4.0 دينار',
        },
        {
          id: 'cinnamon-ginger-milk',
          category: 'hot',
          name: 'حليب بالقرفة / الزنجبيل',
          description: 'حليب مبخر دافئ منقوع بالتوابل الطبيعية',
          price: '2.5 / 3.0 دينار',
        },
        {
          id: 'hot-tea-pot',
          category: 'hot',
          name: 'شاي ساخن (إبريق مختار)',
          description: 'أعشاب نباتية، شاي أسود وأوراق خضراء فاخرة',
          price: '3.0 دينار',
        },
        {
          id: 'indian-frappe',
          category: 'special',
          name: 'فرابيه هندي',
          description: 'رغوة قهوة مثلجة مخفوقة بالتوابل والحليب المكثف',
          price: '3.5 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'greek-frappe',
          category: 'special',
          name: 'فرابيه يوناني',
          description: 'قهوة مثلجة برغوة متوسطية كلاسيكية منعشة',
          price: '3.5 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'masala-hot-chocolate',
          category: 'special',
          name: 'هوت شوكليت ماسالا',
          description: 'كاكاو داكن غني مطهو ببطء مع الهيل والقرنفل والزنجبيل',
          price: '3.0 / 3.5 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'freddo',
          category: 'special',
          name: 'إسبريسو فريدو وكابتشينو فريدو',
          description: 'إسبريسو مزدوج مخفوق على الثلج مع رغوة حليب باردة',
          price: '3.5 دينار',
        },
        {
          id: 'iced-turkish',
          category: 'special',
          name: 'قهوة تركية مثلجة مقطرة',
          description: 'ابتكار جنغل فيفر لاستخلاص التحميص التركي بارداً',
          price: '3.5 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'iced-tea-lemonade',
          category: 'special',
          name: 'شاي مثلج طازج وليموناضة وردية',
          description: 'منقوع الشاي النباتي المنزلي مع الحمضيات المعصورة طازجة',
          price: '3.0 دينار',
          featuredOnMobile: true,
        },
        {
          id: 'tiramisu',
          category: 'dessert',
          name: 'تيراميسو جنغل فيفر',
          description: 'وصفتنا المنزلية الكلاسيكية ببسكويت السافويار وكريمة الماسكربوني الغنية وإسبريسو جنغل فيفر.',
          price: '4.5 دينار',
          image: CAFE_IMAGES.tiramisu,
          featuredOnMobile: true,
        },
        {
          id: 'cheesecakes-tarts',
          category: 'dessert',
          name: 'تشيز كيك وتارت حرفي',
          description: 'تشكيلة موسمية من تارت الفستق الحلبي واللوتس والليمون مع الباشن فروت تُقدم مع الشاي الطازج.',
          price: '4.0 دينار',
        },
      ],
      flavours: ['فانيلا', 'كراميل', 'بندق', 'توفي نات', 'شاي تشاي', 'قرفة', 'زنجبيل', 'نعناع أخضر', 'توابل القيقب', 'توابل اليقطين'],
      chalkboard: {
        title: 'سبورة المقهى',
        status: 'بار اللويبدة المباشر',
        tapHint: 'اضغط لعرض القائمة الأصلية المكتوبة بخط اليد',
        mobileTitle: 'اللوح المكتوب بخط اليد',
        mobileSubtitle: 'اضغط لمشاهدة لوح اليوم',
        viewBoardLabel: 'عرض اللوح',
        hideBoardLabel: 'إخفاء اللوح',
        askBaristaCta: 'اسأل الباريستا عبر واتساب',
        whatsappPrompt: 'مرحباً جنغل فيفر، أود السؤال عن الحلويات الطازجة ومختارات القهوة اليوم.',
        imageAlt: 'قائمة السبورة المكتوبة بخط اليد في جنغل فيفر وتعرض المشروبات الساخنة والنكهات والمختارات',
      },
    },
    spaces: {
      eyebrow: 'أربعة أجواء فريدة',
      mobileEyebrow: 'أربع أجواء مختلفة',
      title: 'مساحات جنغل فيفر',
      mobileTitle: 'مساحاتنا',
      subtitle:
        'سواء كنت تبحث عن نسيم التراس العلوي المشمس، أو طاولة دراسة هادئة في المكتبة مزودة بمقابس كهرباء، أو حيوية البار الداخلي، أو الوسائد الأرضية بجوار النوافذ البانورامية.',
      items: [
        {
          id: 'terrace',
          tabLabel: 'التراس العلوي',
          icon: 'wb_sunny',
          badge: 'تراس مفتوح ومظلل',
          badgeStyle: 'secondary',
          title: 'إطلالات خلابة على جبل اللويبدة',
          description:
            'اخرج إلى السطح المفتوح فوق مبنى المتحف الوطني. تحيط بك المظلات الشراعية والواجهات الزجاجية البانورامية، لتشاهد غروب الشمس فوق تلال عمّان الحجرية والمآذن وأبراج العبدلي الحديثة وأنت ترتشف الفريدو البارد أو الشاي بالنعناع الساخن.',
          mobileSummary: 'جلسات مفتوحة بإطلالة خلابة على جبل اللويبدة.',
          bullets: [
            'طاولات مظللة ومقاعد في الهواء الطلق',
            'إطلالات الساعة الذهبية والغروب عبر وادي اللويبدة',
            'مثالي للأحاديث الودية ومواعيد القهوة والتصوير الفوتوغرافي',
          ],
          images: [
            { src: CAFE_IMAGES.terraceMain, alt: 'طاولات التراس العلوي الخارجية' },
            { src: CAFE_IMAGES.skyline, alt: 'إطلالة أفق المدينة من المقهى' },
          ],
          mobileImage: CAFE_IMAGES.terraceMobile,
        },
        {
          id: 'bar',
          tabLabel: 'بار الفن والقهوة',
          icon: 'palette',
          badge: 'بار داخلي نابض بالحياة',
          badgeStyle: 'primary',
          title: 'البار البوهيمي الملون والميزانين',
          description:
            'يتوسط المقهى جداريتنا النباتية المرسومة يدوياً، مع لمسات البلاط الحجري الدافئ وبار الإسبريسو الخشبي الحرفي. شاهد الباريستا وهم يطحنون الحبوب الطازجة ويبدعون في رسم اللاتيه تحت مصابيح الزجاج المعلقة الدافئة.',
          mobileSummary: 'استمتع بتحضير قهوتك وسط أعمال فنية محلية متجددة.',
          bullets: [
            'ألعاب لوحية مصنوعة يدوياً وتبادل مجتمعي للكتب',
            'حبوب قهوة كاملة معبأة طازجة متوفرة للشراء المنزلي',
            'إطلالة الميزانين التي تربط طوابق المقهى',
          ],
          images: [
            { src: CAFE_IMAGES.barMural, alt: 'كاونتر نابض بالحياة مع جدارية مرسومة يدوياً' },
            { src: CAFE_IMAGES.mezzanine, alt: 'طابق الميزانين المطل على بار المقهى' },
          ],
          mobileImage: CAFE_IMAGES.barMobile,
        },
        {
          id: 'library',
          tabLabel: 'مكتبة المتحف والدراسة',
          icon: 'menu_book',
          badge: 'واحة الدراسة والعمل',
          badgeStyle: 'neutral',
          title: 'مكتبة فنية من الأرض للسقف ومكاتب للتركيز',
          description:
            'ملاذ للمعماريين والكتّاب والمصممين والطلاب في عمّان. تقع هذه القاعة ضمن مكتبة المراجع الفنية العامة للمتحف، وتوفر طاولات خشبية واسعة، ومصابيح قراءة، ومقابس كهرباء، وإضاءة نهارية هادئة تتدفق من المناور السماوية.',
          mobileSummary: 'طاولات هادئة ومشمسة مثالية للقراءة والرسم والعمل عن بُعد.',
          bullets: [
            'مجموعة منتقاة من كتب الفن والتاريخ والتصميم',
            'مناطق هادئة لأجهزة اللابتوب مع مقابس كهرباء متوفرة',
            'مكاتب قراءة خشبية دافئة وزوايا وسائد أرضية مريحة',
          ],
          images: [
            { src: CAFE_IMAGES.libraryMain, alt: 'مكتبة مشمسة للدراسة مع القراء والكتب' },
            { src: CAFE_IMAGES.libraryDesk, alt: 'أرفف كتب ومكتب خشبي هادئ' },
            { src: CAFE_IMAGES.libraryCushions, alt: 'زاوية قراءة مريحة بوسائد أرضية ملونة' },
          ],
          mobileImage: CAFE_IMAGES.libraryMobile,
        },
        {
          id: 'lounge',
          tabLabel: 'اللاونج المشمس',
          icon: 'weekend',
          badge: 'جلسات النوافذ البوهيمية',
          badgeStyle: 'secondary',
          title: 'وسائد مطرزة تقليدية وإطلالات الحديقة',
          description:
            'استرخِ على مقاعدنا المنخفضة المميزة المغطاة بالمنسوجات الشامية المطرزة والوسائد النابضة بالألوان. تغمرك النوافذ الممتدة من الأرض إلى السقف في خضرة الحديقة المحيطة مع الحفاظ على راحتك المكيفة طوال العام.',
          mobileSummary: 'زوايا مريحة بوسائد دافئة تغمرها أشعة شمس الظهيرة.',
          bullets: [
            'واجهات زجاجية بانورامية تطل على حديقة الفنون باللويبدة',
            'جلسات أرضية تراثية مطرزة وطاولات قهوة ريفية منخفضة',
            'مثالية للمجموعات ونوادي القراءة وأباريق الشاي',
          ],
          images: [
            { src: CAFE_IMAGES.loungeCushions, alt: 'جلسة بوهيمية بجانب النافذة مع وسائد ملونة مزخرفة' },
            { src: CAFE_IMAGES.loungeCorridor, alt: 'ممر بأرضية خشبية مشمسة مع جلسات بجانب النوافذ' },
          ],
          mobileImage: CAFE_IMAGES.loungeMobile,
        },
      ],
    },
    gallery: {
      eyebrow: 'وجهة ثقافية في عمّان',
      mobileBadge: 'في الطابق السفلي',
      overlayEyebrow: 'قاعة العرض في الطابق السفلي',
      overlayTitle: 'المتحف الوطني الأردني للفنون الجميلة',
      title: 'حيث تلتقي القهوة المختصة بالفن التشكيلي المعاصر.',
      mobileTitle: 'المتحف الوطني الأردني للفنون الجميلة',
      paragraphs: [
        'تأسس جنغل فيفر ليكون صالوناً ثقافياً حياً يتربع مباشرة فوق أهم مؤسسة للفنون الجميلة في الأردن. يضم المتحف في الطابق السفلي، التابع للجمعية الملكية للفنون الجميلة، مجموعة استثنائية تزيد عن 3,000 عمل فني من العالم العربي والإسلامي.',
        'اجمع بين ظهيرة حافلة بالمعارض المعاصرة والتنزه في حديقة المنحوتات والبحث عن الإلهام الهادئ، مع كوب من هوت شوكليت الماسالا المميز أو قهوة إثيوبية مقطرة على التراس العلوي.',
      ],
      mobileDescription:
        'اجمع بين قهوتك وجولة في قاعات الفن العربي والعالمي المعاصر في الطابق السفلي، وحديقة المنحوتات المجانية، مع مصعد مريح يصلك مباشرة إلى السطح.',
      mobileTags: ['حديقة منحوتات مجانية', 'مصعد سهل الوصول'],
      highlights: [
        { icon: 'explore', title: 'الحديقة وساحة المنحوتات', subtitle: 'ممشى أخضر وارف في الخارج مباشرة' },
        { icon: 'elevator', title: 'مصعد إلى السطح', subtitle: 'وصول سهل وخالٍ من العوائق' },
      ],
      imageAlt: 'قاعة العرض الواسعة في المتحف الوطني الأردني للفنون الجميلة في الطابق السفلي مع لوحات ومنحوتات معاصرة',
    },
    sanctuary: {
      eyebrow: 'تجربة الملاذ الأخضر',
      quote: '«ملاذ أخضر هادئ يحلّق فوق نبض جبل اللويبدة.»',
      subtitle: 'تحيط بك نباتات المونستيرا والسراخس المعلقة، مع أنغام الجاز الهادئة وإيقاع مطاحن الإسبريسو.',
      cta: 'خطط لزيارتك اليوم',
    },
    amenities: {
      eyebrow: 'خطط ليومك',
      mobileEyebrow: 'خطّط لزيارتك',
      title: 'معلومات الزوار والمرافق',
      mobileTitle: 'المرافق والموقع',
      subtitle: 'كل ما تحتاج معرفته قبل زيارة مقهانا العلوي والمكتبة.',
      items: [
        {
          id: 'wifi',
          icon: 'wifi',
          title: 'واي فاي مجاني عالي السرعة',
          shortLabel: 'واي فاي مجاني سريع',
          description:
            'اتصال فائق السرعة وموثوق في الصالون الداخلي ومكاتب المكتبة والتراس العلوي. مثالي للعمل عن بُعد وجلسات الدراسة واجتماعات الفيديو.',
        },
        {
          id: 'study',
          icon: 'laptop_mac',
          title: 'مناسب للعمل والدراسة',
          shortLabel: 'مناسب للعمل والدراسة',
          description: 'مجهز بمقابس كهربائية مريحة، وطاولات دراسة خشبية واسعة، وأجواء مكتبية هادئة مصممة للتركيز والقراءة.',
        },
        {
          id: 'parking',
          icon: 'local_parking',
          title: 'مواقف سيارات مجانية مخصصة',
          shortLabel: 'مواقف مجانية مخصصة',
          description:
            'استمتع بزيارة خالية من المتاعب مع موقف السيارات المجاني الخاص بالمتحف الوطني الأردني الملاصق للمبنى مباشرة، بالإضافة لمواقف الحي الهادئة.',
        },
        {
          id: 'accessibility',
          icon: 'accessible',
          title: 'وصول ذوي الاحتياجات والمصعد',
          shortLabel: 'مصعد وكراسي متحركة',
          description:
            'مدخل منحدر خالٍ من الدرج إلى مبنى المتحف الوطني وخدمة مصعد حديثة تصعد بك مباشرة إلى المقهى العلوي والصالونات الداخلية ودورات المياه.',
        },
        {
          id: 'payments',
          icon: 'payments',
          title: 'مرونة في طرق الدفع',
          shortLabel: 'بطاقة / NFC / نقداً',
          description:
            'نرحب ببطاقات فيزا وماستركارد، والدفع اللاتلامسي عبر الهاتف، وتحويلات كليك (CLIQ)، والدفع النقدي بالدينار الأردني دون حد أدنى للفاتورة.',
        },
        {
          id: 'events',
          icon: 'groups',
          title: 'التجمعات والفعاليات الخاصة',
          shortLabel: 'تجمعات خاصة',
          description:
            'استضف نوادي القراءة الخاصة، وورش العمل الإبداعية، واجتماعات الفرق، وحفلات الغروب على التراس أو الميزانين. استفسر مباشرة عبر واتساب.',
        },
      ],
      locationHub: {
        eyebrow: 'موقعنا في جبل اللويبدة',
        mobileEyebrow: 'جبل اللويبدة، عمّان',
        title: 'سطح المتحف الوطني الأردني للفنون الجميلة',
        address: 'شارع حسني فريز / شارع الباعونية، جبل اللويبدة، عمّان، الأردن. يطل مباشرة على حديقة المتحف الوطني.',
        satThuLabel: 'السبت – الخميس',
        satThuHours: '9:30 صباحاً – 12:00 منتصف الليل',
        satThuHoursShort: '9:30 صباحاً – 12:00 منتصف الليل',
        friLabel: 'يوم الجمعة',
        friShortLabel: 'الجمعة',
        friHours: '12:30 ظهراً – 12:00 منتصف الليل',
        friHoursShort: '12:30 ظهراً – 12:00 منتصف الليل',
        whatsappCta: 'راسلنا على واتساب: 07 7599 9303',
        mapsCta: 'افتح في خرائط جوجل (موقف سيارات مجاني)',
        mobileMapsCta: 'افتح في خرائط جوجل',
        reserveBtnCta: 'احجز طاولة أو تجمعاً خاصاً',
        directLineNote: 'الهاتف المباشر: 07 7599 9303 • الجلوس بالمقهى والطلبات الخارجية متوفرة',
      },
    },
    footer: {
      aboutText:
        'يتربّع فوق المتحف الوطني الأردني للفنون الجميلة في جبل اللويبدة. ملاذ نباتي لعشاق القهوة المختصة، وأوراق الشاي الفاخرة، والقراءة الهادئة، وتراسات الغروب البانورامية.',
      exploreTitle: 'استكشف',
      exploreLinks: [
        { label: 'التراس العلوي', href: '#spaces' },
        { label: 'مكتبة مراجع متحف الفنون', href: '#spaces' },
        { label: 'قائمة القهوة المختصة والشاي', href: '#menu' },
        { label: 'تيراميسو الدار والمخبوزات', href: '#menu' },
        { label: 'المتحف الوطني في الطابق السفلي', href: '#gallery-heritage' },
      ],
      hoursTitle: 'أوقات العمل والموقع',
      locationLabel: 'الموقع:',
      locationValue: 'سطح المتحف الوطني الأردني للفنون الجميلة، جبل اللويبدة، عمّان',
      satThuLabel: 'السبت – الخميس:',
      satThuValue: '9:30 صباحاً – 12:00 منتصف الليل',
      friLabel: 'الجمعة:',
      friValue: '12:30 ظهراً – 12:00 منتصف الليل',
      directLabel: 'الخط المباشر / واتساب:',
      parkingNote: 'تتوفر مواقف سيارات مجانية مخصصة في المتحف لجميع الضيوف.',
      copyright: '© 2026 جنغل فيفر للقهوة والشاي. جميع الحقوق محفوظة.',
      bottomLocation: 'جبل اللويبدة، عمّان • سطح المتحف الوطني الأردني للفنون الجميلة',
      mobileDockWhatsapp: 'راسلنا عبر واتساب',
      mobileDockDirections: 'الاتجاهات',
    },
    reservationModal: {
      title: 'احجز طاولة أو تجمعاً خاصاً',
      subtitle: 'احجز طاولة على التراس أو مكتب دراسة أو جلسة غروب على سطح المتحف الوطني.',
      guestNameLabel: 'الاسم الكامل',
      guestNamePlaceholder: 'مثال: ليلى منصور',
      guestsLabel: 'عدد الضيوف',
      spaceLabel: 'المساحة المفضلة',
      dateLabel: 'تاريخ الزيارة',
      timeLabel: 'وقت الوصول',
      phoneLabel: 'رقم الواتساب / الهاتف',
      phonePlaceholder: '07 7XXX XXXX',
      notesLabel: 'ملاحظات خاصة (اختياري)',
      notesPlaceholder: 'طاولة للغروب، تيراميسو لمناسبة، مقابس كهرباء...',
      submitCta: 'تأكيد طلب الحجز',
      submittingLabel: 'جارٍ حفظ الطلب...',
      sendWhatsappCta: 'إرسال التأكيد عبر واتساب',
      confirmationTitle: 'تم تسجيل طلب الحجز بنجاح',
      referenceLabel: 'رمز المرجع',
      yourReservationsTitle: 'الطلبات المسجلة حديثاً',
      noReservationsNote: 'لا توجد طلبات حجز مسجلة بعد.',
      cancelButton: 'إلغاء',
      closeButton: 'إغلاق',
      newInquiryButton: 'طلب جديد',
    },
  },
};
