import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  signInAnonymously,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Use the Firebase configuration from environment variables defined in vite.config.ts
const firebaseConfig = process.env.FIREBASE_CONFIG || {};

// Initialize Firebase
const app = initializeApp(firebaseConfig as any);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Connection test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInAsGuest = () => signInAnonymously(auth);
export { RecaptchaVerifier, signInWithPhoneNumber };
export const logout = () => signOut(auth);
