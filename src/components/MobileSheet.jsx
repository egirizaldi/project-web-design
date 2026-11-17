import React, { useEffect, useRef } from 'react';

export default function MobileSheet({ isOpen, onClose }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab' && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll(
          'button:not([disabled]), a[href]'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobileSheet"
      ref={sheetRef}
      className="mobile-sheet"
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
    >
      <div className="row-between">
        <span className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
          Menu LestariWay
        </span>
        <button
          id="closeMobileSheet"
          className="btn btn-ghost"
          type="button"
          aria-label="Tutup menu"
          onClick={onClose}
          autoFocus
        >
          Tutup
        </button>
      </div>
      <nav className="stack-sm" style={{ marginTop: '12px' }}>
        <a href="#/" className="btn btn-secondary" data-mobile-nav onClick={onClose}>
          Beranda
        </a>
        <a href="#/explore" className="btn btn-secondary" data-mobile-nav onClick={onClose}>
          Jelajahi Destinasi
        </a>
        <a href="#/journal" className="btn btn-secondary" data-mobile-nav onClick={onClose}>
          Jurnal
        </a>
        <a href="#/impact" className="btn btn-secondary" data-mobile-nav onClick={onClose}>
          Dampak Kami
        </a>
        <a href="#/explore" className="btn btn-cta" data-mobile-nav onClick={onClose}>
          Cari Destinasi Sekarang
        </a>
      </nav>
    </div>
  );
}
