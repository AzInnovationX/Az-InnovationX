document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling - Updated for multi-page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Fade in animation on scroll (General Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('impacto-section')) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                animateCounter(stat, target);
            });
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .timeline-step, .impacto-section, .founder-card, .filosofia-card').forEach(el => {
    scrollObserver.observe(el);
  });

  // Header background on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 100) {
      header.style.background = 'rgba(10, 15, 30, 0.98)';
    } else {
      header.style.background = 'rgba(10, 15, 30, 0.95)';
    }
  });

  // Mobile menu toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    });
  }

  // Add hover effects to service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-corporate');
    const heroContent = document.querySelector('.hero-content-new');
    if (hero && heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Hide scroll indicator
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
      if (scrolled > 50) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }
  });

  // Counter animation for stats
  function animateCounter(element, target) {
    const suffix = element.getAttribute('data-suffix') || '';
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(count) + suffix;
    }, 20);
  }

  // Animate counters when visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (statNumber) {
            const text = statNumber.textContent;
            let target = parseInt(text);
            if (text.includes('%')) target = 95;
            else if (text.includes('+')) target = 200;
            else if (text.includes('/')) target = 24;
            else target = parseInt(text);
            animateCounter(statNumber, target);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.stat-card, .impacto-section, .hero-metrics').forEach(el => {
    statsObserver.observe(el);
  });

  // --- Hero Section: Interactive Particle System ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray;

    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 5;
          }
          if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 5;
          }
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 5;
          }
          if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      let numberOfParticles = window.innerWidth <= 480 ? 8 : 20;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = 'rgba(0, 212, 255, 0.6)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
    }

    window.addEventListener('resize', () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      initParticles();
    });

    initParticles();
    animateParticles();
  }

  // --- Hero Section: Animations & Mouse Effects ---
  const heroTextContainers = document.querySelectorAll('.hero-corporate .text-reveal-container');
  const customCursor = document.getElementById('custom-cursor');
  const parallaxElements = document.querySelectorAll('[data-parallax-speed]');

  // 1. Cinematic Text Reveal
  window.addEventListener('load', () => {
    heroTextContainers.forEach((container, index) => {
      setTimeout(() => {
        container.classList.add('visible');
      }, 500 + (index * 250));
    });
  });

  // 2. Custom Cursor and Parallax Mouse-follow
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    if (customCursor) {
      customCursor.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
    }

    const x = (clientX - window.innerWidth / 2) / window.innerWidth * -1;
    const y = (clientY - window.innerHeight / 2) / window.innerHeight * -1;
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax-speed');
      const xOffset = x * speed * 20;
      const yOffset = y * speed * 20;
      el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  });

  // --- Services Section Interactivity ---
  const servicesSection = document.querySelector('#servicios');
  const serviceCards = document.querySelectorAll('.service-card');
  const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        serviceCards.forEach((card, index) => {
          card.style.transitionDelay = `${index * 100}ms`;
          card.classList.add('visible');
        });
        servicesObserver.unobserve(servicesSection);
      }
    });
  }, {
    threshold: 0.1
  });

  if (servicesSection) {
    servicesObserver.observe(servicesSection);
  }

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (y / rect.height) * -12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Solicitudes Section Interactivity ---
  const solicitudesSection = document.querySelector('#solicitudes');
  const ambientBg = document.querySelector('.solicitudes-ambient-bg');
  if (solicitudesSection && ambientBg) {
    solicitudesSection.addEventListener('mousemove', (e) => {
      const rect = solicitudesSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ambientBg.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      ambientBg.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });
  }

  // Mouse hover effects for cards (General)
  document.querySelectorAll('.service-card, .step-content, .filosofia-card, .founder-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (y / rect.height) * -12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Staggered Entry Animation for Contact Cards ---
  document.querySelectorAll('.contact-section, #contacto').forEach(section => {
    const contactItems = section.querySelectorAll('.contact-item');
    if (contactItems.length > 0) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.contact-item');
            items.forEach((item, index) => {
              item.style.transitionDelay = `${index * 120}ms`;
              item.classList.add('visible');
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });
      observer.observe(section);
    }
  });

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('#submitBtn');
    const successMessage = contactForm.querySelector('#successMessage');
    const errorMessage = contactForm.querySelector('#errorMessage');

    // Real-time validation
    const validateField = (field) => {
      const value = field.value.trim();
      if (field.hasAttribute('required')) {
        if (!value) {
          field.classList.add('invalid');
          field.classList.remove('valid');
          return false;
        } else if (field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            return false;
          }
        }
      }
      field.classList.remove('invalid');
      field.classList.add('valid');
      return true;
    };

    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('invalid')) validateField(field);
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isFormValid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        if (!validateField(field)) isFormValid = false;
      });

      if (!isFormValid) {
        if (errorMessage) {
          errorMessage.textContent = 'Por favor, completa todos los campos obligatorios correctamente.';
          errorMessage.style.display = 'block';
        }
        return;
      }

      // UI State: Loading
      const originalBtnText = submitBtn.innerHTML;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
      }
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';

      try {
        const formData = new FormData(contactForm);
        const formObj = Object.fromEntries(formData.entries());

        // Prepare data for Firestore
        const contactData = {
          ...formObj,
          fechaEnvio: firebase.firestore.Timestamp.now(),
          estado: 'nuevo',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        };

        if (window.db) {
          await window.db.collection('contactos').add(contactData);
          if (successMessage) successMessage.style.display = 'block';
          contactForm.reset();
          contactForm.querySelectorAll('.valid, .invalid').forEach(f => f.classList.remove('valid', 'invalid'));
          setTimeout(() => { if (successMessage) successMessage.style.display = 'none'; }, 5000);
        } else {
          throw new Error('Database not initialized');
        }
      } catch (error) {
        console.error('Error al enviar formulario:', error);
        if (errorMessage) {
          errorMessage.textContent = 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.';
          errorMessage.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
});
