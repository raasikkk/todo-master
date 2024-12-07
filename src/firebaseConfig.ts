// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB76QUQ_Uhw38tLfYwDlzEsChuAsPP7u6Y",
  authDomain: "todo-redux-84dbc.firebaseapp.com",
  databaseURL: "https://todo-redux-84dbc-default-rtdb.firebaseio.com",
  projectId: "todo-redux-84dbc",
  storageBucket: "todo-redux-84dbc.firebasestorage.app",
  messagingSenderId: "665512905250",
  appId: "1:665512905250:web:74007fd86230accecb987b",
  measurementId: "G-67TQQ0W6DH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
