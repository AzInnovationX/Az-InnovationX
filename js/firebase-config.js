const firebaseConfig = {
    apiKey: "AIzaSyDyk6XjQ72k73oza9fkkUxup9GQvDsFT5o",
    authDomain: "weatherwise-aywzg.firebaseapp.com",
    projectId: "weatherwise-aywzg",
    storageBucket: "weatherwise-aywzg.firebasestorage.app",
    messagingSenderId: "699516071771",
    appId: "1:699516071771:web:5a84dcf771b1ee5c38b47e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
window.db = db;
