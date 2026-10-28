export type CategoryId = 'velg' | 'shockbreaker' | 'pengereman' | 'cvt' | 'aksesoris';
export type BrandId = 'RCB' | 'KTC' | 'KTM' | 'X1R' | 'MUPO' | 'SOLFILI';
export type PriceRangeId = 'all' | 'under-500k' | '500k-1500k' | 'above-1500k';
export type SortOptionId = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface ProductCategory {
  id: CategoryId;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlightSpec: string;
  featuredBrand: BrandId;
  startingPrice: number;
  imageUrl?: string;
}

export interface SparepartItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  brand: BrandId;
  price: number;
  compatibility: string[];
  specSummary: string;
  weightOrDimension: string;
  inStock: boolean;
  isFeatured?: boolean;
  imageUrl?: string;
}

export interface BrandPartner {
  id: 'RCB' | 'KTC' | 'KTM';
  name: string;
  fullName: string;
  origin: string;
  specialty: string;
  description: string;
  warrantyNote: string;
}

export interface ConsultationFormInput {
  customerName: string;
  whatsappNumber: string;
  motorModel: string;
  selectedCategory: string;
  notes: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ConsultationFormInput, string>>;
}

export interface CatalogFilterOptions {
  categoryId?: CategoryId | 'all';
  brand?: BrandId | 'all';
  vehicleType?: string | 'all';
  priceRange?: PriceRangeId;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sortBy?: SortOptionId;
}

export const VEHICLE_TYPES: string[] = [
  'Honda Scoopy',
  'Honda Beat',
  'Honda Vario 125/150',
  'Honda Vario 160',
  'Honda Stylo 160',
  'Honda PCX 160',
  'Honda Genio',
  'Yamaha Fazzio',
  'Yamaha Grand Filano',
  'Vespa Matic',
];

export const PRICE_RANGE_LABELS: { id: PriceRangeId; label: string; min?: number; max?: number }[] = [
  { id: 'all', label: 'Semua Harga' },
  { id: 'under-500k', label: 'Di bawah Rp 500rb', max: 500000 },
  { id: '500k-1500k', label: 'Rp 500rb – Rp 1,5 Juta', min: 500000, max: 1500000 },
  { id: 'above-1500k', label: 'Di atas Rp 1,5 Juta', min: 1500001 },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'velg',
    number: '01',
    title: 'Velg',
    subtitle: 'Velg Ringan & Kuat.',
    description: 'Velg casting dan forged alloy presisi tinggi untuk menurunkan bobot unsprung dan meningkatkan kelincahan manuver di jalan perkotaan.',
    highlightSpec: 'CNC Alloy Ring 12 & Ring 14 · SNI & JWL Certified',
    featuredBrand: 'RCB',
    startingPrice: 1650000,
  },
  {
    id: 'shockbreaker',
    number: '02',
    title: 'Shockbreaker',
    subtitle: 'Redaman Maksimal, Berkendara Nyaman.',
    description: 'Suspensi belakang tabung atas dan bawah dengan pengaturan preload, rebound, serta kompresi yang menjaga kestabilan di berbagai kondisi jalan.',
    highlightSpec: 'RCB Flow Pro & KTC Extreme · 305mm / 330mm / 340mm',
    featuredBrand: 'RCB',
    startingPrice: 1250000,
    imageUrl: '/assets/aistudio/IMG_0676_bfda774e.PNG',
  },
  {
    id: 'pengereman',
    number: '03',
    title: 'Pengereman',
    subtitle: 'Keamanan Utama dengan Rem Presisi.',
    description: 'Piringan cakram Solfili WD-01 drilled & slotted, master rem radial, serta kaliper monoblock untuk respons pengereman yang pakem dan terukur.',
    highlightSpec: 'Solfili Disk 190mm · Heat-Treated Stainless Steel',
    featuredBrand: 'SOLFILI',
    startingPrice: 420000,
    imageUrl: '/assets/aistudio/IMG_0679_9bf4124d.PNG',
  },
  {
    id: 'cvt',
    number: '04',
    title: 'CVT & Mesin',
    subtitle: 'Akselerasi Halus & Responsif.',
    description: 'Bak CVT Billet CNC Mupo high-grade aluminium serta paket upgrade kirian harian hingga touring untuk akselerasi halus bebas gredek.',
    highlightSpec: 'Mupo Billet CNC Cover CVT · High Temp Resistance',
    featuredBrand: 'MUPO',
    startingPrice: 380000,
    imageUrl: '/assets/aistudio/IMG_0678_3bc35099.PNG',
  },
  {
    id: 'aksesoris',
    number: '05',
    title: 'Aksesoris',
    subtitle: 'Detail Kecil, Tampilan Maksimal.',
    description: 'Swing Arm CNC X1R struktur hollow ringan, spion CNC anti-silau, handgrip kompon lembut, dan detail komponen aluminium billet presisi.',
    highlightSpec: 'Swing Arm CNC X1R · Plug & Play Mounting',
    featuredBrand: 'X1R',
    startingPrice: 185000,
    imageUrl: '/assets/aistudio/IMG_0677_749fdf4c.PNG',
  },
];

