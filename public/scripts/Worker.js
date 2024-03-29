console.log('Service worker loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push recieved...');
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: `${location.origin}/img/android-chrome-192x192.png`,
    badge: `${location.origin}/img/Fc - logo.png`,
    silent: false,
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200],
  });
});

self.addEventListener('notificationclick', event => {
  console.log(location);

  const url =
    location.hostname === 'localhost'
      ? 'https://localhost:4000/home/sr'
      : 'https://flashcards-ashenfox.duckdns.org/home/sr';

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        includeUncontrolled: true,
        type: 'window',
      })
      .then(clientList => {
        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          if (client.url === url) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
