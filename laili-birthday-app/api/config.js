const { db } = require('../lib/firebase');

const DEFAULTS = {
  nama: 'Laili',
  dari: '— dari seseorang yang senang lihat kamu ngopi',
  pesan:
    'Semoga umur barumu penuh kopi yang enak, hari yang ringan, dan orang-orang yang bikin kamu tenang. Terima kasih sudah jadi kamu.',
};

// GET /api/config -> teks ucapan, diambil dari Firestore: birthday/config
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const snap = await db.collection('birthday').doc('config').get();
    const data = snap.exists ? snap.data() : {};
    const out = {};
    for (const k of Object.keys(DEFAULTS)) {
      out[k] = typeof data[k] === 'string' && data[k].trim() ? data[k] : DEFAULTS[k];
    }
    return res.status(200).json(out);
  } catch (e) {
    console.error(e);
    return res.status(200).json(DEFAULTS);
  }
};
