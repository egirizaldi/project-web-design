import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileSheet from './components/MobileSheet';
import SaveDataBanner from './components/SaveDataBanner';
import Toast from './components/Toast';
import BookingDrawer from './components/BookingDrawer';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import JournalPage from './pages/JournalPage';
import ImpactPage from './pages/ImpactPage';
import NotFoundPage from './pages/NotFoundPage';

import { ToastProvider } from './context/ToastContext';
import { EcoModeProvider } from './context/EcoModeContext';
import { BookingProvider } from './context/BookingContext';
import { getDestBySlug } from './utils/helpers';

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [withoutAnchor, anchor] = raw.split('#');
  const [pathPart, queryPart] = withoutAnchor.split('?');
  const params = new URLSearchParams(queryPart || '');
  return { path: pathPart || '/', params, anchor };
}

function MainLayout() {
  const [route, setRoute] = useState(parseHash());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash();
      setRoute(parsed);

      if (parsed.anchor) {
        setTimeout(() => {
          const el = document.getElementById(parsed.anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic page title
  useEffect(() => {
    const { path } = route;
    if (path === '/' || path === '') {
      document.title = 'LestariWay — Jelajahi Alam, Tinggalkan Jejak Kebaikan';
    } else if (path === '/explore') {
      document.title = 'Eksplorasi Destinasi — LestariWay';
    } else if (path.startsWith('/destination/')) {
      const slug = path.replace('/destination/', '');
      const dest = getDestBySlug(slug);
      document.title = dest ? `${dest.name} — LestariWay` : 'Destinasi — LestariWay';
    } else if (path === '/journal') {
      document.title = 'Jurnal Lapangan — LestariWay';
    } else if (path === '/impact') {
      document.title = 'Laporan Dampak & Transparansi — LestariWay';
    } else {
      document.title = '404 Halaman Tidak Ditemukan — LestariWay';
    }
  }, [route]);

  const renderContent = () => {
    const { path, params, anchor } = route;

    if (path === '/' || path === '') {
      return <HomePage />;
    }
    if (path === '/explore') {
      return <ExplorePage queryParams={params} />;
    }
    if (path.startsWith('/destination/')) {
      const slug = path.replace('/destination/', '');
      return <DestinationDetailPage slug={slug} />;
    }
    if (path === '/journal') {
      return <JournalPage />;
    }
    if (path === '/impact') {
      return <ImpactPage anchor={anchor} />;
    }
    return <NotFoundPage />;
  };

  return (
    <>
      <a href="#main-content" className="sr-only">
        Langsung ke konten utama
      </a>

      <Header currentPath={route.path} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileSheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SaveDataBanner />

      <main id="main-content" tabIndex={-1}>
        {renderContent()}
      </main>

      <Footer currentPath={route.path} />
      <BookingDrawer />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <EcoModeProvider>
        <BookingProvider>
          <MainLayout />
        </BookingProvider>
      </EcoModeProvider>
    </ToastProvider>
  );
}
