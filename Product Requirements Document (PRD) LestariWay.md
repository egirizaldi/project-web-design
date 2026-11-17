# Product Requirements Document (PRD): LestariWay

**Versi:** 1.2 (Revisi Pasca-Review: Konsistensi Data, Mobile-First, Eco-Mode Jujur) **Tagline:** Jelajahi Alam, Tinggalkan Jejak Kebaikan. **Peran Penyusun:** Lead UI/UX & Web Designer **Status:** Siap Wireframing & Prototyping

> **Catatan penting:** Seluruh harga, skor, jarak, dan angka dampak dalam dokumen ini adalah **data ilustrasi untuk prototipe**. Setiap tampilan angka di website wajib memakai label "Data ilustrasi prototipe" (lihat bagian 13).

## 0. Ringkasan Perubahan dari v1.1

| # | Temuan Review | Perbaikan di v1.2 |
| :-- | :-- | :-- |
| 1 | F-06 berstatus P1 padahal F-05 (P0) bergantung padanya | F-06 dipecah: Booking Drawer dasar jadi **P0**, E-Pass & Checklist tetap P1 |
| 2 | Skor & emisi studi kasus tidak bisa ditelusuri ke rumus | Bagian 6: tabel sub-skor, jarak, dan emisi per moda yang bisa dihitung ulang |
| 3 | Emisi statis vs preset dinamis | Kota asal default = Jakarta; kartu katalog menampilkan **rentang** emisi (terendah-tertinggi) |
| 4 | Klaim filter CSS menghemat data | Bagian 7: mekanisme memakai varian resolusi rendah dari satu sumber; filter hanya visual |
| 5 | Kontras warna belum terverifikasi | Bagian 8A: CTA terracotta dipekatkan, border input dan palet Eco-Mode dilengkapi |
| 6 | State komponen kurang | Bagian 8D: katalog lengkap state (loading, error, kuota penuh, 404, dll.) |
| 7 | Eco-Mode kurang detail | Bagian 7: persistensi, toast berbasis data terukur, reduced motion |
| 8 | Tidak ada user flow | Bagian 3: flow utama, flow alternatif, spesifikasi navigasi |
| 9 | Mobile-first tidak ada | Bagian 8C: breakpoint dan perilaku komponen per perangkat |
| 10-14 | Metrik, konten, aset, legal, teknis | Bagian 9-13 |

## 1. Ringkasan Eksekutif

### Masalah

1. **Greenwashing:** destinasi mengaku "ramah lingkungan" tanpa standar jelas.
2. **Ketimpangan ekonomi lokal:** keuntungan wisata mengalir ke pihak luar, bukan komunitas penjaga alam.
3. **Minim kesadaran jejak karbon:** wisatawan tidak tahu emisi perjalanannya dan tidak punya cara mudah mengimbanginya.

### Solusi

**LestariWay** adalah platform kurasi dan pemesanan ekowisata berbasis web dengan tiga pilar: **transparansi dampak, pemberdayaan warga lokal, dan edukasi perjalanan bertanggung jawab**. Platformnya sendiri dirancang dengan prinsip *Low-Carbon Web Design*.

### Prinsip Desain

1. **Jujur di atas menarik:** tidak ada angka dekoratif. Setiap angka punya rumus atau berlabel asumsi.
2. **Mobile-first:** mayoritas pengguna mengakses lewat ponsel.
3. **Ringan secara default:** tidak ada aset yang tidak berfungsi.

## 2. Target Pengguna

### Persona Produk: *The Conscious Explorer* (22-40 tahun)

- **Karakteristik:** pelancong muda, pekerja kreatif, profesional urban, melek teknologi, peduli lingkungan.
- **Kebutuhan:** liburan alam autentik tanpa merusak ekosistem; jaminan bahwa uangnya sampai ke warga lokal; antarmuka bersih, cepat, informatif.
- **Perangkat dominan:** ponsel (asumsi 70%+), koneksi 4G tidak stabil di area tujuan.

### Pemangku Evaluasi Kompetisi (bukan persona produk)

Dewan juri menilai: kesesuaian tema, *visual storytelling*, usability, inovasi interaktif, validitas logika produk, efisiensi teknis. Kriteria ini dipetakan ke metrik di bagian 12.

## 3. Sitemap, User Flow & Navigasi

### A. Sitemap

