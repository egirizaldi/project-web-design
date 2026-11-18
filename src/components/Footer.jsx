import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Footer({ currentPath }) {
  const [pageWeight, setPageWeight] = useState('Menghitung beban halaman...');

  useEffect(() => {
    const calcWeight = () => {
      if (!window.performance || !performance.getEntriesByType) return;
      const resources = performance.getEntriesByType('resource');
      const totalBytes = resources.reduce((sum, r) => sum + (r.transferSize || r.encodedBodySize || 0), 0);
      if (totalBytes > 0) {
        const kb = Math.round(totalBytes / 1024);
        setPageWeight(`Beban terukur sesi ini: ~${kb} KB`);
      }
    };

    calcWeight();
    const timer = setTimeout(calcWeight, 400);

    if (document.readyState !== 'complete') {
      window.addEventListener('load', calcWeight);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('load', calcWeight);
      };
    }

    return () => clearTimeout(timer);
  }, [currentPath]);

  return (
    <footer className="site-footer">
      <div className="footer-contour" aria-hidden="true">
        <svg viewBox="0 0 1200 180" fill="none" preserveAspectRatio="none">
          <path d="M0 120 Q 220 40, 480 110 T 960 90 T 1200 130" stroke="currentColor" strokeWidth="1.2" opacity="0.16" />
          <path d="M0 145 Q 300 75, 580 135 T 1040 110 T 1200 155" stroke="currentColor" strokeWidth="1" opacity="0.12" />
          <path d="M0 90 Q 180 10, 420 75 T 880 60 T 1200 95" stroke="#B8512B" strokeWidth="1.2" opacity="0.28" />
        </svg>
      </div>

      <div className="container footer-inner">
        <div className="footer-top">
          <div className="stack-sm">
            <div className="brand" style={{ color: 'inherit' }}>
              <Logo size={30} />
              <span>LestariWay</span>
            </div>
            <p className="footer-tagline">
              Berjalan pelan, menghormati batas daya dukung alam, dan memastikan 60% pengeluaranmu tinggal di desa.
            </p>
            <div className="row-wrap">
              <span className="footer-pill">Low-Carbon Web Design</span>
              <span className="footer-weight" id="pageWeightLabel">
                {pageWeight}
              </span>
            </div>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Transparansi</span>
            <ul className="footer-links">
              <li>
                <a href="#/impact">Laporan Dampak (Simulasi)</a>
              </li>
              <li>
                <a href="#/impact#metodologi">Rumus Eco-Score 4 Pilar</a>
              </li>
              <li>
                <a href="#/impact#asumsi">Sumber Data &amp; Asumsi</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Destinasi Mitra</span>
            <ul className="footer-links">
              <li>
                <a href="#/destination/nglanggeran">Desa Wisata Nglanggeran</a>
              </li>
              <li>
                <a href="#/destination/menjangan">Pulau Menjangan</a>
              </li>
              <li>
                <a href="#/destination/wae-rebo">Kampung Adat Wae Rebo</a>
              </li>
              <li>
                <a href="#/destination/baluran">Savana &amp; Bakau Baluran</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Bacaan &amp; Jelajah</span>
            <ul className="footer-links">
              <li>
                <a href="#/explore">Katalog Destinasi</a>
              </li>
              <li>
                <a href="#/journal">Jurnal Lapangan</a>
              </li>
              <li>
                <a href="#/about">Tentang Kami</a>
              </li>
              <li>
                <a href="#/contact">Hubungi Kami</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-note">
            <strong>Catatan Prototipe (PRD v1.2):</strong> Seluruh harga, skor, jarak, dan metrik dampak adalah{' '}
            <em>data ilustrasi prototipe</em>. Faktor emisi mengacu pada asumsi prototipe (KLHK/ESDM &amp; DEFRA). Untuk
            produk nyata, Eco-Score wajib diaudit pihak independen. Foto berasal dari aset prototipe berlisensi bebas pakai.
          </p>
          <div className="row-between xs" style={{ opacity: 0.78, marginTop: '10px' }}>
            <span>© 2026 LestariWay — Prototipe Ekowisata Berkelanjutan</span>
            <span>60% untuk warga · 20% konservasi · 15% operasional · 5% platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
