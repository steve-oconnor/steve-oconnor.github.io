document.documentElement.classList.remove('no-js');

  const toggleBtn = document.getElementById('hamburger-nav-btn');
  const nav = document.getElementById('main-nav');
  const links = nav.querySelectorAll('a');
  const label = document.getElementById('hamburger-label');
  const srLabel = document.getElementById('hamburger-nav-open-close');
  const overlay = document.getElementById('nav-overlay');

  let lastFocused = null;

  function closeNav() {
    nav.classList.remove('nav--open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    label.textContent = 'Menu';
    srLabel.textContent = 'Open';
    overlay.classList.remove('visible');
    overlay.setAttribute('hidden', '');
    if (lastFocused) lastFocused.focus();
  }

  toggleBtn.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('nav--open');

    if (!expanded) {
      lastFocused = document.activeElement;
      links[0].focus();
      label.textContent = 'Close';
      srLabel.textContent = 'Close';
      overlay.classList.add('visible');
      overlay.removeAttribute('hidden');
    } else {
      closeNav();
    }
  });

  // Trap focus inside the nav when open
  document.addEventListener('keydown', function (e) {
    if (!nav.classList.contains('nav--open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeNav();
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(links);
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
  });

  // Close on overlay click
  overlay.addEventListener('click', () => closeNav());

  // Close menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => closeNav());
  });