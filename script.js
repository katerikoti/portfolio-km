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
});