export const SPAREPART_CATALOG: SparepartItem[] = [
  {
    id: 'rcb-flow-pro-matic',
    name: 'Shockbreaker RCB Flow Pro Matic Single',
    categoryId: 'shockbreaker',
    brand: 'RCB',
    price: 1780000,
    compatibility: ['Honda Scoopy', 'Honda Beat', 'Honda Vario 125/150', 'Honda Vario 160', 'Honda Stylo 160'],
    specSummary: 'Tersedia 305mm (Kepala Panjang), 330mm (Kepala Panjang) & 340mm (Kepala Pendek) · Full Black Series',
    weightOrDimension: '305mm / 330mm / 340mm',
    inStock: true,
    isFeatured: true,
    imageUrl: '/assets/aistudio/IMG_0676_bfda774e.PNG',
  },
  {
    id: 'x1r-swing-arm-cnc-vario',
    name: 'Swing Arm CNC X1R Vario (X-Wheel Edition)',
    categoryId: 'aksesoris',
    brand: 'X1R',
    price: 1450000,
    compatibility: ['Honda Vario 125/150', 'Honda Vario 160', 'Honda Scoopy'],
    specSummary: 'Material Aluminium Alloy · Light Weight Hollow CNC Structure · Plug & Play Mounting',
    weightOrDimension: 'CNC Billet Alloy',
    inStock: true,
    isFeatured: true,
    imageUrl: '/assets/aistudio/IMG_0677_749fdf4c.PNG',
  },
  {
    id: 'mupo-bak-cvt-billet-cnc',
    name: 'Mupo Bak CVT Billet CNC Vario 125 / 150',
    categoryId: 'cvt',
    brand: 'MUPO',
    price: 2450000,
    compatibility: ['Honda Vario 125/150', 'Honda Scoopy', 'Honda PCX 160'],
    specSummary: 'Aluminium Billet High-Grade · Precision CNC Machined · Anodizing Process Coloring · High Temp Resistance',
    weightOrDimension: 'Cover CVT Billet CNC',
    inStock: true,
    isFeatured: true,
    imageUrl: '/assets/aistudio/IMG_0678_3bc35099.PNG',
  },
  {
    id: 'solfili-disk-brake-wd01-190mm',
    name: 'Solfili Disk Brake WD-01 190mm Beat / Scoopy / Vario',
    categoryId: 'pengereman',
    brand: 'SOLFILI',
    price: 420000,
    compatibility: ['Honda Beat', 'Honda Scoopy', 'Honda Vario 125/150', 'Honda Genio'],
    specSummary: 'Premium Grade Material · Stepped Design · Drilled & Slotted Rotor · E-Coating Inner Disk · Heat-Treated Stainless',
    weightOrDimension: 'Diameter 190mm',
    inStock: true,
    isFeatured: true,
    imageUrl: '/assets/aistudio/IMG_0679_9bf4124d.PNG',
  },
  {
    id: 'rcb-sp811-scoopy',
    name: 'Velg RCB SP811 Ring 12 Gold Matte',
    categoryId: 'velg',
    brand: 'RCB',
    price: 1850000,
    compatibility: ['Honda Scoopy', 'Honda Genio', 'Honda Beat'],
    specSummary: 'Lebar 2.15F / 2.50R · Bobot ringan & presisi plug-and-play',
    weightOrDimension: 'Ring 12 × 2.15/2.50',
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'rcb-sp522-forged',
    name: 'Velg RCB SP522 Palang 5 Racing Gold',
    categoryId: 'velg',
    brand: 'RCB',
    price: 1720000,
    compatibility: ['Honda Scoopy', 'Honda Vario 125/150', 'Honda Beat'],
    specSummary: 'Material Alloy Heat-Treated · Finishing Anodized Matte',
    weightOrDimension: 'Ring 14 × 1.85/2.15',
    inStock: true,
  },
  {
    id: 'ktc-cnc-eight-spoke',
    name: 'Velg KTC Kytaco CNC 8-Spoke Titanium',
    categoryId: 'velg',
    brand: 'KTC',
    price: 2150000,
    compatibility: ['Honda Vario 160', 'Honda Stylo 160', 'Honda PCX 160'],
    specSummary: 'Billet Hub & Rim CNC · Kuat untuk Harian dan Touring',
    weightOrDimension: 'Ring 14 × 2.15/2.50',
    inStock: true,
  },
  {
    id: 'ktc-extreme-310',
    name: 'Shockbreaker KTC Kytaco Extreme 310mm',
    categoryId: 'shockbreaker',
    brand: 'KTC',
    price: 1680000,
    compatibility: ['Honda Scoopy', 'Honda Beat', 'Honda Genio', 'Yamaha Fazzio'],
    specSummary: 'Tabung Bawah · Klik Rebound, Compression & Preload Aktif',
    weightOrDimension: 'Tinggi 310mm',
    inStock: true,
  },
  {
    id: 'rcb-vd-series-330',
    name: 'Shockbreaker RCB VD Series Black Titanium',
    categoryId: 'shockbreaker',
    brand: 'RCB',
    price: 1550000,
    compatibility: ['Honda Scoopy', 'Honda Vario 125/150', 'Honda Vario 160', 'Honda Stylo 160'],
    specSummary: '2 Set Per Cadangan · Redaman Progresif Harian & Touring',
    weightOrDimension: 'Tinggi 330mm',
    inStock: true,
  },
  {
    id: 'rcb-s1-radial-14mm',
    name: 'Master Rem RCB S1 Radial 14mm Forged',
    categoryId: 'pengereman',
    brand: 'RCB',
    price: 1150000,
    compatibility: ['Honda Scoopy', 'Honda Stylo 160', 'Honda PCX 160', 'Yamaha Grand Filano', 'Vespa Matic'],
    specSummary: 'Tuas Folding Lever CNC · Tabung Minyak Rem Smoke Transparan',
    weightOrDimension: 'Piston Bore 14mm',
    inStock: true,
  },
  {
    id: 'ktc-monoblock-4p',
    name: 'Kaliper KTC Kytaco 4 Piston Radial CNC',
    categoryId: 'pengereman',
    brand: 'KTC',
    price: 980000,
    compatibility: ['Honda Scoopy', 'Honda Vario 125/150', 'Honda Vario 160', 'Honda Beat'],
    specSummary: 'Termasuk Breket Aluminium Billet · Kampas Sintered',
    weightOrDimension: 'Pitch 100mm · 4 Piston',
    inStock: true,
  },
  {
    id: 'ktc-cvt-fullset-scoopy',
    name: 'Paket Upgrade CVT KTC Kytaco Anti-Gredek',
    categoryId: 'cvt',
    brand: 'KTC',
    price: 740000,
    compatibility: ['Honda Scoopy', 'Honda Beat', 'Honda Genio'],
    specSummary: 'Pulley Custom Sudut 13.8° + Van Belt Kevlar + Roller + Per 1500 RPM',
    weightOrDimension: 'Full Package Kit',
    inStock: true,
  },
  {
    id: 'ktm-powerparts-cvt-belt',
    name: 'Van Belt Kevlar & Roller Racing KTM Series',
    categoryId: 'cvt',
    brand: 'KTM',
    price: 495000,
    compatibility: ['Honda Scoopy', 'Honda Vario 125/150', 'Honda Vario 160', 'Honda PCX 160'],
    specSummary: 'Serat Aramid Tahan Suhu Tinggi · Tarikan Bawah-Atas Padat',
    weightOrDimension: 'Roller 9g / 10g / 11g',
    inStock: true,
  },
  {
    id: 'ktm-cnc-mirror-handgrip',
    name: 'Paket Spion CNC Round & Handgrip Racing KTM',
    categoryId: 'aksesoris',
    brand: 'KTM',
    price: 340000,
    compatibility: ['Honda Scoopy', 'Vespa Matic', 'Yamaha Grand Filano', 'Yamaha Fazzio'],
    specSummary: 'Kaca Blue Lens Anti-Silau + Handgrip Karet Soft Compound',
    weightOrDimension: 'Universal Plug & Play',
    inStock: true,
  },
  {
    id: 'rcb-hg66-balancer',
    name: 'Handgrip RCB AHG66 + Jalu Stang CNC',
    categoryId: 'aksesoris',
    brand: 'RCB',
    price: 215000,
    compatibility: ['Honda Scoopy', 'Honda Beat', 'Honda Vario 125/150', 'Honda Stylo 160'],
    specSummary: 'Anti-Slip Ergonomic Grip · Meredam Getaran Stang',
    weightOrDimension: 'Panjang 120mm',
    inStock: true,
  },
];

