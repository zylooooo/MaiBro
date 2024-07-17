// Import the Firebase scripts using ES module syntax
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getMessaging, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-sw.js';

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
const firebaseApp = initializeApp({
  apiKey: "AIzaSyD4kPTTjC5c5ZtNmmKnQGKHOKO5gsk6dbI",
  authDomain: "maibro.firebaseapp.com",
  projectId: "maibro",
  storageBucket: "maibro.appspot.com",
  messagingSenderId: "627669864890",
  appId: "1:627669864890:web:19dcdcbe7df79b7c1b8d83",
  measurementId: "G-X7CLMEKLRQ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});