import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQ_vcfNgdvHHNKcg6CfVRrjdZ1oe0iaTc",
  authDomain: "obb-site.firebaseapp.com",
  projectId: "obb-site",
  storageBucket: "obb-site.firebasestorage.app",
  messagingSenderId: "553948245496",
  appId: "1:553948245496:web:4f2d9d35360ee38cfcba0d",
  measurementId: "G-GFF7E9JXVD",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
