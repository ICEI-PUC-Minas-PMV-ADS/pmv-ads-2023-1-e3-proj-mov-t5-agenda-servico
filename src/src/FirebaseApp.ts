import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYWbAZbh-UaEEYNXgJxfXv25gI59Siwyw",
  authDomain: "projeto-agenda-72b31.firebaseapp.com",
  projectId: "projeto-agenda-72b31",
  storageBucket: "projeto-agenda-72b31.appspot.com",
  messagingSenderId: "1044670167757",
  appId: "1:1044670167757:web:0a643d96b3ce921569c784"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);