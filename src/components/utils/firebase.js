import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDss-ip1FdZQsbsNh6f5wuPLpO6KbKizZc",
  authDomain: "taxiservice-3547e.firebaseapp.com",
  projectId: "taxiservice-3547e",
  storageBucket: "taxiservice-3547e.appspot.com",
  messagingSenderId: "457858425787",
  appId: "1:457858425787:web:8da39ff8653fea09591a9e",
  measurementId: "G-9JPF0FBBP5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);