5 halaman + 1 komponen overlay:

| Rute | Halaman | Isi Utama |
| :-- | :-- | :-- |
| `/` | Beranda | Hero, Smart Eco-Search, Live Impact Metrics (data simulasi), Bento Grid pilar, destinasi unggulan, Mini Carbon Estimator |
| `/explore` | Eksplorasi | Katalog 4 destinasi, filter, sortir, empty state |
| `/destination/:slug` | Detail | Galeri, Eco-Score + rincian sub-skor, Price & Impact Breakdown, Storyteller, Leave No Trace, CTA pesan |
| Booking Drawer | Checkout (overlay) | Data peserta, moda transportasi, offset karbon, simulasi bayar, E-Pass |
| `/journal` | Jurnal | 3 artikel awal, kategori, halaman artikel |
| `/impact` | Laporan Dampak | Dasbor data simulasi, tabel desa mitra, metodologi |

Slug valid: `nglanggeran`, `menjangan`, `wae-rebo`, `baluran`.

### B. Flow Utama (Happy Path): "Temukan dan pesan"

| Langkah | Layar | Aksi Pengguna | Respons Sistem | Jalur Keluar |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Beranda | Memilih kategori di Smart Eco-Search | Pindah ke `/explore` dengan filter terisi | Logo kembali ke beranda |
| 2 | Eksplorasi | Menyesuaikan Eco-Score minimal, melihat kartu | Hasil terfilter real-time, jumlah hasil diperbarui | Tombol Reset Filter |
| 3 | Eksplorasi | Mengetuk kartu destinasi | Menuju `/destination/:slug` | Tombol Kembali ke hasil (filter dipertahankan) |
| 4 | Detail | Membaca breakdown harga, sub-skor, storyteller | Donat interaktif menampilkan persen per alokasi saat disentuh | Breadcrumb ke Eksplorasi |
| 5 | Detail | Menekan "Pesan Perjalanan" | Booking Drawer terbuka (fokus terkunci di drawer) | Tombol Tutup, tombol Esc, ketuk area luar |
| 6 | Drawer langkah 1 | Mengisi nama, email, jumlah peserta, tanggal | Validasi inline saat blur dan saat submit | Batal, data tersimpan sementara selama drawer belum ditutup |
| 7 | Drawer langkah 2 | Memilih moda transportasi, melihat emisi | Emisi dan biaya offset dihitung langsung | Kembali ke langkah 1 |
| 8 | Drawer langkah 3 | Ringkasan harga dan konfirmasi (simulasi bayar) | State loading 1-2 detik lalu sukses | Kembali ke langkah 2 |
| 9 | Drawer langkah 4 | Melihat Paperless E-Pass + Leave No Trace Checklist | Opsi simpan sebagai gambar, salin kode booking | Selesai, kembali ke Beranda |

### C. Flow Alternatif

| Skenario | Perilaku |
| :-- | :-- |
| Filter tanpa hasil | Empty state dengan ilustrasi kompas dan tombol Reset Semua Filter |
| Kuota penuh pada tanggal dipilih | Tanggal ditandai penuh, tombol pesan nonaktif, tawarkan tanggal terdekat yang tersedia |
| Moda tidak tersedia (misal kereta ke Wae Rebo) | Opsi tampil nonaktif dengan penjelasan singkat |
| Simulasi pembayaran gagal | Pesan error ramah, data form tetap, tombol Coba Lagi |
| Slug tidak valid | Halaman 404 dengan tautan ke 4 destinasi |
| Jaringan lambat | Skeleton card, bukan spinner kosong |

### D. Spesifikasi Navigasi

**Header (desktop):** Logo | Jelajahi | Jurnal | Dampak Kami | \[Toggle Eco-Mode\] | tombol "Cari Destinasi". **Header (mobile):** Logo | \[Toggle Eco-Mode\] | ikon menu. Toggle Eco-Mode **tetap terlihat di bar atas**, tidak disembunyikan di dalam menu. Menu membuka *full-screen sheet* berisi 3 tautan dan tombol cari. **Footer:** Tentang LestariWay, Metodologi Eco-Score, Sumber Data & Asumsi, Kontak, catatan "Dibangun dengan prinsip Low-Carbon Web Design" beserta berat halaman terukur.

## 4. Spesifikasi Fitur

