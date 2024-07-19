importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');


// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyD4kPTTjC5c5ZtNmmKnQGKHOKO5gsk6dbI",
  authDomain: "maibro.firebaseapp.com",
  projectId: "maibro",
  storageBucket: "maibro.appspot.com",
  messagingSenderId: "627669864890",
  appId: "1:627669864890:web:19dcdcbe7df79b7c1b8d83",
  measurementId: "G-X7CLMEKLRQ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});