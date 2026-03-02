/**
 * Contact Form and Firebase Logic (Task 4)
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const textarea = document.getElementById('mensaje');
  const charCount = document.getElementById('char-count');
  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = len;
      charCount.style.color = len > 450
        ? '#ef4444' : 'rgba(255,255,255,0.5)';
      if (len > 500) textarea.value = textarea.value.substring(0, 500);
    });
  }

  form.querySelectorAll(
    'input[required], select[required], textarea[required]'
  ).forEach(field => {
    field.addEventListener('blur', () => {
      if (field.value.trim()) {
        field.classList.add('valid');
        field.classList.remove('invalid');
      } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form._honeypot && form._honeypot.value) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');

    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'flex';
    submitBtn.disabled = true;

    try {
      // Access global db instance initialized in Firebase config
      if (typeof db !== 'undefined') {
        await db.collection('contactos').add({
          nombre: document.getElementById('nombre').value,
          empresa: document.getElementById('empresa').value,
          email: document.getElementById('email').value,
          telefono: document.getElementById('telefono').value,
          servicio: document.getElementById('servicio').value,
          presupuesto: document.getElementById('presupuesto').value,
          mensaje: document.getElementById('mensaje').value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
        if (charCount) charCount.textContent = '0';
      } else {
          throw new Error("Firebase DB not initialized");
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      if (errorMsg) {
          errorMsg.style.display = 'block';
          setTimeout(() => { errorMsg.style.display = 'none'; }, 5000);
      }
    } finally {
      if (btnText) btnText.style.display = 'block';
      if (btnLoading) btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
});

// Firebase Initialization
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
}
