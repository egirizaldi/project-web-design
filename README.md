# 🌿 LestariWay — Jelajahi Alam, Tinggalkan Jejak Kebaikan

> **Karya Web Design Competition: TECHNO VERSARY VOL. II**  
> Diselenggarakan oleh **Himpunan Mahasiswa Teknik Informatika (HIMA-TI), Fakultas Ilmu Komputer, Universitas Kuningan**.  
> **Tema Utama:** *"EcoDigital For Environment: Web Design Competition"*  
> **Sub-tema yang Diusung:**  
> • Sub-tema 3: *Konservasi Wisata Alam*  
> • Sub-tema 4: *Travel Destination Ramah Lingkungan*  
> • Sub-tema 9: *Portal Edukasi Lingkungan*  
> • Sub-tema 10: *Galeri Dokumentasi Tentang Alam dan Pelestarian Lingkungan*  
> • Sub-tema 12: *Media Informasi tentang Zero-waste Lifestyle & Daur Ulang*  

[![Competition](https://img.shields.io/badge/Competition-Techno_Versary_Vol._II-1B4332?style=flat-square)](https://www.instagram.com/technoversary/)
[![Organizer](https://img.shields.io/badge/Organizer-HIMA--TI_FKOM_UNIKU-B8512B?style=flat-square)](https://www.instagram.com/hima.ti.uniku/)
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

## 📄 3. Kelengkapan Halaman Minimal (Sesuai Ketentuan Guidebook)

Platform ini memenuhi 100% struktur halaman yang diwajibkan oleh panitia:

| Halaman Minimal | Rute SPA | Fungsi & Fitur Utama |
| :--- | :--- | :--- |
| **1. Halaman Home** | `#/` | Hero editorial, Smart Eco-Search, Live Impact Metrics, Bento Grid pilar, Mini Carbon Estimator, dan Donut 60/20/15/5. |
| **2. Halaman About** | `#/about` | Visi & Misi LestariWay, 3 pilar nilai, metodologi kemitraan desa adat, serta profil tim pengembang & desainer. |
| **3. Halaman Konten / Galeri** | `#/explore`<br>`#/destination/:slug` | Katalog 4 destinasi terverifikasi, filter audit multi-parameter, galeri foto 3:2 dokumentasi alam, radar 4 pilar Eco-score, dan rute emisi. |
| **4. Halaman Artikel** | `#/journal` | Jurnal lapangan edukasi lingkungan, panduan kemas nol-sampah (*zero-waste lifestyle*), etika kampung adat, dan batas daya dukung. |
| **5. Halaman Contact** | `#/contact` | Formulir korespondensi kemitraan interaktif dengan validasi real-time, saluran kontak resmi, dan FAQ singkat. |
| *Ekstra: Booking Overlay* | Drawer Checkout | Alur pemesanan 4 langkah, perhitungan bibit mangrove, simulasi pembayaran, dan generator Paperless E-Pass (Canvas PNG). |
| *Ekstra: Transparansi* | `#/impact` | Dasbor simulasi dampak, tabel matriks audit destinasi, dan pembuktian rumus metodologi terbuka. |

---

## ✨ 4. Fitur Utama & Inovasi Produk

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
* **Mode OLED Hemat Daya (`data-eco="true"`):** Latar belakang `#0D1310` ramah layar OLED, filter visual grayscale cerdas untuk mengurangi konsumsi daya piksel, dan reduced animation.
* **Save-Data Integration:** Otomatis mendeteksi API `navigator.connection.saveData` peramban untuk menawarkan mode hemat.
* **Indikator Beban Halaman Real-Time:** Menghitung total transfer aset peramban secara dinamis (`window.performance`) di bagian footer pada setiap pergantian halaman.
* **Zero Heavy Frameworks:** Tidak menggunakan library CSS berat (seperti Bootstrap/Tailwind bawaan yang bloating) demi meminimalisir transfer data (<300 KB gzipped).

### 🎫 E. Alur Pemesanan 4 Langkah (Paperless Checkout Drawer)
1. **Langkah 1 — Data Tamu & Kuota:** Validasi input real-time, seleksi tanggal dengan deteksi kuota penuh.
2. **Langkah 2 — Moda Transportasi & Offset:** Pilihan rute rendah emisi & penambahan kompensasi bibit mangrove sukarela.
3. **Langkah 3 — Ringkasan Biaya & Ketahanan Sistem:** Rincian 60/20/15/5, simulasi uji kegagalan jaringan (*error handling*).
4. **Langkah 4 — Paperless E-Pass:** Pembuatan kode reservasi unik, unduh tiket digital berformat **PNG berbasis HTML5 Canvas**, dan panduan checklist *Leave No Trace* (LNT).

---

## 🎨 5. Desain Sistem & Tipografi

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

## 🛡️ 6. Pernyataan Orisinalitas & Anti-Template

Sesuai aturan ketat pada Guidebook Techno Versary Vol. II:
* **100% Buatan Sendiri:** Seluruh komponen antarmuka, tata letak, logika interaktif, dan CSS ditulis secara mandiri dari awal tanpa menggunakan *template jadi* (seperti template HTML komersial, Tailwind UI berbayar, atau Bootstrap Themes premium).
* **Aset Bebas Pakai & Open-Source:** Seluruh foto dan ikon menggunakan aset berlisensi bebas pakai (*free-to-use prototype assets*), SVG kustom, dan pustaka open-source resmi (React 19, Vite).

---

## ♿ 7. Standar Aksesibilitas (A11y - WCAG 2.1 AA)

* **Keyboard Navigation:**
  * Seluruh modal drawer dan navigasi mobile dilengkapi **Focus Trap** (perputaran fokus tombol `Tab` terkunci di dalam dialog).
  * Dukungan penuh tombol `Escape` untuk menutup drawer / modal.
  * *Focus Restoration:* Kursor otomatis kembali ke elemen tombol pembuka setelah modal ditutup.
* **Semantic HTML:** Menggunakan elemen semantik baku (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) dengan atribut `aria-modal`, `aria-label`, dan `role="tablist"`.
* **Skip Link:** Dilengkapi tombol *"Langsung ke konten utama"* (`.sr-only`) untuk pengguna pembaca layar (*screen-reader*).
* **Rasio Kontras Warna:** Memenuhi ambang batas WCAG AA (minimal 4.5:1 untuk teks biasa, > 7:1 untuk teks utama).

---

## 🚀 8. Panduan Instalasi & Menjalankan Proyek

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

## 🏆 9. Pemetaan Terhadap Rubrik Penilaian Dewan Juri

| Kriteria Penilaian di Guidebook | Bobot | Implementasi Nyata di LestariWay |
| :--- | :---: | :--- |
| **Kesesuaian Tema Lingkungan** | **30%** | Sangat inline dengan *"EcoDigital For Environment"*. Solusi nyata terhadap 5 sub-tema sekaligus, kalkulator karbon, transparansi konservasi mangrove, dan kode hemat energi. |
| **User Experience (UX)** | **25%** | Alur pemesanan jelas (4 langkah), kalkulator emisi interaktif instan, filter multi-parameter tanpa reload, feedback toast responsif, dan auto-scroll anchor. |
| **Desain Visual & Estetika** | **20%** | Desain editorial bertema bumi dengan paduan warna hangat, tata letak grid modular, tipografi Fraunces & Jakarta Sans, dan diagram SVG interaktif. |
| **Testing dan Performa** | **15%** | Kompilasi ultra-cepat Vite (<250ms), CSS murni tanpa framework bloating, ukuran bundle minimalis (<300 KB), dan monitor beban halaman real-time. |
| **Fungsionalitas Website** | **10%** | Seluruh fitur aktif 100%: Filter katalog, Eco-Score radar, Donut 60/20/15/5, drawer checkout, canvas generator E-Pass PNG, dan formulir kontak validasi. |

---

## 👥 Tim Pengembang & Desainer

Karya ini diajukan untuk **Web Design Competition — Techno Versary Vol. II** oleh:

* **Egi Rizaldi** — *Lead Web Developer & UI/UX Designer*
* **Waldi Bahri Hanif** — *Co-Developer & UI/UX Designer*

* **Repositori Resmi:** [github.com/egirizaldi/project-web-design](https://github.com/egirizaldi/project-web-design)
* **Lisensi:** Open-Source (Untuk Keperluan Evaluasi Kompetisi)
