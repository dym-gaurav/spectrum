// Returns the 10 most recent Event Cam uploads (that folder only). Needs IMAGEKIT_PRIVATE_KEY env var.
module.exports = async (req, res) => {
  try {
    const auth = 'Basic ' + Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ':').toString('base64');
    const url = 'https://api.imagekit.io/v1/files?type=file&sort=DESC_CREATED&limit=10&path=' + encodeURIComponent('/spectrum-event-cam');
    const r = await fetch(url, { headers: { Authorization: auth } });
    if (!r.ok) return res.status(502).json({ error: 'ImageKit request failed' });
    const files = await r.json();
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    res.status(200).json(files.map(f => ({ url: f.url, name: f.name, createdAt: f.createdAt })));
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};
