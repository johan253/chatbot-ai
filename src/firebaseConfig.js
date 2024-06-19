import { initializeApp } from "firebase/app";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "chatbot-ai-0.firebaseapp.com",
  projectId: "chatbot-ai-0",
  storageBucket: "chatbot-ai-0.appspot.com",
  messagingSenderId: "896354614866",
  appId: "1:896354614866:web:c9e617e83783bcddc4a98b",
  measurementId: "G-4ZN09BM4H7"
};

const app = initializeApp(firebaseConfig);

export default app;