export const BRAND_PARTNERS: BrandPartner[] = [
  {
    id: 'RCB',
    name: 'RCB',
    fullName: 'Racing Boy Official Partner',
    origin: 'Motorsport Alloy & Braking',
    specialty: 'Velg Racing, Shockbreaker Flow Pro & Master Rem',
    description: 'Distributor dan bengkel pemasangan resmi produk RCB dengan jaminan keaslian serial number dan garansi pabrikan.',
    warrantyNote: '100% Original · Garansi Resmi',
  },
  {
    id: 'KTC',
    name: 'KTC',
    fullName: 'KTC Kytaco Performance',
    origin: 'Precision Suspension & CVT',
    specialty: 'Shockbreaker Tabung, Kaliper CNC & Komponen CVT',
    description: 'Mitra resmi KTC Kytaco di Bekasi untuk tuning suspensi dan upgrade paket akselerasi CVT harian maupun touring.',
    warrantyNote: 'Setting Rebound Gratis di Bengkel',
  },
  {
    id: 'KTM',
    name: 'KTM',
    fullName: 'KTM Racing Parts & Accessories',
    origin: 'High-Grade Racing Components',
    specialty: 'Aksesoris CNC, Belt Kevlar & Detail Estetika',
    description: 'Komponen performa tinggi dan aksesoris presisi dengan standar daya tahan ekstrem untuk tampilan motor yang berkarakter.',
    warrantyNote: 'Presisi Plug & Play',
  },
];

