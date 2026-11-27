import type { CafeLocaleData } from '../data/cafeData';

interface AmenitiesLocationSectionProps {
  data: CafeLocaleData;
  onOpenReservation: () => void;
}

export function AmenitiesLocationSection({
  data,
  onOpenReservation,
}: AmenitiesLocationSectionProps) {
  const hub = data.amenities.locationHub;

  return (
    <section
      id="amenities"
      className="w-full py-10 lg:py-24 bg-surface lg:bg-surface-container-low scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 flex flex-col gap-6 lg:gap-12">
        {/* Header */}
        <div className="lg:text-center lg:max-w-xl lg:mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-secondary block">
            <span className="hidden lg:inline">{data.amenities.eyebrow}</span>
            <span className="lg:hidden">{data.amenities.mobileEyebrow}</span>
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-primary font-medium mt-1">
            <span className="hidden lg:inline">{data.amenities.title}</span>
            <span className="lg:hidden">{data.amenities.mobileTitle}</span>
          </h2>
          <p className="hidden lg:block text-base text-on-surface-variant mt-2">{data.amenities.subtitle}</p>
        </div>

        {/* DESKTOP 6 AMENITY CARDS */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {data.amenities.items.map((amenity) => (
            <div
              key={amenity.id}
              className="card p-6 rounded-2xl bg-surface shadow-sm border border-surface-container flex flex-col gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                  {amenity.icon}
                </span>
              </div>
              <h3 className="text-base font-bold text-primary">{amenity.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{amenity.description}</p>
            </div>
          ))}
        </div>

        {/* MOBILE 2-COLUMN AMENITY BADGES */}
        <div className="lg:hidden grid grid-cols-2 gap-2.5">
          {data.amenities.items.map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0" aria-hidden="true">
                {amenity.icon}
              </span>
              <span className="text-xs font-semibold text-on-surface truncate">{amenity.shortLabel}</span>
            </div>
          ))}
        </div>

        {/* LOCATION & CONTACT HUB (DEEP FOREST GREEN) */}
        <div
          id="location"
          className="rounded-2xl lg:rounded-3xl bg-primary text-on-primary p-6 lg:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center scroll-mt-20"
        >
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                location_on
              </span>
              <span className="hidden lg:inline">{hub.eyebrow}</span>
              <span className="lg:hidden">{hub.mobileEyebrow}</span>
            </div>

            <h3 className="font-display text-2xl lg:text-3xl font-medium text-on-primary">{hub.title}</h3>

            <address className="hidden lg:block not-italic text-sm text-emerald-100/85 leading-relaxed">
              {hub.address}
            </address>

            {/* Desktop Hours Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-primary-container border border-primary/40">
                <span className="text-emerald-300 font-bold block mb-1">{hub.satThuLabel}</span>
                <span className="text-white text-sm font-semibold tabular-nums">{hub.satThuHours}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-primary-container border border-primary/40">
                <span className="text-emerald-300 font-bold block mb-1">{hub.friLabel}</span>
                <span className="text-white text-sm font-semibold tabular-nums">{hub.friHours}</span>
              </div>
            </div>

            {/* Mobile Hours Rows */}
            <div className="lg:hidden flex flex-col gap-1.5 text-primary-fixed text-xs">
              <div className="flex items-center justify-between">
                <span>{hub.satThuLabel}</span>
                <span className="font-semibold text-on-primary tabular-nums">{hub.satThuHoursShort}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{hub.friShortLabel}</span>
                <span className="font-semibold text-on-primary tabular-nums">{hub.friHoursShort}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              className="btn rounded-full h-12 bg-emerald-500 lg:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:bg-emerald-600 border-none gap-2"
              href={`https://wa.me/${data.brand.whatsappDigits}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                chat
              </span>
              <span>
                {data.lang === 'ar' ? 'راسلنا على واتساب: ' : 'Message on WhatsApp: '}
                <span dir="ltr" className="inline-block">
                  {data.brand.whatsappNumberDisplay}
                </span>
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenReservation}
              className="btn btn-secondary rounded-full h-12 text-sm font-bold shadow-md border-none gap-2"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                event_seat
              </span>
              <span>{hub.reserveBtnCta}</span>
            </button>

            <a
              className="btn rounded-full h-12 bg-surface-bright lg:bg-primary-container text-on-surface lg:text-white border border-emerald-500/30 text-xs md:text-sm font-semibold hover:bg-white hover:text-primary gap-2"
              href={data.brand.mapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                directions
              </span>
              <span className="hidden lg:inline">{hub.mapsCta}</span>
              <span className="lg:hidden">{hub.mobileMapsCta}</span>
            </a>

            <div className="hidden lg:block text-center pt-1">
              <a
                href={`tel:+${data.brand.whatsappDigits}`}
                className="text-[11px] text-emerald-300/85 hover:text-white hover:underline transition-colors"
              >
                {hub.directLineNote}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
