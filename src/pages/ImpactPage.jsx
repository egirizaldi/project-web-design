import React, { useState, useEffect } from 'react';
import { DESTINATIONS, IMPACT_METRICS } from '../data/data';
import { useBooking } from '../context/BookingContext';
import { formatRp, getEmissionRange, FALLBACK_SVG } from '../utils/helpers';

export default function ImpactPage({ anchor }) {
  const [tab, setTab] = useState('desa');
  const { originCity, setOriginCity } = useBooking();

  useEffect(() => {
    if (anchor === 'metodologi' || anchor === 'asumsi') {
      setTab('rumus');
    }
  }, [anchor]);

  const desaView = (
    <div className="grid grid-4" style={{ gap: '20px' }}>
      {DESTINATIONS.map((d) => (
        <article key={d.slug} className="card dest-card">
          <div className="dest-img-wrap">
            <img
              src={d.images.hero}
              alt={d.name}
              width="480"
              height="360"
              className="eco-photo"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_SVG;
              }}
            />
            <div className="dest-overlay-top">
              <span className="score-pill">Eco-Score {d.ecoScore}</span>
            </div>
            <span className="quota-pill">Maks {d.quotaMax} tamu/hari</span>
          </div>
          <div className="dest-body" style={{ justifyContent: 'space-between' }}>
            <div className="stack-xs">
              <span className="xs muted">{d.location}</span>
              <h2 className="card-title">{d.shortName}</h2>
              <p className="xs muted" style={{ margin: 0 }}>
                {d.badges.join(' • ')}
              </p>
            </div>
            <div className="dest-meta">
              <div className="meta-row">
                <span>Untuk Warga (60%)</span>
                <strong style={{ color: 'var(--primary)' }}>
                  {formatRp(Math.round(d.price * 0.6))}/org
                </strong>
              </div>
            </div>
            <a href={`#/destination/${d.slug}`} className="btn btn-secondary" style={{ minHeight: '38px' }}>
              Buka Detail →
            </a>
          </div>
        </article>
      ))}
    </div>
  );

  const auditView = (
    <div className="stack-sm">
      <div className="row-between">
        <span className="small muted">Pilih kota asal untuk melihat rentang emisi:</span>
        <div className="pill-group">
          {['jakarta', 'surabaya', 'yogyakarta'].map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${originCity === c ? 'active' : ''}`}
              onClick={() => setOriginCity(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Destinasi</th>
              <th>Eco-Score</th>
              <th>Sub-Skor (L / Lk / K / E)</th>
              <th>Emisi PP ({originCity})</th>
              <th>Porsi Warga (60%)</th>
            </tr>
          </thead>
          <tbody>
            {DESTINATIONS.map((d) => (
              <tr key={d.slug}>
                <td>
                  <a
                    href={`#/destination/${d.slug}`}
                    style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'underline' }}
                  >
                    {d.name}
                  </a>
                </td>
                <td>
                  <strong>{d.ecoScore}</strong> <span className="xs muted">({d.ecoScoreRaw})</span>
                </td>
                <td>
                  {d.subScores.limbah} / {d.subScores.lokal} / {d.subScores.konservasi} / {d.subScores.energi}
                </td>
                <td>{getEmissionRange(d, originCity)}</td>
                <td>{formatRp(Math.round(d.price * 0.6))} / org</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const rumusView = (
    <div className="grid grid-2" style={{ gap: '20px' }}>
      <div className="card card-pad stack-sm" id="metodologi">
        <span className="eyebrow">1. Cara Hitung Eco-Score</span>
        <h2 className="card-title">Empat pilar dengan bobot tetap</h2>
        <div className="stack-xs small">
          <div className="row-between">
            <span>Pengelolaan Sampah &amp; Nol Plastik</span>
            <strong>30%</strong>
          </div>
          <div className="row-between">
            <span>Kepemilikan &amp; Tenaga Kerja Warga</span>
            <strong>30%</strong>
          </div>
          <div className="row-between">
            <span>Aksi Konservasi Habitat</span>
            <strong>20%</strong>
          </div>
          <div className="row-between">
            <span>Efisiensi Energi &amp; Air</span>
            <strong>20%</strong>
          </div>
        </div>
        <p className="xs muted" style={{ margin: 0 }}>
          Pada prototipe, angka sub-skor bersifat ilustrasi. Untuk produk nyata, penilaian wajib diaudit pihak independen
          dan dipublikasikan.
        </p>
      </div>

      <div className="card card-pad stack-sm" id="asumsi">
        <span className="eyebrow">2. Cara Hitung Emisi &amp; Mangrove</span>
        <h2 className="card-title">Jarak Pulang-Pergi × Faktor Moda</h2>
        <div className="stack-xs small">
          <div className="row-between">
            <span>Kereta Api</span>
            <strong>0,041 kg CO2e / km</strong>
          </div>
          <div className="row-between">
            <span>Bus / Travel Bersama</span>
            <strong>0,089 kg CO2e / km</strong>
          </div>
          <div className="row-between">
            <span>Pesawat Domestik</span>
            <strong>0,255 kg CO2e / km</strong>
          </div>
        </div>
        <p className="xs muted" style={{ margin: 0 }}>
          Asumsi prototipe merujuk KLHK/ESDM &amp; DEFRA/ICAO. 1 bibit mangrove (Rp 15.000) diasumsikan menyerap
          rata-rata 22 kg CO2e selama masa tumbuh.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="proto-banner">
        <div className="container">
          <strong>Data simulasi untuk prototipe</strong> — Periode Jan–Okt 2026 (PRD v1.2).
        </div>
      </div>

      <section className="impact-band" style={{ padding: '36px 0' }}>
        <div className="container stack-md">
          <div className="stack-xs" style={{ maxWidth: '640px' }}>
            <span className="eyebrow" style={{ color: '#E8A889' }}>
              Transparansi Berjalan
            </span>
            <h1
              className="display-title"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#F8F5F0' }}
            >
              Laporan Dampak LestariWay
            </h1>
            <p className="small" style={{ margin: 0, opacity: 0.86 }}>
              Ringkasan simulasi Jan–Okt 2026. Klik tab di bawah untuk melihat desa mitra, matriks audit, atau rumus hitung.
            </p>
          </div>
          <div className="grid grid-4" style={{ gap: '16px' }}>
            {IMPACT_METRICS.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(248,245,240,0.08)',
                  border: '1px solid rgba(248,245,240,0.16)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                }}
              >
                <div className="impact-stat-val">{m.value}</div>
                <div className="small" style={{ fontWeight: 600, marginTop: '4px' }}>
                  {m.label}
                </div>
                <div className="xs" style={{ opacity: 0.78, marginTop: '4px' }}>
                  {m.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-md">
          <div className="pill-group" role="tablist" aria-label="Tampilan laporan dampak">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'desa'}
              className={`chip ${tab === 'desa' ? 'active' : ''}`}
              onClick={() => setTab('desa')}
            >
              4 Desa Mitra
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'audit'}
              className={`chip ${tab === 'audit' ? 'active' : ''}`}
              onClick={() => setTab('audit')}
            >
              Tabel Audit Destinasi
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'rumus'}
              className={`chip ${tab === 'rumus' ? 'active' : ''}`}
              onClick={() => setTab('rumus')}
            >
              Cara Kami Menghitung
            </button>
          </div>

          {tab === 'desa' ? desaView : tab === 'audit' ? auditView : rumusView}
        </div>
      </section>
    </>
  );
}
