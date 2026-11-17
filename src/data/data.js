// LestariWay — Single Source of Truth (Sinkron dengan PRD v1.2)
// Catatan: Seluruh harga, skor, jarak, dan metrik dampak adalah data ilustrasi prototipe.

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrB3MtgpDQEsUBVTv6Q7pLkVXbw6MJSZVJgjd4y6Z3c9tu6rOqpOHxr2vSQ-5GZAJMsozM5v-WF3giBL9KySyRVaU_tcKTPLVI6vFMyiXRbZUWS0sfq6n6KuFWRIPwJ6UxDaiZvORxJ6q93M_w0TlMbanjwrDtv38wiHG2E06cLq6MdoR49kNaUM2btIFGfdDj3ARcxOX2BLnQVMuOIg_9rFTMac1eNk85buMRV4Ss-W';

export const EMISSION_FACTORS = {
  kereta: { label: 'Kereta Api', factor: 0.041 },
  bus: { label: 'Bus / Travel Bersama', factor: 0.089 },
  pesawat: { label: 'Pesawat Domestik', factor: 0.255 }
};

export const MANGROVE_PRICE = 15000;
export const MANGROVE_ABSORPTION_KG = 22;

export const DESTINATIONS = [
  {
    slug: 'nglanggeran',
    name: 'Desa Wisata Nglanggeran',
    shortName: 'Nglanggeran',
    location: 'Gunungkidul, DI Yogyakarta',
    category: 'Desa Adat & Geopark',
    filterCategory: 'Desa Adat',
    duration: '2H1M',
    price: 650000,
    quotaMax: 60,
    quotaLeft: 18,
    ecoScore: 94,
    ecoScoreRaw: 93.8,
    subScores: { limbah: 92, lokal: 98, konservasi: 92, energi: 92 },
    badges: ['100% Dikelola Warga Lokal', 'Panen Air Hujan (Embung)'],
    summary:
      'Mendaki batuan vulkanik purba, menginap di rumah warga, dan ikut panen kakao organik bersama karang taruna desa.',
    honestNote:
      'Akses kereta dari Jakarta atau Surabaya sangat terjangkau emisi. Cocok untuk perjalanan akhir pekan tanpa terbang.',
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUiPu20W5HtlyI8sPNvPcaADBGHp5YqdsQ3ioxMhQrujCFCbE1eU-_OM7Dr8DzvTg2_HUTlCLG0Bs7ajct5SwxqOZ1pl4M0UyFq7PU7nUui87GL9dMR1puqpxqMNkn8HkiuY1RDAmVDbFYNbIJUz02cTXuXnwEhG-QRXE2JFTk3W3PBg17F7S4RPujyrr8kZky9V1m4yHX0Z9JvVPzzbPn3OwDtl4C3w0jjxVXeGn3',
      side1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYZzhGi0WibQIm4psLGcAIEBFOOtDgCSUul-xeBRvOQPPBM28gTJQqJFKbeDKbtsri8iwVOdNEzb2gCYH1N8FeysJVKVpKdVrJZdFJ2WsiU6d_tKYlXK8yZQhr3a1ydvfaIEbbRpAElfpkuV_ggHCDujeUAeqEv8E5NyvSj438Ue4OqGidyx71uFxC1GyD7UK9kBIm--9EApbQYIg6YaD_UPAggp-RzgRZqHMtBV7-',
      side2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsR4H9U3D88qtsTflPw8AUfSBcuv5d9cdiK4YS4QrAg1y5_wkDgn0lULiOD0UK33CoOBJj75aCaWMI4dw7-ZCxc2JOkWJkQmDX_5oGGR0cymuE46d_A0a99SFHKusj_rQoErQbm6HS72Hb2mO6YWNnr9ktCYuKOIsMuTBC8sq-FUmIHkScYyJNrtmdksEE_R0qG4KpGlY0Wcvr3jBsX0aARingM8nz-1ED5PZr-X1s'
    },
    emissions: {
      jakarta: { kereta: 50, bus: 100, pesawat: 226 },
      surabaya: { kereta: 34, bus: 68, pesawat: null },
      yogyakarta: { kereta: null, bus: 8, pesawat: null }
    },
    distanceNotes: {
      jakarta: {
        kereta: '1.040 km rel + 80 km lokal',
        bus: '1.120 km jalur darat PP',
        pesawat: '860 km udara + 80 km lokal'
      },
      surabaya: {
        kereta: '660 km rel + 80 km lokal',
        bus: '760 km jalur darat PP',
        pesawat: 'Tidak realistis untuk jarak antarkota dekat'
      },
      yogyakarta: {
        kereta: 'Tidak tersedia stasiun langsung di desa',
        bus: '90 km perjalanan darat PP',
        pesawat: 'Tidak tersedia penerbangan lokal'
      }
    },
    checklist: [
      'Bawa botol minum isi ulang (air minum tersedia di stasiun isi ulang homestay).',
      'Gunakan sepatu trekking dengan sol mencengkeram untuk jalur batu andesit.',
      'Minta izin sebelum memotret warga di area dapur dan kebun kakao.'
    ]
  },
  {
    slug: 'menjangan',
    name: 'Konservasi Terumbu Karang Pulau Menjangan',
    shortName: 'Pulau Menjangan',
    location: 'Buleleng, Bali',
    category: 'Konservasi Laut',
    filterCategory: 'Konservasi Laut',
    duration: '3H2M',
    price: 1450000,
    quotaMax: 40,
    quotaLeft: 8,
    ecoScore: 91,
    ecoScoreRaw: 91.1,
    subScores: { limbah: 95, lokal: 86, konservasi: 96, energi: 88 },
    badges: ['Nol Plastik Sekali Pakai', 'Adopsi Terumbu Karang'],
    summary:
      'Snorkeling di zona terumbu dangkal tanpa jangkar perahu, lalu ikut menanam fragmen karang bersama kelompok nelayan penjaga laut.',
    honestNote:
      'Kereta dari Jakarta harus disambung bus dan feri penyeberangan; dari Surabaya tersedia bus malam langsung ke Gilimanuk.',
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOfnM1OEa24BjOtDZ4wM65jdjuouvlcndkf1ocMTUXnyf-xuMt-qWlVar99igjv1LQDML5Ft3GY8FP_MD2IKL66iHqHtHE4oZ33_JhMeLrv9oa7PfbRC0k3Hbvfg21MN4Ah8vNiYk5grf9QFJHTTE7qSkuhQR6J5rUah4dJtoGOe7bxHeEvQ0gLTfThHumPhXlTWk9CkMCGjQrf1lxPdEqjZGWa8NDmh8E5nGVVlSg',
      side1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArFOjJbjOpmyT3At6dUL1yc8LVcHpiaYD13TQv8SVbGWPhHiug1R8gaWe53hFHEhdwAdW6XXDC2S_2RTvztKYLt-Ne3e4WPcsbybG4Cdj7gRZbkHuYTX8PZRWuzfYBiRxanreBqskhKERfVqj4mQAHQin7fpLOU1oBfPqYvuFfTtBOaYlTarEXFjkiH-0se-AZg6uHB-opm2JSbnftHQwEQH5ZqFzuZ3di24NJEnks',
      side2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Z1IaJ_Tw-5-9Ot6CFv6YkFCeos2DCc34Bmiqc8SILFsbafmHgC3_8QCuJ8AvO_7flu8FLK4xpGcW3VEhBwjCEzY6uEXD8uRbY8yQocBroHfw4fwqpMmheGVdxkxSe5g3SwqGZb0MVgjNEaVa-eUkRPZ93NlpSVZB-oiF9XTYG7jyedSRP2E1jxziT80ktu5Eej7_XWKGB-QV7fP1KpQJaUT7rC8OwBBiiyLV3WwW'
    },
    emissions: {
      jakarta: { kereta: null, bus: 219, pesawat: 615 },
      surabaya: { kereta: null, bus: 85, pesawat: 290 },
      yogyakarta: { kereta: null, bus: 135, pesawat: 340 }
    },
    distanceNotes: {
      jakarta: {
        kereta: 'Tidak ada jalur kereta langsung ke ujung barat Bali',
        bus: '2.460 km bus & feri PP',
        pesawat: '2.320 km udara + 260 km darat lokal'
      },
      surabaya: {
        kereta: 'Tidak tersedia layanan langsung ke Pelabuhan Gilimanuk',
        bus: '955 km bus & feri PP',
        pesawat: '1.010 km udara + 260 km darat lokal'
      },
      yogyakarta: {
        kereta: 'Tidak tersedia layanan langsung ke ujung barat Bali',
        bus: '1.515 km bus & feri PP',
        pesawat: '1.220 km udara + 260 km darat lokal'
      }
    },
    checklist: [
      'Pakai tabir surya berlabel reef-safe (tanpa oxybenzone dan octinoxate).',
      'Jangan menyentuh, menginjak, atau mengambil karang dan cangkang kerang.',
      'Semua botol plastik sekali pakai dilarang masuk kawasan Taman Nasional.'
    ]
  },
  {
    slug: 'wae-rebo',
    name: 'Ekowisata Kampung Adat Wae Rebo',
    shortName: 'Wae Rebo',
    location: 'Manggarai, NTT',
    category: 'Budaya & Hutan Pegunungan',
    filterCategory: 'Hutan Pegunungan',
    duration: '4H3M',
    price: 2850000,
    quotaMax: 20,
    quotaLeft: 4,
    ecoScore: 96,
    ecoScoreRaw: 96.1,
    subScores: { limbah: 95, lokal: 100, konservasi: 95, energi: 93 },
    badges: ['Kuota Harian Terbatas', '100% Dikelola Warga Lokal'],
    summary:
      'Trekking 3 jam menembus hutan pegunungan Flores untuk bermalam di rumah kerucut Mbaru Niang bersama keluarga penjaga adat.',
    honestNote:
      'Emisi penerbangan ke Labuan Bajo memang tinggi (933 kg CO2e dari Jakarta). Tinggallah minimal 4 hari dan datang lebih jarang agar manfaatnya bagi warga sepadan.',
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0UHVgRZ4l5QwXeGdtwyj2FRk2VC6IeZ6gDUijP2X8ShwYqNKT5qLeDpv4yRCRVqtusXOu3jQHhIe4otwCQCSZXvEkWxkfGxF9JYGk132n1q8VUEBLfdcoEKesoXlXJwA7Ahg7k4R6LhH2aT3GZDaFiy1Fq-iMP9sjLK-v_a5nT4AoffJ4izwqgZlBzAB4zVPSEcLfk1E7MSNue96h18V6wucNZ-GenwYGR_45afY7',
      side1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx2ooSnE2zqo4BS2zT2OlQoTpCAAjU9OzPtxQ_-krN-ZKX-FVMfahH_QkC4kHwycwk5tWm-XyKhwbNT5XeOoAfEIH20k56jEJAf-J-un98ccrCKnyAQOkdyUjFZc7qAjtRhYvq79o5f45C3qWtMRc71B83x_EoejXsH0KAElf7lB4s0yj6O9K-eO4RTqS_e9JxYDqwsZa0XrLb5zN1Teu5RUe6YHrFJYWx0SxXr_1S',
      side2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsV6g2USjByMqFbxliUIIkFcRwSqabuTao3tPmUHH7BW9Tz7O8Qo0jCrLttWuKkhEmgTSy2nzUzZskdBOoruiAYqhm48wN7l8NOen8PIaLbik3AjnA7PnJvtp34wEi_esuFkfjwxi4oS5sTCsiTF4UsQZCcc979G_8PqMipBbVPQzaU-nahFwyf-zDLquXScE6yNCQRLexg_MVWhf25Ebn0IHFZ3CasfuhLQZfnAYS'
    },
    emissions: {
      jakarta: { kereta: null, bus: null, pesawat: 933 },
      surabaya: { kereta: null, bus: null, pesawat: 645 },
      yogyakarta: { kereta: null, bus: null, pesawat: 710 }
    },
    distanceNotes: {
      jakarta: {
        kereta: 'Tidak tersedia jalur kereta antarpulau ke Flores',
        bus: 'Tidak realistis melalui jalur darat untuk durasi 4 hari',
        pesawat: '3.520 km udara + 400 km darat lokal'
      },
      surabaya: {
        kereta: 'Tidak tersedia jalur kereta antarpulau ke Flores',
        bus: 'Tidak realistis melalui jalur darat untuk durasi 4 hari',
        pesawat: '2.390 km udara + 400 km darat lokal'
      },
      yogyakarta: {
        kereta: 'Tidak tersedia jalur kereta antarpulau ke Flores',
        bus: 'Tidak realistis melalui jalur darat untuk durasi 4 hari',
        pesawat: '2.645 km udara + 400 km darat lokal'
      }
    },
    checklist: [
      'Ikuti upacara penyambutan adat Waelu’u sebelum memotret area kampung.',
      'Bawa kantong sampah pribadi dan bawa turun seluruh bungkus logistik Anda.',
      'Listrik menyala terbatas pukul 18.00–22.00 WITA; siapkan senter kepala.'
    ]
  },
  {
    slug: 'baluran',
    name: 'Restorasi Mangrove & Savana Baluran',
    shortName: 'Baluran',
    location: 'Situbondo, Jawa Timur',
    category: 'Konservasi Pesisir & Satwa',
    filterCategory: 'Pesisir & Satwa',
    duration: '2H1M',
    price: 890000,
    quotaMax: 30,
    quotaLeft: 12,
    ecoScore: 88,
    ecoScoreRaw: 87.7,
    subScores: { limbah: 85, lokal: 90, konservasi: 92, energi: 84 },
    badges: ['Tanpa Kendaraan Bermotor Berisik', 'Penanaman Bakau'],
    summary:
      'Mengamati banteng jawa di sabana Bekol tanpa deru mesin, lalu menanam bibit bakau di pesisir Pantai Bama bersama jagawana lokal.',
    honestNote:
      'Kereta api menuju Banyuwangi atau Situbondo memangkas emisi hampir 80% dibanding pesawat ke Surabaya/Banyuwangi.',
    images: {
      hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUE-TTcjxtVKXJxzsK8053ukheZZa0J3eg2q8fRpYeujzip0C4HMvByi-CMfqtpGfWVA_-gMNFZt8fYA-6DN-_zckMYHcPE3sCzDoj6XsW_nSrDi1ubmXv9f_tI8AD-VaDdeUjYcxOKXeWTOuneC5PWq1-fTHltdOhlfTKBaDgM7UjA2ucDN39OMC7js1OXO8TyHjEY8gXPQiE-gV5pndyT2mGy5LawCGjldXe9Qva',
      side1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpVxsLUC3dgJBablIRJCCye2VeoESJt_ccnSCytBMGQkeFL4RCJE_zXTYLdiiIuXZHVQM3ffgLUYHhje71av1qvirBxKRadMrN5kh1w-y4v9EI9eKma08Q6H_WXYWaQIjPKBmfaYvIhGp5mA6RwWj-3h-5cqXHrZvhhqQeZ03IHsmDVDgQSy_zPvO_gz5wlRwN5VtOax2OckGfFRL0ca4zIsWpthjW9GjkqUf-wNMe',
      side2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAifeJkmrl7chXyBJUOJP8C6bUDCEimgFow5pMy6RJGzNCP3hfrw-96ANar02ziNUgZIS3COjbSNurMqB9Y5gPrdzhXynw6HnUNPDXjf7bJz501sk-qA2CtIzbbK_yKgdYUUjhS9CUtlWksSrSOjqBHuYA0vlx_BzF16NEIzFs9KQV2YdvC1fbbfsXfVmmoP9iXCQ82ZFeuuaMJKGFpYCt9QDDhthpm5bsy_0LP33fN'
    },
    emissions: {
      jakarta: { kereta: 78, bus: 174, pesawat: 372 },
      surabaya: { kereta: 24, bus: 52, pesawat: null },
      yogyakarta: { kereta: 48, bus: 102, pesawat: null }
    },
    distanceNotes: {
      jakarta: {
        kereta: '1.780 km rel + 60 km lokal',
        bus: '1.960 km jalur darat PP',
        pesawat: '1.320 km udara + 400 km darat lokal'
      },
      surabaya: {
        kereta: '460 km rel + 60 km lokal',
        bus: '580 km jalur darat PP',
        pesawat: 'Tidak realistis untuk jarak dalam provinsi'
      },
      yogyakarta: {
        kereta: '1.040 km rel + 60 km lokal',
        bus: '1.145 km jalur darat PP',
        pesawat: 'Tidak tersedia penerbangan efisien'
      }
    },
    checklist: [
      'Jaga jarak aman minimal 30 meter saat mengamati banteng atau rusa.',
      'Dilarang keras memberi makan kera ekor panjang di sekitar Pantai Bama.',
      'Pakai pakaian berwarna netral (cokelat tanah, hijau daun, krem).'
    ]
  }
];

