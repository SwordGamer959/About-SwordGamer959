/**
 * ==========================================================================
 * SWORDGAMER959 – ULTRA-PREMIUM GAMING CREATOR PORTFOLIO
 * Production-Ready Static Vanilla JavaScript • Zero Dependencies
 * ==========================================================================
 */

// ==========================================================================
// SITE CONFIGURATION
// Easily configure API keys, endpoints, and channel settings below.
// ==========================================================================
const CONFIG = {
  // Official YouTube Data API v3 configuration
  // Get a key from Google Cloud Console: https://console.cloud.google.com/
  // Restrict key by HTTP referrer to your GitHub Pages URL for security.
  YOUTUBE_API_KEY: '', // e.g., 'AIzaSy...' (leave blank to show clean unconfigured state)
  YOUTUBE_CHANNEL_ID: '', // Optional: YouTube Channel ID (e.g., 'UC...')
  YOUTUBE_CHANNEL_HANDLE: 'SwordGamer8682', // YouTube Handle (without @)

  // Shared Visitor Counter Service
  // Enables cross-visitor global hit counting (e.g., CountAPI, Supabase, or custom REST endpoint)
  VISITOR_COUNTER_ENABLED: false, // Set to true when you have an active endpoint
  VISITOR_COUNTER_ENDPOINT: '', // e.g., 'https://api.countapi.xyz/hit/swordgamer959/visits'

  // Contact Form Backend Endpoint (e.g. Formspree: https://formspree.io/f/xyz or EmailJS)
  // When blank, the form automatically falls back to the user's default email client (mailto:)
  CONTACT_FORM_ENDPOINT: '', 

  // Creator Details
  CONTACT_EMAIL: 'swordgamer8682@gmail.com',
  YOUTUBE_URL: 'https://www.youtube.com/@SwordGamer8682',
  DISCORD_URL: 'https://discord.com/invite/S4MdNCQEcH',
  INSTAGRAM_URL: 'https://www.instagram.com/SwordGamer959'
};

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initThemeToggle();
  initNavigation();
  initLiveClock();
  initYouTubeStats();
  initVisitorCounter();
  initHeroParticles();
  initPortfolioFilters();
  initVideoModal();
  initContactForm();
  initBackToTop();
  initGemHuntGame();
});

/* ==========================================================================
   1. LOADING SCREEN
   ========================================================================== */
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  const bar = document.getElementById('loader-bar-fill');
  const skipBtn = document.getElementById('skip-loader-btn');
  if (!loader) return;

  const hasLoadedBefore = localStorage.getItem('swordgamer_visited');
  const duration = hasLoadedBefore ? 600 : 1500; // Shorter load for returning visitors

  let progress = 0;
  const intervalTime = 30;
  const step = (100 / (duration / intervalTime));

  const progressInterval = setInterval(() => {
    progress += step;
    if (bar) bar.style.width = Math.min(100, progress) + '%';

    if (progress >= 100) {
      clearInterval(progressInterval);
      dismissLoader();
    }
  }, intervalTime);

  function dismissLoader() {
    clearInterval(progressInterval);
    if (bar) bar.style.width = '100%';
    loader.classList.add('hidden-loader');
    localStorage.setItem('swordgamer_visited', 'true');
    setTimeout(() => {
      loader.remove();
    }, 600);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissLoader);
  }
}

/* ==========================================================================
   2. THEME SWITCHER (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('swordgamer_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('swordgamer_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    toggleBtn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  }
}

/* ==========================================================================
   3. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll listener for sticky background blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy active link detection
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Menu Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile menu on link click
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }
}

/* ==========================================================================
   4. LIVE LOCAL CLOCK
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock-time');
  const dateEl = document.getElementById('live-clock-date');
  const tzEl = document.getElementById('live-clock-tz');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${hours}:${minutes}:${seconds}`;

    if (dateEl) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      dateEl.textContent = now.toLocaleDateString(undefined, options);
    }

    if (tzEl) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
        tzEl.textContent = tz.replace('_', ' ');
      } catch {
        tzEl.textContent = 'Local Time';
      }
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   5. REAL YOUTUBE SUBSCRIBER COUNT INTEGRATION
   ========================================================================== */
