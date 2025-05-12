const express = require('express');
const app = express();
const PORT = 3001;
const cors=require('cors')

const authenticateToken = require('./middleware');

app.use(cors({
  origin: 'http://localhost:5173',  // הדומיין שמהם ניתן לבצע בקשות
  credentials: true  // מאפשר לשלוח ולקבל עוגיות
}));

const getRouter = require('./routes/getRouter');
const postRouter = require('./routes/postRouter');
const putRouter = require('./routes/putRouter');
const deleteRouter = require('./routes/deleteRouter');
const patchRouter = require('./routes/patchRouter');
const authRouter = require('./routes/authRouter');


app.use(express.json());
app.use('/', authRouter);
app.use(authenticateToken);
app.use('/', postRouter); 
app.use('/', getRouter);
app.use('/', putRouter);
app.use('/', deleteRouter);
app.use('/',patchRouter )

app.listen(PORT, () => {
  console.log('🚀 השרת רץ על http://localhost:3001');
});


