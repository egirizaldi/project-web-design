import React from 'react';
import Logo from '../components/Logo';

export default function AboutPage() {
  return (
    <>
      <div className="proto-banner">
        <div className="container row-between">
          <span>
            <strong>Inisiatif Ekowisata Regeneratif Nusantara</strong> — Menjaga batas daya dukung alam &amp; kedaulatan warga lokal.
          </span>
          <span className="xs">Transparansi Model 60/20/15/5</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '36px' }}>
        <div className="container stack-lg">
          {/* Header Editorial */}
          <div className="row-between" style={{ alignItems: 'flex-start', gap: '32px' }}>
            <div className="stack-xs" style={{ maxWidth: '720px' }}>
              <span className="eyebrow">Tentang Inisiatif Kami</span>
              <h1 className="display-title" style={{ fontSize: 'clamp(2rem, 4.2vw, 3.1rem)' }}>
                Menjembatani Pelancong Bertanggung Jawab dengan Penjaga Alam Nusantara.
              </h1>
              <p className="muted" style={{ fontSize: '1.125rem', lineHeight: 1.6, margin: 0 }}>
                LestariWay didirikan atas keyakinan sederhana: <em>pariwisata sejati tidak mengeksploitasi, melainkan memulihkan</em>. 
                Kami menggabungkan kurasi ekowisata terverifikasi, transparansi alokasi biaya 60/20/15/5, dan teknologi digital rendah emisi 
                agar setiap langkah perjalanan membawa manfaat nyata bagi ekosistem dan masyarakat adat.
              </p>
            </div>
            <div style={{ display: 'none', minWidth: '120px', textAlign: 'center' }} className="about-badge-wrap">
              <Logo size={96} />
            </div>
          </div>

          {/* 3 Pilar Nilai */}
          <div className="grid grid-3" style={{ gap: '20px' }}>
            <div className="card card-pad stack-xs">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}
              >
                60%
              </div>
              <h2 className="card-title">Keadilan Ekonomi Desa</h2>
              <p className="small muted" style={{ margin: 0 }}>
                Sebanyak 60% dari nilai paket langsung masuk ke kas komunitas desa (pemandu lokal, homestay keluarga, dan koperasi) tanpa kebocoran devisa ke pihak luar.
              </p>
            </div>

            <div className="card card-pad stack-xs">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}
              >
                01
              </div>
              <h2 className="card-title">Eco-Score Anti-Greenwashing</h2>
              <p className="small muted" style={{ margin: 0 }}>
                Setiap destinasi dinilai dengan rumus terbuka 4 pilar (sampah, ekonomi lokal, konservasi, energi). Tidak ada klaim ramah lingkungan tanpa pembuktian data nyata.
              </p>
            </div>

            <div className="card card-pad stack-xs">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}
              >
                🌱
              </div>
              <h2 className="card-title">Low-Carbon Web Platform</h2>
              <p className="small muted" style={{ margin: 0 }}>
                Infrastruktur web ini dirancang ramah iklim: tanpa script pelacak berlebih, ukuran bundel minimalis (&lt;300 KB), serta mode OLED untuk menghemat konsumsi energi baterai.
              </p>
            </div>
          </div>

          {/* Visi, Misi & Filosofi Kerja */}
          <div className="card card-pad stack-md" style={{ background: 'var(--surface)' }}>
            <div className="row-between">
              <div>
                <span className="eyebrow">Arah &amp; Komitmen</span>
                <h2 className="section-title">Visi &amp; Misi LestariWay</h2>
              </div>
            </div>
            <div className="grid grid-2" style={{ gap: '28px' }}>
              <div className="stack-xs">
                <strong style={{ fontSize: '1.05rem' }}>Visi Jangka Panjang</strong>
                <p className="small muted" style={{ margin: 0, lineHeight: 1.6 }}>
                  Mewujudkan ekosistem pariwisata regeneratif berbasis komunitas di Indonesia yang menghormati daya dukung alami bumi, 
                  menjaga kearifan tradisi masyarakat adat, dan memberikan pengalaman transformatif bagi wisatawan.
                </p>
              </div>
              <div className="stack-xs">
                <strong style={{ fontSize: '1.05rem' }}>Tiga Misi Utama</strong>
                <ul className="stack-xs small muted" style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
                  <li>Menegakkan transparansi radikal alokasi dana 60/20/15/5 di seluruh destinasi mitra.</li>
                  <li>Menerapkan pembatasan kuota pengunjung harian yang ketat demi menjaga mata air dan keanekaragaman hayati.</li>
                  <li>Mengedukasi etika perjalanan alam bebas melalui 7 Prinsip <em>Leave No Trace</em> kepada setiap pelancong.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Komunitas Mitra di Garis Terdepan */}
          <div className="stack-md">
            <div>
              <span className="eyebrow">Garis Terdepan Konservasi</span>
              <h2 className="section-title">Empat Komunitas Penjaga Alam Mitra Kami</h2>
              <p className="small muted" style={{ margin: 0, maxWidth: '640px' }}>
                LestariWay tidak beroperasi sendirian. Kami bekerja berdampingan dengan para penjaga alam yang telah merawat bumi Nusantara secara turun-temurun:
              </p>
            </div>

            <div className="grid grid-2" style={{ gap: '20px' }}>
              <div className="card card-pad stack-xs">
                <span className="badge" style={{ alignSelf: 'flex-start' }}>Gunungkidul, DI Yogyakarta</span>
                <h3 className="card-title">Koperasi Warga Desa Nglanggeran</h3>
                <p className="small muted" style={{ margin: 0 }}>
                  Kelompok pemuda karang taruna dan keluarga petani kakao yang berhasil mengubah bekas tambang batu menjadi Geopark dunia berbasis homestay warga dan panen air embung.
                </p>
              </div>

              <div className="card card-pad stack-xs">
                <span className="badge" style={{ alignSelf: 'flex-start' }}>Buleleng, Bali</span>
                <h3 className="card-title">Kelompok Nelayan Konservasi Menjangan</h3>
                <p className="small muted" style={{ margin: 0 }}>
                  Nelayan tradisional yang beralih menjadi pemandu adopsi terumbu karang dan patroli zona tanpa jangkar di Taman Nasional Bali Barat.
                </p>
              </div>

              <div className="card card-pad stack-xs">
                <span className="badge" style={{ alignSelf: 'flex-start' }}>Manggarai, Flores (NTT)</span>
                <h3 className="card-title">Lembaga Adat Kampung Wae Rebo</h3>
                <p className="small muted" style={{ margin: 0 }}>
                  Tetua dan keluarga penjaga 7 rumah kerucut Mbaru Niang yang secara tegas membatasi kuota menginap maksimal 20 tamu per malam demi menjaga hutan pegunungan.
                </p>
              </div>

              <div className="card card-pad stack-xs">
                <span className="badge" style={{ alignSelf: 'flex-start' }}>Situbondo, Jawa Timur</span>
                <h3 className="card-title">Jagawana &amp; Relawan Pesisir Bama Baluran</h3>
                <p className="small muted" style={{ margin: 0 }}>
                  Para penjaga sabana Bekol dan pesisir Pantai Bama yang mendedikasikan waktu untuk restorasi bibit bakau dan perlindungan kawanan banteng jawa.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="card card-pad row-between" style={{ background: 'var(--primary)', color: '#F8F5F0', padding: '32px' }}>
            <div className="stack-xs" style={{ maxWidth: '580px' }}>
              <span className="eyebrow" style={{ color: '#E8A889' }}>Perjalanan yang Berarti</span>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0, color: 'inherit' }}>
                Siap Menjadi Bagian dari Perubahan?
              </h2>
              <p className="small" style={{ opacity: 0.9, margin: 0 }}>
                Setiap reservasi yang Anda lakukan adalah investasi langsung untuk keberlangsungan hidup warga desa dan kelestarian ekosistem Indonesia.
              </p>
            </div>
            <a href="#/explore" className="btn btn-cta" style={{ background: '#B8512B', color: '#FFFFFF', minHeight: '44px' }}>
              Lihat Destinasi Mitra →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
