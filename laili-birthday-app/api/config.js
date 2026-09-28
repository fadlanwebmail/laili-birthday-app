const DEFAULTS = {
  nama: 'Laili',
  pesan:
    'Jadi guru itu kayak nyalain lampu buat orang lain, sering kali sampai lupa kalau cahayanya juga buat diri sendiri. Gue cuma pengen bilang, makasih ya udah bertahan dan berjuang sejauh ini. Semoga di umur baru ini lo ketemu orang-orang yang bikin hati tenang, dijauhin dari yang bikin capek, dan dikasih keberhasilan yang pantas buat semua perjuangan lo. Percaya sama diri lo ya, Laili. Lo bisa sampai sini karena lo memang mampu.',
};

// GET /api/config -> teks ucapan, diambil dari Firestore: birthday/config
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).end();
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) return res.status(200).json(DEFAULTS);
  try {
    const { db } = require('../lib/firebase');
    const snap = await db.collection('birthday').doc('config').get();
    const data = snap.exists ? snap.data() : {};
    const out = {};
    for (const k of Object.keys(DEFAULTS)) {
      out[k] = typeof data[k] === 'string' && data[k].trim() ? data[k] : DEFAULTS[k];
    }
    return res.status(200).json(out);
  } catch (e) {
    return res.status(200).json(DEFAULTS);
  }
};
