// Vercel/Netlify-style serverless function. Set IMAGEKIT_PRIVATE_KEY in your host's env vars.
// Then in index.html set IK.publicKey and IK.authEndpoint = '/api/imagekit-auth'.
const crypto = require('crypto');
module.exports = (req, res) => {
  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 2400;
  const signature = crypto.createHmac('sha1', process.env.IMAGEKIT_PRIVATE_KEY).update(token + expire).digest('hex');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ token, expire, signature });
};
