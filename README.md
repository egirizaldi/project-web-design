# 🌿 LestariWay — Jelajahi Alam, Tinggalkan Jejak Kebaikan

> **Platform Ekowisata Berkelanjutan Terverifikasi** dengan Transparansi Biaya 60/20/15/5, Eco-Score 4 Pilar Terbuka, Kalkulator Emisi Jujur, dan Implementasi *Low-Carbon Web Design*.  
> *Dikembangkan khusus untuk kebutuhan Kompetisi Web Design & Development.*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Low-Carbon Web Design](https://img.shields.io/badge/Design-Low--Carbon-1B4332?style=flat-square)](https://sustainablewebdesign.org/)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG_2.1_AA-success?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![PRD Version](https://img.shields.io/badge/PRD-v1.2_Compliant-B8512B?style=flat-square)](./Product%20Requirements%20Document%20(PRD)%20LestariWay.md)

---

## 📌 1. Latar Belakang & Masalah (*Problem Statement*)

Sektor pariwisata Indonesia menghadapi tiga krisis struktural yang sering kali ditutupi oleh narasi pemasaran:

1. **Greenwashing Destinasi:** Banyak destinasi mengklaim "ramah lingkungan" atau "ekowisata" tanpa audit terukur dan tanpa metodologi penilaian yang transparan.
2. **Ketimpangan Ekonomi Lokal (*Tourism Leakage*):** Mayoritas perputaran uang wisata dinikmati oleh agregator besar dan operator luar, sementara komunitas adat/desa penjaga ekosistem hanya memperoleh sisa remah ekonomi.
3. **Penyembunyian Jejak Karbon:** Wisatawan tidak mendapatkan informasi emisi transportasi antar-kota secara jujur, serta minim akses langsung terhadap aksi restorasi habitat (misal: restorasi mangrove).
4. **Jejak Karbon Digital (*Web Carbon Footprint*):** Banyak website modern memiliki ukuran halaman berlebihan (heavy scripts, unoptimized assets), membuang energi server dan boros kuota pengguna di wilayah pelosok sinyal lemah.

---

## 💡 2. Solusi & Proposisi Nilai (*Value Proposition*)

**LestariWay** hadir sebagai platform web ekowisata kurasi terbatas dengan filosofi: **"Jujur di atas Menarik"**. Setiap angka memiliki dasar hitung yang dapat dipertanggungjawabkan (sinkron dengan [PRD v1.2](./Product%20Requirements%20Document%20(PRD)%20LestariWay.md)).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TIGA PILAR LESTARIWAY                           │
├───────────────────────┬────────────────────────┬───────────────────────┤
│ 1. Transparansi Penuh │ 2. Berdayakan Warga    │ 3. Desain Rendah Emisi│
│    Model 60/20/15/5   │    Eco-Score 4 Pilar   │    Low-Carbon Website │
│    & Emisi Antar-Kota │    & Batas Kuota Harian│    & OLED Eco-Mode    │
└───────────────────────┴────────────────────────┴───────────────────────┘
```

---

## ✨ 3. Fitur Utama & Inovasi Produk

### 🟢 A. Transparansi Alokasi Biaya (Formula 60/20/15/5)
Setiap paket perjalanan dipecah transparan ke dalam bagan SVG Donat Interaktif & tabel audit:
* **60% — Warga Lokal & Adat:** Pendapatan langsung untuk pemandu lokal, pemilik homestay, dan koperasi desa.
* **20% — Dana Konservasi:** Penanaman bibit mangrove, adopsi karang, dan patroli jagawana.
* **15% — Operasional Lapangan:** Logistik zero-waste dan asuransi dasar perjalanan.
* **5% — Platform LestariWay:** Pemeliharaan situs, verifikasi kurasi, dan audit independen.

### 📊 B. Sistem Penilaian Eco-Score 4 Pilar
Mengukur kepatuhan keberlanjutan destinasi secara objektif (skala 0–100):
1. **Pengelolaan Sampah & Nol Plastik (Bobot 30%)** — Adanya stasiun isi ulang air & larangan plastik sekali pakai.
2. **Kepemilikan & Tenaga Kerja Lokal (Bobot 30%)** — Minimal 80% pekerja berasal dari desa lingkar destinasi.
3. **Aksi Konservasi Habitat (Bobot 20%)** — Program restorasi aktif (bibit mangrove/karang).
4. **Efisiensi Energi & Air (Bobot 20%)** — Penggunaan solar panel, panen air hujan (embung), dan pembatasan daya dukung harian.

### 🚆 C. Kalkulator Emisi Jujur & Estimator Mangrove
* Perhitungan otomatis emisi pulang-pergi (PP) dari 3 kota asal (**Jakarta, Surabaya, Yogyakarta**) ke tiap destinasi.
* Membandingkan secara langsung 3 moda transportasi: **Kereta Api (0,041 kg CO2e/km)**, **Bus Bersama (0,089 kg CO2e/km)**, dan **Pesawat Domestik (0,255 kg CO2e/km)**.
* Konversi kompensasi emisi ke bibit mangrove: **1 bibit = 22 kg penyerapan CO2e (Rp 15.000/bibit)**.

### 🌑 D. Low-Carbon Web Design & Eco-Mode Jujur
* **Mode OLED Hemat Daya (`data-eco="true"`):** Latar belakang `#0D1310` ramah layar OLED, filter visual grayscale cerdas untuk mengurangi emisi piksel, dan reduced animation.
* **Save-Data Integration:** Otomatis mendeteksi API `navigator.connection.saveData` peramban untuk menawarkan mode hemat.
* **Indikator Beban Halaman Real-Time:** Menghitung total transfer aset peramban secara dinamis (`window.performance`) di bagian footer.
* **Zero Heavy Frameworks:** Tidak menggunakan library CSS berat (seperti Bootstrap/Tailwind bawaan yang bloating) demi meminimalisir transfer data (<300 KB gzipped).

### 🎫 E. Alur Pemesanan 4 Langkah (Paperless Checkout Drawer)
1. **Langkah 1 — Data Tamu & Kuota:** Validasi input real-time, seleksi tanggal dengan deteksi kuota penuh.
2. **Langkah 2 — Moda Transportasi & Offset:** Pilihan rute rendah emisi & penambahan kompensasi bibit mangrove sukarela.
3. **Langkah 3 — Ringkasan Biaya & Ketahanan Sistem:** Rincian 60/20/15/5, simulasi uji kegagalan jaringan (*error handling*).
4. **Langkah 4 — Paperless E-Pass:** Pembuatan kode reservasi unik, unduh tiket digital berformat **PNG berbasis HTML5 Canvas**, dan panduan checklist *Leave No Trace* (LNT).

---

## 🎨 4. Desain Sistem & Tipografi

Menggabungkan estetika *Nature Editorial Book* dengan kehangatan bumi Nusantara:

| Token Desain | Nilai Heksadesimal | Peran & Makna |
| :--- | :--- | :--- |
| `--bg` | `#F8F5F0` (Alabaster Cream) | Nuansa kertas buku ekspedisi alam, tidak silau |
| `--primary` | `#1B4332` (Deep Forest Green) | Elemen kehutanan dan ekosistem hijau Nusantara |
| `--cta` | `#B8512B` (Terracotta Earth) | Aksen tanah lempung vulkanik berkarakter kuat |
| `--surface` | `#EFECE6` (Sand Surface) | Kontainer sekunder pemisah konten editorial |
| `--text` | `#1F2421` (Off-black) | Kontras tinggi terbaca jelas (rasio kontras > 7:1) |
| `--bg-eco` | `#0D1310` (True OLED Dark) | Tema gelap absolut hemat baterai & emisi |

### Tipografi
* **Serif Display:** `'Fraunces'` (Google Fonts) — Memberikan wibawa jurnalistik dan karakter ekspedisi yang elegan.
* **Sans Body:** `'Plus Jakarta Sans'` (Google Fonts) — Huruf modern rancangan desainer Indonesia yang sangat ergonomis di layar ponsel.

---

## 🏗️ 5. Arsitektur Teknis

Aplikasi ini dibangun menggunakan arsitektur modern berbasis komponen React 19 dan Vite:

```text
webdesign/
├── src/
│   ├── components/            # Komponen modular reusable
│   │   ├── AllocationDonut.jsx    # SVG Donut Chart interaktif 60/20/15/5
│   │   ├── BookingDrawer.jsx      # Modal drawer pemesanan (4 langkah + A11y focus trap)
│   │   ├── Footer.jsx             # Footer ramah lingkungan & monitor page weight
│   │   ├── Header.jsx             # Navigasi sticky, tombol Eco-Mode & burger menu
│   │   ├── MobileSheet.jsx        # Menu navigasi mobile full-screen (keyboard trap)
│   │   ├── SaveDataBanner.jsx     # Banner peramban hemat data
│   │   └── Toast.jsx              # Notifikasi popup real-time
│   ├── context/               # Global state management (React Context)
│   │   ├── BookingContext.jsx     # State alur pemesanan, kota asal, dan focus restoration
│   │   ├── EcoModeContext.jsx     # State tema Eco-Mode, persistensi localStorage
│   │   └── ToastContext.jsx       # State antrean pesan toast
│   ├── data/
│   │   └── data.js                # Single Source of Truth (Destinasi, Emisi, LNT, Jurnal)
│   ├── pages/                 # Halaman utama aplikasi (SPA Hash Routing)
│   │   ├── HomePage.jsx           # Beranda, Hero, Kalkulator Emisi, Storyteller
│   │   ├── ExplorePage.jsx        # Katalog terverifikasi + multi-filter kriteria
│   │   ├── DestinationDetailPage.jsx # Rincian destinasi, galeri 3:2, radar 4 pilar
│   │   ├── JournalPage.jsx        # Jurnal panduan lapangan & artikel zero-waste
│   │   ├── ImpactPage.jsx         # Laporan transparansi, tabel audit, dan rumus
│   │   └── NotFoundPage.jsx       # Fallback 404 informatif
│   ├── utils/
│   │   └── helpers.js             # Helper format Rupiah, kalkulasi bibit, fallback SVG
│   ├── styles.css             # Vanilla CSS murni dengan CSS custom properties
│   ├── App.jsx                # Router utama & sinkronisasi dokumen/anchor
│   └── main.jsx               # React DOM root entry point
├── index.html                 # HTML shell dengan meta SEO & favicon SVG
├── package.json               # Dependensi & script eksekusi
└── vite.config.js             # Konfigurasi bundler Vite
```

---

## ♿ 6. Standar Aksesibilitas (A11y - WCAG 2.1 AA)

* **Keyboard Navigation:**
  * Seluruh modal drawer dan navigasi mobile dilengkapi **Focus Trap** (perputaran fokus tombol `Tab` terkunci di dalam dialog).
  * Dukungan penuh tombol `Escape` untuk menutup drawer / modal.
  * *Focus Restoration:* Kursor otomatis kembali ke elemen tombol pembuka setelah modal ditutup.
* **Semantic HTML:** Menggunakan elemen semantik baku (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) dengan atribut `aria-modal`, `aria-label`, dan `role="tablist"`.
* **Skip Link:** Dilengkapi tombol *"Langsung ke konten utama"* (`.sr-only`) untuk pengguna pembaca layar (*screen-reader*).
* **Rasio Kontras Warna:** Memenuhi ambang batas WCAG AA (minimal 4.5:1 untuk teks biasa, > 7:1 untuk teks utama).

---

## 🚀 7. Panduan Instalasi & Menjalankan Proyek

### Prasyarat
* **Node.js:** Versi 18.0 atau lebih tinggi (disarankan v20+)
* **NPM:** Versi 9.0 atau lebih tinggi

### Langkah-Langkah

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/egirizaldi/project-web-design.git
   cd project-web-design
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173/` dengan fitur *Hot Module Replacement* (HMR).

4. **Kompilasi untuk Produksi (Build):**
   ```bash
   npm run build
   ```
   Hasil bundle yang teroptimasi akan berada di folder `dist/`.

5. **Pratinjau Hasil Build (Preview):**
   ```bash
   npm run preview
   ```

---

## 🏆 8. Pemetaan Terhadap Kriteria Penilaian Lomba

| Kriteria Penilaian | Implementasi di LestariWay |
| :--- | :--- |
| **Kesesuaian Tema & Orisinalitas** | Konsep ekowisata terverifikasi anti-greenwashing dengan rumus transparan yang dapat diverifikasi publik. |
| **Kualitas Visual & UI Design** | Desain editorial bertema bumi dengan paduan warna hangat, tata letak grid modular, tipografi Fraunces & Jakarta Sans. |
| **Pengalaman Pengguna (UX)** | Alur pemesanan jelas (4 langkah), kalkulator emisi interaktif instan, filter multi-parameter tanpa reload, feedback toast responsif. |
| **Inovasi Interaktif** | Diagram SVG alokasi biaya interaktif, generator Paperless E-Pass berbasis HTML5 Canvas langsung di browser, dan mode Eco OLED. |
| **Efisiensi Teknis & Low-Carbon** | Kompilasi ultra-cepat Vite (<250ms), CSS murni tanpa framework bloating, ukuran bundle minimalis (<300 KB), performa skor tinggi. |
| **Aksesibilitas (A11y)** | Kepatuhan WCAG AA, focus trap keyboard, skip navigation, kontras tinggi, atribut ARIA lengkap. |

---

## 👥 Pengembang

* **Desainer & Pengembang:** Egi Rizaldi
* **Repositori Resmi:** [github.com/egirizaldi/project-web-design](https://github.com/egirizaldi/project-web-design)
* **Lisensi:** Open-Source (Untuk Keperluan Evaluasi Kompetisi)
