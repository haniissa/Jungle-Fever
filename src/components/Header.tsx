import { useEffect, useState } from 'react';
import type { CafeLocaleData, Locale } from '../data/cafeData';
import type { OpenStatus } from '../utils/cafeLogic';

interface HeaderProps {
  data: CafeLocaleData;
  lang: Locale;
  openStatus: OpenStatus | null;
  reservationCount: number;
  onToggleLang: () => void;
  onOpenReservation: () => void;
}

export function Header({
  data,
  lang,
  openStatus,
  reservationCount,
  onToggleLang,
  onOpenReservation,
}: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navItems = [
    { href: '#about', label: data.nav.about },
    { href: '#spaces', label: data.nav.spaces },
    { href: '#menu', label: data.nav.menu },
    { href: '#gallery-heritage', label: data.nav.gallery },
    { href: '#amenities', label: data.nav.amenities },
  ];

  const isOpenNow = openStatus ? openStatus.isOpen : true;

  return (
    <>
      {/* DESKTOP TOP ANNOUNCEMENT & LOCATION STRIP */}
      <aside
        aria-label={lang === 'ar' ? 'إعلان' : 'Announcement'}
        className="hidden lg:block w-full bg-primary text-on-primary py-2 text-xs z-50"
      >
        <div className="max-w-[1280px] mx-auto px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-300'}`}
              aria-hidden="true"
            />
            <span className="font-medium tracking-wide">
              {isOpenNow || !openStatus
                ? data.brand.announcement
                : lang === 'ar'
                  ? `يفتح اليوم (${openStatus.todayHours.ar}) • سطح المتحف الوطني للفنون الجميلة`
                  : `Opens Today (${openStatus.todayHours.en}) • Jordan National Gallery of Fine Arts Rooftop`}
            </span>
          </div>
          <div className="flex items-center gap-6 text-on-primary/90 text-xs">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                schedule
              </span>
              {data.brand.hoursShort}
            </span>
            <a
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors font-bold whitespace-nowrap"
              href={`https://wa.me/${data.brand.whatsappDigits}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                chat
              </span>
              <span>
                {lang === 'ar' ? 'واتساب: ' : 'WhatsApp: '}
                <span dir="ltr" className="inline-block">
                  {data.brand.whatsappNumberDisplay}
                </span>
              </span>
            </a>
          </div>
        </div>
      </aside>

      {/* DESKTOP STICKY DAISYUI NAVBAR */}
      <header className="hidden lg:block sticky top-0 left-0 right-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high transition-all">
        <div className="navbar min-h-20 max-w-[1280px] mx-auto px-12 flex items-center justify-between gap-6">
          {/* Brand Identity */}
          <a className="flex items-center gap-3 group shrink-0" href="#about">
            <div className="w-10 h-10 rounded-full bg-primary-container text-emerald-300 flex items-center justify-center font-display text-xl font-bold border border-primary/20 shadow-sm group-hover:rotate-6 transition-transform">
              {data.brand.monogram}
            </div>
            <div>
              <span className="font-display text-2xl text-primary tracking-tight font-medium block leading-none whitespace-nowrap">
                {data.brand.name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block mt-1 whitespace-nowrap">
                {data.brand.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
            className="flex items-center gap-7 text-sm text-on-surface-variant font-medium"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              className="btn btn-sm btn-ghost rounded-full border border-outline-variant/60 text-primary hover:bg-surface-container px-3.5 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                translate
              </span>
              <span>{data.nav.switchLangLabel}</span>
            </button>

            <button
              type="button"
              onClick={onOpenReservation}
              className="btn btn-primary btn-sm h-10 rounded-full px-4 text-xs md:text-sm font-semibold shadow-md hover:bg-primary-container border-none whitespace-nowrap gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-emerald-400" aria-hidden="true">
                event_seat
              </span>
              <span>{data.nav.reserveCta}</span>
              {reservationCount > 0 && (
                <span className="badge badge-sm bg-secondary text-white border-none tabular-nums">
                  {reservationCount}
                </span>
              )}
            </button>

            <a
              aria-label={data.brand.mapsDirectionsTitle}
              title={data.brand.mapsDirectionsTitle}
              className="btn btn-circle btn-sm w-10 h-10 bg-surface-container border-none text-primary hover:bg-surface-container-high"
              href={data.brand.mapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                directions
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE FIXED TOP HEADER (Stitch Mobile WhatsApp Landing Page) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-16 px-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={data.nav.openMenuAria}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="btn btn-ghost btn-circle w-11 h-11 min-h-0 text-on-surface hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                menu
              </span>
            </button>
            <a href="#about" className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">
                eco
              </span>
              <span className="font-display text-lg font-bold text-primary tracking-tight whitespace-nowrap">
                {data.brand.mobileName}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              className="btn btn-xs h-9 px-3 rounded-full bg-surface-container-high text-primary border-none font-bold"
            >
              {data.nav.switchLangLabel}
            </button>
            <a
              aria-label={`${lang === 'ar' ? 'واتساب' : 'Quick WhatsApp'} ${data.brand.whatsappNumberDisplay}`}
              className="btn btn-circle w-11 h-11 min-h-0 bg-primary-fixed border-none text-on-primary-fixed hover:bg-primary-fixed-dim"
              href={`https://wa.me/${data.brand.whatsappDigits}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                chat
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside
            aria-label={lang === 'ar' ? 'قائمة التنقل' : 'Mobile Navigation'}
            className="relative z-10 w-72 max-w-[82vw] h-full bg-surface text-on-surface shadow-2xl flex flex-col justify-between p-6"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary text-emerald-300 flex items-center justify-center font-display font-bold">
                    {data.brand.monogram}
                  </div>
                  <span className="font-display text-lg font-bold text-primary">{data.brand.name}</span>
                </div>
                <button
                  type="button"
                  aria-label={data.nav.closeMenuAria}
                  onClick={() => setDrawerOpen(false)}
                  className="btn btn-ghost btn-circle btn-sm text-on-surface"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    close
                  </span>
                </button>
              </div>

              <ul className="menu p-0 gap-1 text-base font-medium">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-xl text-on-surface hover:bg-surface-container py-3"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-surface-container-highest">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenReservation();
                }}
                className="btn btn-primary rounded-full w-full text-white border-none"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-300" aria-hidden="true">
                  event_seat
                </span>
                <span>{data.nav.reserveCta}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleLang();
                  setDrawerOpen(false);
                }}
                className="btn btn-ghost rounded-full w-full bg-surface-container text-primary"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  translate
                </span>
                <span>{data.nav.switchLangLabel}</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
