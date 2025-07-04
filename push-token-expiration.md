# Preventing Out-of-Date Firebase Push Tokens: Pro Guide

Keeping your push notification tokens fresh and valid is critical for reliable delivery. Here’s a professional checklist and implementation strategy to avoid “out of date” token bugs in your app.

---

## 1. **Always Check & Refresh the Token**

- **On App Start:**  
  Always retrieve and validate the current token when your app initializes.
- **On Permission Change:**  
  If the user grants notification permission, immediately request a new token.
- **On Token Refresh:**  
  Listen for token refresh events and update your backend accordingly.

> **Note:**  
> In the latest Firebase Web SDK, there is no `onTokenRefresh` event. Instead, call `getToken()` again whenever you suspect the token may have changed (e.g., after permission changes, app start, or periodically).

---

## 2. **Update the Token in Your Backend**

Whenever you obtain a new token, **immediately send it to your backend** and update the user’s record. This ensures your backend always has the latest valid token.

---

## 3. **Handle Token Errors Gracefully**

If you encounter errors such as `"Requested entity was not found"` when sending notifications, it likely means the token is invalid or unregistered.

**What to do:**
- Request a new token using `getToken()`.
- Update your backend with the new token.

---

## 4. **Clean Up Old Tokens**

Remove invalid or expired tokens from your backend to prevent sending notifications to dead endpoints.

---

## 🛠️ **How to Apply This in Your Code**

**In your `FirebaseProvider`:**
- After calling `getFirebaseToken`, always update your backend with the new token.
- If you get an error when sending notifications, refresh the token and update the backend.

**Example: Always Get and Sync the Latest Token**