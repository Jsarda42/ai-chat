// src/lib/firebaseAdmin.ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const privateKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64!,
  "base64"
).toString("utf8");

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      })
    : getApps()[0];

export const db = getFirestore(app);
