// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDf5Dj-8-hxW_V43d48w_nhS6dVTlCgAxc",
  authDomain: "demofcm-8456c.firebaseapp.com",
  projectId: "demofcm-8456c",
  storageBucket: "demofcm-8456c.firebasestorage.app",
  messagingSenderId: "394269439557",
  appId: "1:394269439557:web:48f7be8719a2a4f8aa152c",
};

const app = initializeApp(firebaseConfig);

let messaging: Messaging | null = null;

if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export { messaging };