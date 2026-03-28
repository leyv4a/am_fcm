importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
apiKey: "AIzaSyDf5Dj-8-hxW_V43d48w_nhS6dVTlCgAxc",
  projectId: "demofcm-8456c",
  messagingSenderId: "394269439557",
  appId: "1:394269439557:web:48f7be8719a2a4f8aa152c"
});

const messaging = firebase.messaging();