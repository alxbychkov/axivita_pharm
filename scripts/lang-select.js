// Custom language select logic

document.addEventListener('DOMContentLoaded', function () {
  const langSelect = document.querySelector('.nav__lang-select');
  if (!langSelect) return;

  const flag = langSelect.querySelector('.nav__lang-flag');
  const label = langSelect.querySelector('.nav__lang-label');
  const dropdown = langSelect.querySelector('.nav__lang-dropdown');
  const options = langSelect.querySelectorAll('.nav__lang-option');

  // Toggle dropdown
  langSelect.addEventListener('click', function (e) {
    langSelect.classList.toggle('open');
  });

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    if (!langSelect.contains(e.target)) {
      langSelect.classList.remove('open');
    }
  });

  // Keyboard accessibility
  langSelect.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      langSelect.classList.remove('open');
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      langSelect.classList.toggle('open');
    }
  });

  // Option click
  options.forEach(option => {
    option.addEventListener('click', function (e) {
      e.stopPropagation();
      const lang = option.getAttribute('data-lang');
      const textContent = option.querySelector('span').textContent;
      const src = option.querySelector('img').src;

      flag.src = src;
      flag.alt = lang;
      label.textContent = textContent;
      langSelect.classList.remove('open');
      langSelect.blur();

    });
  });
});