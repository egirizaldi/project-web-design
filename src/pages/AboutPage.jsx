import React from 'react';
import { DESTINATIONS } from '../data/data';
import { FALLBACK_SVG } from '../utils/helpers';

export default function AboutPage() {
  return (
    <>
      <div className="proto-banner">
        <div className="container row-between">
          <span>
            <strong>Karya Kompetisi Web Design</strong> — Techno Versary Vol. II | HIMA-TI FKOM Universitas Kuningan.
          </span>
          <span className="xs">EcoDigital For Environment</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '32px' }}>
        <div className="container stack-lg">
          {/* Header Editorial */}
          <div className="stack-xs" style={{ maxWidth: '780px' }}>
            <span className="eyebrow">Tentang Inisiatif Kami</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Menjembatani Wisatawan Bertanggung Jawab dengan Penjaga Alam Nusantara.
            </h1>
            <p className="muted" style={{ fontSize: '1.125rem', lineHeight: 1.6, margin: 0 }}>
              LestariWay lahir dari keprihatinan atas maraknya <em>greenwashing</em> dan ketimpangan ekonomi pariwisata. 
              Kami memadukan teknologi digital rendah emisi dengan audit konservasi terbuka agar setiap rupiah perjalanan 
              benar-benar menghidupi masyarakat lokal dan menjaga kelestarian ekosistem.
            </p>
          </div>

          {/* 3 Pilar Nilai */}
          <div className="grid grid-3" style={{ gap: '20px' }}>
            <div className="card card-pad stack-xs">
              <div
                style={{
                  width: '40px',
                  height: '40px',
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
                Memastikan 60% porsi biaya wisata dinikmati langsung oleh warga desa lingkar destinasi, tanpa potongan perantara yang mencekik.
              </p>
            </div>

            <div className="card card-pad stack-xs">
              <div
                style={{
                  width: '40px',
                  height: '40px',
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
                Standar penilaian berbasis 4 pilar objektif: pengelolaan limbah, kesejahteraan tenaga kerja warga, aksi restorasi satwa, serta efisiensi energi.
              </p>
            </div>

            <div className="card card-pad stack-xs">
              <div
                style={{
                  width: '40px',
                  height: '40px',
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
                Platform web ini dibangun dengan prinsip keberlanjutan digital: tanpa library CSS berlebih, transfer data minimalis (&lt;300 KB), dan mode gelap OLED hemat daya.
              </p>
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="card card-pad stack-md" style={{ background: 'var(--surface)' }}>
            <div className="row-between">
              <div>
                <span className="eyebrow">Arah Gerak</span>
                <h2 className="section-title">Visi &amp; Misi LestariWay</h2>
              </div>
            </div>
            <div className="grid grid-2" style={{ gap: '24px' }}>
              <div className="stack-xs">
                <strong>Visi Kami</strong>
                <p className="small muted" style={{ margin: 0 }}>
                  Menjadi ekosistem pariwisata regeneratif digital terdepan di Indonesia yang mengutamakan daya pulih alam dan kedaulatan masyarakat adat.
                </p>
              </div>
              <div className="stack-xs">
                <strong>Misi Utama</strong>
                <ul className="stack-xs small muted" style={{ margin: 0, paddingLeft: '18px' }}>
                  <li>Menghadirkan transparansi harga radikal 60/20/15/5 di setiap destinasi wisata alam.</li>
                  <li>Menerapkan pembatasan kuota daya dukung (carrying capacity) harian agar alam tidak tereksploitasi.</li>
                  <li>Memberikan edukasi etika alam bebas (7 Prinsip Leave No Trace) kepada setiap pelancong sebelum berangkat.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tim Pengembang & Desainer */}
          <div className="stack-md">
            <div>
              <span className="eyebrow">Kreator &amp; Pengembang</span>
              <h2 className="section-title">Tim di Balik LestariWay</h2>
              <p className="small muted" style={{ margin: 0 }}>
                Dikembangkan secara kolaboratif untuk menghadirkan solusi EcoDigital nyata pada ajang <strong>Techno Versary Vol. II</strong>.
              </p>
            </div>

            <div className="grid grid-2" style={{ gap: '20px' }}>
              <div className="card card-pad stack-xs">
                <div className="row-wrap" style={{ gap: '14px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: '#F8F5F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                    }}
                  >
                    ER
                  </div>
                  <div>
                    <h3 className="card-title" style={{ margin: 0 }}>Egi Rizaldi</h3>
                    <span className="xs muted">Lead Web Developer &amp; UI/UX Designer</span>
                  </div>
                </div>
                <p className="small muted" style={{ margin: '8px 0 0' }}>
                  Fokus pada arsitektur komponen React, implementasi state interaktif, kalkulator emisi, dan optimasi performa digital.
                </p>
              </div>

              <div className="card card-pad stack-xs">
                <div className="row-wrap" style={{ gap: '14px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: 'var(--cta)',
                      color: '#F8F5F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                    }}
                  >
                    WB
                  </div>
                  <div>
                    <h3 className="card-title" style={{ margin: 0 }}>Waldi Bahri Hanif</h3>
                    <span className="xs muted">Co-Developer &amp; UI/UX Designer</span>
                  </div>
                </div>
                <p className="small muted" style={{ margin: '8px 0 0' }}>
                  Fokus pada eksplorasi estetika editorial, sistem warna tanah Nusantara, riset persona pengguna, dan kurasi konten keberlanjutan.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="card card-pad row-between" style={{ background: 'var(--primary)', color: '#F8F5F0', padding: '32px' }}>
            <div className="stack-xs" style={{ maxWidth: '580px' }}>
              <span className="eyebrow" style={{ color: '#E8A889' }}>Mulai Langkah Pertamamu</span>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0, color: 'inherit' }}>
                Siap Menjadi Wisatawan yang Bertanggung Jawab?
              </h2>
              <p className="small" style={{ opacity: 0.9, margin: 0 }}>
                Pilih salah satu destinasi terverifikasi kami dan rasakan perjalanan yang berdampak langsung bagi kelestarian alam dan warga desa.
              </p>
            </div>
            <a href="#/explore" className="btn btn-cta" style={{ background: '#B8512B', color: '#FFFFFF', minHeight: '44px' }}>
              Eksplorasi Destinasi Mitra →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
