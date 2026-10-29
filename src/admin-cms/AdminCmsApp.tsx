import React, { useState, useEffect } from 'react';
import {
  CategoryId,
  BrandId,
  SparepartItem,
  ProductCategory,
  formatIDR,
} from '../utils/catalogLogic';
import {
  CmsDatabaseState,
  ProductFormInput,
  BookingStatus,
  loadCmsState,
  saveCmsState,
  getInitialCmsState,
  validateProductForm,
  addOrUpdateProductInState,
  deleteProductFromState,
  toggleProductStockInState,
} from '../utils/cmsStore';
import { ScoopyArtLogo, ProductShowcaseImage } from '../components/SparepartVisuals';
import {
  Package,
  Layers,
  CalendarCheck,
  Settings,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  RotateCcw,
  Download,
  X,
  Lock,
  LogOut,
  Check,
  MessageSquare,
} from 'lucide-react';

type CmsTab = 'products' | 'categories' | 'bookings' | 'settings';

const UPLOADED_PHOTO_PRESETS = [
  {
    label: 'Foto RCB Flow Pro Shockbreaker',
    url: '/assets/aistudio/IMG_0676_bfda774e.PNG',
  },
  {
    label: 'Foto Swing Arm CNC X1R Vario',
    url: '/assets/aistudio/IMG_0677_749fdf4c.PNG',
  },
  {
    label: 'Foto Mupo Bak CVT Billet CNC',
    url: '/assets/aistudio/IMG_0678_3bc35099.PNG',
  },
  {
    label: 'Foto Solfili Disk Brake WD-01',
    url: '/assets/aistudio/IMG_0679_9bf4124d.PNG',
  },
  {
    label: 'Ilustrasi Transparan Default (Tanpa Foto)',
    url: '',
  },
];

interface AdminCmsAppProps {
  onOpenStorefront?: () => void;
}

