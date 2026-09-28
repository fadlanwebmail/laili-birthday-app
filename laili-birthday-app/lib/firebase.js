const { cert, getApp, getApps, initializeApp } = require('firebase-admin/app');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountJson) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is required.');
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountJson);
} catch (error) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT must contain valid JSON.', { cause: error });
}

const app = getApps().length
  ? getApp()
  : initializeApp({ credential: cert(serviceAccount) });

module.exports = {
  db: getFirestore(app),
  FieldValue,
};