import React, { useState } from 'react';
import { DESTINATIONS, IMPACT_METRICS, STORYTELLER, LEAVE_NO_TRACE, EMISSION_FACTORS, MANGROVE_PRICE } from '../data/data';
import { formatRp, calcSeedlings, getDestBySlug, getEmissionRange, FALLBACK_SVG } from '../utils/helpers';
import AllocationDonut from '../components/AllocationDonut';

export default function HomePage() {
  const [heroFeatureSlug, setHeroFeatureSlug] = useState('nglanggeran');
  const [selectedHomeCat, setSelectedHomeCat] = useState('Semua');
  const [homeScore, setHomeScore] = useState(85);

  const [donutSlug, setDonutSlug] = useState('nglanggeran');
  const [donutPax, setDonutPax] = useState(1);
  const [donutActiveSlice, setDonutActiveSlice] = useState(0);

  const [estRoute, setEstRoute] = useState('nglanggeran');
  const [estMode, setEstMode] = useState('kereta');

  const featDest = getDestBySlug(heroFeatureSlug) || DESTINATIONS[0];
  const donutDest = getDestBySlug(donutSlug) || DESTINATIONS[0];
  const estDest = getDestBySlug(estRoute) || DESTINATIONS[0];

  const estCo2 = estDest.emissions.jakarta[estMode];
  const flightCo2 = estDest.emissions.jakarta.pesawat;
  const savedPct = estCo2 && flightCo2 ? Math.round(((flightCo2 - estCo2) / flightCo2) * 100) : 0;
  const seedlings = estCo2 ? calcSeedlings(estCo2) : 0;
  const acHours = estCo2 && flightCo2 ? Math.round((flightCo2 - estCo2) / 0.7) : 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.hash = `#/explore?cat=${encodeURIComponent(selectedHomeCat)}&score=${homeScore}`;
  };

  const handleRouteSelect = (slug) => {
    setEstRoute(slug);
    const d = getDestBySlug(slug);
    if (d.emissions.jakarta[estMode] === null) {
      setEstMode(d.emissions.jakarta.kereta !== null ? 'kereta' : 'bus');
    }
  };

  return (
    <>
      <div className="proto-banner">
        <div className="container row-between">
          <span>
            <strong>Data ilustrasi prototipe</strong> — Skor, harga, dan emisi mengikuti rumus terbuka PRD v1.2.
          </span>
          <a href="#/impact#metodologi" className="xs" style={{ textDecoration: 'underline' }}>
            Lihat rumus
          </a>
        </div>
      </div>

      {/* Split Editorial Hero */}
      <section className="hero-editorial">
        <div className="container hero-split">
          <div className="stack-md">
            <div className="stack-xs">
              <span className="eyebrow">Ekowisata Terverifikasi Nusantara</span>
              <h1 className="display-title">Jelajahi Alam, Tinggalkan Jejak Kebaikan.</h1>
              <p className="muted" style={{ fontSize: '1.05rem', margin: 0, maxWidth: '540px' }}>
                60% biaya perjalananmu langsung ke kas warga lokal, kuota tamu dibatasi ketat, dan jejak karbonnya
                dihitung jujur dari kota asalmu.
              </p>
            </div>

            <form className="hero-search-box" id="homeSearchForm" onSubmit={handleSearchSubmit}>
              <div>
                <span className="field-label">Pilih Ekosistem</span>
                <div className="pill-group" id="homeCatChips">
                  {['Semua', 'Desa Adat', 'Konservasi Laut', 'Hutan Pegunungan', 'Pesisir & Satwa'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`chip ${selectedHomeCat === c ? 'active' : ''}`}
                      onClick={() => setSelectedHomeCat(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="row-between" style={{ alignItems: 'flex-end' }}>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <div className="row-between" style={{ marginBottom: '4px' }}>
                    <label className="field-label" htmlFor="homeScoreSlider" style={{ margin: 0 }}>
                      Eco-Score Minimal
                    </label>
                    <span className="badge" id="homeScoreLabel">
                      Skor ≥ {homeScore}
                    </span>
                  </div>
                  <input
                    id="homeScoreSlider"
                    type="range"
                    min="80"
                    max="95"
                    step="5"
                    value={homeScore}
                    onChange={(e) => setHomeScore(Number(e.target.value))}
                  />
                </div>
                <button type="submit" className="btn btn-cta">
                  Temukan Destinasi
                </button>
              </div>
            </form>
          </div>

          <div>
            <a href={`#/destination/${featDest.slug}`} className="hero-visual-frame" style={{ display: 'block' }}>
              <img
                src={featDest.images.hero}
                alt={`${featDest.name} di ${featDest.location}`}
                width="800"
                height="600"
                className="eco-photo"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_SVG;
                }}
              />
              <div className="hero-visual-overlay">
                <div>
                  <span className="xs" style={{ opacity: 0.85 }}>
                    {featDest.location} • {featDest.duration}
                  </span>
                  <div className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 600 }}>
                    {featDest.name}
                  </div>
                </div>
                <span className="score-pill">Eco-Score {featDest.ecoScore}</span>
              </div>
            </a>
            <div className="hero-thumb-bar" aria-label="Pratinjau destinasi unggulan">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  className={`hero-thumb-btn ${d.slug === featDest.slug ? 'active' : ''}`}
                  onClick={() => setHeroFeatureSlug(d.slug)}
                >
                  {d.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinasi Pilihan */}
      <section className="section-alt">
        <div className="container stack-md">
          <div className="row-between">
            <div>
              <span className="eyebrow">Kurasi Terbatas</span>
              <h2 className="section-title">Empat Destinasi Mitra</h2>
            </div>
            <a href="#/explore" className="btn btn-secondary">
              Filter &amp; Bandingkan
            </a>
          </div>
          <div className="grid grid-4">
            {DESTINATIONS.map((d) => {
              const range = getEmissionRange(d, 'jakarta');
              return (
                <article key={d.slug} className="card dest-card">
                  <div className="dest-img-wrap">
                    <img
                      src={d.images.hero}
                      alt={`${d.name} di ${d.location}`}
                      width="640"
                      height="480"
                      className="eco-photo"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_SVG;
                      }}
                    />
                    <div className="dest-overlay-top">
                      <span className="score-pill">Eco-Score {d.ecoScore}</span>
                      <span className="badge">{d.badges[0]}</span>
                    </div>
                    <span className="quota-pill">
                      Sisa {d.quotaLeft}/{d.quotaMax} kursi
                    </span>
                  </div>
                  <div className="dest-body">
                    <div>
                      <span className="xs muted">
                        {d.location} • {d.duration}
                      </span>
                      <h3 className="card-title" style={{ marginTop: '4px' }}>
                        {d.name}
                      </h3>
                    </div>
                    <div className="dest-meta">
                      <div className="meta-row">
                        <span className="muted">Emisi PP (Jakarta)</span>
                        <strong>{range}</strong>
                      </div>
                      <div className="meta-row">
                        <span className="muted">Paket</span>
                        <strong style={{ color: 'var(--primary)' }}>{formatRp(d.price)}/org</strong>
                      </div>
                    </div>
                    <a href={`#/destination/${d.slug}`} className="btn btn-secondary" style={{ width: '100%' }}>
                      Lihat Rincian
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compact Dampak Terkini Strip */}
      <section className="impact-band" aria-label="Dampak Terkini">
        <div className="container impact-strip-grid">
          {IMPACT_METRICS.map((m, idx) => (
            <div key={idx}>
              <div className="impact-stat-val">{m.value}</div>
              <div className="xs" style={{ opacity: 0.86 }}>
                {m.label}
              </div>
            </div>
          ))}
          <div>
            <a href="#/impact" className="btn btn-cta" style={{ minHeight: '40px' }}>
              Laporan &amp; Rumus →
            </a>
            <div className="xs" style={{ opacity: 0.75, marginTop: '4px' }}>
              Simulasi Jan–Okt 2026
            </div>
          </div>
        </div>
      </section>

      {/* Transparansi Interaktif: 60/20/15/5 + Mini Carbon Estimator */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '24px', alignItems: 'stretch' }}>
            {/* Kiri: Donat 60/20/15/5 */}
            <div className="card card-pad stack-sm">
              <div className="row-between">
                <div>
                  <span className="eyebrow">Alokasi Biaya</span>
                  <h2 className="card-title">Ke Mana Uangmu Pergi?</h2>
                </div>
                <div className="row-wrap">
                  <select
                    id="homeDonutSelect"
                    className="select"
                    style={{ minHeight: '36px', padding: '4px 8px', width: 'auto' }}
                    aria-label="Pilih destinasi simulasi biaya"
                    value={donutSlug}
                    onChange={(e) => setDonutSlug(e.target.value)}
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.shortName}
                      </option>
                    ))}
                  </select>
                  <select
                    id="homePaxSelect"
                    className="select"
                    style={{ minHeight: '36px', padding: '4px 8px', width: 'auto' }}
                    aria-label="Jumlah peserta"
                    value={donutPax}
                    onChange={(e) => setDonutPax(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} org
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div id="homeDonutContainer">
                <AllocationDonut
                  totalPrice={donutDest.price}
                  pax={donutPax}
                  activeIdx={donutActiveSlice}
                  onSelectSlice={(idx) => setDonutActiveSlice(idx)}
                  idPrefix="home"
                />
              </div>
              <a href="#/impact#metodologi" className="xs" style={{ color: 'var(--cta)', fontWeight: 600 }}>
                Lihat rumus Eco-Score 4 pilar (30/30/20/20) →
              </a>
            </div>

            {/* Kanan: Mini Carbon Estimator */}
            <div className="card card-pad stack-sm" style={{ background: 'var(--surface)' }}>
              <div>
                <span className="eyebrow">Kalkulator Emisi (Jakarta PP)</span>
                <h2 className="card-title">Bandingkan Moda Transportasimu</h2>
              </div>
              <div className="grid grid-2" style={{ gap: '10px' }}>
                <div>
                  <label className="field-label" htmlFor="estRoute">
                    Tujuan
                  </label>
                  <select
                    id="estRoute"
                    className="select"
                    style={{ minHeight: '40px' }}
                    value={estRoute}
                    onChange={(e) => handleRouteSelect(e.target.value)}
                  >
                    {DESTINATIONS.filter((d) => d.slug !== 'wae-rebo').map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.shortName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="field-label">Estimasi</span>
                  <div
                    className="row-between"
                    style={{
                      minHeight: '40px',
                      padding: '0 10px',
                      background: 'var(--surface-card)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-decor)',
                    }}
                  >
                    <strong>{estCo2} kg CO2e</strong>
                    <span className="xs" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                      {savedPct > 0 ? `-${savedPct}%` : 'Maks'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-3" style={{ gap: '8px' }} id="estModes">
                {['kereta', 'bus', 'pesawat'].map((m) => {
                  const val = estDest.emissions.jakarta[m];
                  const disabled = val === null;
                  return (
                    <button
                      key={m}
                      type="button"
                      className={`mode-card ${estMode === m && !disabled ? 'active' : ''}`}
                      disabled={disabled}
                      title={disabled ? 'Moda tidak tersedia untuk rute ini' : ''}
                      onClick={() => !disabled && setEstMode(m)}
                    >
                      <strong className="xs">{EMISSION_FACTORS[m].label}</strong>
                      <span className="xs muted">{disabled ? 'N/A' : `${val} kg`}</span>
                    </button>
                  );
                })}
              </div>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${Math.min(100, Math.round((estCo2 / flightCo2) * 100))}%`,
                    background: savedPct > 0 ? 'var(--primary)' : 'var(--cta)',
                  }}
                />
              </div>
              <p className="xs muted" style={{ margin: 0 }}>
                {acHours > 0
                  ? `Hemat setara mematikan AC kamar ~${acHours} jam. `
                  : 'Pilih darat bila memungkinkan. '}
                Offset: <strong>{seedlings} bibit mangrove</strong> ({formatRp(seedlings * MANGROVE_PRICE)}).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Storyteller + Leave No Trace Split */}
      <section className="section-alt">
        <div className="container">
          <div className="stack-lg">
            {/* Storyteller Full-Width Balanced Editorial Band */}
            <div className="card card-pad">
              <div className="story-card">
                <div className="story-photo">
                  <img
                    src={STORYTELLER.photo}
                    alt={`${STORYTELLER.name}, ${STORYTELLER.role}`}
                    width="320"
                    height="320"
                    className="eco-photo"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_SVG;
                    }}
                  />
                </div>
                <div className="stack-xs">
                  <span className="eyebrow">Cerita Penjaga Alam</span>
                  <p className="font-serif" style={{ fontSize: '1.25rem', lineHeight: 1.4, margin: 0 }}>
                    “{STORYTELLER.quote}”
                  </p>
                  <p className="small muted" style={{ margin: 0 }}>
                    {STORYTELLER.body}
                  </p>
                  <div className="row-between" style={{ paddingTop: '6px' }}>
                    <div>
                      <strong className="small">{STORYTELLER.name}</strong>{' '}
                      <span className="xs muted">— {STORYTELLER.role}</span>
                      <div className="xs muted">
                        <em>{STORYTELLER.label}.</em>
                      </div>
                    </div>
                    <a
                      href="#/destination/nglanggeran"
                      className="btn btn-secondary"
                      style={{ minHeight: '38px', padding: '6px 14px' }}
                    >
                      Kunjungi Nglanggeran →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave No Trace */}
            <div className="stack-sm">
              <div className="row-between">
                <div>
                  <span className="eyebrow">Etika Alam Bebas</span>
                  <h2 className="section-title">7 Prinsip Leave No Trace</h2>
                </div>
                <a href="#/journal" className="small" style={{ color: 'var(--cta)', fontWeight: 600 }}>
                  Baca panduan kemas nol sampah →
                </a>
              </div>
              <div className="grid grid-4" style={{ gap: '12px' }}>
                {LEAVE_NO_TRACE.map((item) => (
                  <div
                    key={item.num}
                    className="lnt-row"
                    style={{ background: 'var(--surface-card)', border: '1px solid var(--border-decor)' }}
                  >
                    <span className="lnt-num">{item.num}</span>
                    <div>
                      <strong className="small" style={{ display: 'block' }}>
                        {item.title}
                      </strong>
                      <span className="xs muted">{item.text}</span>
                    </div>
                  </div>
                ))}
                <a
                  href="#/explore"
                  className="lnt-row"
                  style={{ background: 'var(--primary)', color: '#F8F5F0', alignItems: 'center' }}
                >
                  <span className="lnt-num" style={{ color: '#E8A889' }}>
                    →
                  </span>
                  <div>
                    <strong className="small" style={{ display: 'block' }}>
                      Siap Berangkat?
                    </strong>
                    <span className="xs" style={{ opacity: 0.85 }}>
                      Pilih destinasi yang sesuai ritmemu
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
