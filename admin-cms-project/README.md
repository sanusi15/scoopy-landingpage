# Scoopy Art — Admin CMS Project (`scoopy-art-admin-cms`)

Project Admin Content Management System (CMS) ini dipisahkan secara arsitektural dari project Landing Page / Storefront pelanggan (`scoopy-art-storefront`).

## Struktur Pemisahan Project
1. **`/admin-cms-project/`**: Konfigurasi project mandiri (`package.json`, `vite.config.ts`, `index.html`) untuk dideploy secara terpisah (mis. di subdomain `cms.scoopyart.id` atau port `3001`).
2. **`/admin.html` & `/src/admin-main.tsx`**: Entry point mandiri untuk mengakses aplikasi Admin CMS secara langsung pada `/admin.html` atau `?project=admin`.
3. **`/src/admin-cms/AdminCmsApp.tsx`**: Modul aplikasi utama Admin CMS yang mencakup:
   - **Manajemen Produk & Katalog (`CRUD`)**: Tambah produk baru, edit spesifikasi/harga, pilih foto produk asli Scoopy Art, ubah status stok (`Ready` / `Habis`), dan hapus produk.
   - **Manajemen Kategori Sparepart**: Ubah sub-judul, harga mulai (`Mulai Rp ...`), dan deskripsi teknis 5 kategori utama.
   - **Tiket Konsultasi & Booking WA**: Pantau reservasi pemasangan pelanggan dari halaman depan, ubah status pengerjaan (`Menunggu Konfirmasi`, `Jadwal Dikonfirmasi`, `Selesai Dipasang`), dan balas via WhatsApp.
   - **Pengaturan Konten & Ekspor Database**: Edit teks Hero, Tentang Kami, Alamat Bekasi, Nomor WhatsApp, Jam Operasional, serta ekspor backup database dalam format `.json`.
