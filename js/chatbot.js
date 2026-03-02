document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const messagesContainer = document.getElementById('chatbot-messages');
  const inputForm = document.getElementById('chatbot-input-form');
  const inputField = document.getElementById('chatbot-input');

  const conversationState = {
    currentTopic: null,
    history: [],
    path: [],
    mentionedServices: [],
    suggestedQuote: false,
    suggestedPortfolio: false,
    suggestedWebAppAndEcomm: false,
    budgetRange: null
  };

  const intents = {
    greeting: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'hey'],
    services: ['servicios', 'que hacen', 'que ofreces', 'que haces', 'portafolio', 'ejemplos', 'trabajos'],
    pricing: ['precios', 'cuanto cuesta', 'costos', 'cotizacion', 'valor', 'presupuesto', 'precio', 'planes'],
    faq: ['preguntas', 'dudas', 'como funciona', 'informacion', 'faq'],
    contact: ['contacto', 'redes sociales', 'donde estan', 'telefono', 'whatsapp', 'email', 'correo', 'ubicacion'],
    creator: ['quien te creo', 'quien te hizo', 'quien es tu dueño', 'creador', 'desarrollador'],
    hours: ['horario', 'a que hora', 'cuando abren', 'atencion'],
    payments: ['pago', 'pagar', 'metodos de pago', 'transferencia', 'deposito', 'efectivo'],
    certifications: ['certificaciones', 'certificados', 'garantia', 'seguridad', 'calidad'],
    request_quote: ['cotizar', 'quiero una cotizacion', 'presupuesto para mi proyecto', 'cuanto me cobras']
  };

  const knowledgeBase = {
    // Nivel 0: Saludo inicial optimizado
    saludo: {
      message: "¡Qué padre que estás aquí! 👋 Soy AZ, tu asistente virtual de Az InnovationX. Estoy listo para ayudarte a llevar tu idea al siguiente nivel. ¿Qué te gustaría hacer?",
      options: [{
          text: "🚀 Explorar Servicios",
          key: "servicios_menu"
        },
        {
          text: "💰 Cotizar un Proyecto",
          key: "precios_menu"
        },
        {
          text: "🤔 Preguntas Frecuentes",
          key: "faq_menu"
        },
        {
          text: "✨ Más Opciones",
          key: "mas_opciones_menu"
        }
      ]
    },

    // Nivel 1: Menús principales
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
          text: "📈 Importancia de la Presencia en Internet",
          key: "presencia_internet"
        },
        {
          text: "🔒 Tips de Ciberseguridad",
          key: "ciberseguridad"
        },
        {
          text: "💳 Métodos de Pago",
          key: "payment_info"
        },
        {
          text: "🎓 Nuestras Certificaciones",
          key: "certificaciones"
        },
        {
          text: "📍 Nuestra Ubicación",
          key: "ubicacion"
        },
        {
          text: "✉️ Suscríbete al Newsletter",
          key: "suscribete"
        },
        {
          text: "📱 Contacto y Redes Sociales",
          key: "contacto"
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
      message: "Artículos AZINNX es una tienda de artículos tecnológicos diseñados por Az InnovationX. Moda y accesorios con estilo tech: sudaderas, termos, gorras, llaveros, mochilas y más.",
      options: [{
        text: "Sí, llévame a los artículos",
        url: "https://articulos-azinnx.vercel.app/"
      }, {
        text: "Volver a servicios",
        key: "servicios_menu"
      }]
    },
    affiliate_info: {
      message: "¡Genial! Nuestro programa de 'Afiliados' es una oportunidad increíble para colaborar. Gana comisiones mientras ayudas a otros a crecer.",
      options: [{
        text: "Sí, quiero ser afiliado",
        url: "https://afiliadosaz.netlify.app/"
      }, {
        text: "Volver a servicios",
        key: "servicios_menu"
      }]
    },

    precio_web_one_page: {
      message: "Una <strong>Página Web One Page</strong> cuesta entre $2,000 y $3,000 MXN. Incluye diseño responsivo, hosting y dominio por un año.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precio_web_empresarial: {
      message: "Una <strong>Página Web Empresarial Premium</strong> cuesta entre $2,500 y $3,500 MXN. Enfocada en posicionamiento y ventas.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precio_tienda: {
      message: "Una <strong>Tienda Online Básica</strong> cuesta entre $2,500 y $3,000 MXN. Perfecta para empezar a vender en línea.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precio_pwa: {
      message: "Una <strong>App Web Android (PWA)</strong> cuesta entre $2,800 y $3,700 MXN. App instalable con acceso directo.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precio_chatbot_basico: {
      message: "Un <strong>Chatbot Web Básico</strong> cuesta entre $500 y $800 MXN. Ideal para preguntas frecuentes.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precio_chatbot_avanzado: {
      message: "Un <strong>Chatbot Avanzado</strong> cuesta entre $800 y $1,200 MXN. Incluye menús interactivos y flujos complejos.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precio_seguridad: {
      message: "La <strong>Seguridad Web Básica</strong> cuesta entre $2,800 y $3,800 MXN. Diagnóstico e implementación de protocolos.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precio_hosting: {
      message: "Nuestro <strong>Hosting y Mantenimiento</strong> cuesta entre $1,200 y $2,000 MXN anuales.",
      options: [{
        text: "Ver otros precios",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },
    precios_paquetes: {
      message: "<strong>📦 Web + Chatbot:</strong> $3,000 - $3,800 MXN<br><strong>📦 Web + App + Chatbot:</strong> $5,300 - $7,500 MXN",
      options: [{
        text: "Ver individuales",
        key: "precios_menu"
      }, {
        text: "🏠 Inicio",
        key: "saludo"
      }]
    },

    faq_proceso_inicio: {
      message: "1) Cuéntanos tu idea, 2) Presupuesto, 3) Contrato, 4) Desarrollo.",
      options: [{ text: "Volver", key: "faq_proceso_menu" }]
    },
    faq_tech_stack: {
      message: "Usamos HTML5, CSS3, JS, React, Node.js y Firebase.",
      options: [{ text: "Volver", key: "faq_tecnologia_menu" }]
    },
    faq_soporte_incluye: {
      message: "30 días de soporte técnico, corrección de bugs y capacitación básica.",
      options: [{ text: "Volver", key: "faq_soporte_menu" }]
    },

    presencia_internet: {
      message: "Estar en internet te da credibilidad y abre canales de venta 24/7.",
      options: [{ text: "Ver Video", key: "go_to_inicio" }, { text: "Volver", key: "mas_opciones_menu" }]
    },
    ciberseguridad: {
      message: "Protege tus datos y la confianza de tus clientes.",
      options: [{ text: "Dame consejos", key: "consejos_ciberseguridad" }, { text: "Volver", key: "mas_opciones_menu" }]
    },
    consejos_ciberseguridad: {
      message: "1. Contraseñas fuertes. 2. 2FA. 3. Software actualizado.",
      options: [{ text: "Ver servicios", key: "servicio_seguridad" }, { text: "Volver", key: "mas_opciones_menu" }]
    },
    payment_info: {
      message: "Puedes realizar tu pago de forma segura en nuestra sección dedicada.",
      options: [{ text: "Ir a Pagar", key: "go_to_pagos_seguros" }, { text: "Volver", key: "mas_opciones_menu" }]
    },
    certificaciones: {
      message: "Nuestras certificaciones avalan nuestra calidad y excelencia.",
      options: [{ text: "Ver", url: "https://certificaciones1.netlify.app/" }, { text: "Volver", key: "mas_opciones_menu" }]
    },
    ubicacion: {
      message: "Estamos en Huixquilucan, Edomex. ¡Visítanos en Maps!",
      options: [{ text: "Maps", url: "https://maps.app.goo.gl/VrvD1Z7wKA4YrFU1A" }, { text: "Volver", key: "mas_opciones_menu" }]
    },
    suscribete: {
      message: "¡Suscríbete para recibir ofertas y noticias exclusivas!",
      options: [{ text: "Suscribirme", url: "https://docs.google.com/forms/d/e/1FAIpQLSci7AEJ6vcJBIUrjxHMPNdcmrT1g4GcYx0DzMTd5CrM4nwo1A/viewform?usp=header" }, { text: "Volver", key: "mas_opciones_menu" }]
    },
    contacto: {
      message: "Contáctanos vía WhatsApp (+52 56 5391 5739) o redes sociales.",
      options: [
        { text: "WhatsApp", url: "https://wa.me/5653915739" },
        { text: "Facebook", url: "https://www.facebook.com/AzInnovationX?mibextid=ZbWKwL" },
        { text: "Instagram", url: "https://www.instagram.com/azinnovationx?igsh=MWN6Y2I1OWZycHVkOA==" },
        { text: "Volver", key: "mas_opciones_menu" }
      ]
    },

    creator_info: {
      message: "Fui desarrollado por Evaristo San Juan Azuara en Az InnovationX."
    },
    request_hours: {
      message: "Lun-Sáb: 09:00–22:00, Dom: 09:00–14:00 (México)."
    },
    presupuesto: {
      message: "¿Cuál es tu presupuesto aproximado para este proyecto?",
      options: [
        { text: "< $2,000", budget: "0-2000" },
        { text: "$2k - $4k", budget: "2000-4000" },
        { text: "$4k - $6k", budget: "4000-6000" },
        { text: "> $6,000", budget: "6000+" }
      ]
    },
    human_escalation: {
      message: "¿Te gustaría hablar directamente con un experto por WhatsApp?",
      options: [{ text: "Sí", url: "https://wa.me/5653915739" }, { text: "No", key: "saludo" }]
    }
  };

  const showBotMessage = (response, key = null) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', 'bot-message');
    msgDiv.innerHTML = `<div class="message-content">${response.message}</div>`;

    if (response.options) {
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('chat-options');
      response.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-button');
        btn.textContent = opt.text;
        if (opt.key) btn.dataset.key = opt.key;
        if (opt.url) btn.dataset.url = opt.url;
        if (opt.budget) btn.dataset.budget = opt.budget;
        optionsDiv.appendChild(btn);
      });
      msgDiv.appendChild(optionsDiv);
    }

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const showUserMessage = (text) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', 'user-message');
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const handleInput = (input) => {
    const text = input.toLowerCase();
    showUserMessage(input);
    inputField.value = '';

    setTimeout(() => {
      let found = false;
      for (const [key, keywords] of Object.entries(intents)) {
        if (keywords.some(kw => text.includes(kw))) {
          const resp = key === 'greeting' ? knowledgeBase.saludo :
                       key === 'services' ? knowledgeBase.servicios_menu :
                       key === 'pricing' ? knowledgeBase.precios_menu :
                       key === 'faq' ? knowledgeBase.faq_menu :
                       key === 'contact' ? knowledgeBase.contacto :
                       key === 'creator' ? knowledgeBase.creator_info :
                       key === 'hours' ? knowledgeBase.request_hours :
                       key === 'payments' ? knowledgeBase.payment_info :
                       key === 'certifications' ? knowledgeBase.certificaciones :
                       key === 'request_quote' ? knowledgeBase.presupuesto : null;

          if (resp) {
            showBotMessage(resp);
            found = true;
            break;
          }
        }
      }

      if (!found) {
        showBotMessage({
          message: "No estoy seguro de entender eso, pero puedo ayudarte con lo siguiente:",
          options: knowledgeBase.saludo.options
        });
      }
    }, 600);
  };

  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active') && messagesContainer.children.length === 0) {
      showBotMessage(knowledgeBase.saludo, 'saludo');
    }
  });

  chatbotCloseBtn.addEventListener('click', () => chatbotWindow.classList.remove('active'));

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputField.value.trim()) handleInput(inputField.value.trim());
  });

  messagesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('option-button')) {
      const btn = e.target;
      if (btn.dataset.url) {
        window.open(btn.dataset.url, '_blank');
      } else if (btn.dataset.key) {
        const key = btn.dataset.key;
        if (key.startsWith('go_to_')) {
          const id = key.replace('go_to_', '');
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            chatbotWindow.classList.remove('active');
          }
        } else {
          showUserMessage(btn.textContent);
          setTimeout(() => showBotMessage(knowledgeBase[key], key), 400);
        }
      } else if (btn.dataset.budget) {
        showUserMessage(btn.textContent);
        setTimeout(() => showBotMessage(knowledgeBase.human_escalation), 400);
      }
    }
  });
});