export const IMPACT_METRICS = [
  {
    label: 'Bibit Mangrove Tertanam',
    value: '12.480',
    period: 'Jan–Okt 2026',
    calc: 'Dihitung dari tiket terjual + kontribusi offset sukarela peserta.'
  },
  {
    label: 'Sampah Plastik Dicegah',
    value: '3,2 Ton',
    period: 'Jan–Okt 2026',
    calc: 'Estimasi pengurangan kemasan sekali pakai lewat stasiun isi ulang desa.'
  },
  {
    label: 'Dana Langsung ke Desa Mitra',
    value: 'Rp 486 Jt',
    period: 'Jan–Okt 2026',
    calc: 'Akumulasi porsi tetap 60% dari total nilai pemesanan simulasi.'
  },
  {
    label: 'Desa & Kawasan Mitra',
    value: '4 Lokasi',
    period: 'Aktif 2026',
    calc: 'Nglanggeran, Pulau Menjangan, Wae Rebo, dan Baluran.'
  }
];

export const STORYTELLER = {
  name: 'Pak Rudi',
  role: 'Pemandu Pendakian Gunung Api Purba Nglanggeran',
  label: 'Tokoh ilustrasi berdasarkan peran nyata pemandu desa (bukan foto/nama tokoh resmi tanpa izin)',
  photo:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDDwJ1Sq9eJKVZ8dvJubGcDIgieRByuipt746NrbgEKaEwmjQozcZOzLAohswWM2ZCySm0SWEdxKTYo79ddZa8NtfXsghniKVT8ws-9dbqmm53vtT1VPepBGr1xkNsjJh6tzsRZeqWuXsQnaqYAQAYHvtlkci6tMixr4gCFOOxHSSi49mGpnYASDKSILW3h_i4E_H8qJsHvbViJu0ewL4tdM_3rs7awOMt3e_EPNC4K',
  quote:
    'Dulu pemuda sini banyak merantau karena lahan batu sulit ditanami. Sekarang tamu datang lewat jalur resmi desa, kami batasi jumlahnya supaya mata air dan kebun kakao tetap sehat.',
  body:
    'Dari setiap paket Rp 650.000 di Nglanggeran, Rp 390.000 langsung dikelola koperasi warga untuk upah pemandu lokal, tuan rumah homestay, dan perawatan jalur embung.'
};

