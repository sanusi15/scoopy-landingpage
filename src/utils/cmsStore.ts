import {
  PRODUCT_CATEGORIES,
  SPAREPART_CATALOG,
  BRAND_PARTNERS,
  ProductCategory,
  SparepartItem,
  BrandPartner,
  CategoryId,
  BrandId,
} from './catalogLogic';

export type BookingStatus = 'Menunggu Konfirmasi' | 'Jadwal Dikonfirmasi' | 'Selesai Dipasang';

export interface ConsultationBookingRecord {
  id: string;
  createdAt: string;
  customerName: string;
  whatsappNumber: string;
  motorModel: string;
  selectedCategory: string;
  notes: string;
  selectedPartNames: string[];
  estimatedTotal: number;
  status: BookingStatus;
}

export interface SiteSettings {
  heroTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutHeadline: string;
  aboutDescription: string;
  address: string;
  whatsappDisplay: string;
  whatsappNumberClean: string;
  instagramHandle: string;
  operatingHours: string;
}

export interface CmsDatabaseState {
  products: SparepartItem[];
  categories: ProductCategory[];
  brands: BrandPartner[];
  bookings: ConsultationBookingRecord[];
  settings: SiteSettings;
  lastUpdated: string;
}

export interface ProductFormInput {
  name: string;
  categoryId: CategoryId;
  brand: BrandId;
  price: number;
  compatibilityText: string;
  specSummary: string;
  weightOrDimension: string;
  inStock: boolean;
  isFeatured: boolean;
  imageUrl?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroTagline: 'Spesialis Sparepart & Estetika Motor · Bekasi, Jawa Barat',
  heroHeadline: 'Upgrade Performa & Estetika Motormu di Scoopy Art.',
  heroSubheadline:
    'Pusat sparepart motor terlengkap dan berkualitas di Bekasi. Bikin motormu tampil beda dan lebih bertenaga.',
  aboutHeadline: 'Bengkel & Sparepart Terpercaya di Bekasi',
  aboutDescription:
    'Scoopy Art hadir di Bekasi, Jawa Barat, untuk memenuhi kebutuhan para pecinta motor yang menginginkan sparepart berkualitas tinggi. Kami tidak hanya menjual alat motor, tapi juga memberikan solusi estetika dan performa terbaik untuk motor kesayangan Anda.',
  address:
    'Jl. Raya Kalimalang No. 88, Jakasampurna, Kec. Bekasi Barat, Kota Bekasi, Jawa Barat 17145',
  whatsappDisplay: '0812-8899-7744',
  whatsappNumberClean: '6281288997744',
  instagramHandle: '@scoopyart_bekasi',
  operatingHours: 'Senin – Minggu · 09.00 – 20.00 WIB',
};

export const INITIAL_BOOKINGS: ConsultationBookingRecord[] = [
  {
    id: 'BKG-2026-001',
    createdAt: '2026-10-27 10:15',
    customerName: 'Dimas Aditya',
    whatsappNumber: '0812-9011-3344',
    motorModel: 'Honda Scoopy Prestige 2024',
    selectedCategory: 'Shockbreaker',
    notes: 'Pasang Shockbreaker RCB Flow Pro 310mm hitam sore ini jam 16.00',
    selectedPartNames: ['Shockbreaker RCB Flow Pro Matic Single'],
    estimatedTotal: 1780000,
    status: 'Jadwal Dikonfirmasi',
  },
  {
    id: 'BKG-2026-002',
    createdAt: '2026-10-27 11:40',
    customerName: 'Fajar Nugroho',
    whatsappNumber: '0813-7788-2211',
    motorModel: 'Honda Vario 150 Keyless',
    selectedCategory: 'CVT & Mesin',
    notes: 'Tanya ketersediaan Mupo Bak CVT Billet CNC + Swing Arm X1R',
    selectedPartNames: [
      'Mupo Bak CVT Billet CNC Vario 125 / 150',
      'Swing Arm CNC X1R Vario (X-Wheel Edition)',
    ],
    estimatedTotal: 3900000,
    status: 'Menunggu Konfirmasi',
  },
  {
    id: 'BKG-2026-003',
    createdAt: '2026-10-26 15:20',
    customerName: 'Reza Pahlevi',
    whatsappNumber: '0857-1122-9988',
    motorModel: 'Honda Beat Deluxe 2023',
    selectedCategory: 'Pengereman',
    notes: 'Upgrade piringan cakram Solfili WD-01 190mm',
    selectedPartNames: ['Solfili Disk Brake WD-01 190mm Beat / Scoopy / Vario'],
    estimatedTotal: 420000,
    status: 'Selesai Dipasang',
  },
];

