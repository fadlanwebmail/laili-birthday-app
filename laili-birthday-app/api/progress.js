const QUESTS = ['n', 'c', 't', 's', 'b', 'y', 'm'];

// GET  /api/progress -> progres tersimpan
// POST /api/progress -> simpan progres (misi, barang, kotak, selesai)
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).end();
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return req.method === 'GET'
      ? res.status(200).json({ available: false })
      : res.status(200).json({ ok: true, localOnly: true });
  }
  try {
    const { db, FieldValue } = require('../lib/firebase');
    const ref = db.collection('birthday').doc('progress');

    if (req.method === 'GET') {
      const snap = await ref.get();
      return res.status(200).json(snap.exists ? snap.data() : {});
    }

    if (req.method === 'POST') {
      const b = req.body || {};
      const Q = {};
      QUESTS.forEach((k) => (Q[k] = b.Q && b.Q[k] ? 1 : 0));
      const A = {};
      QUESTS.forEach((k) => (A[k] = b.A && b.A[k] ? 1 : 0));
      const items = Array.isArray(b.items) ? b.items.slice(0, 3).map(Boolean) : [];

      const snap = await ref.get();
      const prev = snap.exists ? snap.data() : {};

      const data = {
        Q,
        A,
        items,
        boxOn: !!b.boxOn,
        boxOpen: !!b.boxOpen,
        ended: !!b.ended,
        updatedAt: FieldValue.serverTimestamp(),
      };
      if (!prev.startedAt) data.startedAt = FieldValue.serverTimestamp();
      if (b.ended && !prev.finishedAt) data.finishedAt = FieldValue.serverTimestamp();

      await ref.set(data, { merge: true });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).end();
  } catch (e) {
    return res.status(500).json({ error: 'server_error' });
  }
};
