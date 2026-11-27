import { useEffect, useState } from 'react';
import { CAFE_CONTENT, type CafeLocaleData, type Locale } from './data/cafeData';
import type { OpenStatus, ReservationRecord } from './utils/cafeLogic';
import { fetchCafePayload, fetchReservations } from './utils/cafeClient';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { SpacesSection } from './components/SpacesSection';
import { GalleryHeritageSection } from './components/GalleryHeritageSection';
import { AmenitiesLocationSection } from './components/AmenitiesLocationSection';
import { Footer } from './components/Footer';
import { ChalkboardModal } from './components/ChalkboardModal';
import { ReservationModal } from './components/ReservationModal';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  if (params.get('lang') === 'ar' || window.location.pathname.endsWith('/ar')) {
    return 'ar';
  }
  return 'en';
}

export default function App() {
  const [lang, setLang] = useState<Locale>(getInitialLocale);
  const [serverData, setServerData] = useState<CafeLocaleData | null>(null);
  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);

  const data = serverData?.lang === lang ? serverData : CAFE_CONTENT[lang];

  // Sync HTML dir, lang, and title for EN (LTR) and AR (RTL)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'جنغل فيفر للقهوة والشاي | سطح المتحف الوطني الأردني للفنون الجميلة'
        : 'Jungle Fever Coffee and Tea House | Rooftop at Jordan National Gallery of Fine Arts';
  }, [lang]);

  // Fetch live cafe data & Amman open status (Hono API or static GitHub Pages mode)
  useEffect(() => {
    const controller = new AbortController();
    fetchCafePayload(lang, {}, controller.signal)
      .then((payload) => {
        setServerData(payload.content);
        setOpenStatus(payload.openStatus);
      })
      .catch(() => {
        // Ignore abort errors
      });
    return () => controller.abort();
  }, [lang]);

  // Load persisted reservation requests (Hono API or localStorage on GitHub Pages)
  useEffect(() => {
    fetchReservations()
      .then((list) => setReservations(list))
      .catch(() => {
        // Ignore transient failure
      });
  }, []);

  function handleToggleLang() {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }

  return (
    <div
      data-theme="junglefever"
      dir={data.dir}
      className="min-h-screen flex flex-col bg-surface text-on-surface font-body"
    >
      <Header
        data={data}
        lang={lang}
        openStatus={openStatus}
        reservationCount={reservations.length}
        onToggleLang={handleToggleLang}
        onOpenReservation={() => setReservationModalOpen(true)}
      />

      <main className="w-full flex-1 pb-20 lg:pb-0">
        <HeroSection
          data={data}
          onInspectImage={(src, alt) => setLightboxImage({ src, alt })}
        />

        <MenuSection
          data={data}
          onInspectImage={(src, alt) => setLightboxImage({ src, alt })}
        />

        <SpacesSection
          data={data}
          onInspectImage={(src, alt) => setLightboxImage({ src, alt })}
        />

        <GalleryHeritageSection
          data={data}
          onInspectImage={(src, alt) => setLightboxImage({ src, alt })}
          onOpenReservation={() => setReservationModalOpen(true)}
        />

        <AmenitiesLocationSection
          data={data}
          onOpenReservation={() => setReservationModalOpen(true)}
        />
      </main>

      <Footer data={data} />

      <ChalkboardModal
        image={lightboxImage}
        isRtl={data.dir === 'rtl'}
        onClose={() => setLightboxImage(null)}
      />

      <ReservationModal
        open={reservationModalOpen}
        data={data}
        reservations={reservations}
        onClose={() => setReservationModalOpen(false)}
        onCreated={(record) => setReservations((prev) => [record, ...prev])}
        onCancelled={(id) => setReservations((prev) => prev.filter((r) => r.id !== id))}
      />
    </div>
  );
}
