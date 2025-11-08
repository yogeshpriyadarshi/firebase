// public/firebase-messaging-sw.js

// ✅ Use importScripts to load Firebase libraries in service worker context
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

// ✅ Initialize Firebase (same config as your app)
firebase.initializeApp({
 apiKey: "AIzaSyAGVnS26MF2O1efBxMHkJ7KzimrI46K90M",
  authDomain: "phone-a7775.firebaseapp.com",
  projectId: "phone-a7775",
  storageBucket: "phone-a7775.firebasestorage.app",
  messagingSenderId: "253867636986",
  appId: "1:253867636986:web:3470343eb1817fbd49f143",
  measurementId: "G-CEQ1B60W80"
});

// ✅ Setup background notification handler
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Background message received:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png", // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
