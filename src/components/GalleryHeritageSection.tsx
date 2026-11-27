import { CAFE_IMAGES, type CafeLocaleData } from '../data/cafeData';
import { SafeImage } from './SafeImage';

interface GalleryHeritageSectionProps {
  data: CafeLocaleData;
  onInspectImage: (src: string, alt: string) => void;
  onOpenReservation: () => void;
}

export function GalleryHeritageSection({
  data,
  onInspectImage,
  onOpenReservation,
}: GalleryHeritageSectionProps) {
  const isRtl = data.dir === 'rtl';

  return (
    <>
      {/* ART GALLERY CONNECTION: DESKTOP */}
      <section
        id="gallery-heritage"
        className="hidden lg:block w-full py-24 bg-surface relative overflow-hidden scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-12">
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-6 relative">
              <button
                type="button"
                onClick={() => onInspectImage(CAFE_IMAGES.galleryHall, data.gallery.imageAlt)}
                className="w-full rounded-3xl overflow-hidden shadow-2xl relative aspect-[16/10] bg-stone-100 group text-start cursor-pointer"
              >
                <SafeImage
                  src={CAFE_IMAGES.galleryHall}
                  alt={data.gallery.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-surface/90 backdrop-blur-md border border-surface-container flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary block">
                      {data.gallery.overlayEyebrow}
                    </span>
                    <p className="text-xs font-bold text-primary">{data.gallery.overlayTitle}</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">
                    museum
                  </span>
                </div>
              </button>
            </div>

            <div className="col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  museum
                </span>
                <span>{data.gallery.eyebrow}</span>
              </div>

              <h2 className="font-display text-4xl text-primary font-medium leading-tight text-balance">
                {data.gallery.title}
              </h2>

              {data.gallery.paragraphs.map((para) => (
                <p key={para} className="text-base text-on-surface-variant leading-relaxed">
                  {para}
                </p>
              ))}

              <div className="pt-2 flex flex-wrap gap-4">
                {data.gallery.highlights.map((hl) => (
                  <div key={hl.title} className="p-3.5 rounded-xl bg-surface-container-low flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px]" aria-hidden="true">
                      {hl.icon}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-primary">{hl.title}</h3>
                      <p className="text-[11px] text-on-surface-variant">{hl.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE DOWNSTAIRS GALLERY CARD */}
      <section className="lg:hidden px-5 py-6 bg-surface scroll-mt-20">
        <div className="card rounded-2xl overflow-hidden bg-surface-container-low shadow-md flex flex-col">
          <div className="relative w-full h-44 bg-surface-container">
            <SafeImage src={CAFE_IMAGES.galleryMobile} alt={data.gallery.mobileTitle} className="w-full h-full object-cover" />
            <div
              className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} px-3 py-1 rounded-full bg-primary/85 text-on-primary text-[11px] font-bold backdrop-blur-md`}
            >
              {data.gallery.mobileBadge}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2.5">
            <h2 className="font-display text-2xl font-medium text-primary">{data.gallery.mobileTitle}</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">{data.gallery.mobileDescription}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {data.gallery.mobileTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-[11px] font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTANICAL SANCTUARY ATMOSPHERE STRIP (DESKTOP) */}
      <section className="hidden lg:block w-full relative py-20 bg-primary text-on-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <SafeImage src={CAFE_IMAGES.botanicalBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-[1280px] mx-auto px-12 relative z-10 text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
            {data.sanctuary.eyebrow}
          </span>
          <h2 className="font-display text-5xl font-medium max-w-2xl leading-snug text-balance">
            {data.sanctuary.quote}
          </h2>
          <p className="text-base text-emerald-100/85 max-w-xl leading-relaxed">{data.sanctuary.subtitle}</p>
          <div className="pt-3">
            <button
              type="button"
              onClick={onOpenReservation}
              className="btn btn-secondary rounded-full h-12 px-8 text-sm font-semibold shadow-xl hover:bg-secondary-container hover:text-on-secondary-container border-none"
            >
              {data.sanctuary.cta}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
