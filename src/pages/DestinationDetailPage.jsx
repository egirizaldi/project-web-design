import React, { useState } from 'react';
import { getDestBySlug, formatRp, calcSeedlings, FALLBACK_SVG } from '../utils/helpers';
import { EMISSION_FACTORS, MANGROVE_PRICE } from '../data/data';
import { useBooking } from '../context/BookingContext';
import AllocationDonut from '../components/AllocationDonut';
import NotFoundPage from './NotFoundPage';

export default function DestinationDetailPage({ slug }) {
  const dest = getDestBySlug(slug);
  const { originCity, setOriginCity, openBookingDrawer } = useBooking();
  const [activeSlice, setActiveSlice] = useState(0);

  if (!dest) {
    return <NotFoundPage />;
  }

  const sub = dest.subScores;
  const cityEmissions = dest.emissions[originCity] || {};

  return (
    <section className="section" style={{ paddingTop: '24px' }}>
      <div className="container stack-md">
        <nav aria-label="Breadcrumb" className="row-wrap xs muted">
          <a href="#/">Beranda</a>
          <span>/</span>
          <a href="#/explore">Eksplorasi</a>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>{dest.shortName}</span>
        </nav>

        <div className="row-between" style={{ alignItems: 'flex-end' }}>
          <div className="stack-xs" style={{ maxWidth: '720px' }}>
            <div className="row-wrap">
              <span className="badge">{dest.category}</span>
              <span className="badge badge-neutral">{dest.duration}</span>
              <span className="badge badge-neutral">{dest.location}</span>
            </div>
            <h1 className="display-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              {dest.name}
            </h1>
            <p className="muted" style={{ margin: 0 }}>
              {dest.summary}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-cta"
            id="openDrawerHeroBtn"
            onClick={(e) => openBookingDrawer(dest.slug, e.currentTarget)}
          >
            Pesan Perjalanan — {formatRp(dest.price)}
          </button>
        </div>

        {/* Galeri 3:2 */}
        <div className="detail-gallery">
          <div className="detail-gallery-main">
            <img
              src={dest.images.hero}
              alt={`${dest.name} pemandangan utama`}
              width="900"
              height="600"
              className="eco-photo"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_SVG;
              }}
            />
          </div>
          <div className="detail-gallery-side">
            <div>
              <img
                src={dest.images.side1}
                alt={`${dest.name} akomodasi dan lingkungan`}
                width="600"
                height="400"
                className="eco-photo"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_SVG;
                }}
              />
            </div>
            <div>
              <img
                src={dest.images.side2}
                alt={`${dest.name} aktivitas konservasi`}
                width="600"
                height="400"
                className="eco-photo"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_SVG;
                }}
              />
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div className="stack-lg">
            {/* Eco-Score Breakdown */}
            <div className="card card-pad stack-md">
              <div className="row-between">
                <div>
                  <span className="eyebrow">Eco-Score</span>
                  <h2 className="section-title">
                    Skor {dest.ecoScore}/100 ({dest.ecoScoreRaw})
                  </h2>
                </div>
                <span className="xs muted">Penilaian ilustrasi prototipe, belum diaudit</span>
              </div>
              <div className="grid grid-2">
                <div>
                  <div className="row-between small">
                    <span>Pengelolaan Sampah (30%)</span>
                    <strong>{sub.limbah}/100</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${sub.limbah}%` }} />
                  </div>
                </div>
                <div>
                  <div className="row-between small">
                    <span>Ekonomi Warga Lokal (30%)</span>
                    <strong>{sub.lokal}/100</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${sub.lokal}%` }} />
                  </div>
                </div>
                <div>
                  <div className="row-between small">
                    <span>Konservasi Alam (20%)</span>
                    <strong>{sub.konservasi}/100</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${sub.konservasi}%` }} />
                  </div>
                </div>
                <div>
                  <div className="row-between small">
                    <span>Efisiensi Energi &amp; Air (20%)</span>
                    <strong>{sub.energi}/100</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${sub.energi}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Impact Breakdown + Table Alternative */}
            <div className="card card-pad stack-md">
              <div>
                <span className="eyebrow">Transparansi Biaya 60/20/15/5</span>
                <h2 className="section-title">Rincian Paket {formatRp(dest.price)} / Orang</h2>
              </div>
              <div id="detailDonutWrap">
                <AllocationDonut
                  totalPrice={dest.price}
                  pax={1}
                  activeIdx={activeSlice}
                  onSelectSlice={(idx) => setActiveSlice(idx)}
                  idPrefix="detail"
                />
              </div>
              <div className="table-wrap">
                <table aria-label="Tabel rincian alokasi biaya per peserta">
                  <thead>
                    <tr>
                      <th>Pos Alokasi</th>
                      <th>Persentase</th>
                      <th>Nominal / Orang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Warga Lokal & Adat', pct: '60%', amount: formatRp(Math.round(dest.price * 0.6)) },
                      { label: 'Dana Konservasi', pct: '20%', amount: formatRp(Math.round(dest.price * 0.2)) },
                      { label: 'Operasional Lapangan', pct: '15%', amount: formatRp(Math.round(dest.price * 0.15)) },
                      { label: 'Platform LestariWay', pct: '5%', amount: formatRp(Math.round(dest.price * 0.05)) },
                    ].map((item, idx) => (
                      <tr
                        key={idx}
                        className={`clickable-row ${activeSlice === idx ? 'active-row' : ''}`}
                        onClick={() => setActiveSlice(idx)}
                        title="Klik untuk menyorot di diagram donat"
                      >
                        <td>
                          <span className="row-wrap" style={{ gap: '8px' }}>
                            {activeSlice === idx && <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>●</span>}
                            <span>{item.label}</span>
                          </span>
                        </td>
                        <td><strong>{item.pct}</strong></td>
                        <td>{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Carbon Comparison by Origin City */}
            <div className="card card-pad stack-md">
              <div className="row-between">
                <div>
                  <span className="eyebrow">Jejak Karbon Perjalanan</span>
                  <h2 className="section-title">
                    Dari {originCity.charAt(0).toUpperCase() + originCity.slice(1)}
                  </h2>
                </div>
                <div className="row-wrap">
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
              <p className="small muted" style={{ margin: 0 }}>
                {dest.honestNote}
              </p>
              <div className="grid grid-3">
                {['kereta', 'bus', 'pesawat'].map((m) => {
                  const val = cityEmissions[m];
                  const note = dest.distanceNotes[originCity] ? dest.distanceNotes[originCity][m] : '';
                  const seeds = val !== null ? calcSeedlings(val) : 0;
                  return (
                    <div key={m} className="card card-pad stack-xs" style={{ background: 'var(--surface)' }}>
                      <strong>{EMISSION_FACTORS[m].label}</strong>
                      <div className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                        {val !== null ? `${val} kg CO2e` : 'N/A'}
                      </div>
                      <span className="xs muted">{note}</span>
                      {val !== null && (
                        <span className="xs" style={{ color: 'var(--primary)' }}>
                          Offset: {seeds} bibit ({formatRp(seeds * MANGROVE_PRICE)})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checklist Leave No Trace */}
            <div className="card card-pad stack-sm">
              <span className="eyebrow">Persiapan Lapangan</span>
              <h2 className="card-title">Aturan Khusus {dest.shortName}</h2>
              <ul style={{ margin: 0, paddingLeft: '20px' }} className="stack-xs small">
                {dest.checklist.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <aside className="card card-pad detail-sticky stack-md">
            <div>
              <span className="xs muted">Harga Paket ({dest.duration})</span>
              <div className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 600 }}>
                {formatRp(dest.price)}{' '}
                <span className="xs muted" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
                  / orang
                </span>
              </div>
              <span className="xs" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {formatRp(Math.round(dest.price * 0.6))} langsung ke warga desa
              </span>
            </div>
            <div className="dest-meta">
              <div className="meta-row">
                <span>Kuota Harian</span>
                <strong>
                  Sisa {dest.quotaLeft} dari {dest.quotaMax}
                </strong>
              </div>
              <div className="meta-row">
                <span>Eco-Score</span>
                <strong>{dest.ecoScore}/100</strong>
              </div>
              <div className="meta-row">
                <span>Kota Asal Aktif</span>
                <strong>{originCity}</strong>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-cta"
              id="openDrawerSideBtn"
              style={{ width: '100%' }}
              onClick={(e) => openBookingDrawer(dest.slug, e.currentTarget)}
            >
              Pesan Perjalanan
            </button>
            <p className="xs muted" style={{ margin: 0 }}>
              Harga belum termasuk transportasi dari kota asal. Pemesanan bersifat simulasi prototipe.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
