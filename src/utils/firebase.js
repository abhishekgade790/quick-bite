import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCiX7ubzjQzUOkNtOU5YtPWjkfgrLgKYY8",
  authDomain: "quike-bite.firebaseapp.com",
  projectId: "quike-bite",
  storageBucket: "quike-bite.firebasestorage.app",
  messagingSenderId: "913137987201",
  appId: "1:913137987201:web:49dbab372caaf679bfa780",
  measurementId: "G-FCC0QWND7R",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