export const AdminCmsApp: React.FC<AdminCmsAppProps> = ({ onOpenStorefront }) => {
  // Support ?autostart=1 or default authenticated session for fast testing, with lock/logout button
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginUsername, setLoginUsername] = useState('admin@scoopyart.id');
  const [loginPassword, setLoginPassword] = useState('scoopyart2026');
  const [loginError, setLoginError] = useState('');

  const [cmsState, setCmsState] = useState<CmsDatabaseState>(() => loadCmsState());
  const [activeTab, setActiveTab] = useState<CmsTab>('products');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Products tab filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState<CategoryId | 'all'>('all');
  const [filterStock, setFilterStock] = useState<'all' | 'ready' | 'empty'>('all');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | undefined>(undefined);
  const [productForm, setProductForm] = useState<ProductFormInput>({
    name: '',
    categoryId: 'shockbreaker',
    brand: 'RCB',
    price: 1500000,
    compatibilityText: 'Honda Scoopy, Honda Beat, Honda Vario 125/150',
    specSummary: '',
    weightOrDimension: '',
    inStock: true,
    isFeatured: true,
    imageUrl: '/assets/aistudio/IMG_0676_bfda774e.PNG',
  });
  const [productErrors, setProductErrors] = useState<
    Partial<Record<keyof ProductFormInput, string>>
  >({});

  // Bookings filter
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatus | 'all'>('all');

  useEffect(() => {
    const handleSync = () => {
      setCmsState(loadCmsState());
    };
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => {
      setSaveToast((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const commitState = (next: CmsDatabaseState, message: string) => {
    const saved = saveCmsState(next);
    setCmsState(saved);
    showNotification(message);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('Email admin dan kata sandi wajib diisi.');
      return;
    }
    setLoginError('');
    setIsAuthenticated(true);
  };

  const openAddProductModal = () => {
    setEditingProductId(undefined);
    setProductForm({
      name: '',
      categoryId: 'shockbreaker',
      brand: 'RCB',
      price: 1500000,
      compatibilityText: 'Honda Scoopy, Honda Beat, Honda Vario 125/150',
      specSummary: '',
      weightOrDimension: '',
      inStock: true,
      isFeatured: true,
      imageUrl: '/assets/aistudio/IMG_0676_bfda774e.PNG',
    });
    setProductErrors({});
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (item: SparepartItem) => {
    setEditingProductId(item.id);
    setProductForm({
      name: item.name,
      categoryId: item.categoryId,
      brand: item.brand,
      price: item.price,
      compatibilityText: item.compatibility.join(', '),
      specSummary: item.specSummary,
      weightOrDimension: item.weightOrDimension,
      inStock: item.inStock,
      isFeatured: Boolean(item.isFeatured),
      imageUrl: item.imageUrl || '',
    });
    setProductErrors({});
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateProductForm(productForm);
    if (!validation.valid) {
      setProductErrors(validation.errors);
      return;
    }
    const nextState = addOrUpdateProductInState(cmsState, productForm, editingProductId);
    commitState(
      nextState,
      editingProductId
        ? 'Data produk berhasil diperbarui di katalog.'
        : 'Produk baru berhasil ditambahkan ke katalog.'
    );
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    const nextState = deleteProductFromState(cmsState, id);
    commitState(nextState, `Produk "${name}" telah dihapus.`);
  };

  const handleToggleStock = (id: string) => {
    const nextState = toggleProductStockInState(cmsState, id);
    commitState(nextState, 'Status ketersediaan stok diperbarui.');
  };

  const handleToggleFeatured = (id: string) => {
    const nextState: CmsDatabaseState = {
      ...cmsState,
      products: cmsState.products.map((p) =>
        p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
      ),
    };
    commitState(nextState, 'Status produk unggulan diperbarui.');
  };

  const handleUpdateCategory = (catId: CategoryId, patch: Partial<ProductCategory>) => {
    const nextState: CmsDatabaseState = {
      ...cmsState,
      categories: cmsState.categories.map((c) => (c.id === catId ? { ...c, ...patch } : c)),
    };
    commitState(nextState, 'Data kategori sparepart berhasil disimpan.');
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingStatus) => {
    const nextState: CmsDatabaseState = {
      ...cmsState,
      bookings: cmsState.bookings.map((b) => (b.id === bookingId ? { ...b, status } : b)),
    };
    commitState(nextState, `Status reservasi ${bookingId} diubah menjadi "${status}".`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    const nextState: CmsDatabaseState = {
      ...cmsState,
      bookings: cmsState.bookings.filter((b) => b.id !== bookingId),
    };
    commitState(nextState, `Data reservasi ${bookingId} dihapus.`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    commitState(cmsState, 'Pengaturan konten & profil bengkel berhasil disimpan.');
  };

  const handleResetDatabase = () => {
    const fresh = getInitialCmsState();
    commitState(fresh, 'Database CMS berhasil dikembalikan ke pengaturan awal.');
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cmsState, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'scoopy-art-cms-backup.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
    showNotification('File JSON backup katalog berhasil diunduh.');
  };

  // Filtered products in CMS table
  const filteredProducts = cmsState.products.filter((item) => {
    if (filterCat !== 'all' && item.categoryId !== filterCat) return false;
    if (filterStock === 'ready' && !item.inStock) return false;
    if (filterStock === 'empty' && item.inStock) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const hay = `${item.name} ${item.brand} ${item.specSummary} ${item.compatibility.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const filteredBookings = cmsState.bookings.filter((b) =>
    bookingStatusFilter === 'all' ? true : b.status === bookingStatusFilter
  );

  // KPI metrics
  const totalProducts = cmsState.products.length;
  const readyStockCount = cmsState.products.filter((p) => p.inStock).length;
  const featuredCount = cmsState.products.filter((p) => p.isFeatured).length;
  const pendingBookingsCount = cmsState.bookings.filter(
    (b) => b.status === 'Menunggu Konfirmasi'
  ).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-neutral-200 max-w-md w-full p-8 space-y-6">
          <div className="flex items-center justify-between">
            <ScoopyArtLogo variant="header" />
            <span className="text-xs font-mono font-semibold text-neutral-500">
              ADMIN CMS PORTAL
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#212529]">Masuk ke CMS Scoopy Art</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Project terpisah untuk mengelola katalog sparepart, harga, stok, dan antrean
              konsultasi bengkel Bekasi.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="cms-login-email"
                className="block text-xs font-semibold text-[#212529] mb-1.5"
              >
                Email Administrator
              </label>
              <input
                id="cms-login-email"
                type="email"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
              />
            </div>

            <div>
              <label
                htmlFor="cms-login-password"
                className="block text-xs font-semibold text-[#212529] mb-1.5"
              >
                Kata Sandi
              </label>
              <input
                id="cms-login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
              />
            </div>

            {loginError && (
              <p role="alert" className="text-xs font-medium text-[#E03A3E]">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#E03A3E] hover:bg-[#c83034] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Masuk ke Dashboard CMS
            </button>
          </form>

          {onOpenStorefront && (
            <div className="pt-4 border-t border-neutral-100 text-center">
              <button
                type="button"
                onClick={onOpenStorefront}
                className="text-xs font-semibold text-neutral-600 hover:text-[#212529] cursor-pointer"
              >
                ← Kembali ke Website Storefront Pelanggan
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] flex flex-col lg:flex-row">
      {/* =====================================================================
          SIDEBAR NAVIGATION (260px Fixed Workspace Sidebar)
         ===================================================================== */}
      <aside className="w-full lg:w-[264px] shrink-0 bg-[#181A1D] text-neutral-300 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800">
        <div className="p-6 space-y-6">
          {/* Brand Lockup */}
          <div className="flex items-center justify-between lg:block space-y-2">
            <ScoopyArtLogo variant="footer" />
            <div className="text-xs text-neutral-400 font-mono">
              Project: <strong className="text-white">scoopy-art-cms</strong>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav aria-label="Menu Utama CMS" className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#E03A3E] text-white'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap">
                <Package className="w-4 h-4 shrink-0" />
                <span>Produk &amp; Katalog</span>
              </span>
              <span className="font-mono text-xs tabular-nums opacity-85">
                {totalProducts}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-[#E03A3E] text-white'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap">
                <Layers className="w-4 h-4 shrink-0" />
                <span>Kategori Sparepart</span>
              </span>
              <span className="font-mono text-xs tabular-nums opacity-85">
                {cmsState.categories.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#E03A3E] text-white'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap">
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Konsultasi &amp; Booking</span>
              </span>
              <span className="font-mono text-xs tabular-nums opacity-85">
                {cmsState.bookings.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#E03A3E] text-white'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap">
                <Settings className="w-4 h-4 shrink-0" />
                <span>Pengaturan Konten</span>
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Workspace Switcher & Session Info */}
        <div className="p-6 border-t border-neutral-800 space-y-3">
          {onOpenStorefront && (
            <button
              type="button"
              onClick={onOpenStorefront}
              className="w-full py-2.5 px-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E03A3E]" />
              <span>Lihat Website Storefront</span>
            </button>
          )}

          <div className="flex items-center justify-between pt-2 text-xs text-neutral-400">
            <span className="truncate">admin@scoopyart.id</span>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-white cursor-pointer shrink-0"
              aria-label="Kunci sesi CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN WORKSPACE VIEWPORT
         ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Contract: Breadcrumb on Left, Primary Actions on Right */}
        <header className="bg-white border-b border-neutral-200 px-6 lg:px-8 h-16 flex items-center justify-between gap-6 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 truncate">
            <span className="font-semibold text-[#212529]">Scoopy Art CMS</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#E03A3E] font-semibold">
              {activeTab === 'products' && 'Manajemen Produk & Katalog'}
              {activeTab === 'categories' && 'Kategori Sparepart'}
              {activeTab === 'bookings' && 'Antrean Konsultasi & Reservasi'}
              {activeTab === 'settings' && 'Pengaturan Konten & Profil Bengkel'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {saveToast && (
              <div
                role="status"
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{saveToast}</span>
              </div>
            )}

            <button
              type="button"
              onClick={openAddProductModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E03A3E] hover:bg-[#c83034] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="p-6 lg:p-8 space-y-6 max-w-[1280px]">
          {/* KPI Summary Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <span className="text-xs text-neutral-500">Total Produk Katalog</span>
              <p className="mt-1 font-mono text-2xl font-bold text-[#212529] tabular-nums">
                {totalProducts}
              </p>
              <span className="text-[11px] text-neutral-400">Tersinkronisasi dengan Storefront</span>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <span className="text-xs text-neutral-500">Produk Ready Stock</span>
              <p className="mt-1 font-mono text-2xl font-bold text-emerald-700 tabular-nums">
                {readyStockCount}
              </p>
              <span className="text-[11px] text-neutral-400">
                {totalProducts - readyStockCount} produk stok habis
              </span>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <span className="text-xs text-neutral-500">Produk Unggulan Beranda</span>
              <p className="mt-1 font-mono text-2xl font-bold text-[#212529] tabular-nums">
                {featuredCount}
              </p>
              <span className="text-[11px] text-neutral-400">Tampil di Highlight Utama</span>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <span className="text-xs text-neutral-500">Konsultasi WA Menunggu</span>
              <p className="mt-1 font-mono text-2xl font-bold text-[#E03A3E] tabular-nums">
                {pendingBookingsCount}
              </p>
              <span className="text-[11px] text-neutral-400">
                Total {cmsState.bookings.length} tiket reservasi
              </span>
            </div>
          </div>

          {/* =================================================================
              TAB 1: MANAJEMEN PRODUK & KATALOG
             ================================================================= */}
          {activeTab === 'products' && (
            <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              {/* Filter & Search Toolbar */}
              <div className="p-5 border-b border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama produk, brand, atau tipe motor..."
                    aria-label="Cari produk di CMS"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <select
                    aria-label="Filter Kategori di CMS"
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value as CategoryId | 'all')}
                    className="px-3 py-2 text-xs font-semibold bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529]"
                  >
                    <option value="all">Semua Kategori ({cmsState.products.length})</option>
                    {cmsState.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Filter Status Stok"
                    value={filterStock}
                    onChange={(e) => setFilterStock(e.target.value as 'all' | 'ready' | 'empty')}
                    className="px-3 py-2 text-xs font-semibold bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529]"
                  >
                    <option value="all">Semua Status Stok</option>
                    <option value="ready">Ready Stock</option>
                    <option value="empty">Stok Habis</option>
                  </select>
                </div>
              </div>

              {/* High-Density Product Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-[#F8F9FA] text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      <th className="py-3.5 px-4">Produk Sparepart</th>
                      <th className="py-3.5 px-3">Kategori &amp; Brand</th>
                      <th className="py-3.5 px-3">Kompatibilitas Motor</th>
                      <th className="py-3.5 px-3 text-right">Harga Resmi</th>
                      <th className="py-3.5 px-3 text-center">Status Stok</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-sm">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-neutral-500">
                          Tidak ada produk yang cocok dengan filter pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#F8F9FA]/70 transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#F8F9FA] border border-neutral-200 flex items-center justify-center">
                                <ProductShowcaseImage
                                  imageUrl={item.imageUrl}
                                  alt={item.name}
                                  categoryId={item.categoryId}
                                  className="w-full h-full"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-[#212529] truncate max-w-[230px]">
                                  {item.name}
                                </p>
                                <p className="text-xs text-neutral-500 truncate max-w-[230px]">
                                  {item.specSummary}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <div className="text-xs">
                              <span className="font-bold text-[#212529]">{item.brand}</span>
                              <span aria-hidden="true"> · </span>
                              <span className="text-neutral-600 capitalize">{item.categoryId}</span>
                            </div>
                            <div className="text-[11px] text-neutral-400 truncate max-w-[140px]">
                              {item.weightOrDimension}
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <p className="text-xs text-neutral-600 line-clamp-2 max-w-[165px]">
                              {item.compatibility.join(' · ')}
                            </p>
                          </td>

                          <td className="py-3.5 px-3 text-right font-mono font-bold text-[#212529] tabular-nums whitespace-nowrap">
                            {formatIDR(item.price)}
                          </td>

                          <td className="py-3.5 px-3 text-center whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleToggleStock(item.id)}
                                className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                                  item.inStock
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                                }`}
                              >
                                {item.inStock ? 'Ready Stock' : 'Stok Habis'}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleFeatured(item.id)}
                                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                                  item.isFeatured
                                    ? 'bg-[#E03A3E]/10 text-[#E03A3E]'
                                    : 'text-neutral-400 hover:text-[#212529]'
                                }`}
                              >
                                {item.isFeatured ? 'Unggulan' : 'Biasa'}
                              </button>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => openEditProductModal(item)}
                                aria-label={`Edit ${item.name}`}
                                className="p-1.5 rounded-lg text-neutral-600 hover:text-[#212529] hover:bg-neutral-100 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(item.id, item.name)}
                                aria-label={`Hapus ${item.name}`}
                                className="p-1.5 rounded-lg text-neutral-500 hover:text-[#E03A3E] hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* =================================================================
              TAB 2: MANAJEMEN KATEGORI SPAREPART
             ================================================================= */}
          {activeTab === 'categories' && (
            <section className="space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-bold text-[#212529]">
                  Pengaturan 5 Kategori Utama Sparepart
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                  Ubah sub-judul, harga mulai, deskripsi, atau gambar sampul setiap kategori yang
                  tampil di halaman utama Scoopy Art.
                </p>

                <div className="mt-6 divide-y divide-neutral-200">
                  {cmsState.categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                    >
                      <div className="lg:col-span-3 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-[#F8F9FA] border border-neutral-200 p-2 shrink-0 flex items-center justify-center">
                          <ProductShowcaseImage
                            imageUrl={cat.imageUrl}
                            alt={cat.title}
                            categoryId={cat.id}
                          />
                        </div>
                        <div>
                          <span className="font-mono text-xs text-neutral-400">
                            Kategori {cat.number}
                          </span>
                          <h3 className="text-lg font-bold text-[#212529]">{cat.title}</h3>
                          <span className="text-xs text-[#E03A3E] font-semibold">
                            Brand Utama: {cat.featuredBrand}
                          </span>
                        </div>
                      </div>

                      <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#212529] mb-1">
                            Sub-judul Kategori
                          </label>
                          <input
                            type="text"
                            value={cat.subtitle}
                            onChange={(e) =>
                              handleUpdateCategory(cat.id, { subtitle: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#212529] mb-1">
                            Harga Mulai (Rp)
                          </label>
                          <input
                            type="number"
                            value={cat.startingPrice}
                            onChange={(e) =>
                              handleUpdateCategory(cat.id, {
                                startingPrice: Number(e.target.value) || 0,
                              })
                            }
                            className="w-full px-3 py-2 text-sm font-mono bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-[#212529] mb-1">
                            Deskripsi Kategori
                          </label>
                          <input
                            type="text"
                            value={cat.description}
                            onChange={(e) =>
                              handleUpdateCategory(cat.id, { description: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* =================================================================
              TAB 3: ANTREAN KONSULTASI & RESERVASI BENGKEL
             ================================================================= */}
          {activeTab === 'bookings' && (
            <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="p-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-[#212529]">
                    Daftar Tiket Konsultasi &amp; Reservasi Pemasangan
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Setiap form konsultasi yang dikirim pengunjung di halaman utama otomatis masuk ke
                    daftar ini.
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  {(
                    [
                      'all',
                      'Menunggu Konfirmasi',
                      'Jadwal Dikonfirmasi',
                      'Selesai Dipasang',
                    ] as const
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setBookingStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        bookingStatusFilter === st
                          ? 'bg-[#212529] text-white'
                          : 'bg-[#F8F9FA] text-neutral-600 hover:text-[#212529]'
                      }`}
                    >
                      {st === 'all' ? 'Semua' : st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-[#F8F9FA] text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      <th className="py-3.5 px-5">ID &amp; Waktu</th>
                      <th className="py-3.5 px-4">Pelanggan &amp; Motor</th>
                      <th className="py-3.5 px-4">Sparepart &amp; Catatan</th>
                      <th className="py-3.5 px-4 text-right">Estimasi Biaya</th>
                      <th className="py-3.5 px-4">Status Reservasi</th>
                      <th className="py-3.5 px-5 text-right">Tindak Lanjut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-sm">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F8F9FA]/70">
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className="font-mono text-xs font-bold text-[#212529]">
                            {b.id}
                          </span>
                          <span className="block font-mono text-[11px] text-neutral-400">
                            {b.createdAt}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <p className="font-bold text-[#212529]">{b.customerName}</p>
                          <p className="text-xs text-neutral-600">{b.motorModel}</p>
                          <p className="font-mono text-xs text-neutral-500">{b.whatsappNumber}</p>
                        </td>

                        <td className="py-4 px-4 max-w-xs">
                          <p className="text-xs font-semibold text-[#E03A3E]">
                            Kategori: {b.selectedCategory}
                          </p>
                          {b.selectedPartNames.length > 0 && (
                            <p className="text-xs text-[#212529] font-medium mt-0.5">
                              {b.selectedPartNames.join(', ')}
                            </p>
                          )}
                          {b.notes && (
                            <p className="text-xs text-neutral-500 mt-1 italic">"{b.notes}"</p>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right font-mono font-bold text-[#212529] tabular-nums whitespace-nowrap">
                          {formatIDR(b.estimatedTotal)}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            aria-label={`Ubah status reservasi ${b.id}`}
                            value={b.status}
                            onChange={(e) =>
                              handleUpdateBookingStatus(b.id, e.target.value as BookingStatus)
                            }
                            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 bg-[#F8F9FA] text-[#212529]"
                          >
                            <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                            <option value="Jadwal Dikonfirmasi">Jadwal Dikonfirmasi</option>
                            <option value="Selesai Dipasang">Selesai Dipasang</option>
                          </select>
                        </td>

                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <a
                              href={`https://wa.me/${b.whatsappNumber.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Hubungi WA</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteBooking(b.id)}
                              aria-label={`Hapus reservasi ${b.id}`}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-[#E03A3E] cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* =================================================================
              TAB 4: PENGATURAN KONTEN & PROFIL BENGKEL BEKASI
             ================================================================= */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleSaveSettings}
                className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 p-6 space-y-5"
              >
                <div>
                  <h2 className="text-lg font-bold text-[#212529]">
                    Pengaturan Konten Website &amp; Kontak Bengkel
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Perubahan teks slogan, alamat, dan kontak WhatsApp akan langsung tampil di
                    halaman depan Scoopy Art.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#212529] mb-1">
                      Headline Utama (Hero Slogan)
                    </label>
                    <input
                      type="text"
                      value={cmsState.settings.heroHeadline}
                      onChange={(e) =>
                        setCmsState((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, heroHeadline: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#212529] mb-1">
                      Sub-slogan Hero
                    </label>
                    <textarea
                      rows={2}
                      value={cmsState.settings.heroSubheadline}
                      onChange={(e) =>
                        setCmsState((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, heroSubheadline: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#212529] mb-1">
                      Deskripsi Tentang Kami (Lokasi Bekasi)
                    </label>
                    <textarea
                      rows={3}
                      value={cmsState.settings.aboutDescription}
                      onChange={(e) =>
                        setCmsState((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, aboutDescription: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#212529] mb-1">
                      Alamat Lengkap Bengkel &amp; Showroom
                    </label>
                    <input
                      type="text"
                      value={cmsState.settings.address}
                      onChange={(e) =>
                        setCmsState((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, address: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#212529] mb-1">
                        Nomor WhatsApp Tampil
                      </label>
                      <input
                        type="text"
                        value={cmsState.settings.whatsappDisplay}
                        onChange={(e) =>
                          setCmsState((prev) => ({
                            ...prev,
                            settings: { ...prev.settings, whatsappDisplay: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2 text-sm font-mono bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#212529] mb-1">
                        Akun Instagram
                      </label>
                      <input
                        type="text"
                        value={cmsState.settings.instagramHandle}
                        onChange={(e) =>
                          setCmsState((prev) => ({
                            ...prev,
                            settings: { ...prev.settings, instagramHandle: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#212529] mb-1">
                        Jam Operasional
                      </label>
                      <input
                        type="text"
                        value={cmsState.settings.operatingHours}
                        onChange={(e) =>
                          setCmsState((prev) => ({
                            ...prev,
                            settings: { ...prev.settings, operatingHours: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#E03A3E] hover:bg-[#c83034] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Simpan Perubahan Konten
                  </button>
                </div>
              </form>

              {/* Right Column: Project Architecture & Backup */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#212529]">
                    Manajemen Database &amp; Backup
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Unduh seluruh data produk, kategori, dan antrean konsultasi dalam format JSON
                    atau kembalikan ke data standar pabrik.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#212529] hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Database CMS (.JSON)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetDatabase}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#F8F9FA] hover:bg-neutral-200 text-neutral-700 border border-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset ke Data Default</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-2">
                  <h3 className="text-sm font-bold text-[#212529]">
                    Informasi Pemisahan Project
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Project Admin CMS ini dipisahkan ke dalam modul mandiri{' '}
                    <code className="font-mono text-[11px] bg-[#F8F9FA] px-1.5 py-0.5 rounded">
                      /admin-cms-project
                    </code>{' '}
                    dan entry point mandiri{' '}
                    <code className="font-mono text-[11px] bg-[#F8F9FA] px-1.5 py-0.5 rounded">
                      /admin.html
                    </code>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =====================================================================
          MODAL TAMBAH / EDIT PRODUK SPAREPART
         ===================================================================== */}
      {isProductModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cms-product-modal-title"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative my-8">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              aria-label="Tutup modal produk"
              className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#F8F9FA] hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 id="cms-product-modal-title" className="text-xl font-bold text-[#212529]">
              {editingProductId ? 'Edit Produk Sparepart' : 'Tambah Produk Sparepart Baru'}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Lengkapi informasi produk untuk ditampilkan secara otomatis di katalog Scoopy Art.
            </p>

            <form onSubmit={handleSaveProduct} noValidate className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="cms-prod-name"
                  className="block text-xs font-semibold text-[#212529] mb-1"
                >
                  Nama Produk Sparepart
                </label>
                <input
                  id="cms-prod-name"
                  type="text"
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Contoh: Shockbreaker RCB Flow Pro Matic Single"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                />
                {productErrors.name && (
                  <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                    {productErrors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label
                    htmlFor="cms-prod-cat"
                    className="block text-xs font-semibold text-[#212529] mb-1"
                  >
                    Kategori
                  </label>
                  <select
                    id="cms-prod-cat"
                    value={productForm.categoryId}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        categoryId: e.target.value as CategoryId,
                      }))
                    }
                    className="w-full px-3 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                  >
                    {cmsState.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cms-prod-brand"
                    className="block text-xs font-semibold text-[#212529] mb-1"
                  >
                    Brand
                  </label>
                  <select
                    id="cms-prod-brand"
                    value={productForm.brand}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        brand: e.target.value as BrandId,
                      }))
                    }
                    className="w-full px-3 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                  >
                    {(['RCB', 'KTC', 'KTM', 'X1R', 'MUPO', 'SOLFILI'] as const).map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cms-prod-price"
                    className="block text-xs font-semibold text-[#212529] mb-1"
                  >
                    Harga (Rp)
                  </label>
                  <input
                    id="cms-prod-price"
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 text-sm font-mono bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                  />
                  {productErrors.price && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                      {productErrors.price}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="cms-prod-dim"
                    className="block text-xs font-semibold text-[#212529] mb-1"
                  >
                    Ukuran / Dimensi
                  </label>
                  <input
                    id="cms-prod-dim"
                    type="text"
                    value={productForm.weightOrDimension}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        weightOrDimension: e.target.value,
                      }))
                    }
                    placeholder="Contoh: 305mm / 330mm atau Ring 12"
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                  />
                  {productErrors.weightOrDimension && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                      {productErrors.weightOrDimension}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cms-prod-compat"
                    className="block text-xs font-semibold text-[#212529] mb-1"
                  >
                    Tipe Motor (Pisahkan dengan koma)
                  </label>
                  <input
                    id="cms-prod-compat"
                    type="text"
                    value={productForm.compatibilityText}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        compatibilityText: e.target.value,
                      }))
                    }
                    placeholder="Honda Scoopy, Honda Beat, Honda Vario 125/150"
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                  />
                  {productErrors.compatibilityText && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                      {productErrors.compatibilityText}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-prod-spec"
                  className="block text-xs font-semibold text-[#212529] mb-1"
                >
                  Ringkasan Spesifikasi Produk
                </label>
                <input
                  id="cms-prod-spec"
                  type="text"
                  value={productForm.specSummary}
                  onChange={(e) =>
                    setProductForm((prev) => ({ ...prev, specSummary: e.target.value }))
                  }
                  placeholder="Contoh: Full CNC Aluminium Billet · Plug & Play Mounting"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                />
                {productErrors.specSummary && (
                  <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                    {productErrors.specSummary}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cms-prod-img"
                  className="block text-xs font-semibold text-[#212529] mb-1"
                >
                  Gambar Produk (Pilih Foto Scoopy Art atau Masukkan URL)
                </label>
                <select
                  id="cms-prod-img-preset"
                  value={
                    UPLOADED_PHOTO_PRESETS.some((p) => p.url === productForm.imageUrl)
                      ? productForm.imageUrl
                      : 'custom'
                  }
                  onChange={(e) => {
                    if (e.target.value !== 'custom') {
                      setProductForm((prev) => ({ ...prev, imageUrl: e.target.value }));
                    }
                  }}
                  className="w-full px-3 py-2 text-xs font-semibold bg-[#F8F9FA] border border-neutral-200 rounded-lg mb-2"
                >
                  {UPLOADED_PHOTO_PRESETS.map((preset) => (
                    <option key={preset.label} value={preset.url}>
                      {preset.label}
                    </option>
                  ))}
                  <option value="custom">URL Gambar Kustom...</option>
                </select>

                <input
                  id="cms-prod-img"
                  type="text"
                  value={productForm.imageUrl || ''}
                  onChange={(e) =>
                    setProductForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                  }
                  placeholder="/assets/aistudio/IMG_0676_bfda774e.PNG"
                  className="w-full px-3.5 py-2 text-xs font-mono bg-[#F8F9FA] border border-neutral-200 rounded-lg"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#212529] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) =>
                      setProductForm((prev) => ({ ...prev, inStock: e.target.checked }))
                    }
                    className="rounded accent-[#E03A3E]"
                  />
                  <span>Tersedia (Ready Stock)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#212529] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) =>
                      setProductForm((prev) => ({ ...prev, isFeatured: e.target.checked }))
                    }
                    className="rounded accent-[#E03A3E]"
                  />
                  <span>Tampilkan di Produk Unggulan Beranda</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#E03A3E] hover:bg-[#c83034] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProductId ? 'Simpan Perubahan' : 'Simpan Produk Baru'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
