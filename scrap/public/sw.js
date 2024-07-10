console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  if (!(self.Notification && self.Notification.permission === "granted"))
    return;

  const data = e.data.json();
  const title = data.title || "Error in title";
  const body = data.body || "Error in body";
  // console.log("Push Recieved...");

  new Notification(title, {
    body: "Hello",
    tag: "Simple Notif",
  });

  // notif.addEventListener("click", () => {
  //   clients
  // })
  // self.registration.showNotification(data.title, {
  //   body: "Knock Knock",
  // });
});
