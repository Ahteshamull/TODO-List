import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAbeK2Uv93OxzE97UdJU3KSZtO6ZAmJBvw",
  authDomain: "crud-dcc03.firebaseapp.com",
  databaseURL: "https://crud-dcc03-default-rtdb.firebaseio.com",
  projectId: "crud-dcc03",
  storageBucket: "crud-dcc03.appspot.com",
  messagingSenderId: "877197867622",
  appId: "1:877197867622:web:e485083985504886350ba7",
};

const app = initializeApp(firebaseConfig);
export default firebaseConfig;
