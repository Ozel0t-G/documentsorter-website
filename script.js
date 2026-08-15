const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('is-open', !open);
  });

  navLinks.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  });
}

document.querySelectorAll('[data-current-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

if (location.hash && document.querySelector(location.hash)) {
  requestAnimationFrame(() => document.querySelector(location.hash).classList.add('is-targeted'));
}

const appSelector = document.querySelector('[data-app-selector]');
if (appSelector) {
  const params = new URLSearchParams(location.search);
  if (params.get('app')) appSelector.value = params.get('app');
  appSelector.addEventListener('change', () => {
    const url = new URL(location.href);
    url.searchParams.set('app', appSelector.value);
    history.replaceState({}, '', url);
  });
}

const languageChoices = document.querySelectorAll('[data-language-choice]');
const languagePanels = document.querySelectorAll('[data-language-panel]');

languageChoices.forEach((button) => {
  button.addEventListener('click', () => {
    const language = button.dataset.languageChoice;
    languageChoices.forEach((choice) => {
      const selected = choice.dataset.languageChoice === language;
      choice.classList.toggle('is-active', selected);
      choice.setAttribute('aria-pressed', String(selected));
    });
    languagePanels.forEach((panel) => {
      panel.hidden = panel.dataset.languagePanel !== language;
    });
    document.documentElement.lang = language;
  });
});
