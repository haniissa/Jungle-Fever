import { useEffect, useState } from 'react';
import {
  CAFE_IMAGES,
  type CafeLocaleData,
  type MenuCategoryId,
  type MenuItem,
} from '../data/cafeData';
import { filterMenuItems, shouldShowFlavoursGroup } from '../utils/cafeLogic';
import { fetchFilteredMenu } from '../utils/cafeClient';
import { SafeImage } from './SafeImage';

interface MenuSectionProps {
  data: CafeLocaleData;
  onInspectImage: (src: string, alt: string) => void;
}

export function MenuSection({ data, onInspectImage }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileBoardOpen, setMobileBoardOpen] = useState(false);
  const [apiItems, setApiItems] = useState<MenuItem[] | null>(null);
  const [apiShowFlavours, setApiShowFlavours] = useState<boolean | null>(null);

  // Sync filtered menu from Hono /api/menu (or local filter in static GitHub Pages mode)
  useEffect(() => {
    const controller = new AbortController();
    fetchFilteredMenu(data.lang, activeCategory, searchQuery, {}, controller.signal)
      .then((payload) => {
        setApiItems(payload.items);
        setApiShowFlavours(payload.showFlavours);
      })
      .catch(() => {
        // Ignore abort errors
      });
    return () => controller.abort();
  }, [data.lang, activeCategory, searchQuery]);

  // Immediate deterministic UI response synced with Hono API
  const localItems = filterMenuItems(data.menu.items, activeCategory, searchQuery);
  const items = apiItems ?? localItems;
  const showFlavours =
    apiShowFlavours !== null
      ? apiShowFlavours
      : shouldShowFlavoursGroup(data.menu.flavours, activeCategory, searchQuery);

  const hotItems = items.filter((item) => item.category === 'hot');
  const specialItems = items.filter((item) => item.category === 'special');
  const dessertItems = items.filter((item) => item.category === 'dessert');
  const hasAnyMatches = items.length > 0 || showFlavours;

  const isRtl = data.dir === 'rtl';
  const askBaristaUrl = `https://wa.me/${data.brand.whatsappDigits}?text=${encodeURIComponent(
    data.menu.chalkboard.whatsappPrompt,
  )}`;

  return (
    <section id="menu" className="w-full py-10 lg:py-24 bg-surface scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 flex flex-col gap-6 lg:gap-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-secondary block">
              <span className="hidden lg:inline">{data.menu.eyebrow}</span>
              <span className="lg:hidden">{data.menu.mobileEyebrow}</span>
            </span>
            <div className="flex items-end justify-between gap-2 mt-1">
              <h2 className="font-display text-3xl lg:text-4xl text-primary font-medium">
                <span className="hidden lg:inline">{data.menu.title}</span>
                <span className="lg:hidden">{data.menu.mobileTitle}</span>
              </h2>
              <span className="lg:hidden text-xs text-on-surface-variant shrink-0">
                {data.menu.pricesNote}
              </span>
            </div>
            <p className="hidden lg:block text-sm md:text-base text-on-surface-variant max-w-xl mt-1.5 leading-relaxed">
              {data.menu.subtitle}
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col items-stretch lg:items-end gap-3">
            <div
              role="tablist"
              aria-label={data.lang === 'ar' ? 'تصنيفات القائمة' : 'Menu categories'}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
            >
              {data.menu.categories.map((cat) => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`btn btn-sm h-9 rounded-full border-none px-4 text-xs font-bold shrink-0 whitespace-nowrap transition-all ${
                      active
                        ? 'bg-primary text-on-primary shadow-sm hover:bg-primary-container'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.mobileLabel}</span>
                  </button>
                );
              })}
            </div>

            <label className="input input-sm rounded-full bg-surface-container-low border-outline-variant/40 flex items-center gap-2 w-full sm:w-72">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant" aria-hidden="true">
                search
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={data.menu.searchPlaceholder}
                aria-label={data.menu.searchPlaceholder}
                className="grow text-xs text-on-surface placeholder:text-on-surface-variant/70 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label={data.lang === 'ar' ? 'مسح البحث' : 'Clear search'}
                  onClick={() => setSearchQuery('')}
                  className="btn btn-ghost btn-xs btn-circle"
                >
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    close
                  </span>
                </button>
              )}
            </label>
          </div>
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Menu Items Column */}
          <div className="lg:col-span-8 flex flex-col gap-8" data-testid="menu-items-container">
            {!hasAnyMatches && (
              <div className="card bg-surface-container-low p-8 text-center items-center gap-3 rounded-2xl">
                <span className="material-symbols-outlined text-4xl text-secondary/70" aria-hidden="true">
                  local_cafe
                </span>
                <p className="text-sm text-on-surface-variant">{data.menu.noResults}</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="btn btn-primary btn-sm rounded-full"
                >
                  {data.menu.resetFilter}
                </button>
              </div>
            )}

            {/* HOT DRINKS */}
            {hotItems.length > 0 && (
              <div className="menu-group" data-testid="menu-group-hot">
                <div className="flex items-center gap-3 pb-3 border-b border-surface-container-highest">
                  <span className="material-symbols-outlined text-secondary text-[22px]" aria-hidden="true">
                    {data.menu.groupMeta.hot.icon}
                  </span>
                  <h3 className="font-display text-2xl text-primary font-medium">
                    {data.menu.groupMeta.hot.title}
                  </h3>
                  <span className={`text-xs text-on-surface-variant font-medium ${isRtl ? 'mr-auto' : 'ml-auto'}`}>
                    {data.menu.groupMeta.hot.note}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                  {hotItems.map((item) => (
                    <div
                      key={item.id}
                      data-testid="menu-item-card"
                      className="p-3.5 rounded-xl bg-surface-container-lowest lg:bg-surface-container-low hover:bg-surface-container transition-colors flex justify-between items-start gap-3 shadow-xs lg:shadow-none"
                    >
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-primary">{item.name}</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">{item.description}</p>
                      </div>
                      <span className="font-bold text-secondary text-sm shrink-0 tabular-nums">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* JF SPECIALITIES */}
            {specialItems.length > 0 && (
              <div className="menu-group" data-testid="menu-group-special">
                <div className="flex items-center gap-3 pb-3 border-b border-surface-container-highest">
                  <span className="material-symbols-outlined text-secondary text-[22px]" aria-hidden="true">
                    {data.menu.groupMeta.special.icon}
                  </span>
                  <h3 className="font-display text-2xl text-primary font-medium">
                    {data.menu.groupMeta.special.title}
                  </h3>
                  <span
                    className={`text-xs text-secondary font-bold uppercase tracking-wider ${
                      isRtl ? 'mr-auto' : 'ml-auto'
                    }`}
                  >
                    {data.menu.groupMeta.special.note}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                  {specialItems.map((item) => (
                    <div
                      key={item.id}
                      data-testid="menu-item-card"
                      className="p-3.5 rounded-xl bg-surface-container-lowest lg:bg-surface-container-low hover:bg-surface-container transition-colors flex justify-between items-start gap-3 shadow-xs lg:shadow-none"
                    >
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-primary">{item.name}</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">{item.description}</p>
                      </div>
                      <span className="font-bold text-secondary text-sm shrink-0 tabular-nums">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADD FLAVOURS & MODIFIERS */}
            {showFlavours && (
              <div className="menu-group" data-testid="menu-group-flavours">
                <div className="flex items-center gap-3 pb-3 border-b border-surface-container-highest">
                  <span className="material-symbols-outlined text-secondary text-[22px]" aria-hidden="true">
                    {data.menu.groupMeta.flavours.icon}
                  </span>
                  <h3 className="font-display text-2xl text-primary font-medium">
                    {data.menu.groupMeta.flavours.title}
                  </h3>
                  <span className={`text-xs text-primary font-bold tabular-nums ${isRtl ? 'mr-auto' : 'ml-auto'}`}>
                    {data.menu.groupMeta.flavours.note}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low mt-4">
                  <p className="text-xs font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">
                    {data.menu.groupMeta.flavours.syrupsTitle}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {data.menu.flavours.map((flavour) => (
                      <span
                        key={flavour}
                        className="px-3 py-1.5 rounded-lg bg-surface font-medium text-primary shadow-xs"
                      >
                        {flavour}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
                      {data.menu.groupMeta.flavours.sugarFreeBadge}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {data.menu.groupMeta.flavours.sugarFreeNote}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SIGNATURE DESSERTS & BAKES */}
            {dessertItems.length > 0 && (
              <div className="menu-group" data-testid="menu-group-dessert">
                <div className="flex items-center gap-3 pb-3 border-b border-surface-container-highest">
                  <span className="material-symbols-outlined text-secondary text-[22px]" aria-hidden="true">
                    {data.menu.groupMeta.dessert.icon}
                  </span>
                  <h3 className="font-display text-2xl text-primary font-medium">
                    {data.menu.groupMeta.dessert.title}
                  </h3>
                  <span
                    className={`text-xs text-secondary font-bold uppercase tracking-wider ${
                      isRtl ? 'mr-auto' : 'ml-auto'
                    }`}
                  >
                    {data.menu.groupMeta.dessert.note}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {dessertItems.map((item) => (
                    <div
                      key={item.id}
                      data-testid="menu-item-card"
                      className="p-4 rounded-xl bg-surface-container-lowest lg:bg-surface-container-low hover:bg-surface-container transition-colors flex gap-4 items-center shadow-xs lg:shadow-none"
                    >
                      {item.image ? (
                        <button
                          type="button"
                          aria-label={`${isRtl ? 'عرض صورة' : 'View photo of'} ${item.name}`}
                          onClick={() => onInspectImage(item.image!, item.name)}
                          className="w-16 h-16 rounded-lg overflow-hidden shrink-0 cursor-pointer"
                        >
                          <SafeImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </button>
                      ) : (
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-surface-container flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
                            cake
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="text-sm font-bold text-primary">{item.name}</h4>
                          <span className="font-bold text-secondary text-sm shrink-0 tabular-nums">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP RIGHT COLUMN: Sticky Authentic Chalkboard Card */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="card rounded-3xl bg-surface-container-low p-5 shadow-lg border border-surface-container-high flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {data.menu.chalkboard.title}
                </span>
                <span className="text-[11px] font-semibold text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  {data.menu.chalkboard.status}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onInspectImage(CAFE_IMAGES.chalkboard, data.menu.chalkboard.imageAlt)}
                aria-label={data.menu.chalkboard.tapHint}
                className="relative rounded-2xl overflow-hidden shadow-inner bg-stone-900 aspect-[9/16] max-h-[460px] w-full group cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
              >
                <SafeImage
                  src={CAFE_IMAGES.chalkboard}
                  alt={data.menu.chalkboard.imageAlt}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/75 backdrop-blur-sm text-white text-xs text-center">
                  {data.menu.chalkboard.tapHint}
                </div>
              </button>

              <a
                className="btn btn-secondary rounded-full w-full text-xs font-bold tracking-wide hover:bg-secondary-container hover:text-on-secondary-container border-none gap-2"
                href={askBaristaUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  chat
                </span>
                <span>{data.menu.chalkboard.askBaristaCta}</span>
              </a>
            </div>
          </div>

          {/* MOBILE EXPANDABLE CHALKBOARD PREVIEW CARD */}
          <div className="lg:hidden rounded-2xl bg-surface-container p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">
                  edit_note
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-on-surface truncate">
                    {data.menu.chalkboard.mobileTitle}
                  </span>
                  <span className="text-xs text-on-surface-variant truncate">
                    {data.menu.chalkboard.mobileSubtitle}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-expanded={mobileBoardOpen}
                onClick={() => setMobileBoardOpen((prev) => !prev)}
                className="btn btn-sm rounded-full bg-surface-container-highest text-on-surface border-none text-xs font-semibold shrink-0"
              >
                {mobileBoardOpen
                  ? data.menu.chalkboard.hideBoardLabel
                  : data.menu.chalkboard.viewBoardLabel}
              </button>
            </div>

            {mobileBoardOpen && (
              <button
                type="button"
                onClick={() => onInspectImage(CAFE_IMAGES.chalkboardMobile, data.menu.chalkboard.imageAlt)}
                className="w-full h-72 rounded-xl overflow-hidden bg-surface-container-high cursor-pointer"
                data-testid="mobile-chalkboard-preview"
              >
                <SafeImage
                  src={CAFE_IMAGES.chalkboardMobile}
                  alt={data.menu.chalkboard.imageAlt}
                  className="w-full h-full object-cover"
                />
              </button>
            )}

            <a
              className="btn rounded-full min-h-[44px] w-full bg-primary-fixed text-on-primary-fixed border-none hover:bg-primary-fixed-dim text-sm font-semibold gap-2"
              href={askBaristaUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                chat
              </span>
              <span>{data.menu.chalkboard.askBaristaCta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
