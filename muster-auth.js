import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const app = getApps()[0] || initializeApp(window.MUSTER_FIREBASE_CONFIG);
export const auth = getAuth(app);

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signUp(email, password, displayName) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(cred.user, { displayName });
  return cred.user;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export function logOut() {
  return signOut(auth);
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function friendlyAuthError(err) {
  const map = {
    "auth/invalid-email": "That email address isn't valid.",
    "auth/missing-password": "Enter a password.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/invalid-credential": "Wrong email or password.",
    "auth/user-not-found": "Wrong email or password.",
    "auth/wrong-password": "Wrong email or password.",
    "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
    "auth/network-request-failed": "No connection. Check your network."
  };
  return map[err && err.code] || "Something went wrong. Try again.";
}
