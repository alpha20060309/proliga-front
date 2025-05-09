// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyA8TSa7hv25LtomigQekCxixYXLH8k4zBk",
  authDomain: "proligauz-a294e.firebaseapp.com",
  projectId: "proligauz-a294e",
  storageBucket: "proligauz-a294e.firebasestorage.app",
  messagingSenderId: "892756456327",
  appId: "1:892756456327:web:e3784f6a6ee90b242a9922",
  measurementId: "G-V9T9SPRXYJ",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./favicon.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
