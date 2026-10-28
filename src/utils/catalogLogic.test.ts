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

test('PRODUCT_CATEGORIES contains all 5 requested sparepart categories in order and includes uploaded image URLs', () => {
  assert.equal(PRODUCT_CATEGORIES.length, 5);
  assert.deepEqual(
    PRODUCT_CATEGORIES.map((c) => c.title),
    ['Velg', 'Shockbreaker', 'Pengereman', 'CVT & Mesin', 'Aksesoris']
  );
  assert.equal(PRODUCT_CATEGORIES[1].imageUrl, '/assets/aistudio/IMG_0676_bfda774e.PNG');
  assert.equal(PRODUCT_CATEGORIES[2].imageUrl, '/assets/aistudio/IMG_0679_9bf4124d.PNG');
  assert.equal(PRODUCT_CATEGORIES[3].imageUrl, '/assets/aistudio/IMG_0678_3bc35099.PNG');
  assert.equal(PRODUCT_CATEGORIES[4].imageUrl, '/assets/aistudio/IMG_0677_749fdf4c.PNG');
});

test('SPAREPART_CATALOG includes the 4 uploaded Scoopy Art products with their exact asset paths', () => {
  const uploadedItems = SPAREPART_CATALOG.filter((item) => Boolean(item.imageUrl));
  assert.equal(uploadedItems.length, 4);
  assert.deepEqual(
    uploadedItems.map((i) => i.imageUrl),
    [
      '/assets/aistudio/IMG_0676_bfda774e.PNG',
      '/assets/aistudio/IMG_0677_749fdf4c.PNG',
      '/assets/aistudio/IMG_0678_3bc35099.PNG',
      '/assets/aistudio/IMG_0679_9bf4124d.PNG',
    ]
  );
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

  const under500k = filterSpareparts(SPAREPART_CATALOG, { priceRange: 'under-500k' });
  assert.ok(under500k.length >= 4);
  assert.ok(under500k.every((item) => item.price < 500000));

  const sortedAsc = filterSpareparts(SPAREPART_CATALOG, { sortBy: 'price-asc' });
  for (let i = 1; i < sortedAsc.length; i++) {
    assert.ok(sortedAsc[i].price >= sortedAsc[i - 1].price);
  }

  const searchFlowPro = filterSpareparts(SPAREPART_CATALOG, { searchQuery: 'Flow Pro' });
  assert.equal(searchFlowPro.length, 1);
  assert.equal(searchFlowPro[0].id, 'rcb-flow-pro-matic');
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

  const validResult = validateConsultationForm({
    customerName: 'Rizky Pratama',
    whatsappNumber: '0812-8899-7744',
    motorModel: 'Honda Scoopy Prestige 2024',
    selectedCategory: 'Velg',
    notes: 'Mau pasang Shockbreaker RCB Flow Pro',
  });
  assert.equal(validResult.valid, true);
});

test('buildWhatsAppUrl constructs encoded wa.me link with selected spareparts', () => {
  const url = buildWhatsAppUrl(
    {
      customerName: 'Andi',
      whatsappNumber: '081288997744',
      motorModel: 'Honda Scoopy',
      selectedCategory: 'Shockbreaker',
      notes: 'Cek stok hari ini',
    },
    [SPAREPART_CATALOG[0]]
  );
  assert.ok(url.startsWith('https://wa.me/6281288997744?text='));
  assert.ok(decodeURIComponent(url).includes('Shockbreaker RCB Flow Pro Matic Single'));
});
