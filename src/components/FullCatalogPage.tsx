import React, { useState } from 'react';
import {
  PRODUCT_CATEGORIES,
  SPAREPART_CATALOG,
  VEHICLE_TYPES,
  PRICE_RANGE_LABELS,
  CategoryId,
  BrandId,
  PriceRangeId,
  SortOptionId,
  ProductCategory,
  SparepartItem,
  formatIDR,
  filterSpareparts,
} from '../utils/catalogLogic';
import { ProductShowcaseImage } from './SparepartVisuals';
import {
  Search,
  RotateCcw,
  Check,
  Plus,
  ArrowLeft,
  SlidersHorizontal,
  ArrowUpDown,
  Bike,
  Tag,
  Layers,
  ShoppingBag,
  X,
  MessageCircle,
} from 'lucide-react';

interface FullCatalogPageProps {
  products?: SparepartItem[];
  categories?: ProductCategory[];
  initialCategory?: CategoryId | 'all';
  initialBrand?: BrandId | 'all';
  selectedItems: SparepartItem[];
  onToggleSelectItem: (item: SparepartItem) => void;
  onBackToHome: () => void;
  onProceedToConsult: (categoryTitle?: string, vehicleType?: string) => void;
}

export const FullCatalogPage: React.FC<FullCatalogPageProps> = ({
  products = SPAREPART_CATALOG,
  categories = PRODUCT_CATEGORIES,
  initialCategory = 'all',
  initialBrand = 'all',
  selectedItems,
  onToggleSelectItem,
  onBackToHome,
  onProceedToConsult,
}) => {
  const [categoryId, setCategoryId] = useState<CategoryId | 'all'>(initialCategory);
  const [brand, setBrand] = useState<BrandId | 'all'>(initialBrand);
  const [vehicleType, setVehicleType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<PriceRangeId>('all');
  const [maxPriceCap, setMaxPriceCap] = useState<number>(2500000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOptionId>('featured');
  const [inspectedItem, setInspectedItem] = useState<SparepartItem | null>(null);

  const filteredItems = filterSpareparts(products, {
    categoryId,
    brand,
    vehicleType,
    priceRange,
    maxPrice: maxPriceCap < 2500000 ? maxPriceCap : undefined,
    searchQuery,
    sortBy,
  });

  const isSelected = (id: string) => selectedItems.some((item) => item.id === id);

  const hasActiveFilters =
    categoryId !== 'all' ||
    brand !== 'all' ||
    vehicleType !== 'all' ||
    priceRange !== 'all' ||
    maxPriceCap < 2500000 ||
    searchQuery.trim().length > 0 ||
    sortBy !== 'featured';

  const handleResetAll = () => {
    setCategoryId('all');
    setBrand('all');
    setVehicleType('all');
    setPriceRange('all');
    setMaxPriceCap(2500000);
    setSearchQuery('');
    setSortBy('featured');
  };

  const getCategoryTitle = (id: CategoryId) =>
    categories.find((c) => c.id === id)?.title || id;

  const totalSelectedPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24">
      {/* Top Page Header Banner */}
      <div className="bg-white border-b border-neutral-200/80 pt-8 pb-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-[#212529] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>

            <div className="text-xs text-neutral-500">
              <span>Showroom Bekasi</span>
              <span aria-hidden="true"> · </span>
              <span className="font-medium text-[#212529] tabular-nums">
                {products.length} Produk Original Ready Stock
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#E03A3E] mb-2">
                Katalog Lengkap Scoopy Art
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#212529] balance">
                Temukan Sparepart Presisi Sesuai Motor &amp; Budget Anda
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Gunakan filter jenis sparepart, tipe kendaraan, rentang harga, atau pencarian
                cepat untuk menemukan komponen original RCB, KTC, KTM, X1R, Mupo, dan Solfili.
              </p>
            </div>

            {/* Prominent Search Bar */}
            <div className="lg:col-span-5">
              <label htmlFor="catalog-search-input" className="block text-xs font-semibold text-[#212529] mb-1.5">
                Pencarian Cepat Sparepart
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="catalog-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama part, ukuran, atau motor (mis. Flow Pro, X1R, Mupo)..."
                  className="w-full pl-10 pr-9 py-3 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-xl text-[#212529] placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-[#E03A3E] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Bersihkan kata kunci pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#212529] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Inline Selected Items Bar (Zero overlap with sidebar or product cards) */}
          {selectedItems.length > 0 && (
            <div className="mt-6 bg-[#212529] text-white rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <ShoppingBag className="w-4 h-4 text-[#E03A3E] shrink-0" />
                <span>
                  <strong>{selectedItems.length} Sparepart Dipilih</strong> · Total Estimasi:{' '}
                  <strong className="font-mono tabular-nums text-white">
                    {formatIDR(totalSelectedPrice)}
                  </strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  onProceedToConsult(
                    categoryId !== 'all' ? getCategoryTitle(categoryId) : 'Velg',
                    vehicleType !== 'all' ? vehicleType : undefined
                  )
                }
                className="px-4 py-2 rounded-lg bg-[#E03A3E] hover:bg-[#c83034] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Lanjut Konsultasi via WA →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Left Filter Sidebar (4 Cols) + Right Product Grid (8 Cols) */}
      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =================================================================
              FILTER SIDEBAR (Jenis Sparepart, Tipe Kendaraan, Harga, Brand)
             ================================================================= */}
          <aside
            aria-label="Filter Katalog Sparepart"
            className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/90 p-6 space-y-6 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#E03A3E]" />
                <h2 className="text-base font-bold text-[#212529]">Filter Katalog</h2>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#E03A3E] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            {/* 1. Filter Berdasarkan Jenis Sparepart */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <Layers className="w-3.5 h-3.5 text-[#E03A3E]" />
                <span>1. Jenis Sparepart</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5" role="group" aria-label="Pilih Jenis Sparepart">
                <button
                  type="button"
                  onClick={() => setCategoryId('all')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer whitespace-nowrap truncate tabular-nums ${
                    categoryId === 'all'
                      ? 'bg-[#212529] text-white'
                      : 'bg-[#F8F9FA] text-neutral-700 hover:bg-neutral-200/70'
                  }`}
                >
                  Semua Jenis ({products.length})
                </button>
                {categories.map((cat) => {
                  const count = products.filter((i) => i.categoryId === cat.id).length;
                  const active = categoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryId(cat.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer whitespace-nowrap truncate tabular-nums ${
                        active
                          ? 'bg-[#E03A3E] text-white'
                          : 'bg-[#F8F9FA] text-neutral-700 hover:bg-neutral-200/70'
                      }`}
                    >
                      {cat.title} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Filter Berdasarkan Tipe Kendaraan */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-100">
              <label
                htmlFor="filter-vehicle-select"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500"
              >
                <Bike className="w-3.5 h-3.5 text-[#E03A3E]" />
                <span>2. Tipe Kendaraan (Motor)</span>
              </label>
              <select
                id="filter-vehicle-select"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-xl text-[#212529] font-medium focus:bg-white focus:outline-none focus:border-[#E03A3E]"
              >
                <option value="all">Semua Tipe Motor</option>
                {VEHICLE_TYPES.map((motor) => (
                  <option key={motor} value={motor}>
                    {motor}
                  </option>
                ))}
              </select>

              {/* Quick Motor Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Honda Scoopy', 'Honda Beat', 'Honda Vario 125/150', 'Honda Vario 160'].map((motor) => (
                  <button
                    key={motor}
                    type="button"
                    onClick={() =>
                      setVehicleType((prev) => (prev === motor ? 'all' : motor))
                    }
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      vehicleType === motor
                        ? 'bg-[#212529] text-white'
                        : 'bg-[#F8F9FA] text-neutral-600 hover:text-[#212529]'
                    }`}
                  >
                    {motor}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Filter Berdasarkan Harga */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <Tag className="w-3.5 h-3.5 text-[#E03A3E]" />
                <span>3. Rentang Harga</span>
              </label>

              <div className="space-y-1.5" role="group" aria-label="Pilih Rentang Harga">
                {PRICE_RANGE_LABELS.map((range) => {
                  const active = priceRange === range.id;
                  return (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setPriceRange(range.id)}
                      className={`w-full px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#212529] text-white'
                          : 'bg-[#F8F9FA] text-neutral-700 hover:bg-neutral-200/70'
                      }`}
                    >
                      <span>{range.label}</span>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Slider Batas Harga Maksimum */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-neutral-500">Batas Harga Maksimal:</span>
                  <span className="font-mono font-bold text-[#212529] tabular-nums">
                    {formatIDR(maxPriceCap)}
                  </span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={2500000}
                  step={50000}
                  value={maxPriceCap}
                  onChange={(e) => setMaxPriceCap(Number(e.target.value))}
                  aria-label="Batas Harga Maksimal"
                  className="w-full accent-[#E03A3E] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>Rp 200rb</span>
                  <span>Rp 2,5 Juta</span>
                </div>
              </div>
            </div>

            {/* 4. Filter Brand Resmi */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-100">
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                4. Brand Produk
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['all', 'RCB', 'KTC', 'KTM', 'X1R', 'MUPO', 'SOLFILI'] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap truncate ${
                      brand === b
                        ? 'bg-[#E03A3E] text-white'
                        : 'bg-[#F8F9FA] text-neutral-700 hover:bg-neutral-200/70'
                    }`}
                  >
                    {b === 'all' ? 'Semua' : b}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* =================================================================
              PRODUCT CATALOG LISTING (Right 8 Columns)
             ================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Toolbar: Result Count, Active Filter Summary, & Price Sort */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-neutral-600">
                Menampilkan{' '}
                <strong className="font-mono font-bold text-[#212529] tabular-nums">
                  {filteredItems.length}
                </strong>{' '}
                dari {products.length} produk sparepart
                {vehicleType !== 'all' && (
                  <span>
                    {' '}
                    untuk <strong className="text-[#212529]">{vehicleType}</strong>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                <label htmlFor="sort-catalog-select" className="text-xs font-medium text-neutral-500">
                  Urutkan:
                </label>
                <select
                  id="sort-catalog-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOptionId)}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:outline-none focus:border-[#E03A3E]"
                >
                  <option value="featured">Rekomendasi Utama</option>
                  <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                  <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                  <option value="name-asc">Nama Produk (A–Z)</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-12 text-center space-y-3">
                <p className="text-base font-bold text-[#212529]">
                  Tidak ada sparepart yang sesuai dengan kombinasi filter Anda.
                </p>
                <p className="text-sm text-neutral-500 max-w-md mx-auto">
                  Coba ubah rentang harga, pilih tipe kendaraan lain, atau reset filter untuk
                  melihat seluruh koleksi Scoopy Art.
                </p>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#E03A3E] text-white text-xs font-semibold hover:bg-[#c83034] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Semua Filter</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => {
                  const selected = isSelected(item.id);
                  return (
                    <article
                      key={item.id}
                      className={`group bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between ${
                        selected
                          ? 'border-[#E03A3E] shadow-[0_12px_28px_rgba(224,58,62,0.08)]'
                          : 'border-neutral-200/90 hover:border-neutral-300 hover:shadow-[0_10px_24px_rgba(33,37,41,0.05)]'
                      }`}
                    >
                      <div>
                        {/* Unboxed Metadata Line (Zero Pill Clutter) */}
                        <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                          <div>
                            <span className="font-bold text-[#212529]">{item.brand}</span>
                            <span aria-hidden="true"> · </span>
                            <span>{getCategoryTitle(item.categoryId)}</span>
                            <span aria-hidden="true"> · </span>
                            <span>{item.weightOrDimension}</span>
                          </div>
                          <span className={item.inStock ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
                            {item.inStock ? 'Ready' : 'Indent'}
                          </span>
                        </div>

                        {/* Product Photo or Transparent Vector Illustration */}
                        <div
                          className={`relative w-full flex items-center justify-center my-2 rounded-xl overflow-hidden ${
                            item.imageUrl ? 'aspect-square' : 'h-48 bg-[#F8F9FA]/70 p-4'
                          }`}
                        >
                          <ProductShowcaseImage
                            imageUrl={item.imageUrl}
                            alt={item.name}
                            categoryId={item.categoryId}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Product Title & Specs */}
                        <h3 className="mt-4 text-lg font-bold text-[#212529] leading-snug">
                          {item.name}
                        </h3>
                        <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                          {item.specSummary}
                        </p>

                        {/* Vehicle Compatibility List */}
                        <div className="mt-3 pt-3 border-t border-neutral-100 text-xs text-neutral-500">
                          <span className="font-semibold text-[#212529]">Tipe Kendaraan: </span>
                          <span>{item.compatibility.join(' · ')}</span>
                        </div>
                      </div>

                      {/* Price & Action Footer */}
                      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                        <div>
                          <span className="block text-[11px] text-neutral-400">Harga Resmi</span>
                          <span className="font-mono text-lg font-bold text-[#212529] tabular-nums">
                            {formatIDR(item.price)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setInspectedItem(item)}
                            className="px-3 py-2 rounded-lg text-xs font-semibold bg-[#F8F9FA] text-[#212529] hover:bg-neutral-200/80 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Detail
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleSelectItem(item)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                              selected
                                ? 'bg-[#212529] text-white hover:bg-neutral-800'
                                : 'bg-[#E03A3E] text-white hover:bg-[#c83034]'
                            }`}
                          >
                            {selected ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Dipilih</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Pilih Part</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {inspectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative">
            <button
              type="button"
              onClick={() => setInspectedItem(null)}
              aria-label="Tutup detail produk"
              className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#F8F9FA] hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs text-neutral-500 mb-2">
              <span className="font-bold text-[#E03A3E]">{inspectedItem.brand}</span>
              <span aria-hidden="true"> · </span>
              <span>{getCategoryTitle(inspectedItem.categoryId)}</span>
              <span aria-hidden="true"> · </span>
              <span>{inspectedItem.weightOrDimension}</span>
            </div>

            <h3 id="modal-product-title" className="text-xl font-bold text-[#212529]">
              {inspectedItem.name}
            </h3>

            <div className="my-5 h-64 bg-[#F8F9FA] rounded-xl p-2 flex items-center justify-center">
              <ProductShowcaseImage
                imageUrl={inspectedItem.imageUrl}
                alt={inspectedItem.name}
                categoryId={inspectedItem.categoryId}
              />
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-[#212529]">Spesifikasi Teknis: </span>
                <span className="text-neutral-600">{inspectedItem.specSummary}</span>
              </div>
              <div>
                <span className="font-semibold text-[#212529]">Kompatibilitas Kendaraan: </span>
                <span className="text-neutral-600">{inspectedItem.compatibility.join(' · ')}</span>
              </div>
              <div className="pt-2 flex items-baseline justify-between border-t border-neutral-100">
                <span className="text-xs text-neutral-500">Harga Produk Original:</span>
                <span className="font-mono text-xl font-bold text-[#212529] tabular-nums">
                  {formatIDR(inspectedItem.price)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!isSelected(inspectedItem.id)) {
                    onToggleSelectItem(inspectedItem);
                  }
                  const catTitle = getCategoryTitle(inspectedItem.categoryId);
                  setInspectedItem(null);
                  onProceedToConsult(catTitle, inspectedItem.compatibility[0]);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E03A3E] hover:bg-[#c83034] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi &amp; Pasang Part Ini</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