export const CMS_STORAGE_KEY = 'scoopy_art_cms_db_v1';

export function getInitialCmsState(): CmsDatabaseState {
  return {
    products: [...SPAREPART_CATALOG],
    categories: [...PRODUCT_CATEGORIES],
    brands: [...BRAND_PARTNERS],
    bookings: [...INITIAL_BOOKINGS],
    settings: { ...DEFAULT_SITE_SETTINGS },
    lastUpdated: '2026-10-27 12:00',
  };
}

export function loadCmsState(): CmsDatabaseState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return getInitialCmsState();
  }
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) {
      return getInitialCmsState();
    }
    const parsed = JSON.parse(raw) as Partial<CmsDatabaseState>;
    if (!parsed || !Array.isArray(parsed.products) || !Array.isArray(parsed.categories)) {
      return getInitialCmsState();
    }
    return {
      products: parsed.products,
      categories: parsed.categories,
      brands: Array.isArray(parsed.brands) ? parsed.brands : [...BRAND_PARTNERS],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [...INITIAL_BOOKINGS],
      settings: parsed.settings ? { ...DEFAULT_SITE_SETTINGS, ...parsed.settings } : { ...DEFAULT_SITE_SETTINGS },
      lastUpdated: parsed.lastUpdated || '2026-10-27 12:00',
    };
  } catch {
    return getInitialCmsState();
  }
}

export function saveCmsState(state: CmsDatabaseState): CmsDatabaseState {
  const nextState: CmsDatabaseState = {
    ...state,
    lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' '),
  };
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(nextState));
      window.dispatchEvent(new CustomEvent('scoopy-cms-updated'));
    } catch {
      // Ignore storage quota errors
    }
  }
  return nextState;
}

export function validateProductForm(input: ProductFormInput): {
  valid: boolean;
  errors: Partial<Record<keyof ProductFormInput, string>>;
} {
  const errors: Partial<Record<keyof ProductFormInput, string>> = {};

  if (!input.name.trim()) {
    errors.name = 'Nama produk sparepart wajib diisi.';
  }
  if (!input.price || Number.isNaN(Number(input.price)) || Number(input.price) <= 0) {
    errors.price = 'Harga produk harus lebih dari Rp 0.';
  }
  if (!input.specSummary.trim()) {
    errors.specSummary = 'Ringkasan spesifikasi wajib diisi.';
  }
  if (!input.weightOrDimension.trim()) {
    errors.weightOrDimension = 'Ukuran / dimensi wajib diisi.';
  }
  if (!input.compatibilityText.trim()) {
    errors.compatibilityText = 'Minimal 1 tipe kendaraan kompatibel wajib diisi.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function addOrUpdateProductInState(
  state: CmsDatabaseState,
  input: ProductFormInput,
  editingId?: string
): CmsDatabaseState {
  const compatibility = input.compatibilityText
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const newItem: SparepartItem = {
    id:
      editingId ||
      `${input.brand.toLowerCase()}-${input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`,
    name: input.name.trim(),
    categoryId: input.categoryId,
    brand: input.brand,
    price: Math.round(Number(input.price)),
    compatibility: compatibility.length > 0 ? compatibility : ['Honda Scoopy'],
    specSummary: input.specSummary.trim(),
    weightOrDimension: input.weightOrDimension.trim(),
    inStock: input.inStock,
    isFeatured: input.isFeatured,
    imageUrl: input.imageUrl?.trim() ? input.imageUrl.trim() : undefined,
  };

  const products = editingId
    ? state.products.map((p) => (p.id === editingId ? newItem : p))
    : [newItem, ...state.products];

  return {
    ...state,
    products,
  };
}

export function deleteProductFromState(
  state: CmsDatabaseState,
  productId: string
): CmsDatabaseState {
  return {
    ...state,
    products: state.products.filter((p) => p.id !== productId),
  };
}

export function toggleProductStockInState(
  state: CmsDatabaseState,
  productId: string
): CmsDatabaseState {
  return {
    ...state,
    products: state.products.map((p) =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ),
  };
}
