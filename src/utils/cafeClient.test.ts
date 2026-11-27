import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createReservation,
  deleteReservation,
  fetchCafePayload,
  fetchFilteredMenu,
  fetchReservations,
  type StorageLike,
} from './cafeClient';

function createMemoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
  };
}

test('static mode serves localized cafe data and menu filtering without network calls', async () => {
  let called = false;
  const fakeFetch = (async () => {
    called = true;
    throw new Error('fetch should not be called in static mode');
  }) as unknown as typeof fetch;

  const cafe = await fetchCafePayload('ar', { staticMode: true, fetchFn: fakeFetch });
  assert.equal(called, false);
  assert.equal(cafe.content.dir, 'rtl');
  assert.equal(typeof cafe.openStatus.isOpen, 'boolean');

  const menu = await fetchFilteredMenu('en', 'special', '', { staticMode: true, fetchFn: fakeFetch });
  assert.equal(menu.items.length, 6);
  assert.equal(menu.showFlavours, false);
});

test('static mode persists reservations in localStorage and supports cancel', async () => {
  const storage = createMemoryStorage();

  const invalid = await createReservation(
    { guestName: '', guests: 0, space: 'terrace', date: '', time: '', phone: '' },
    'en',
    { staticMode: true, storage },
  );
  assert.equal(invalid.ok, false);

  const created = await createReservation(
    {
      guestName: 'Rami Haddad',
      guests: 4,
      space: 'terrace',
      date: '2026-12-10',
      time: '18:30',
      phone: '0775999303',
      notes: 'Sunset table',
    },
    'en',
    { staticMode: true, storage },
  );
  assert.equal(created.ok, true);
  if (!created.ok) return;
  assert.ok(created.reservation.referenceCode.startsWith('JF-'));

  const list = await fetchReservations({ staticMode: true, storage });
  assert.equal(list.length, 1);
  assert.equal(list[0].guestName, 'Rami Haddad');

  const deleted = await deleteReservation(created.reservation.id, { staticMode: true, storage });
  assert.equal(deleted, true);

  const after = await fetchReservations({ staticMode: true, storage });
  assert.equal(after.length, 0);
});

test('falls back cleanly when GitHub Pages returns HTML 404 for /api/* routes', async () => {
  const storage = createMemoryStorage();
  const html404Fetch = (async () =>
    new Response('<!doctype html><html><body>404 Not Found</body></html>', {
      status: 404,
      headers: { 'content-type': 'text/html' },
    })) as unknown as typeof fetch;

  const created = await createReservation(
    {
      guestName: 'Sara Nassar',
      guests: 2,
      space: 'library',
      date: '2026-12-11',
      time: '15:00',
      phone: '0775999303',
    },
    'en',
    { staticMode: false, fetchFn: html404Fetch, storage },
  );

  assert.equal(created.ok, true);
  const list = await fetchReservations({ staticMode: false, fetchFn: html404Fetch, storage });
  assert.equal(list.length, 1);
});
