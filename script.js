
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
    // Header background on scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 15, 30, 0.98)';
      } else {
        header.style.background = 'rgba(10, 15, 30, 0.95)';
      }
    });
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
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
          const text = statNumber.textContent;
          let target = parseInt(text);
          if (text.includes('%')) target = 95;
          else if (text.includes('+')) target = 200;
          else if (text.includes('/')) target = 24;
          else target = parseInt(text);
          animateCounter(statNumber, target);
          statsObserver.unobserve(entry.target);
        }
      });
    });
    document.querySelectorAll('.stat-card').forEach(card => {
      statsObserver.observe(card);
    });
    // Add typing effect to hero title
    function typeWriter(element, text, speed = 50) {
      let i = 0;
      element.innerHTML = '';

      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    }
    // Add floating animation to service icons
    document.querySelectorAll('.service-icon').forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.2}s`;
      icon.style.animation = 'float 6s ease-in-out infinite';
    });
    // Smooth reveal animation for steps
    document.querySelectorAll('.step-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });


    // Firebase Configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDyk6XjQ72k73oza9fkkUxup9GQvDsFT5o",
      authDomain: "weatherwise-aywzg.firebaseapp.com",
      projectId: "weatherwise-aywzg",
      storageBucket: "weatherwise-aywzg.firebasestorage.app",
      messagingSenderId: "699516071771",
      appId: "1:699516071771:web:5a84dcf771b1ee5c38b47e"
    };
    // Initialize Firebase
    let db;
    try {
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      console.log('Firebase inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar Firebase:', error);
    }
    // Form validation
    function validateForm() {
      const requiredFields = ['nombre', 'email', 'servicio', 'mensaje'];
      let isValid = true;
      requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const value = field.value.trim();
        if (!value) {
          field.classList.add('invalid');
          field.classList.remove('valid');
          isValid = false;
        } else {
          field.classList.remove('invalid');
          field.classList.add('valid');
        }
      });
      // Email validation
      const emailField = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        emailField.classList.add('invalid');
        emailField.classList.remove('valid');
        isValid = false;
      }
      return isValid;
    }
    // Real-time validation
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
      field.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value) {
          this.classList.remove('invalid');
          this.classList.add('valid');
        } else {
          this.classList.add('invalid');
          this.classList.remove('valid');
        }
      });
      field.addEventListener('input', function() {
        if (this.classList.contains('invalid') && this.value.trim()) {
          this.classList.remove('invalid');
          this.classList.add('valid');
        }
      });
    });
    // Form submission
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      const successMessage = document.getElementById('successMessage');
      const errorMessage = document.getElementById('errorMessage');
      // Hide previous messages
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';
      // Validate form
      if (!validateForm()) {
        errorMessage.textContent = 'Por favor, completa todos los campos obligatorios correctamente.';
        errorMessage.style.display = 'block';
        return;
      }
      // Show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="loading"></span>Enviando...';
      submitBtn.disabled = true;
      try {
        // Get form data
        const formData = new FormData(this);
        const formObj = {};
        formData.forEach((value, key) => {
          formObj[key] = value;
        });
        // Prepare data for Firebase
        const contactData = {
          nombre: formObj.nombre || '',
          email: formObj.email || '',
          telefono: formObj.telefono || '',
          empresa: formObj.empresa || '',
          servicio: formObj.servicio || '',
          presupuesto: formObj.presupuesto || '',
          mensaje: formObj.mensaje || '',
          fechaEnvio: firebase.firestore.Timestamp.now(),
          estado: 'nuevo',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        };
        console.log('Enviando datos:', contactData);
        // Save to Firebase
        if (db) {
          await db.collection('contactos').add(contactData);
          console.log('Datos guardados en Firebase');
          // Show success message
          successMessage.style.display = 'block';
          // Reset form
          this.reset();
          // Remove validation classes
          document.querySelectorAll('.valid, .invalid').forEach(field => {
            field.classList.remove('valid', 'invalid');
          });
          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
        } else {
          throw new Error('Base de datos no disponible');
        }
      } catch (error) {
        console.error('Error al enviar formulario:', error);
        errorMessage.textContent = 'Error al enviar el formulario: ' + error.message;
        errorMessage.style.display = 'block';
      } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
    // Test Firebase connection on page load
    window.addEventListener('load', async () => {
      if (db) {
        try {
          await db.collection('contactos').limit(1).get();
          console.log('Conexión a Firebase exitosa');
        } catch (error) {
          console.error('Error de conexión a Firebase:', error);
        }
      }
    });


    document.addEventListener('DOMContentLoaded', () => {
      // --- Hero Section: Interactive Particle System ---
      const canvas = document.getElementById('particle-canvas');
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
      if (canvas) {
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
          }, 500 + (index * 250)); // Staggered delay
        });
      });
      // 2. Custom Cursor and Parallax Mouse-follow
      window.addEventListener('mousemove', (e) => {
        const {
          clientX,
          clientY
        } = e;
        // Update custom cursor position
        if (customCursor) {
          customCursor.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
        }
        // Update parallax elements
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
          card.style.transform = ''; // Reset to CSS state
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
      // --- "Quiénes Somos" Section Interactivity ---
      const nosotrosSection = document.querySelector('#nosotros');
      const bentoBoxes = document.querySelectorAll('.bento-box');
      const typewriterElement = document.querySelector('.typewriter-text');
      const stats = document.querySelectorAll('.stat-number');
      const nosotrosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate bento boxes
            bentoBoxes.forEach((box, index) => {
              box.style.transitionDelay = `${index * 150}ms`;
              box.classList.add('visible');
            });
            // Animate stats
            stats.forEach(stat => {
              const target = +stat.getAttribute('data-target');
              animateCounter(stat, target);
            });
            // Animate typewriter
            if (typewriterElement) {
              const text = typewriterElement.textContent;
              typewriterElement.textContent = '';
              setTimeout(() => typeWriter(typewriterElement, text), bentoBoxes.length * 150);
            }
            nosotrosObserver.unobserve(nosotrosSection); // Stop observing
          }
        });
      }, {
        threshold: 0.2
      });
      if (nosotrosSection) {
        nosotrosObserver.observe(nosotrosSection);
      }
      // 3D tilt effect for bento boxes
      bentoBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
          const rect = box.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotateX = (y / rect.height) * -20;
          const rotateY = (x / rect.width) * 20;
          box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(30px)`;
        });
        box.addEventListener('mouseleave', () => {
          box.style.transform = ''; // Reset to CSS state
        });
      });
      // Re-usable counter and typewriter functions (adapted from existing code)
      function animateCounter(element, target) {
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          // Keep the "+" sign if it exists in the original text
          element.textContent = Math.ceil(count) + (element.textContent.includes('+') ? '+' : '');
        }, 20);
      }

      function typeWriter(element, text, speed = 60) {
        let i = 0;
        element.style.opacity = 1;

        function type() {
          if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        }
        type();
      }
      // --- Staggered Entry Animation for Contact Cards ---
      document.querySelectorAll('.contact-section, #contacto').forEach(section => {
        const contactItems = section.querySelectorAll('.contact-item');
        if (contactItems.length > 0) {
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Animate the items within the section that is now visible
                const items = entry.target.querySelectorAll('.contact-item');
                items.forEach((item, index) => {
                  item.style.transitionDelay = `${index * 120}ms`;
                  item.classList.add('visible');
                });
                observer.unobserve(entry.target); // Unobserve the section after animation
              }
            });
          }, {
            threshold: 0.2
          });
          observer.observe(section);
        }
      });
    });


    document.addEventListener('DOMContentLoaded', () => {
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
      };
      const intents = {
        greet: ['hola', 'buenos dias', 'buenas tardes'],
        request_service_info: ['servicio', 'información', 'que haces', 'ayuda', 'productos'],
        request_quote: ['precio', 'costo', 'cuánto', 'presupuesto', 'tarifa', 'cotización', 'cotizar', 'planes', 'paquetes', 'tienda online', 'chatbot'],
        request_payment: ['pagar', 'pago', 'métodos de pago', 'cómo pago', 'cuenta bancaria', 'transferencia'],
        request_contact: ['redes', 'social', 'síguelos', 'facebook', 'instagram', 'tiktok', 'seguir', 'contacto', 'llamar', 'email', 'correo'],
        request_examples: ['ejemplos', 'portfolio', 'trabajos', 'proyectos anteriores', 'muestra'],
        request_process: ['tiempo', 'cuándo', 'plazos', 'entrega', 'duración', 'proceso'],
        request_support: ['soporte', 'mantenimiento', 'garantía', 'actualizaciones'],
        frustration: ['no funciona', 'no sirve', 'frustrado', 'agente', 'humano', 'persona', 'no entiendo'],
        request_online_presence_info: ['presencia', 'internet', 'online', 'importancia de estar en linea', 'visibilidad'],
        request_cybersecurity_info: ['ciberseguridad', 'seguridad', 'proteger', 'riesgos', 'hackers', 'virus'],
        request_creator_info: ['quien te creo', 'quién te creó', 'creador', 'desarrollador', 'quien te hizo', 'quién te hizo', 'quien te programo', 'quién te programó'],
        request_hours: ['horario', 'atienden', 'abren', 'cierran', 'horas', 'horarios de atencion'],
      };
      const chatbotToggle = document.getElementById('chatbot-toggle');
      const chatbotWindow = document.getElementById('chatbot-window');
      const iconOpen = chatbotToggle.querySelector('.icon-open');
      const iconClose = chatbotToggle.querySelector('.icon-close');
      const messagesContainer = document.getElementById('chatbot-messages');
      const inputForm = document.getElementById('chatbot-input-form');
      const inputField = document.getElementById('chatbot-input');
      const expandToggle = document.getElementById('chatbot-expand-toggle');
      let misunderstandingCounter = 0;
      if (expandToggle && chatbotWindow) {
        expandToggle.addEventListener('click', () => {
          chatbotWindow.classList.toggle('expanded');
          const icon = expandToggle.querySelector('svg');
          if (chatbotWindow.classList.contains('expanded')) {
            // Change to minimize icon
            icon.innerHTML = '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>';
          } else {
            // Change back to expand icon
            icon.innerHTML = '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>';
          }
        });
      }
      const knowledgeBase = {
        saludo: {
          message: "¡Qué padre que estás aquí! Soy AZ, tu asistente virtual de Az InnovationX. Estoy listo para ayudarte a convertir tu idea en una solución digital. ¿En qué te puedo ayudar?",
          options: [{
              text: "Nuestros Servicios",
              key: "servicios_menu"
            },
            {
              text: "Presencia en Internet",
              key: "presencia_internet"
            },
            {
              text: "Suscríbete",
              key: "suscribete"
            },
            {
              text: "Nuestra Ubicación",
              key: "ubicacion"
            },
            {
              text: "Tips de Ciberseguridad",
              key: "ciberseguridad"
            },
            {
              text: "Métodos de Pago",
              key: "payment_info"
            },
            {
              text: "Nuestras Certificaciones",
              key: "certificaciones"
            },
            {
              text: "Preguntas Frecuentes (FAQ)",
              key: "faq_menu"
            },
            {
              text: "Contacto y Redes Sociales",
              key: "contacto"
            }
          ]
        },
        presencia_internet: {
          message: "¡Excelente pregunta! Tener presencia en internet es clave. Te recomiendo ver el video que está al principio de nuestra página para que veas todo el potencial. Tener una buena presencia online te permite llegar a más clientes, construir credibilidad y abrir nuevos canales de venta 24/7. ¿Te gustaría que te contáramos cómo podemos ayudarte a lograrlo?",
          options: [{
              text: "Ver el video ahora",
              key: "go_to_inicio"
            },
            {
              text: "Sí, cuéntame más",
              key: "servicio_web"
            },
            {
              text: "No, gracias",
              key: "saludo"
            }
          ]
        },
        ciberseguridad: {
          message: "La ciberseguridad es súper importante. No se trata solo de tecnología, sino de proteger el corazón de tu negocio: tus datos y la confianza de tus clientes. Una buena estrategia de seguridad evita pérdidas económicas y de reputación. ¿Quieres algunos consejos básicos para empezar?",
          options: [{
              text: "Sí, dame consejos",
              key: "consejos_ciberseguridad"
            },
            {
              text: "Ver servicios de seguridad",
              key: "servicio_seguridad"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ]
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
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ]
        },
        creator_info: {
          message: "Fui creado por Az InnovationX, desarrollado por Evaristo San Juan Azuara, un emprendedor y desarrollador apasionado por la innovación tecnológica y la creación de soluciones digitales inteligentes."
        },
        suscribete: {
          message: "¡Qué bueno que te interesa! Suscríbete para no perderte ninguna de nuestras innovaciones, ofertas especiales y contenido exclusivo. ¡Es la mejor forma de estar al día con el futuro de la tecnología!",
          options: [{
              text: "¡Claro, me suscribo!",
              url: "https://docs.google.com/forms/d/e/1FAIpQLSci7AEJ6vcJBIUrjxHMPNdcmrT1g4GcYx0DzMTd5CrM4nwo1A/viewform?usp=header"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ]
        },
        ubicacion: {
          message: "Nos encontramos en Estado de Mexico Huixquilucan. ¡Nos encantaría que nos dejaras un comentario en nuestra ubicación de Google Maps! Tu feedback nos ayuda a mejorar.",
          options: [{
              text: "Dejar un comentario",
              url: "https://maps.app.goo.gl/VrvD1Z7wKA4YrFU1A"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ]
        },
        payment_info: {
          message: "¡Claro! Para realizar tu pago, hemos habilitado una sección segura donde puedes elegir tu método preferido. ¿Te gustaría ir ahora?",
          options: [{
              text: "Sí, llevar a Pagos Seguros",
              key: "go_to_pagos_seguros"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ]
        },
        servicios_menu: {
          message: "¡Súper! Ofrecemos varias soluciones de alta tecnología. ¿Cuál te interesa para contarte más?",
          options: [{
              text: "Páginas Web Profesionales",
              key: "servicio_web"
            },
            {
              text: "Aplicaciones Móviles",
              key: "servicio_app"
            },
            {
              text: "Tiendas Online",
              key: "servicio_ecommerce"
            },
            {
              text: "Chatbots Inteligentes",
              key: "servicio_chatbot"
            },
            {
              text: "Seguridad Informática",
              key: "servicio_seguridad"
            },
            {
              text: "Soluciones Cloud",
              key: "servicio_cloud"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ],
        },
        faq_menu: {
          message: "¡Excelente! Aquí tienes los temas de nuestras preguntas más comunes. ¿Sobre qué te gustaría saber?",
          options: [{
              text: "Sobre el Proceso",
              key: "faq_proceso_menu"
            },
            {
              text: "Sobre Tecnología",
              key: "faq_tecnologia_menu"
            },
            {
              text: "Soporte Post-Venta",
              key: "faq_soporte_menu"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ]
        },
        contacto: {
          message: "¡Claro! Aquí tienes todas nuestras redes y formas de contacto. ¡Nos encantará saber de ti!",
          options: [{
              text: "WhatsApp",
              url: "https://wa.me/5620042412"
            },
            {
              text: "Facebook",
              url: "https://www.facebook.com/AzInnovationX?mibextid=ZbWKwL"
            },
            {
              text: "Instagram",
              url: "https://www.instagram.com/azinnovationx?igsh=MWN6Y2I1OWZycHVkOA=="
            },
            {
              text: "TikTok",
              url: "https://www.tiktok.com/@innovationx09?_t=ZS-8yJNEWarLPO&_r=1"
            },
            {
              text: "Aplicaciones",
              url: "https://sites.google.com/view/tienda-de-aplicaciones/aplicaciones"
            },
            {
              text: "Blog",
              url: "https://azinnovationx.blogspot.com/"
            },
            {
              text: "Email",
              url: "mailto:soporteseguro98@gmail.com"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ],
        },
        ejemplos: {
          message: "¡Claro! Puedes ver algunos de nuestros trabajos en nuestra sección de aplicaciones.",
          options: [{
              text: "Ir a la sección de Aplicaciones",
              url: "https://sites.google.com/view/tienda-de-aplicaciones/aplicaciones"
            },
            {
              text: "Volver al inicio",
              key: "saludo"
            }
          ]
        },
        servicio_web: {
          message: "Creamos páginas web profesionales con diseños modernos, SEO optimizado e integración de APIs. ¡Perfectas para convertir visitantes en clientes!",
          options: [
            { text: "Ver más", url: "https://ejemplosdepaginasweb.netlify.app/" },
            { text: "Volver a servicios", key: "servicios_menu" }
          ],
          nextContext: 'Páginas Web'
        },
        servicio_app: {
          message: "Desarrollamos apps para Android y multiplataforma con notificaciones push y un diseño intuitivo para conectar con tu audiencia.",
          options: [
            { text: "Ver más", url: "https://paginawebaplicaciones.netlify.app/" },
            { text: "Volver a servicios", key: "servicios_menu" }
          ],
          nextContext: 'Aplicaciones Móviles'
        },
        servicio_ecommerce: {
          message: "Construimos plataformas de e-commerce robustas con pasarelas de pago seguras y gestión de inventario para que vendas sin parar.",
          options: [
            { text: "Ver más", url: "https://paginawebdetiendaonline.netlify.app/" },
            { text: "Volver a servicios", key: "servicios_menu" }
          ],
          nextContext: 'Tiendas Online'
        },
        servicio_chatbot: {
          message: "Automatizamos la atención al cliente 24/7 con IA. ¡Respuestas al instante para no perder ni un cliente!",
          options: [
            { text: "Ver más", url: "https://chatbotsaz.netlify.app/" },
            { text: "Volver a servicios", key: "servicios_menu" }
          ],
          nextContext: 'Chatbots Inteligentes'
        },
        servicio_seguridad: {
          message: "Protegemos tu negocio digital con auditorías y protocolos de ciberseguridad. ¡Tu tranquilidad es nuestra prioridad!",
          options: [
            { text: "Ver más", url: "https://paginawebseguridadinformatica.netlify.app/" },
            { text: "Volver a servicios", key: "servicios_menu" }
          ],
          nextContext: 'Seguridad Informática'
        },
        servicio_cloud: {
          message: "Migramos y optimizamos tu infraestructura en la nube para darte escalabilidad, alta disponibilidad y backups automáticos.",
          options: [
            { text: "Ver más", url: "https://paginawebsolucionescloud.netlify.app/" },
            { text: "Volver a servicios", key: "servicios_menu" }
          ],
          nextContext: 'Soluciones Cloud'
        },
        faq_proceso_menu: {
          message: "¡Perfecto! Nuestro proceso es súper ágil. ¿Qué te gustaría saber?",
          options: [{
              text: "¿Cómo empezamos?",
              key: "faq_proceso_inicio"
            },
            {
              text: "¿Qué necesitan de mí?",
              key: "faq_proceso_requisitos"
            },
            {
              text: "¿Puedo ver el progreso?",
              key: "faq_proceso_progreso"
            },
            {
              text: "Volver a FAQ",
              key: "faq_menu"
            }
          ]
        },
        faq_tecnologia_menu: {
          message: "¡Nos encanta la tecnología! Usamos lo más moderno y eficiente. ¿Qué quieres saber?",
          options: [{
              text: "¿Qué tecnologías usan?",
              key: "faq_tech_stack"
            },
            {
              text: "¿Mis datos están seguros?",
              key: "faq_tech_seguridad"
            },
            {
              text: "Volver a FAQ",
              key: "faq_menu"
            }
          ]
        },
        faq_soporte_menu: {
          message: "¡Claro! Nuestro compromiso no termina con la entrega. ¿Qué duda tienes sobre el soporte?",
          options: [{
              text: "¿Ofrecen capacitación?",
              key: "faq_soporte_capacitacion"
            },
            {
              text: "¿Qué incluye el soporte?",
              key: "faq_soporte_incluye"
            },
            {
              text: "¿Tienen garantía?",
              key: "faq_soporte_garantia"
            },
            {
              text: "Volver a FAQ",
              key: "faq_menu"
            }
          ]
        },
        faq_proceso_inicio: {
          message: "¡Súper fácil! 1) Nos cuentas tu idea, 2) Te damos presupuesto, 3) Firmamos contrato, 4) ¡Empezamos a crear!"
        },
        faq_proceso_requisitos: {
          message: "Solo necesitamos que nos cuentes tu visión, compartas contenido (textos, imágenes) y que tengas comunicación fluida con nosotros."
        },
        faq_proceso_progreso: {
          message: "¡Por supuesto! Te enviamos actualizaciones semanales con capturas y avances. Siempre estarás al tanto."
        },
        faq_tech_stack: {
          message: "Usamos tecnologías modernas: HTML5, CSS3, JavaScript, React, Node.js, Firebase. Siempre lo más actual y eficiente."
        },
        faq_tech_seguridad: {
          message: "¡Totalmente! Implementamos protocolos de seguridad SSL, encriptación y cumplimos con estándares internacionales de protección de datos."
        },
        faq_soporte_capacitacion: {
          message: "¡Sí! Incluimos sesión de capacitación para que sepas manejar tu plataforma como un experto."
        },
        faq_soporte_incluye: {
          message: "Soporte técnico por 30 días, corrección de bugs, y asesoría para dudas básicas sin costo adicional."
        },
        faq_soporte_garantia: {
          message: "¡Por supuesto! 30 días de garantía total contra defectos de funcionamiento y bugs."
        },
        presupuesto: {
          message: "¡Excelente! Para darte una cotización más precisa, ¿podrías indicarme tu presupuesto aproximado para este proyecto?",
          options: [{
              text: "Menos de $2,000 MXN",
              budget: "0-2000"
            },
            {
              text: "$2,000 - $4,000 MXN",
              budget: "2000-4000"
            },
            {
              text: "$4,000 - $6,000 MXN",
              budget: "4000-6000"
            },
            {
              text: "Más de $6,000 MXN",
              budget: "6000+"
            },
            {
              text: "Prefiero no decirlo",
              budget: "nda"
            }
          ],
          nextContext: 'capture_budget'
        },
        human_escalation: {
          message: "Entiendo. Para darte una atención más personalizada, te recomiendo hablar directamente con nuestro equipo técnico vía WhatsApp. ¿Quieres que te redirija?",
          options: [{
            text: "Sí, llevar a WhatsApp",
            url: "https://wa.me/5620042412"
          }, {
            text: "No, gracias",
            key: "saludo"
          }],
          nextContext: 'whatsapp_redirect'
        },
        certificaciones: {
          message: "Contamos con certificaciones que avalan nuestra seguridad, calidad y excelencia. Son prueba de nuestro compromiso con la innovación y los más altos estándares del sector. ¿Te gustaría verlas?",
          options: [
            { text: "Ver certificaciones", url: "https://certificaciones1.netlify.app/" },
            { text: "Volver al inicio", key: "saludo" }
          ]
        },
        precios_menu: {
            message: "¡Por supuesto! Para darte la información más precisa, por favor dime sobre qué servicio te gustaría saber el costo.",
            options: [
                { text: "Página Web One Page", key: "precio_web_one_page" },
                { text: "Web Empresarial", key: "precio_web_empresarial" },
                { text: "Tienda Online", key: "precio_tienda" },
                { text: "App Web (PWA)", key: "precio_pwa" },
                { text: "Chatbot Básico", key: "precio_chatbot_basico" },
                { text: "Chatbot Avanzado", key: "precio_chatbot_avanzado" },
                { text: "Seguridad Web", key: "precio_seguridad" },
                { text: "Hosting y Mantenimiento", key: "precio_hosting" },
                { text: "Paquetes Recomendados", key: "precios_paquetes" },
                { text: "Volver al inicio", key: "saludo" }
            ]
        },
        precio_web_one_page: {
            message: "Una <strong>Página Web One Page Profesional</strong> tiene un costo de 💰 $2,000 a $3,000 MXN. Es ideal para emprendedores y marcas que buscan una presencia digital moderna y efectiva. Incluye diseño responsivo, secciones estratégicas, integración con redes sociales y formulario de contacto.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precio_web_empresarial: {
            message: "Una <strong>Página Web Empresarial Premium</strong> cuesta entre 💰 $2,500 y $3,500 MXN. Es un sitio corporativo profesional enfocado en posicionamiento y ventas, con múltiples secciones, SEO básico y copywriting persuasivo.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precio_tienda: {
            message: "Una <strong>Tienda Online Básica</strong> tiene un precio de 💰 $2,500 a $3,000 MXN. Es la solución perfecta para empezar a vender en línea, con catálogo de productos, carrito de compras, integración de pagos y WhatsApp.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precio_pwa: {
            message: "Una <strong>App Web Android (PWA)</strong> tiene un costo de 💰 $2,800 a $3,700 MXN. Es una app instalable que ofrece acceso directo desde el celular, con carga rápida y funcionamiento sin conexión.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precio_chatbot_basico: {
            message: "Un <strong>Chatbot Web Básico</strong> cuesta entre 💰 $500 y $800 MXN. Es ideal para automatizar respuestas a preguntas frecuentes con un flujo de conversación predefinido.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precio_chatbot_avanzado: {
            message: "Un <strong>Chatbot Avanzado</strong> tiene un precio de 💰 $800 a $1,200 MXN. Incluye menús interactivos, múltiples flujos de conversación e integración con WhatsApp o correo electrónico.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precio_seguridad: {
            message: "El servicio de <strong>Seguridad Web Básica</strong> cuesta entre 💰 $2,800 y $3,800 MXN. Incluye un diagnóstico de seguridad, un reporte de vulnerabilidades y la implementación de configuraciones esenciales para proteger tu sitio.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precio_hosting: {
            message: "Nuestro servicio de <strong>Hosting y Mantenimiento</strong> tiene un costo de 💰 $1,200 a $2,000 MXN. Asegura que tu sitio esté siempre en línea, optimizado, seguro y con respaldos periódicos.",
            options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        precios_paquetes: {
            message: "¡Claro! Aquí tienes nuestros paquetes recomendados:<br><br><strong>📦 Web + Chatbot Básico:</strong> $3,000 - $3,800 MXN<br><strong>📦 Web + App + Chatbot:</strong> $5,300 - $7,500 MXN<br><br>Todos nuestros planes incluyen hosting y dominio gratis. ✅",
            options: [{ text: "Ver precios individuales", key: "precios_menu" }, { text: "Volver al inicio", key: "saludo" }]
        },
        request_hours: {
            message: "¡Claro! Nuestro horario de atención es:<br><strong>Lunes a Sábado:</strong> 09:00 – 22:00 hrs (hora de México)<br><strong>Domingo:</strong> 09:00 – 14:00 hrs (hora de México)"
        }
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
      const toggleChatbot = () => {
        const isActive = chatbotWindow.classList.toggle('active');
        iconOpen.style.display = isActive ? 'none' : 'block';
        iconClose.style.display = isActive ? 'block' : 'none';
        if (isActive && messagesContainer.children.length === 0) {
          showBotMessage(knowledgeBase.saludo, 'saludo');
        }
      };
      const showBotMessage = (response, key = null) => {
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('chat-message', 'bot-message');
        let message = response.message;
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
          response.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = option.text;
            if (option.key) button.dataset.key = option.key;
            if (option.url) button.dataset.url = option.url;
            if (option.budget) button.dataset.budget = option.budget;
            optionsContainer.appendChild(button);
          });
          botMessageElement.appendChild(optionsContainer);
        }
        messagesContainer.appendChild(botMessageElement);
        scrollToBottom();
        lastBotQuestionKey = response.nextContext || key;
        if (response.nextContext && !conversationState.mentionedServices.includes(response.nextContext)) {
          conversationState.mentionedServices.push(response.nextContext);
          conversationState.currentTopic = response.nextContext;
        }
      };
      const showUserMessage = (message) => {
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('chat-message', 'user-message');
        userMessageElement.textContent = message;
        messagesContainer.appendChild(userMessageElement);
        scrollToBottom();
      };
      const handleInput = (input) => {
        showUserMessage(input);
        conversationState.history.push(input.toLowerCase().trim());
        inputField.value = '';
        inputField.disabled = true;
        setTimeout(() => {
          let response;
          let responseKey = null;
          const lowerCaseInput = input.toLowerCase().trim();
          if (lastBotQuestionKey) {
            if (affirmativeAnswers.includes(lowerCaseInput)) {
              switch (lastBotQuestionKey) {
                case 'presupuesto_offer':
                  responseKey = 'presupuesto';
                  break;
                case 'contact_offer':
                  responseKey = 'contacto';
                  break;
                case 'whatsapp_redirect':
                  window.open("https://wa.me/5620042412", '_blank');
                  response = {
                    message: "¡Perfecto! Te estoy redirigiendo a WhatsApp. Si no se abre la ventana, puedes hacer clic aquí: <a href='https://wa.me/5620042412' target='_blank'>Abrir WhatsApp</a>"
                  };
                  break;
              }
            } else if (negativeAnswers.includes(lowerCaseInput)) {
              responseKey = "saludo";
            }
          }
          if (!response) {
            for (const intent in intents) {
              if (intents[intent].some(kw => lowerCaseInput.includes(kw))) {
                switch (intent) {
                  case 'request_payment':
                    responseKey = 'payment_info';
                    break;
                  case 'request_quote':
                    responseKey = 'precios_menu';
                    break;
                  case 'request_contact':
                    responseKey = 'contacto';
                    break;
                  case 'request_examples':
                    responseKey = 'ejemplos';
                    break;
                  case 'frustration':
                    responseKey = 'human_escalation';
                    break;
                  case 'request_service_info':
                    responseKey = 'servicios_menu';
                    break;
                  case 'greet':
                    responseKey = 'saludo';
                    break;
                  case 'request_online_presence_info':
                    responseKey = 'presencia_internet';
                    break;
                  case 'request_cybersecurity_info':
                    responseKey = 'ciberseguridad';
                    break;
                  case 'request_creator_info':
                    responseKey = 'creator_info';
                    break;
                  case 'request_hours':
                    responseKey = 'request_hours';
                    break;
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
            response = knowledgeBase[responseKey];
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
              let defaultMessage = "No he entendido muy bien. ";
              if (conversationState.currentTopic) {
                defaultMessage += `¿Tu pregunta está relacionada con ${conversationState.currentTopic}? `;
              }
              defaultMessage += "Puedes intentar con otras palabras o elegir una de las opciones principales.";
              response = {
                message: defaultMessage,
                options: [{
                    text: "Nuestros Servicios",
                    key: "servicios_menu"
                  },
                  {
                    text: "Preguntas Frecuentes",
                    key: "faq_menu"
                  },
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
        }, 800);
      };
      const scrollToBottom = () => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      };
      chatbotToggle.addEventListener('click', toggleChatbot);
      inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = inputField.value.trim();
        if (userInput) {
          handleInput(userInput);
        }
      });
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
              handleInput(`He seleccionado: ${text}`);
            } else if (key === 'go_to_precios') {
                const preciosSection = document.getElementById('precios');
                if (preciosSection) {
                    preciosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                toggleChatbot();
            } else if (key === 'go_to_pagos_seguros') {
              const pagosSection = document.getElementById('pagos-seguros');
              if (pagosSection) {
                pagosSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
              toggleChatbot(); // Close the chatbot window
            } else if (key === 'go_to_inicio') {
              const inicioSection = document.getElementById('inicio');
              if (inicioSection) {
                inicioSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
              toggleChatbot();
            } else if (key) {
              const response = knowledgeBase[key];
              if (response) showBotMessage(response, key);
            } else if (budget) {
              conversationState.budgetRange = text;
              let tailoredResponse = `¡Entendido! Con un presupuesto de ${text}, podemos explorar varias opciones. Para darte los detalles exactos, lo mejor es que hables con un experto. ¿Quieres que te dirija a WhatsApp para una cotización formal?`;
              showBotMessage({
                message: tailoredResponse,
                options: [{
                  text: "Sí, llevar a WhatsApp",
                  url: "https://wa.me/5620042412"
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
    });
    // --- Payment Section Logic ---
    function showPaymentInstructions() {
      const modal = document.getElementById('payment-modal');
      if (modal) {
        modal.style.display = 'block';
      }
    }
    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.getElementById('payment-modal');
      if (!modal) return;
      const closeBtn = modal.querySelector('.close-button');
      if (closeBtn) {
        closeBtn.onclick = function() {
          modal.style.display = "none";
        }
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    });

    function copyAccountNumber() {
      const accountNumberEl = document.getElementById('accountNumber');
      if (!accountNumberEl) return;
      const accountNumber = accountNumberEl.innerText;
      navigator.clipboard.writeText(accountNumber).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        if (!copyBtn) return;
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = '¡Copiado!';
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.innerHTML = originalContent;
          copyBtn.disabled = false;
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar el número de cuenta:', err);
        alert('Error al copiar. Por favor, hazlo manualmente.');
      });
    }

    function toggleTransferDetails() {
      const transferCard = document.getElementById('transfer-card');
      const transferDetails = document.getElementById('bank-details');
      const transferButton = document.getElementById('transfer-btn');
      if (transferDetails && transferCard) {
        const isVisible = transferDetails.style.maxHeight;
        transferCard.classList.toggle('active');
        if (isVisible) {
          transferDetails.style.maxHeight = null;
          transferButton.textContent = 'Mostrar Detalles';
        } else {
          transferDetails.style.maxHeight = transferDetails.scrollHeight + "px";
          transferButton.textContent = 'Ocultar Detalles';
        }
      }
    }


    document.addEventListener('DOMContentLoaded', () => {
      const modal = document.getElementById('welcome-modal');
      const greetingEl = document.getElementById('welcome-greeting');
      const iconEl = document.getElementById('welcome-icon');
      if (modal && greetingEl && iconEl) {
        const hour = new Date().getHours();
        let greeting = 'Bienvenido a la Innovación';
        if (hour < 12) {
          greeting = 'Buenos Días';
        } else if (hour < 19) {
          greeting = 'Buenas Tardes';
        } else {
          greeting = 'Buenas Noches';
        }
        greetingEl.textContent = greeting;

        iconEl.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="welcome-svg-icon"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M11 9h4a2 2 0 0 0 2-2V3" /><circle cx="9" cy="9" r="2" /><path d="M7 21v-4a2 2 0 0 1 2-2h4" /><circle cx="15" cy="15" r="2" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="welcome-svg-icon"><path d="M12 20v2" /><path d="M12 2v2" /><path d="M17 20v2" /><path d="M17 2v2" /><path d="M2 12h2" /><path d="M2 17h2" /><path d="M2 7h2" /><path d="M20 12h2" /><path d="M20 17h2" /><path d="M20 7h2" /><path d="M7 20v2" /><path d="M7 2v2" /><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="8" y="8" width="8" height="8" rx="1" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="welcome-svg-icon"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M9 13a4.5 4.5 0 0 0 3-4" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M12 13h4" /><path d="M12 18h6a2 2 0 0 1 2 2v1" /><path d="M12 8h8" /><path d="M16 8V5a2 2 0 0 1 2-2" /><circle cx="16" cy="13" r=".5" /><circle cx="18" cy="3" r=".5" /><circle cx="20" cy="21" r=".5" /><circle cx="20" cy="8" r=".5" /></svg>
        `;

        modal.style.display = 'flex';
        setTimeout(() => {
          modal.style.animation = 'fadeOut 0.5s ease-out forwards';
          setTimeout(() => {
            modal.style.display = 'none';
          }, 500);
        }, 4000);
      }
      const emailLink = document.getElementById('email-link');
      if (emailLink) {
        const originalText = emailLink.textContent;
        emailLink.addEventListener('click', (event) => {
          // We only want to override the default mailto: behavior on non-touch devices (likely PCs)
          if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
            event.preventDefault();
            const email = emailLink.dataset.email;
            navigator.clipboard.writeText(email).then(() => {
              emailLink.textContent = '¡Email Copiado!';
              setTimeout(() => {
                emailLink.textContent = originalText;
              }, 2000);
            }).catch(err => {
              console.error('Error al copiar el email: ', err);
              // If it fails, let the mailto link proceed as a fallback
              window.location.href = `mailto:${email}`;
            });
          }
        });
      }
    });
