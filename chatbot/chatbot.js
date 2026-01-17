document.addEventListener('DOMContentLoaded', () => {
        const knowledgeBase = {
    saludo: {
        message: [
            "¡Qué padre que estás aquí! Soy AZ, tu asistente virtual de Az InnovationX. Nuestro eslogan es 'Donde las Ideas Cobran Vida'. Estoy listo para ayudarte a convertir tu idea en una solución digital. ¿En qué te puedo ayudar?",
            "¡Hola! Soy AZ, de Az InnovationX. ¿Listo para darle vida a tu proyecto digital? Nuestra misión es 'Convertimos ideas en soluciones digitales con impacto real, ayudando a emprendedores a resolver desafíos tecnológicos con innovación y agilidad'. Dime cómo puedo asistirte hoy.",
            "¡Bienvenido a Az InnovationX! Soy AZ, tu guía en el mundo digital. Nuestra propuesta de valor es: 'No vendemos promesas. Creamos soluciones'. ¿Qué te trae por aquí?"
        ],
        options: [
            { text: "Nuestros Servicios", key: "servicios_menu" },
            { text: "Precios y Paquetes", key: "precios_menu" },
            { text: "Proceso de Trabajo", key: "proceso_trabajo" },
            { text: "Contacto y Horarios", key: "contacto_horarios" },
            { text: "Certificaciones", key: "certificaciones" },
            { text: "Recursos Adicionales", key: "recursos_adicionales" },
            { text: "Tips de Ciberseguridad", key: "ciberseguridad" },
            { text: "Sobre Nosotros", key: "sobre_nosotros" }
        ]
    },
    sobre_nosotros: {
        message: "Somos Az InnovationX, una empresa mexicana de desarrollo tecnológico en Huixquilucan, Estado de México. Nuestro fundador es Evaristo San Juan Azuara. Con más de 50 proyectos completados, nuestro compromiso es del 100%. Entendemos lo que significa empezar desde cero y diseñamos plataformas escalables, eficientes y listas para el futuro. ¿Quieres saber más?",
        options: [
            { text: "Nuestra Misión", key: "mision" },
            { text: "Tecnologías que usamos", key: "faq_tech_stack" },
            { text: "Volver al inicio", key: "saludo" }
        ]
    },
    mision: {
        message: "Nuestra misión es: 'Convertimos ideas en soluciones digitales con impacto real, ayudando a emprendedores a resolver desafíos tecnológicos con innovación y agilidad'.",
        options: [
            { text: "Ver servicios", key: "servicios_menu" },
            { text: "Volver al inicio", key: "saludo" }
        ]
    },
    presencia_internet: {
        message: [
            "¡Excelente pregunta! Tener presencia en internet es clave para llegar a más clientes, construir credibilidad y abrir nuevos canales de venta 24/7. Un sitio web profesional es tu mejor vendedor. Te recomiendo ver el video en nuestra página principal para entender todo el potencial.",
            "¡Me alegra que preguntes! Una fuerte presencia online es fundamental hoy en día. Te permite conectar con tu audiencia y hacer crecer tu negocio sin parar. ¿Quieres saber cómo podemos construir la tuya?"
        ],
        options: [
            { text: "Ver video en página web", url: "https://az-innovation-x.vercel.app/" },
            { text: "Ver servicios de Páginas Web", key: "servicio_web" },
            { text: "Volver al inicio", key: "saludo" }
        ]
    },
    ciberseguridad: {
        message: [
            "La ciberseguridad es súper importante. No se trata solo de tecnología, sino de proteger el corazón de tu negocio: tus datos y la confianza de tus clientes. Una buena estrategia de seguridad evita pérdidas económicas y de reputación. ¿Quieres algunos consejos básicos para empezar?",
            "Proteger tu negocio digital es crucial. La ciberseguridad es tu primera línea de defensa contra amenazas que pueden costar caro. ¿Te gustaría conocer algunos tips para fortalecer tu seguridad?"
        ],
        options: [
            { text: "Sí, dame consejos", key: "consejos_ciberseguridad" },
            { text: "Ver servicio de Seguridad", key: "servicio_seguridad" },
            { text: "Volver al inicio", key: "saludo" }
        ]
    },
    consejos_ciberseguridad: {
        message: "¡Claro! Aquí van 3 tips de ciberseguridad clave:<br>" +
            "<ul>" +
            "<li><strong>1. CONTRASEÑAS FUERTES:</strong> Usa combinaciones largas de letras, números y símbolos. ¡NO uses '123456' ni contraseñas obvias!</li>" +
            "<li><strong>2. AUTENTICACIÓN DE DOS PASOS (2FA):</strong> Actívala siempre que sea posible. Es una capa extra de seguridad para tus cuentas.</li>" +
            "<li><strong>3. MANTENER TODO ACTUALIZADO:</strong> El software, antivirus y aplicaciones deben tener siempre la última versión. Esto te protege contra vulnerabilidades conocidas.</li>" +
            "</ul>" +
            "<p>Proteger tu negocio es más fácil de lo que parece. ¿Te podemos ayudar con algo más?",
        options: [
            { text: "Ver servicio de Seguridad", key: "servicio_seguridad" },
            { text: "Volver al inicio", key: "saludo" }
        ]
    },
    certificaciones: {
        message: "¡Claro! Contamos con certificaciones que avalan nuestra seguridad, calidad y excelencia. Son la prueba de nuestro compromiso con la innovación y los más altos estándares del sector.",
        options: [
            { text: "Ver certificaciones", url: "https://certificaciones1.netlify.app/" },
            { text: "Volver al inicio", key: "saludo" }
        ]
    },
    recursos_adicionales: {
        message: "Tenemos varios recursos que te pueden interesar. ¿Qué te gustaría explorar?",
        options: [
            { text: "Tienda de Aplicaciones", key: "recurso_apps" },
            { text: "Artículos AZINNX (Merch)", key: "recurso_articulos" },
            { text: "Nuestro Blog", key: "recurso_blog" },
            { text: "Programa de Afiliados", key: "recurso_afiliados" },
            { text: "Suscribirse al Newsletter", key: "recurso_suscripcion" }
        ]
    },
    recurso_apps: {
        message: "En nuestra tienda de aplicaciones puedes ver algunos de los proyectos que hemos desarrollado. ¡Echa un vistazo!",
        options: [{ text: "Ir a la Tienda de Apps", url: "https://appsstoreaz.netlify.app/" }]
    },
    recurso_articulos: {
        message: "¡Conoce Artículos AZINNX! Es nuestra tienda de artículos tecnológicos como sudaderas, termos y gorras. ¡Moda y accesorios con estilo tech!",
        options: [{ text: "Ir a Artículos AZINNX", url: "https://articulos-azinnx.vercel.app/" }]
    },
    recurso_blog: {
        message: "En nuestro blog encontrarás artículos interesantes sobre innovación y tecnología. ¡Perfecto para mantenerte al día!",
        options: [{ text: "Leer el Blog", url: "https://azinnovationx.blogspot.com/" }]
    },
    recurso_afiliados: {
        message: "Nuestro programa de afiliados es una gran oportunidad para colaborar. Gana comisiones mientras ayudas a otros a crecer con nuestras soluciones tecnológicas.",
        options: [{ text: "Conocer el Programa", url: "https://afiliadosaz.netlify.app/" }]
    },
    recurso_suscripcion: {
        message: "¡Qué bueno que te interesa! Suscríbete a nuestro newsletter para no perderte innovaciones, ofertas especiales y contenido exclusivo.",
        options: [{ text: "¡Sí, me suscribo!", url: "https://docs.google.com/forms/d/e/1FAIpQLSci7AEJ6vcJBIUrjxHMPNdcmrT1g4GcYx0DzMTd5CrM4nwo1A/viewform?usp=header" }]
    },
    ubicacion: {
        message: "Nos encontramos en el Estado de México, Huixquilucan. ¡Nos encantaría que nos visites o nos dejes una reseña en Google Maps!",
        options: [
            { text: "Ver en Google Maps", url: "https://maps.app.goo.gl/VrvD1Z7wKA4YrFU1A" },
            { text: "Volver", key: "contacto_horarios" }
        ]
    },
    horario: {
        message: "Nuestro horario de atención (hora de México) es:<ul><li><strong>Lunes a Sábado:</strong> 09:00 – 22:00 hrs</li><li><strong>Domingo:</strong> 09:00 – 14:00 hrs</li></ul>¡Estamos para servirte!",
        options: [
            { text: "Contactar por WhatsApp", url: "https://wa.me/525620042412" },
            { text: "Volver", key: "contacto_horarios" }
        ]
    },
    payment_info: {
        message: "Ofrecemos varios métodos de pago seguros para tu comodidad. ¿Cuál prefieres?",
        options: [
            { text: "💳 Tarjeta (con MSI)", url: "https://link.clip.mx/azinnovationx" },
            { text: "🅿️ PayPal", url: "https://www.paypal.com/paypalme/EvaristoSan?locale.x=es_XC&country.x=MX" },
            { text: "🏦 Transferencia Bancaria", key: "pago_transferencia" },
            { text: "Ver todos los precios", key: "precios_menu" },
        ]
    },
    pago_transferencia: {
        message: "Para pago por transferencia, por favor contacta a nuestro equipo para solicitar los datos de la cuenta. Es por seguridad. 😊",
        options: [
            { text: "Contactar por WhatsApp", url: "https://wa.me/525620042412" },
            { text: "Ver otros métodos de pago", key: "payment_info" }
        ]
    },
    servicios_menu: {
        message: [
            "¡Súper! Ofrecemos varias soluciones de alta tecnología. ¿Cuál te interesa para contarte más?",
            "Claro, aquí tienes un vistazo de nuestros servicios. ¿Sobre cuál te gustaría profundizar?",
            "Perfecto, exploremos nuestras soluciones. ¿Qué área te llama más la atención?"
        ],
        options: [
            { text: "Páginas Web", key: "servicio_web" },
            { text: "Apps Móviles", key: "servicio_app" },
            { text: "Tiendas Online", key: "servicio_ecommerce" },
            { text: "Chatbots Inteligentes", key: "servicio_chatbot" },
            { text: "Seguridad Informática", key: "servicio_seguridad" },
            { text: "Soluciones Cloud", key: "servicio_cloud" },
            { text: "Comparar Web vs Tienda vs App", key: "comparar_servicios"},
            { text: "Volver al inicio", key: "saludo" }
        ],
    },
    comparar_servicios: {
        message: "¡Buena pregunta! Aquí una explicación rápida:<br>" +
                 "<ul><li><strong>Página Web:</strong> Es tu carta de presentación digital. Ideal para mostrar quién eres, qué haces y cómo contactarte.</li>" +
                 "<li><strong>Tienda Online:</strong> Es una página web con todo lo necesario para VENDER: catálogo, carrito de compras y pagos.</li>" +
                 "<li><strong>App Móvil:</strong> Se instala en el celular, puede enviar notificaciones y funciona sin conexión. Es para fidelizar y tener un contacto directo con tus usuarios.</li></ul>" +
                 "¿Sobre cuál te gustaría saber más?",
        options: [
            { text: "Páginas Web", key: "servicio_web" },
            { text: "Tiendas Online", key: "servicio_ecommerce" },
            { text: "Apps Móviles", key: "servicio_app" }
        ]
    },
    precios_menu: {
        message: "¡Claro! Tenemos precios para cada necesidad. ¿Qué te gustaría ver?",
        options: [
            { text: "Servicios Individuales", key: "precios_individuales" },
            { text: "Paquetes Recomendados", key: "precios_paquetes" },
            { text: "¿Qué incluyen los planes?", key: "faq_incluyen_planes" },
            { text: "Ver página de precios", url: "https://precios1.netlify.app/" },
        ]
    },
    precios_individuales: {
        message: "Aquí tienes nuestros precios para servicios individuales. ¿Cuál te interesa?",
        options: [
            { text: "Página Web One Page ($2-3k)", key: "precio_one_page" },
            { text: "Web Empresarial ($2.5-3.5k)", key: "precio_empresarial" },
            { text: "Tienda Online Básica ($2.5-3k)", key: "precio_tienda" },
            { text: "App Web Android (PWA) ($2.8-3.7k)", key: "precio_pwa" },
            { text: "Chatbot Básico ($500-800)", key: "precio_chatbot_basico" },
            { text: "Chatbot Avanzado ($800-1.2k)", key: "precio_chatbot_avanzado" },
            { text: "Seguridad Web Básica ($2.8-3.8k)", key: "precio_seguridad" },
            { text: "Hosting y Mantenimiento ($1.2-2k)", key: "precio_hosting" },
        ]
    },
    precios_paquetes: {
        message: "Nuestros paquetes son una excelente opción para empezar con todo. ¡Ahorras y obtienes más!",
        options: [
            { text: "📦 Web + Chatbot Básico ($3-3.8k)", key: "paquete_web_chatbot" },
            { text: "📦 Web + App + Chatbot ($5.3-7.5k)", key: "paquete_web_app_chatbot" }
        ]
    },
    // DETALLE DE PRECIOS INDIVIDUALES
    precio_one_page: { message: "<strong>Página Web One Page Profesional ($2,000 - $3,000 MXN):</strong> Incluye diseño responsivo, secciones estratégicas, integración con redes sociales y formulario de contacto. ¡Ideal para empezar con impacto!", options: [{ text: "Más sobre Páginas Web", key: "servicio_web" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    precio_empresarial: { message: "<strong>Página Web Empresarial Premium ($2,500 - $3,500 MXN):</strong> Un sitio corporativo completo con múltiples secciones, SEO básico y copywriting persuasivo para proyectar una imagen profesional.", options: [{ text: "Más sobre Páginas Web", key: "servicio_web" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    precio_tienda: { message: "<strong>Tienda Online Básica ($2,500 - $3,000 MXN):</strong> Incluye catálogo de productos, carrito de compras, integración de pagos y WhatsApp. ¡Todo para que empieces a vender!", options: [{ text: "Más sobre Tiendas Online", key: "servicio_ecommerce" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    precio_pwa: { message: "<strong>App Web Android (PWA) ($2,800 - $3,700 MXN):</strong> Una app instalable con acceso directo desde el celular, carga rápida y funcionamiento sin conexión. ¡Lo mejor de una web y una app!", options: [{ text: "Más sobre Apps", key: "servicio_app" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    precio_chatbot_basico: { message: "<strong>Chatbot Web Básico ($500 - $800 MXN):</strong> Ofrece respuestas automáticas a preguntas frecuentes con un flujo de conversación predefinido.", options: [{ text: "Más sobre Chatbots", key: "servicio_chatbot" }, { text: "Comparar Chatbots", key: "comparar_chatbots" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    precio_chatbot_avanzado: { message: "<strong>Chatbot Avanzado ($800 - $1,200 MXN):</strong> Incluye menús interactivos, múltiples flujos de conversación e integración con WhatsApp o email. ¡Un asistente más potente!", options: [{ text: "Más sobre Chatbots", key: "servicio_chatbot" }, { text: "Comparar Chatbots", key: "comparar_chatbots" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    precio_seguridad: { message: "<strong>Seguridad Web Básica ($2,800 - $3,800 MXN):</strong> Realizamos un diagnóstico de seguridad, generamos un reporte de vulnerabilidades e implementamos configuraciones esenciales para tu tranquilidad.", options: [{ text: "Más sobre Seguridad", key: "servicio_seguridad" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    precio_hosting: { message: "<strong>Hosting y Mantenimiento ($1,200 - $2,000 MXN):</strong> Aseguramos que tu sitio esté siempre en línea con optimización continua, respaldos periódicos y seguridad actualizada.", options: [{ text: "Más sobre Hosting", key: "faq_soporte_menu" }, { text: "Ver otros precios", key: "precios_individuales" }] },
    // DETALLE DE PAQUETES
    paquete_web_chatbot: { message: "<strong>Paquete Web + Chatbot Básico ($3,000 - $3,800 MXN):</strong> La combinación perfecta para una presencia online profesional y atención al cliente automatizada desde el día uno.", options: [{ text: "Ver otros paquetes", key: "precios_paquetes" }] },
    paquete_web_app_chatbot: { message: "<strong>Paquete Web + App + Chatbot ($5,300 - $7,500 MXN):</strong> La solución más completa para dominar en el entorno digital: una web profesional, una app para fidelizar y un chatbot para no perder clientes.", options: [{ text: "Ver otros paquetes", key: "precios_paquetes" }] },

    faq_incluyen_planes: {
        message: "¡Excelente pregunta! <strong>TODOS nuestros planes incluyen:</strong><br><ul><li>✅ Hosting gratis</li><li>✅ Dominio gratis</li><li>✅ Soporte técnico por 30 días</li><li>✅ Capacitación incluida</li><li>✅ 30 días de garantía contra bugs</li></ul>",
        options: [ { text: "Ver precios", key: "precios_menu" }, { text: "Soporte y Garantías", key: "faq_soporte_garantia" } ]
    },
    comparar_chatbots: {
        message: "La diferencia principal es la inteligencia:<br>" +
                 "<ul><li><strong>Chatbot Básico:</strong> Sigue un guion fijo, ideal para preguntas y respuestas sencillas.</li>" +
                 "<li><strong>Chatbot Avanzado:</strong> Es más dinámico, con menús, puede manejar conversaciones más complejas y se integra con otras plataformas como WhatsApp.</li></ul>" +
                 "¿Te gustaría una cotización?",
        options: [
            { text: "Cotizar Chatbot Básico", key: "precio_chatbot_basico" },
            { text: "Cotizar Chatbot Avanzado", key: "precio_chatbot_avanzado" }
        ]
    },
    contacto_horarios: {
        message: "¡Claro! Estamos para ayudarte. ¿Qué necesitas?",
        options: [
            { text: "Nuestro Horario", key: "horario" },
            { text: "Nuestra Ubicación", key: "ubicacion" },
            { text: "Redes Sociales", key: "contacto" },
            { text: "Métodos de Pago", key: "payment_info" },
            { text: "Volver al inicio", key: "saludo" }
        ]
    },
    contacto: {
        message: "¡Nos encantará saber de ti! Conéctate con nosotros.",
        options: [
            { text: "WhatsApp", url: "https://wa.me/525620042412" },
            { text: "Facebook", url: "https://www.facebook.com/AzInnovationX?mibextid=ZbWKwL" },
            { text: "Instagram", url: "https://www.instagram.com/azinnovationx?igsh=MWN6Y2I1OWZycHVkOA==" },
            { text: "TikTok", url: "https://www.tiktok.com/@innovationx09?_t=ZS-8yJNEWarLPO&_r=1" },
            { text: "Email", url: "mailto:soporteseguro98@gmail.com" },
            { text: "Volver", key: "contacto_horarios" }
        ]
    },
    servicio_web: {
        message: "<strong>Páginas Web Profesionales:</strong> 'Diseños modernos y adaptables para convertir visitantes en clientes'.<br><strong>Características:</strong> Diseño responsivo, SEO optimizado, integración de APIs.",
        options: [
            { text: "Ver precios de Páginas Web", key: "precios_individuales" },
            { text: "Ver ejemplos", url: "https://ejemplosdepaginasweb.netlify.app/" },
            { text: "Ver más servicios", key: "servicios_menu" }
        ]
    },
    servicio_app: {
        message: "<strong>Aplicaciones Móviles:</strong> 'Apps Android y multiplataforma que conectan con tu audiencia'.<br><strong>Características:</strong> Notificaciones push, diseño intuitivo, para Android y multiplataforma.",
        options: [
            { text: "Ver precio de App Web", key: "precio_pwa" },
            { text: "Ver ejemplos", url: "https://paginawebaplicaciones.netlify.app/" },
            { text: "Ver más servicios", key: "servicios_menu" }
        ]
    },
    servicio_ecommerce: {
        message: "<strong>Tiendas Online (E-commerce):</strong> 'Plataformas de e-commerce robustas y seguras para impulsar tus ventas'.<br><strong>Características:</strong> Pasarelas de pago seguras, gestión de inventario, catálogo de productos, carrito de compras.",
        options: [
            { text: "Ver precio de Tienda Online", key: "precio_tienda" },
            { text: "Ver ejemplos", url: "https://paginawebdetiendaonline.netlify.app/" },
            { text: "Ver más servicios", key: "servicios_menu" }
        ]
    },
    servicio_chatbot: {
        message: "<strong>Chatbots Inteligentes:</strong> 'Automatiza la atención al cliente las 24 horas del día con asistentes inteligentes'.<br><strong>Características:</strong> Atención 24/7 con IA, respuestas automáticas, integración en sitio web o blog.",
        options: [
            { text: "Ver precios de Chatbots", key: "precios_individuales" },
            { text: "Ver ejemplos", url: "https://chatbotsaz.netlify.app/" },
            { text: "Ver más servicios", key: "servicios_menu" }
        ]
    },
    servicio_seguridad: {
        message: "<strong>Seguridad Informática:</strong> 'Protege tu negocio digital con auditorías y protocolos de ciberseguridad'.<br><strong>Características:</strong> Auditorías de seguridad, protocolos SSL, encriptación, cumplimiento de estándares internacionales.",
        options: [
            { text: "Ver precio de Seguridad Web", key: "precio_seguridad" },
            { text: "Ver ejemplos", url: "https://paginawebseguridadinformatica.netlify.app/" },
            { text: "Tips de Ciberseguridad", key: "consejos_ciberseguridad" },
            { text: "Ver más servicios", key: "servicios_menu" }
        ]
    },
    servicio_cloud: {
        message: "<strong>Soluciones Cloud:</strong> 'Migración y optimización en la nube para escalabilidad sin límites'.<br><strong>Características:</strong> Migración a la nube, alta disponibilidad, backups automáticos, escalabilidad.",
        options: [
            { text: "Ver ejemplos", url: "https://paginawebsolucionescloud.netlify.app/" },
            { text: "Ver más servicios", key: "servicios_menu" }
        ]
    },
    proceso_trabajo: {
        message: "Nuestro proceso de trabajo es transparente y colaborativo, dividido en 3 simples pasos. ¿Qué parte del proceso te gustaría conocer?",
        options: [
            { text: "Paso 1: Consulta y Estrategia", key: "proceso_paso1" },
            { text: "Paso 2: Diseño y Desarrollo", key: "proceso_paso2" },
            { text: "Paso 3: Lanzamiento y Soporte", key: "proceso_paso3" },
            { text: "Detalles (inicio, pago, etc.)", key: "proceso_detalles" }
        ]
    },
    proceso_paso1: {
        message: "<strong>PASO 1 - CONSULTA Y ESTRATEGIA:</strong> 'Entendemos tu visión y tus metas. Definimos juntos el plan de acción, la tecnología a usar y el camino hacia el éxito de tu proyecto.'",
        options: [{ text: "Siguiente paso", key: "proceso_paso2" }, { text: "Volver al proceso", key: "proceso_trabajo" }]
    },
    proceso_paso2: {
        message: "<strong>PASO 2 - DISEÑO Y DESARROLLO:</strong> 'Damos vida a tu idea. Creamos un diseño atractivo y funcional, y desarrollamos una solución robusta, escalable y a la medida.'",
        options: [{ text: "Siguiente paso", key: "proceso_paso3" }, { text: "Volver al proceso", key: "proceso_trabajo" }]
    },
    proceso_paso3: {
        message: "<strong>PASO 3 - LANZAMIENTO Y SOPORTE:</strong> 'Desplegamos tu proyecto al mundo. Te acompañamos en el lanzamiento y te ofrecemos soporte para asegurar su funcionamiento óptimo.'",
        options: [{ text: "Ver detalles del proceso", key: "proceso_detalles" }, { text: "Volver al proceso", key: "proceso_trabajo" }]
    },
    proceso_detalles: {
        message: "Aquí algunos detalles importantes de nuestro proceso:<br>" +
                 "<ul><li><strong>Para iniciar:</strong> 1) Nos cuentas tu idea, 2) Te damos un presupuesto, 3) Firmamos contrato, ¡y a crear!</li>" +
                 "<li><strong>¿Qué necesitamos de ti?:</strong> Tu visión, el contenido (textos, imágenes) y una comunicación fluida.</li>" +
                 "<li><strong>Seguimiento:</strong> Te mantenemos al tanto con actualizaciones semanales con capturas y avances.</li>" +
                 "<li><strong>Forma de pago:</strong> Generalmente es 50% al inicio y 50% al finalizar.</li></ul>",
        options: [{ text: "Ver garantías y soporte", key: "faq_soporte_garantia" }, { text: "Volver al proceso", key: "proceso_trabajo" }]
    },
    faq_tech_stack: {
        message: "Utilizamos siempre tecnología moderna y eficiente para garantizar los mejores resultados. Nuestro stack incluye: HTML5, CSS3, JavaScript, React, Node.js y Firebase.",
        options: [{ text: "Ver seguridad y privacidad", key: "faq_tech_seguridad" }, { text: "Volver al inicio", key: "saludo" }]
    },
    faq_tech_seguridad: {
        message: "¡La seguridad es nuestra prioridad! Implementamos protocolos de seguridad SSL, encriptación de datos y cumplimos con estándares internacionales de protección de datos para que tu información esté 100% segura.",
        options: [{ text: "Ver servicio de Seguridad", key: "servicio_seguridad" }, { text: "Volver al inicio", key: "saludo" }]
    },
    faq_soporte_garantia: {
        message: "¡Claro! Tu tranquilidad es importante. Ofrecemos:<br>" +
                 "<ul><li><strong>30 días de garantía total</strong> contra defectos de funcionamiento y bugs.</li>" +
                 "<li><strong>Soporte técnico por 30 días</strong> incluido.</li>" +
                 "<li>Corrección de bugs sin costo adicional.</li>" +
                 "<li>Asesoría para dudas básicas.</li>" +
                 "<li>Una sesión de <strong>capacitación incluida</strong> para que manejes tu plataforma.</li></ul>",
        options: [{ text: "Ver servicio de Hosting", key: "precio_hosting" }, { text: "Volver al inicio", key: "saludo" }]
    },
    // Fallback and escalation
    human_escalation: {
        message: "Entiendo. Para darte una atención más personalizada, te recomiendo hablar directamente con nuestro equipo técnico vía WhatsApp. ¿Quieres que te redirija?",
        options: [{
            text: "Sí, llevar a WhatsApp",
            url: "https://wa.me/525620042412"
        }, {
            text: "No, gracias",
            key: "saludo"
        }]
    },
    solicitar_nombre: {
        message: "¡Excelente! Para preparar una cotización, primero, ¿me podrías decir tu nombre?",
        nextContext: 'capturar_nombre'
    },
    solicitar_email: {
        message: "¡Gracias, {nombre}! Para continuar, te redirigiré a nuestro formulario de contacto para que nos des más detalles y te enviemos la cotización formal.",
        options: [
            { text: "Ir al formulario", url: "https://solicitudes-az-innovation-x.vercel.app/" }
        ]
    }
};

        const UIController = {
            domElements: {
                chatbotToggle: document.getElementById('chatbot-toggle'),
                chatbotWindow: document.getElementById('chatbot-window'),
                iconOpen: document.querySelector('#chatbot-toggle .icon-open'),
                iconClose: document.querySelector('#chatbot-toggle .icon-close'),
                messagesContainer: document.getElementById('chatbot-messages'),
                inputForm: document.getElementById('chatbot-input-form'),
                inputField: document.getElementById('chatbot-input'),
                expandToggle: document.getElementById('chatbot-expand-toggle'),
                themeToggle: document.getElementById('chatbot-theme-toggle'),
            },
            init() {
                this.domElements.chatbotToggle.addEventListener('click', this.toggleChatbot.bind(this));
                this.domElements.expandToggle.addEventListener('click', this.toggleExpand.bind(this));
                this.domElements.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
                this.domElements.inputForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const userInput = this.domElements.inputField.value.trim();
                    if (userInput) {
                        ConversationEngine.handleInput(userInput);
                    }
                });
                this.domElements.messagesContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('option-button')) {
                        ConversationEngine.handleOptionClick(e.target);
                    }
                });
                this.loadTheme();
            },
            toggleChatbot() {
                const isActive = this.domElements.chatbotWindow.classList.toggle('active');
                this.domElements.iconOpen.style.display = isActive ? 'none' : 'block';
                this.domElements.iconClose.style.display = isActive ? 'block' : 'none';

                if (isActive && this.domElements.messagesContainer.children.length === 0) {
                    ConversationEngine.startConversation();
                }
            },
            toggleExpand() {
                this.domElements.chatbotWindow.classList.toggle('expanded');
                const icon = this.domElements.expandToggle.querySelector('svg');
                if (this.domElements.chatbotWindow.classList.contains('expanded')) {
                    icon.innerHTML = '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>';
                } else {
                    icon.innerHTML = '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>';
                }
            },
            toggleTheme() {
                document.body.classList.toggle('light-mode');
                localStorage.setItem('chatbot-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
                const icon = this.domElements.themeToggle.querySelector('svg');
                if (document.body.classList.contains('light-mode')) {
                    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'; // Moon icon
                } else {
                    icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'; // Sun icon
                }
            },
            loadTheme() {
                const theme = localStorage.getItem('chatbot-theme');
                if (theme === 'light') {
                    document.body.classList.add('light-mode');
                    this.toggleTheme(); // To update icon
                }
            },
            showUserMessage(message) {
                const userMessageElement = document.createElement('div');
                userMessageElement.classList.add('chat-message', 'user-message');
                userMessageElement.textContent = message;
                this.domElements.messagesContainer.appendChild(userMessageElement);
                this.scrollToBottom();
            },
            showBotMessage(response, key) {
                const botMessageElement = document.createElement('div');
                botMessageElement.classList.add('chat-message', 'bot-message');

                let message = Array.isArray(response.message) ? response.message[Math.floor(Math.random() * response.message.length)] : response.message;

                if (key && key !== 'saludo' && !response.options && !message.includes('?')) {
                    let followUp = "¿Hay algo más en lo que pueda ayudarte?";
                    if (StateController.get('currentTopic')) {
                        followUp = `¿Tienes alguna otra pregunta sobre ${StateController.get('currentTopic')}, o te gustaría explorar otro servicio?`;
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

                this.domElements.messagesContainer.appendChild(botMessageElement);
                this.scrollToBottom();
            },
            showTypingIndicator() {
                const typingIndicator = document.createElement('div');
                typingIndicator.classList.add('chat-message', 'bot-message', 'typing-indicator');
                typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                this.domElements.messagesContainer.appendChild(typingIndicator);
                this.scrollToBottom();
            },
            hideTypingIndicator() {
                const typingIndicator = this.domElements.messagesContainer.querySelector('.typing-indicator');
                if (typingIndicator) {
                    this.domElements.messagesContainer.removeChild(typingIndicator);
                }
            },
            scrollToBottom() {
                this.domElements.messagesContainer.scrollTop = this.domElements.messagesContainer.scrollHeight;
            },
            toggleInput(disabled) {
                this.domElements.inputField.disabled = disabled;
                if (!disabled) {
                    this.domElements.inputField.focus();
                }
            }
        };

        const StateController = {
            state: {
                lastBotQuestionKey: null,
                currentTopic: null,
                misunderstandingCounter: 0,
            },
            get(key) {
                return this.state[key];
            },
            set(key, value) {
                this.state[key] = value;
            },
            reset() {
                this.state.misunderstandingCounter = 0;
            },
            increment(key) {
                this.state[key]++;
            }
        };

        const ConversationEngine = {
            init() {
                UIController.init();
                this.precomputeKnowledgeBaseVectors();
            },

            stopwords: [
                'a', 'un', 'una', 'unas', 'unos', 'al', 'del', 'las', 'los', 'el', 'la', 'lo', 'de', 'y', 'e', 'o', 'u', 'en',
                'que', 'cual', 'cuales', 'como', 'con', 'por', 'para', 'mi', 'mis', 'su', 'sus',
                'pero', 'mas', 'si', 'no', 'yo', 'tu', 'el', 'ella', 'nosotros', 'ustedes', 'ellos', 'ellas',
                'me', 'te', 'se', 'nos', 'os', 'le', 'les', 'soy', 'eres', 'somos', 'son', 'estoy', 'estas', 'esta', 'estamos',
                'estan', 'ser', 'estar', 'tener', 'tengo', 'tienes', 'tiene', 'tenemos', 'tienen', 'quiero', 'quisiera', 'dame',
                'dime', 'necesito', 'podrias', 'favor', 'gracias', 'hola', 'buenos', 'dias', 'tardes', 'noches', 'es', 'su',
                'hay', 'sobre', 'informacion', 'cuanto', 'valor', 'cuestan', 'valen'
            ],

            knowledgeBaseVectors: {},
            vocabulary: [],

            tokenize(text) {
                if (!text) return [];
                return text.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^\w\s]/g, '')
                    .split(/\s+/)
                    .filter(word => word.length > 1 && !this.stopwords.includes(word));
            },

            createVector(tokens, vocabulary) {
                const vector = new Array(vocabulary.length).fill(0);
                tokens.forEach(token => {
                    const index = vocabulary.indexOf(token);
                    if (index !== -1) {
                        vector[index]++;
                    }
                });
                return vector;
            },

            dotProduct(vecA, vecB) {
                let product = 0;
                for (let i = 0; i < vecA.length; i++) {
                    product += vecA[i] * vecB[i];
                }
                return product;
            },

            magnitude(vec) {
                let sum = 0;
                for (let i = 0; i < vec.length; i++) {
                    sum += vec[i] * vec[i];
                }
                return Math.sqrt(sum);
            },

            cosineSimilarity(vecA, vecB) {
                const dot = this.dotProduct(vecA, vecB);
                const magA = this.magnitude(vecA);
                const magB = this.magnitude(vecB);
                if (magA === 0 || magB === 0) return 0;
                return dot / (magA * magB);
            },

            precomputeKnowledgeBaseVectors() {
                const allTokens = new Set();
                const documents = {};
                const keywordCorpus = {};

                for (const key in knowledgeBase) {
                    let textCorpus = '';
                    const entry = knowledgeBase[key];
                    if (typeof entry.message === 'string') {
                        textCorpus += entry.message + ' ';
                    } else if (Array.isArray(entry.message)) {
                        textCorpus += entry.message.join(' ') + ' ';
                    }

                    if (entry.options) {
                        entry.options.forEach(opt => {
                            textCorpus += opt.text + ' ';
                        });
                    }

                    const keyWords = key.replace(/_/g, ' ').replace(/servicio|precio|faq|recurso|paquete/g, '');
                    textCorpus += ` ${keyWords}`;
                    keywordCorpus[key] = this.tokenize(keyWords);

                    const tokens = this.tokenize(textCorpus);
                    documents[key] = tokens;
                    tokens.forEach(token => allTokens.add(token));
                }

                this.vocabulary = Array.from(allTokens);

                for (const key in documents) {
                    this.knowledgeBaseVectors[key] = {
                        contentVector: this.createVector(documents[key], this.vocabulary),
                        keywordVector: this.createVector(keywordCorpus[key], this.vocabulary)
                    };
                }
            },

            findBestResponse(userInput) {
                const userTokens = this.tokenize(userInput.replace(/cuánto|cuanto|costo|precio/g, ''));
                if (userTokens.length === 0) return 'saludo';

                const userVector = this.createVector(userTokens, this.vocabulary);
                let bestMatch = { key: null, score: -1 };

                for (const key in this.knowledgeBaseVectors) {
                    const { contentVector, keywordVector } = this.knowledgeBaseVectors[key];

                    // Calculate similarity
                    let contentSimilarity = this.cosineSimilarity(userVector, contentVector);
                    let keywordSimilarity = this.cosineSimilarity(userVector, keywordVector);

                    // Combine scores with a weight: keyword matches are more important
                    const finalScore = (contentSimilarity * 0.6) + (keywordSimilarity * 1.4);

                    if (finalScore > bestMatch.score) {
                        bestMatch = { key: key, score: finalScore };
                    }
                }

                if (bestMatch.score < 0.2) { // Adjusted threshold
                    StateController.increment('misunderstandingCounter');
                    return null;
                }

                return bestMatch.key;
            },

            startConversation() {
                UIController.showBotMessage(knowledgeBase.saludo, 'saludo');
            },

            handleInput(input) {
                UIController.showUserMessage(input);
                UIController.toggleInput(true);
                UIController.showTypingIndicator();

                setTimeout(() => {
                    UIController.hideTypingIndicator();
                    let response;
                    let responseKey = null;

                    const lastBotQuestionKey = StateController.get('lastBotQuestionKey');
                    if (lastBotQuestionKey === 'capturar_nombre') {
                        StateController.set('userName', input.trim());
                        responseKey = 'solicitar_email';
                        const responseTemplate = JSON.parse(JSON.stringify(knowledgeBase[responseKey]));
                        responseTemplate.message = responseTemplate.message.replace('{nombre}', StateController.get('userName'));
                        response = responseTemplate;
                    }

                    if (!response) {
                        responseKey = this.findBestResponse(input);

                        if (responseKey) {
                            response = knowledgeBase[responseKey];
                            StateController.reset();
                        } else {
                            if (StateController.get('misunderstandingCounter') >= 2) {
                                response = knowledgeBase['human_escalation'];
                                StateController.set('misunderstandingCounter', 0);
                            } else {
                                response = {
                                    message: "No he entendido muy bien. Puedes intentar con otras palabras o elegir una de las opciones.",
                                    options: knowledgeBase.saludo.options
                                };
                            }
                        }
                    }

                    if (response) {
                        UIController.showBotMessage(response, responseKey);
                        StateController.set('lastBotQuestionKey', response.nextContext || responseKey);
                    }

                    UIController.toggleInput(false);
                }, 400);
            },

            handleOptionClick(target) {
                const key = target.dataset.key;
                const url = target.dataset.url;
                const budget = target.dataset.budget;
                const text = target.textContent;

                UIController.showUserMessage(text);
                UIController.toggleInput(true);
                UIController.showTypingIndicator();

                setTimeout(() => {
                    UIController.hideTypingIndicator();
                    if (url) {
                        window.open(url, '_blank');
                         UIController.showBotMessage({ message: `¡Perfecto! Abriendo ${text} en una nueva pestaña.` });
                    } else if (key) {
                        const response = knowledgeBase[key];
                        if (response) {
                             UIController.showBotMessage(response, key);
                             StateController.set('lastBotQuestionKey', response.nextContext || key);
                        }
                    } else if (budget) {
                        StateController.set('budgetRange', text);
                        const response = knowledgeBase['solicitar_nombre'];
                        UIController.showBotMessage(response, 'solicitar_nombre');
                        StateController.set('lastBotQuestionKey', response.nextContext);
                    }
                    UIController.toggleInput(false);
                }, 400);
            }
        };

        ConversationEngine.init();
    });