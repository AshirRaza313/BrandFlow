// #AS KHUSHBOO — Service Worker with Push Notifications
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC-zZILQ1BHa1IufQ7YbKHYuQiEriUlm0A",
  authDomain: "as-khushboo-os.firebaseapp.com",
  projectId: "as-khushboo-os",
  storageBucket: "as-khushboo-os.firebasestorage.app",
  messagingSenderId: "1048209793662",
  appId: "1:1048209793662:web:bbe45759ba128202132e2f"
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background message:', payload);

  const { title, body, icon, badge, data } = payload.notification || {};

  const notificationOptions = {
    body: body || 'AS KHUSHBOO Brand OS',
    icon: icon || '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: data?.tag || 'askhushboo',
    renotify: true,
    data: data || {},
    actions: data?.actions || [],
  };

  self.registration.showNotification(
    title || '#AS KHUSHBOO',
    notificationOptions
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Install & Activate
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