P0 = wajib matang di prototipe. P1 = nilai tambah jika waktu tersedia.

| ID | Fitur | Deskripsi | Prioritas |
| :-- | :-- | :-- | :-- |
| F-01 | Smart Eco-Search & Filter | Filter kategori (Desa Adat, Konservasi Laut, Hutan Pegunungan, Pesisir), Eco-Score minimal, dan sortir (Eco-Score, harga, emisi). Real-time | P0 |
| F-02 | Eco-Score & Verification Badges | Skor 1-100 di kartu, lencana terukur, dan rincian 4 sub-skor di halaman detail | P0 |
| F-03 | Interactive Price & Impact Breakdown | Donat interaktif 60/20/15/5 dengan nominal rupiah per bagian sesuai harga paket | P0 |
| F-04 | Eco-Mode Toggle | Tema gelap OLED, mode animasi minimal, gambar resolusi rendah (bagian 7) | P0 |
| F-05 | Carbon Footprint Preset & Offset | Pilih moda, lihat emisi dari rumus, centang offset bibit mangrove | P0 |
| F-06a | Booking Drawer Dasar | Form peserta, validasi inline, ringkasan harga + offset, simulasi bayar | **P0** |
| F-06b | Paperless E-Pass & Leave No Trace Checklist | Tiket digital dengan kode booking dan checklist per destinasi | P1 |
| F-07 | Local Storyteller Spotlight | Kartu profil (karakter fiktif/komposit, lihat bagian 9) | P1 |
| F-08 | Impact Dashboard | Dasbor `/impact` dengan data simulasi dan label metodologi | P1 |
| F-09 | Journal | 3 artikel dengan halaman baca ringan | P1 |
| F-10 | Ubah Kota Asal | Pilihan Jakarta, Surabaya, Yogyakarta untuk menghitung ulang emisi | P1 |

## 5. Metodologi & Transparansi (Anti-Greenwashing)

### A. Rumus Eco-Score (0-100)

Eco-Score = (0,30 x S\_limbah) + (0,30 x S\_lokal) + (0,20 x S\_konservasi) + (0,20 x S\_energi)

- **S\_limbah (30%):** manajemen sampah mandiri, larangan plastik sekali pakai.
- **S\_lokal (30%):** kepemilikan usaha dan penyerapan tenaga kerja warga setempat.
- **S\_konservasi (20%):** kontribusi langsung ke flora, fauna, terumbu karang.
- **S\_energi (20%):** efisiensi air bersih dan energi terbarukan.

**Pernyataan penting:** pada prototipe, sub-skor adalah **penilaian ilustrasi**. Untuk produk nyata, skor harus diaudit pihak independen (misalnya lembaga sertifikasi ekowisata atau akademisi) dan hasil auditnya dipublikasikan. Halaman Metodologi wajib menyatakan ini secara terbuka.

### B. Rumus Emisi Perjalanan

Emisi (kg CO2e) = Jarak pulang-pergi (km) x Faktor emisi moda

| Moda | Faktor (kg CO2e/km per penumpang) |
| :-- | :-- |
| Kereta Api | 0,041 |
| Bus / Travel bersama | 0,089 |
| Pesawat Domestik | 0,255 |

**Sumber yang harus dirujuk di footer metodologi:** faktor emisi dari rilis pemerintah Indonesia (KLHK/Kementerian ESDM) atau standar internasional (DEFRA, ICAO Carbon Calculator). Nilai di atas adalah asumsi prototipe, bukan angka resmi.

### C. Kompensasi Karbon

- 1 bibit mangrove = Rp 15.000, diasumsikan menyerap rata-rata **22 kg CO2e selama masa tumbuhnya** (asumsi prototipe; penyerapan nyata sangat bervariasi dan bibit muda menyerap jauh lebih sedikit daripada pohon dewasa).
- Jumlah bibit = pembulatan ke atas (emisi / 22).
- **Pesan edukatif wajib di UI:** "Kompensasi melengkapi, bukan menggantikan, upaya mengurangi emisi. Pilih moda yang lebih rendah emisi jika memungkinkan."

## 6. Data Destinasi (Siap Pakai untuk Prototipe)

Kota asal default: **Jakarta**. Seluruh jarak adalah estimasi pembulatan untuk prototipe.

### A. Profil & Harga

