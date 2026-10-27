import React, { useState } from 'react';
import {
  ConsultationFormInput,
  SparepartItem,
  PRODUCT_CATEGORIES,
  formatIDR,
  validateConsultationForm,
  buildWhatsAppUrl,
} from '../utils/catalogLogic';
import { MapPin, Phone, Instagram, Clock, Send, CheckCircle2, Trash2 } from 'lucide-react';

interface LocationContactSectionProps {
  selectedItems: SparepartItem[];
  preselectedCategory: string;
  onRemoveSelectedItem: (id: string) => void;
}

export const LocationContactSection: React.FC<LocationContactSectionProps> = ({
  selectedItems,
  preselectedCategory,
  onRemoveSelectedItem,
}) => {
  const [formData, setFormData] = useState<ConsultationFormInput>({
    customerName: '',
    whatsappNumber: '',
    motorModel: '',
    selectedCategory: preselectedCategory || 'Velg',
    notes: '',
  });

  // Sync preselectedCategory when user clicks "Tanya Stok" on a category card
  React.useEffect(() => {
    if (preselectedCategory) {
      setFormData((prev) => ({ ...prev, selectedCategory: preselectedCategory }));
    }
  }, [preselectedCategory]);

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormInput, string>>>({});
  const [submittedPreviewUrl, setSubmittedPreviewUrl] = useState<string | null>(null);

  const totalEstimate = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateConsultationForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmittedPreviewUrl(null);
      return;
    }
    setErrors({});
    const waUrl = buildWhatsAppUrl(formData, selectedItems);
    setSubmittedPreviewUrl(waUrl);
  };

  return (
    <section
      id="lokasi"
      className="py-20 lg:py-28 bg-[#F8F9FA] border-t border-neutral-200/80"
      aria-labelledby="heading-tentang-lokasi"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main 2-Column Split: About + Contact Details on Left, Embedded Map + Consultation Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: About & Contact Info */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#E03A3E] mb-2">
                Tentang Kami &amp; Lokasi Workshop
              </p>
              <h2
                id="heading-tentang-lokasi"
                className="text-2xl sm:text-4xl font-bold tracking-tight text-[#212529] balance"
              >
                Bengkel &amp; Sparepart Terpercaya di Bekasi
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Scoopy Art hadir di Bekasi, Jawa Barat, untuk memenuhi kebutuhan para pecinta
                motor yang menginginkan sparepart berkualitas tinggi. Kami tidak hanya menjual
                alat motor, tapi juga memberikan solusi estetika dan performa terbaik untuk
                motor kesayangan Anda.
              </p>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 space-y-5">
              <h3 className="text-base font-bold text-[#212529] border-b border-neutral-100 pb-3">
                Informasi Kontak &amp; Jam Operasional
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#E03A3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#212529]">Alamat Bengkel &amp; Showroom</p>
                    <p className="text-neutral-600 mt-0.5">
                      Jl. Raya Kalimalang No. 88, Jakasampurna, Kec. Bekasi Barat, Kota Bekasi,
                      Jawa Barat 17145
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#E03A3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#212529]">WhatsApp Konsultasi &amp; Booking</p>
                    <p className="text-neutral-600 mt-0.5 font-mono">
                      0812-8899-7744 (08xx-xxxx-xxxx)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Instagram className="w-5 h-5 text-[#E03A3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#212529]">Instagram Resmi</p>
                    <p className="text-neutral-600 mt-0.5">@scoopyart_bekasi</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#E03A3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#212529]">Jam Buka Workshop</p>
                    <p className="text-neutral-600 mt-0.5">
                      Senin – Minggu · 09.00 – 20.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Bekasi */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#212529]">
                  Peta Lokasi — Bekasi, Jawa Barat
                </span>
                <a
                  href="https://maps.google.com/?q=Bekasi,Jawa+Barat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#E03A3E] hover:underline whitespace-nowrap shrink-0"
                >
                  Buka di Google Maps
                </a>
              </div>
              <div className="w-full h-64 bg-neutral-100 relative">
                <iframe
                  title="Peta Lokasi Scoopy Art Bekasi, Jawa Barat"
                  src="https://www.google.com/maps?q=Bekasi,+Jawa+Barat&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Booking Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-[0_12px_32px_rgba(33,37,41,0.04)]">
              <h3 className="text-xl font-bold text-[#212529]">
                Konsultasi &amp; Reservasi Pemasangan
              </h3>
              <p className="mt-1.5 text-sm text-neutral-600">
                Isi data singkat motor Anda untuk cek kecocokan sparepart, estimasi biaya, atau
                jadwal pasang tanpa antre di bengkel Bekasi.
              </p>

              {/* Selected Spareparts Summary if any */}
              {selectedItems.length > 0 && (
                <div className="mt-5 p-4 rounded-xl bg-[#F8F9FA] border border-neutral-200/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#212529] mb-2.5">
                    <span>Sparepart Pilihan Anda ({selectedItems.length} item)</span>
                    <span className="font-mono tabular-nums text-[#E03A3E]">
                      Total: {formatIDR(totalEstimate)}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {selectedItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between text-xs text-neutral-700 bg-white px-3 py-2 rounded-lg border border-neutral-200/60"
                      >
                        <span className="font-medium truncate pr-2">{item.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono tabular-nums">{formatIDR(item.price)}</span>
                          <button
                            type="button"
                            onClick={() => onRemoveSelectedItem(item.id)}
                            aria-label={`Hapus ${item.name}`}
                            className="text-neutral-400 hover:text-[#E03A3E] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-xs font-semibold text-[#212529] mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, customerName: e.target.value }))
                    }
                    placeholder="Contoh: Rizky Pratama"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
                  />
                  {errors.customerName && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="whatsappNumber"
                      className="block text-xs font-semibold text-[#212529] mb-1.5"
                    >
                      Nomor WhatsApp Aktif
                    </label>
                    <input
                      id="whatsappNumber"
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, whatsappNumber: e.target.value }))
                      }
                      placeholder="0812-8899-7744"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
                    />
                    {errors.whatsappNumber && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                        {errors.whatsappNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="motorModel"
                      className="block text-xs font-semibold text-[#212529] mb-1.5"
                    >
                      Tipe &amp; Tahun Motor
                    </label>
                    <input
                      id="motorModel"
                      type="text"
                      value={formData.motorModel}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, motorModel: e.target.value }))
                      }
                      placeholder="Contoh: Honda Scoopy 2024"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
                    />
                    {errors.motorModel && (
                      <p role="alert" className="mt-1 text-xs font-medium text-[#E03A3E]">
                        {errors.motorModel}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="selectedCategory"
                    className="block text-xs font-semibold text-[#212529] mb-1.5"
                  >
                    Kategori Sparepart Utama
                  </label>
                  <select
                    id="selectedCategory"
                    value={formData.selectedCategory}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, selectedCategory: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.title}>
                        {cat.title} — {cat.subtitle}
                      </option>
                    ))}
                    <option value="Paket Full Upgrade">Paket Full Upgrade Performa &amp; Estetika</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-xs font-semibold text-[#212529] mb-1.5"
                  >
                    Catatan / Pertanyaan Tambahan (Opsional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder="Tuliskan warna part yang diinginkan atau jadwal rencana datang ke bengkel..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F9FA] border border-neutral-200 rounded-lg text-[#212529] focus:bg-white focus:outline-none focus:border-[#E03A3E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-[#E03A3E] hover:bg-[#c83034] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Buat Tiket Konsultasi WhatsApp</span>
                </button>
              </form>

              {submittedPreviewUrl && (
                <div
                  role="status"
                  className="mt-5 p-4 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Ringkasan Konsultasi Siap Dikirim!</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Halo <strong>{formData.customerName}</strong>, detail konsultasi untuk{' '}
                    <strong>{formData.motorModel}</strong> ({formData.selectedCategory}) telah
                    disiapkan untuk Admin Scoopy Art Bekasi.
                  </p>
                  <a
                    href={submittedPreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    Lanjutkan Chat ke WhatsApp Sekarang
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
