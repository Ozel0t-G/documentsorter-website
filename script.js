(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.language-toggle');
  const current = document.querySelector('.language-current');
  const translatable = document.querySelectorAll('[data-en][data-de]');
  const panels = document.querySelectorAll('[data-language-panel]');

  const preferredLanguage = () => {
    const stored = localStorage.getItem('documentsorter-language');
    if (stored === 'de' || stored === 'en') return stored;
    return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
  };

  const setLanguage = (language) => {
    root.lang = language;
    translatable.forEach((element) => {
      element.innerHTML = element.dataset[language];
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.languagePanel !== language;
    });
    if (current) current.textContent = language === 'en' ? 'DE' : 'EN';
    if (toggle) {
      toggle.setAttribute('aria-label', language === 'en'
        ? 'Sprache auf Deutsch wechseln'
        : 'Switch language to English');
    }
    localStorage.setItem('documentsorter-language', language);
  };

  setLanguage(preferredLanguage());
  toggle?.addEventListener('click', () => setLanguage(root.lang === 'en' ? 'de' : 'en'));

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((element) => observer.observe(element));
})();
