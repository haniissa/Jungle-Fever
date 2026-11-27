import type { CafeLocaleData } from '../data/cafeData';

interface FooterProps {
  data: CafeLocaleData;
}

export function Footer({ data }: FooterProps) {
  return (
    <>
      {/* DESKTOP FOOTER */}
      <footer className="hidden lg:block w-full bg-surface-container-high text-on-surface-variant border-t border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-12 pt-14 pb-8">
          <div className="grid grid-cols-12 gap-8 pb-10">
            {/* About Column */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary text-emerald-300 flex items-center justify-center font-display font-bold">
                  {data.brand.monogram}
                </div>
                <span className="font-display text-xl text-primary font-medium">{data.brand.fullName}</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{data.footer.aboutText}</p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="btn btn-circle btn-sm w-9 h-9 bg-surface-container text-primary border-none hover:bg-primary hover:text-white"
                  href={`https://wa.me/${data.brand.whatsappDigits}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    chat
                  </span>
                </a>
                <a
                  aria-label="Google Maps"
                  title="Google Maps"
                  className="btn btn-circle btn-sm w-9 h-9 bg-surface-container text-primary border-none hover:bg-primary hover:text-white"
                  href={data.brand.mapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    explore
                  </span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-3 flex flex-col gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-primary mb-1">
                {data.footer.exploreTitle}
              </span>
              {data.footer.exploreLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Hours & Contact */}
            <address className="col-span-5 flex flex-col gap-2 not-italic">
              <span className="text-xs uppercase font-bold tracking-wider text-primary mb-1">
                {data.footer.hoursTitle}
              </span>
              <p className="text-xs text-on-surface">
                <strong>{data.footer.locationLabel}</strong> {data.footer.locationValue}
              </p>
              <p className="text-xs text-on-surface">
                <strong>{data.footer.satThuLabel}</strong> {data.footer.satThuValue}
              </p>
              <p className="text-xs text-on-surface">
                <strong>{data.footer.friLabel}</strong> {data.footer.friValue}
              </p>
              <p className="text-xs text-on-surface">
                <strong>{data.footer.directLabel}</strong>{' '}
                <a
                  className="text-secondary font-bold hover:underline"
                  dir="ltr"
                  href={`tel:+${data.brand.whatsappDigits}`}
                >
                  {data.brand.whatsappNumberDisplay}
                </a>
              </p>
              <p className="text-xs text-emerald-700 font-medium pt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  local_parking
                </span>
                {data.footer.parkingNote}
              </p>
            </address>
          </div>

          <div className="pt-6 border-t border-outline-variant/30 flex items-center justify-between gap-4 text-xs text-on-surface-variant">
            <p>{data.footer.copyright}</p>
            <p>{data.footer.bottomLocation}</p>
          </div>
        </div>
      </footer>

      {/* MOBILE FIXED BOTTOM CONCIERGE DOCK */}
      <nav
        aria-label={data.lang === 'ar' ? 'إجراءات سريعة' : 'Quick concierge actions'}
        className="lg:hidden fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-surface/92 backdrop-blur-xl shadow-[0_-2px_16px_rgba(27,59,43,0.08)] border-t border-surface-container-high"
      >
        <div className="flex items-center justify-between gap-2 h-16 px-4">
          <a
            className="btn btn-secondary rounded-full flex-1 h-11 min-h-0 px-3.5 text-[13px] font-semibold border-none gap-1.5 whitespace-nowrap"
            href={`https://wa.me/${data.brand.whatsappDigits}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px] shrink-0" aria-hidden="true">
              chat
            </span>
            <span className="truncate">{data.footer.mobileDockWhatsapp}</span>
          </a>
          <a
            className="btn rounded-full h-11 min-h-0 px-3.5 bg-surface-container-high text-on-surface border-none text-[13px] font-semibold hover:bg-surface-container-highest gap-1.5 whitespace-nowrap shrink-0"
            href="#location"
          >
            <span className="material-symbols-outlined text-[18px] shrink-0" aria-hidden="true">
              directions
            </span>
            <span>{data.footer.mobileDockDirections}</span>
          </a>
        </div>
      </nav>
    </>
  );
}
