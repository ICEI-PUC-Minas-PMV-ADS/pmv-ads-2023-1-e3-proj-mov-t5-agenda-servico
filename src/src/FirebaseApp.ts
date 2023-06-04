import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYWbAZbh-UaEEYNXgJxfXv25gI59Siwyw',
  authDomain: 'projeto-agenda-72b31.firebaseapp.com',
  projectId: 'projeto-agenda-72b31',
  storageBucket: 'projeto-agenda-72b31.appspot.com',
  messagingSenderId: '1044670167757',
  appId: '1:1044670167757:web:0a643d96b3ce921569c784',
  databaseURL: 'https://projeto-agenda-72b31-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const database = getDatabase(firebase);

export const getToken = (callback: (token: string) => void) => {
}