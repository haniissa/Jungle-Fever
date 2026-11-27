import type { Locale, MenuCategoryId, MenuItem, SpaceId } from '../data/cafeData';

export interface ReservationInput {
  guestName: string;
  guests: number;
  space: SpaceId;
  date: string;
  time: string;
  phone: string;
  notes?: string;
}

export interface ReservationRecord extends ReservationInput {
  id: string;
  referenceCode: string;
  createdAt: string;
  whatsappUrl: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: ReservationInput;
}

export interface OpenStatus {
  isOpen: boolean;
  ammanTimeLabel: string;
  todayHours: { en: string; ar: string };
}

const VALID_SPACES: SpaceId[] = ['terrace', 'bar', 'library', 'lounge'];

/**
 * Filters menu items by category and optional search query.
 */
export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategoryId,
  query = '',
): MenuItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (category === 'flavours') {
    return [];
  }

  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Determines whether the Flavours & Modifiers panel should be visible for the active category and query.
 */
export function shouldShowFlavoursGroup(
  flavours: string[],
  category: MenuCategoryId,
  query = '',
): boolean {
  if (category !== 'all' && category !== 'flavours') {
    return false;
  }
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return (
    flavours.some((flavour) => flavour.toLowerCase().includes(normalizedQuery)) ||
    'sugar free oat almond syrup'.includes(normalizedQuery)
  );
}

/**
 * Computes Jungle Fever opening status in Amman (UTC+3).
 * Sat–Thu: 9:30 AM – 12:00 AM (Midnight)
 * Friday: 12:30 PM – 12:00 AM (Midnight)
 */
export function getAmmanOpenStatus(now: Date = new Date()): OpenStatus {
  // Jordan uses permanent UTC+3
  const ammanMs = now.getTime() + 3 * 60 * 60 * 1000;
  const ammanDate = new Date(ammanMs);
  const day = ammanDate.getUTCDay(); // 0 = Sun, 5 = Fri, 6 = Sat
  const hours = ammanDate.getUTCHours();
  const minutes = ammanDate.getUTCMinutes();
  const minutesSinceMidnight = hours * 60 + minutes;

  const isFriday = day === 5;
  const openMinute = isFriday ? 12 * 60 + 30 : 9 * 60 + 30;
  const isOpen = minutesSinceMidnight >= openMinute;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMins = String(minutes).padStart(2, '0');

  return {
    isOpen,
    ammanTimeLabel: `${paddedHours}:${paddedMins} GMT+3`,
    todayHours: isFriday
      ? { en: '12:30 PM – Midnight', ar: '12:30 ظهراً – منتصف الليل' }
      : { en: '9:30 AM – Midnight', ar: '9:30 صباحاً – منتصف الليل' },
  };
}

/**
 * Validates reservation request payload cleanly without silent fallbacks.
 */
export function validateReservationInput(
  raw: Partial<ReservationInput>,
  lang: Locale = 'en',
): ValidationResult {
  const errors: Record<string, string> = {};
  const isAr = lang === 'ar';

  const guestName = typeof raw.guestName === 'string' ? raw.guestName.trim() : '';
  const phone = typeof raw.phone === 'string' ? raw.phone.trim() : '';
  const date = typeof raw.date === 'string' ? raw.date.trim() : '';
  const time = typeof raw.time === 'string' ? raw.time.trim() : '';
  const notes = typeof raw.notes === 'string' ? raw.notes.trim().slice(0, 240) : '';
  const guests = typeof raw.guests === 'number' ? raw.guests : Number(raw.guests);
  const space = raw.space as SpaceId;

  if (guestName.length < 2) {
    errors.guestName = isAr
      ? 'يرجى إدخال الاسم الكامل (حرفان على الأقل).'
      : 'Please enter your full name (at least 2 characters).';
  }

  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    errors.guests = isAr
      ? 'يرجى اختيار عدد ضيوف بين 1 و 20.'
      : 'Please choose between 1 and 20 guests.';
  }

  if (!VALID_SPACES.includes(space)) {
    errors.space = isAr
      ? 'يرجى اختيار المساحة المفضلة.'
      : 'Please select a preferred cafe space.';
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.date = isAr ? 'يرجى اختيار تاريخ زيارة صالح.' : 'Please choose a valid visit date.';
  }

  if (!/^\d{2}:\d{2}$/.test(time)) {
    errors.time = isAr ? 'يرجى اختيار وقت الوصول.' : 'Please choose an arrival time.';
  }

  const phoneDigits = phone.replace(/[^\d+]/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 16) {
    errors.phone = isAr
      ? 'يرجى إدخال رقم هاتف أو واتساب صحيح.'
      : 'Please enter a valid phone or WhatsApp number.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      guestName,
      guests,
      space,
      date,
      time,
      phone,
      notes,
    },
  };
}

/**
 * Generates a pre-filled WhatsApp concierge URL for Jungle Fever (07 7599 9303).
 */
export function buildWhatsAppReservationUrl(
  input: ReservationInput & { referenceCode?: string },
  lang: Locale = 'en',
): string {
  const spaceNames: Record<Locale, Record<SpaceId, string>> = {
    en: {
      terrace: 'The Rooftop Terrace',
      bar: 'Art & Coffee Bar',
      library: 'Gallery Library & Study',
      lounge: 'Sunlit Sunken Lounge',
    },
    ar: {
      terrace: 'التراس العلوي',
      bar: 'بار الفن والقهوة',
      library: 'مكتبة المتحف والدراسة',
      lounge: 'اللاونج المشمس',
    },
  };

  const spaceLabel = spaceNames[lang][input.space];
  const refLine = input.referenceCode ? ` (${input.referenceCode})` : '';

  const text =
    lang === 'ar'
      ? `مرحباً جنغل فيفر! أود تأكيد حجز طاولة${refLine}:\nالاسم: ${input.guestName}\nعدد الضيوف: ${input.guests}\nالمساحة: ${spaceLabel}\nالتاريخ: ${input.date} الساعة ${input.time}${input.notes ? `\nملاحظات: ${input.notes}` : ''}`
      : `Hello Jungle Fever! I'd like to confirm a reservation${refLine}:\nName: ${input.guestName}\nGuests: ${input.guests}\nSpace: ${spaceLabel}\nDate: ${input.date} at ${input.time}${input.notes ? `\nNotes: ${input.notes}` : ''}`;

  return `https://wa.me/962775999303?text=${encodeURIComponent(text)}`;
}
