How to best prevent "out of date" token bugs
1. Always Check and Refresh the Token
On app start: Always check if the current token is valid and up to date.
On permission change: If the user grants notification permission, get a new token.
On token refresh event: Listen for token refresh events and update your backend.
Example: Listen for token refresh
Firebase's messaging API provides an onTokenRefresh event (for web, you may need to re-request the token periodically or after certain events):
Apply
> Note: In the latest Firebase Web SDK, you should just call getToken again when you suspect the token may have changed.
2. Update the Token in Your Backend
Whenever you get a new token, send it to your backend and update the user's record. This ensures your backend always has the latest valid token.
3. Handle Token Errors Gracefully
If you get a "Requested entity was not found" error, it likely means the token is invalid or not registered. In this case:
Request a new token using getToken.
Update your backend with the new token.
4. Clean Up Old Tokens
If a token is no longer valid, remove it from your backend to avoid sending notifications to invalid tokens.
How to Apply This in Your Code
In your FirebaseProvider:
After calling getFirebaseToken, always update your backend with the new token.
If you get an error when sending notifications, try to refresh the token and update the backend.
Example Fix
Update your getFirebaseToken usage to always get the latest token and update the backend:
Apply
This ensures you always have the latest token and your backend is updated.
Summary Checklist
[x] Always get the latest token on app start and after permission changes.
[x] Update your backend with the new token.
[x] Listen for token refresh events (if available).
[x] Handle token errors by refreshing and updating.
[x] Remove invalid tokens from your backend.