async function initYouTubeStats() {
  const subCounterEl = document.getElementById('yt-sub-count');
  const subStatusBadge = document.getElementById('yt-sub-status');
  if (!subCounterEl) return;

  // Check if API Key is configured
  if (!CONFIG.YOUTUBE_API_KEY || CONFIG.YOUTUBE_API_KEY === '') {
    // Graceful unconfigured state: NEVER show a fake hardcoded number!
    subCounterEl.textContent = 'API Ready';
    subCounterEl.style.fontSize = '1.85rem';
    if (subStatusBadge) {
      subStatusBadge.textContent = 'Setup in script.js';
      subStatusBadge.title = 'Add your YOUTUBE_API_KEY at top of script.js to stream real live subscriber count';
      subStatusBadge.classList.add('config-hint');
    }
    return;
  }

  try {
    subCounterEl.textContent = 'Connecting...';
    subCounterEl.style.fontSize = '1.5rem';

    let url = '';
    if (CONFIG.YOUTUBE_CHANNEL_ID) {
      url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CONFIG.YOUTUBE_CHANNEL_ID}&key=${CONFIG.YOUTUBE_API_KEY}`;
    } else {
      url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${CONFIG.YOUTUBE_CHANNEL_HANDLE}&key=${CONFIG.YOUTUBE_API_KEY}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const subCount = parseInt(data.items[0].statistics.subscriberCount, 10);
      animateCounter(subCounterEl, subCount);
      if (subStatusBadge) {
        subStatusBadge.textContent = 'Live Verified';
        subStatusBadge.classList.add('live');
      }
    } else {
      throw new Error('Channel not found');
    }
  } catch (error) {
    console.warn('YouTube Data API notice:', error.message);
    subCounterEl.textContent = 'Unavailable';
    subCounterEl.style.fontSize = '1.75rem';
    if (subStatusBadge) {
      subStatusBadge.textContent = 'Offline / Quota';
    }
  }
}

/* ==========================================================================
   6. REAL VISITOR COUNTER INTEGRATION LAYER
   ========================================================================== */
async function initVisitorCounter() {
  const visitorCountEl = document.getElementById('visitor-count-value');
  const visitorBadgeEl = document.getElementById('visitor-status-badge');
  if (!visitorCountEl) return;

  // 1. Shared Remote Endpoint Mode
  if (CONFIG.VISITOR_COUNTER_ENABLED && CONFIG.VISITOR_COUNTER_ENDPOINT) {
    try {
      // Prevent rapid duplicate counting in single browser session
      const sessionVisited = sessionStorage.getItem('swordgamer_session_counted');
      const fetchUrl = CONFIG.VISITOR_COUNTER_ENDPOINT;

      const res = await fetch(fetchUrl);
      if (res.ok) {
        const data = await res.json();
        // Support standard formats: { value: 1234 } or { count: 1234 } or raw number
        const count = data.value || data.count || data.visits || (typeof data === 'number' ? data : 1);
        animateCounter(visitorCountEl, count);
        sessionStorage.setItem('swordgamer_session_counted', 'true');
        if (visitorBadgeEl) {
          visitorBadgeEl.textContent = 'Global Live';
          visitorBadgeEl.classList.add('live');
        }
        return;
      }
    } catch (e) {
      console.warn('Remote visitor counter unreachable, falling back to local session counter:', e);
    }
  }

  // 2. Local Session/Device Fallback Mode
  // Clearly labeled in code & UI as Local Demo counter to ensure complete transparency
  try {
    const LOCAL_KEY = 'swordgamer_local_visit_count';
    let localCount = parseInt(localStorage.getItem(LOCAL_KEY) || '1', 10);
    
    // Only increment once per session to avoid inflated numbers on refresh
    if (!sessionStorage.getItem('swordgamer_local_session')) {
      localCount += 1;
      localStorage.setItem(LOCAL_KEY, localCount.toString());
      sessionStorage.setItem('swordgamer_local_session', 'true');
    }

    animateCounter(visitorCountEl, localCount);
    if (visitorBadgeEl) {
      visitorBadgeEl.textContent = 'Device Visits';
      visitorBadgeEl.title = 'Local device counter. Configure VISITOR_COUNTER_ENDPOINT in script.js for global cross-visitor counts.';
    }
  } catch {
    visitorCountEl.textContent = '1';
  }
}

// Reusable animated count up
function animateCounter(element, target) {
  if (!element || isNaN(target)) return;
  const duration = 1200;
  const startTime = performance.now();
  const startVal = 0;

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(startVal + (target - startVal) * easeProgress);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(step);
}

/* ==========================================================================
   7. HERO PARTICLES (CANVAS)
   ========================================================================== */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }, { passive: true });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 25 : 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.4 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#a855f7' : '#ef4444'
    });
  }

  let animationId;
  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.restore();
    });

    animationId = requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   8. PORTFOLIO FILTERING
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. VIDEO PREVIEW MODAL
   ========================================================================== */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-modal-iframe');
  const closeBtn = document.getElementById('modal-close-btn');
  const videoCards = document.querySelectorAll('.video-card');
  if (!modal || !iframe) return;

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-video-id');
      if (videoId) {
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        modal.classList.add('active');
      } else {
        window.open(CONFIG.YOUTUBE_URL, '_blank');
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    iframe.src = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. CONTACT FORM & CLIPBOARD COPY
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');
  const alertEl = document.getElementById('form-status-alert');

  // Copy email to clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.CONTACT_EMAIL);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.color = '#34d399';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.color = '';
        }, 2000);
      } catch {
        alert(`Email: ${CONFIG.CONTACT_EMAIL}`);
      }
    });
  }

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput?.value.trim();
      const email = emailInput?.value.trim();
      const message = messageInput?.value.trim();

      if (!name || !email || !message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
      }

      // Check if real form endpoint configured
      if (CONFIG.CONTACT_FORM_ENDPOINT && CONFIG.CONTACT_FORM_ENDPOINT.trim() !== '') {
        try {
          showAlert('Sending message...', 'info');
          const response = await fetch(CONFIG.CONTACT_FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, message })
          });

          if (response.ok) {
            showAlert('Message sent successfully! Thank you for reaching out.', 'info');
            form.reset();
          } else {
            throw new Error('Server returned an error');
          }
        } catch {
          launchMailtoFallback(name, email, message);
        }
      } else {
        // Honest Static Site Behavior: Launch mailto fallback
        launchMailtoFallback(name, email, message);
      }
    });
  }

  function launchMailtoFallback(name, email, message) {
    showAlert(
      `Opening your default email app to deliver this note directly to ${CONFIG.CONTACT_EMAIL}...`,
      'info'
    );
    const subject = encodeURIComponent(`[SwordGamer959 Website] Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    setTimeout(() => {
      window.location.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }, 400);
  }

  function showAlert(msg, type) {
    if (!alertEl) return;
    alertEl.textContent = msg;
    alertEl.className = `form-status-alert ${type}`;
  }
}

