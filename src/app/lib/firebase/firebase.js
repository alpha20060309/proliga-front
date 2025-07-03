import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
/* eslint-disable no-undef */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
}

function validateFirebaseConfig() {
  const { apiKey, authDomain, projectId, measurementId, storageBucket, appId } =
    firebaseConfig

  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !measurementId ||
    !storageBucket ||
    !appId
  ) {
    alert(`Missing Firebase config values`)
    throw new Error(`Missing Firebase config values`)
  }
}

let messaging

export async function initializeFirebase() {
  if (typeof window === 'undefined') return

  try {
    validateFirebaseConfig()
    const app = initializeApp(firebaseConfig)
    messaging = getMessaging(app)

    // await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    return app
  } catch (error) {
    console.error('Error initializing Firebase:', error)
  }
}

export async function getFirebaseToken() {
  if (!messaging) {
    throw new Error('Firebase messaging is not initialized')
  }

  try {
    // Check for service worker registration
    if (!('serviceWorker' in navigator)) {
      console.error('Service Workers are not supported in this browser')
      return null
    }
    const registration = await navigator.serviceWorker.ready

    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    })

    if (!currentToken) {
      console.log(
        'No registration token available. Request permission to generate one.'
      )
      return null
    }
    return currentToken
  } catch (error) {
    console.error('An error occurred while retrieving token:', error)
    throw error
  }
}

export async function subscribeToTopic(token, topic) {
  try {
    const response = await fetch('/api/push-notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, topic }),
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe to topic')
    }

    return await response.json()
  } catch (error) {
    console.error('Error subscribing to topic:', error)
    throw error
  }
}

export async function unsubscribeFromTopic(token, topic) {
  try {
    const response = await fetch('/api/push-notifications/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, topic }),
    })

    if (!response.ok) {
      throw new Error('Failed to unsubscribe from topic')
    }

    return await response.json()
  } catch (error) {
    console.error('Error unsubscribing from topic:', error)
    throw error
  }
}
