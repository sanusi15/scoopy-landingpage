import React from 'react';
import {
  PRODUCT_CATEGORIES,
  SPAREPART_CATALOG,
  CategoryId,
  SparepartItem,
  formatIDR,
} from '../utils/catalogLogic';
import { ProductShowcaseImage } from './SparepartVisuals';
import { ArrowUpRight, ArrowRight, Check, Plus } from 'lucide-react';

interface CatalogSectionProps {
  selectedItems: SparepartItem[];
  onToggleSelectItem: (item: SparepartItem) => void;
  onOpenFullCatalog: (categoryId?: CategoryId) => void;
  onProceedToConsult: (categoryTitle?: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedItems,
  onToggleSelectItem,
  onOpenFullCatalog,
  onProceedToConsult,
}) => {
  const featuredCatalogWithPhotos = SPAREPART_CATALOG.filter((item) => Boolean(item.imageUrl));
  const isSelected = (id: string) => selectedItems.some((item) => item.id === id);

  return (
    <section
      id="produk"
      className="py-20 lg:py-28 bg-[#F8F9FA] border-y border-neutral-200/80"
      aria-labelledby="heading-kategori-produk"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#E03A3E] mb-2">
              Kategori Sparepart &amp; Produk Unggulan
            </p>
            <h2
              id="heading-kategori-produk"
              className="text-2xl sm:text-4xl font-bold tracking-tight text-[#212529] balance"
            >
              Sparepart Terbaik Untuk Motor Anda
            </h2>
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Setiap komponen dipilih melalui kurasi ketat untuk menjamin kepresisian pemasangan,
              peningkatan performa nyata, serta tampilan motor yang bersih dan proporsional.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenFullCatalog()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#212529] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Buka Halaman Katalog Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* =================================================================
            FEATURED SCOOPY ART PRODUCT SHOWCASE (The 4 Uploaded Product Photos)
           ================================================================= */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#212529]">
                Koleksi Produk Terbaru Scoopy Art
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600">
                Produk pilihan ready stock di showroom Bekasi dengan garansi keaslian 100%.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenFullCatalog()}
              className="text-xs font-semibold text-[#E03A3E] hover:underline whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
            >
              Lihat Semua {SPAREPART_CATALOG.length} Produk di Katalog →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCatalogWithPhotos.map((item) => {
              const selected = isSelected(item.id);
              return (
                <article
                  key={item.id}
                  className={`group bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
                    selected
                      ? 'border-[#E03A3E] shadow-[0_12px_28px_rgba(224,58,62,0.08)]'
                      : 'border-neutral-200/90 hover:border-neutral-300 hover:shadow-[0_10px_24px_rgba(33,37,41,0.05)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                      <span>
                        <strong className="text-[#212529]">{item.brand}</strong> · {item.weightOrDimension}
                      </span>
                      <span className="text-emerald-700 font-medium">Ready</span>
                    </div>

                    <div className="w-full aspect-square mb-4">
                      <ProductShowcaseImage
                        imageUrl={item.imageUrl}
                        alt={item.name}
                        categoryId={item.categoryId}
                        className="w-full h-full"
                      />
                    </div>

                    <h4 className="text-base font-bold text-[#212529] leading-snug">
                      {item.name}
                    </h4>
                    <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed line-clamp-2">
                      {item.specSummary}
                    </p>
                    <p className="mt-2 text-[11px] text-neutral-500">
                      Motor: {item.compatibility.slice(0, 3).join(' · ')}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#212529] tabular-nums">
                      {formatIDR(item.price)}
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleSelectItem(item)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
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
                </article>
              );
            })}
          </div>
        </div>

        {/* =================================================================
            5 MINIMALIST PRODUCT CATEGORY CARDS
           ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {PRODUCT_CATEGORIES.map((category, index) => {
            const colSpanClass = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';

            return (
              <article
                key={category.id}
                className={`${colSpanClass} group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-[0_10px_28px_rgba(33,37,41,0.05)] transition-all duration-200 p-7 sm:p-8 flex flex-col justify-between`}
              >
                {/* Top Meta Line (Editorial Numbering + Unboxed Spec) */}
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                    <span className="font-mono font-medium text-[#212529]">
                      {category.number}. {category.title}
                    </span>
                    <span>
                      Mulai{' '}
                      <strong className="font-mono text-[#212529] tabular-nums">
                        {formatIDR(category.startingPrice)}
                      </strong>
                    </span>
                  </div>

                  {/* Product Visual Container (Uses real uploaded photo if available, or transparent vector) */}
                  <div className="relative h-56 sm:h-60 w-full flex items-center justify-center my-2">
                    <ProductShowcaseImage
                      imageUrl={category.imageUrl}
                      alt={`Kategori ${category.title} Scoopy Art`}
                      categoryId={category.id}
                    />
                  </div>
                </div>

                {/* Category Text & Interactive Actions */}
                <div className="pt-4 border-t border-neutral-100">
                  <h3 className="text-xl font-bold text-[#212529] tracking-tight">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#E03A3E]">
                    {category.subtitle}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Unboxed metadata with middle dot separator */}
                  <div className="mt-4 text-xs text-neutral-500">
                    <span>{category.highlightSpec}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenFullCatalog(category.id)}
                      className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#F8F9FA] text-[#212529] hover:bg-[#212529] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Lihat Katalog {category.title}
                    </button>

                    <button
                      type="button"
                      onClick={() => onProceedToConsult(category.title)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#E03A3E] hover:text-[#b82b2f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Tanya Stok</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
