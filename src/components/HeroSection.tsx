import { useState } from 'react';
import { CAFE_IMAGES, type CafeLocaleData } from '../data/cafeData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  data: CafeLocaleData;
  onInspectImage: (src: string, alt: string) => void;
}

export function HeroSection({ data, onInspectImage }: HeroSectionProps) {
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const activeThumb = data.hero.mobileThumbs[activeThumbIdx] ?? data.hero.mobileThumbs[0];
  const isRtl = data.dir === 'rtl';

  return (
    <>
      {/* DESKTOP HERO SECTION */}
      <section
        id="about"
        className="hidden lg:block relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface py-16 xl:py-20 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-12">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="col-span-6 flex flex-col items-start gap-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-primary text-xs font-semibold tracking-wide border border-outline-variant/40">
                <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
                  roofing
                </span>
                <span>{data.hero.eyebrow}</span>
              </div>

              <h1 className="font-display text-5xl xl:text-6xl text-primary leading-[1.15] font-medium text-balance">
                {data.hero.headlineLine1}
                <br />
                <span className="italic font-normal text-secondary">{data.hero.headlineAccent}</span>{' '}
                {data.hero.headlineEnd}
              </h1>

              <p className="text-base xl:text-lg text-on-surface-variant leading-relaxed">
                {data.hero.description}
              </p>

              {/* Quick Service Highlights */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary/80">
                {data.hero.serviceBadges.map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-full bg-surface-container">
                    {badge}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  className="btn btn-secondary rounded-full h-12 px-7 text-sm font-semibold shadow-md hover:bg-secondary-container hover:text-on-secondary-container border-none group"
                  href="#menu"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    menu_book
                  </span>
                  <span>{data.hero.primaryCta}</span>
                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                    }`}
                    aria-hidden="true"
                  >
                    {isRtl ? 'arrow_back' : 'arrow_forward'}
                  </span>
                </a>

                <a
                  className="btn rounded-full h-12 px-6 bg-surface-container text-primary text-sm font-semibold border border-outline-variant/50 hover:bg-surface-container-high"
                  href={`https://wa.me/${data.brand.whatsappDigits}?text=${encodeURIComponent(
                    isRtl
                      ? 'مرحباً! أود الاستفسار عن زيارة جنغل فيفر.'
                      : 'Hello! I would like to inquire about visiting Jungle Fever.',
                  )}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-600" aria-hidden="true">
                    chat
                  </span>
                  <span>
                    {isRtl ? 'واتساب: ' : 'WhatsApp: '}
                    <span dir="ltr" className="inline-block">
                      {data.brand.whatsappNumberDisplay}
                    </span>
                  </span>
                </a>
              </div>

              {/* Trust / Convenience Micro-Bar */}
              <div className="pt-3 grid grid-cols-3 gap-x-4 gap-y-2 text-xs text-on-surface-variant">
                {data.hero.trustItems.map((item) => (
                  <span key={item.label} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Collage */}
            <div className="col-span-6 relative">
              <div className="grid grid-cols-12 gap-4 items-center">
                <button
                  type="button"
                  onClick={() =>
                    onInspectImage(
                      CAFE_IMAGES.terraceMain,
                      data.hero.collageMainTitle,
                    )
                  }
                  className="col-span-8 rounded-3xl overflow-hidden shadow-2xl relative aspect-[3/4] group text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <SafeImage
                    src={CAFE_IMAGES.terraceMain}
                    alt={
                      isRtl
                        ? 'تراس جنغل فيفر الخارجي بإطلالته الزجاجية وكراسيه الزرقاء على جبل اللويبدة'
                        : 'Jungle Fever outdoor glass rooftop terrace with blue chairs and reflective city views over Jabal Al-Weibdeh'
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-secondary text-white inline-block mb-1">
                      {data.hero.collageMainBadge}
                    </span>
                    <p className="font-display text-xl font-medium">{data.hero.collageMainTitle}</p>
                    <p className="text-xs text-white/85">{data.hero.collageMainSubtitle}</p>
                  </div>
                </button>

                <div className="col-span-4 flex flex-col gap-4">
                  {data.hero.collageSnaps.map((snap) => (
                    <button
                      key={snap.label}
                      type="button"
                      onClick={() => onInspectImage(snap.src, snap.alt)}
                      className="rounded-2xl overflow-hidden shadow-lg aspect-square relative group cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      <SafeImage
                        src={snap.src}
                        alt={snap.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span
                        className={`absolute bottom-2 ${isRtl ? 'right-2' : 'left-2'} px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                          snap.accent ? 'bg-secondary' : 'bg-primary/75 backdrop-blur-sm'
                        }`}
                      >
                        {snap.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESKTOP QUICK IDENTITY BAR */}
      <section className="hidden lg:block w-full bg-primary-container text-on-primary-container py-4 border-y border-primary/30">
        <div className="max-w-[1280px] mx-auto px-12 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-emerald-300 shrink-0">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                palette
              </span>
            </span>
            <div>
              <strong className="text-white block font-semibold">{data.identityBar.title}</strong>
              <span className="text-on-primary-container/90 text-xs">{data.identityBar.subtitle}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-emerald-200">
            {data.identityBar.highlights.map((item, idx) => (
              <span key={item.label} className="flex items-center gap-3">
                {idx > 0 && <span aria-hidden="true">•</span>}
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE HERO SECTION (Stitch Mobile WhatsApp Landing Page) */}
      <section className="lg:hidden flex flex-col gap-4 pt-20 px-5 pb-6 bg-surface">
        <div className="flex items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">{data.brand.mobileStatusBadge}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[30px] leading-[1.2] font-medium text-primary text-balance">
            {data.hero.mobileHeadline}
          </h1>
          <p className="text-[15px] leading-relaxed text-on-surface-variant">
            {data.hero.mobileDescription}
          </p>
        </div>

        {/* Mobile Hero CTAs */}
        <div className="flex flex-col gap-2.5">
          <a
            className="btn btn-secondary rounded-full w-full min-h-[48px] text-sm font-semibold shadow-md border-none gap-2"
            href={`https://wa.me/${data.brand.whatsappDigits}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chat
            </span>
            <span>{data.hero.mobileWhatsappCta}</span>
          </a>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              className="btn rounded-full min-h-[44px] bg-surface-container-high text-on-surface border-none text-sm font-semibold gap-1.5 hover:bg-surface-container-highest"
              href="#menu"
            >
              <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
                restaurant_menu
              </span>
              <span>{data.hero.mobileMenuCta}</span>
            </a>
            <a
              className="btn rounded-full min-h-[44px] bg-surface-container-high text-on-surface border-none text-sm font-semibold gap-1.5 hover:bg-surface-container-highest"
              href="#amenities"
            >
              <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
                location_on
              </span>
              <span>{data.hero.mobileDirectionsCta}</span>
            </a>
          </div>
        </div>

        {/* Featured Photo + Swipeable Thumbnail Swapper */}
        <div className="flex flex-col gap-2.5 mt-1">
          <button
            type="button"
            onClick={() => onInspectImage(activeThumb.src, activeThumb.caption)}
            className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg bg-surface-container text-start cursor-pointer"
          >
            <SafeImage
              src={activeThumb.src}
              alt={activeThumb.alt}
              className="w-full h-full object-cover transition-opacity duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
              <span
                data-testid="mobile-hero-caption"
                className="text-xs font-semibold bg-primary/85 backdrop-blur-md text-on-primary px-3 py-1 rounded-full truncate"
              >
                {activeThumb.caption}
              </span>
              <span className="text-[11px] font-bold bg-surface-bright/95 text-on-surface px-2.5 py-1 rounded-full shrink-0">
                {data.hero.mobileLocationTag}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Rooftop photo gallery">
            {data.hero.mobileThumbs.map((thumb, idx) => {
              const isSelected = idx === activeThumbIdx;
              return (
                <button
                  key={thumb.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveThumbIdx(idx)}
                  className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden shadow-sm bg-surface-container relative transition-all ${
                    isSelected ? 'ring-2 ring-secondary ring-offset-2 ring-offset-surface' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <SafeImage src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover" />
                  <span
                    className={`absolute bottom-1 ${isRtl ? 'right-1' : 'left-1'} text-[10px] font-bold bg-primary/80 text-on-primary px-1.5 py-0.5 rounded`}
                  >
                    {thumb.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
