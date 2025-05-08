import { initializeApp, cert, getApps } from "firebase-admin/app";
import serviceAccount from '../../firebase.json';

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    try {
      initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (error) {
      console.error("Failed to initialize Firebase Admin:", error);
    }
  }
}

export { initializeFirebaseAdmin };