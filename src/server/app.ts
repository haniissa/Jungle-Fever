import { Hono } from 'hono';
import { CAFE_CONTENT, type Locale, type MenuCategoryId } from '../data/cafeData';
import {
  buildWhatsAppReservationUrl,
  filterMenuItems,
  getAmmanOpenStatus,
  shouldShowFlavoursGroup,
  validateReservationInput,
  type ReservationRecord,
} from '../utils/cafeLogic';

function parseLocale(raw?: string | null): Locale {
  return raw === 'ar' ? 'ar' : 'en';
}

function parseCategory(raw?: string | null): MenuCategoryId {
  if (raw === 'hot' || raw === 'special' || raw === 'flavours' || raw === 'dessert') {
    return raw;
  }
  return 'all';
}

export function createCafeApp() {
  const app = new Hono();
  const reservations: ReservationRecord[] = [];
  let seq = 1001;

  app.get('/api/health', (c) => {
    return c.json({
      ok: true,
      framework: 'hono',
      service: 'jungle-fever-rooftop',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/cafe', (c) => {
    const lang = parseLocale(c.req.query('lang'));
    const openStatus = getAmmanOpenStatus();
    return c.json({
      locale: lang,
      openStatus,
      content: CAFE_CONTENT[lang],
      reservationCount: reservations.length,
    });
  });

  app.get('/api/menu', (c) => {
    const lang = parseLocale(c.req.query('lang'));
    const category = parseCategory(c.req.query('category'));
    const q = c.req.query('q') ?? '';
    const menu = CAFE_CONTENT[lang].menu;
    const items = filterMenuItems(menu.items, category, q);
    const showFlavours = shouldShowFlavoursGroup(menu.flavours, category, q);

    return c.json({
      locale: lang,
      category,
      query: q,
      items,
      flavours: showFlavours ? menu.flavours : [],
      showFlavours,
      totalMatches: items.length + (showFlavours ? 1 : 0),
    });
  });

  app.get('/api/reservations', (c) => {
    return c.json({ reservations });
  });

  app.post('/api/reservations', async (c) => {
    let body: Record<string, unknown>;
    try {
      body = (await c.req.json()) as Record<string, unknown>;
    } catch {
      return c.json({ error: 'Invalid JSON payload' }, 400);
    }

    const lang = parseLocale(typeof body.lang === 'string' ? body.lang : c.req.query('lang'));
    const validation = validateReservationInput(
      {
        guestName: body.guestName as string,
        guests: Number(body.guests),
        space: body.space as ReservationRecord['space'],
        date: body.date as string,
        time: body.time as string,
        phone: body.phone as string,
        notes: typeof body.notes === 'string' ? body.notes : '',
      },
      lang,
    );

    if (!validation.valid || !validation.sanitized) {
      return c.json(
        {
          error: lang === 'ar' ? 'يرجى التحقق من الحقول المطلوبة.' : 'Please review the highlighted fields.',
          fieldErrors: validation.errors,
        },
        400,
      );
    }

    const referenceCode = `JF-${seq++}`;
    const id = `res_${Date.now()}_${seq}`;
    const record: ReservationRecord = {
      id,
      referenceCode,
      ...validation.sanitized,
      createdAt: new Date().toISOString(),
      whatsappUrl: buildWhatsAppReservationUrl({ ...validation.sanitized, referenceCode }, lang),
    };

    reservations.unshift(record);
    return c.json({ reservation: record }, 201);
  });

  app.delete('/api/reservations/:id', (c) => {
    const id = c.req.param('id');
    const index = reservations.findIndex((item) => item.id === id);
    if (index === -1) {
      return c.json({ error: 'Reservation not found' }, 404);
    }
    reservations.splice(index, 1);
    return c.json({ deleted: true, id });
  });

  return app;
}
