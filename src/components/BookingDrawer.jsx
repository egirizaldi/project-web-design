import React, { useState, useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { getDestBySlug, formatRp, calcSeedlings } from '../utils/helpers';
import { EMISSION_FACTORS, MANGROVE_PRICE } from '../data/data';

export default function BookingDrawer() {
  const { drawerState, originCity, closeBookingDrawer, updateDrawerState } = useBooking();
  const { showToast } = useToast();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const { isOpen, slug, step, name, email, pax, date, mode, offset, loading, error, bookingCode, simFail } =
    drawerState;

  const dest = slug ? getDestBySlug(slug) : null;

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen, step]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        closeBookingDrawer();
      } else if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]'
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
  }, [isOpen, closeBookingDrawer]);

  if (!isOpen || !dest) return null;

  const fullDate = '2026-11-22';
  const isDateFull = date === fullDate;

  const co2PerPerson = (dest.emissions[originCity] && dest.emissions[originCity][mode]) || 0;
  const seedlingsPerPerson = calcSeedlings(co2PerPerson);
  const totalSeedlings = seedlingsPerPerson * pax;
  const offsetCost = offset ? totalSeedlings * MANGROVE_PRICE : 0;
  const tripCost = dest.price * pax;
  const grandTotal = tripCost + offsetCost;

  const validateName = (val) => {
    const ok = val.trim().length >= 2;
    setNameError(!ok);
    return ok;
  };

  const validateEmail = (val) => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    setEmailError(!ok);
    return ok;
  };

  const handleNextStep1 = () => {
    const isNameOk = validateName(name);
    const isEmailOk = validateEmail(email);
    if (isNameOk && isEmailOk && !isDateFull) {
      updateDrawerState({ step: 2 });
    }
  };

  const handleSimulatePayment = () => {
    updateDrawerState({ loading: true, error: null });
    setTimeout(() => {
      if (simFail) {
        updateDrawerState({
          loading: false,
          simFail: false,
          error: 'Koneksi simulasi terputus. Data formulirmu tetap aman—silakan tekan Coba Lagi.',
        });
        return;
      }
      const code = `LW-${dest.shortName.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      updateDrawerState({
        loading: false,
        bookingCode: code,
        step: 4,
      });
      showToast('Simulasi reservasi berhasil. Paperless E-Pass siap digunakan.');
    }, 1200);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bookingCode).catch(() => {});
    }
    showToast(`Kode ${bookingCode} disalin.`);
  };

  const handleSavePassPng = () => {
    const c = document.createElement('canvas');
    c.width = 840;
    c.height = 460;
    const ctx = c.getContext('2d');

    // Outer card background (Forest Green border)
    ctx.fillStyle = '#1B4332';
    ctx.fillRect(0, 0, 840, 460);

    // Inner ticket background (Alabaster Cream)
    ctx.fillStyle = '#F8F5F0';
    ctx.fillRect(20, 20, 800, 420);

    // Header banner bar
    ctx.fillStyle = '#1B4332';
    ctx.fillRect(20, 20, 800, 64);

    // Header logo mark (Brand Badge)
    ctx.fillStyle = '#B8512B';
    ctx.fillRect(44, 34, 36, 36);
    ctx.fillStyle = '#F8F5F0';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('LW', 51, 59);

    // Header title & tagline
    ctx.fillStyle = '#F8F5F0';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('LESTARIWAY', 92, 51);
    ctx.fillStyle = '#A9BCB1';
    ctx.font = '12px sans-serif';
    ctx.fillText('PAPERLESS CONSERVATION E-PASS • JELAJAHI ALAM, TINGGALKAN JEJAK KEBAIKAN', 92, 68);

    // Header status badge
    ctx.fillStyle = '#74C69D';
    ctx.fillRect(660, 36, 136, 30);
    ctx.fillStyle = '#0D1310';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('VERIFIKASI DIGITAL', 674, 55);

    // Booking Code Title
    ctx.fillStyle = '#B8512B';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('KODE RESERVASI RESMI', 48, 120);

    // Booking Code
    ctx.fillStyle = '#1F2421';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(bookingCode, 48, 160);

    // Destination Name & Category
    ctx.fillStyle = '#1B4332';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(dest.name, 48, 200);
    ctx.fillStyle = '#525B56';
    ctx.font = '14px sans-serif';
    ctx.fillText(`${dest.location} • Durasi ${dest.duration} • Eco-Score: ${dest.ecoScore}/100`, 48, 224);

    // Horizontal separator
    ctx.strokeStyle = '#DCD6CA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, 240);
    ctx.lineTo(580, 240);
    ctx.stroke();

    // Passenger & Trip Details (Column 1)
    ctx.fillStyle = '#525B56';
    ctx.font = '12px sans-serif';
    ctx.fillText('NAMA TAMU / PEMESAN', 48, 268);
    ctx.fillStyle = '#1F2421';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(name || 'Tamu LestariWay', 48, 290);

    ctx.fillStyle = '#525B56';
    ctx.font = '12px sans-serif';
    ctx.fillText('JUMLAH PESERTA & TANGGAL', 48, 325);
    ctx.fillStyle = '#1F2421';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(`${pax} Orang • Berangkat: ${date}`, 48, 345);

    // Passenger & Trip Details (Column 2)
    ctx.fillStyle = '#525B56';
    ctx.font = '12px sans-serif';
    ctx.fillText('MODA TRANSPORTASI PP', 320, 268);
    ctx.fillStyle = '#1F2421';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(`${EMISSION_FACTORS[mode]?.label || mode} (${co2PerPerson * pax} kg CO2e)`, 320, 290);

    ctx.fillStyle = '#525B56';
    ctx.font = '12px sans-serif';
    ctx.fillText('TOTAL TRANSAKSI SIMULASI', 320, 325);
    ctx.fillStyle = '#1B4332';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText(formatRp(grandTotal), 320, 346);

    // Bottom impact banner
    ctx.fillStyle = '#DCEBE2';
    ctx.fillRect(48, 375, 532, 42);
    ctx.fillStyle = '#1B4332';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`✓ 60% DITERIMA LANGSUNG OLEH WARGA LOKAL (${formatRp(Math.round(tripCost * 0.6))})`, 64, 401);

    // Vertical dashed perforation line between main pass & ticket stub
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#8A8478';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(615, 84);
    ctx.lineTo(615, 440);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Ticket Stub (Right Section)
    ctx.fillStyle = '#525B56';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('KODE VERIFIKASI', 645, 120);

    // Simulated QR Code Graphic Matrix
    const qrX = 645;
    const qrY = 138;
    const qrSize = 130;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
    ctx.strokeStyle = '#1B4332';
    ctx.lineWidth = 2;
    ctx.strokeRect(qrX, qrY, qrSize, qrSize);

    // Draw QR corner boxes & pattern
    ctx.fillStyle = '#1B4332';
    // Top-left corner
    ctx.fillRect(qrX + 8, qrY + 8, 28, 28);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + 13, qrY + 13, 18, 18);
    ctx.fillStyle = '#1B4332';
    ctx.fillRect(qrX + 17, qrY + 17, 10, 10);

    // Top-right corner
    ctx.fillRect(qrX + qrSize - 36, qrY + 8, 28, 28);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + qrSize - 31, qrY + 13, 18, 18);
    ctx.fillStyle = '#1B4332';
    ctx.fillRect(qrX + qrSize - 27, qrY + 17, 10, 10);

    // Bottom-left corner
    ctx.fillRect(qrX + 8, qrY + qrSize - 36, 28, 28);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + 13, qrY + qrSize - 31, 18, 18);
    ctx.fillStyle = '#1B4332';
    ctx.fillRect(qrX + 17, qrY + qrSize - 27, 10, 10);

    // Center matrix blocks
    for (let r = 0; r < 7; r++) {
      for (let col = 0; col < 7; col++) {
        if ((r + col) % 2 === 0 || (r * col) % 3 === 0) {
          ctx.fillRect(qrX + 46 + col * 6, qrY + 46 + r * 6, 4.5, 4.5);
        }
      }
    }

    // QR instructions & Leave No Trace Seal
    ctx.fillStyle = '#525B56';
    ctx.font = '10px sans-serif';
    ctx.fillText('PINDAI SAAT TIBA DI POS', 645, 292);
    ctx.fillText('LEAVE NO TRACE VERIFIED', 645, 310);

    ctx.fillStyle = '#B8512B';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('100% PAPERLESS', 645, 345);

    ctx.fillStyle = '#525B56';
    ctx.font = '9px sans-serif';
    ctx.fillText('Simpan di ponsel cerdas Anda.', 645, 365);
    ctx.fillText('Tidak perlu dicetak di atas kertas.', 645, 380);

    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `E-PASS-${bookingCode}.png`;
    a.click();
    showToast('Paperless E-Pass (PNG) beresolusi tinggi berhasil diunduh.');
  };

  return (
    <div
      id="bookingBackdrop"
      className="backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawerTitle"
      onClick={(e) => {
        if (e.target.id === 'bookingBackdrop') closeBookingDrawer();
      }}
    >
      <div className="drawer" id="bookingDrawer" ref={drawerRef}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow" id="drawerStepLabel">
              Langkah {step} dari 4
            </span>
            <h2 id="drawerTitle" className="card-title">
              {step === 4 ? 'Paperless E-Pass' : `Pesan: ${dest.shortName}`}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            id="closeDrawerBtn"
            className="btn btn-ghost"
            type="button"
            aria-label="Tutup panel pemesanan"
            style={{ minHeight: '40px', padding: '6px 12px' }}
            onClick={closeBookingDrawer}
          >
            Tutup
          </button>
        </div>

        <div className="drawer-body" id="drawerBody">
          {step === 1 && (
            <div className="stack-sm">
              <p className="small muted" style={{ margin: 0 }}>
                Simulasi pemesanan prototipe — tidak ada data pribadi yang dikirim ke server.
              </p>
              <div>
                <label className="field-label" htmlFor="drName">
                  Nama Lengkap
                </label>
                <input
                  id="drName"
                  className={`input ${nameError ? 'error' : ''}`}
                  type="text"
                  value={name}
                  placeholder="Misal: Nadia Larasati"
                  required
                  onChange={(e) => updateDrawerState({ name: e.target.value })}
                  onBlur={(e) => validateName(e.target.value)}
                />
                <div className="error-msg" id="errName" hidden={!nameError}>
                  Nama wajib diisi minimal 2 huruf.
                </div>
              </div>
              <div>
                <label className="field-label" htmlFor="drEmail">
                  Email untuk E-Pass
                </label>
                <input
                  id="drEmail"
                  className={`input ${emailError ? 'error' : ''}`}
                  type="email"
                  value={email}
                  placeholder="nama@email.com"
                  required
                  onChange={(e) => updateDrawerState({ email: e.target.value })}
                  onBlur={(e) => validateEmail(e.target.value)}
                />
                <div className="error-msg" id="errEmail" hidden={!emailError}>
                  Masukkan alamat email yang valid.
                </div>
              </div>
              <div className="grid grid-2" style={{ gap: '12px' }}>
                <div>
                  <label className="field-label" htmlFor="drPax">
                    Jumlah Peserta (Maks {dest.quotaLeft})
                  </label>
                  <input
                    id="drPax"
                    className="input"
                    type="number"
                    min="1"
                    max={dest.quotaLeft}
                    value={pax}
                    onChange={(e) =>
                      updateDrawerState({
                        pax: Math.max(1, Math.min(dest.quotaLeft, Number(e.target.value) || 1)),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="drDate">
                    Tanggal Berangkat
                  </label>
                  <select
                    id="drDate"
                    className="select"
                    value={date}
                    onChange={(e) => updateDrawerState({ date: e.target.value })}
                  >
                    <option value="2026-11-21">21 Nov 2026 (Tersedia)</option>
                    <option value="2026-11-22">22 Nov 2026 (Kuota Penuh)</option>
                    <option value="2026-11-28">28 Nov 2026 (Tersisa 3)</option>
                  </select>
                </div>
              </div>
              {isDateFull && (
                <div className="badge badge-warn" style={{ padding: '10px 12px' }}>
                  Kuota 22 Nov 2026 penuh. Pilih 21 Nov atau 28 Nov 2026 yang tersedia.
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="stack-md">
              <div>
                <span className="field-label">Moda dari {originCity} (PP)</span>
                <div className="stack-xs">
                  {['kereta', 'bus', 'pesawat'].map((m) => {
                    const val = dest.emissions[originCity] ? dest.emissions[originCity][m] : null;
                    const disabled = val === null;
                    return (
                      <button
                        key={m}
                        type="button"
                        className={`mode-card ${mode === m && !disabled ? 'active' : ''}`}
                        data-dr-mode={m}
                        disabled={disabled}
                        onClick={() => !disabled && updateDrawerState({ mode: m })}
                      >
                        <div className="row-between">
                          <strong>{EMISSION_FACTORS[m].label}</strong>
                          <span>{disabled ? 'Tidak tersedia' : `${val} kg CO2e / org`}</span>
                        </div>
                        <span className="xs muted">
                          {dest.distanceNotes[originCity] ? dest.distanceNotes[originCity][m] : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="card card-pad stack-xs" style={{ background: 'var(--surface)' }}>
                <label className="row-between" style={{ cursor: 'pointer' }}>
                  <span>
                    <strong>Sertakan Offset Mangrove</strong> ({totalSeedlings} bibit)
                  </span>
                  <input
                    type="checkbox"
                    id="drOffset"
                    checked={offset}
                    style={{ width: '20px', height: '20px' }}
                    onChange={(e) => updateDrawerState({ offset: e.target.checked })}
                  />
                </label>
                <div className="row-between small">
                  <span className="muted">
                    Total emisi {pax} peserta: {co2PerPerson * pax} kg CO2e
                  </span>
                  <strong>+{formatRp(totalSeedlings * MANGROVE_PRICE)}</strong>
                </div>
                <p className="xs muted" style={{ margin: '4px 0 0' }}>
                  Kompensasi melengkapi, bukan menggantikan, upaya mengurangi emisi. Pilih moda yang lebih rendah emisi
                  jika memungkinkan.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="stack-md">
              <div className="card card-pad stack-xs" style={{ background: 'var(--surface)' }}>
                <strong>{dest.name}</strong>
                <span className="small muted">
                  {name} • {pax} peserta • {date}
                </span>
                <span className="small muted">
                  Moda: {EMISSION_FACTORS[mode]?.label || mode} ({co2PerPerson * pax} kg CO2e)
                </span>
              </div>

              <div className="stack-xs small">
                <div className="row-between">
                  <span>
                    Paket ({pax} × {formatRp(dest.price)})
                  </span>
                  <strong>{formatRp(tripCost)}</strong>
                </div>
                <div className="row-between muted">
                  <span>↳ Untuk Warga Lokal (60%)</span>
                  <span>{formatRp(Math.round(tripCost * 0.6))}</span>
                </div>
                <div className="row-between muted">
                  <span>↳ Dana Konservasi (20%)</span>
                  <span>{formatRp(Math.round(tripCost * 0.2))}</span>
                </div>
                <div className="row-between">
                  <span>Offset Mangrove ({offset ? `${totalSeedlings} bibit` : 'Tidak dipilih'})</span>
                  <strong>{formatRp(offsetCost)}</strong>
                </div>
                <hr style={{ border: 0, borderTop: '1px solid var(--border-decor)', width: '100%' }} />
                <div className="row-between" style={{ fontSize: '1.125rem' }}>
                  <strong>Total Simulasi</strong>
                  <strong style={{ color: 'var(--primary)' }}>{formatRp(grandTotal)}</strong>
                </div>
              </div>

              <label className="row-wrap xs muted" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  id="drSimFail"
                  checked={simFail}
                  onChange={(e) => updateDrawerState({ simFail: e.target.checked })}
                />
                <span>Uji skenario pembayaran gagal (simulasi)</span>
              </label>

              {error && (
                <div
                  className="badge badge-warn"
                  style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', display: 'grid', gap: '6px' }}
                >
                  <span>{error}</span>
                </div>
              )}

              <p className="xs muted" style={{ margin: 0 }}>
                Catatan: Pembayaran ini adalah simulasi prototipe. Tidak ada pemrosesan kartu atau pengiriman data
                pribadi nyata.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="stack-md">
              <div
                className="card card-pad stack-xs"
                style={{ borderColor: 'var(--primary)', background: 'var(--primary-soft)' }}
              >
                <span className="eyebrow">Terkonfirmasi (Simulasi)</span>
                <div className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  {bookingCode}
                </div>
                <p className="small" style={{ margin: 0 }}>
                  {dest.name} • {date} • {pax} peserta
                </p>
                <div className="row-wrap" style={{ marginTop: '4px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="copyCodeBtn"
                    style={{ minHeight: '36px', padding: '4px 12px' }}
                    onClick={handleCopyCode}
                  >
                    Salin Kode
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="savePassBtn"
                    style={{ minHeight: '36px', padding: '4px 12px' }}
                    onClick={handleSavePassPng}
                  >
                    Simpan E-Pass (PNG)
                  </button>
                </div>
              </div>

              <div className="stack-xs">
                <span className="eyebrow">Checklist Leave No Trace</span>
                {dest.checklist.map((item, idx) => (
                  <label key={idx} className="row-wrap small" style={{ alignItems: 'flex-start' }}>
                    <input type="checkbox" style={{ marginTop: '4px' }} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="drawer-foot" id="drawerFoot">
          {step === 1 && (
            <>
              <button type="button" className="btn btn-ghost" id="drCancel" onClick={closeBookingDrawer}>
                Batal
              </button>
              <button
                type="button"
                className="btn btn-cta"
                id="drNext1"
                disabled={isDateFull}
                onClick={handleNextStep1}
              >
                Lanjut ke Transportasi
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                id="drBack2"
                onClick={() => updateDrawerState({ step: 1 })}
              >
                Kembali
              </button>
              <button
                type="button"
                className="btn btn-cta"
                id="drNext2"
                onClick={() => updateDrawerState({ step: 3 })}
              >
                Ringkasan Biaya
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                id="drBack3"
                disabled={loading}
                onClick={() => updateDrawerState({ step: 2, error: null })}
              >
                Kembali
              </button>
              <button
                type="button"
                className="btn btn-cta"
                id="drPayBtn"
                disabled={loading}
                onClick={handleSimulatePayment}
              >
                {loading ? 'Memproses Simulasi...' : error ? 'Coba Lagi' : 'Konfirmasi Simulasi Bayar'}
              </button>
            </>
          )}

          {step === 4 && (
            <button
              type="button"
              className="btn btn-cta"
              id="drDone"
              style={{ width: '100%' }}
              onClick={() => {
                closeBookingDrawer();
                window.location.hash = '#/';
              }}
            >
              Selesai &amp; Kembali
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
