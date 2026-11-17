import React from 'react';
import { formatRp } from '../utils/helpers';

export default function AllocationDonut({
  totalPrice,
  pax = 1,
  activeIdx = 0,
  onSelectSlice,
  idPrefix = 'donut',
}) {
  const total = totalPrice * pax;
  const slices = [
    { label: 'Warga Lokal & Adat', pct: 60, color: 'var(--primary)', note: 'Pemandu desa, homestay, dan koperasi' },
    { label: 'Dana Konservasi', pct: 20, color: '#297E5A', note: 'Bibit mangrove, karang, dan patroli' },
    { label: 'Operasional Lapangan', pct: 15, color: 'var(--cta)', note: 'Logistik lokal dan asuransi dasar' },
    { label: 'Platform LestariWay', pct: 5, color: 'var(--border)', note: 'Pemeliharaan situs & audit berkala' },
  ];

  const r = 40;
  const circ = 2 * Math.PI * r;
  let runningOffset = 0;

  const circles = slices.map((s, idx) => {
    const dash = (s.pct / 100) * circ;
    const currentOffset = runningOffset;
    runningOffset += dash;

    return (
      <circle
        key={idx}
        cx="50"
        cy="50"
        r={r}
        fill="transparent"
        stroke={s.color}
        strokeWidth={idx === activeIdx ? 18 : 14}
        strokeDasharray={`${dash.toFixed(2)} ${circ.toFixed(2)}`}
        strokeDashoffset={(-currentOffset).toFixed(2)}
        data-slice={idx}
        style={{ cursor: 'pointer' }}
        onClick={() => onSelectSlice && onSelectSlice(idx)}
      />
    );
  });

  const active = slices[activeIdx] || slices[0];
  const activeAmount = formatRp(Math.round((total * active.pct) / 100));

  return (
    <>
      <div className="donut-wrap horizontal">
        <div className="donut-box">
          <svg
            viewBox="0 0 100 100"
            width="148"
            height="148"
            style={{ transform: 'rotate(-90deg)' }}
            aria-label="Bagan alokasi biaya 60/20/15/5"
          >
            {circles}
          </svg>
          <div className="donut-center">
            <strong style={{ fontSize: '1.1rem' }}>{active.pct}%</strong>
            <span className="xs muted">{activeAmount}</span>
          </div>
        </div>
        <div className="legend-list">
          {slices.map((s, idx) => {
            const nominal = formatRp(Math.round((total * s.pct) / 100));
            return (
              <button
                key={idx}
                type="button"
                className={`legend-item ${idx === activeIdx ? 'active' : ''}`}
                data-donut-select={`${idPrefix}:${idx}`}
                onClick={() => onSelectSlice && onSelectSlice(idx)}
              >
                <span className="row-wrap" style={{ gap: '8px' }}>
                  <span className="dot" style={{ background: s.color }} />
                  <span>
                    <strong>{s.pct}%</strong> {s.label}
                  </span>
                </span>
                <strong>{nominal}</strong>
              </button>
            );
          })}
        </div>
      </div>
      <p className="xs muted" style={{ margin: '10px 0 0' }}>
        {active.label}: {active.note}
      </p>
    </>
  );
}
