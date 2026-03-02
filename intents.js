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
  }
;

const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotWindow = document.getElementById('chatbot-window');
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
        icon.innerHTML = '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>';
      }
 else {
        icon.innerHTML = '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>';
      }

    });
  }


  const openChatbot = () => {
    chatbotWindow.classList.add('active');
    if (messagesContainer.children.length === 0) {
      showBotMessage(knowledgeBase.saludo, 'saludo');
    }

  }
;

  const closeChatbot = () => {
    chatbotWindow.classList.remove('active');
  }
;

  chatbotToggle.addEventListener('click', openChatbot);
  chatbotCloseBtn.addEventListener('click', closeChatbot);
