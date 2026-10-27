import React from 'react';
import {
  PRODUCT_CATEGORIES,
  CategoryId,
  formatIDR,
} from '../utils/catalogLogic';
import { CategoryProductVisual } from './SparepartVisuals';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface CatalogSectionProps {
  onOpenFullCatalog: (categoryId?: CategoryId) => void;
  onProceedToConsult: (categoryTitle?: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onOpenFullCatalog,
  onProceedToConsult,
}) => {
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
              Kategori Sparepart Utama
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

        {/* 5 Minimalist Product Category Cards (Lots of Whitespace, Pure Transparent Product Visuals) */}
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

                  {/* Pure Transparent Product Image Container */}
                  <div className="relative h-48 sm:h-52 w-full flex items-center justify-center my-2 transition-transform duration-200 group-hover:-translate-y-1">
                    <CategoryProductVisual categoryId={category.id} />
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
