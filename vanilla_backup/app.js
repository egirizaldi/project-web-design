// LestariWay — Modular Vanilla JS Prototype (Low-Carbon & PRD v1.2 Compliant)
(function () {
  'use strict';

  const state = {
    ecoMode: false,
    originCity: 'jakarta',
    explore: {
      category: 'Semua',
      minScore: 80,
      quotaOnly: true,
      sort: 'score-desc'
    },
    homeDonutSlug: 'nglanggeran',
    homeDonutPax: 1,
    homeDonutActiveSlice: 0,
    heroFeatureSlug: 'nglanggeran',
    impactTab: 'desa',
    lntActive: 0,
    estimatorRoute: 'nglanggeran',
    estimatorMode: 'kereta',
    journalFilter: 'Semua',
    journalActiveSlug: null,
    drawer: {
      open: false,
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
      bookingCode: ''
    }
  };

  let lastTriggerEl = null;
  let toastTimer = null;

  const mainEl = document.getElementById('main-content');
  const ecoToggleBtn = document.getElementById('ecoToggleBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileSheet = document.getElementById('mobileSheet');
  const closeMobileSheet = document.getElementById('closeMobileSheet');
  const bookingBackdrop = document.getElementById('bookingBackdrop');
  const bookingDrawer = document.getElementById('bookingDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerStepLabel = document.getElementById('drawerStepLabel');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerBody = document.getElementById('drawerBody');
  const drawerFoot = document.getElementById('drawerFoot');
  const toastEl = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastClose = document.getElementById('toastClose');
  const saveDataBanner = document.getElementById('saveDataBanner');

  // --- Helpers ---
  function formatRp(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }

  function calcSeedlings(co2) {
    return Math.ceil(co2 / MANGROVE_ABSORPTION_KG);
  }

  function getDestBySlug(slug) {
    return DESTINATIONS.find((d) => d.slug === slug);
  }

  function getEmissionRange(dest, city) {
    const e = dest.emissions[city];
    const vals = Object.values(e).filter((v) => typeof v === 'number');
    if (vals.length === 0) return 'N/A';
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    return min === max ? `${min} kg CO2e` : `${min}–${max} kg CO2e`;
  }

  function getLowestEmission(dest, city) {
    const vals = Object.values(dest.emissions[city]).filter((v) => typeof v === 'number');
    return vals.length ? Math.min(...vals) : 9999;
  }

  const FALLBACK_SVG =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#E4DFD4"/><path d="M0 440 L210 250 L380 390 L560 210 L800 430 L800 600 L0 600 Z" fill="#1B4332" opacity="0.82"/><circle cx="620" cy="140" r="46" fill="#B8512B" opacity="0.85"/></svg>'
    );

  function imgTag(url, alt, opts = {}) {
    const lazy = opts.lazy === false ? '' : ' loading="lazy"';
    const cls = opts.className ? ` class="eco-photo ${opts.className}"` : ' class="eco-photo"';
    const w = opts.w || 800;
    const h = opts.h || 600;
    return `<img src="${url}" alt="${alt}" width="${w}" height="${h}"${cls}${lazy} decoding="async" onerror="this.onerror=null;this.src='${FALLBACK_SVG}'" />`;
  }

  function showToast(msg) {
    toastMessage.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 5000);
  }

  toastClose.addEventListener('click', () => {
    toastEl.hidden = true;
    clearTimeout(toastTimer);
  });

  // --- Eco-Mode Persistence & Toggle (PRD Bagian 7) ---
  function loadEcoPref() {
    try {
      const saved = localStorage.getItem('lestariway_eco');
      if (saved === 'true') applyEcoMode(true, false);
    } catch (_) {
      // Fallback ke state memori jika storage dibatasi
    }
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.saveData && !state.ecoMode) {
      saveDataBanner.hidden = false;
    }
  }

  function applyEcoMode(enabled, notify = true) {
    state.ecoMode = enabled;
    document.documentElement.setAttribute('data-eco', enabled ? 'true' : 'false');
    ecoToggleBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    ecoToggleBtn.querySelector('.eco-label-full').textContent = enabled ? 'Eco-Mode: Aktif' : 'Eco-Mode: Mati';
    try {
      localStorage.setItem('lestariway_eco', enabled ? 'true' : 'false');
    } catch (_) {}

    if (notify) {
      const imgCount = document.querySelectorAll('img.eco-photo').length || 4;
      const estSavedKb = imgCount * 110;
      const msg = enabled
        ? `Eco-Mode aktif. Perkiraan hemat data halaman ini: ~${estSavedKb} KB (asumsi varian gambar hemat 480 px).`
        : 'Eco-Mode dimatikan. Tampilan kembali ke mode standar.';
      showToast(msg);
    }
  }

  ecoToggleBtn.addEventListener('click', () => applyEcoMode(!state.ecoMode, true));
  document.getElementById('enableEcoFromBanner').addEventListener('click', () => {
    saveDataBanner.hidden = true;
    applyEcoMode(true, true);
  });
  document.getElementById('dismissSaveData').addEventListener('click', () => {
    saveDataBanner.hidden = true;
  });

  // --- Mobile Sheet ---
  mobileMenuBtn.addEventListener('click', () => {
    mobileSheet.hidden = false;
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  });
  closeMobileSheet.addEventListener('click', () => {
    mobileSheet.hidden = true;
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
  mobileSheet.querySelectorAll('[data-mobile-nav]').forEach((link) => {
    link.addEventListener('click', () => {
      mobileSheet.hidden = true;
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Shared SVG Donut Builder ---
  function renderAllocationDonut(totalPrice, pax, activeIdx, idPrefix) {
    const total = totalPrice * pax;
    const slices = [
      { label: 'Warga Lokal & Adat', pct: 60, color: 'var(--primary)', note: 'Pemandu desa, homestay, dan koperasi' },
      { label: 'Dana Konservasi', pct: 20, color: '#297E5A', note: 'Bibit mangrove, karang, dan patroli' },
      { label: 'Operasional Lapangan', pct: 15, color: 'var(--cta)', note: 'Logistik lokal dan asuransi dasar' },
      { label: 'Platform LestariWay', pct: 5, color: 'var(--border)', note: 'Pemeliharaan situs & audit berkala' }
    ];
    const r = 40;
    const circ = 2 * Math.PI * r;
    let offset = 0;

    const circles = slices
      .map((s, idx) => {
        const dash = (s.pct / 100) * circ;
        const el = `<circle cx="50" cy="50" r="${r}" fill="transparent" stroke="${s.color}" stroke-width="${
          idx === activeIdx ? 18 : 14
        }" stroke-dasharray="${dash.toFixed(2)} ${circ.toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(
          2
        )}" data-slice="${idx}" style="cursor:pointer"></circle>`;
        offset += dash;
        return el;
      })
      .join('');

    const active = slices[activeIdx] || slices[0];
    const activeAmount = formatRp(Math.round((total * active.pct) / 100));

    const legend = slices
      .map((s, idx) => {
        const nominal = formatRp(Math.round((total * s.pct) / 100));
        return `
          <button type="button" class="legend-item ${idx === activeIdx ? 'active' : ''}" data-donut-select="${idPrefix}:${idx}">
            <span class="row-wrap" style="gap:8px;">
              <span class="dot" style="background:${s.color}"></span>
              <span><strong>${s.pct}%</strong> ${s.label}</span>
            </span>
            <strong>${nominal}</strong>
          </button>`;
      })
      .join('');

    return `
      <div class="donut-wrap horizontal">
        <div class="donut-box">
          <svg viewBox="0 0 100 100" width="148" height="148" style="transform: rotate(-90deg);" aria-label="Bagan alokasi biaya 60/20/15/5">
            ${circles}
          </svg>
          <div class="donut-center">
            <strong style="font-size:1.1rem;">${active.pct}%</strong>
            <span class="xs muted">${activeAmount}</span>
          </div>
        </div>
        <div class="legend-list">${legend}</div>
      </div>
      <p class="xs muted" style="margin: 10px 0 0;">${active.label}: ${active.note}</p>
    `;
  }

  // --- Router ---
  function parseHash() {
    const raw = window.location.hash.replace(/^#/, '') || '/';
    const [withoutAnchor, anchor] = raw.split('#');
    const [pathPart, queryPart] = withoutAnchor.split('?');
    const params = new URLSearchParams(queryPart || '');
    return { path: pathPart, params, anchor };
  }

  function updateNavHighlight(path) {
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const target = a.getAttribute('data-nav');
      const isActive =
        (target === 'explore' && (path === '/explore' || path.startsWith('/destination/'))) ||
        (target === 'journal' && path === '/journal') ||
        (target === 'impact' && path === '/impact');
      a.classList.toggle('active', isActive);
    });
  }

  function render() {
    const { path, params, anchor } = parseHash();
    updateNavHighlight(path);

    if (path === '/' || path === '') {
      renderHome();
    } else if (path === '/explore') {
      if (params.has('cat')) state.explore.category = params.get('cat');
      if (params.has('score')) state.explore.minScore = Number(params.get('score')) || 80;
      renderExplore();
    } else if (path.startsWith('/destination/')) {
      const slug = path.replace('/destination/', '');
      renderDetail(slug);
    } else if (path === '/journal') {
      renderJournal();
    } else if (path === '/impact') {
      if (anchor === 'metodologi' || anchor === 'asumsi') state.impactTab = 'rumus';
      renderImpact();
    } else {
      renderNotFound();
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  window.addEventListener('hashchange', render);

  // --- VIEW 1: BERANDA (/) ---
  function renderHome() {
    const featDest = getDestBySlug(state.heroFeatureSlug) || DESTINATIONS[0];

    const destCards = DESTINATIONS.map((d) => {
      const range = getEmissionRange(d, 'jakarta');
      return `
        <article class="card dest-card">
          <div class="dest-img-wrap">
            ${imgTag(d.images.hero, `${d.name} di ${d.location}`, { w: 640, h: 480, lazy: false })}
            <div class="dest-overlay-top">
              <span class="score-pill">Eco-Score ${d.ecoScore}</span>
              <span class="badge">${d.badges[0]}</span>
            </div>
            <span class="quota-pill">Sisa ${d.quotaLeft}/${d.quotaMax} kursi</span>
          </div>
          <div class="dest-body">
            <div>
              <span class="xs muted">${d.location} • ${d.duration}</span>
              <h3 class="card-title" style="margin-top:4px;">${d.name}</h3>
            </div>
            <div class="dest-meta">
              <div class="meta-row">
                <span class="muted">Emisi PP (Jakarta)</span>
                <strong>${range}</strong>
              </div>
              <div class="meta-row">
                <span class="muted">Paket</span>
                <strong style="color:var(--primary)">${formatRp(d.price)}/org</strong>
              </div>
            </div>
            <a href="#/destination/${d.slug}" class="btn btn-secondary" style="width:100%;">Lihat Rincian</a>
          </div>
        </article>`;
    }).join('');

    const donutDest = getDestBySlug(state.homeDonutSlug) || DESTINATIONS[0];
    const estDest = getDestBySlug(state.estimatorRoute) || DESTINATIONS[0];
    const estCo2 = estDest.emissions.jakarta[state.estimatorMode];
    const flightCo2 = estDest.emissions.jakarta.pesawat;
    const savedPct = estCo2 && flightCo2 ? Math.round(((flightCo2 - estCo2) / flightCo2) * 100) : 0;
    const seedlings = estCo2 ? calcSeedlings(estCo2) : 0;
    const acHours = estCo2 && flightCo2 ? Math.round((flightCo2 - estCo2) / 0.7) : 0;

    mainEl.innerHTML = `
      <div class="proto-banner">
        <div class="container row-between">
          <span><strong>Data ilustrasi prototipe</strong> — Skor, harga, dan emisi mengikuti rumus terbuka PRD v1.2.</span>
          <a href="#/impact#metodologi" class="xs" style="text-decoration:underline;">Lihat rumus</a>
        </div>
      </div>

      <!-- Split Editorial Hero (Visual + Search) -->
      <section class="hero-editorial">
        <div class="container hero-split">
          <div class="stack-md">
            <div class="stack-xs">
              <span class="eyebrow">Ekowisata Terverifikasi Nusantara</span>
              <h1 class="display-title">Jelajahi Alam, Tinggalkan Jejak Kebaikan.</h1>
              <p class="muted" style="font-size: 1.05rem; margin: 0; max-width: 540px;">
                60% biaya perjalananmu langsung ke kas warga lokal, kuota tamu dibatasi ketat, dan jejak karbonnya dihitung jujur dari kota asalmu.
              </p>
            </div>

            <form class="hero-search-box" id="homeSearchForm">
              <div>
                <span class="field-label">Pilih Ekosistem</span>
                <div class="pill-group" id="homeCatChips">
                  ${['Semua', 'Desa Adat', 'Konservasi Laut', 'Hutan Pegunungan', 'Pesisir & Satwa']
                    .map(
                      (c, i) =>
                        `<button type="button" class="chip ${i === 0 ? 'active' : ''}" data-home-cat="${c}">${c}</button>`
                    )
                    .join('')}
                </div>
              </div>
              <div class="row-between" style="align-items:flex-end;">
                <div style="flex:1; min-width: 180px;">
                  <div class="row-between" style="margin-bottom:4px;">
                    <label class="field-label" for="homeScoreSlider" style="margin:0;">Eco-Score Minimal</label>
                    <span class="badge" id="homeScoreLabel">Skor ≥ 85</span>
                  </div>
                  <input id="homeScoreSlider" type="range" min="80" max="95" step="5" value="85" />
                </div>
                <button type="submit" class="btn btn-cta">Temukan Destinasi</button>
              </div>
            </form>
          </div>

          <div>
            <a href="#/destination/${featDest.slug}" class="hero-visual-frame" style="display:block;">
              ${imgTag(featDest.images.hero, `${featDest.name} di ${featDest.location}`, { w: 800, h: 600, lazy: false })}
              <div class="hero-visual-overlay">
                <div>
                  <span class="xs" style="opacity:0.85;">${featDest.location} • ${featDest.duration}</span>
                  <div class="font-serif" style="font-size:1.35rem; font-weight:600;">${featDest.name}</div>
                </div>
                <span class="score-pill">Eco-Score ${featDest.ecoScore}</span>
              </div>
            </a>
            <div class="hero-thumb-bar" aria-label="Pratinjau destinasi unggulan">
              ${DESTINATIONS.map(
                (d) =>
                  `<button type="button" class="hero-thumb-btn ${d.slug === featDest.slug ? 'active' : ''}" data-hero-slug="${d.slug}">${d.shortName}</button>`
              ).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Destinasi Pilihan -->
      <section class="section-alt">
        <div class="container stack-md">
          <div class="row-between">
            <div>
              <span class="eyebrow">Kurasi Terbatas</span>
              <h2 class="section-title">Empat Destinasi Mitra</h2>
            </div>
            <a href="#/explore" class="btn btn-secondary">Filter &amp; Bandingkan</a>
          </div>
          <div class="grid grid-4">${destCards}</div>
        </div>
      </section>

      <!-- Compact Dampak Terkini Strip (PRD 9C) -->
      <section class="impact-band" aria-label="Dampak Terkini">
        <div class="container impact-strip-grid">
          ${IMPACT_METRICS.map(
            (m) => `
            <div>
              <div class="impact-stat-val">${m.value}</div>
              <div class="xs" style="opacity:0.86;">${m.label}</div>
            </div>`
          ).join('')}
          <div>
            <a href="#/impact" class="btn btn-cta" style="min-height:40px;">Laporan &amp; Rumus →</a>
            <div class="xs" style="opacity:0.75; margin-top:4px;">Simulasi Jan–Okt 2026</div>
          </div>
        </div>
      </section>

      <!-- Transparansi Interaktif: 60/20/15/5 + Mini Carbon Estimator -->
      <section class="section">
        <div class="container">
          <div class="grid grid-2" style="gap: 24px; align-items: stretch;">
            <!-- Kiri: Donat 60/20/15/5 -->
            <div class="card card-pad stack-sm">
              <div class="row-between">
                <div>
                  <span class="eyebrow">Alokasi Biaya</span>
                  <h2 class="card-title">Ke Mana Uangmu Pergi?</h2>
                </div>
                <div class="row-wrap">
                  <select id="homeDonutSelect" class="select" style="min-height:36px; padding:4px 8px; width:auto;" aria-label="Pilih destinasi simulasi biaya">
                    ${DESTINATIONS.map(
                      (d) => `<option value="${d.slug}" ${d.slug === state.homeDonutSlug ? 'selected' : ''}>${d.shortName}</option>`
                    ).join('')}
                  </select>
                  <select id="homePaxSelect" class="select" style="min-height:36px; padding:4px 8px; width:auto;" aria-label="Jumlah peserta">
                    ${[1, 2, 3, 4, 5]
                      .map((n) => `<option value="${n}" ${n === state.homeDonutPax ? 'selected' : ''}>${n} org</option>`)
                      .join('')}
                  </select>
                </div>
              </div>
              <div id="homeDonutContainer">
                ${renderAllocationDonut(donutDest.price, state.homeDonutPax, state.homeDonutActiveSlice, 'home')}
              </div>
              <a href="#/impact#metodologi" class="xs" style="color:var(--cta); font-weight:600;">Lihat rumus Eco-Score 4 pilar (30/30/20/20) →</a>
            </div>

            <!-- Kanan: Mini Carbon Estimator -->
            <div class="card card-pad stack-sm" style="background: var(--surface);">
              <div>
                <span class="eyebrow">Kalkulator Emisi (Jakarta PP)</span>
                <h2 class="card-title">Bandingkan Moda Transportasimu</h2>
              </div>
              <div class="grid grid-2" style="gap: 10px;">
                <div>
                  <label class="field-label" for="estRoute">Tujuan</label>
                  <select id="estRoute" class="select" style="min-height:40px;">
                    ${DESTINATIONS.filter((d) => d.slug !== 'wae-rebo')
                      .map((d) => `<option value="${d.slug}" ${d.slug === state.estimatorRoute ? 'selected' : ''}>${d.shortName}</option>`)
                      .join('')}
                  </select>
                </div>
                <div>
                  <span class="field-label">Estimasi</span>
                  <div class="row-between" style="min-height:40px; padding:0 10px; background:var(--surface-card); border-radius:var(--radius-sm); border:1px solid var(--border-decor);">
                    <strong>${estCo2} kg CO2e</strong>
                    <span class="xs" style="color:var(--primary); font-weight:600;">${savedPct > 0 ? `-${savedPct}%` : 'Maks'}</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-3" style="gap: 8px;" id="estModes">
                ${['kereta', 'bus', 'pesawat']
                  .map((m) => {
                    const val = estDest.emissions.jakarta[m];
                    const disabled = val === null;
                    return `<button type="button" class="mode-card ${state.estimatorMode === m && !disabled ? 'active' : ''}" data-est-mode="${m}" ${
                      disabled ? 'disabled title="Moda tidak tersedia untuk rute ini"' : ''
                    }>
                      <strong class="xs">${EMISSION_FACTORS[m].label}</strong>
                      <span class="xs muted">${disabled ? 'N/A' : val + ' kg'}</span>
                    </button>`;
                  })
                  .join('')}
              </div>

              <div class="bar-track">
                <div class="bar-fill" style="width: ${Math.min(100, Math.round((estCo2 / flightCo2) * 100))}%; background: ${
      savedPct > 0 ? 'var(--primary)' : 'var(--cta)'
    };"></div>
              </div>
              <p class="xs muted" style="margin:0;">
                ${
                  acHours > 0
                    ? `Hemat setara mematikan AC kamar ~${acHours} jam. `
                    : 'Pilih darat bila memungkinkan. '
                }Offset: <strong>${seedlings} bibit mangrove</strong> (${formatRp(seedlings * MANGROVE_PRICE)}).
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Storyteller + Leave No Trace Split -->
      <section class="section-alt">
        <div class="container">
          <div class="stack-lg">
            <!-- Storyteller Full-Width Balanced Editorial Band -->
            <div class="card card-pad">
              <div class="story-card">
                <div class="story-photo">
                  ${imgTag(STORYTELLER.photo, `${STORYTELLER.name}, ${STORYTELLER.role}`, { w: 320, h: 320 })}
                </div>
                <div class="stack-xs">
                  <span class="eyebrow">Cerita Penjaga Alam</span>
                  <p class="font-serif" style="font-size:1.25rem; line-height:1.4; margin:0;">“${STORYTELLER.quote}”</p>
                  <p class="small muted" style="margin:0;">${STORYTELLER.body}</p>
                  <div class="row-between" style="padding-top:6px;">
                    <div>
                      <strong class="small">${STORYTELLER.name}</strong> <span class="xs muted">— ${STORYTELLER.role}</span>
                      <div class="xs muted"><em>${STORYTELLER.label}.</em></div>
                    </div>
                    <a href="#/destination/nglanggeran" class="btn btn-secondary" style="min-height:38px; padding:6px 14px;">Kunjungi Nglanggeran →</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Leave No Trace: Balanced 4x2 Grid (7 Principles + Action Card) -->
            <div class="stack-sm">
              <div class="row-between">
                <div>
                  <span class="eyebrow">Etika Alam Bebas</span>
                  <h2 class="section-title">7 Prinsip Leave No Trace</h2>
                </div>
                <a href="#/journal" class="small" style="color:var(--cta); font-weight:600;">Baca panduan kemas nol sampah →</a>
              </div>
              <div class="grid grid-4" style="gap:12px;">
                ${LEAVE_NO_TRACE.map(
                  (item) => `
                  <div class="lnt-row" style="background:var(--surface-card); border:1px solid var(--border-decor);">
                    <span class="lnt-num">${item.num}</span>
                    <div>
                      <strong class="small" style="display:block;">${item.title}</strong>
                      <span class="xs muted">${item.text}</span>
                    </div>
                  </div>`
                ).join('')}
                <a href="#/explore" class="lnt-row" style="background:var(--primary); color:#F8F5F0; align-items:center;">
                  <span class="lnt-num" style="color:#E8A889;">→</span>
                  <div>
                    <strong class="small" style="display:block;">Siap Berangkat?</strong>
                    <span class="xs" style="opacity:0.85;">Pilih destinasi yang sesuai ritmemu</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Bind Hero thumbnail switcher
    mainEl.querySelectorAll('[data-hero-slug]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.heroFeatureSlug = btn.getAttribute('data-hero-slug');
        renderHome();
      });
    });

    // Bind Home search events
    let selectedHomeCat = 'Semua';
    mainEl.querySelectorAll('[data-home-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedHomeCat = btn.getAttribute('data-home-cat');
        mainEl.querySelectorAll('[data-home-cat]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    const slider = document.getElementById('homeScoreSlider');
    const scoreLbl = document.getElementById('homeScoreLabel');
    slider.addEventListener('input', () => {
      scoreLbl.textContent = `Skor ≥ ${slider.value}`;
    });

    document.getElementById('homeSearchForm').addEventListener('submit', (e) => {
      e.preventDefault();
      state.explore.category = selectedHomeCat;
      state.explore.minScore = Number(slider.value);
      window.location.hash = '#/explore';
    });

    document.getElementById('homeDonutSelect').addEventListener('change', (e) => {
      state.homeDonutSlug = e.target.value;
      renderHome();
    });
    document.getElementById('homePaxSelect').addEventListener('change', (e) => {
      state.homeDonutPax = Number(e.target.value);
      renderHome();
    });
    mainEl.querySelectorAll('[data-donut-select^="home:"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.homeDonutActiveSlice = Number(btn.getAttribute('data-donut-select').split(':')[1]);
        renderHome();
      });
    });
    mainEl.querySelectorAll('#homeDonutContainer circle[data-slice]').forEach((c) => {
      c.addEventListener('click', () => {
        state.homeDonutActiveSlice = Number(c.getAttribute('data-slice'));
        renderHome();
      });
    });

    document.getElementById('estRoute').addEventListener('change', (e) => {
      state.estimatorRoute = e.target.value;
      const d = getDestBySlug(state.estimatorRoute);
      if (d.emissions.jakarta[state.estimatorMode] === null) {
        state.estimatorMode = d.emissions.jakarta.kereta !== null ? 'kereta' : 'bus';
      }
      renderHome();
    });
    mainEl.querySelectorAll('[data-est-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.estimatorMode = btn.getAttribute('data-est-mode');
        renderHome();
      });
    });
  }

  // --- VIEW 2: EKSPLORASI (#/explore) ---
  function renderExplore() {
    const filtered = DESTINATIONS.filter((d) => {
      if (state.explore.category !== 'Semua' && d.filterCategory !== state.explore.category) return false;
      if (d.ecoScore < state.explore.minScore) return false;
      if (state.explore.quotaOnly && d.quotaLeft <= 0) return false;
      return true;
    }).sort((a, b) => {
      if (state.explore.sort === 'score-desc') return b.ecoScore - a.ecoScore;
      if (state.explore.sort === 'price-asc') return a.price - b.price;
      if (state.explore.sort === 'quota-asc') return a.quotaLeft - b.quotaLeft;
      if (state.explore.sort === 'emission-asc') {
        return getLowestEmission(a, state.originCity) - getLowestEmission(b, state.originCity);
      }
      return 0;
    });

    const listHtml =
      filtered.length === 0
        ? `<div class="card card-pad stack-sm" style="text-align:center; padding: 48px 24px;">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" style="margin:0 auto;" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
            <h3 class="card-title">Tidak ada destinasi yang cocok</h3>
            <p class="small muted" style="margin:0;">Filter skor atau kategori saat ini terlalu ketat.</p>
            <div><button id="resetExploreBtn" type="button" class="btn btn-cta">Reset Semua Filter</button></div>
          </div>`
        : filtered
            .map((d) => {
              const range = getEmissionRange(d, state.originCity);
              const localShare = formatRp(Math.round(d.price * 0.6));
              return `
                <article class="card explore-card">
                  <div class="dest-img-wrap">
                    ${imgTag(d.images.hero, `${d.name} di ${d.location}`, { w: 600, h: 450 })}
                    <div class="dest-overlay-top">
                      <span class="score-pill">Eco-Score ${d.ecoScore}</span>
                    </div>
                    <span class="quota-pill">Sisa ${d.quotaLeft}/${d.quotaMax} kuota</span>
                  </div>
                  <div class="dest-body" style="justify-content:space-between;">
                    <div class="stack-xs">
                      <span class="xs muted">${d.location} • ${d.duration}</span>
                      <h2 class="card-title">${d.name}</h2>
                      <p class="small muted" style="margin:0;">${d.summary}</p>
                      <div class="row-wrap" style="margin-top:4px;">
                        ${d.badges.map((b) => `<span class="badge">${b}</span>`).join('')}
                      </div>
                    </div>
                    <div class="row-between" style="border-top: 1px solid var(--border-decor); padding-top: 12px;">
                      <div>
                        <span class="xs muted">Emisi PP (${state.originCity}): <strong>${range}</strong></span>
                        <div style="font-size:1.125rem; font-weight:700;">${formatRp(d.price)} <span class="xs muted" style="font-weight:400;">/org</span></div>
                        <span class="xs" style="color:var(--primary);">${localShare} (60%) langsung ke warga</span>
                      </div>
                      <a href="#/destination/${d.slug}" class="btn btn-cta">Lihat Rincian</a>
                    </div>
                  </div>
                </article>`;
            })
            .join('');

    mainEl.innerHTML = `
      <section class="section" style="padding-top: 28px;">
        <div class="container stack-md">
          <div class="row-between">
            <div>
              <span class="eyebrow">Katalog Terverifikasi</span>
              <h1 class="section-title">Eksplorasi Destinasi</h1>
            </div>
            <div class="row-wrap">
              <span class="xs muted">Kota Asal:</span>
              ${['jakarta', 'surabaya', 'yogyakarta']
                .map(
                  (c) =>
                    `<button type="button" class="chip ${state.originCity === c ? 'active' : ''}" data-city="${c}">${
                      c.charAt(0).toUpperCase() + c.slice(1)
                    }</button>`
                )
                .join('')}
            </div>
          </div>

          <div class="explore-layout">
            <aside class="card card-pad filter-sidebar stack-md">
              <div class="row-between">
                <h2 style="font-size:1rem;">Filter Audit</h2>
                <button type="button" id="sidebarResetBtn" class="xs" style="background:none; border:0; color:var(--cta); font-weight:700; cursor:pointer;">Reset</button>
              </div>

              <div class="stack-xs">
                <span class="field-label">Kategori</span>
                ${['Semua', 'Desa Adat', 'Konservasi Laut', 'Hutan Pegunungan', 'Pesisir & Satwa']
                  .map(
                    (c) => `
                    <label class="row-wrap small" style="cursor:pointer;">
                      <input type="radio" name="expCat" value="${c}" ${state.explore.category === c ? 'checked' : ''} />
                      <span>${c}</span>
                    </label>`
                  )
                  .join('')}
              </div>

              <div class="stack-xs">
                <span class="field-label">Eco-Score Minimal</span>
                ${[
                  { v: 80, l: 'Semua (≥ 80)' },
                  { v: 90, l: 'Tinggi (≥ 90)' },
                  { v: 95, l: 'Eksepsional (≥ 95)' }
                ]
                  .map(
                    (o) => `
                    <label class="row-wrap small" style="cursor:pointer;">
                      <input type="radio" name="expScore" value="${o.v}" ${state.explore.minScore === o.v ? 'checked' : ''} />
                      <span>${o.l}</span>
                    </label>`
                  )
                  .join('')}
              </div>

              <label class="row-wrap small" style="cursor:pointer;">
                <input type="checkbox" id="expQuota" ${state.explore.quotaOnly ? 'checked' : ''} />
                <span>Hanya yang punya sisa kuota</span>
              </label>

              <div>
                <label class="field-label" for="expSort">Urutkan</label>
                <select id="expSort" class="select">
                  <option value="score-desc" ${state.explore.sort === 'score-desc' ? 'selected' : ''}>Eco-Score Tertinggi</option>
                  <option value="emission-asc" ${state.explore.sort === 'emission-asc' ? 'selected' : ''}>Emisi Terendah</option>
                  <option value="price-asc" ${state.explore.sort === 'price-asc' ? 'selected' : ''}>Harga Terendah</option>
                  <option value="quota-asc" ${state.explore.sort === 'quota-asc' ? 'selected' : ''}>Kuota Terbatas</option>
                </select>
              </div>
            </aside>

            <div class="stack-md">
              <div class="row-between">
                <p class="small muted" style="margin:0;">Menampilkan <strong>${filtered.length}</strong> destinasi (data ilustrasi prototipe)</p>
              </div>
              <div class="stack-md">${listHtml}</div>
            </div>
          </div>
        </div>
      </section>
    `;

    mainEl.querySelectorAll('[data-city]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.originCity = btn.getAttribute('data-city');
        renderExplore();
      });
    });
    mainEl.querySelectorAll('input[name="expCat"]').forEach((r) => {
      r.addEventListener('change', (e) => {
        state.explore.category = e.target.value;
        renderExplore();
      });
    });
    mainEl.querySelectorAll('input[name="expScore"]').forEach((r) => {
      r.addEventListener('change', (e) => {
        state.explore.minScore = Number(e.target.value);
        renderExplore();
      });
    });
    document.getElementById('expQuota').addEventListener('change', (e) => {
      state.explore.quotaOnly = e.target.checked;
      renderExplore();
    });
    document.getElementById('expSort').addEventListener('change', (e) => {
      state.explore.sort = e.target.value;
      renderExplore();
    });

    const resetFn = () => {
      state.explore = { category: 'Semua', minScore: 80, quotaOnly: true, sort: 'score-desc' };
      renderExplore();
    };
    document.getElementById('sidebarResetBtn').addEventListener('click', resetFn);
    const emptyReset = document.getElementById('resetExploreBtn');
    if (emptyReset) emptyReset.addEventListener('click', resetFn);
  }

  // --- VIEW 3: DETAIL DESTINASI (#/destination/:slug) ---
  function renderDetail(slug) {
    const dest = getDestBySlug(slug);
    if (!dest) {
      renderNotFound();
      return;
    }

    const sub = dest.subScores;
    const cityEmissions = dest.emissions[state.originCity];
    const detailActiveSlice = state.homeDonutActiveSlice;

    mainEl.innerHTML = `
      <section class="section" style="padding-top: 24px;">
        <div class="container stack-md">
          <nav aria-label="Breadcrumb" class="row-wrap xs muted">
            <a href="#/">Beranda</a><span>/</span>
            <a href="#/explore">Eksplorasi</a><span>/</span>
            <span style="color:var(--text); font-weight:600;">${dest.shortName}</span>
          </nav>

          <div class="row-between" style="align-items:flex-end;">
            <div class="stack-xs" style="max-width: 720px;">
              <div class="row-wrap">
                <span class="badge">${dest.category}</span>
                <span class="badge badge-neutral">${dest.duration}</span>
                <span class="badge badge-neutral">${dest.location}</span>
              </div>
              <h1 class="display-title" style="font-size: clamp(1.75rem, 3.5vw, 2.5rem);">${dest.name}</h1>
              <p class="muted" style="margin:0;">${dest.summary}</p>
            </div>
            <button type="button" class="btn btn-cta" id="openDrawerHeroBtn">Pesan Perjalanan — ${formatRp(dest.price)}</button>
          </div>

          <!-- Galeri 3:2 -->
          <div class="detail-gallery">
            <div class="detail-gallery-main">
              ${imgTag(dest.images.hero, `${dest.name} pemandangan utama`, { w: 900, h: 600, lazy: false })}
            </div>
            <div class="detail-gallery-side">
              <div>${imgTag(dest.images.side1, `${dest.name} akomodasi dan lingkungan`, { w: 600, h: 400 })}</div>
              <div>${imgTag(dest.images.side2, `${dest.name} aktivitas konservasi`, { w: 600, h: 400 })}</div>
            </div>
          </div>

          <div class="detail-grid">
            <div class="stack-lg">
              <!-- Eco-Score Breakdown -->
              <div class="card card-pad stack-md">
                <div class="row-between">
                  <div>
                    <span class="eyebrow">Eco-Score</span>
                    <h2 class="section-title">Skor ${dest.ecoScore}/100 (${dest.ecoScoreRaw})</h2>
                  </div>
                  <span class="xs muted">Penilaian ilustrasi prototipe, belum diaudit</span>
                </div>
                <div class="grid grid-2">
                  <div>
                    <div class="row-between small"><span>Pengelolaan Sampah (30%)</span><strong>${sub.limbah}/100</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width:${sub.limbah}%"></div></div>
                  </div>
                  <div>
                    <div class="row-between small"><span>Ekonomi Warga Lokal (30%)</span><strong>${sub.lokal}/100</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width:${sub.lokal}%"></div></div>
                  </div>
                  <div>
                    <div class="row-between small"><span>Konservasi Alam (20%)</span><strong>${sub.konservasi}/100</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width:${sub.konservasi}%"></div></div>
                  </div>
                  <div>
                    <div class="row-between small"><span>Efisiensi Energi &amp; Air (20%)</span><strong>${sub.energi}/100</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width:${sub.energi}%"></div></div>
                  </div>
                </div>
              </div>

              <!-- Price & Impact Breakdown + Table Alternative (PRD 8E) -->
              <div class="card card-pad stack-md">
                <div>
                  <span class="eyebrow">Transparansi Biaya 60/20/15/5</span>
                  <h2 class="section-title">Rincian Paket ${formatRp(dest.price)} / Orang</h2>
                </div>
                <div id="detailDonutWrap">
                  ${renderAllocationDonut(dest.price, 1, detailActiveSlice, 'detail')}
                </div>
                <div class="table-wrap">
                  <table aria-label="Tabel rincian alokasi biaya per peserta">
                    <thead>
                      <tr><th>Pos Alokasi</th><th>Persentase</th><th>Nominal / Orang</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Warga Lokal &amp; Adat</td><td>60%</td><td>${formatRp(Math.round(dest.price * 0.6))}</td></tr>
                      <tr><td>Dana Konservasi</td><td>20%</td><td>${formatRp(Math.round(dest.price * 0.2))}</td></tr>
                      <tr><td>Operasional Lapangan</td><td>15%</td><td>${formatRp(Math.round(dest.price * 0.15))}</td></tr>
                      <tr><td>Platform LestariWay</td><td>5%</td><td>${formatRp(Math.round(dest.price * 0.05))}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Carbon Comparison by Origin City -->
              <div class="card card-pad stack-md">
                <div class="row-between">
                  <div>
                    <span class="eyebrow">Jejak Karbon Perjalanan</span>
                    <h2 class="section-title">Dari ${state.originCity.charAt(0).toUpperCase() + state.originCity.slice(1)}</h2>
                  </div>
                  <div class="row-wrap">
                    ${['jakarta', 'surabaya', 'yogyakarta']
                      .map(
                        (c) =>
                          `<button type="button" class="chip ${state.originCity === c ? 'active' : ''}" data-detail-city="${c}">${
                            c.charAt(0).toUpperCase() + c.slice(1)
                          }</button>`
                      )
                      .join('')}
                  </div>
                </div>
                <p class="small muted" style="margin:0;">${dest.honestNote}</p>
                <div class="grid grid-3">
                  ${['kereta', 'bus', 'pesawat']
                    .map((m) => {
                      const val = cityEmissions[m];
                      const note = dest.distanceNotes[state.originCity][m];
                      const seeds = val !== null ? calcSeedlings(val) : 0;
                      return `
                        <div class="card card-pad stack-xs" style="background:var(--surface);">
                          <strong>${EMISSION_FACTORS[m].label}</strong>
                          <div class="font-serif" style="font-size:1.5rem; font-weight:600;">${val !== null ? val + ' kg CO2e' : 'N/A'}</div>
                          <span class="xs muted">${note}</span>
                          ${val !== null ? `<span class="xs" style="color:var(--primary);">Offset: ${seeds} bibit (${formatRp(seeds * MANGROVE_PRICE)})</span>` : ''}
                        </div>`;
                    })
                    .join('')}
                </div>
              </div>

              <!-- Checklist Leave No Trace -->
              <div class="card card-pad stack-sm">
                <span class="eyebrow">Persiapan Lapangan</span>
                <h2 class="card-title">Aturan Khusus ${dest.shortName}</h2>
                <ul style="margin:0; padding-left: 20px;" class="stack-xs small">
                  ${dest.checklist.map((c) => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- Sticky Booking Sidebar -->
            <aside class="card card-pad detail-sticky stack-md">
              <div>
                <span class="xs muted">Harga Paket (${dest.duration})</span>
                <div class="font-serif" style="font-size:1.75rem; font-weight:600;">${formatRp(dest.price)} <span class="xs muted" style="font-family:var(--font-sans); font-weight:400;">/ orang</span></div>
                <span class="xs" style="color:var(--primary); font-weight:600;">${formatRp(Math.round(dest.price * 0.6))} langsung ke warga desa</span>
              </div>
              <div class="dest-meta">
                <div class="meta-row"><span>Kuota Harian</span><strong>Sisa ${dest.quotaLeft} dari ${dest.quotaMax}</strong></div>
                <div class="meta-row"><span>Eco-Score</span><strong>${dest.ecoScore}/100</strong></div>
                <div class="meta-row"><span>Kota Asal Aktif</span><strong>${state.originCity}</strong></div>
              </div>
              <button type="button" class="btn btn-cta" id="openDrawerSideBtn" style="width:100%;">Pesan Perjalanan</button>
              <p class="xs muted" style="margin:0;">Harga belum termasuk transportasi dari kota asal. Pemesanan bersifat simulasi prototipe.</p>
            </aside>
          </div>
        </div>
      </section>
    `;

    const triggerBooking = (e) => openBookingDrawer(dest.slug, e.currentTarget);
    document.getElementById('openDrawerHeroBtn').addEventListener('click', triggerBooking);
    document.getElementById('openDrawerSideBtn').addEventListener('click', triggerBooking);

    mainEl.querySelectorAll('[data-detail-city]').forEach((b) => {
      b.addEventListener('click', () => {
        state.originCity = b.getAttribute('data-detail-city');
        renderDetail(dest.slug);
      });
    });

    mainEl.querySelectorAll('[data-donut-select^="detail:"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.homeDonutActiveSlice = Number(btn.getAttribute('data-donut-select').split(':')[1]);
        renderDetail(dest.slug);
      });
    });
  }

  // --- VIEW 4: JURNAL (#/journal) ---
  function renderJournal() {
    if (state.journalActiveSlug) {
      const art = JOURNAL_ARTICLES.find((a) => a.slug === state.journalActiveSlug);
      if (art) {
        mainEl.innerHTML = `
          <section class="section">
            <div class="container" style="max-width: 760px;">
              <button type="button" class="btn btn-ghost" id="backJournalBtn" style="margin-bottom: 18px;">← Kembali ke Jurnal</button>
              <div class="stack-sm">
                <div class="row-wrap">
                  <span class="badge">${art.category}</span>
                  <span class="xs muted">${art.readTime}</span>
                </div>
                <h1 class="display-title" style="font-size: clamp(1.75rem, 3.5vw, 2.5rem);">${art.title}</h1>
                <p class="muted" style="font-size:1.0625rem;">${art.excerpt}</p>
                <hr style="border:0; border-top:1px solid var(--border-decor); width:100%;" />
                ${art.body.map((p) => `<p style="margin: 0 0 12px;">${p}</p>`).join('')}
              </div>
            </div>
          </section>`;
        document.getElementById('backJournalBtn').addEventListener('click', () => {
          state.journalActiveSlug = null;
          renderJournal();
        });
        return;
      }
    }

    const cats = ['Semua', 'Zero-Waste Travel', 'Budaya Lokal', 'Pelestarian Alam'];
    const list = JOURNAL_ARTICLES.filter((a) => state.journalFilter === 'Semua' || a.category === state.journalFilter);

    mainEl.innerHTML = `
      <section class="section">
        <div class="container stack-md">
          <div>
            <span class="eyebrow">Catatan Lapangan</span>
            <h1 class="section-title">Jurnal Perjalanan Bertanggung Jawab</h1>
          </div>
          <div class="pill-group">
            ${cats
              .map(
                (c) =>
                  `<button type="button" class="chip ${state.journalFilter === c ? 'active' : ''}" data-jcat="${c}">${c}</button>`
              )
              .join('')}
          </div>
          <div class="grid grid-3">
            ${list
              .map(
                (a) => `
              <article class="card card-pad stack-sm" style="justify-content:space-between;">
                <div class="stack-xs">
                  <div class="row-between">
                    <span class="badge">${a.category}</span>
                    <span class="xs muted">${a.readTime}</span>
                  </div>
                  <h2 class="card-title">${a.title}</h2>
                  <p class="small muted" style="margin:0;">${a.excerpt}</p>
                </div>
                <button type="button" class="btn btn-secondary" data-read-art="${a.slug}">Baca Artikel</button>
              </article>`
              )
              .join('')}
          </div>
        </div>
      </section>
    `;

    mainEl.querySelectorAll('[data-jcat]').forEach((b) => {
      b.addEventListener('click', () => {
        state.journalFilter = b.getAttribute('data-jcat');
        renderJournal();
      });
    });
    mainEl.querySelectorAll('[data-read-art]').forEach((b) => {
      b.addEventListener('click', () => {
        state.journalActiveSlug = b.getAttribute('data-read-art');
        renderJournal();
      });
    });
  }

  // --- VIEW 5: LAPORAN DAMPAK (#/impact) ---
  function renderImpact() {
    const tab = state.impactTab || 'desa';

    const desaView = `
      <div class="grid grid-4" style="gap:20px;">
        ${DESTINATIONS.map(
          (d) => `
          <article class="card dest-card">
            <div class="dest-img-wrap">
              ${imgTag(d.images.hero, d.name, { w: 480, h: 360 })}
              <div class="dest-overlay-top">
                <span class="score-pill">Eco-Score ${d.ecoScore}</span>
              </div>
              <span class="quota-pill">Maks ${d.quotaMax} tamu/hari</span>
            </div>
            <div class="dest-body" style="justify-content:space-between;">
              <div class="stack-xs">
                <span class="xs muted">${d.location}</span>
                <h2 class="card-title">${d.shortName}</h2>
                <p class="xs muted" style="margin:0;">${d.badges.join(' • ')}</p>
              </div>
              <div class="dest-meta">
                <div class="meta-row"><span>Untuk Warga (60%)</span><strong style="color:var(--primary);">${formatRp(Math.round(d.price * 0.6))}/org</strong></div>
              </div>
              <a href="#/destination/${d.slug}" class="btn btn-secondary" style="min-height:38px;">Buka Detail →</a>
            </div>
          </article>`
        ).join('')}
      </div>`;

    const auditView = `
      <div class="stack-sm">
        <div class="row-between">
          <span class="small muted">Pilih kota asal untuk melihat rentang emisi:</span>
          <div class="pill-group">
            ${['jakarta', 'surabaya', 'yogyakarta']
              .map(
                (c) =>
                  `<button type="button" class="chip ${state.originCity === c ? 'active' : ''}" data-imp-city="${c}">${
                    c.charAt(0).toUpperCase() + c.slice(1)
                  }</button>`
              )
              .join('')}
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Destinasi</th>
                <th>Eco-Score</th>
                <th>Sub-Skor (L / Lk / K / E)</th>
                <th>Emisi PP (${state.originCity})</th>
                <th>Porsi Warga (60%)</th>
              </tr>
            </thead>
            <tbody>
              ${DESTINATIONS.map(
                (d) => `
                <tr>
                  <td><a href="#/destination/${d.slug}" style="font-weight:600; color:var(--primary); text-decoration:underline;">${d.name}</a></td>
                  <td><strong>${d.ecoScore}</strong> <span class="xs muted">(${d.ecoScoreRaw})</span></td>
                  <td>${d.subScores.limbah} / ${d.subScores.lokal} / ${d.subScores.konservasi} / ${d.subScores.energi}</td>
                  <td>${getEmissionRange(d, state.originCity)}</td>
                  <td>${formatRp(Math.round(d.price * 0.6))} / org</td>
                </tr>`
              ).join('')}
            </tbody>
          </table>
        </div>
      </div>`;

    const rumusView = `
      <div class="grid grid-2" style="gap:20px;">
        <div class="card card-pad stack-sm">
          <span class="eyebrow">1. Cara Hitung Eco-Score</span>
          <h2 class="card-title">Empat pilar dengan bobot tetap</h2>
          <div class="stack-xs small">
            <div class="row-between"><span>Pengelolaan Sampah &amp; Nol Plastik</span><strong>30%</strong></div>
            <div class="row-between"><span>Kepemilikan &amp; Tenaga Kerja Warga</span><strong>30%</strong></div>
            <div class="row-between"><span>Aksi Konservasi Habitat</span><strong>20%</strong></div>
            <div class="row-between"><span>Efisiensi Energi &amp; Air</span><strong>20%</strong></div>
          </div>
          <p class="xs muted" style="margin:0;">Pada prototipe, angka sub-skor bersifat ilustrasi. Untuk produk nyata, penilaian wajib diaudit pihak independen dan dipublikasikan.</p>
        </div>

        <div class="card card-pad stack-sm">
          <span class="eyebrow">2. Cara Hitung Emisi &amp; Mangrove</span>
          <h2 class="card-title">Jarak Pulang-Pergi × Faktor Moda</h2>
          <div class="stack-xs small">
            <div class="row-between"><span>Kereta Api</span><strong>0,041 kg CO2e / km</strong></div>
            <div class="row-between"><span>Bus / Travel Bersama</span><strong>0,089 kg CO2e / km</strong></div>
            <div class="row-between"><span>Pesawat Domestik</span><strong>0,255 kg CO2e / km</strong></div>
          </div>
          <p class="xs muted" style="margin:0;">Asumsi prototipe merujuk KLHK/ESDM &amp; DEFRA/ICAO. 1 bibit mangrove (Rp 15.000) diasumsikan menyerap rata-rata 22 kg CO2e selama masa tumbuh.</p>
        </div>
      </div>`;

    mainEl.innerHTML = `
      <div class="proto-banner">
        <div class="container"><strong>Data simulasi untuk prototipe</strong> — Periode Jan–Okt 2026 (PRD v1.2).</div>
      </div>

      <section class="impact-band" style="padding: 36px 0;">
        <div class="container stack-md">
          <div class="stack-xs" style="max-width: 640px;">
            <span class="eyebrow" style="color:#E8A889;">Transparansi Berjalan</span>
            <h1 class="display-title" style="font-size: clamp(1.75rem, 3.5vw, 2.5rem); color:#F8F5F0;">Laporan Dampak LestariWay</h1>
            <p class="small" style="margin:0; opacity:0.86;">Ringkasan simulasi Jan–Okt 2026. Klik tab di bawah untuk melihat desa mitra, matriks audit, atau rumus hitung.</p>
          </div>
          <div class="grid grid-4" style="gap:16px;">
            ${IMPACT_METRICS.map(
              (m) => `
              <div style="background:rgba(248,245,240,0.08); border:1px solid rgba(248,245,240,0.16); border-radius:var(--radius-md); padding:16px;">
                <div class="impact-stat-val">${m.value}</div>
                <div class="small" style="font-weight:600; margin-top:4px;">${m.label}</div>
                <div class="xs" style="opacity:0.78; margin-top:4px;">${m.period}</div>
              </div>`
            ).join('')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container stack-md">
          <div class="pill-group" role="tablist" aria-label="Tampilan laporan dampak">
            <button type="button" role="tab" aria-selected="${tab === 'desa'}" class="chip ${tab === 'desa' ? 'active' : ''}" data-imp-tab="desa">4 Desa Mitra</button>
            <button type="button" role="tab" aria-selected="${tab === 'audit'}" class="chip ${tab === 'audit' ? 'active' : ''}" data-imp-tab="audit">Tabel Audit Destinasi</button>
            <button type="button" role="tab" aria-selected="${tab === 'rumus'}" class="chip ${tab === 'rumus' ? 'active' : ''}" data-imp-tab="rumus">Cara Kami Menghitung</button>
          </div>

          ${tab === 'desa' ? desaView : tab === 'audit' ? auditView : rumusView}
        </div>
      </section>
    `;

    mainEl.querySelectorAll('[data-imp-tab]').forEach((b) => {
      b.addEventListener('click', () => {
        state.impactTab = b.getAttribute('data-imp-tab');
        renderImpact();
      });
    });
    mainEl.querySelectorAll('[data-imp-city]').forEach((b) => {
      b.addEventListener('click', () => {
        state.originCity = b.getAttribute('data-imp-city');
        renderImpact();
      });
    });
  }

  // --- 404 State ---
  function renderNotFound() {
    mainEl.innerHTML = `
      <section class="section">
        <div class="container" style="max-width: 600px; text-align:center;">
          <div class="card card-pad stack-md">
            <span class="eyebrow">404 — Halaman Tidak Ditemukan</span>
            <h1 class="section-title">Rute yang kamu cari tidak tersedia.</h1>
            <p class="small muted" style="margin:0;">Pilih salah satu dari empat destinasi mitra LestariWay di bawah ini:</p>
            <div class="row-wrap" style="justify-content:center;">
              ${DESTINATIONS.map((d) => `<a href="#/destination/${d.slug}" class="btn btn-secondary">${d.shortName}</a>`).join('')}
            </div>
            <div><a href="#/" class="btn btn-cta">Kembali ke Beranda</a></div>
          </div>
        </div>
      </section>
    `;
  }

  // --- BOOKING DRAWER (P0 + P1, Focus Trap, 4 Steps) ---
  function openBookingDrawer(slug, triggerEl) {
    lastTriggerEl = triggerEl || document.activeElement;
    const dest = getDestBySlug(slug);
    if (!dest) return;

    const availModes = ['kereta', 'bus', 'pesawat'].filter((m) => dest.emissions[state.originCity][m] !== null);
    state.drawer = {
      open: true,
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
      bookingCode: ''
    };
    bookingBackdrop.hidden = false;
    renderDrawer();
    closeDrawerBtn.focus();
  }

  function closeBookingDrawer() {
    state.drawer.open = false;
    bookingBackdrop.hidden = true;
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
    }
  }

  closeDrawerBtn.addEventListener('click', closeBookingDrawer);
  bookingBackdrop.addEventListener('click', (e) => {
    if (e.target === bookingBackdrop) closeBookingDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.drawer.open) closeBookingDrawer();
  });

  // Focus trap inside drawer
  bookingDrawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = bookingDrawer.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]');
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
  });

  function renderDrawer() {
    const dr = state.drawer;
    const dest = getDestBySlug(dr.slug);
    if (!dest) return;

    const fullDate = '2026-11-22'; // Simulasi tanggal penuh (PRD 3C)
    const isDateFull = dr.date === fullDate;

    const co2PerPerson = dest.emissions[state.originCity][dr.mode] || 0;
    const seedlingsPerPerson = calcSeedlings(co2PerPerson);
    const totalSeedlings = seedlingsPerPerson * dr.pax;
    const offsetCost = dr.offset ? totalSeedlings * MANGROVE_PRICE : 0;
    const tripCost = dest.price * dr.pax;
    const grandTotal = tripCost + offsetCost;

    drawerStepLabel.textContent = `Langkah ${dr.step} dari 4`;
    drawerTitle.textContent = dr.step === 4 ? 'Paperless E-Pass' : `Pesan: ${dest.shortName}`;

    if (dr.step === 1) {
      drawerBody.innerHTML = `
        <div class="stack-sm">
          <p class="small muted" style="margin:0;">Simulasi pemesanan prototipe — tidak ada data pribadi yang dikirim ke server.</p>
          <div>
            <label class="field-label" for="drName">Nama Lengkap</label>
            <input id="drName" class="input" type="text" value="${dr.name}" placeholder="Misal: Nadia Larasati" required />
            <div class="error-msg" id="errName" hidden>Nama wajib diisi minimal 2 huruf.</div>
          </div>
          <div>
            <label class="field-label" for="drEmail">Email untuk E-Pass</label>
            <input id="drEmail" class="input" type="email" value="${dr.email}" placeholder="nama@email.com" required />
            <div class="error-msg" id="errEmail" hidden>Masukkan alamat email yang valid.</div>
          </div>
          <div class="grid grid-2" style="gap: 12px;">
            <div>
              <label class="field-label" for="drPax">Jumlah Peserta (Maks ${dest.quotaLeft})</label>
              <input id="drPax" class="input" type="number" min="1" max="${dest.quotaLeft}" value="${dr.pax}" />
            </div>
            <div>
              <label class="field-label" for="drDate">Tanggal Berangkat</label>
              <select id="drDate" class="select">
                <option value="2026-11-21" ${dr.date === '2026-11-21' ? 'selected' : ''}>21 Nov 2026 (Tersedia)</option>
                <option value="2026-11-22" ${dr.date === '2026-11-22' ? 'selected' : ''}>22 Nov 2026 (Kuota Penuh)</option>
                <option value="2026-11-28" ${dr.date === '2026-11-28' ? 'selected' : ''}>28 Nov 2026 (Tersisa 3)</option>
              </select>
            </div>
          </div>
          ${
            isDateFull
              ? `<div class="badge badge-warn" style="padding:10px 12px;">Kuota 22 Nov 2026 penuh. Pilih 21 Nov atau 28 Nov 2026 yang tersedia.</div>`
              : ''
          }
        </div>
      `;
      drawerFoot.innerHTML = `
        <button type="button" class="btn btn-ghost" id="drCancel">Batal</button>
        <button type="button" class="btn btn-cta" id="drNext1" ${isDateFull ? 'disabled' : ''}>Lanjut ke Transportasi</button>
      `;

      const nameEl = document.getElementById('drName');
      const emailEl = document.getElementById('drEmail');
      const validateName = () => {
        const ok = nameEl.value.trim().length >= 2;
        nameEl.classList.toggle('error', !ok);
        document.getElementById('errName').hidden = ok;
        return ok;
      };
      const validateEmail = () => {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
        emailEl.classList.toggle('error', !ok);
        document.getElementById('errEmail').hidden = ok;
        return ok;
      };

      nameEl.addEventListener('blur', validateName);
      emailEl.addEventListener('blur', validateEmail);
      document.getElementById('drPax').addEventListener('change', (e) => {
        dr.pax = Math.max(1, Math.min(dest.quotaLeft, Number(e.target.value) || 1));
      });
      document.getElementById('drDate').addEventListener('change', (e) => {
        dr.date = e.target.value;
        dr.name = nameEl.value;
        dr.email = emailEl.value;
        renderDrawer();
      });
      document.getElementById('drCancel').addEventListener('click', closeBookingDrawer);
      document.getElementById('drNext1').addEventListener('click', () => {
        dr.name = nameEl.value.trim();
        dr.email = emailEl.value.trim();
        if (validateName() & validateEmail()) {
          dr.step = 2;
          renderDrawer();
        }
      });
    } else if (dr.step === 2) {
      drawerBody.innerHTML = `
        <div class="stack-md">
          <div>
            <span class="field-label">Moda dari ${state.originCity} (PP)</span>
            <div class="stack-xs">
              ${['kereta', 'bus', 'pesawat']
                .map((m) => {
                  const val = dest.emissions[state.originCity][m];
                  const disabled = val === null;
                  return `
                    <button type="button" class="mode-card ${dr.mode === m && !disabled ? 'active' : ''}" data-dr-mode="${m}" ${
                    disabled ? 'disabled' : ''
                  }>
                      <div class="row-between">
                        <strong>${EMISSION_FACTORS[m].label}</strong>
                        <span>${disabled ? 'Tidak tersedia' : val + ' kg CO2e / org'}</span>
                      </div>
                      <span class="xs muted">${dest.distanceNotes[state.originCity][m]}</span>
                    </button>`;
                })
                .join('')}
            </div>
          </div>

          <div class="card card-pad stack-xs" style="background: var(--surface);">
            <label class="row-between" style="cursor:pointer;">
              <span><strong>Sertakan Offset Mangrove</strong> (${totalSeedlings} bibit)</span>
              <input type="checkbox" id="drOffset" ${dr.offset ? 'checked' : ''} style="width:20px; height:20px;" />
            </label>
            <div class="row-between small">
              <span class="muted">Total emisi ${dr.pax} peserta: ${co2PerPerson * dr.pax} kg CO2e</span>
              <strong>+${formatRp(totalSeedlings * MANGROVE_PRICE)}</strong>
            </div>
            <p class="xs muted" style="margin:4px 0 0;">
              Kompensasi melengkapi, bukan menggantikan, upaya mengurangi emisi. Pilih moda yang lebih rendah emisi jika memungkinkan.
            </p>
          </div>
        </div>
      `;
      drawerFoot.innerHTML = `
        <button type="button" class="btn btn-secondary" id="drBack2">Kembali</button>
        <button type="button" class="btn btn-cta" id="drNext2">Ringkasan Biaya</button>
      `;

      drawerBody.querySelectorAll('[data-dr-mode]').forEach((b) => {
        b.addEventListener('click', () => {
          dr.mode = b.getAttribute('data-dr-mode');
          renderDrawer();
        });
      });
      document.getElementById('drOffset').addEventListener('change', (e) => {
        dr.offset = e.target.checked;
        renderDrawer();
      });
      document.getElementById('drBack2').addEventListener('click', () => {
        dr.step = 1;
        renderDrawer();
      });
      document.getElementById('drNext2').addEventListener('click', () => {
        dr.step = 3;
        renderDrawer();
      });
    } else if (dr.step === 3) {
      drawerBody.innerHTML = `
        <div class="stack-md">
          <div class="card card-pad stack-xs" style="background: var(--surface);">
            <strong>${dest.name}</strong>
            <span class="small muted">${dr.name} • ${dr.pax} peserta • ${dr.date}</span>
            <span class="small muted">Moda: ${EMISSION_FACTORS[dr.mode].label} (${co2PerPerson * dr.pax} kg CO2e)</span>
          </div>

          <div class="stack-xs small">
            <div class="row-between"><span>Paket (${dr.pax} × ${formatRp(dest.price)})</span><strong>${formatRp(tripCost)}</strong></div>
            <div class="row-between muted"><span>↳ Untuk Warga Lokal (60%)</span><span>${formatRp(Math.round(tripCost * 0.6))}</span></div>
            <div class="row-between muted"><span>↳ Dana Konservasi (20%)</span><span>${formatRp(Math.round(tripCost * 0.2))}</span></div>
            <div class="row-between"><span>Offset Mangrove (${dr.offset ? totalSeedlings + ' bibit' : 'Tidak dipilih'})</span><strong>${formatRp(offsetCost)}</strong></div>
            <hr style="border:0; border-top:1px solid var(--border-decor); width:100%;" />
            <div class="row-between" style="font-size:1.125rem;"><strong>Total Simulasi</strong><strong style="color:var(--primary);">${formatRp(grandTotal)}</strong></div>
          </div>

          <label class="row-wrap xs muted" style="cursor:pointer;">
            <input type="checkbox" id="drSimFail" ${dr.simFail ? 'checked' : ''} />
            <span>Uji skenario pembayaran gagal (simulasi)</span>
          </label>

          ${
            dr.error
              ? `<div class="badge badge-warn" style="padding:10px 12px; border-radius:var(--radius-sm); display:grid; gap:6px;">
                  <span>${dr.error}</span>
                </div>`
              : ''
          }

          <p class="xs muted" style="margin:0;">
            Catatan: Pembayaran ini adalah simulasi prototipe. Tidak ada pemrosesan kartu atau pengiriman data pribadi nyata.
          </p>
        </div>
      `;
      drawerFoot.innerHTML = `
        <button type="button" class="btn btn-secondary" id="drBack3" ${dr.loading ? 'disabled' : ''}>Kembali</button>
        <button type="button" class="btn btn-cta" id="drPayBtn" ${dr.loading ? 'disabled' : ''}>
          ${dr.loading ? 'Memproses Simulasi...' : dr.error ? 'Coba Lagi' : 'Konfirmasi Simulasi Bayar'}
        </button>
      `;

      document.getElementById('drSimFail').addEventListener('change', (e) => {
        dr.simFail = e.target.checked;
      });
      document.getElementById('drBack3').addEventListener('click', () => {
        dr.error = null;
        dr.step = 2;
        renderDrawer();
      });
      document.getElementById('drPayBtn').addEventListener('click', () => {
        dr.loading = true;
        dr.error = null;
        renderDrawer();
        setTimeout(() => {
          dr.loading = false;
          if (dr.simFail) {
            dr.simFail = false;
            dr.error = 'Koneksi simulasi terputus. Data formulirmu tetap aman—silakan tekan Coba Lagi.';
            renderDrawer();
            return;
          }
          dr.bookingCode = `LW-${dest.shortName.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
          dr.step = 4;
          renderDrawer();
          showToast('Simulasi reservasi berhasil. Paperless E-Pass siap digunakan.');
        }, 1200);
      });
    } else if (dr.step === 4) {
      drawerBody.innerHTML = `
        <div class="stack-md">
          <div class="card card-pad stack-xs" style="border-color: var(--primary); background: var(--primary-soft);">
            <span class="eyebrow">Terkonfirmasi (Simulasi)</span>
            <div class="font-serif" style="font-size:1.5rem; font-weight:600;">${dr.bookingCode}</div>
            <p class="small" style="margin:0;">${dest.name} • ${dr.date} • ${dr.pax} peserta</p>
            <div class="row-wrap" style="margin-top:4px;">
              <button type="button" class="btn btn-secondary" id="copyCodeBtn" style="min-height:36px; padding:4px 12px;">Salin Kode</button>
              <button type="button" class="btn btn-secondary" id="savePassBtn" style="min-height:36px; padding:4px 12px;">Simpan E-Pass (PNG)</button>
            </div>
          </div>

          <div class="stack-xs">
            <span class="eyebrow">Checklist Leave No Trace</span>
            ${dest.checklist
              .map(
                (item) => `
              <label class="row-wrap small" style="align-items:flex-start;">
                <input type="checkbox" style="margin-top:4px;" />
                <span>${item}</span>
              </label>`
              )
              .join('')}
          </div>
        </div>
      `;
      drawerFoot.innerHTML = `
        <button type="button" class="btn btn-cta" id="drDone" style="width:100%;">Selesai &amp; Kembali</button>
      `;

      document.getElementById('copyCodeBtn').addEventListener('click', () => {
        if (navigator.clipboard) navigator.clipboard.writeText(dr.bookingCode).catch(() => {});
        showToast(`Kode ${dr.bookingCode} disalin.`);
      });
      document.getElementById('savePassBtn').addEventListener('click', () => {
        const c = document.createElement('canvas');
        c.width = 720;
        c.height = 380;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#1B4332';
        ctx.fillRect(0, 0, 720, 380);
        ctx.fillStyle = '#F8F5F0';
        ctx.fillRect(24, 24, 672, 332);
        ctx.fillStyle = '#B8512B';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('LESTARIWAY PAPERLESS E-PASS (SIMULASI)', 48, 72);
        ctx.fillStyle = '#1F2421';
        ctx.font = 'bold 34px serif';
        ctx.fillText(dr.bookingCode, 48, 124);
        ctx.font = '18px sans-serif';
        ctx.fillText(dest.name, 48, 174);
        ctx.fillStyle = '#525B56';
        ctx.font = '16px sans-serif';
        ctx.fillText(`Peserta: ${dr.name} (${dr.pax} org) • Tanggal: ${dr.date}`, 48, 212);
        ctx.fillText(`Moda: ${EMISSION_FACTORS[dr.mode].label} • Total: ${formatRp(grandTotal)}`, 48, 244);
        ctx.fillStyle = '#1B4332';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`60% langsung ke warga (${formatRp(Math.round(tripCost * 0.6))})`, 48, 304);
        const a = document.createElement('a');
        a.href = c.toDataURL('image/png');
        a.download = `${dr.bookingCode}.png`;
        a.click();
        showToast('E-Pass PNG berhasil diunduh.');
      });
      document.getElementById('drDone').addEventListener('click', () => {
        closeBookingDrawer();
        window.location.hash = '#/';
      });
    }
  }

  // Init
  loadEcoPref();
  render();
})();


// Measured Page Weight in Footer (PRD Bagian 3D & 11)
window.addEventListener('load', () => {
  const lbl = document.getElementById('pageWeightLabel');
  if (!lbl || !window.performance || !performance.getEntriesByType) return;
  const resources = performance.getEntriesByType('resource');
  const totalBytes = resources.reduce((sum, r) => sum + (r.transferSize || r.encodedBodySize || 0), 0);
  if (totalBytes > 0) {
    const kb = Math.round(totalBytes / 1024);
    lbl.textContent = `Beban terukur sesi ini: ~${kb} KB`;
  }
});
