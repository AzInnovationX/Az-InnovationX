/**
 * Chatbot: Az Asistente Virtual - Professional Logic (2026)
 * Features: Intent Engine, Persistence, Theme Control, Mobile Optimization
 */

(function() {
    const CB_STORAGE_KEY = 'cb_assistant_state';
    const WHATSAPP_NUMBER = '525653915739';
    const TYPING_DELAY = [600, 1000]; // min/max ms

    const elements = {
        container: document.getElementById('cb-container'),
        window: document.getElementById('cb-window'),
        toggle: document.getElementById('cb-toggle'),
        messages: document.getElementById('cb-messages'),
        form: document.getElementById('cb-input-form'),
        input: document.getElementById('cb-input'),
        themeToggle: document.getElementById('cb-theme-toggle'),
        expandToggle: document.getElementById('cb-expand-toggle')
    };

    let state = {
        isOpen: false,
        isLight: false,
        isExpanded: false,
        history: []
    };

    // --- Initialization ---
    function init() {
        loadState();
        setupEventListeners();

        // Auto-greet after 3 seconds if never opened
        if (!localStorage.getItem('cb_greeted')) {
            setTimeout(() => {
                if (!state.isOpen) {
                    addBotMessage("¡Hola! Soy Az, tu asistente virtual. ¿En qué puedo apoyarte con tu proyecto tecnológico hoy?");
                    localStorage.setItem('cb_greeted', 'true');
                }
            }, 3000);
        }

        // Viewport height fix for mobile
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', adjustMobileHeight);
        }
    }

    // --- State Management ---
    function loadState() {
        const saved = localStorage.getItem(CB_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            state.isLight = parsed.isLight || false;
            state.isExpanded = parsed.isExpanded || false;

            if (state.isLight) elements.container.classList.add('cb-light');
            if (state.isExpanded) elements.container.classList.add('cb-expanded');
        }
    }

    function saveState() {
        localStorage.setItem(CB_STORAGE_KEY, JSON.stringify({
            isLight: state.isLight,
            isExpanded: state.isExpanded
        }));
    }

    // --- UI Interactions ---
    function setupEventListeners() {
        elements.toggle.addEventListener('click', toggleChat);
        elements.themeToggle.addEventListener('click', toggleTheme);
        elements.expandToggle.addEventListener('click', toggleExpand);

        elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleUserInput();
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isOpen) toggleChat();
        });
    }

    function toggleChat() {
        state.isOpen = !state.isOpen;
        elements.container.classList.toggle('cb-open', state.isOpen);
        if (state.isOpen) {
            elements.input.focus();
            scrollToBottom();
        }
    }

    function toggleTheme() {
        state.isLight = !state.isLight;
        elements.container.classList.toggle('cb-light', state.isLight);
        saveState();
    }

    function toggleExpand() {
        state.isExpanded = !state.isExpanded;
        elements.container.classList.toggle('cb-expanded', state.isExpanded);
        saveState();
    }

    function adjustMobileHeight() {
        if (window.innerWidth <= 768) {
            const vh = window.visualViewport.height;
            elements.window.style.height = `${vh - 100}px`;
        }
    }

    // --- Messaging Logic ---
    function handleUserInput() {
        const text = elements.input.value.trim();
        if (!text) return;

        addUserMessage(text);
        elements.input.value = '';

        // Process intent
        const response = getIntentResponse(text);

        showTypingIndicator();

        const delay = Math.floor(Math.random() * (TYPING_DELAY[1] - TYPING_DELAY[0])) + TYPING_DELAY[0];
        setTimeout(() => {
            removeTypingIndicator();
            addBotMessage(response.text, response.options);
        }, delay);
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'cb-msg cb-user';
        msgDiv.textContent = text;
        elements.messages.appendChild(msgDiv);
        scrollToBottom();
    }

    function addBotMessage(text, options = []) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'cb-msg cb-bot';
        msgDiv.innerHTML = `<div class="cb-text">${sanitizeHTML(text)}</div>`;

        if (options && options.length > 0) {
            const optCont = document.createElement('div');
            optCont.className = 'cb-options';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'cb-opt-btn';
                btn.textContent = opt.label;
                btn.onclick = () => handleOptionClick(opt);
                optCont.appendChild(btn);
            });
            msgDiv.appendChild(optCont);
        }

        elements.messages.appendChild(msgDiv);
        scrollToBottom();
    }

    function handleOptionClick(opt) {
        if (opt.action === 'msg') {
            elements.input.value = opt.value;
            handleUserInput();
        } else if (opt.action === 'link') {
            window.location.href = opt.value;
        } else if (opt.action === 'wa') {
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(opt.value)}`, '_blank');
        }
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'cb-typing';
        indicator.className = 'cb-msg cb-bot';
        indicator.innerHTML = '<span class="cb-dot"></span><span class="cb-dot"></span><span class="cb-dot"></span>';
        // Add specific CSS for typing dots if not in main CSS
        indicator.style.display = 'flex';
        indicator.style.gap = '4px';
        indicator.style.padding = '10px 15px';
        elements.messages.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('cb-typing');
        if (indicator) indicator.remove();
    }

    // --- Intent Engine ---
    function getIntentResponse(input) {
        const text = normalizeText(input);

        // 1. Greetings
        if (match(text, ['hola', 'buen', 'dias', 'tardes', 'noches', 'que tal'])) {
            return {
                text: "¡Hola! Un gusto saludarte. Soy el asistente de Az InnovationX. ¿Cómo puedo ayudarte hoy?",
                options: [
                    { label: "Ver Servicios", action: "link", value: "servicios.html" },
                    { label: "Cotizar Proyecto", action: "msg", value: "Quiero cotizar un proyecto" }
                ]
            };
        }

        // 2. Services
        if (match(text, ['servicio', 'hacen', 'web', 'app', 'tienda', 'software', 'desarrollo'])) {
            return {
                text: "En Az InnovationX ofrecemos desarrollo de sitios web corporativos, aplicaciones móviles, e-commerce y sistemas a la medida. ¿Buscas algo específico?",
                options: [
                    { label: "Páginas Web", action: "msg", value: "Info sobre páginas web" },
                    { label: "Apps Móviles", action: "msg", value: "Info sobre aplicaciones" },
                    { label: "Ver todos", action: "link", value: "servicios.html" }
                ]
            };
        }

        // 3. Pricing / Quote
        if (match(text, ['precio', 'costo', 'cuanto', 'cotiza', 'presupuesto'])) {
            return {
                text: "Los costos varían según la complejidad. Tenemos paquetes básicos desde precios competitivos hasta soluciones empresariales robustas.",
                options: [
                    { label: "Ver Precios", action: "link", value: "precios.html" },
                    { label: "Hablar por WhatsApp", action: "wa", value: "Hola, me gustaría una cotización personalizada." }
                ]
            };
        }

        // 4. Contact
        if (match(text, ['contacto', 'donde', 'ubicacion', 'telefono', 'hablar', 'humano', 'persona'])) {
            return {
                text: "Puedes contactarnos directamente por WhatsApp o llenar nuestro formulario de contacto. ¡Estamos en CDMX para servirte!",
                options: [
                    { label: "WhatsApp Directo", action: "wa", value: "Hola, necesito hablar con un consultor." },
                    { label: "Formulario", action: "link", value: "contacto.html" }
                ]
            };
        }

        // 5. Default
        return {
            text: "Interesante. Para darte la mejor respuesta, ¿te gustaría hablar con uno de nuestros expertos o prefieres ver nuestros servicios?",
            options: [
                { label: "Hablar con experto", action: "wa", value: "Hola, tengo una duda específica sobre sus servicios." },
                { label: "Ver Catálogo", action: "link", value: "servicios.html" }
            ]
        };
    }

    // --- Helpers ---
    function normalizeText(text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function match(text, keywords) {
        return keywords.some(kw => text.includes(kw));
    }

    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function scrollToBottom() {
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    function addStyles() {
        // Adding dynamic styles for typing indicator
        const style = document.createElement('style');
        style.textContent = `
            .cb-dot { width: 6px; height: 6px; background: #888; border-radius: 50%; animation: cb-bounce 1.4s infinite ease-in-out; }
            .cb-dot:nth-child(1) { animation-delay: -0.32s; }
            .cb-dot:nth-child(2) { animation-delay: -0.16s; }
            @keyframes cb-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
        `;
        document.head.appendChild(style);
    }

    // Start
    if (elements.container) {
        addStyles();
        init();
    }
})();
