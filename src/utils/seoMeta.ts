import { CAFE_CONTENT, CAFE_IMAGES, type Locale } from '../data/cafeData';

export interface SeoCopy {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  imageAlt: string;
}

export const GBP_BUSINESS_PROFILE = {
  legalName: 'Jungle Fever Coffee and Tea House',
  alternateName: 'جنغل فيفر للقهوة والشاي',
  telephone: '+962775999303',
  telephoneDisplay: '07 7599 9303',
  whatsappUrl: 'https://wa.me/962775999303',
  mapsUrl:
    'https://www.google.com/maps/place/Jungle+Fever+Coffee+and+Tea+House/@31.9580697,35.9152344,15z/data=!4m15!1m8!3m7!1s0x151ca077ff973e1b:0x881ef21032a1b057!2sJungle+Fever+Coffee+and+Tea+House!8m2!3d31.9580697!4d35.9152344!10e5!16s%2Fg%2F11dfj4_xrv!3m5!1s0x151ca077ff973e1b:0x881ef21032a1b057!8m2!3d31.9580697!4d35.9152344!16s%2Fg%2F11dfj4_xrv?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D',
  priceRange: '$$',
  currenciesAccepted: 'JOD',
  paymentAccepted: 'Cash, Credit Card, Visa, Mastercard, NFC Mobile Payments, CliQ',
  address: {
    streetAddress: "Hosni Fareez St. / Ba'ouniyah St., Rooftop at Jordan National Gallery of Fine Arts, Jabal Al-Weibdeh",
    addressLocality: 'Amman',
    addressRegion: 'Amman Governorate',
    postalCode: '11191',
    addressCountry: 'JO',
  },
  geo: {
    latitude: 31.9580697,
    longitude: 35.9152344,
  },
  socialImage: CAFE_IMAGES.terraceMain,
} as const;

export const SEO_COPY: Record<Locale, SeoCopy> = {
  en: {
    title: 'Jungle Fever Cafe | National Gallery Rooftop, Amman',
    description:
      'Visit Jungle Fever Coffee & Tea House atop Jordan National Gallery of Fine Arts in Jabal Al-Weibdeh, Amman. Rooftop views, specialty coffee, library & Wi-Fi.',
    keywords:
      'Jungle Fever Cafe Amman, Jabal Al-Weibdeh rooftop cafe, Jordan National Gallery of Fine Arts cafe, specialty coffee Amman, study cafe Weibdeh, tea house Amman, rooftop terrace Amman',
    ogTitle: 'Jungle Fever Coffee & Tea House | National Gallery Rooftop, Amman',
    ogDescription:
      'Specialty coffee, artisanal teas, sunlit study library, and panoramic rooftop views atop the Jordan National Gallery of Fine Arts in Jabal Al-Weibdeh.',
    ogLocale: 'en_US',
    ogLocaleAlternate: 'ar_JO',
    imageAlt:
      'Jungle Fever outdoor glass rooftop terrace overlooking Jabal Al-Weibdeh and the Jordan National Gallery of Fine Arts in Amman',
  },
  ar: {
    title: 'مقهى جنغل فيفر | سطح المتحف الوطني للفنون، عمّان',
    description:
      'زر مقهى جنغل فيفر للقهوة والشاي فوق المتحف الوطني الأردني للفنون الجميلة في جبل اللويبدة، عمّان. تراس بانورامي، قهوة مختصة، مكتبة هادئة، واي فاي ومواقف مجانية.',
    keywords:
      'مقهى جنغل فيفر عمّان, كافيهات جبل اللويبدة, مقهى المتحف الوطني للفنون الجميلة, قهوة مختصة عمّان, تراس اللويبدة, كافيه دراسة عمّان, بيت الشاي والقهوة',
    ogTitle: 'جنغل فيفر للقهوة والشاي | سطح المتحف الوطني الأردني للفنون الجميلة',
    ogDescription:
      'قهوة مختصة، شاي فاخر، مكتبة دراسة هادئة وإطلالة بانورامية من التراس العلوي فوق المتحف الوطني للفنون الجميلة في جبل اللويبدة.',
    ogLocale: 'ar_JO',
    ogLocaleAlternate: 'en_US',
    imageAlt:
      'تراس مقهى جنغل فيفر المفتوح المطل على جبل اللويبدة وأفق مدينة عمّان فوق المتحف الوطني الأردني للفنون الجميلة',
  },
};

export function normalizeBaseUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return 'https://junglefever.cafe/';
  }
}