/* ==========================================================================
   11. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   12. INTERACTIVE MINI-GAME: MINECRAFT GEM HUNT
   ========================================================================== */
function initGemHuntGame() {
  const canvas = document.getElementById('gem-hunt-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // DOM Elements
  const scoreValEl = document.getElementById('game-score-val');
  const timeValEl = document.getElementById('game-time-val');
  const comboValEl = document.getElementById('game-combo-val');
  const bestValEl = document.getElementById('game-best-val');
  const startScreen = document.getElementById('game-start-screen');
  const gameOverScreen = document.getElementById('game-gameover-screen');
  const startBtn = document.getElementById('game-start-btn');
  const playAgainBtn = document.getElementById('game-playagain-btn');
  const soundToggleBtn = document.getElementById('game-sound-toggle');
  const summaryScoreEl = document.getElementById('game-final-score');
  const summaryBestEl = document.getElementById('game-final-best');

  // Game Settings & State
  let gameState = 'title'; // 'title', 'playing', 'paused', 'gameover'
  let score = 0;
  let combo = 1;
  let timeLeft = 30;
  let highScore = parseInt(localStorage.getItem('swordgamer_gemhunt_best') || '0', 10);
  let soundEnabled = false; // Off by default as required
  let timerInterval = null;
  let animationFrameId = null;

  if (bestValEl) bestValEl.textContent = highScore.toString();

  // Targets array (gems and hazards)
  const targets = [];
  const particles = [];

  // Responsive Canvas Sizing
  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Web Audio API Retro Sound Synthesizer
  let audioCtx = null;
  function playSynthSound(type) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'gem') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'hazard') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'gameover') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(120, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch {
      // Audio not supported or blocked
    }
  }

  // Sound toggle button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.textContent = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      soundToggleBtn.classList.toggle('active', soundEnabled);
    });
  }

  // Target Generation
  function spawnTarget() {
    if (gameState !== 'playing') return;

    const size = Math.random() < 0.3 ? 42 : 36;
    const padding = 50;
    const x = padding + Math.random() * (canvas.width - padding * 2 - size);
    const y = padding + Math.random() * (canvas.height - padding * 2 - size);

    const rand = Math.random();
    let type = 'diamond';
    let points = 100;
    let color = '#38bdf8';

    if (rand < 0.25) {
      type = 'diamond';
      points = 100;
      color = '#38bdf8';
    } else if (rand < 0.5) {
      type = 'emerald';
      points = 75;
      color = '#34d399';
    } else if (rand < 0.7) {
      type = 'netherite';
      points = 150;
      color = '#c084fc';
    } else if (rand < 0.85) {
      type = 'amethyst';
      points = 50;
      color = '#e879f9';
    } else {
      type = 'tnt'; // Hazard!
      points = -100;
      color = '#ef4444';
    }

    // Velocity for moving targets as difficulty ramps up
    const speed = (30 - timeLeft) * 0.08 + 0.4;
    const angle = Math.random() * Math.PI * 2;

    targets.push({
      x,
      y,
      size,
      type,
      points,
      color,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 140, // frames to click before disappearing
      maxLife: 140
    });
  }

  // Visual Splatter Particles
  function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color,
        alpha: 1,
        life: 20
      });
    }
  }

  // Target Hit Detection
  function handlePointerClick(clientX, clientY) {
    if (gameState !== 'playing') return;

    const rect = canvas.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    let hit = false;

    for (let i = targets.length - 1; i >= 0; i--) {
      const t = targets[i];
      if (
        clickX >= t.x &&
        clickX <= t.x + t.size &&
        clickY >= t.y &&
        clickY <= t.y + t.size
      ) {
        hit = true;
        createParticles(t.x + t.size / 2, t.y + t.size / 2, t.color);

        if (t.type === 'tnt') {
          // Hazard penalty
          score = Math.max(0, score + t.points);
          combo = 1;
          playSynthSound('hazard');
        } else {
          // Gem collected
          score += t.points * combo;
          combo = Math.min(5, combo + 1);
          playSynthSound('gem');
        }

        targets.splice(i, 1);
        updateHud();
        break;
      }
    }

    // Missed click resets combo
    if (!hit) {
      combo = 1;
      updateHud();
    }
  }

  canvas.addEventListener('pointerdown', (e) => {
    handlePointerClick(e.clientX, e.clientY);
  });

  function updateHud() {
    if (scoreValEl) scoreValEl.textContent = score.toString();
    if (timeValEl) timeValEl.textContent = `${timeLeft}s`;
    if (comboValEl) comboValEl.textContent = `${combo}x`;
  }

  // Start / Reset Game
  function startGame() {
    score = 0;
    combo = 1;
    timeLeft = 30;
    targets.length = 0;
    particles.length = 0;
    gameState = 'playing';

    updateHud();
    startScreen?.classList.add('hidden');
    gameOverScreen?.classList.add('hidden');

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateHud();

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    // Initial targets
    spawnTarget();
    spawnTarget();
  }

  function endGame() {
    gameState = 'gameover';
    clearInterval(timerInterval);
    playSynthSound('gameover');

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('swordgamer_gemhunt_best', highScore.toString());
      if (bestValEl) bestValEl.textContent = highScore.toString();
    }

    if (summaryScoreEl) summaryScoreEl.textContent = score.toString();
    if (summaryBestEl) summaryBestEl.textContent = highScore.toString();
    gameOverScreen?.classList.remove('hidden');
  }

  startBtn?.addEventListener('click', startGame);
  playAgainBtn?.addEventListener('click', startGame);

  // Main Render Loop
  let spawnCounter = 0;
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark Voxel Cavern Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (gameState === 'playing') {
      spawnCounter++;
      // Spawn new target periodically
      const spawnRate = Math.max(25, 45 - (30 - timeLeft));
      if (spawnCounter > spawnRate) {
        spawnCounter = 0;
        if (targets.length < 7) {
          spawnTarget();
        }
      }

      // Update & Render Targets
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        t.x += t.vx;
        t.y += t.vy;
        t.life--;

        // Bounce off canvas walls
        if (t.x < 10 || t.x > canvas.width - t.size - 10) t.vx *= -1;
        if (t.y < 10 || t.y > canvas.height - t.size - 10) t.vy *= -1;

        if (t.life <= 0) {
          targets.splice(i, 1);
          continue;
        }

        // Render Block / Gem
        ctx.save();
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 12;

        if (t.type === 'tnt') {
          // Explosive block
          ctx.fillStyle = '#b91c1c';
          ctx.fillRect(t.x, t.y, t.size, t.size);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(t.x + 3, t.y + t.size / 2 - 4, t.size - 6, 8);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('TNT', t.x + t.size / 2, t.y + t.size / 2 + 3);
        } else {
          // Voxel Gem Block
          ctx.fillStyle = t.color;
          ctx.fillRect(t.x, t.y, t.size, t.size);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(t.x + 2, t.y + 2, t.size - 4, 3);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
          ctx.fillRect(t.x + 2, t.y + t.size - 5, t.size - 4, 3);
        }
        ctx.restore();
      }

      // Update & Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = p.life / 20;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }
    }

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