| Slug | Destinasi | Lokasi | Kategori | Durasi | Harga/orang | Kuota harian |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| nglanggeran | Desa Wisata Nglanggeran | Gunungkidul, DI Yogyakarta | Desa Adat & Geopark | 2H1M | Rp 650.000 | 60 |
| menjangan | Konservasi Terumbu Karang Pulau Menjangan | Buleleng, Bali | Konservasi Laut | 3H2M | Rp 1.450.000 | 40 |
| wae-rebo | Ekowisata Kampung Adat Wae Rebo | Manggarai, NTT | Budaya & Hutan Pegunungan | 4H3M | Rp 2.850.000 | 20 |
| baluran | Restorasi Mangrove & Savana Baluran | Situbondo, Jawa Timur | Konservasi Pesisir & Satwa | 2H1M | Rp 890.000 | 30 |

Harga belum termasuk transportasi menuju destinasi dari kota asal.

### B. Sub-Skor Eco-Score (penilaian ilustrasi)

| Destinasi | S\_limbah | S\_lokal | S\_konservasi | S\_energi | **Eco-Score** |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Nglanggeran | 92 | 98 | 92 | 92 | **94** (93,8) |
| Menjangan | 95 | 86 | 96 | 88 | **91** (91,1) |
| Wae Rebo | 95 | 100 | 95 | 93 | **96** (96,1) |
| Baluran | 85 | 90 | 92 | 84 | **88** (87,7) |

Contoh hitung Nglanggeran: (0,30 x 92) + (0,30 x 98) + (0,20 x 92) + (0,20 x 92) = 27,6 + 29,4 + 18,4 + 18,4 = 93,8, dibulatkan 94.

### C. Lencana Verifikasi per Destinasi

| Destinasi | Lencana |
| :-- | :-- |
| Nglanggeran | 100% Dikelola Warga Lokal, Panen Air Hujan (Embung) |
| Menjangan | Nol Plastik Sekali Pakai, Adopsi Terumbu Karang |
| Wae Rebo | Kuota Harian Terbatas, 100% Dikelola Warga Lokal |
| Baluran | Tanpa Kendaraan Bermotor Berisik, Penanaman Bakau |

### D. Emisi Perjalanan Pulang-Pergi dari Jakarta (kg CO2e per orang)

Jarak darat/udara utama + transportasi lokal di lokasi (dihitung dengan faktor bus). "N/A" berarti moda tidak realistis dan tampil nonaktif.

| Destinasi | Kereta | Bus/Travel | Pesawat | Rentang di kartu |
| :-- | :-- | :-- | :-- | :-- |
| Nglanggeran | 50 | 100 | 226 | 50-226 |
| Menjangan | N/A | 219 | 615 | 219-615 |
| Wae Rebo | N/A | N/A | 933 | 933 |
| Baluran | 78 | 174 | 372 | 78-372 |

**Dasar perhitungan:**

| Destinasi | Kereta | Bus/Travel | Pesawat |
| :-- | :-- | :-- | :-- |
| Nglanggeran | 1.040 km x 0,041 + 80 km lokal x 0,089 = 49,8 | 1.120 km x 0,089 = 99,7 | 860 km x 0,255 + 80 km x 0,089 = 226,4 |
| Menjangan | N/A | 2.460 km x 0,089 = 218,9 | 2.320 km x 0,255 + 260 km x 0,089 = 614,7 |
| Wae Rebo | N/A | N/A | 3.520 km x 0,255 + 400 km x 0,089 = 933,2 |
| Baluran | 1.780 km x 0,041 + 60 km x 0,089 = 78,3 | 1.960 km x 0,089 = 174,4 | 1.320 km x 0,255 + 400 km x 0,089 = 372,2 |

**Catatan perubahan:** angka emisi v1.1 (14, 38, 112, 26 kg) tidak bisa direproduksi dari rumus dan diganti dengan angka di atas. Hasilnya menunjukkan fakta jujur: destinasi jauh (Wae Rebo) berdampak karbon tinggi, sehingga dikompensasi dengan kuota ketat dan narasi "tinggal lebih lama, datang lebih jarang".

### E. Kebutuhan Bibit Offset (Rp 15.000/bibit, 22 kg/bibit)

