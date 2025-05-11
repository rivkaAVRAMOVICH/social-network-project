const express = require('express');
const app = express();
const PORT = 3001;
const cors=require('cors')

const authenticateToken = require('./middleware');

app.use(cors());
const getRouter = require('./routes/getRouter');
const postRouter = require('./routes/postRouter');
const putRouter = require('./routes/putRouter');
const deleteRouter = require('./routes/deleteRouter');
const patchRouter = require('./routes/patchRouter');

app.use(express.json());
app.use(authenticateToken);
app.use('/', postRouter); 
app.use('/', getRouter);
app.use('/', putRouter);
app.use('/', deleteRouter);
app.use('/',patchRouter )

app.listen(PORT, () => {
  console.log('🚀 השרת רץ על http://localhost:3001');
});


