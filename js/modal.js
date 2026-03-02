/**
 * Professional Floating Greeting Logic (Task 2)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Prevent showing more than once per session
  if (sessionStorage.getItem('welcomeGreetingShown')) return;

  const greetings = {
    morning:   { emoji: "☀️", text: "¡Buenos días! Bienvenido a Az InnovationX" },
    afternoon: { emoji: "🌟", text: "¡Buenas tardes! Bienvenido a Az InnovationX" },
    night:     { emoji: "🌙", text: "¡Buenas noches! Bienvenido a Az InnovationX" }
  };

  const hour = new Date().getHours();
  let greeting;
  if (hour >= 5 && hour < 12) greeting = greetings.morning;
  else if (hour >= 12 && hour < 19) greeting = greetings.afternoon;
  else greeting = greetings.night;

  // Create elements
  const container = document.createElement('div');
  container.id = 'greeting-card'; // Consistent with test expectation
  container.className = 'floating-greeting-card';

  container.innerHTML = `
    <button class="close-greeting" aria-label="Cerrar">&times;</button>
    <div class="greeting-content">
      <img src="https://i.ibb.co/gZLWHchp/a4b11b8d-45a9-4456-b035-c8f0bfe6133f.jpg" alt="Az InnovationX Logo" class="greeting-logo">
      <h3 class="dynamic-greeting">${greeting.emoji} ${greeting.text}</h3>
      <p class="greeting-subtitle">Transformamos tu visión en realidad digital 🚀</p>
      <div class="greeting-ctas">
        <a href="#servicios" class="greeting-btn primary">Ver Servicios →</a>
        <button class="greeting-btn secondary" id="open-chat-from-greeting">Hablar con nosotros</button>
      </div>
    </div>
    <div class="greeting-progress-bar"></div>
  `;

  document.body.appendChild(container);

  // Behavior
  setTimeout(() => {
    container.classList.add('visible');
  }, 1500);

  const closeGreeting = () => {
    container.classList.remove('visible');
    container.classList.add('closing');
    sessionStorage.setItem('welcomeGreetingShown', 'true');
    setTimeout(() => {
      if (container.parentNode) container.remove();
    }, 600);
  };

  // Auto-close after 5s
  const autoCloseTimeout = setTimeout(closeGreeting, 6500); // 1.5s delay + 5s progress

  container.querySelector('.close-greeting').onclick = () => {
    clearTimeout(autoCloseTimeout);
    closeGreeting();
  };

  container.querySelector('.primary').onclick = () => {
    clearTimeout(autoCloseTimeout);
    closeGreeting();
  };

  const chatBtn = container.querySelector('#open-chat-from-greeting');
  if (chatBtn) {
    chatBtn.onclick = () => {
      clearTimeout(autoCloseTimeout);
      closeGreeting();
      // Assuming openChatbot is accessible globally or trigger the toggle
      const toggle = document.getElementById('chatbot-toggle');
      if (toggle) toggle.click();
    };
  }
});
