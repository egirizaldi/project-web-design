import React, { createContext, useContext, useState, useRef } from 'react';
import { getDestBySlug } from '../utils/helpers';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [originCity, setOriginCity] = useState('jakarta');
  const lastTriggerElRef = useRef(null);

  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    slug: null,
    step: 1,
    name: '',
    email: '',
    pax: 2,
    date: '2026-11-21',
    mode: 'kereta',
    offset: true,
    loading: false,
    error: null,
    bookingCode: '',
    simFail: false,
  });

  const openBookingDrawer = (slug, triggerEl) => {
    lastTriggerElRef.current = triggerEl || document.activeElement;
    const dest = getDestBySlug(slug);
    if (!dest) return;
    const availModes = ['kereta', 'bus', 'pesawat'].filter(
      (m) => dest.emissions[originCity] && dest.emissions[originCity][m] !== null
    );

    setDrawerState({
      isOpen: true,
      slug,
      step: 1,
      name: '',
      email: '',
      pax: 2,
      date: '2026-11-21',
      mode: availModes[0] || 'pesawat',
      offset: true,
      loading: false,
      error: null,
      bookingCode: '',
      simFail: false,
    });
  };

  const closeBookingDrawer = () => {
    setDrawerState((prev) => ({ ...prev, isOpen: false }));
    if (lastTriggerElRef.current && typeof lastTriggerElRef.current.focus === 'function') {
      setTimeout(() => {
        lastTriggerElRef.current?.focus();
      }, 50);
    }
  };

  const updateDrawerState = (patch) => {
    setDrawerState((prev) => ({ ...prev, ...patch }));
  };

  return (
    <BookingContext.Provider
      value={{
        drawerState,
        originCity,
        setOriginCity,
        openBookingDrawer,
        closeBookingDrawer,
        updateDrawerState,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