| Destinasi | Moda | Emisi | Bibit | Biaya |
| :-- | :-- | :-- | :-- | :-- |
| Nglanggeran | Kereta | 50 | 3 | Rp 45.000 |
| Nglanggeran | Bus | 100 | 5 | Rp 75.000 |
| Nglanggeran | Pesawat | 226 | 11 | Rp 165.000 |
| Menjangan | Bus | 219 | 10 | Rp 150.000 |
| Menjangan | Pesawat | 615 | 28 | Rp 420.000 |
| Wae Rebo | Pesawat | 933 | 43 | Rp 645.000 |
| Baluran | Kereta | 78 | 4 | Rp 60.000 |
| Baluran | Bus | 174 | 8 | Rp 120.000 |
| Baluran | Pesawat | 372 | 17 | Rp 255.000 |

### F. Rincian Alokasi Harga (60/20/15/5)

| Destinasi | Harga | Warga Lokal (60%) | Konservasi (20%) | Operasional (15%) | Platform (5%) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Nglanggeran | Rp 650.000 | Rp 390.000 | Rp 130.000 | Rp 97.500 | Rp 32.500 |
| Menjangan | Rp 1.450.000 | Rp 870.000 | Rp 290.000 | Rp 217.500 | Rp 72.500 |
| Wae Rebo | Rp 2.850.000 | Rp 1.710.000 | Rp 570.000 | Rp 427.500 | Rp 142.500 |
| Baluran | Rp 890.000 | Rp 534.000 | Rp 178.000 | Rp 133.500 | Rp 44.500 |

## 7. Spesifikasi Eco-Mode (Revisi)

### A. Perubahan Visual

- Tema gelap OLED dengan palet bagian 8A.
- Mode animasi minimal: matikan parallax, autoplay, transisi besar, dan efek hover berat. Transisi fungsional (drawer, toast) dipertahankan dengan durasi di bawah 150 ms.
- Efek gradien dan bayangan berat diganti warna solid.

### B. Mekanisme Penghematan Data yang Jujur

1. Setiap foto disediakan dalam dua varian dari **satu file sumber** melalui proses build atau image CDN: standar (misal lebar 1200 px, kualitas 75) dan hemat (lebar 480 px, kualitas 40), keduanya WebP/AVIF.
2. Saat Eco-Mode aktif, atribut `srcset` dialihkan ke varian hemat. Filter CSS `grayscale(100%) contrast(115%)` hanya dipakai agar tampilan foto konsisten dengan tema, **bukan sebagai penghemat data**.
3. Ini berarti ada dua ukuran per gambar. Klaim "tanpa aset ganda" dari v1.1 **dihapus**; klaim yang benar: "tanpa duplikasi file sumber".

### C. Toast Umpan Balik

- Isi toast dihitung dari data terukur: selisih `transferSize` (Performance API) sebelum dan sesudah, atau selisih ukuran yang diketahui dari manifest gambar halaman.
- Contoh: "Eco-Mode aktif. Perkiraan hemat data halaman ini: 1,1 MB."
- Pada prototipe tanpa pengukuran nyata, tampilkan "Perkiraan" beserta label asumsi. **Dilarang menampilkan persentase tetap yang tidak dihitung.**
- Penghematan daya layar disebut kualitatif saja ("membantu pada layar OLED"), tanpa angka.

### D. Persistensi & Preferensi Sistem

- Default **mati**. Jika browser mengirim `prefers-reduced-data` atau `Save-Data`, tampilkan saran halus (banner kecil sekali tampil) untuk mengaktifkan.
- `prefers-reduced-motion` selalu dihormati terlepas dari status Eco-Mode.
- Produksi: simpan di `localStorage`. Prototipe di lingkungan yang membatasi storage: simpan di state memori selama sesi.

## 8. Kebutuhan Desain UI/UX

### A. Palet Warna (kontras diperiksa)

**Standard Mode**

| Peran | Hex | Catatan Kontras |
| :-- | :-- | :-- |
| Background | #F8F5F0 | - |
| Surface/Card | #EFECE6 | - |
| Border dekoratif | #DCD6CA | Hanya hiasan, bukan batas komponen |
| **Border input/komponen** | **#8A8478** | Sekitar 3,4:1 terhadap background (lolos 3:1 WCAG 1.4.11) |
| Primary brand | #1B4332 | Teks di atas background: kontras tinggi (>10:1) |
| **CTA** | **#B8512B** dengan teks #FFFFFF | Sekitar 4,9:1 (lolos AA). Terracotta lama #D96B43 hanya sekitar 3,4:1 dengan teks putih sehingga **hanya boleh dipakai sebagai aksen dekoratif, bukan latar tombol bertekstual putih** |
| Teks utama | #1F2421 | Kontras tinggi |

