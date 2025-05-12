const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const accessSecret = process.env.TOKEN_SECRET;

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'לא סופק רפרש טוקן' });

  jwt.verify(refreshToken, refreshSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'רפרש טוקן לא תקין' });

    const accessToken = jwt.sign({ id: user.id, email: user.email }, accessSecret, { expiresIn: '15m' });
    res.json({ accessToken });
  });
});

module.exports = router;
