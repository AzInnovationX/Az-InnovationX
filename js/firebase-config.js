// Firebase initialization (Template - needs user to fill in values)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Use a conditional to check if firebase is defined (as it is loaded via script tags)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
  }
});
