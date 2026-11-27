import { CAFE_CONTENT, type CafeLocaleData, type Locale, type MenuCategoryId, type MenuItem } from '../data/cafeData';
import {
  buildWhatsAppReservationUrl,
  filterMenuItems,
  getAmmanOpenStatus,
  shouldShowFlavoursGroup,
  validateReservationInput,
  type OpenStatus,
  type ReservationInput,
  type ReservationRecord,
} from './cafeLogic';

const STORAGE_KEY = 'jungle_fever_reservations_v1';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface ClientDeps {
  staticMode?: boolean;
  fetchFn?: typeof fetch;
  storage?: StorageLike | null;
}

function isStaticBuild(): boolean {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  return metaEnv?.VITE_STATIC_MODE === 'true';
}

function getDefaultStorage(): StorageLike | null {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null;
  } catch {
    return null;
  }
}

function readLocalReservations(storage: StorageLike | null): ReservationRecord[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ReservationRecord[]) : [];
  } catch {
    return [];
  }
}

function writeLocalReservations(storage: StorageLike | null, records: ReservationRecord[]): void {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore storage quota errors
  }
}

function isJsonResponse(res: Response): boolean {
  const contentType = res.headers.get('content-type') ?? '';
  return contentType.includes('application/json');
}

export async function fetchCafePayload(
  lang: Locale,
  deps: ClientDeps = {},
  signal?: AbortSignal,
): Promise<{ content: CafeLocaleData; openStatus: OpenStatus }> {
  const staticMode = deps.staticMode ?? isStaticBuild();
  const fetchFn = deps.fetchFn ?? fetch;

  if (!staticMode) {
    try {
      const res = await fetchFn(`/api/cafe?lang=${lang}`, { signal });
      if (res.ok && isJsonResponse(res)) {
        const data = (await res.json()) as { content?: CafeLocaleData; openStatus?: OpenStatus };
        if (data.content && data.openStatus) {
          return { content: data.content, openStatus: data.openStatus };
        }
      }
    } catch {
      // Fall through to local deterministic data
    }
  }

  return {
    content: CAFE_CONTENT[lang],
    openStatus: getAmmanOpenStatus(),
  };
}

export async function fetchFilteredMenu(
  lang: Locale,
  category: MenuCategoryId,
  query: string,
  deps: ClientDeps = {},
  signal?: AbortSignal,
): Promise<{ items: MenuItem[]; showFlavours: boolean }> {
  const staticMode = deps.staticMode ?? isStaticBuild();
  const fetchFn = deps.fetchFn ?? fetch;

  if (!staticMode) {
    try {
      const params = new URLSearchParams({ lang, category, q: query });
      const res = await fetchFn(`/api/menu?${params.toString()}`, { signal });
      if (res.ok && isJsonResponse(res)) {
        const data = (await res.json()) as { items?: MenuItem[]; showFlavours?: boolean };
        if (Array.isArray(data.items)) {
          return { items: data.items, showFlavours: Boolean(data.showFlavours) };
        }
      }
    } catch {
      // Fall through to local filter
    }
  }

  const menu = CAFE_CONTENT[lang].menu;
  return {
    items: filterMenuItems(menu.items, category, query),
    showFlavours: shouldShowFlavoursGroup(menu.flavours, category, query),
  };
}

export async function fetchReservations(deps: ClientDeps = {}): Promise<ReservationRecord[]> {
  const staticMode = deps.staticMode ?? isStaticBuild();
  const fetchFn = deps.fetchFn ?? fetch;
  const storage = deps.storage !== undefined ? deps.storage : getDefaultStorage();

  if (!staticMode) {
    try {
      const res = await fetchFn('/api/reservations');
      if (res.ok && isJsonResponse(res)) {
        const data = (await res.json()) as { reservations?: ReservationRecord[] };
        if (Array.isArray(data.reservations)) {
          return data.reservations;
        }
      }
    } catch {
      // Fall through to localStorage
    }
  }

  return readLocalReservations(storage);
}

export async function createReservation(
  input: ReservationInput,
  lang: Locale,
  deps: ClientDeps = {},
): Promise<
  | { ok: true; reservation: ReservationRecord }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }
> {
  const staticMode = deps.staticMode ?? isStaticBuild();
  const fetchFn = deps.fetchFn ?? fetch;
  const storage = deps.storage !== undefined ? deps.storage : getDefaultStorage();

  if (!staticMode) {
    try {
      const res = await fetchFn('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, lang }),
      });

      if (isJsonResponse(res)) {
        const payload = (await res.json()) as {
          reservation?: ReservationRecord;
          error?: string;
          fieldErrors?: Record<string, string>;
        };
        if (res.ok && payload.reservation) {
          return { ok: true, reservation: payload.reservation };
        }
        return {
          ok: false,
          error: payload.error ?? (lang === 'ar' ? 'تعذر حفظ الطلب.' : 'Could not save request.'),
          fieldErrors: payload.fieldErrors,
        };
      }
    } catch {
      // Fall through to static localStorage handler when backend is unreachable
    }
  }

  const validation = validateReservationInput(input, lang);
  if (!validation.valid || !validation.sanitized) {
    return {
      ok: false,
      error: lang === 'ar' ? 'يرجى التحقق من الحقول المطلوبة.' : 'Please review the highlighted fields.',
      fieldErrors: validation.errors,
    };
  }

  const existing = readLocalReservations(storage);
  const seq = 1001 + existing.length;
  const referenceCode = `JF-${seq}`;
  const record: ReservationRecord = {
    id: `local_${Date.now()}_${seq}`,
    referenceCode,
    ...validation.sanitized,
    createdAt: new Date().toISOString(),
    whatsappUrl: buildWhatsAppReservationUrl({ ...validation.sanitized, referenceCode }, lang),
  };

  writeLocalReservations(storage, [record, ...existing]);
  return { ok: true, reservation: record };
}

export async function deleteReservation(id: string, deps: ClientDeps = {}): Promise<boolean> {
  const staticMode = deps.staticMode ?? isStaticBuild();
  const fetchFn = deps.fetchFn ?? fetch;
  const storage = deps.storage !== undefined ? deps.storage : getDefaultStorage();

  if (!staticMode) {
    try {
      const res = await fetchFn(`/api/reservations/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok && isJsonResponse(res)) {
        return true;
      }
    } catch {
      // Fall through to localStorage deletion
    }
  }

  const existing = readLocalReservations(storage);
  const next = existing.filter((item) => item.id !== id);
  writeLocalReservations(storage, next);
  return next.length !== existing.length;
}
