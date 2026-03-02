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

  // Nivel 2: Contenido Detallado (copiado del original y vinculado)
  // Servicios
  servicio_web: {
    message: "Creamos páginas web profesionales con diseños modernos, SEO optimizado e integración de APIs. ¡Perfectas para convertir visitantes en clientes!",
    options: [{
      text: "Ver más",
      url: "https://ejemplosdepaginasweb.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }
],
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
    }
],
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
    }
],
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
    }
],
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
    }
],
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
    }
],
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
    }
]
  },
  affiliate_info: {
    message: "¡Genial! Nuestro programa de 'Afiliados' es una oportunidad increíble para colaborar. Gana comisiones mientras ayudas a otros a crecer con nuestras soluciones tecnológicas. ¿Te gustaría saber más?",
    options: [{
      text: "Sí, quiero ser afiliado",
      url: "https://afiliadosaz.netlify.app/"
    }, {
      text: "Volver a servicios",
      key: "servicios_menu"
    }
]
  },


  // Precios
  precio_web_one_page: {
    message: "Una <strong>Página Web One Page Profesional</strong> tiene un costo de 💰 $2,000 a $3,000 MXN. Es ideal para emprendedores y marcas que buscan una presencia digital moderna y efectiva. Incluye diseño responsivo, secciones estratégicas, integración con redes sociales y formulario de contacto.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precio_web_empresarial: {
    message: "Una <strong>Página Web Empresarial Premium</strong> cuesta entre 💰 $2,500 y $3,500 MXN. Es un sitio corporativo profesional enfocado en posicionamiento y ventas, con múltiples secciones, SEO básico y copywriting persuasivo.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precio_tienda: {
    message: "Una <strong>Tienda Online Básica</strong> tiene un precio de 💰 $2,500 a $3,000 MXN. Es la solución perfecta para empezar a vender en línea, con catálogo de productos, carrito de compras, integración de pagos y WhatsApp.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precio_pwa: {
    message: "Una <strong>App Web Android (PWA)</strong> tiene un costo de 💰 $2,800 a $3,700 MXN. Es una app instalable que ofrece acceso directo desde el celular, con carga rápida y funcionamiento sin conexión.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precio_chatbot_basico: {
    message: "Un <strong>Chatbot Web Básico</strong> cuesta entre 💰 $500 y $800 MXN. Es ideal para automatizar respuestas a preguntas frecuentes con un flujo de conversación predefinido.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precio_chatbot_avanzado: {
    message: "Un <strong>Chatbot Avanzado</strong> tiene un precio de 💰 $800 a $1,200 MXN. Incluye menús interactivos, múltiples flujos de conversación e integración con WhatsApp o correo electrónico.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precio_seguridad: {
    message: "El servicio de <strong>Seguridad Web Básica</strong> cuesta entre 💰 $2,800 y $3,800 MXN. Incluye un diagnóstico de seguridad, un reporte de vulnerabilidades y la implementación de configuraciones esenciales para proteger tu sitio.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precio_hosting: {
    message: "Nuestro servicio de <strong>Hosting y Mantenimiento</strong> tiene un costo de 💰 $1,200 a $2,000 MXN. Asegura que tu sitio esté siempre en línea, optimizado, seguro y con respaldos periódicos.",
    options: [{
      text: "Ver otros precios",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },
  precios_paquetes: {
    message: "¡Claro! Aquí tienes nuestros paquetes recomendados:<br><br><strong>📦 Web + Chatbot Básico:</strong> $3,000 - $3,800 MXN<br><strong>📦 Web + App + Chatbot:</strong> $5,300 - $7,500 MXN<br><br>Todos nuestros planes incluyen hosting y dominio gratis. ✅",
    options: [{
      text: "Ver precios individuales",
      key: "precios_menu"
    }, {
      text: "🏠 Volver al inicio",
      key: "saludo"
    }
]
  },


  // FAQ Menus
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
    }
]
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
    }
]
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
    }
]
  },

  // FAQ Respuestas
  faq_proceso_inicio: {
    message: "¡Súper fácil! 1) Nos cuentas tu idea, 2) Te damos presupuesto, 3) Firmamos contrato, 4) ¡Empezamos a crear!",
    options: [{
      text: "Volver al menú de Proceso",
      key: "faq_proceso_menu"
    }
]
  },
  faq_proceso_requisitos: {
    message: "Solo necesitamos que nos cuentes tu visión, compartas contenido (textos, imágenes) y que tengas comunicación fluida con nosotros.",
    options: [{
      text: "Volver al menú de Proceso",
      key: "faq_proceso_menu"
    }
]
  },
  faq_proceso_progreso: {
    message: "¡Por supuesto! Te enviamos actualizaciones semanales con capturas y avances. Siempre estarás al tanto.",
    options: [{
      text: "Volver al menú de Proceso",
      key: "faq_proceso_menu"
    }
]
  },
  faq_tech_stack: {
    message: "Usamos tecnologías modernas: HTML5, CSS3, JavaScript, React, Node.js, Firebase. Siempre lo más actual y eficiente.",
    options: [{
      text: "Volver al menú de Tecnología",
      key: "faq_tecnologia_menu"
    }
]
  },
  faq_tech_seguridad: {
    message: "¡Totalmente! Implementamos protocolos de seguridad SSL, encriptación y cumplimos con estándares internacionales de protección de datos.",
    options: [{
      text: "Volver al menú de Tecnología",
      key: "faq_tecnologia_menu"
    }
]
  },
  faq_soporte_capacitacion: {
    message: "¡Sí! Incluimos sesión de capacitación para que sepas manejar tu plataforma como un experto.",
    options: [{
      text: "Volver al menú de Soporte",
      key: "faq_soporte_menu"
    }
]
  },
  faq_soporte_incluye: {
    message: "Soporte técnico por 30 días, corrección de bugs, y asesoría para dudas básicas sin costo adicional.",
    options: [{
      text: "Volver al menú de Soporte",
      key: "faq_soporte_menu"
    }
]
  },
  faq_soporte_garantia: {
    message: "¡Por supuesto! 30 días de garantía total contra defectos de funcionamiento y bugs.",
    options: [{
      text: "Volver al menú de Soporte",
      key: "faq_soporte_menu"
    }
]
  },

  // Más Opciones
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
    }
]
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
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }
]
  },
  payment_info: {
    message: "¡Claro! Para realizar tu pago, hemos habilitado una sección segura donde puedes elegir tu método preferido. ¿Te gustaría ir ahora?",
    options: [{
      text: "Sí, llevar a Pagos Seguros",
      key: "go_to_pagos_seguros"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }
]
  },
  certificaciones: {
    message: "Contamos con certificaciones que avalan nuestra seguridad, calidad y excelencia. Son prueba de nuestro compromiso con la innovación y los más altos estándares del sector. ¿Te gustaría verlas?",
    options: [{
      text: "Ver certificaciones",
      url: "https://certificaciones1.netlify.app/"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }
]
  },
  ubicacion: {
    message: "Nos encontramos en Estado de Mexico Huixquilucan. ¡Nos encantaría que nos dejaras un comentario en nuestra ubicación de Google Maps! Tu feedback nos ayuda a mejorar.",
    options: [{
      text: "Dejar un comentario",
      url: "https://maps.app.goo.gl/VrvD1Z7wKA4YrFU1A"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }
]
  },
  suscribete: {
    message: "¡Qué bueno que te interesa! Suscríbete para no perderte ninguna de nuestras innovaciones, ofertas especiales y contenido exclusivo. ¡Es la mejor forma de estar al día con el futuro de la tecnología!",
    options: [{
      text: "¡Claro, me suscribo!",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSci7AEJ6vcJBIUrjxHMPNdcmrT1g4GcYx0DzMTd5CrM4nwo1A/viewform?usp=header"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }
]
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
      text: "Email",
      url: "mailto:soporteseguro98@gmail.com"
    }, {
      text: "Volver a más opciones",
      key: "mas_opciones_menu"
    }
],
  },


  // Entradas directas (sin menú) y de sistema
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
    }
]
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
    }
],
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
    }
],
    nextContext: 'whatsapp_redirect'
  },
}
;

  const getProactiveSuggestion = () => {
    const {
      currentTopic,
      mentionedServices,
      history,
      suggestedQuote,
      suggestedWebAppAndEcomm,
      suggestedPortfolio
    }
 = conversationState;
    if (!suggestedWebAppAndEcomm && mentionedServices.includes('Páginas Web') && mentionedServices.includes('Tiendas Online')) {
      conversationState.suggestedWebAppAndEcomm = true;
      return "Veo que te interesan tanto las páginas web como las tiendas online. ¿Sabías que nuestras tiendas online son sitios web completos con todo lo que necesitas para vender?";
    }

    const askedAboutPrice = history.some(input => intents.request_quote.some(kw => input.includes(kw)));
    if (!suggestedQuote && currentTopic && askedAboutPrice) {
      conversationState.suggestedQuote = true;
      return `Si quieres, podemos hacer una cotización más detallada para tu proyecto de ${currentTopic}sin ningún compromiso. Solo di "cotizar".`;
    }

    if (currentTopic && history.filter(i => i.toLowerCase().includes(currentTopic.toLowerCase().split(' ')[0])).length > 1) {
      if (!suggestedPortfolio) {
        conversationState.suggestedPortfolio = true;
        return `Parece que te interesa mucho ${currentTopic}
. ¿Te gustaría ver algunos ejemplos de nuestros trabajos en esa área?`;
      }

    }

    return null;
  }
;

  const toggleChatbot = () => {
    const isActive = chatbotWindow.classList.toggle('active');
    iconOpen.style.display = isActive ? 'none' : 'block';
    iconClose.style.display = isActive ? 'block' : 'none';
    if (isActive && messagesContainer.children.length === 0) {
      showBotMessage(knowledgeBase.saludo, 'saludo');
    }

  }
;

  const showBotMessage = (response, key = null) => {
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('chat-message', 'bot-message');
    let message = response.message;

    if (key) {
        if (key === 'saludo') {
            conversationState.path = [];
        }
 else {
            const keyIndex = conversationState.path.indexOf(key);
            if (keyIndex !== -1) {
                // If key exists, we are going back up the tree
                conversationState.path = conversationState.path.slice(0, keyIndex + 1);
            }
 else {
                conversationState.path.push(key);
            }

        }

    }


    // Follow-up question for leaf nodes
    if (key && key !== 'saludo' && !response.options && !message.includes('?')) {
      let followUp = "¿Hay algo más en lo que pueda ayudarte?";
      if (conversationState.currentTopic) {
        followUp = `¿Tienes alguna otra pregunta sobre ${conversationState.currentTopic}, o te gustaría explorar otro servicio?`;
