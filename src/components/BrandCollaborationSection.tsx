import React from 'react';
import { BRAND_PARTNERS, BrandId, BrandPartner } from '../utils/catalogLogic';
import { BrandPartnerLogo } from './SparepartVisuals';

interface BrandCollaborationSectionProps {
  activeBrandFilter: BrandId | 'all';
  onSelectBrand: (brand: BrandPartner['id']) => void;
}

export const BrandCollaborationSection: React.FC<BrandCollaborationSectionProps> = ({
  activeBrandFilter,
  onSelectBrand,
}) => {
  return (
    <section
      id="brand"
      className="py-20 lg:py-24 bg-white"
      aria-labelledby="heading-kolaborasi-brand"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#E03A3E] mb-2">
            Mitra Resmi &amp; Jaminan Original
          </p>
          <h2
            id="heading-kolaborasi-brand"
            className="text-2xl sm:text-4xl font-bold tracking-tight text-[#212529] balance"
          >
            Brand Resmi yang Bekerja Sama dengan Kami
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Seluruh produk yang terpasang di Scoopy Art dijamin 100% original. Arahkan kursor
            atau pilih logo brand untuk memfilter produk resmi di katalog kami.
          </p>
        </div>

        {/* Symmetrical 3-Column Brand Grid with Soft Grayscale-to-Color Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {BRAND_PARTNERS.map((partner) => {
            const isSelected = activeBrandFilter === partner.id;

            return (
              <button
                key={partner.id}
                type="button"
                onClick={() => onSelectBrand(partner.id)}
                className={`group text-left p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#E03A3E] bg-[#F8F9FA]'
                    : 'border-neutral-200/80 bg-[#F8F9FA]/60 hover:bg-white hover:border-neutral-300 hover:shadow-[0_12px_28px_rgba(33,37,41,0.06)]'
                }`}
              >
                {/* Logo container: soft grayscale by default, vibrant color on hover or when active */}
                <div
                  className={`py-5 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'grayscale-0 opacity-100 scale-105 text-[#212529]'
                      : 'grayscale opacity-55 text-neutral-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                >
                  <BrandPartnerLogo brand={partner.id} active={isSelected} />
                </div>

                <div className="mt-4 pt-5 border-t border-neutral-200/70 w-full">
                  <h3 className="text-lg font-bold text-[#212529]">
                    {partner.fullName}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#E03A3E]">
                    {partner.specialty}
                  </p>
                  <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="mt-4 text-xs text-neutral-500">
                    <span>{partner.origin}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-medium text-[#212529]">{partner.warrantyNote}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
