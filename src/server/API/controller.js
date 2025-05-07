const express = require('express');
const app = express();
const PORT = 3001;

const authenticateToken = require('./middleware/authMiddleware');

function getController(table) {
  try {
    return require(`.../BL/${table}Manager.js`);
  } catch (err) {
    return null;
  }
}

const getRouter = require('./routes/getRouter');
const postRouter = require('./routes/postRouter');
const putRouter = require('./routes/putRouter');
const deleteRouter = require('./routes/deleteRouter');

app.use(express.json());

// 🛡️ הגנה על ראוטרים
app.use('/login', postRouter);
app.use('/register', postRouter);
app.use('/', authenticateToken, postRouter); 
app.use('/', authenticateToken, getRouter);
app.use('/', authenticateToken, putRouter);
app.use('/', authenticateToken, deleteRouter);

app.listen(PORT, () => {
  console.log('🚀 השרת רץ על http://localhost:3001');
});

module.exports = {
  getController
};
