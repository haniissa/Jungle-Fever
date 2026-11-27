import test from 'node:test';
import assert from 'node:assert/strict';
import { createCafeApp } from './app';

test('GET /api/health confirms Hono server readiness', async () => {
  const app = createCafeApp();
  const res = await app.request('/api/health');
  assert.equal(res.status, 200);
  const data = (await res.json()) as { ok: boolean; framework: string };
  assert.equal(data.ok, true);
  assert.equal(data.framework, 'hono');
});

test('GET /api/cafe returns localized EN and AR data with openStatus', async () => {
  const app = createCafeApp();
  const resEn = await app.request('/api/cafe?lang=en');
  assert.equal(resEn.status, 200);
  const enData = (await resEn.json()) as { locale: string; content: { dir: string } };
  assert.equal(enData.locale, 'en');
  assert.equal(enData.content.dir, 'ltr');

  const resAr = await app.request('/api/cafe?lang=ar');
  assert.equal(resAr.status, 200);
  const arData = (await resAr.json()) as { locale: string; content: { dir: string } };
  assert.equal(arData.locale, 'ar');
  assert.equal(arData.content.dir, 'rtl');
});

test('GET /api/menu filters items by category and search query', async () => {
  const app = createCafeApp();
  const res = await app.request('/api/menu?lang=en&category=special');
  assert.equal(res.status, 200);
  const data = (await res.json()) as { items: Array<{ category: string }>; showFlavours: boolean };
  assert.equal(data.items.length, 6);
  assert.equal(data.showFlavours, false);
});

test('POST, GET, and DELETE /api/reservations complete full lifecycle with validation', async () => {
  const app = createCafeApp();

  // Invalid submission rejected with 400
  const badRes = await app.request('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestName: '', guests: 0, space: 'terrace', date: '', time: '', phone: '' }),
  });
  assert.equal(badRes.status, 400);

  // Valid submission created with 201
  const createRes = await app.request('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      guestName: 'Nadia Al-Khaled',
      guests: 3,
      space: 'terrace',
      date: '2026-12-05',
      time: '18:30',
      phone: '0775999303',
      notes: 'Sunset table',
      lang: 'en',
    }),
  });
  assert.equal(createRes.status, 201);
  const created = (await createRes.json()) as { reservation: { id: string; referenceCode: string } };
  assert.ok(created.reservation.referenceCode.startsWith('JF-'));

  // Persisted in GET
  const listRes = await app.request('/api/reservations');
  const listData = (await listRes.json()) as { reservations: Array<{ id: string }> };
  assert.equal(listData.reservations.length, 1);

  // Delete removes it
  const delRes = await app.request(`/api/reservations/${created.reservation.id}`, { method: 'DELETE' });
  assert.equal(delRes.status, 200);

  const listAfter = (await (await app.request('/api/reservations')).json()) as { reservations: Array<{ id: string }> };
  assert.equal(listAfter.reservations.length, 0);
});