**Eco-Mode**

| Peran | Hex |
| :-- | :-- |
| Background | #0D1310 |
| Surface | #16201A |
| Border komponen | #5F7A6B (sekitar 3,9:1 terhadap background) |
| Teks utama | #E6EDE8 |
| Aksen/tautan | #74C69D |
| CTA | latar #74C69D, teks #0D1310 |

Semua pasangan warna wajib diverifikasi ulang dengan alat pemeriksa kontras sebelum finalisasi.

### B. Tipografi & Grid

- **Heading:** Fraunces (serif editorial). **Body/UI:** Plus Jakarta Sans.
- Batasi pemuatan: 2 keluarga font, maksimal 3-4 bobot, subset Latin, `font-display: swap`. Anggaran font sekitar 100 KB.
- Skala tipografi: 12/14/16/20/24/32/48 px; body minimal 16 px di mobile.
- Grid 12 kolom desktop (maksimal 1280 px), spasi kelipatan 8 px, area sentuh minimal 44 x 44 px.

### C. Responsif (Mobile-First)

| Breakpoint | Lebar | Grid | Perilaku Kunci |
| :-- | :-- | :-- | :-- |
| Mobile | 360-767 px | 4 kolom, margin 16 px | Filter di *bottom sheet*; Drawer = *full-screen sheet* bertahap; kartu satu kolom; donat di atas legenda |
| Tablet | 768-1023 px | 8 kolom | Kartu dua kolom; Drawer = panel samping 480 px |
| Desktop | 1024 px ke atas | 12 kolom | Filter sidebar kiri sticky; Drawer *slide-over* kanan 520 px; kartu tiga kolom |

### D. Katalog State Komponen

| Komponen | State yang wajib dirancang |
| :-- | :-- |
| Tombol | default, hover, focus (cincin 2 px terlihat), pressed, disabled, loading |
| Filter chip | default, terpilih, hover, focus |
| Kartu destinasi | default, hover, skeleton loading, kuota penuh (badge) |
| Form field | default, focus, error inline, sukses, disabled |
| Pemilih moda | tersedia, terpilih, tidak tersedia (dengan alasan) |
| Pilihan tanggal | tersedia, terbatas (sisa kuota sedikit), penuh |
| Katalog | hasil, empty state, error muat dengan tombol coba lagi |
| Drawer | langkah 1-4, loading bayar, error bayar, sukses |
| Halaman | normal, 404/slug tidak valid, offline |
| Toast | sukses, informasi, error (otomatis hilang 5 detik, dapat dibaca *screen reader*) |

### E. Aksesibilitas

- Navigasi penuh lewat keyboard; fokus terkunci di dalam Drawer saat terbuka dan kembali ke pemicu saat ditutup.
- Donat interaktif wajib punya alternatif tabel teks.
- Informasi tidak hanya lewat warna (skor selalu disertai angka dan label).
- Teks alternatif untuk semua gambar bermakna.

## 9. Konten Halaman Pendukung

### A. Jurnal (F-09): 3 artikel awal

1. "Panduan Kemas Nol Sampah untuk Perjalanan 3 Hari" (kategori: Zero-Waste Travel)
2. "Etika Berkunjung ke Kampung Adat: Yang Boleh dan Tidak" (kategori: Budaya Lokal)
3. "Mengapa Kuota Pengunjung Justru Menyelamatkan Destinasi" (kategori: Pelestarian Alam)

### B. Laporan Dampak (F-08): data simulasi

Tampilkan banner "Data simulasi untuk prototipe". Contoh metrik: pohon/bibit tertanam 12.480; sampah plastik tercegah 3,2 ton; dana tersalur ke desa mitra Rp 486 juta; 4 desa mitra. Setiap metrik menyertakan periode (misal "Jan-Okt 2026") dan satu baris cara menghitung.

### C. Live Impact Metrics di Beranda

Nama diganti **"Dampak Terkini"**. Angka berasal dari data simulasi yang sama dengan halaman Dampak, bukan data *real-time*, dan berlabel jelas.

### D. Local Storyteller (F-07)

