const express = require('express');
const app = express();
const PORT=3001;

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

// שימוש בראוטר
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/', putRouter);
app.use('/', deleteRouter);

app.listen(PORT, () => {
  console.log('🚀 השרת רץ על http://localhost:3000');
});

module.exports={
    getController
}