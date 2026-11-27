import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function SafeImage({ src, alt, className = 'w-full h-full object-cover', fallbackLabel }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-container via-primary to-secondary/80 text-on-primary p-4 text-center ${className}`}
      >
        <span className="material-symbols-outlined text-3xl text-emerald-300" aria-hidden="true">
          local_cafe
        </span>
        <span className="font-display text-sm font-medium opacity-90">{fallbackLabel ?? alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
