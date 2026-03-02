/**
 * Enhanced Az Asistente Virtual Logic
 * Merges original sophisticated intent system with new requested features.
 */

document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotWindow = document.getElementById('chatbot-window');
  const messagesContainer = document.getElementById('chatbot-messages');
  const inputForm = document.getElementById('chatbot-input-form');
  const inputField = document.getElementById('chatbot-input');
  const expandToggle = document.getElementById('chatbot-expand-toggle');

  if (!chatbotWindow) return;

  // --- UI Elements ---
  const badge = document.createElement('span');
  badge.id = 'chatbot-unread-badge';
  badge.className = 'unread-badge';
  badge.style.display = 'none';
  if (chatbotToggle) chatbotToggle.appendChild(badge);

  // --- State & Logic ---
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
    unreadCount: 0,
    interactionDone: false
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
    request_articles: ['artículos', 'blog', 'posts', 'contenido', 'educativo'],
    request_affiliates: ['afiliados', 'afíliate', 'colaboraciones', 'partnerships', 'programa de afiliados'],
  };

  const knowledgeBase = {
    saludo: {
      message: "👋 ¡Hola! Soy el asistente virtual de Az InnovationX. ¿Cómo puedo ayudarte hoy?",
      options: [
        { text: "🎯 Información de Servicios", key: "servicios_menu" },
        { text: "💰 Ver Planes y Precios", key: "precios_menu" },
        { text: "🤝 Programa de Afiliados", key: "affiliate_info" },
        { text: "🛒 Artículos Az InnovationX", key: "articles_info" },
        { text: "📞 Contacto Directo", key: "contacto_menu" }
      ]
    },
    servicios_menu: {
      message: "Ofrecemos soluciones integrales para tu negocio. ¿Cuál te interesa?",
      options: [
        { text: "🌐 Páginas Web", key: "servicio_web" },
        { text: "📱 Apps Móviles", key: "servicio_app" },
        { text: "🤖 Chatbots", key: "servicio_chatbot" },
        { text: "🔒 Ciberseguridad", key: "servicio_seguridad" },
        { text: "☁️ Soluciones Cloud", key: "servicio_cloud" }
      ]
    },
    precios_menu: {
      message: "Nuestros planes están diseñados para escalar con tu negocio. ¿Qué buscas?",
      options: [
        { text: "🌐 Precios Web", key: "precio_web_info" },
        { text: "📱 Precios Apps", key: "precio_app_info" },
        { text: "🤖 Precios Chatbots", key: "precio_chatbot_info" },
        { text: "💼 Ver todos los paquetes", url: "https://precios1.netlify.app/" }
      ]
    },
    // Nuevas entradas TAREA 3.2
    bienvenida_proactiva: {
      message: "👋 ¡Hola! Noto que llevas un momento explorando nuestra página. ¿Puedo ayudarte a encontrar lo que buscas?",
      options: [
        { text: "🎯 Sí, necesito ayuda", key: "faq_menu" },
        { text: "🔍 Solo explorando, gracias", key: "saludo" }
      ]
    },
    calificacion_lead: {
      message: "¡Perfecto! Para ayudarte mejor, ¿cuál describe mejor tu situación?",
      options: [
        { text: "🏢 Tengo un negocio establecido", key: "precios_menu" },
        { text: "🌱 Soy emprendedor/startup", key: "precio_web_one_page" },
        { text: "🤔 Tengo una idea pero no sé por dónde empezar", key: "faq_proceso_inicio" },
        { text: "📊 Quiero mejorar mi presencia digital actual", key: "presencia_internet" }
      ]
    },
    urgencia: {
      message: "⚡ ¡Entendido! Tenemos disponibilidad inmediata. ¿Cuándo te gustaría empezar tu proyecto?",
      options: [
        { text: "🔥 Lo antes posible (esta semana)", url: "https://wa.me/5653915739?text=Quiero+empezar+mi+proyecto+esta+semana" },
        { text: "📅 En el próximo mes", key: "precios_menu" },
        { text: "🗓️ Estoy evaluando opciones", key: "faq_menu" }
      ]
    },
    servicio_web: {
      message: "Diseñamos páginas web profesionales, rápidas y optimizadas para SEO. Convertimos tu sitio en una herramienta de ventas.",
      options: [{ text: "Ver ejemplos", url: "https://ejemplosdepaginasweb.netlify.app/" }, { text: "Ver precios web", key: "precio_web_info" }],
      nextContext: 'Páginas Web'
    },
    servicio_app: {
      message: "Desarrollamos aplicaciones móviles nativas y multiplataforma (Android/iOS) con excelente experiencia de usuario.",
      options: [{ text: "Saber más", url: "https://paginawebaplicaciones.netlify.app/" }, { text: "Ver precios apps", key: "precio_app_info" }],
      nextContext: 'Aplicaciones Móviles'
    },
    servicio_chatbot: {
      message: "Automatiza tu atención al cliente con IA. Nuestros chatbots trabajan 24/7 en tu web o redes sociales.",
      options: [{ text: "Ver ejemplos", url: "https://chatbotsaz.netlify.app/" }, { text: "Ver precios chatbots", key: "precio_chatbot_info" }],
      nextContext: 'Chatbots'
    },
    servicio_seguridad: {
      message: "Protegemos tus activos digitales con auditorías, certificados SSL y protocolos de defensa avanzados.",
      options: [{ text: "Saber más", url: "https://paginawebseguridadinformatica.netlify.app/" }, { text: "🏠 Volver", key: "saludo" }],
      nextContext: 'Seguridad Informática'
    },
    servicio_cloud: {
      message: "Lleva tu empresa a la nube. Escalabilidad, seguridad y acceso desde cualquier lugar del mundo.",
      options: [{ text: "Saber más", url: "https://paginawebsolucionescloud.netlify.app/" }, { text: "🏠 Volver", key: "saludo" }],
      nextContext: 'Soluciones Cloud'
    },
    precio_web_info: {
      message: "Nuestras páginas web profesionales inician desde 💰 $2,000 MXN (Plan One Page). ¿Te gustaría ver el detalle?",
      options: [{ text: "Sí, ver paquetes", url: "https://precios1.netlify.app/" }, { text: "Preguntar a un experto", key: "human_escalation" }]
    },
    precio_app_info: {
      message: "El desarrollo de aplicaciones móviles se cotiza según funcionalidades. Apps básicas desde 💰 $6,000 MXN.",
      options: [{ text: "Ver paquetes", url: "https://precios1.netlify.app/" }, { text: "Cotizar proyecto", key: "human_escalation" }]
    },
    precio_chatbot_info: {
      message: "Implementamos asistentes virtuales desde 💰 $1,500 MXN (Configuración inicial + entrenamiento).",
      options: [{ text: "Ver paquetes", url: "https://precios1.netlify.app/" }, { text: "Hablar con soporte", key: "human_escalation" }]
    },
    contacto_menu: {
      message: "Estamos listos para escucharte. ¿Cómo prefieres contactarnos?",
      options: [
        { text: "🟢 WhatsApp", url: "https://wa.me/5653915739" },
        { text: "📞 Llamada Directa", url: "tel:+525653915739" },
        { text: "📧 Correo Electrónico", url: "mailto:soporteseguro98@gmail.com" }
      ]
    },
    faq_menu: {
      message: "Aquí tienes algunas respuestas rápidas:",
      options: [
        { text: "⏱️ ¿Cuánto tardan?", key: "faq_tiempos" },
        { text: "🛡️ ¿Hay garantía?", key: "faq_garantia" },
        { text: "🚀 ¿Cómo empezamos?", key: "faq_proceso_inicio" }
      ]
    },
    faq_tiempos: {
      message: "Una web One Page está lista en 5-7 días. Apps y sistemas complejos pueden tomar de 3 a 8 semanas.",
      options: [{ text: "🏠 Menú principal", key: "saludo" }]
    },
    faq_garantia: {
      message: "Todos nuestros desarrollos incluyen 3 meses de soporte técnico gratuito por errores o fallos.",
      options: [{ text: "Saber más", key: "saludo" }]
    },
    articles_info: {
      message: "Artículos AZINNX es una tienda de artículos tecnológicos diseñados por Az InnovationX. Moda y accesorios con estilo tech.",
      options: [{ text: "Ver artículos", url: "https://articulos-azinnx.vercel.app/" }, { text: "Volver", key: "saludo" }]
    },
    affiliate_info: {
      message: "Nuestro programa de Afiliados te permite ganar comisiones por recomendarnos. ¡Crece con nosotros!",
      options: [{ text: "Ser afiliado", url: "https://afiliadosaz.netlify.app/" }, { text: "Volver", key: "saludo" }]
    },
    precio_web_one_page: {
      message: "Una Página Web One Page Profesional tiene un costo de 💰 $2,000 a $3,000 MXN.",
      options: [{ text: "Ver otros precios", key: "precios_menu" }, { text: "🏠 Volver", key: "saludo" }]
    },
    faq_proceso_inicio: {
      message: "¡Súper fácil! 1) Nos cuentas tu idea, 2) Te damos presupuesto, 3) Firmamos contrato, 4) ¡Empezamos a crear!",
      options: [{ text: "Volver al inicio", key: "saludo" }]
    },
    presencia_internet: {
      message: "Tener presencia online permite llegar a más clientes, construir credibilidad y abrir canales de venta 24/7.",
      options: [{ text: "Saber más", key: "servicio_web" }, { text: "🏠 Volver", key: "saludo" }]
    },
    payment_info: {
      message: "Aceptamos transferencias SPEI, depósitos y PayPal. Contamos con una sección de pago segura.",
      options: [{ text: "Ver métodos", url: "https://pagosseguros.netlify.app/" }, { text: "Volver", key: "saludo" }]
    },
    creator_info: { message: "Fui creado por Az InnovationX, desarrollado por Evaristo San Juan Azuara." },
    human_escalation: {
      message: "Entiendo. Para una atención personalizada, te recomiendo hablar directamente vía WhatsApp.",
      options: [{ text: "Sí, ir a WhatsApp", url: "https://wa.me/5653915739" }, { text: "No, gracias", key: "saludo" }]
    }
  };

  // --- Functions ---

  const updateUnread = (count) => {
    conversationState.unreadCount = count;
    if (badge) {
      if (count > 0 && !chatbotWindow.classList.contains('active')) {
        badge.textContent = count;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
        conversationState.unreadCount = 0;
      }
    }
  };

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const getProactiveSuggestion = () => {
    const { currentTopic, mentionedServices, history, suggestedQuote, suggestedWebAppAndEcomm, suggestedPortfolio } = conversationState;
    if (!suggestedWebAppAndEcomm && mentionedServices.includes('Páginas Web') && mentionedServices.includes('Tiendas Online')) {
      conversationState.suggestedWebAppAndEcomm = true;
      return "Veo que te interesan tanto las páginas web como las tiendas online. ¿Sabías que nuestras tiendas online son sitios web completos con todo lo que necesitas para vender?";
    }
    const askedAboutPrice = history.some(input => intents.request_quote.some(kw => input.includes(kw)));
    if (!suggestedQuote && currentTopic && askedAboutPrice) {
      conversationState.suggestedQuote = true;
      return `Si quieres, podemos hacer una cotización más detallada para tu proyecto de ${currentTopic} sin ningún compromiso. Solo di "cotizar".`;
    }
    return null;
  };

  const showBotMessage = (response, key = null) => {
    const typingId = 'bot-typing-' + Date.now();
    const typingEl = document.createElement('div');
    typingEl.id = typingId;
    typingEl.className = 'chat-message bot-message typing-indicator';
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typingEl);
    scrollToBottom();

    setTimeout(() => {
      typingEl.remove();
      const botMessageElement = document.createElement('div');
      botMessageElement.classList.add('chat-message', 'bot-message', 'slide-in-left');

      const avatarMatch = document.querySelector('#chatbot-header .avatar');
      if (avatarMatch) avatarMatch.classList.add('pulsing');
      setTimeout(() => { if (avatarMatch) avatarMatch.classList.remove('pulsing'); }, 2000);

      if (key) {
        if (key === 'saludo') conversationState.path = [];
        else {
          const keyIndex = conversationState.path.indexOf(key);
          if (keyIndex !== -1) conversationState.path = conversationState.path.slice(0, keyIndex + 1);
          else conversationState.path.push(key);
        }
      }

      let message = response.message;
      // Follow-up for leaf nodes (from original)
      if (key && key !== 'saludo' && !response.options && !message.includes('?')) {
        message += `<br><br><em>¿Hay algo más en lo que pueda ayudarte?</em>`;
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
          optionsContainer.appendChild(button);
        });

        // Add "Back" and "Home" if in a path
        if (conversationState.path.length > 0) {
          const backKey = conversationState.path.length > 1 ? conversationState.path[conversationState.path.length - 2] : 'saludo';
          const backBtn = document.createElement('button');
          backBtn.classList.add('option-button');
          backBtn.textContent = '⬅️ Volver';
          backBtn.dataset.key = backKey;
          optionsContainer.appendChild(backBtn);
        }

        botMessageElement.appendChild(optionsContainer);
      }

      const timeEl = document.createElement('span');
      timeEl.className = 'message-time';
      timeEl.textContent = getTimestamp();
      botMessageElement.appendChild(timeEl);

      messagesContainer.appendChild(botMessageElement);
      scrollToBottom();

      if (response.nextContext && !conversationState.mentionedServices.includes(response.nextContext)) {
        conversationState.mentionedServices.push(response.nextContext);
        conversationState.currentTopic = response.nextContext;
      }

      if (!chatbotWindow.classList.contains('active')) {
        updateUnread(conversationState.unreadCount + 1);
      }
    }, 1500);
  };

  const showUserMessage = (message) => {
    conversationState.interactionDone = true;
    conversationState.history.push(message.toLowerCase().trim());
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user-message', 'slide-in-right');
    userMessageElement.textContent = message;

    const timeEl = document.createElement('span');
    timeEl.className = 'message-time';
    timeEl.textContent = getTimestamp();
    userMessageElement.appendChild(timeEl);

    messagesContainer.appendChild(userMessageElement);
    scrollToBottom();
  };

  const handleInput = (input) => {
    showUserMessage(input);
    inputField.value = '';
    inputField.disabled = true;

    setTimeout(() => {
      let responseKey = null;
      const lowerInput = input.toLowerCase().trim();

      // Basic intent matching from original
      for (const intent in intents) {
        if (intents[intent].some(kw => lowerInput.includes(kw))) {
          switch (intent) {
            case 'greet': responseKey = 'saludo'; break;
            case 'request_service_info': responseKey = 'servicios_menu'; break;
            case 'request_quote': responseKey = 'precios_menu'; break;
            case 'request_payment': responseKey = 'payment_info'; break;
            case 'request_contact': responseKey = 'contacto_menu'; break;
            case 'frustration': responseKey = 'human_escalation'; break;
            case 'request_creator_info': responseKey = 'creator_info'; break;
            case 'request_online_presence_info': responseKey = 'presencia_internet'; break;
          }
          if (responseKey) break;
        }
      }

      if (responseKey && knowledgeBase[responseKey]) {
        showBotMessage(knowledgeBase[responseKey], responseKey);
      } else {
        const suggestion = getProactiveSuggestion();
        if (suggestion) {
          showBotMessage({ message: suggestion, options: [{text: "Sí, cuéntame más", key: "servicios_menu"}, {text: "Menú Principal", key: "saludo"}] });
        } else {
          showBotMessage({ message: "Entiendo. ¿En qué más puedo ayudarte?", options: [{text: "Menú Principal", key: "saludo"}] });
        }
      }
      inputField.disabled = false;
      inputField.focus();
    }, 1000);
  };

  const openChatbot = () => {
    chatbotWindow.classList.add('active');
    updateUnread(0);
    if (messagesContainer.children.length === 0) {
      showBotMessage(knowledgeBase.saludo, 'saludo');
    }
  };

  const closeChatbot = () => {
    chatbotWindow.classList.remove('active');
  };

  // --- Listeners ---
  if (chatbotToggle) chatbotToggle.addEventListener('click', openChatbot);
  if (chatbotCloseBtn) chatbotCloseBtn.addEventListener('click', closeChatbot);
  if (expandToggle) {
    expandToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('expanded');
    });
  }

  if (inputForm) {
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = inputField.value.trim();
      if (input) handleInput(input);
    });
  }

  if (messagesContainer) {
    messagesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('option-button')) {
        const key = e.target.dataset.key;
        const url = e.target.dataset.url;
        if (url) {
          window.open(url, '_blank');
        } else if (key && knowledgeBase[key]) {
          showUserMessage(e.target.textContent);
          setTimeout(() => showBotMessage(knowledgeBase[key], key), 500);
        }
      }
    });
  }

  // --- Proactive trigger (Task 3.3) ---
  setTimeout(() => {
    if (!conversationState.interactionDone && !sessionStorage.getItem('proactiveChatShown')) {
      sessionStorage.setItem('proactiveChatShown', 'true');
      openChatbot();
      showBotMessage(knowledgeBase.bienvenida_proactiva, 'bienvenida_proactiva');
    }
  }, 45000);
});
