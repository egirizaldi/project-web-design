import React from 'react';
import { useEcoMode } from '../context/EcoModeContext';

export default function SaveDataBanner() {
  const { showSaveDataBanner, enableEcoFromBanner, dismissSaveDataBanner } = useEcoMode();

  if (!showSaveDataBanner) return null;

  return (
    <div id="saveDataBanner" className="proto-banner">
      <div className="container row-between">
        <span className="small">
          Peramban Anda mengaktifkan mode hemat data. Aktifkan Eco-Mode untuk memuat gambar lebih ringan.
        </span>
        <div className="row-wrap">
          <button
            id="enableEcoFromBanner"
            className="btn btn-secondary"
            type="button"
            style={{ minHeight: '34px', padding: '4px 10px' }}
            onClick={enableEcoFromBanner}
          >
            Aktifkan
          </button>
          <button
            id="dismissSaveData"
            className="btn btn-ghost"
            type="button"
            style={{ minHeight: '34px', padding: '4px 10px' }}
            onClick={dismissSaveDataBanner}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
