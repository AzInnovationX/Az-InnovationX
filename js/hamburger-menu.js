(function() {
  const hamburgerBtn = document.getElementById('hamburger-btn')
                    || document.querySelector('.hamburger')
                    || document.querySelector('.menu-toggle')
                    || document.querySelector('.mobile-menu')
                    || document.querySelector('[class*="hamburger"]');

  const mobileMenu   = document.getElementById('mobile-menu')
                    || document.querySelector('.nav-links')
                    || document.querySelector('.nav-mobile')
                    || document.querySelector('[class*="mobile-menu"]');

  if (!hamburgerBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('menu-open');
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('menu-open');
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.classList.contains('menu-open') ? closeMenu() : openMenu();
  });

  // Cerrar al hacer clic en un enlace del menú
  const navLinks = mobileMenu.querySelectorAll('a');
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  // En escritorio: cerrar menú si la pantalla se amplía
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) closeMenu();
  });
})();
