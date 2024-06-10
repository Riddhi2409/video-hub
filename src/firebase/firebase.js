import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAW7cbn0G2EQWKwkyB5XVNW5dylIA5oK3Q",
  authDomain: "video-streaming-platform-b3109.firebaseapp.com",
  projectId: "video-streaming-platform-b3109",
  storageBucket: "video-streaming-platform-b3109.appspot.com",
  messagingSenderId: "552814610749",
  appId: "1:552814610749:web:8ee6f040d0315fcbaf9d54",
  measurementId: "G-6PBNJD9LXP"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };