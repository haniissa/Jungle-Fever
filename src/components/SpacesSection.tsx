import { useState } from 'react';
import type { CafeLocaleData, SpaceId } from '../data/cafeData';
import { SafeImage } from './SafeImage';

interface SpacesSectionProps {
  data: CafeLocaleData;
  onInspectImage: (src: string, alt: string) => void;
}

export function SpacesSection({ data, onInspectImage }: SpacesSectionProps) {
  const [activeSpaceId, setActiveSpaceId] = useState<SpaceId>('terrace');
  const activeSpace = data.spaces.items.find((s) => s.id === activeSpaceId) ?? data.spaces.items[0];

  const badgeClass =
    activeSpace.badgeStyle === 'primary'
      ? 'bg-primary-fixed text-on-primary-fixed'
      : activeSpace.badgeStyle === 'neutral'
        ? 'bg-surface-container-highest text-primary'
        : 'bg-secondary-container text-on-secondary-container';

  return (
    <section id="spaces" className="w-full py-10 lg:py-24 bg-surface lg:bg-surface-container-low scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 flex flex-col gap-6 lg:gap-10">
        {/* Section Header */}
        <div className="lg:text-center lg:max-w-2xl lg:mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-secondary block">
            <span className="hidden lg:inline">{data.spaces.eyebrow}</span>
            <span className="lg:hidden">{data.spaces.mobileEyebrow}</span>
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-primary font-medium mt-1">
            <span className="hidden lg:inline">{data.spaces.title}</span>
            <span className="lg:hidden">{data.spaces.mobileTitle}</span>
          </h2>
          <p className="hidden lg:block text-sm md:text-base text-on-surface-variant mt-2 leading-relaxed">
            {data.spaces.subtitle}
          </p>
        </div>

        {/* DESKTOP TABBED SPACES */}
        <div className="hidden lg:flex flex-col gap-8">
          <div
            role="tablist"
            aria-label={data.spaces.title}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {data.spaces.items.map((space) => {
              const isActive = space.id === activeSpaceId;
              return (
                <button
                  key={space.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSpaceId(space.id)}
                  className={`btn rounded-full h-11 px-5 text-sm font-semibold border-none transition-all gap-2 ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm hover:bg-primary-container'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {space.icon}
                  </span>
                  <span>{space.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            data-testid={`space-pane-${activeSpace.id}`}
            className="grid grid-cols-12 gap-8 items-center bg-surface p-10 rounded-3xl shadow-md"
          >
            <div className="col-span-6 flex flex-col gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${badgeClass}`}>
                {activeSpace.badge}
              </span>
              <h3 className="font-display text-3xl text-primary font-medium">{activeSpace.title}</h3>
              <p className="text-base text-on-surface-variant leading-relaxed">{activeSpace.description}</p>
              <ul className="text-sm text-on-surface space-y-2.5 pt-1 font-medium">
                {activeSpace.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0" aria-hidden="true">
                      check_circle
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeSpace.images.length === 3 ? (
              <div className="col-span-6 grid grid-cols-12 gap-3">
                <button
                  type="button"
                  aria-label={activeSpace.images[0].alt}
                  onClick={() => onInspectImage(activeSpace.images[0].src, activeSpace.images[0].alt)}
                  className="col-span-7 rounded-2xl overflow-hidden aspect-[4/5] shadow-md group cursor-pointer"
                >
                  <SafeImage
                    src={activeSpace.images[0].src}
                    alt={activeSpace.images[0].alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
                <div className="col-span-5 flex flex-col gap-3">
                  {activeSpace.images.slice(1).map((img) => (
                    <button
                      key={img.src}
                      type="button"
                      aria-label={img.alt}
                      onClick={() => onInspectImage(img.src, img.alt)}
                      className="rounded-xl overflow-hidden aspect-square shadow-md group cursor-pointer"
                    >
                      <SafeImage
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-6 grid grid-cols-2 gap-4">
                {activeSpace.images.map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    aria-label={img.alt}
                    onClick={() => onInspectImage(img.src, img.alt)}
                    className="rounded-2xl overflow-hidden aspect-[4/5] shadow-md group cursor-pointer"
                  >
                    <SafeImage
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE SWIPEABLE SPACES CARDS */}
        <div className="lg:hidden flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
          {data.spaces.items.map((space) => (
            <article
              key={space.id}
              className="card shrink-0 w-64 snap-start rounded-2xl overflow-hidden bg-surface-container-lowest shadow-md flex flex-col"
            >
              <button
                type="button"
                onClick={() => onInspectImage(space.mobileImage, space.tabLabel)}
                className="w-full h-40 bg-surface-container overflow-hidden cursor-pointer"
              >
                <SafeImage src={space.mobileImage} alt={space.tabLabel} className="w-full h-full object-cover" />
              </button>
              <div className="p-4 flex flex-col gap-1">
                <h3 className="text-base font-semibold text-on-surface">{space.tabLabel}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{space.mobileSummary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
