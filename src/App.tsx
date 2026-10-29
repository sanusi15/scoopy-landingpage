/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BrandId,
  CategoryId,
  SparepartItem,
  formatIDR,
} from './utils/catalogLogic';
import {
  CmsDatabaseState,
  ConsultationBookingRecord,
  loadCmsState,
  saveCmsState,
} from './utils/cmsStore';
import { ScoopyArtLogo, HeroFloatingShowcase } from './components/SparepartVisuals';
import { CatalogSection } from './components/CatalogSection';
import { FullCatalogPage } from './components/FullCatalogPage';
import { BrandCollaborationSection } from './components/BrandCollaborationSection';
import { LocationContactSection } from './components/LocationContactSection';
import { AdminCmsApp } from './admin-cms/AdminCmsApp';
import { MessageCircle, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

type ActivePage = 'home' | 'catalog';
type ActiveProjectWorkspace = 'storefront' | 'admin-cms';

export default function App() {
  // Check URL query parameter ?project=admin so direct navigation to separated Admin CMS works out of the box
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveProjectWorkspace>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('project') === 'admin' || window.location.pathname.includes('admin')) {
        return 'admin-cms';
      }
    }
    return 'storefront';
  });

  const [cmsState, setCmsState] = useState<CmsDatabaseState>(() => loadCmsState());
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<CategoryId | 'all'>('all');
  const [activeBrandFilter, setActiveBrandFilter] = useState<BrandId | 'all'>('all');
  const [selectedItems, setSelectedItems] = useState<SparepartItem[]>(() => {
    const initial = loadCmsState().products;
    return initial.length > 0 ? [initial[0]] : [];
  });
  const [preselectedCategory, setPreselectedCategory] = useState<string>('Velg');

  // Synchronize live changes from Admin CMS (`scoopy-cms-updated` custom event & cross-tab `storage`)
  useEffect(() => {
    const syncFromCms = () => {
      const next = loadCmsState();
      setCmsState(next);
    };
    window.addEventListener('scoopy-cms-updated', syncFromCms);
    window.addEventListener('storage', syncFromCms);
    return () => {
      window.removeEventListener('scoopy-cms-updated', syncFromCms);
      window.removeEventListener('storage', syncFromCms);
    };
  }, []);

  const handleSwitchProject = (workspace: ActiveProjectWorkspace) => {
    setActiveWorkspace(workspace);
    setCmsState(loadCmsState());
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (workspace === 'admin-cms') {
        url.searchParams.set('project', 'admin');
      } else {
        url.searchParams.delete('project');
      }
      window.history.replaceState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleSelectItem = (item: SparepartItem) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleRemoveSelectedItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreateBookingFromStorefront = (booking: ConsultationBookingRecord) => {
    const current = loadCmsState();
    const updated = saveCmsState({
      ...current,
      bookings: [booking, ...current.bookings],
    });
    setCmsState(updated);
  };

  const handleOpenFullCatalog = (categoryId: CategoryId | 'all' = 'all', brand: BrandId | 'all' = 'all') => {
    setCatalogInitialCategory(categoryId);
    setActiveBrandFilter(brand);
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBrandFromGrid = (brand: BrandId) => {
    handleOpenFullCatalog('all', brand);
  };

  const handleProceedToConsult = (categoryTitle?: string) => {
    if (categoryTitle) {
      setPreselectedCategory(categoryTitle);
    }
    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById('lokasi');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // =========================================================================
  // RENDER SEPARATED ADMIN CMS PROJECT WHEN ACTIVE
  // =========================================================================
  if (activeWorkspace === 'admin-cms') {
    return (
      <AdminCmsApp
        onOpenStorefront={() => handleSwitchProject('storefront')}
      />
    );
  }

  const { products, categories, settings } = cmsState;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#212529]">
      {/* =================================================================
          1. BAGIAN HEADER (Navigasi — Strict 3-Zone Contract)
         ================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-[1200px] mx-auto px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Kiri - Logo Scoopy Art */}
          <button
            type="button"
            onClick={() => handleNavigateSection('home')}
            className="focus-visible:outline-2 focus-visible:outline-[#E03A3E] rounded-md shrink-0 whitespace-nowrap cursor-pointer"
            aria-label="Scoopy Art Beranda"
          >
            <ScoopyArtLogo variant="header" />
          </button>

          {/* Zone 2: Menu Navigasi (Sans-serif, tipis & bersih) */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-7 text-sm font-normal text-neutral-600"
          >
            <button
              type="button"
              onClick={() => handleNavigateSection('home')}
              className={`hover:text-[#212529] hover:underline underline-offset-8 decoration-[#E03A3E] decoration-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'home' ? 'text-[#212529] font-medium' : ''
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleOpenFullCatalog('all', 'all')}
              className={`hover:text-[#212529] hover:underline underline-offset-8 decoration-[#E03A3E] decoration-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'catalog' ? 'text-[#E03A3E] font-semibold underline' : ''
              }`}
            >
              Katalog Lengkap
            </button>
            <button
              type="button"
              onClick={() => handleNavigateSection('produk')}
              className="hover:text-[#212529] hover:underline underline-offset-8 decoration-[#E03A3E] decoration-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Produk Kami
            </button>
            <button
              type="button"
              onClick={() => handleNavigateSection('brand')}
              className="hover:text-[#212529] hover:underline underline-offset-8 decoration-[#E03A3E] decoration-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Brand Kolaborasi
            </button>
            <button
              type="button"
              onClick={() => handleNavigateSection('lokasi')}
              className="hover:text-[#212529] hover:underline underline-offset-8 decoration-[#E03A3E] decoration-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Lokasi &amp; Kontak
            </button>
          </nav>

          {/* Zone 3: Tombol CTA "Hubungi Kami" + Akses Cepat Project Admin CMS */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleSwitchProject('admin-cms')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#212529] bg-[#F8F9FA] hover:bg-neutral-200/80 border border-neutral-200/90 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Buka Project Terpisah: Admin CMS Scoopy Art"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E03A3E]" />
              <span>Admin CMS</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigateSection('lokasi')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#E03A3E] hover:bg-[#c83034] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {activePage === 'catalog' ? (
          <FullCatalogPage
            key={`${catalogInitialCategory}-${activeBrandFilter}`}
            products={products}
            categories={categories}
            initialCategory={catalogInitialCategory}
            initialBrand={activeBrandFilter}
            selectedItems={selectedItems}
            onToggleSelectItem={handleToggleSelectItem}
            onBackToHome={() => handleNavigateSection('home')}
            onProceedToConsult={(catTitle) => handleProceedToConsult(catTitle)}
          />
        ) : (
          <>
            {/* =================================================================
                2. BAGIAN HERO (Halaman Utama Atas)
               ================================================================= */}
            <section
              id="home"
              className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-white to-[#F8F9FA]/70"
            >
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  {/* Left Column: Slogan Utama, Sub-slogan, & CTA Buttons */}
                  <div className="lg:col-span-6 space-y-6 animate-fade-in-up">
                    <div className="text-xs font-semibold tracking-wider uppercase text-[#E03A3E]">
                      {settings.heroTagline}
                    </div>

                    <h1
                      className="font-display font-bold tracking-tight text-[#212529] leading-[1.12] balance"
                      style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
                    >
                      {settings.heroHeadline.includes('Scoopy Art') ? (
                        <>
                          {settings.heroHeadline.replace('Scoopy Art.', '').replace('Scoopy Art', '')}
                          <span className="text-[#E03A3E]">Scoopy Art.</span>
                        </>
                      ) : (
                        settings.heroHeadline
                      )}
                    </h1>

                    <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
                      {settings.heroSubheadline}
                    </p>

                    {/* Primary & Secondary Hero Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleOpenFullCatalog('all', 'all')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E03A3E] hover:bg-[#c83034] text-white text-sm font-semibold transition-all shadow-[0_10px_24px_rgba(224,58,62,0.22)] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Lihat Katalog Produk</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavigateSection('lokasi')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F2FBF6] hover:bg-[#E4F7EC] text-emerald-900 border border-emerald-300/80 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-700" />
                        <span>Konsultasi via WA</span>
                      </button>
                    </div>

                    {/* Unboxed proof metrics row */}
                    <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-3 gap-6 max-w-lg">
                      <div>
                        <p className="font-mono text-xl sm:text-2xl font-bold text-[#212529] tabular-nums">
                          100%
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Part Resmi Original
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xl sm:text-2xl font-bold text-[#212529] tabular-nums">
                          1.200+
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Motor Terpasang Rapi
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xl sm:text-2xl font-bold text-[#212529] tabular-nums">
                          {products.length} Part
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Katalog Lengkap Ready
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Gambar Utama PNG Transparan Melayang */}
                  <div className="lg:col-span-6 animate-fade-in-delayed">
                    <HeroFloatingShowcase />
                  </div>
                </div>

                {/* Active Consultation Selection Bar (if items selected) */}
                {selectedItems.length > 0 && (
                  <div className="mt-12 p-4 rounded-xl bg-[#F8F9FA] border border-neutral-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-[#212529]">
                      <ShoppingBag className="w-4 h-4 text-[#E03A3E] shrink-0" />
                      <span>
                        Daftar Konsultasi Anda:{' '}
                        <strong>{selectedItems.length} sparepart dipilih</strong> · Estimasi{' '}
                        <strong className="font-mono tabular-nums">
                          {formatIDR(selectedItems.reduce((s, i) => s + i.price, 0))}
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleOpenFullCatalog('all', 'all')}
                        className="text-xs font-semibold text-neutral-600 hover:text-[#212529] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Tambah Part Lain
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigateSection('lokasi')}
                        className="text-xs font-semibold text-[#E03A3E] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Lanjut Konsultasi Pemasangan →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* =================================================================
                3. BAGIAN KATEGORI PRODUK (Sparepart)
               ================================================================= */}
            <CatalogSection
              products={products}
              categories={categories}
              selectedItems={selectedItems}
              onToggleSelectItem={handleToggleSelectItem}
              onOpenFullCatalog={(catId) => handleOpenFullCatalog(catId || 'all', 'all')}
              onProceedToConsult={handleProceedToConsult}
            />

            {/* =================================================================
                4. BAGIAN KOLABORASI BRAND
               ================================================================= */}
            <BrandCollaborationSection
              activeBrandFilter={activeBrandFilter}
              onSelectBrand={handleSelectBrandFromGrid}
            />

            {/* =================================================================
                5. BAGIAN TENTANG KAMI & LOKASI
               ================================================================= */}
            <LocationContactSection
              settings={settings}
              categories={categories}
              selectedItems={selectedItems}
              preselectedCategory={preselectedCategory}
              onRemoveSelectedItem={handleRemoveSelectedItem}
              onCreateBooking={handleCreateBookingFromStorefront}
            />
          </>
        )}
      </main>

      {/* =================================================================
          6. BAGIAN FOOTER (Hitam / Abu-abu Gelap Smooth Matte)
         ================================================================= */}
      <footer className="bg-[#181A1D] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/90">
            {/* Kiri: Logo Scoopy Art (Versi Putih/Monokrom) & Deskripsi singkat */}
            <div className="md:col-span-5 space-y-4">
              <ScoopyArtLogo variant="footer" />
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                Pusat sparepart motor terlengkap dan bengkel modifikasi terpercaya di Bekasi,
                Jawa Barat. Menghadirkan produk original RCB, KTC, dan KTM dengan instalasi
                presisi.
              </p>
            </div>

            {/* Tengah: Link Cepat (Home, Katalog Lengkap, Produk, Kontak, Portal Admin CMS) */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Link Cepat &amp; Portal
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigateSection('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenFullCatalog('all', 'all')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Halaman Katalog Lengkap
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigateSection('produk')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Kategori Produk
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigateSection('lokasi')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Kontak &amp; Lokasi Bekasi
                  </button>
                </li>
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleSwitchProject('admin-cms')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E03A3E] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Buka Project Terpisah: Admin CMS →</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Kanan: Media Sosial (Icon minimalis SVG: Instagram, Facebook, TikTok) */}
            <div className="md:col-span-3 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Media Sosial Resmi
              </h3>
              <p className="text-xs text-neutral-400">
                Ikuti inspirasi modifikasi harian &amp; update stok terbaru kami:
              </p>
              <div className="flex items-center gap-3 pt-1">
                {/* Instagram */}
                <a
                  href="https://instagram.com/scoopyart_bekasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Scoopy Art Bekasi"
                  className="w-10 h-10 rounded-lg bg-neutral-800/90 hover:bg-[#E03A3E] text-neutral-200 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Scoopy Art Bekasi"
                  className="w-10 h-10 rounded-lg bg-neutral-800/90 hover:bg-[#E03A3E] text-neutral-200 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Scoopy Art Bekasi"
                  className="w-10 h-10 rounded-lg bg-neutral-800/90 hover:bg-[#E03A3E] text-neutral-200 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bawah Sendiri: Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>© 2023 Scoopy Art. All Rights Reserved. Desain Bersih &amp; Elegan.</p>
            <p className="text-neutral-500">
              Bekasi, Jawa Barat · {settings.instagramHandle}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
