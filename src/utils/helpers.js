import { DESTINATIONS, MANGROVE_ABSORPTION_KG } from '../data/data';

export function formatRp(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

export function calcSeedlings(co2) {
  return Math.ceil(co2 / MANGROVE_ABSORPTION_KG);
}

export function getDestBySlug(slug) {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function getEmissionRange(dest, city) {
  const e = dest.emissions[city];
  if (!e) return 'N/A';
  const vals = Object.values(e).filter((v) => typeof v === 'number');
  if (vals.length === 0) return 'N/A';
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  return min === max ? `${min} kg CO2e` : `${min}–${max} kg CO2e`;
}

export function getLowestEmission(dest, city) {
  if (!dest.emissions[city]) return 9999;
  const vals = Object.values(dest.emissions[city]).filter((v) => typeof v === 'number');
  return vals.length ? Math.min(...vals) : 9999;
}

export const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#E4DFD4"/><path d="M0 440 L210 250 L380 390 L560 210 L800 430 L800 600 L0 600 Z" fill="#1B4332" opacity="0.82"/><circle cx="620" cy="140" r="46" fill="#B8512B" opacity="0.85"/></svg>'
  );
