console.log("Service worker loaded");

self.addEventListener("push", e => {
  let data = {};

  try {
    data = e.data?.json();
  } catch (e) {
    console.error(e);
  }

  console.log("Push received...");

  self.registration.showNotification(data?.title || "Default title", {
    body: data?.body || "Default body",
    icon: `${location.origin}/img/dark/android-chrome/android-chrome-192x192.png`,
    badge: `${location.origin}/img/notification-logo.png`,
    silent: false,
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200],
  });
});

self.addEventListener("notificationclick", event => {
  console.log(location);

  const url =
    location.hostname === "localhost"
      ? "https://localhost:4000/home/sr"
      : "https://flashcards.ashenfox.top/home/sr";

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        includeUncontrolled: true,
        type: "window",
      })
      .then(clientList => {
        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          if (client.url === url) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      }),
  );
});
