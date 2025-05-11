const jwt = require('jsonwebtoken');
const usersDAL = require('../DAL/users');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const secret = process.env.TOKEN_SECRET;

async function login(myuser) {
  const { name, password } = myuser;

  try {
    const user = await usersDAL.getUserByName(name);
    if (!user) throw new Error('User not found');
    const userPassword = await usersDAL.getUserPasswordById(user.id);
    const match = await bcrypt.compare(password, userPassword.password_hash);
  
    if (!match) throw new Error('Invalid password');
 
 
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '48h'
  });
    return { user, token };
  } catch (error) {
    console.error('❌ שגיאה בהשוואת סיסמה:', error.message);
  }

}
async function register({ name, email, password, address, phone }) {
  // בדוק אם המשתמש כבר קיים
  const existingUser = await usersDAL.getUserByName(name);
  if (existingUser) throw new Error('User already exists');
  // הצפן את הסיסמה עם salt rounds = 10
  const HashedPassword = await bcrypt.hash(password, 10);
  // צור את המשתמש במסד הנתונים
  const userId = await usersDAL.addUser({
    HashedPassword,
    name,
    email,
    address,
    phone,
  });

  // צור טוקן לאחר הרשמה
  const token = jwt.sign({ id: userId, email: email }, secret, {
    expiresIn: '48h',
  });

  return { userId, token };
}
module.exports = { login, register };