import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Pertanyaan Umum',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Pertanyaan Umum',
    'Kemitraan Desa Wisata',
    'Inisiatif Konservasi Habitat',
    'Pelaporan & Verifikasi Eco-Score',
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Nama lengkap wajib diisi minimal 2 karakter.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Alamat email tidak valid.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Pesan wajib diisi minimal 10 karakter.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Terima kasih! Pesan Anda telah terkirim. Tim LestariWay akan merespons dalam 1x24 jam.');
      setFormData({
        name: '',
        email: '',
        category: 'Pertanyaan Umum',
        message: '',
      });
      setErrors({});
    }, 800);
  };

  return (
    <>
      <div className="proto-banner">
        <div className="container row-between">
          <span>
            <strong>Ruang Dialog &amp; Kemitraan Konservasi</strong> — Kolaborasi terbuka untuk masa depan pariwisata nusantara.
          </span>
          <span className="xs">Respons Maks. 1x24 Jam</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '32px' }}>
        <div className="container stack-lg">
          {/* Header */}
          <div className="stack-xs" style={{ maxWidth: '680px' }}>
            <span className="eyebrow">Hubungi Kami</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Mari Berkolaborasi Menjaga Alam dan Memberdayakan Desa.
            </h1>
            <p className="muted" style={{ fontSize: '1.1rem', margin: 0 }}>
              Punya pertanyaan seputar audit Eco-Score, ingin mendaftarkan desa wisata Anda, atau mendiskusikan kemitraan konservasi? Kirimkan pesan Anda kepada tim kami.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: '32px', alignItems: 'start' }}>
            {/* Form Kontak */}
            <div className="card card-pad stack-md">
              <div>
                <h2 className="card-title">Kirim Pesan Terbuka</h2>
                <p className="xs muted" style={{ margin: '4px 0 0' }}>
                  Seluruh data dikirim secara aman untuk kebutuhan korespondensi inisiatif LestariWay.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="stack-sm" noValidate>
                <div>
                  <label className="field-label" htmlFor="contactName">
                    Nama Lengkap <span style={{ color: 'var(--cta)' }}>*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    className={`input ${errors.name ? 'error' : ''}`}
                    placeholder="Contoh: Nadia Larasati"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <div className="error-msg">{errors.name}</div>}
                </div>

                <div>
                  <label className="field-label" htmlFor="contactEmail">
                    Alamat Email <span style={{ color: 'var(--cta)' }}>*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    className={`input ${errors.email ? 'error' : ''}`}
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <div className="error-msg">{errors.email}</div>}
                </div>

                <div>
                  <label className="field-label" htmlFor="contactCat">
                    Topik Diskusi / Kategori Pesan
                  </label>
                  <select
                    id="contactCat"
                    className="select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="field-label" htmlFor="contactMsg">
                    Pesan Anda <span style={{ color: 'var(--cta)' }}>*</span>
                  </label>
                  <textarea
                    id="contactMsg"
                    className={`input ${errors.message ? 'error' : ''}`}
                    rows={5}
                    placeholder="Tuliskan pertanyaan, masukan, atau usulan kolaborasi desa wisata Anda di sini..."
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <div className="error-msg">{errors.message}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-cta"
                  style={{ minHeight: '44px', width: '100%', marginTop: '6px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang →'}
                </button>
              </form>
            </div>

            {/* Informasi Kontak & FAQ */}
            <div className="stack-md">
              {/* Card Informasi */}
              <div className="card card-pad stack-sm" style={{ background: 'var(--surface)' }}>
                <span className="eyebrow">Saluran Resmi</span>
                <h2 className="card-title">Sekretariat &amp; Korespondensi</h2>
                
                <div className="stack-xs small">
                  <div className="row-between" style={{ borderBottom: '1px solid var(--border-decor)', paddingBottom: '8px' }}>
                    <span className="muted">Email Utama:</span>
                    <strong>halo@lestariway.id</strong>
                  </div>
                  <div className="row-between" style={{ borderBottom: '1px solid var(--border-decor)', paddingBottom: '8px' }}>
                    <span className="muted">Kolaborasi Desa:</span>
                    <strong>mitra@lestariway.id</strong>
                  </div>
                  <div className="row-between" style={{ borderBottom: '1px solid var(--border-decor)', paddingBottom: '8px' }}>
                    <span className="muted">Waktu Respons:</span>
                    <strong>Senin – Sabtu (08.00 – 17.00 WIB)</strong>
                  </div>
                  <div className="row-between" style={{ borderBottom: '1px solid var(--border-decor)', paddingBottom: '8px' }}>
                    <span className="muted">Wilayah Kemitraan:</span>
                    <strong>Jawa, Bali, &amp; Flores (NTT)</strong>
                  </div>
                  <div className="row-between" style={{ borderBottom: '1px solid var(--border-decor)', paddingBottom: '8px' }}>
                    <span className="muted">Kebijakan Privasi:</span>
                    <strong>Zero-Tracker &amp; Bebas Iklan</strong>
                  </div>
                  <div className="row-between">
                    <span className="muted">Status Audit:</span>
                    <strong style={{ color: 'var(--primary)' }}>Transparansi Penuh (PRD v1.2)</strong>
                  </div>
                </div>
              </div>

              {/* FAQ Ringkas */}
              <div className="card card-pad stack-sm">
                <span className="eyebrow">Pertanyaan Sering Diajukan</span>
                <h2 className="card-title">FAQ Singkat</h2>

                <div className="stack-sm small">
                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary)' }}>
                      Bagaimana desa kami bisa menjadi mitra LestariWay?
                    </strong>
                    <p className="muted" style={{ margin: '4px 0 0' }}>
                      Kirimkan profil desa melalui formulir di samping dengan memilih kategori <em>Kemitraan Desa Wisata</em>. Tim kurator kami akan melakukan verifikasi kesiapan 4 pilar.
                    </p>
                  </div>

                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary)' }}>
                      Apakah dana 60% benar-benar diterima warga lokal?
                    </strong>
                    <p className="muted" style={{ margin: '4px 0 0' }}>
                      Ya, seluruh transaksi paket dikirim langsung ke rekening BUMDes atau koperasi pengelola desa setempat tanpa pemotongan tersembunyi.
                    </p>
                  </div>

                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary)' }}>
                      Apakah LestariWay mengenakan biaya emisi wajib?
                    </strong>
                    <p className="muted" style={{ margin: '4px 0 0' }}>
                      Tidak. Kompensasi mangrove (offset karbon) bersifat sukarela dan mendidik, dirancang untuk melengkapi upaya pengurangan emisi perjalanan Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
