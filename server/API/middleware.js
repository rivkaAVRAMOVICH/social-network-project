const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const secret = process.env.TOKEN_SECRET;

function authenticateToken(req, res, next) {
  const openPaths = ['/login', '/register'];
  if (openPaths.includes(req.path)) {
    return next();
  }
  const authHeader = req.headers['authorization'];
  console.log(authHeader);

  
  const token = authHeader && authHeader.split(' ')[1];
  console.log("SECRET", secret);
console.log("TOKEN", token);
  if (!token) return res.status(401).json({ message: 'אין טוקן' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'טוקן לא תקין' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

