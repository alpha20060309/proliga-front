import { initializeApp, cert, getApps } from "firebase-admin/app";

const serviceAccount = JSON.parse(
  // eslint-disable-next-line no-undef
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
)

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

export { initializeFirebaseAdmin };