export const LEAVE_NO_TRACE = [
  { num: '01', title: 'Rencanakan Lebih Awal', text: 'Cek cuaca, batas kuota, dan aturan adat sebelum berangkat.' },
  { num: '02', title: 'Tetap di Jalur Resmi', text: 'Jangan buka jalan pintas agar vegetasi lereng tidak tergerus.' },
  { num: '03', title: 'Bawa Pulang Sampahmu', text: 'Bungkus kembali sisa logistik, tisu basah, dan puntung.' },
  { num: '04', title: 'Biarkan Tetap di Alam', text: 'Batu, karang, dan tanaman liar lebih berguna di habitatnya.' },
  { num: '05', title: 'Hindari Api Sembarangan', text: 'Pakai kompor lapangan kecil daripada membuat api unggun.' },
  { num: '06', title: 'Jaga Jarak dari Satwa', text: 'Amati dari jauh; memberi makan mengubah perilaku alami mereka.' },
  { num: '07', title: 'Hormati Warga Sekitar', text: 'Jaga volume suara dan patuhi larangan foto di titik sakral.' }
];

export const JOURNAL_ARTICLES = [
  {
    slug: 'kemas-nol-sampah',
    category: 'Zero-Waste Travel',
    readTime: '4 menit baca',
    title: 'Panduan Kemas Nol Sampah untuk Perjalanan 3 Hari',
    excerpt: 'Cara praktis memangkas sampah plastik dari tas ransel sebelum berangkat ke desa wisata tanpa harus membeli perlengkapan mahal.',
    body: [
      'Sebagian besar sampah wisata bukan berasal dari niat buruk, melainkan kebiasaan mengemas barang di menit terakhir. Sachet sampo, botol air mineral bandara, dan kantong kresek cadangan menumpuk di tempat tujuan yang sistem pengolahannya terbatas.',
      'Mulailah dari tiga benda yang sudah ada di rumah: botol minum tahan panas/dingin, kotak makan lipat untuk jajan pasar, dan sabun batang dalam wadah kaleng kecil. Di empat lokasi mitra LestariWay, air minum isi ulang tersedia gratis di pos masuk atau homestay.',
      'Jika terpaksa membawa makanan berbungkus plastik, siapkan satu kantong kain khusus di luar tas untuk membawa pulang seluruh sampahnya kembali ke kota asal.'
    ]
  },
  {
    slug: 'etika-kampung-adat',
    category: 'Budaya Lokal',
    readTime: '5 menit baca',
    title: 'Etika Berkunjung ke Kampung Adat: Yang Boleh dan Tidak',
    excerpt: 'Kamera, pakaian, dan rasa ingin tahu punya batas saat kita masuk ke ruang hidup masyarakat adat.',
    body: [
      'Kampung adat seperti Wae Rebo bukan museum yang dibuka untuk tontonan; warga benar-benar tinggal, berladang, dan menjalankan ritual harian di sana. Karena itu, aturan pertama selalu sederhana: sapa tuan rumah lebih dulu sebelum mengeluarkan kamera.',
      'Di banyak tempat, upacara penyambutan bukan formalitas wisata. Tunggu aba-aba pemandu lokal mengenai area yang boleh difoto, hindari menerbangkan drone tanpa izin tertulis, dan kenakan pakaian yang menutup bahu serta lutut saat berada di rumah adat.',
      'Menghabiskan waktu lebih lama untuk mendengar cerita warga jauh lebih berharga daripada mengejar sepuluh titik foto dalam sehari.'
    ]
  },
  {
    slug: 'kuota-menyelamatkan-destinasi',
    category: 'Pelestarian Alam',
    readTime: '4 menit baca',
    title: 'Mengapa Kuota Pengunjung Justru Menyelamatkan Destinasi',
    excerpt: 'Pembatasan tamu bukan strategi eksklusif untuk menaikkan harga, melainkan batas fisik air bersih dan daya pulih ekosistem.',
    body: [
      'Setiap kawasan punya daya dukung (carrying capacity) masing-masing. Saat jumlah pengunjung melampaui kapasitas mata air dan sanitasi desa, kualitas lingkungan turun drastis dalam hitungan bulan.',
      'Di Wae Rebo kuota dibatasi maksimal 20 tamu bermalam per hari, sementara di Pulau Menjangan maksimal 40 tamu. Tujuannya agar pendapatan warga tetap stabil dari kualitas layanan yang baik tanpa mengorbankan terumbu karang atau hutan sekitar.',
      'Saat slot tanggal yang Anda incar penuh, memilih hari lain adalah bentuk dukungan paling nyata bagi keberlanjutan tempat tersebut.'
    ]
  }
];
