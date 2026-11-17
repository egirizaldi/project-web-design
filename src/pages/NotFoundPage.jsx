import React from 'react';
import { DESTINATIONS } from '../data/data';

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div className="card card-pad stack-md">
          <span className="eyebrow">404 — Halaman Tidak Ditemukan</span>
          <h1 className="section-title">Rute yang kamu cari tidak tersedia.</h1>
          <p className="small muted" style={{ margin: 0 }}>
            Pilih salah satu dari empat destinasi mitra LestariWay di bawah ini:
          </p>
          <div className="row-wrap" style={{ justifyContent: 'center' }}>
            {DESTINATIONS.map((d) => (
              <a key={d.slug} href={`#/destination/${d.slug}`} className="btn btn-secondary">
                {d.shortName}
              </a>
            ))}
          </div>
          <div>
            <a href="#/" className="btn btn-cta">
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
