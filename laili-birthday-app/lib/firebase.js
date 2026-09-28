const admin = require('firebase-admin');

if (!admin.apps.length) {
  const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  // Beberapa cara paste env var mengubah newline jadi "\\n" literal
  sa.private_key = sa.private_key.replace(/\\n/g, '\n');
  admin.initializeApp({ credential: admin.credential.cert(sa) });
}

module.exports = {
  db: admin.firestore(),
  FieldValue: admin.firestore.FieldValue,
};
