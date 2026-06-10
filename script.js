function applyLanguage(lang) {
  document.documentElement.lang = lang === 'fi' ? 'fi' : 'en';

  document.querySelectorAll('[data-fi]').forEach(el => {
    el.innerHTML = lang === 'fi' ? el.dataset.fi : el.dataset.en;
  });

  const ticker = document.getElementById('ticker');
  const tickerFi = document.getElementById('ticker-fi');
  if (ticker && tickerFi) {
    ticker.innerHTML = lang === 'fi' ? tickerFi.innerHTML : ticker.dataset.en;
  }

  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  // ── Language setup ──
  document.querySelectorAll('[data-fi]').forEach(el => {
    el.dataset.en = el.innerHTML;
  });
  const ticker = document.getElementById('ticker');
  if (ticker) ticker.dataset.en = ticker.innerHTML;

  const saved = localStorage.getItem('lang') || 'en';
  applyLanguage(saved);

  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  // ── Hamburger menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  // ── Scroll to top ──
  const scrollBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile hero full-width backgrounds ──
  function updateHeroMobileBg() {
    const hero = document.getElementById('hero');
    const heroLeft = document.querySelector('.hero-left');
    if (!hero || !heroLeft) return;
    if (window.innerWidth > 800) {
      hero.style.removeProperty('--hero-right-top');
      return;
    }
    const heroRect = hero.getBoundingClientRect();
    const leftRect = heroLeft.getBoundingClientRect();
    const top = leftRect.bottom - heroRect.top;
    hero.style.setProperty('--hero-right-top', Math.max(0, Math.round(top)) + 'px');
  }

  window.addEventListener('resize', () => updateHeroMobileBg());
  // run after images/fonts load to get correct sizes
  window.addEventListener('load', () => updateHeroMobileBg());
  // also run now in case DOM is ready
  updateHeroMobileBg();
});
