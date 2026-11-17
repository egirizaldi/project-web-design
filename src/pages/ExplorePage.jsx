import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/data';
import { useBooking } from '../context/BookingContext';
import { formatRp, getEmissionRange, getLowestEmission, FALLBACK_SVG } from '../utils/helpers';

export default function ExplorePage({ queryParams }) {
  const { originCity, setOriginCity } = useBooking();

  const [category, setCategory] = useState('Semua');
  const [minScore, setMinScore] = useState(80);
  const [quotaOnly, setQuotaOnly] = useState(true);
  const [sort, setSort] = useState('score-desc');

  useEffect(() => {
    if (queryParams) {
      if (queryParams.has('cat')) setCategory(queryParams.get('cat'));
      if (queryParams.has('score')) setMinScore(Number(queryParams.get('score')) || 80);
    }
  }, [queryParams]);

  const filtered = DESTINATIONS.filter((d) => {
    if (category !== 'Semua' && d.filterCategory !== category) return false;
    if (d.ecoScore < minScore) return false;
    if (quotaOnly && d.quotaLeft <= 0) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'score-desc') return b.ecoScore - a.ecoScore;
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'quota-asc') return a.quotaLeft - b.quotaLeft;
    if (sort === 'emission-asc') {
      return getLowestEmission(a, originCity) - getLowestEmission(b, originCity);
    }
    return 0;
  });

  const handleReset = () => {
    setCategory('Semua');
    setMinScore(80);
    setQuotaOnly(true);
    setSort('score-desc');
    window.location.hash = '#/explore';
  };

  return (
    <section className="section" style={{ paddingTop: '28px' }}>
      <div className="container stack-md">
        <div className="row-between">
          <div>
            <span className="eyebrow">Katalog Terverifikasi</span>
            <h1 className="section-title">Eksplorasi Destinasi</h1>
          </div>
          <div className="row-wrap">
            <span className="xs muted">Kota Asal:</span>
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

        <div className="explore-layout">
          <aside className="card card-pad filter-sidebar stack-md">
            <div className="row-between">
              <h2 style={{ fontSize: '1rem' }}>Filter Audit</h2>
              <button
                type="button"
                id="sidebarResetBtn"
                className="xs"
                style={{ background: 'none', border: 0, color: 'var(--cta)', fontWeight: 700, cursor: 'pointer' }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            <div className="stack-xs">
              <span className="field-label">Kategori</span>
              {['Semua', 'Desa Adat', 'Konservasi Laut', 'Hutan Pegunungan', 'Pesisir & Satwa'].map((c) => (
                <label key={c} className="row-wrap small" style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="expCat"
                    value={c}
                    checked={category === c}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            <div className="stack-xs">
              <span className="field-label">Eco-Score Minimal</span>
              {[
                { v: 80, l: 'Semua (≥ 80)' },
                { v: 90, l: 'Tinggi (≥ 90)' },
                { v: 95, l: 'Eksepsional (≥ 95)' },
              ].map((o) => (
                <label key={o.v} className="row-wrap small" style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="expScore"
                    value={o.v}
                    checked={minScore === o.v}
                    onChange={(e) => setMinScore(Number(e.target.value))}
                  />
                  <span>{o.l}</span>
                </label>
              ))}
            </div>

            <label className="row-wrap small" style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                id="expQuota"
                checked={quotaOnly}
                onChange={(e) => setQuotaOnly(e.target.checked)}
              />
              <span>Hanya yang punya sisa kuota</span>
            </label>

            <div>
              <label className="field-label" htmlFor="expSort">
                Urutkan
              </label>
              <select id="expSort" className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="score-desc">Eco-Score Tertinggi</option>
                <option value="emission-asc">Emisi Terendah</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="quota-asc">Kuota Terbatas</option>
              </select>
            </div>
          </aside>

          <div className="stack-md">
            <div className="row-between">
              <p className="small muted" style={{ margin: 0 }}>
                Menampilkan <strong>{filtered.length}</strong> destinasi (data ilustrasi prototipe)
              </p>
            </div>

            <div className="stack-md">
              {filtered.length === 0 ? (
                <div className="card card-pad stack-sm" style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    style={{ margin: '0 auto' }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                  <h3 className="card-title">Tidak ada destinasi yang cocok</h3>
                  <p className="small muted" style={{ margin: 0 }}>
                    Filter skor atau kategori saat ini terlalu ketat.
                  </p>
                  <div>
                    <button id="resetExploreBtn" type="button" className="btn btn-cta" onClick={handleReset}>
                      Reset Semua Filter
                    </button>
                  </div>
                </div>
              ) : (
                filtered.map((d) => {
                  const range = getEmissionRange(d, originCity);
                  const localShare = formatRp(Math.round(d.price * 0.6));
                  return (
                    <article key={d.slug} className="card explore-card">
                      <div className="dest-img-wrap">
                        <img
                          src={d.images.hero}
                          alt={`${d.name} di ${d.location}`}
                          width="600"
                          height="450"
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
                        <span className="quota-pill">
                          Sisa {d.quotaLeft}/{d.quotaMax} kuota
                        </span>
                      </div>
                      <div className="dest-body" style={{ justifyContent: 'space-between' }}>
                        <div className="stack-xs">
                          <span className="xs muted">
                            {d.location} • {d.duration}
                          </span>
                          <h2 className="card-title">{d.name}</h2>
                          <p className="small muted" style={{ margin: 0 }}>
                            {d.summary}
                          </p>
                          <div className="row-wrap" style={{ marginTop: '4px' }}>
                            {d.badges.map((b, i) => (
                              <span key={i} className="badge">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div
                          className="row-between"
                          style={{ borderTop: '1px solid var(--border-decor)', paddingTop: '12px' }}
                        >
                          <div>
                            <span className="xs muted">
                              Emisi PP ({originCity}): <strong>{range}</strong>
                            </span>
                            <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                              {formatRp(d.price)}{' '}
                              <span className="xs muted" style={{ fontWeight: 400 }}>
                                /org
                              </span>
                            </div>
                            <span className="xs" style={{ color: 'var(--primary)' }}>
                              {localShare} (60%) langsung ke warga
                            </span>
                          </div>
                          <a href={`#/destination/${d.slug}`} className="btn btn-cta">
                            Lihat Rincian
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