export function buildLocaleUrls(baseUrl: string): {
  canonicalEn: string;
  canonicalAr: string;
} {
  const cleanBase = normalizeBaseUrl(baseUrl);
  return {
    canonicalEn: cleanBase,
    canonicalAr: `${cleanBase}?lang=ar`,
  };
}

function parseLowestPrice(priceText: string): string | undefined {
  const match = priceText.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : undefined;
}

export function buildGoogleBusinessProfileJsonLd(lang: Locale, rawUrl: string): Record<string, unknown> {
  const baseUrl = normalizeBaseUrl(rawUrl);
  const { canonicalEn, canonicalAr } = buildLocaleUrls(baseUrl);
  const pageUrl = lang === 'ar' ? canonicalAr : canonicalEn;
  const content = CAFE_CONTENT[lang];
  const copy = SEO_COPY[lang];

  const menuSections = (['hot', 'special', 'dessert'] as const).map((categoryKey) => {
    const groupItems = content.menu.items.filter((item) => item.category === categoryKey);
    return {
      '@type': 'MenuSection',
      name: content.menu.groupMeta[categoryKey].title,
      hasMenuItem: groupItems.map((item) => {
        const numericPrice = parseLowestPrice(item.price);
        return {
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          ...(numericPrice
            ? {
                offers: {
                  '@type': 'Offer',
                  price: numericPrice,
                  priceCurrency: 'JOD',
                  availability: 'https://schema.org/InStock',
                },
              }
            : {}),
        };
      }),
    };
  });

  const faqEntries =
    lang === 'ar'
      ? [
          {
            question: 'أين يقع مقهى جنغل فيفر وهل تتوفر مواقف سيارات مجانية؟',
            answer:
              'يقع مقهى جنغل فيفر للقهوة والشاي مباشرة على سطح المتحف الوطني الأردني للفنون الجميلة في جبل اللويبدة، عمّان، وتتوفر مواقف سيارات مجانية مخصصة للزوار بجانب مبنى المتحف.',
          },
          {
            question: 'ما هي ساعات عمل مقهى جنغل فيفر في عمّان؟',
            answer:
              'نستقبلكم من السبت إلى الخميس من 9:30 صباحاً حتى منتصف الليل (12:00 AM)، ويوم الجمعة من 12:30 ظهراً حتى منتصف الليل.',
          },
          {
            question: 'هل المقهى مناسب للدراسة والعمل عبر اللابتوب؟',
            answer:
              'نعم، يوفر صالون مكتبة المتحف طاولات خشبية واسعة، مقابس كهرباء متاحة، إنترنت واي فاي مجاني عالي السرعة، وأجواء هادئة ومشمسة مثالية للقراءة والعمل عن بُعد.',
          },
          {
            question: 'هل التراس العلوي مهيأ لذوي الاحتياجات الخاصة؟',
            answer:
              'نعم، يتوفر مدخل منحدر خالٍ من الدرج ومصعد حديث يصل مباشرة إلى التراس العلوي وصالونات المقهى والمرافق.',
          },
        ]
      : [
          {
            question: 'Where is Jungle Fever Coffee and Tea House located and is parking available?',
            answer:
              'Jungle Fever is located on the rooftop of the Jordan National Gallery of Fine Arts in Jabal Al-Weibdeh, Amman (Hosni Fareez St. / Baouniyah St.), with free dedicated gallery parking right next to the building.',
          },
          {
            question: 'What are Jungle Fever Cafe opening hours in Amman?',
            answer:
              'We are open Saturday through Thursday from 9:30 AM to 12:00 AM (Midnight), and Friday from 12:30 PM to 12:00 AM (Midnight).',
          },
          {
            question: 'Is Jungle Fever laptop and study friendly with Wi-Fi?',
            answer:
              'Yes. Our sunlit Gallery Library & Study salon features high-speed free Wi-Fi, wide wooden desks, power outlets, and a quiet atmosphere for studying, reading, and remote work.',
          },
          {
            question: 'Is the rooftop cafe wheelchair accessible?',
            answer:
              'Yes. The Jordan National Gallery building provides step-free ramp entry and elevator access directly up to Jungle Fever rooftop terrace, indoor salons, and restrooms.',
          },
        ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['CafeOrCoffeeShop', 'LocalBusiness'],
        '@id': `${baseUrl}#business`,
        name: GBP_BUSINESS_PROFILE.legalName,
        alternateName: GBP_BUSINESS_PROFILE.alternateName,
        description: copy.description,
        url: pageUrl,
        telephone: GBP_BUSINESS_PROFILE.telephone,
        priceRange: GBP_BUSINESS_PROFILE.priceRange,
        currenciesAccepted: GBP_BUSINESS_PROFILE.currenciesAccepted,
        paymentAccepted: GBP_BUSINESS_PROFILE.paymentAccepted,
        servesCuisine: ['Specialty Coffee', 'Artisan Tea', 'Cafe', 'Desserts'],
        image: [
          CAFE_IMAGES.terraceMain,
          CAFE_IMAGES.skyline,
          CAFE_IMAGES.exterior,
          CAFE_IMAGES.tiramisu,
        ],
        hasMap: GBP_BUSINESS_PROFILE.mapsUrl,
        sameAs: [GBP_BUSINESS_PROFILE.mapsUrl, GBP_BUSINESS_PROFILE.whatsappUrl],
        address: {
          '@type': 'PostalAddress',
          streetAddress: GBP_BUSINESS_PROFILE.address.streetAddress,
          addressLocality: GBP_BUSINESS_PROFILE.address.addressLocality,
          addressRegion: GBP_BUSINESS_PROFILE.address.addressRegion,
          postalCode: GBP_BUSINESS_PROFILE.address.postalCode,
          addressCountry: GBP_BUSINESS_PROFILE.address.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: GBP_BUSINESS_PROFILE.geo.latitude,
          longitude: GBP_BUSINESS_PROFILE.geo.longitude,
        },
        areaServed: {
          '@type': 'City',
          name: 'Amman',
        },
        containedInPlace: {
          '@type': 'Museum',
          name: 'Jordan National Gallery of Fine Arts',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Amman',
            addressCountry: 'JO',
          },
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:30',
            closes: '23:59',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Friday'],
            opens: '12:30',
            closes: '23:59',
          },
        ],
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed Wi-Fi', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Free Dedicated Parking Lot', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible Entrance & Elevator', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Outdoor Rooftop Seating', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Quiet Library & Laptop Study Area', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Dine-in & Artisan Takeout', value: true },
        ],
        acceptsReservations: true,
        hasMenu: {
          '@type': 'Menu',
          name: content.menu.title,
          url: `${baseUrl}#menu`,
          hasMenuSection: menuSections,
        },
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: GBP_BUSINESS_PROFILE.whatsappUrl,
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'FoodEstablishmentReservation',
            name: 'Rooftop Table or Gathering Inquiry',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: GBP_BUSINESS_PROFILE.legalName,
        inLanguage: ['en', 'ar'],
        publisher: {
          '@id': `${baseUrl}#business`,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}#faq`,
        mainEntity: faqEntries.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: entry.answer,
          },
        })),
      },
    ],
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) {
      el.setAttribute('hreflang', hreflang);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySeoMetadata(lang: Locale): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const copy = SEO_COPY[lang];
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const { canonicalEn, canonicalAr } = buildLocaleUrls(baseUrl);
  const activeUrl = lang === 'ar' ? canonicalAr : canonicalEn;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = copy.title;

  upsertMeta('name', 'description', copy.description);
  upsertMeta('name', 'keywords', copy.keywords);

  upsertMeta('property', 'og:title', copy.ogTitle);
  upsertMeta('property', 'og:description', copy.ogDescription);
  upsertMeta('property', 'og:url', activeUrl);
  upsertMeta('property', 'og:locale', copy.ogLocale);
  upsertMeta('property', 'og:locale:alternate', copy.ogLocaleAlternate);
  upsertMeta('property', 'og:image', GBP_BUSINESS_PROFILE.socialImage);
  upsertMeta('property', 'og:image:alt', copy.imageAlt);

  upsertMeta('name', 'twitter:title', copy.ogTitle);
  upsertMeta('name', 'twitter:description', copy.ogDescription);
  upsertMeta('name', 'twitter:image', GBP_BUSINESS_PROFILE.socialImage);
  upsertMeta('name', 'twitter:image:alt', copy.imageAlt);

  upsertLink('canonical', activeUrl);
  upsertLink('alternate', canonicalEn, 'en');
  upsertLink('alternate', canonicalAr, 'ar');
  upsertLink('alternate', canonicalEn, 'x-default');

  const jsonLd = buildGoogleBusinessProfileJsonLd(lang, baseUrl);
  let script = document.getElementById('gbp-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'gbp-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
}