Gunakan **karakter fiktif/komposit** yang dinyatakan eksplisit sebagai "ilustrasi berdasarkan peran nyata" agar tidak memakai nama atau foto orang tanpa izin. Contoh: "Pak Rudi, pemandu pendakian Gunung Api Purba (tokoh ilustrasi)". Ganti dengan tokoh nyata hanya jika ada persetujuan tertulis.

## 10. Aset Visual

- **Foto:** Unsplash/Pexels dengan lisensi bebas pakai; cantumkan kredit fotografer di footer. Pilih foto berwarna hangat, tanpa kerumunan, dengan komposisi lanskap.
- **Rasio:** hero 16:9, kartu 4:3, galeri detail 3:2, avatar storyteller 1:1.
- **Ilustrasi:** garis tunggal minimalis, warna dari palet (hijau forest dan terracotta), format SVG. Daftar ilustrasi: kompas (empty state), tanda 404, ikon pilar keberlanjutan, ikon moda transportasi.
- **Ikon:** Lucide Icons, stroke 1,5 px.
- **Placeholder:** blur-hash atau warna dominan untuk mencegah layout shift.

## 11. Kebutuhan Teknis & Performa

- **Tech stack prototipe:** HTML/CSS/JavaScript statis atau React dengan build statis. Hindari library berat; grafik donat dengan SVG murni.
- **Page weight:** halaman awal di bawah 1 MB (anggaran: HTML/CSS/JS 200 KB, font 100 KB, gambar 600 KB, sisanya cadangan).
- **Aset:** WebP/AVIF, `loading="lazy"` kecuali gambar LCP, ikon SVG.
- **Core Web Vitals:** LCP < 2,0 detik, CLS mendekati 0 (semua gambar punya dimensi), INP < 200 ms.
- **Pengukuran:** Lighthouse mobile (throttling 4G), WebPageTest, DevTools Network untuk transfer size.
- Rumus pada dokumen ini ditulis dalam teks biasa agar tampil di semua editor.

## 12. Metrik Keberhasilan

| # | Metrik | Target | Cara Ukur |
| :-- | :-- | :-- | :-- |
| 1 | Time-to-Discovery | Minimal 4 dari 5 penguji menemukan destinasi sesuai kategori dan menyebutkan Eco-Score dalam kurang dari 30 detik | Tes moderasi, 5 partisipan, *stopwatch* |
| 2 | Transparansi sekali lihat | Minimal 4 dari 5 penguji menyebutkan persen dana ke warga lokal dalam kurang dari 15 detik di halaman detail | Tes moderasi |
| 3 | Efisiensi Eco-Mode | Penurunan transfer data gambar minimal 50% pada halaman beranda | DevTools Network, perbandingan Eco-Mode mati/hidup |
| 4 | Penyelesaian booking | Minimal 80% penguji menyelesaikan alur pesan sampai E-Pass tanpa bantuan | Tes tugas, tingkat keberhasilan |
| 5 | Pemahaman offset | Minimal 4 dari 5 penguji dapat menjelaskan arti kompensasi karbon | Pertanyaan pasca-tes |
| 6 | Performa | LCP di bawah 2,0 detik, skor Lighthouse mobile minimal 90 | Lighthouse |
| 7 | Aksesibilitas | Nol pelanggaran kontras AA pada audit otomatis | axe DevTools atau Lighthouse |

## 13. Asumsi, Batasan & Disclaimer

1. Seluruh harga, kuota, sub-skor, jarak, dan metrik dampak adalah **data ilustrasi untuk prototipe**. Tampilkan tautan "Sumber Data & Asumsi" di footer.
2. Eco-Score pada produk nyata wajib diaudit pihak independen; pada prototipe, tampilkan keterangan "Penilaian ilustrasi, belum diaudit".
3. Faktor emisi dan penyerapan mangrove adalah asumsi dengan rujukan yang harus dicantumkan sebelum peluncuran.
4. Pembayaran bersifat simulasi; tidak ada pemrosesan data pribadi nyata. Tampilkan catatan ini pada Drawer.
5. Informasi destinasi (Nglanggeran, Pulau Menjangan, Wae Rebo, Baluran) diambil dari lokasi nyata, namun detail pengelolaan dan paket di prototipe ini bersifat rekaan dan tidak mewakili pengelola resmi.
