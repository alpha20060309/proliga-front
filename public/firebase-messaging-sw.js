/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Using environment variables is not possible in service workers
// so we need to use hardcoded values that match the ones in firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyA8TSa7hv25LtomigQekCxixYXLH8k4zBk",
  authDomain: "proligauz-a294e.firebaseapp.com",
  projectId: "proligauz-a294e",
  storageBucket: "proligauz-a294e.firebasestorage.app",
  messagingSenderId: "892756456327",
  appId: "1:892756456327:web:e3784f6a6ee90b242a9922",
  measurementId: "G-V9T9SPRXYJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Log when the service worker is installed and activated
self.addEventListener('install', event => {
  console.log('[firebase-messaging-sw.js] Service Worker installed');
});

self.addEventListener('activate', event => {
  console.log('[firebase-messaging-sw.js] Service Worker activated');
});

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Extract notification details
  let notificationTitle = 'New Notification';
  let notificationBody = '';
  let notificationImage = '/favicon.png';
  
  // Check for the notification format (Firebase console vs custom)
  if (payload.notification) {
    // Standard Firebase notification format
    notificationTitle = payload.notification.title || notificationTitle;
    notificationBody = payload.notification.body || notificationBody;
    notificationImage = payload.notification.image || notificationImage;
  } else if (payload.data) {
    // Custom data format
    notificationTitle = payload.data.title || notificationTitle;
    notificationBody = payload.data.body || notificationBody;
    notificationImage = payload.data.image || notificationImage;
  }

  const notificationOptions = {
    body: notificationBody,
    icon: notificationImage,
    badge: "/favicon.png",
    data: payload.data || {},
    // Adding tag to prevent duplicate notifications
    tag: payload.data?.id || Date.now().toString(),
    // Make notification vibrate and appear more prominent
    vibrate: [100, 50, 100],
    requireInteraction: true
  };

  console.log("[firebase-messaging-sw.js] Showing notification:", notificationTitle, notificationOptions);

  // Return the promise to ensure the service worker stays active until notification is shown
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked', event);
  event.notification.close();

  // Add custom click behavior if needed
  const clickUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // If a window client is already open, focus it
      for (const client of windowClients) {
        if (client.url === clickUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow(clickUrl);
      }
    })
  );
});