export function formatIDR(amount: number): string {
  const formatted = Math.max(0, Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
}

export function filterSpareparts(
  items: SparepartItem[],
  options: CatalogFilterOptions
): SparepartItem[] {
  const {
    categoryId = 'all',
    brand = 'all',
    vehicleType = 'all',
    priceRange = 'all',
    minPrice,
    maxPrice,
    searchQuery = '',
    sortBy = 'featured',
  } = options;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const normalizedVehicle = vehicleType === 'all' ? 'all' : vehicleType.trim().toLowerCase();

  const filtered = items.filter((item) => {
    if (categoryId !== 'all' && item.categoryId !== categoryId) {
      return false;
    }
    if (brand !== 'all' && item.brand !== brand) {
      return false;
    }
    if (normalizedVehicle !== 'all') {
      const matchesVehicle = item.compatibility.some((v) =>
        v.toLowerCase().includes(normalizedVehicle)
      );
      if (!matchesVehicle) {
        return false;
      }
    }
    if (priceRange === 'under-500k' && item.price >= 500000) {
      return false;
    }
    if (priceRange === '500k-1500k' && (item.price < 500000 || item.price > 1500000)) {
      return false;
    }
    if (priceRange === 'above-1500k' && item.price <= 1500000) {
      return false;
    }
    if (typeof minPrice === 'number' && !Number.isNaN(minPrice) && item.price < minPrice) {
      return false;
    }
    if (typeof maxPrice === 'number' && !Number.isNaN(maxPrice) && maxPrice > 0 && item.price > maxPrice) {
      return false;
    }
    if (normalizedQuery.length > 0) {
      const haystacks = [
        item.name,
        item.brand,
        item.specSummary,
        item.weightOrDimension,
        ...item.compatibility,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystacks.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    sorted.sort((a, b) => a.name.localeCompare(b.name, 'id'));
  }

  return sorted;
}

export function validateConsultationForm(input: ConsultationFormInput): ValidationResult {
  const errors: Partial<Record<keyof ConsultationFormInput, string>> = {};

  const name = input.customerName.trim();
  if (!name) {
    errors.customerName = 'Nama lengkap wajib diisi.';
  } else if (name.length < 2) {
    errors.customerName = 'Nama minimal terdiri dari 2 karakter.';
  }

  const rawPhone = input.whatsappNumber.replace(/[\s\-()]/g, '');
  if (!rawPhone) {
    errors.whatsappNumber = 'Nomor WhatsApp wajib diisi.';
  } else if (!/^(\+62|62|0)8[0-9]{7,12}$/.test(rawPhone)) {
    errors.whatsappNumber = 'Masukkan nomor WhatsApp aktif yang valid (contoh: 081288997744).';
  }

  const motor = input.motorModel.trim();
  if (!motor) {
    errors.motorModel = 'Tipe motor wajib diisi (contoh: Honda Scoopy 2024).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppUrl(
  input: ConsultationFormInput,
  selectedItems: SparepartItem[] = []
): string {
  const shopPhone = '6281288997744';
  const itemLines =
    selectedItems.length > 0
      ? `\nSparepart Pilihan:\n${selectedItems
          .map((i) => `- ${i.name} (${formatIDR(i.price)})`)
          .join('\n')}`
      : '';

  const text = [
    `Halo Admin Scoopy Art Bekasi, saya ingin konsultasi sparepart:`,
    `Nama: ${input.customerName.trim()}`,
    `No. WA: ${input.whatsappNumber.trim()}`,
    `Motor: ${input.motorModel.trim()}`,
    `Kategori: ${input.selectedCategory || 'Umum'}`,
    input.notes.trim() ? `Catatan: ${input.notes.trim()}` : '',
    itemLines,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${shopPhone}?text=${encodeURIComponent(text)}`;
}
