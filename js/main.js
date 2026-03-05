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

  // Dropdown touch support for tablets (horizontal menu)
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth >= 1024 && ('ontouchstart' in window)) {
          const menu = dropdown.querySelector('.dropdown-menu');
          const isVisible = window.getComputedStyle(menu).visibility === 'visible';

          if (!isVisible) {
            e.preventDefault();
            // Close other dropdowns
            dropdowns.forEach(d => {
              if (d !== dropdown) d.classList.remove('touch-active');
            });
            dropdown.classList.add('touch-active');
          }
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => d.classList.remove('touch-active'));
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
          // Add a small delay to ensure navigation is not interrupted
          setTimeout(() => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
          }, 150);
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
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Counter animation for stats
  function animateCounter(element, target) {
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(count) + (target === 95 ? '%' : target === 200 ? '+' : target.toString().includes('+') ? '+' : target === 24 ? '/7' : '');
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

  document.querySelectorAll('.stat-card, .impacto-section').forEach(el => {
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
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
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
  const heroTextContainers = document.querySelectorAll('.hero .text-reveal-container');
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

  // --- Chatbot Logic Script ---
  let lastBotQuestionKey = null;
  const affirmativeAnswers = ['si', 'sí', 'yes', 'claro', 'ok', 'está bien', 'esta bien', 'dale', 'va', 'por supuesto', 'acepto', 'afirmativo', 'de acuerdo'];
  const negativeAnswers = ['no', 'no gracias', 'cancelar', 'ahora no'];
  const conversationState = {
    currentTopic: null,
    mentionedServices: [],
    budgetRange: null,
    userFrustration: 0,
    history: [],
    suggestedQuote: false,
    suggestedWebAppAndEcomm: false,
    suggestedPortfolio: false,
    path: [], // breadcrumbs
    userName: null,
    leadFlowStep: 0,
    leadData: {}
  };
  const intents = {
    greet: ['hola', 'buenos dias', 'buenas tardes', 'buen día', 'que tal', 'hey', 'saludos'],
    request_service_info: ['servicio', 'información', 'que haces', 'ayuda', 'productos', 'ofreces', 'hacen', 'catalogo', 'portafolio'],
    request_quote: ['precio', 'costo', 'cuánto', 'presupuesto', 'tarifa', 'cotización', 'cotizar', 'planes', 'paquetes', 'cuanto vale', 'valor', 'invertir', 'inversión'],
    request_payment: ['pagar', 'pago', 'métodos de pago', 'cómo pago', 'cuenta bancaria', 'transferencia', 'tarjeta', 'paypal', 'efectivo', 'oxxo'],
    request_contact: ['redes', 'social', 'síguelos', 'facebook', 'instagram', 'tiktok', 'seguir', 'contacto', 'llamar', 'email', 'correo', 'teléfono', 'whatsapp'],
    request_location: ['donde están', 'donde estan', 'ubicacion', 'ubicación', 'donde se encuentran', 'direccion', 'dirección', 'mapa', 'oficina'],
    request_examples: ['ejemplos', 'portfolio', 'trabajos', 'proyectos anteriores', 'muestra', 'referencias', 'clientes', 'casos de éxito'],
    request_process: ['tiempo', 'cuándo', 'plazos', 'entrega', 'duración', 'proceso', 'cuanto tardan', 'etapas'],
    request_support: ['soporte', 'mantenimiento', 'garantía', 'actualizaciones', 'ayuda técnica', 'fallas', 'errores'],
    request_about: ['quienes somos', 'nosotros', 'historia', 'equipo', 'fundador', 'evaristo', 'misión', 'visión', 'empresa'],
    request_process_direct: ['pasos', 'metodologia', 'metodología', 'como trabajan', 'cómo trabajan', 'proceso', 'fases'],
    frustration: ['no funciona', 'no sirve', 'frustrado', 'agente', 'humano', 'persona', 'no entiendo', 'mal servicio', 'ayuda real'],
    request_online_presence_info: ['presencia', 'internet', 'online', 'importancia de estar en linea', 'visibilidad', 'google', 'aparecer en internet'],
    request_cybersecurity_info: ['ciberseguridad', 'seguridad', 'proteger', 'riesgos', 'hackers', 'virus', 'protección', 'seguro'],
    request_creator_info: ['quien te creo', 'quién te creó', 'creador', 'desarrollador', 'quien te hizo', 'quién te hizo', 'quien te programo', 'quién te programó', 'autor'],
    request_hours: ['horario', 'atienden', 'abren', 'cierran', 'horas', 'horarios de atencion', 'disponibilidad'],
    request_articles: ['artículos', 'blog', 'posts', 'contenido', 'educativo', 'noticias', 'tips'],
    request_affiliates: ['afiliados', 'afíliate', 'colaboraciones', 'partnerships', 'programa de afiliados', 'socio', 'ganar dinero'],
    lead_keywords: ['proyecto', 'presupuesto', 'cotización', 'contratar', 'cotizar', 'quiero empezar', 'interesado'],
    request_pwa: ['pwa', 'aplicacion web', 'app web', 'instalable'],
    request_ecommerce: ['tienda', 'carrito', 'ventas online', 'ecommerce', 'vender por internet'],
    request_web: ['pagina web', 'sitio web', 'landing page', 'one page'],
    request_chatbot: ['chatbot', 'asistente virtual', 'automatizar chat', 'bot'],
  };

  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotWindow = document.getElementById('chatbot-window');
  const messagesContainer = document.getElementById('chatbot-messages');
  const inputForm = document.getElementById('chatbot-input-form');
  const inputField = document.getElementById('chatbot-input');
  let misunderstandingCounter = 0;

  // UX Improvement: Show/Hide typing indicator
  const showTypingIndicator = () => {
    // Prevent duplicate indicators
    if (document.getElementById('chatbot-typing')) return;

    const indicator = document.createElement('div');
    indicator.id = 'chatbot-typing';
    indicator.className = 'message-wrapper bot';
    indicator.innerHTML = `
      <div class="bot-avatar-small">
        <div style="width:100%; height:100%; background: var(--electric-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">AZ</div>
      </div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const hideTypingIndicator = () => {
    const indicator = document.getElementById('chatbot-typing');
    if (indicator) indicator.remove();
  };

  const az_ui_showQuickReplies = (options = []) => {
    const existing = document.querySelector('.quick-replies-container');
    if (existing) existing.remove();

    if (options.length === 0) return;

    const container = document.createElement('div');
    container.className = 'quick-replies-container';

    options.forEach(opt => {
      const chip = document.createElement('button');
      chip.className = 'quick-reply-chip';
      chip.textContent = opt.text;
      chip.onclick = () => {
        container.remove();
        handleInput(opt.val);
      };
      container.appendChild(chip);
    });

    messagesContainer.appendChild(container);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const welcomeBubble = document.getElementById('chat-welcome-bubble');
  if (welcomeBubble) {
    const closeWelcomeBtn = welcomeBubble.querySelector('.close-welcome-bubble');
    if (closeWelcomeBtn) {
      closeWelcomeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        welcomeBubble.style.display = 'none';
        sessionStorage.setItem('welcome_bubble_shown', 'true');
      });
    }

    setTimeout(() => {
      if (chatbotWindow && !chatbotWindow.classList.contains('active') && !sessionStorage.getItem('welcome_bubble_shown')) {
        welcomeBubble.style.display = 'block';
        sessionStorage.setItem('welcome_bubble_shown', 'true');
        setTimeout(() => {
          if (welcomeBubble && welcomeBubble.style.display !== 'none') {
            welcomeBubble.style.display = 'none';
          }
        }, 8000);
      }
    }, 3000);
  }

  const openChatbot = () => {
    if (chatbotWindow) {
        chatbotWindow.classList.add('active');
        chatbotWindow.classList.add('expanded');
        const chatbotContainer = document.getElementById('chatbot-container');
        if (chatbotContainer) chatbotContainer.classList.add('chat-open');
        if (welcomeBubble) {
            welcomeBubble.style.display = 'none';
            sessionStorage.setItem('welcome_bubble_shown', 'true');
        }

        if (!sessionStorage.getItem('chatbot_welcomed')) {
            showTypingIndicator();
            setTimeout(() => {
                showBotMessage({
                    message: "👋 ¡Hola! ¿En qué podemos ayudarte? Resolvemos tus dudas al instante. 🚀",
                    options: null
                }, 'saludo_part1');

                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        showBotMessage({
                            message: "¿En qué podemos apoyarte hoy? 👇",
                            options: knowledgeBase.saludo.options
                        }, 'saludo');
                        sessionStorage.setItem('chatbot_welcomed', 'true');
                    }, 1000);
                }, 500);
            }, 1000);
        } else if (messagesContainer && messagesContainer.children.length === 0) {
            showTypingIndicator();
            setTimeout(() => {
                showBotMessage(knowledgeBase.saludo, 'saludo');
            }, 800);
        }
    }
  };

  const closeChatbot = () => {
    if (chatbotWindow) {
        chatbotWindow.classList.remove('active');
        const chatbotContainer = document.getElementById('chatbot-container');
        if (chatbotContainer) chatbotContainer.classList.remove('chat-open');
    }
  };

  if (chatbotToggle) chatbotToggle.addEventListener('click', openChatbot);
  if (chatbotCloseBtn) chatbotCloseBtn.addEventListener('click', closeChatbot);

  const knowledgeBase = {
  saludo: {
    message: "👋 ¡Hola! ¿En qué podemos ayudarte? Resolvemos tus dudas al instante. 🚀",
    options: [{
        text: "🚀 Servicios",
        key: "servicios_menu"
      },
      {
        text: "💰 Precios",
        key: "precios_menu"
      },
      {
        text: "📋 Nuestro Proceso",
        key: "proceso_info"
      },
      {
        text: "👥 Sobre Nosotros",
        key: "nosotros_info"
      },
      {
        text: "✨ Más Opciones",
        key: "mas_opciones_menu"
      }
    ]
  },
  servicios_menu: {
    message: "¡Excelente! Nos especializamos en soluciones tecnológicas de alto impacto. ¿Cuál de nuestros servicios te interesa explorar?",
    options: [{
        text: "🌐 Páginas Web",
        key: "servicio_web"
      },
      {
        text: "📱 Aplicaciones Móviles",
        key: "servicio_app"
      },
      {
        text: "🛒 Tiendas Online",
        key: "servicio_ecommerce"
      },
      {
        text: "🤖 Chatbots Inteligentes",
        key: "servicio_chatbot"
      },
      {
        text: "🔒 Seguridad Informática",
        key: "servicio_seguridad"
      },
      {
        text: "☁️ Soluciones Cloud",
        key: "servicio_cloud"
      },
      {
        text: "👕 Artículos AZINNX",
        key: "articles_info"
      },
      {
        text: "🤝 Programa de Afiliados",
        key: "affiliate_info"
      },
      {
        text: "🏠 Volver al inicio",
        key: "saludo"
      }
    ]
  },
  precios_menu: {
    message: "¡Claro! Para darte la información más precisa, por favor dime sobre qué servicio te gustaría saber el costo. Todos nuestros planes incluyen hosting y dominio gratis por un año. ✅",
    options: [{
        text: "Página Web One Page",
        key: "precio_web_one_page"
      },
      {
        text: "Web Empresarial",
        key: "precio_web_empresarial"
      },
      {
        text: "Tienda Online",
        key: "precio_tienda"
      },
      {
        text: "App Web (PWA)",
        key: "precio_pwa"
      },
      {
        text: "Chatbot Básico",
        key: "precio_chatbot_basico"
      },
      {
        text: "Chatbot Avanzado",
        key: "precio_chatbot_avanzado"
      },
      {
        text: "Seguridad Web",
        key: "precio_seguridad"
      },
      {
        text: "Hosting y Mantenimiento",
        key: "precio_hosting"
      },
      {
        text: "Ver Paquetes Recomendados",
        key: "precios_paquetes"
      },
      {
        text: "🏠 Volver al inicio",
        key: "saludo"
      }
    ]
  },
  faq_menu: {
    message: "¡Perfecto! La transparencia es clave para nosotros. ¿Sobre qué tema tienes preguntas?",
    options: [{
        text: "Nuestro Proceso de Trabajo",
        key: "faq_proceso_menu"
      },
      {
        text: "Tecnología que Usamos",
        key: "faq_tecnologia_menu"
      },
      {
        text: "Soporte y Garantías",
        key: "faq_soporte_menu"
      },
      {
        text: "🏠 Volver al inicio",
        key: "saludo"
      }
    ]
  },
  mas_opciones_menu: {
    message: "¿Qué más te gustaría saber sobre nosotros?",
    options: [{
        text: "📈 Presencia en Internet",
        key: "presencia_internet"
      },
      {
        text: "🔒 Ciberseguridad",
        key: "ciberseguridad"
      },
      {
        text: "💳 Métodos de Pago",
        key: "payment_info"
      },
      {
        text: "🎓 Certificaciones",
        key: "certificaciones"
      },
      {
        text: "📍 Ubicación",
        key: "ubicacion"
      },
      {
        text: "✉️ Newsletter",
        key: "suscribete"
      },
      {
        text: "📱 Redes Sociales",
        key: "contacto"
      },
      {
        text: "💬 Hablar con Asesor",
        key: "human_escalation"
      },
      {
        text: "🏠 Volver al inicio",
        key: "saludo"
      }
    ]
  },
  servicio_web: {
    message: "Creamos páginas web profesionales con diseños modernos, SEO optimizado e integración de APIs. ¡Perfectas para convertir visitantes en clientes!",
    options: [{
      text: "Ver más",
      url: "https://ejemplosdepaginasweb.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }],
    nextContext: 'Páginas Web'
  },
  servicio_app: {
    message: "Desarrollamos apps para Android y multiplataforma con notificaciones push y un diseño intuitivo para conectar con tu audiencia.",
    options: [{
      text: "Ver más",
      url: "https://paginawebaplicaciones.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }],
    nextContext: 'Aplicaciones Móviles'
  },
  servicio_ecommerce: {
    message: "Construimos plataformas de e-commerce robustas con pasarelas de pago seguras y gestión de inventario para que vendas sin parar.",
    options: [{
      text: "Ver más",
      url: "https://paginawebdetiendaonline.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }],
    nextContext: 'Tiendas Online'
  },
  servicio_chatbot: {
    message: "Automatizamos la atención al cliente 24/7 con IA. ¡Respuestas al instante para no perder ni un cliente!",
    options: [{
      text: "Ver más",
      url: "https://chatbotsaz.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }],
    nextContext: 'Chatbots Inteligentes'
  },
  servicio_seguridad: {
    message: "Protegemos tu negocio digital con auditorías y protocolos de ciberseguridad. ¡Tu tranquilidad es nuestra prioridad!",
    options: [{
      text: "Ver más",
      url: "https://paginawebseguridadinformatica.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }],
    nextContext: 'Seguridad Informática'
  },
  servicio_cloud: {
    message: "Migramos y optimizamos tu infraestructura en la nube para darte escalabilidad, alta disponibilidad y backups automáticos.",
    options: [{
      text: "Ver más",
      url: "https://paginawebsolucionescloud.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }],
    nextContext: 'Soluciones Cloud'
  },
  articles_info: {
    message: "Artículos AZINNX es una tienda de artículos tecnológicos diseñados por Az InnovationX. Moda y accesorios con estilo tech: sudaderas, termos, gorras, llaveros, mochilas y más. Tecnología que se viste.",
    options: [{
      text: "Sí, llévame a los artículos",
      url: "https://articulos-azinnx.vercel.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }]
  },
  affiliate_info: {
    message: "¡Genial! Nuestro programa de 'Afiliados' es una oportunidad increíble para colaborar. Gana comisiones mientras ayudas a otros a crecer con nuestras soluciones tecnológicas. ¿Te gustaría saber más?",
    options: [{
      text: "Sí, quiero ser afiliado",
      url: "https://afiliadosaz.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }]
  },
  precio_web_one_page: {
    message: "Una <strong>Página Web One Page Profesional</strong> tiene un costo de 💰 $2,000 a $3,000 MXN. Es ideal para emprendedores y marcas que buscan una presencia digital moderna y efectiva. Incluye diseño responsivo, secciones estratégicas, integración con redes sociales y formulario de contacto.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precio_web_empresarial: {
    message: "Una <strong>Página Web Empresarial Premium</strong> cuesta entre 💰 $2,500 y $3,500 MXN. Es un sitio corporativo profesional enfocado en posicionamiento y ventas, con múltiples secciones, SEO básico y copywriting persuasivo.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precio_tienda: {
    message: "Una <strong>Tienda Online Básica</strong> tiene un precio de 💰 $2,500 a $3,000 MXN. Es la solución perfecta para empezar a vender en línea, con catálogo de productos, carrito de compras, integración de pagos y WhatsApp.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precio_pwa: {
    message: "Una <strong>App Web Android (PWA)</strong> tiene un costo de 💰 $2,800 a $3,700 MXN. Es una app instalable que ofrece acceso directo desde el celular, con carga rápida y funcionamiento sin conexión.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precio_chatbot_basico: {
    message: "Un <strong>Chatbot Web Básico</strong> cuesta entre 💰 $500 y $800 MXN. Es ideal para automatizar respuestas a preguntas frecuentes con un flujo de conversación predefinido.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precio_chatbot_avanzado: {
    message: "Un <strong>Chatbot Avanzado</strong> tiene un precio de 💰 $800 a $1,200 MXN. Incluye menús interactivos, múltiples flujos de conversación e integración con WhatsApp o correo electrónico.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precio_seguridad: {
    message: "El servicio de <strong>Seguridad Web Básica</strong> cuesta entre 💰 $2,800 y $3,800 MXN. Incluye un diagnóstico de seguridad, un reporte de vulnerabilidades y la implementación de configuraciones esenciales para proteger tu sitio.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precio_hosting: {
    message: "Nuestro servicio de <strong>Hosting y Mantenimiento</strong> tiene un costo de 💰 $1,200 a $2,000 MXN. Asegura que tu sitio esté siempre en línea, optimizado, seguro y con respaldos periódicos.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  precios_paquetes: {
    message: "¡Claro! Aquí tienes nuestros paquetes recomendados:<br><br><strong>📦 Web + Chatbot Básico:</strong> $3,000 - $3,800 MXN<br><strong>📦 Web + App + Chatbot:</strong> $5,300 - $7,500 MXN<br><br>Todos nuestros planes incluyen hosting y dominio gratis. ✅",
    options: [{
      text: "Ver precios individuales",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  faq_proceso_menu: {
    message: "¡Perfecto! Nuestro proceso es súper ágil. ¿Qué te gustaría saber?",
    options: [{
      text: "¿Cómo empezamos?",
      key: "faq_proceso_inicio"
    }, {
      text: "¿Qué necesitan de mí?",
      key: "faq_proceso_requisitos"
    }, {
      text: "¿Puedo ver el progreso?",
      key: "faq_proceso_progreso"
    }, {
      text: "Volver a FAQ",
      key: "faq_menu"
    }]
  },
  faq_tecnologia_menu: {
    message: "¡Nos encanta la tecnología! Usamos lo más moderno y eficiente. ¿Qué quieres saber?",
    options: [{
      text: "¿Qué tecnologías usan?",
      key: "faq_tech_stack"
    }, {
      text: "¿Mis datos están seguros?",
      key: "faq_tech_seguridad"
    }, {
      text: "Volver a FAQ",
      key: "faq_menu"
    }]
  },
  faq_soporte_menu: {
    message: "¡Claro! Nuestro compromiso no termina con la entrega. ¿Qué duda tienes sobre el soporte?",
    options: [{
      text: "¿Ofrecen capacitación?",
      key: "faq_soporte_capacitacion"
    }, {
      text: "¿Qué incluye el soporte?",
      key: "faq_soporte_incluye"
    }, {
      text: "¿Tienen garantía?",
      key: "faq_soporte_garantia"
    }, {
      text: "Volver a FAQ",
      key: "faq_menu"
    }]
  },
  faq_proceso_inicio: {
    message: "¡Súper fácil! 1) Nos cuentas tu idea, 2) Te damos presupuesto, 3) Firmamos contrato, 4) ¡Empezamos a crear!",
    options: [{
      text: "Volver al menú de Proceso",
      key: "faq_proceso_menu"
    }]
  },
  faq_proceso_requisitos: {
    message: "Solo necesitamos que nos cuentes tu visión, compartas contenido (textos, imágenes) y que tengas comunicación fluida con nosotros.",
    options: [{
      text: "Volver al menú de Proceso",
      key: "faq_proceso_menu"
    }]
  },
  faq_proceso_progreso: {
    message: "¡Por supuesto! Te enviamos actualizaciones semanales con capturas y avances. Siempre estarás al tanto.",
    options: [{
      text: "Volver al menú de Proceso",
      key: "faq_proceso_menu"
    }]
  },
  faq_tech_stack: {
    message: "Usamos tecnologías modernas: HTML5, CSS3, JavaScript, React, Node.js, Firebase. Siempre lo más actual y eficiente.",
    options: [{
      text: "Volver al menú de Tecnología",
      key: "faq_tecnologia_menu"
    }]
  },
  faq_tech_seguridad: {
    message: "¡Totalmente! Implementamos protocolos de seguridad SSL, encriptación y cumplimos con estándares internacionales de protección de datos.",
    options: [{
      text: "Volver al menú de Tecnología",
      key: "faq_tecnologia_menu"
    }]
  },
  faq_soporte_capacitacion: {
    message: "¡Sí! Incluimos sesión de capacitación para que sepas manejar tu plataforma como un experto.",
    options: [{
      text: "Volver al menú de Soporte",
      key: "faq_soporte_menu"
    }]
  },
  faq_soporte_incluye: {
    message: "Soporte técnico por 30 días, corrección de bugs, y asesoría para dudas básicas sin costo adicional.",
    options: [{
      text: "Volver al menú de Soporte",
      key: "faq_soporte_menu"
    }]
  },
  faq_soporte_garantia: {
    message: "¡Por supuesto! 30 días de garantía total contra defectos de funcionamiento y bugs.",
    options: [{
      text: "Volver al menú de Soporte",
      key: "faq_soporte_menu"
    }]
  },
  presencia_internet: {
    message: "¡Excelente pregunta! Tener presencia en internet es clave. Te recomiendo ver el video que está al principio de nuestra página para que veas todo el potencial. Tener una buena presencia online te permite llegar a más clientes, construir credibilidad y abrir nuevos canales de venta 24/7. ¿Te gustaría que te contáramos cómo podemos ayudarte a lograrlo?",
    options: [{
      text: "Ver el video ahora",
      key: "go_to_inicio"
    }, {
      text: "Sí, cuéntame más",
      key: "servicio_web"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }]
  },
  ciberseguridad: {
    message: "La ciberseguridad es súper importante. No se trata solo de tecnología, sino de proteger el corazón de tu negocio: tus datos y la confianza de tus clientes. Una buena estrategia de seguridad evita pérdidas económicas y de reputación. ¿Quieres algunos consejos básicos para empezar?",
    options: [{
      text: "Sí, dame consejos",
      key: "consejos_ciberseguridad"
    }, {
      text: "Ver servicios de seguridad",
      key: "servicio_seguridad"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }]
  },
  consejos_ciberseguridad: {
    message: "¡Claro! Aquí van 3 consejos clave:<br>" +
      "<ul>" +
      "<li><strong>Contraseñas Fuertes:</strong> Usa combinaciones largas de letras, números y símbolos. ¡No uses '123456'!</li>" +
      "<li><strong>Autenticación de Dos Pasos (2FA):</strong> Actívala siempre que puedas. Es una capa extra de seguridad.</li>" +
      "<li><strong>Mantén todo actualizado:</strong> Tu software, antivirus y aplicaciones deben tener siempre la última versión para protegerte de vulnerabilidades.</li>" +
      "</ul>" +
      "<p>Proteger tu negocio es más fácil de lo que parece. ¿Te podemos ayudar con algo más?",
    options: [{
      text: "Ver servicios de seguridad",
      key: "servicio_seguridad"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }]
  },
  payment_info: {
    message: "¡Claro! Para realizar tu pago, hemos habilitado una sección segura donde puedes elegir tu método preferido. ¿Te gustaría ir ahora?",
    options: [{
      text: "Sí, llevar a Pagos Seguros",
      key: "go_to_pagos_seguros"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }]
  },
  certificaciones: {
    message: "Contamos con certificaciones que avalan nuestra seguridad, calidad y excelencia. Son prueba de nuestro compromiso con la innovación y los más altos estándares del sector. ¿Te gustaría verlas?",
    options: [{
      text: "Ver certificaciones",
      url: "https://certificaciones1.netlify.app/"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }]
  },
  ubicacion: {
    message: "Nos encontramos en Estado de Mexico Huixquilucan. ¡Nos encantaría que nos dejaras un comentario en nuestra ubicación de Google Maps! Tu feedback nos ayuda a mejorar.",
    options: [{
      text: "Dejar un comentario",
      url: "https://maps.app.goo.gl/VrvD1Z7wKA4YrFU1A"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }]
  },
  suscribete: {
    message: "¡Qué bueno que te interesa! Suscríbete para no perderte ninguna de nuestras innovaciones, ofertas especiales y contenido exclusivo. ¡Es la mejor forma de estar al día con el futuro de la tecnología!",
    options: [{
      text: "¡Claro, me suscribo!",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSci7AEJ6vcJBIUrjxHMPNdcmrT1g4GcYx0DzMTd5CrM4nwo1A/viewform?usp=header"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }]
  },
  contacto: {
    message: "¡Claro! Aquí tienes todas nuestras redes y formas de contacto. ¡Nos encantará saber de ti!",
    options: [{
      text: "WhatsApp",
      url: "https://wa.me/5653915739"
    }, {
      text: "Facebook",
      url: "https://www.facebook.com/AzInnovationX?mibextid=ZbWKwL"
    }, {
      text: "Instagram",
      url: "https://www.instagram.com/azinnovationx?igsh=MWN6Y2I1OWZycHVkOA=="
    }, {
      text: "TikTok",
      url: "https://www.tiktok.com/@innovationx09?_t=ZS-8yJNEWarLPO&_r=1"
    }, {
      text: "YouTube",
      url: "https://www.youtube.com/@AzInnovationX"
    }, {
      text: "Email",
      url: "mailto:soporteseguro98@gmail.com"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }],
  },
  nosotros_info: {
    message: "Az InnovationX es una iniciativa impulsada por la innovación, la estrategia y la seguridad. Nuestro equipo, liderado por <strong>Evaristo San Juan Azuara</strong> (Ingeniero en Seguridad Informática), se dedica a crear soluciones digitales preparadas para el futuro.<br><br>Con más de <strong>50 proyectos exitosos</strong>, nos enfocamos en resultados reales e impacto positivo.",
    options: [
      { text: "🎯 Filosofía", key: "filosofia_info" },
      { text: "📊 Impacto", key: "impacto_info" },
      { text: "🏠 Inicio", key: "saludo" }
    ]
  },
  filosofia_info: {
    message: "Nuestra filosofía se basa en dos pilares:<br>1. <strong>Ingenio y Visión:</strong> Aplicamos creatividad técnica y pensamiento estratégico.<br>2. <strong>Mentalidad Emprendedora:</strong> Diseñamos plataformas escalables que crecen contigo.",
    options: [{ text: "⬅️ Volver", key: "nosotros_info" }]
  },
  impacto_info: {
    message: "Hemos completado exitosamente más de <strong>50 proyectos</strong>, manteniendo un compromiso del 100% en cada desarrollo para asegurar la excelencia.",
    options: [{ text: "⬅️ Volver", key: "nosotros_info" }]
  },
  proceso_info: {
    message: "Nuestro proceso de innovación consta de 4 etapas clave:<br><br>1. <strong>Consulta y Estrategia:</strong> Entendemos tu visión y definimos el plan.<br>2. <strong>Diseño y Prototipado:</strong> Interfaces UX/UI centradas en el usuario.<br>3. <strong>Desarrollo Ágil:</strong> Código limpio y entregas incrementales.<br>4. <strong>Lanzamiento y Soporte:</strong> Despliegue seguro y acompañamiento continuo.",
    options: [
      { text: "🚀 Iniciar Proyecto", url: "contacto.html" },
      { text: "🏠 Inicio", key: "saludo" }
    ]
  },
  creator_info: {
    message: "Fui creado por Az InnovationX, desarrollado por Evaristo San Juan Azuara, un emprendedor y desarrollador apasionado por la innovación tecnológica y la creación de soluciones digitales inteligentes."
  },
  request_hours: {
    message: "¡Claro! Nuestro horario de atención es:<br><strong>Lunes a Sábado:</strong> 09:00 – 22:00 hrs (hora de México)<br><strong>Domingo:</strong> 09:00 – 14:00 hrs (hora de México)"
  },
  ejemplos: {
    message: "¡Claro! Puedes ver algunos de nuestros trabajos en nuestra sección de aplicaciones.",
    options: [{
      text: "Ir a la sección de Aplicaciones",
      url: "https://appsstoreaz.netlify.app/"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }]
  },
  presupuesto: {
    message: "¡Excelente! Para darte una cotización más precisa, ¿podrías indicarme tu presupuesto aproximado para este proyecto?",
    options: [{
      text: "Menos de $2,000 MXN",
      budget: "0-2000"
    }, {
      text: "$2,000 - $4,000 MXN",
      budget: "2000-4000"
    }, {
      text: "$4,000 - $6,000 MXN",
      budget: "4000-6000"
    }, {
      text: "Más de $6,000 MXN",
      budget: "6000+"
    }, {
      text: "Prefiero no decirlo",
      budget: "nda"
    }],
    nextContext: 'capture_budget'
  },
  human_escalation: {
    message: "Entiendo. Para darte una atención más personalizada, te recomiendo hablar directamente con nuestro equipo técnico vía WhatsApp. ¿Quieres que te redirija?",
    options: [{
      text: "Sí, llevar a WhatsApp",
      url: "https://wa.me/5653915739"
    }, {
      text: "No, gracias",
      key: "saludo"
    }],
    nextContext: 'whatsapp_redirect'
  },
};

  const getProactiveSuggestion = () => {
    const {
      currentTopic,
      mentionedServices,
      history,
      suggestedQuote,
      suggestedWebAppAndEcomm,
      suggestedPortfolio
    } = conversationState;
    if (!suggestedWebAppAndEcomm && mentionedServices.includes('Páginas Web') && mentionedServices.includes('Tiendas Online')) {
      conversationState.suggestedWebAppAndEcomm = true;
      return "Veo que te interesan tanto las páginas web como las tiendas online. ¿Sabías que nuestras tiendas online son sitios web completos con todo lo que necesitas para vender?";
    }

    const askedAboutPrice = history.some(input => intents.request_quote.some(kw => input.includes(kw)));
    if (!suggestedQuote && currentTopic && askedAboutPrice) {
      conversationState.suggestedQuote = true;
      return `Si quieres, podemos hacer una cotización más detallada para tu proyecto de ${currentTopic} sin ningún compromiso. Solo di "cotizar".`;
    }

    if (currentTopic && history.filter(i => i.toLowerCase().includes(currentTopic.toLowerCase().split(' ')[0])).length > 1) {
      if (!suggestedPortfolio) {
        conversationState.suggestedPortfolio = true;
        return `Parece que te interesa mucho ${currentTopic}. ¿Te gustaría ver algunos ejemplos de nuestros trabajos en esa área?`;
      }
    }
    return null;
  };

  const showBotMessage = (response, key = null) => {
    if (!messagesContainer) return;

    hideTypingIndicator(); // Ensure indicator is gone

    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', 'bot');

    const avatar = document.createElement('div');
    avatar.classList.add('bot-avatar-small');
    avatar.innerHTML = '<div style="width:100%; height:100%; background: var(--electric-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">AZ</div>';

    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('chat-message', 'bot-message');

    let message = response.message;

    if (key) {
        if (key === 'saludo') {
            conversationState.path = [];
        } else {
            const keyIndex = conversationState.path.indexOf(key);
            if (keyIndex !== -1) {
                conversationState.path = conversationState.path.slice(0, keyIndex + 1);
            } else {
                conversationState.path.push(key);
            }
        }
    }

    if (key && key !== 'saludo' && !response.options && !message.includes('?')) {
      let followUp = "¿Hay algo más en lo que pueda ayudarte?";
      if (conversationState.currentTopic) {
        followUp = `¿Tienes alguna otra pregunta sobre ${conversationState.currentTopic}, o te gustaría explorar otro servicio?`;
      }
      message += `<br><br><em>${followUp}</em>`;
    }

    const messageText = document.createElement('p');
    messageText.innerHTML = message;
    botMessageElement.appendChild(messageText);

    if (response.options) {
      const optionsContainer = document.createElement('div');
      optionsContainer.classList.add('options');

      // UX Improvement: Progressive Options (Max 4 relevant buttons)
      const optionsToShow = response.options.slice(0, 4);

      const createButton = (option) => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option.text;
        if (option.key) button.dataset.key = option.key;
        if (option.url) button.dataset.url = option.url;
        if (option.budget) button.dataset.budget = option.budget;
        return button;
      };

      optionsToShow.forEach(option => {
        optionsContainer.appendChild(createButton(option));
      });

      // Navigation Buttons (Home/Back) - Keep them together
      const navContainer = document.createElement('div');
      navContainer.classList.add('options');
      navContainer.style.marginTop = '4px';

      if (conversationState.path.length > 0) {
          const backKey = conversationState.path.length > 1 ? conversationState.path[conversationState.path.length - 2] : 'saludo';
          const backButton = document.createElement('button');
          backButton.classList.add('option-button', 'nav-btn');
          backButton.textContent = '⬅️ Volver';
          backButton.dataset.key = backKey;
          navContainer.appendChild(backButton);
      }

      if (conversationState.path.length > 0 && conversationState.path[0] !== 'saludo') {
          const homeButton = document.createElement('button');
          homeButton.classList.add('option-button', 'nav-btn');
          homeButton.textContent = '🏠 Inicio';
          homeButton.dataset.key = 'saludo';
          navContainer.appendChild(homeButton);
      }

      // Show "Ver más" if there are more than 4 options
      if (response.options.length > 4) {
          const verMasBtn = document.createElement('button');
          verMasBtn.classList.add('option-button');
          verMasBtn.textContent = '➕ Ver más...';
          verMasBtn.onclick = () => {
              verMasBtn.remove();
              response.options.slice(4).forEach(opt => {
                  optionsContainer.appendChild(createButton(opt));
              });
              // Move nav container to bottom again
              botMessageElement.appendChild(navContainer);
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
          };
          optionsContainer.appendChild(verMasBtn);
      }

      botMessageElement.appendChild(optionsContainer);
      if (navContainer.children.length > 0) {
          botMessageElement.appendChild(navContainer);
      }
    }

    wrapper.appendChild(avatar);
    wrapper.appendChild(botMessageElement);
    messagesContainer.appendChild(wrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    lastBotQuestionKey = response.nextContext || key;
    if (response.nextContext && !conversationState.mentionedServices.includes(response.nextContext)) {
      conversationState.mentionedServices.push(response.nextContext);
      conversationState.currentTopic = response.nextContext;
    }
  };

  const showUserMessage = (message) => {
    if (!messagesContainer) return;
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', 'user');

    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user-message');
    userMessageElement.textContent = message;

    wrapper.appendChild(userMessageElement);
    messagesContainer.appendChild(wrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const az_ui_detectName = (input) => {
    const patterns = [
      /(?:me llamo|soy|mi nombre es)\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)/i,
      /^soy\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)/i,
      /^me llamo\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+)/i
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        const name = match[1].trim().split(' ')[0];
        conversationState.userName = name;
        return true;
      }
    }
    return false;
  };

  const handleInput = (input) => {
    showUserMessage(input);
    conversationState.history.push(input.toLowerCase().trim());
    inputField.value = '';
    inputField.disabled = true;

    // Detect Name
    az_ui_detectName(input);

    // UX Improvement: Show typing indicator for a more natural feel
    showTypingIndicator();

    setTimeout(() => {
      let response;
      let responseKey = null;
      const lowerCaseInput = input.toLowerCase().trim();

      // Lead Qualification Flow
      if (conversationState.leadFlowStep > 0) {
        switch (conversationState.leadFlowStep) {
          case 1:
            conversationState.leadData.tipo = input;
            conversationState.leadFlowStep = 2;
            response = { message: "¿Cuál es tu presupuesto aproximado? 💰\nEj: Menos de $5,000 / $5,000-$20,000 / Más de $20,000 MXN" };
            break;
          case 2:
            conversationState.leadData.presupuesto = input;
            conversationState.leadFlowStep = 3;
            response = { message: "¿Para cuándo lo necesitas? ⏳\nEj: Urgente (1-2 semanas) / 1 mes / Sin prisa" };
            break;
          case 3:
            conversationState.leadData.tiempo = input;
            conversationState.leadFlowStep = 0;
            response = {
              message: "¡Perfecto! Con esa información podemos prepararte una propuesta. ¿Quieres que un asesor de AZ InnovationX te contacte?",
              options: [
                { text: "✅ Sí, contáctenme", url: "https://wa.me/5653915739" },
                { text: "📋 Ver opciones primero", key: "saludo" }
              ]
            };
            break;
        }
        if (response) {
           if (conversationState.userName) {
              const prefix = Math.random() > 0.5 ? `Claro, ${conversationState.userName}. ` : `Perfecto, ${conversationState.userName}. `;
              response.message = prefix + response.message;
           }
           showBotMessage(response);
           inputField.disabled = false;
           inputField.focus();
           return;
        }
      }

      // Detect Lead Keyword to start flow
      if (intents.lead_keywords.some(kw => lowerCaseInput.includes(kw))) {
        conversationState.leadFlowStep = 1;
        response = { message: "¿Qué tipo de proyecto necesitas? 🚀\nEj: Tienda en línea, App, Sitio web, Automatización..." };
        if (conversationState.userName) response.message = `¡Genial, ${conversationState.userName}! ` + response.message;
        showBotMessage(response);
        inputField.disabled = false;
        inputField.focus();
        return;
      }

      // 1. Check for specific context-based answers (like Yes/No to a redirect)
      if (lastBotQuestionKey) {
        if (affirmativeAnswers.includes(lowerCaseInput)) {
          switch (lastBotQuestionKey) {
            case 'whatsapp_redirect':
              window.open("https://wa.me/5653915739", '_blank');
              response = {
                message: "¡Entendido! Te estoy redirigiendo a WhatsApp. Si no se abre la ventana, puedes hacer clic aquí: <a href='https://wa.me/5653915739' target='_blank'>Abrir WhatsApp</a>"
              };
              break;
          }
        } else if (negativeAnswers.includes(lowerCaseInput)) {
          responseKey = "saludo";
        }
      }

      // 2. Keyword Matching (Intents) if no specific response was found yet
      if (!response && !responseKey) {
        for (const intent in intents) {
          if (intents[intent].some(kw => lowerCaseInput.includes(kw))) {
            switch (intent) {
              case 'request_payment': responseKey = 'payment_info'; break;
              case 'request_quote': responseKey = 'precios_menu'; break;
              case 'request_contact': responseKey = 'contacto'; break;
              case 'request_location': responseKey = 'ubicacion'; break;
              case 'request_examples': responseKey = 'ejemplos'; break;
              case 'frustration': responseKey = 'human_escalation'; break;
              case 'request_service_info': responseKey = 'servicios_menu'; break;
              case 'greet': responseKey = 'saludo'; break;
              case 'request_about': responseKey = 'nosotros_info'; break;
              case 'request_process':
              case 'request_process_direct': responseKey = 'proceso_info'; break;
              case 'request_support': responseKey = 'faq_soporte_menu'; break;
              case 'request_online_presence_info': responseKey = 'presencia_internet'; break;
              case 'request_cybersecurity_info': responseKey = 'ciberseguridad'; break;
              case 'request_creator_info': responseKey = 'creator_info'; break;
              case 'request_hours': responseKey = 'request_hours'; break;
              case 'request_articles': responseKey = 'articles_info'; break;
              case 'request_affiliates': responseKey = 'affiliate_info'; break;
              case 'request_pwa': responseKey = 'servicio_app'; break;
              case 'request_ecommerce': responseKey = 'servicio_ecommerce'; break;
              case 'request_web': responseKey = 'servicio_web'; break;
              case 'request_chatbot': responseKey = 'servicio_chatbot'; break;
            }
            if (responseKey) break;
          }
        }
      }

      const history = conversationState.history;
      if (!response && !responseKey && history.length > 2) {
        const lastThree = history.slice(-3);
        if (lastThree[0] === lastThree[1] && lastThree[1] === lastThree[2]) {
          response = JSON.parse(JSON.stringify(knowledgeBase['human_escalation']));
          response.message = "Parece que no nos estamos entendiendo. " + response.message;
          conversationState.history = [];
        }
      }

      if (responseKey) {
        response = JSON.parse(JSON.stringify(knowledgeBase[responseKey]));

        // Personalize with name
        if (conversationState.userName && Math.random() > 0.3 && responseKey !== 'saludo') {
          const nameGreetings = [
            `Claro, ${conversationState.userName}. `,
            `Perfecto, ${conversationState.userName}. `,
            `Mira, ${conversationState.userName}, `,
            `Con gusto, ${conversationState.userName}. `
          ];
          const randomNameGreet = nameGreetings[Math.floor(Math.random() * nameGreetings.length)];
          response.message = randomNameGreet + response.message;
        }

        // UX Improvement: Enhanced transition messages
        if (responseKey !== 'saludo') {
          const transitions = [
            "Entendido, déjame ayudarte con eso...",
            "¡Buena pregunta! Aquí tienes la información:",
            "Excelente elección, esto es lo que necesitas saber:",
            "Claro, déjame buscar eso para ti..."
          ];
          const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
          response.message = `<em>${randomTransition}</em><br><br>${response.message}`;
        }

        misunderstandingCounter = 0;
        conversationState.userFrustration = 0;
      }

      if (!response) {
        misunderstandingCounter++;
        conversationState.userFrustration++;
        if (misunderstandingCounter >= 2 || conversationState.userFrustration >= 3) {
          response = knowledgeBase['human_escalation'];
          misunderstandingCounter = 0;
        } else {
          let defaultMessage = "No he encontrado una respuesta exacta para eso. ";
          if (conversationState.currentTopic) {
            defaultMessage += `¿Tu pregunta está relacionada con ${conversationState.currentTopic}? `;
          }
          defaultMessage += "Prueba con palabras clave como 'precios', 'servicios' o 'contacto', o elige una de estas opciones:";
          response = {
            message: defaultMessage,
            options: [
              { text: "🚀 Ver Servicios", key: "servicios_menu" },
              { text: "💰 Consultar Precios", key: "precios_menu" },
              { text: "🤔 Preguntas Frecuentes", key: "faq_menu" },
              { text: "📱 Hablar con un Asesor", key: "human_escalation" }
            ]
          };
        }
      }

      const proactiveSuggestion = getProactiveSuggestion();
      if (proactiveSuggestion && !response.options) {
        response.message += `<br><br><div style="border-left: 3px solid #00d4ff; padding-left: 10px; margin-top: 10px; opacity: 0.9;"><em>Sugerencia: ${proactiveSuggestion}</em></div>`;
      }

      if (response) {
        showBotMessage(response, responseKey);
      }

      inputField.disabled = false;
      inputField.focus();
    }, 1200); // Slightly longer delay for typing indicator effect
  };

  if (inputForm) {
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userInput = inputField.value.trim();
      if (userInput) {
        handleInput(userInput);
      }
    });
  }

  if (messagesContainer) {
    messagesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-button')) {
          const key = e.target.dataset.key;
          const url = e.target.dataset.url;
          const budget = e.target.dataset.budget;
          const text = e.target.textContent;

          showUserMessage(text);
          conversationState.history.push(text.toLowerCase().trim());
          inputField.disabled = true;

          setTimeout(() => {
            if (url) {
              window.open(url, '_blank');
              showBotMessage({
                message: "<em>¡Listo!</em><br><br>Te he abierto el enlace en una nueva pestaña para que no pierdas nuestra conversación. ¿Necesitas algo más?",
                options: [{ text: "⬅️ Volver", key: conversationState.path[conversationState.path.length-1] || 'saludo' }]
              });
            } else if (key === 'go_to_pagos_seguros') {
              window.location.href = 'pagar.html';
            } else if (key === 'go_to_inicio') {
              window.location.href = 'index.html';
            } else if (key) {
              const response = knowledgeBase[key];
              if (response) {
                showBotMessage(response, key);
              }
            } else if (budget) {
              conversationState.budgetRange = text;
              let tailoredResponse = `¡Entendido! Con un presupuesto de ${text}, podemos explorar varias opciones. Para darte los detalles exactos, lo mejor es que hables con un experto. ¿Quieres que te dirija a WhatsApp para una cotización formal?`;
              showBotMessage({
                message: tailoredResponse,
                options: [{
                  text: "Sí, llevar a WhatsApp",
                  url: "https://wa.me/5653915739"
                }, {
                  text: "No, gracias",
                  key: "saludo"
                }],
                nextContext: 'whatsapp_redirect'
              });
            }
            inputField.disabled = false;
            inputField.focus();
          }, 400);
        }
    });
  }
});

// Contact / Solicitudes Form Logic
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
