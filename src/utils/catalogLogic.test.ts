import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCT_CATEGORIES,
  SPAREPART_CATALOG,
  BRAND_PARTNERS,
  VEHICLE_TYPES,
  formatIDR,
  filterSpareparts,
  validateConsultationForm,
  buildWhatsAppUrl,
} from './catalogLogic';

test('PRODUCT_CATEGORIES contains all 5 requested sparepart categories in order', () => {
  assert.equal(PRODUCT_CATEGORIES.length, 5);
  assert.deepEqual(
    PRODUCT_CATEGORIES.map((c) => c.title),
    ['Velg', 'Shockbreaker', 'Pengereman', 'CVT & Mesin', 'Aksesoris']
  );
  assert.equal(PRODUCT_CATEGORIES[0].subtitle, 'Velg Ringan & Kuat.');
  assert.equal(PRODUCT_CATEGORIES[1].subtitle, 'Redaman Maksimal, Berkendara Nyaman.');
  assert.equal(PRODUCT_CATEGORIES[2].subtitle, 'Keamanan Utama dengan Rem Presisi.');
  assert.equal(PRODUCT_CATEGORIES[3].subtitle, 'Akselerasi Halus & Responsif.');
  assert.equal(PRODUCT_CATEGORIES[4].subtitle, 'Detail Kecil, Tampilan Maksimal.');
});

test('BRAND_PARTNERS contains RCB, KTC, and KTM', () => {
  assert.deepEqual(
    BRAND_PARTNERS.map((b) => b.id),
    ['RCB', 'KTC', 'KTM']
  );
});

test('VEHICLE_TYPES includes key motorcycle models', () => {
  assert.ok(VEHICLE_TYPES.includes('Honda Scoopy'));
  assert.ok(VEHICLE_TYPES.includes('Honda Vario 160'));
  assert.ok(VEHICLE_TYPES.includes('Vespa Matic'));
});

test('formatIDR formats Indonesian Rupiah with dot separators', () => {
  assert.equal(formatIDR(1850000), 'Rp 1.850.000');
  assert.equal(formatIDR(480000), 'Rp 480.000');
});

test('filterSpareparts filters by category, vehicleType, priceRange, searchQuery, and sorts by price', () => {
  const velgOnly = filterSpareparts(SPAREPART_CATALOG, { categoryId: 'velg' });
  assert.equal(velgOnly.length, 3);
  assert.ok(velgOnly.every((item) => item.categoryId === 'velg'));

  const vespaParts = filterSpareparts(SPAREPART_CATALOG, { vehicleType: 'Vespa Matic' });
  assert.ok(vespaParts.length >= 3);
  assert.ok(vespaParts.every((item) => item.compatibility.includes('Vespa Matic')));

  const under500k = filterSpareparts(SPAREPART_CATALOG, { priceRange: 'under-500k' });
  assert.ok(under500k.length >= 4);
  assert.ok(under500k.every((item) => item.price < 500000));

  const midPrice = filterSpareparts(SPAREPART_CATALOG, { priceRange: '500k-1500k' });
  assert.ok(midPrice.length >= 4);
  assert.ok(midPrice.every((item) => item.price >= 500000 && item.price <= 1500000));

  const above1500k = filterSpareparts(SPAREPART_CATALOG, { priceRange: 'above-1500k' });
  assert.ok(above1500k.length >= 4);
  assert.ok(above1500k.every((item) => item.price > 1500000));

  const sortedAsc = filterSpareparts(SPAREPART_CATALOG, { sortBy: 'price-asc' });
  for (let i = 1; i < sortedAsc.length; i++) {
    assert.ok(sortedAsc[i].price >= sortedAsc[i - 1].price);
  }

  const sortedDesc = filterSpareparts(SPAREPART_CATALOG, { sortBy: 'price-desc' });
  for (let i = 1; i < sortedDesc.length; i++) {
    assert.ok(sortedDesc[i].price <= sortedDesc[i - 1].price);
  }

  const searchRadial = filterSpareparts(SPAREPART_CATALOG, { searchQuery: 'Radial' });
  assert.equal(searchRadial.length, 2);
});

test('validateConsultationForm rejects empty inputs and validates Indonesian phone format', () => {
  const emptyResult = validateConsultationForm({
    customerName: '',
    whatsappNumber: '',
    motorModel: '',
    selectedCategory: 'Velg',
    notes: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.customerName);
  assert.ok(emptyResult.errors.whatsappNumber);
  assert.ok(emptyResult.errors.motorModel);

  const validResult = validateConsultationForm({
    customerName: 'Rizky Pratama',
    whatsappNumber: '0812-8899-7744',
    motorModel: 'Honda Scoopy Prestige 2024',
    selectedCategory: 'Velg',
    notes: 'Mau pasang Velg RCB SP811 Gold',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildWhatsAppUrl constructs encoded wa.me link with selected spareparts', () => {
  const url = buildWhatsAppUrl(
    {
      customerName: 'Andi',
      whatsappNumber: '081288997744',
      motorModel: 'Honda Scoopy',
      selectedCategory: 'Velg',
      notes: 'Cek stok hari ini',
    },
    [SPAREPART_CATALOG[0]]
  );
  assert.ok(url.startsWith('https://wa.me/6281288997744?text='));
  assert.ok(decodeURIComponent(url).includes('Velg RCB SP811 Ring 12 Gold Matte'));
});
