import { useEffect, useState, type FormEvent } from 'react';
import type { CafeLocaleData, SpaceId } from '../data/cafeData';
import { validateReservationInput, type ReservationRecord } from '../utils/cafeLogic';
import { createReservation, deleteReservation } from '../utils/cafeClient';

interface ReservationModalProps {
  open: boolean;
  data: CafeLocaleData;
  reservations: ReservationRecord[];
  onClose: () => void;
  onCreated: (record: ReservationRecord) => void;
  onCancelled: (id: string) => void;
}

function getDefaultDate(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return tomorrow.toISOString().slice(0, 10);
}

export function ReservationModal({
  open,
  data,
  reservations,
  onClose,
  onCreated,
  onCancelled,
}: ReservationModalProps) {
  const m = data.reservationModal;
  const isRtl = data.dir === 'rtl';

  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState(2);
  const [space, setSpace] = useState<SpaceId>('terrace');
  const [date, setDate] = useState(getDefaultDate);
  const [time, setTime] = useState('18:00');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [latestCreated, setLatestCreated] = useState<ReservationRecord | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const spaceLabelMap = Object.fromEntries(
    data.spaces.items.map((s) => [s.id, s.tabLabel]),
  ) as Record<SpaceId, string>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateReservationInput(
      { guestName, guests, space, date, time, phone, notes },
      data.lang,
    );

    if (!validation.valid || !validation.sanitized) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const result = await createReservation(validation.sanitized, data.lang);
      if (!result.ok) {
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        setSubmitError(result.error);
        return;
      }

      setLatestCreated(result.reservation);
      onCreated(result.reservation);
      setGuestName('');
      setPhone('');
      setNotes('');
    } catch {
      setSubmitError(isRtl ? 'تعذر حفظ الطلب. يرجى المحاولة مرة أخرى.' : 'Could not save request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCancel(id: string) {
    setCancellingId(id);
    try {
      const removed = await deleteReservation(id);
      if (removed) {
        if (latestCreated?.id === id) setLatestCreated(null);
        onCancelled(id);
      }
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <dialog open className="modal modal-open z-[70]" aria-labelledby="reservation-modal-title">
      <div className="modal-box max-w-2xl bg-surface text-on-surface rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-surface-container-highest">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              {data.brand.name} • {data.hero.mobileLocationTag}
            </span>
            <h2 id="reservation-modal-title" className="font-display text-2xl md:text-3xl text-primary font-medium mt-1">
              {m.title}
            </h2>
            <p className="text-xs md:text-sm text-on-surface-variant mt-1">{m.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={m.closeButton}
            className="btn btn-circle btn-ghost btn-sm text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        {/* Confirmation Banner */}
        {latestCreated && (
          <div
            role="status"
            data-testid="reservation-confirmation"
            className="alert bg-primary text-on-primary rounded-2xl mt-5 flex flex-col items-stretch gap-3 p-4 shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-300" aria-hidden="true">
                  check_circle
                </span>
                <span className="font-bold text-sm">{m.confirmationTitle}</span>
              </div>
              <span className="badge bg-primary-container text-emerald-200 border-none font-mono font-bold">
                {m.referenceLabel}: {latestCreated.referenceCode}
              </span>
            </div>
            <p className="text-xs text-emerald-100/90">
              {latestCreated.guestName} · {latestCreated.guests} · {spaceLabelMap[latestCreated.space]} ·{' '}
              <span dir="ltr">
                {latestCreated.date} {latestCreated.time}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={latestCreated.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm rounded-full bg-emerald-500 hover:bg-emerald-600 text-white border-none gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  chat
                </span>
                <span>{m.sendWhatsappCta}</span>
              </a>
              <button
                type="button"
                onClick={() => setLatestCreated(null)}
                className="btn btn-sm btn-ghost rounded-full text-emerald-200 hover:bg-primary-container"
              >
                {m.newInquiryButton}
              </button>
            </div>
          </div>
        )}

        {/* Reservation Form */}
        <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
          {submitError && (
            <div role="alert" className="alert alert-error text-xs rounded-xl py-2.5 px-4 text-white">
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="res-name" className="text-xs font-bold text-primary">
                {m.guestNameLabel} *
              </label>
              <input
                id="res-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={m.guestNamePlaceholder}
                aria-invalid={Boolean(fieldErrors.guestName)}
                className={`input input-bordered w-full bg-surface-container-low text-sm ${
                  fieldErrors.guestName ? 'input-error' : 'border-outline-variant/60'
                }`}
              />
              {fieldErrors.guestName && (
                <span className="text-xs text-error font-medium">{fieldErrors.guestName}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="res-phone" className="text-xs font-bold text-primary">
                {m.phoneLabel} *
              </label>
              <input
                id="res-phone"
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={m.phonePlaceholder}
                aria-invalid={Boolean(fieldErrors.phone)}
                className={`input input-bordered w-full bg-surface-container-low text-sm ${
                  fieldErrors.phone ? 'input-error' : 'border-outline-variant/60'
                }`}
              />
              {fieldErrors.phone && <span className="text-xs text-error font-medium">{fieldErrors.phone}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="res-space" className="text-xs font-bold text-primary">
                {m.spaceLabel}
              </label>
              <select
                id="res-space"
                value={space}
                onChange={(e) => setSpace(e.target.value as SpaceId)}
                className="select select-bordered w-full bg-surface-container-low border-outline-variant/60 text-sm"
              >
                {data.spaces.items.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.tabLabel}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="res-guests" className="text-xs font-bold text-primary">
                {m.guestsLabel}
              </label>
              <input
                id="res-guests"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="input input-bordered w-full bg-surface-container-low border-outline-variant/60 text-sm tabular-nums"
              />
              {fieldErrors.guests && <span className="text-xs text-error font-medium">{fieldErrors.guests}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="res-time" className="text-xs font-bold text-primary">
                {m.timeLabel}
              </label>
              <input
                id="res-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input input-bordered w-full bg-surface-container-low border-outline-variant/60 text-sm tabular-nums"
              />
              {fieldErrors.time && <span className="text-xs text-error font-medium">{fieldErrors.time}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="res-date" className="text-xs font-bold text-primary">
                {m.dateLabel} *
              </label>
              <input
                id="res-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`input input-bordered w-full bg-surface-container-low text-sm tabular-nums ${
                  fieldErrors.date ? 'input-error' : 'border-outline-variant/60'
                }`}
              />
              {fieldErrors.date && <span className="text-xs text-error font-medium">{fieldErrors.date}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="res-notes" className="text-xs font-bold text-primary">
                {m.notesLabel}
              </label>
              <input
                id="res-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={m.notesPlaceholder}
                className="input input-bordered w-full bg-surface-container-low border-outline-variant/60 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost rounded-full text-on-surface-variant"
            >
              {m.closeButton}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-secondary rounded-full px-6 border-none font-bold shadow-md"
            >
              {submitting ? m.submittingLabel : m.submitCta}
            </button>
          </div>
        </form>

        {/* Active Reservations List (from Hono server) */}
        <div className="mt-6 pt-5 border-t border-surface-container-highest">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
              {m.yourReservationsTitle}
            </h3>
            <span className="text-xs text-on-surface-variant tabular-nums">{reservations.length}</span>
          </div>

          {reservations.length === 0 ? (
            <p className="text-xs text-on-surface-variant">{m.noReservationsNote}</p>
          ) : (
            <ul className="flex flex-col gap-2.5" data-testid="reservations-list">
              {reservations.map((item) => (
                <li
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-surface-container-low flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-secondary">
                        {item.referenceCode}
                      </span>
                      <span className="text-sm font-bold text-primary truncate">{item.guestName}</span>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      {spaceLabelMap[item.space]} · {item.guests} ·{' '}
                      <span dir="ltr">
                        {item.date} {item.time}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={item.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-xs rounded-full bg-primary-fixed text-on-primary-fixed border-none"
                    >
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      disabled={cancellingId === item.id}
                      onClick={() => handleCancel(item.id)}
                      aria-label={`${m.cancelButton} ${item.referenceCode}`}
                      className="btn btn-xs btn-ghost rounded-full text-error hover:bg-error/10"
                    >
                      {m.cancelButton}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop bg-black/65 backdrop-blur-xs">
        <button type="button" onClick={onClose} aria-label={m.closeButton}>
          close
        </button>
      </form>
    </dialog>
  );
}
