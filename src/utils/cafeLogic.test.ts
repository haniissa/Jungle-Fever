import test from 'node:test';
import assert from 'node:assert/strict';
import { CAFE_CONTENT } from '../data/cafeData';
import {
  buildWhatsAppReservationUrl,
  filterMenuItems,
  getAmmanOpenStatus,
  shouldShowFlavoursGroup,
  validateReservationInput,
} from './cafeLogic';

test('filterMenuItems returns all items for "all" and narrows correctly by category and query', () => {
  const items = CAFE_CONTENT.en.menu.items;
  assert.equal(filterMenuItems(items, 'all').length, items.length);

  const specials = filterMenuItems(items, 'special');
  assert.equal(specials.length, 6);
  assert.ok(specials.every((i) => i.category === 'special'));

  const tiramisuSearch = filterMenuItems(items, 'all', 'tiramisu');
  assert.equal(tiramisuSearch.length, 1);
  assert.equal(tiramisuSearch[0].id, 'tiramisu');

  assert.equal(filterMenuItems(items, 'flavours').length, 0);
});

test('shouldShowFlavoursGroup reacts accurately to category and search text', () => {
  const flavours = CAFE_CONTENT.en.menu.flavours;
  assert.equal(shouldShowFlavoursGroup(flavours, 'all', ''), true);
  assert.equal(shouldShowFlavoursGroup(flavours, 'flavours', ''), true);
  assert.equal(shouldShowFlavoursGroup(flavours, 'hot', ''), false);
  assert.equal(shouldShowFlavoursGroup(flavours, 'all', 'cardamom-xyz'), false);
  assert.equal(shouldShowFlavoursGroup(flavours, 'all', 'hazelnut'), true);
});

test('getAmmanOpenStatus distinguishes Sat-Thu vs Friday opening times', () => {
  // 2026-11-27 is Friday. 08:00 UTC = 11:00 Amman (closed before 12:30)
  const fridayMorning = new Date('2026-11-27T08:00:00Z');
  assert.equal(getAmmanOpenStatus(fridayMorning).isOpen, false);

  // Friday 10:00 UTC = 13:00 Amman (open after 12:30)
  const fridayAfternoon = new Date('2026-11-27T10:00:00Z');
  assert.equal(getAmmanOpenStatus(fridayAfternoon).isOpen, true);

  // Thursday 07:00 UTC = 10:00 Amman (open after 9:30)
  const thursdayMorning = new Date('2026-11-26T07:00:00Z');
  assert.equal(getAmmanOpenStatus(thursdayMorning).isOpen, true);
});

test('validateReservationInput rejects missing or invalid fields and accepts valid input', () => {
  const invalid = validateReservationInput({
    guestName: 'A',
    guests: 0,
    space: 'terrace',
    date: '',
    time: '',
    phone: '12',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.guestName);
  assert.ok(invalid.errors.guests);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.time);
  assert.ok(invalid.errors.phone);

  const valid = validateReservationInput({
    guestName: 'Layla Mansour',
    guests: 4,
    space: 'library',
    date: '2026-12-01',
    time: '17:30',
    phone: '0775999303',
    notes: 'Near power outlets',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.sanitized?.guestName, 'Layla Mansour');
  assert.equal(valid.sanitized?.guests, 4);
});

test('buildWhatsAppReservationUrl encodes EN and AR reservation details cleanly', () => {
  const urlEn = buildWhatsAppReservationUrl(
    {
      guestName: 'Omar',
      guests: 2,
      space: 'terrace',
      date: '2026-12-01',
      time: '18:00',
      phone: '0775999303',
      referenceCode: 'JF-1001',
    },
    'en',
  );
  assert.ok(urlEn.startsWith('https://wa.me/962775999303?text='));
  assert.ok(decodeURIComponent(urlEn).includes('JF-1001'));
  assert.ok(decodeURIComponent(urlEn).includes('The Rooftop Terrace'));

  const urlAr = buildWhatsAppReservationUrl(
    {
      guestName: 'عمر',
      guests: 3,
      space: 'lounge',
      date: '2026-12-01',
      time: '19:00',
      phone: '0775999303',
      referenceCode: 'JF-1002',
    },
    'ar',
  );
  assert.ok(decodeURIComponent(urlAr).includes('اللاونج المشمس'));
});
