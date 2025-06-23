import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC4WYJITaj_UlYXARJ_kUeJud2WcJnh2JY",
	authDomain: "charging-station-16e63.firebaseapp.com",
	projectId: "charging-station-16e63",
	storageBucket: "charging-station-16e63.firebasestorage.app",
	messagingSenderId: "668360222372",
	appId: "1:668360222372:web:a3b11e4232572cd35ee831",
	measurementId: "G-RC4KW63TYW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
