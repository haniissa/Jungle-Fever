import { useEffect } from 'react';
import { SafeImage } from './SafeImage';

interface ChalkboardModalProps {
  image: { src: string; alt: string } | null;
  isRtl: boolean;
  onClose: () => void;
}

export function ChalkboardModal({ image, isRtl, onClose }: ChalkboardModalProps) {
  useEffect(() => {
    if (!image) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <dialog open className="modal modal-open z-[70]" aria-label={image.alt}>
      <div className="modal-box max-w-xl p-0 bg-surface rounded-3xl overflow-hidden shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          aria-label={isRtl ? 'إغلاق المعاينة' : 'Close image viewer'}
          className={`btn btn-circle btn-sm absolute top-3 ${
            isRtl ? 'left-3' : 'right-3'
          } bg-black/70 text-white border-none hover:bg-black z-10`}
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            close
          </span>
        </button>

        <div className="bg-stone-950 flex items-center justify-center max-h-[78vh] overflow-hidden">
          <SafeImage
            src={image.src}
            alt={image.alt}
            className="w-full h-auto max-h-[78vh] object-contain"
          />
        </div>

        <div className="px-5 py-3.5 bg-surface-container-low text-xs text-on-surface-variant flex items-center justify-between gap-3">
          <span className="font-medium text-on-surface">{image.alt}</span>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-xs rounded-full bg-surface-container-highest text-primary border-none shrink-0"
          >
            {isRtl ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop bg-black/75 backdrop-blur-xs">
        <button type="button" onClick={onClose} aria-label={isRtl ? 'إغلاق' : 'Close backdrop'}>
          close
        </button>
      </form>
    </dialog>
  );
}
