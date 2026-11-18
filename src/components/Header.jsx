import React from 'react';
import { useEcoMode } from '../context/EcoModeContext';
import Logo from './Logo';

export default function Header({ currentPath, onOpenMobileMenu }) {
  const { ecoMode, toggleEcoMode } = useEcoMode();

  const isExploreActive = currentPath === '/explore' || currentPath.startsWith('/destination/');
  const isJournalActive = currentPath === '/journal';
  const isImpactActive = currentPath === '/impact';
  const isAboutActive = currentPath === '/about';
  const isContactActive = currentPath === '/contact';

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#/" className="brand" aria-label="Beranda LestariWay">
          <Logo size={32} />
          <span>LestariWay</span>
        </a>

        <nav className="nav-links" aria-label="Navigasi utama">
          <a href="#/explore" className={isExploreActive ? 'active' : ''} data-nav="explore">
            Jelajahi
          </a>
          <a href="#/journal" className={isJournalActive ? 'active' : ''} data-nav="journal">
            Jurnal
          </a>
          <a href="#/impact" className={isImpactActive ? 'active' : ''} data-nav="impact">
            Dampak
          </a>
          <a href="#/about" className={isAboutActive ? 'active' : ''} data-nav="about">
            Tentang
          </a>
          <a href="#/contact" className={isContactActive ? 'active' : ''} data-nav="contact">
            Kontak
          </a>
        </nav>

        <div className="header-actions">
          <button
            id="ecoToggleBtn"
            className="eco-btn"
            type="button"
            aria-pressed={ecoMode}
            title="Aktifkan tema gelap OLED dan gambar hemat data"
            onClick={() => toggleEcoMode()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <span className="eco-label-full">{ecoMode ? 'Eco-Mode: Aktif' : 'Eco-Mode: Mati'}</span>
            <span className="eco-label-short">Eco</span>
          </button>

          <a href="#/explore" className="btn btn-cta header-cta-btn" id="headerCta">
            Cari Destinasi
          </a>

          <button
            id="mobileMenuBtn"
            className="btn btn-ghost menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="mobileSheet"
            aria-label="Buka menu navigasi"
            onClick={onOpenMobileMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
