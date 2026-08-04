(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.language-toggle');
  const current = document.querySelector('.language-current');
  const translatable = document.querySelectorAll('[data-en][data-no]');
  const panels = document.querySelectorAll('[data-language-panel]');

  const preferredLanguage = () => {
    const stored = localStorage.getItem('clastra-language');
    if (stored === 'en' || stored === 'no') return stored;
    return /^(no|nb|nn)/i.test(navigator.language) ? 'no' : 'en';
  };

  const setLanguage = (language) => {
    root.lang = language === 'no' ? 'nb' : 'en';
    translatable.forEach((element) => { element.innerHTML = element.dataset[language]; });
    panels.forEach((panel) => { panel.hidden = panel.dataset.languagePanel !== language; });
    document.title = root.dataset[`pageTitle${language === 'no' ? 'No' : 'En'}`] || document.title;
    if (current) current.textContent = language === 'en' ? 'NO' : 'EN';
    if (toggle) toggle.setAttribute('aria-label', language === 'en' ? 'Bytt språk til norsk' : 'Switch language to English');
    localStorage.setItem('clastra-language', language);
  };

  setLanguage(preferredLanguage());
  toggle?.addEventListener('click', () => setLanguage(root.lang === 'en' ? 'no' : 'en'));

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
  }, { threshold: 0.1 });
  reveals.forEach((element) => observer.observe(element));
})();
