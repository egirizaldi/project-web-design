import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/data';

export default function JournalPage() {
  const [filter, setFilter] = useState('Semua');
  const [activeSlug, setActiveSlug] = useState(null);

  const categories = ['Semua', 'Zero-Waste Travel', 'Budaya Lokal', 'Pelestarian Alam'];

  if (activeSlug) {
    const art = JOURNAL_ARTICLES.find((a) => a.slug === activeSlug);
    if (art) {
      return (
        <section className="section">
          <div className="container" style={{ maxWidth: '760px' }}>
            <button
              type="button"
              className="btn btn-ghost"
              id="backJournalBtn"
              style={{ marginBottom: '18px' }}
              onClick={() => setActiveSlug(null)}
            >
              ← Kembali ke Jurnal
            </button>
            <div className="stack-sm">
              <div className="row-wrap">
                <span className="badge">{art.category}</span>
                <span className="xs muted">{art.readTime}</span>
              </div>
              <h1 className="display-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                {art.title}
              </h1>
              <p className="muted" style={{ fontSize: '1.0625rem' }}>
                {art.excerpt}
              </p>
              <hr style={{ border: 0, borderTop: '1px solid var(--border-decor)', width: '100%' }} />
              {art.body.map((p, idx) => (
                <p key={idx} style={{ margin: '0 0 12px' }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      );
    }
  }

  const list = JOURNAL_ARTICLES.filter((a) => filter === 'Semua' || a.category === filter);

  return (
    <section className="section">
      <div className="container stack-md">
        <div>
          <span className="eyebrow">Catatan Lapangan</span>
          <h1 className="section-title">Jurnal Perjalanan Bertanggung Jawab</h1>
        </div>
        <div className="pill-group">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-3">
          {list.map((a) => (
            <article
              key={a.slug}
              className="card card-pad stack-sm"
              style={{ justifyContent: 'space-between' }}
            >
              <div className="stack-xs">
                <div className="row-between">
                  <span className="badge">{a.category}</span>
                  <span className="xs muted">{a.readTime}</span>
                </div>
                <h2 className="card-title">{a.title}</h2>
                <p className="small muted" style={{ margin: 0 }}>
                  {a.excerpt}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveSlug(a.slug)}
              >
                Baca Artikel
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
