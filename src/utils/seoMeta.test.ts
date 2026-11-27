import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SEO_COPY,
  GBP_BUSINESS_PROFILE,
  buildLocaleUrls,
  buildGoogleBusinessProfileJsonLd,
} from './seoMeta.ts';

test('SEO titles and descriptions stay within search snippet guidelines', () => {
  for (const locale of ['en', 'ar'] as const) {
    const copy = SEO_COPY[locale];
    assert.ok(copy.title.length >= 30 && copy.title.length <= 60, `${locale} title length ${copy.title.length}`);
    assert.ok(
      copy.description.length >= 120 && copy.description.length <= 165,
      `${locale} description length ${copy.description.length}`
    );
  }
});

test('buildLocaleUrls produces clean canonical EN and AR URLs for GitHub Pages subpath', () => {
  const urls = buildLocaleUrls('https://example.github.io/Jungle-Fever/?lang=ar#menu');
  assert.equal(urls.canonicalEn, 'https://example.github.io/Jungle-Fever/');
  assert.equal(urls.canonicalAr, 'https://example.github.io/Jungle-Fever/?lang=ar');
});

test('buildGoogleBusinessProfileJsonLd outputs CafeOrCoffeeShop, Menu, Hours, Geo, and FAQPage', () => {
  const schema = buildGoogleBusinessProfileJsonLd('en', 'https://example.github.io/Jungle-Fever/');
  assert.equal(schema['@context'], 'https://schema.org');

  const graph = schema['@graph'] as Record<string, unknown>[];
  assert.equal(graph.length, 3);

  const business = graph[0];
  assert.deepEqual(business['@type'], ['CafeOrCoffeeShop', 'LocalBusiness']);
  assert.equal(business.name, GBP_BUSINESS_PROFILE.legalName);
  assert.equal(business.telephone, '+962775999303');
  assert.equal(business.currenciesAccepted, 'JOD');

  const geo = business.geo as { latitude: number; longitude: number };
  assert.equal(geo.latitude, 31.9580697);
  assert.equal(geo.longitude, 35.9152344);
  assert.equal(business.hasMap, GBP_BUSINESS_PROFILE.mapsUrl);

  const menu = business.hasMenu as { hasMenuSection: Array<{ hasMenuItem: unknown[] }> };
  assert.equal(menu.hasMenuSection.length, 3);
  assert.ok(menu.hasMenuSection[0].hasMenuItem.length >= 10);

  const faq = graph[2];
  assert.equal(faq['@type'], 'FAQPage');
  assert.equal((faq.mainEntity as unknown[]).length, 4);
});
