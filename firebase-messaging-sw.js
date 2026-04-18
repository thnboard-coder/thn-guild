importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC2II3ydXUE2CRJWtYTx5yf0W4kxT8qgrs",
  authDomain: "thn-guild.firebaseapp.com",
  projectId: "thn-guild",
  storageBucket: "thn-guild.firebasestorage.app",
  messagingSenderId: "130528607870",
  appId: "1:130528607870:web:c0d477110c5a183270e22f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  if (payload.notification) {
    return;
  }

  return self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(clients){
    if(clients && clients.length > 0) return;
    
    const title = (payload.data && payload.data.title) || 'THN Guild';
    const body  = (payload.data && payload.data.body)  || '';

    return self.registration.showNotification(title, {
      body: body,
      icon: '/thn-guild/icon.png',
      badge: '/thn-guild/icon.png',
      vibrate: [300,100,300,100,300],
      requireInteraction: true,
      tag: 'thn-alert',
      renotify: true
    });
  });
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(clients.openWindow('/thn-guild/'));
});
