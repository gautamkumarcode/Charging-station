import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

if (!process.env.REACT_APP_FIREBASE_API_KEY) {
	throw new Error(
		"Firebase API key is not defined. Please set REACT_APP_FIREBASE_API_KEY in your environment variables."
	);
}

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
