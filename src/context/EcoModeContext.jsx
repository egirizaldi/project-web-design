import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const EcoModeContext = createContext(null);

export function EcoModeProvider({ children }) {
  const [ecoMode, setEcoMode] = useState(false);
  const [showSaveDataBanner, setShowSaveDataBanner] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lestariway_eco');
      if (saved === 'true') {
        setEcoMode(true);
        document.documentElement.setAttribute('data-eco', 'true');
      } else {
        document.documentElement.setAttribute('data-eco', 'false');
      }
    } catch (_) {}

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData) {
      const saved = localStorage.getItem('lestariway_eco');
      if (saved !== 'true') {
        setShowSaveDataBanner(true);
      }
    }
  }, []);

  const toggleEcoMode = (explicitVal) => {
    const nextVal = typeof explicitVal === 'boolean' ? explicitVal : !ecoMode;
    setEcoMode(nextVal);
    document.documentElement.setAttribute('data-eco', nextVal ? 'true' : 'false');
    try {
      localStorage.setItem('lestariway_eco', nextVal ? 'true' : 'false');
    } catch (_) {}

    const imgCount = document.querySelectorAll('img.eco-photo').length || 4;
    const estSavedKb = imgCount * 110;
    const msg = nextVal
      ? `Eco-Mode aktif. Perkiraan hemat data halaman ini: ~${estSavedKb} KB (asumsi varian gambar hemat 480 px).`
      : 'Eco-Mode dimatikan. Tampilan kembali ke mode standar.';
    showToast(msg);
  };

  const dismissSaveDataBanner = () => {
    setShowSaveDataBanner(false);
  };

  const enableEcoFromBanner = () => {
    setShowSaveDataBanner(false);
    toggleEcoMode(true);
  };

  return (
    <EcoModeContext.Provider
      value={{
        ecoMode,
        toggleEcoMode,
        showSaveDataBanner,
        dismissSaveDataBanner,
        enableEcoFromBanner,
      }}
    >
      {children}
    </EcoModeContext.Provider>
  );
}

export function useEcoMode() {
  const context = useContext(EcoModeContext);
  if (!context) {
    throw new Error('useEcoMode must be used within EcoModeProvider');
  }
  return context;
}
