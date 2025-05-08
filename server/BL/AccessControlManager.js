const jwt = require('jsonwebtoken');
const usersDAL = require('../DAL/users');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const secret = process.env.TOKEN_SECRET;

async function login(myuser) {
  console.log(secret);
  const { name,password} = myuser;
  const user = await usersDAL.getUserByName(name);
  if (!user) throw new Error('User not found');
  
const userPassword=await usersDAL.getUserPasswordById(user.id);

const HashedPassword=await bcrypt.hash(password, 10);
console.log(userPassword.password_hash);
// if(userPassword.password_hash!=HashedPassword){
//   throw new Error('Invalid password');
// }
  const match = await bcrypt.compare(password, userPassword.password_hash);
  if (!match) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '48h'
  });
  return token;
}
async function register({ name, email, password,address,phone }) {
  // בדוק אם המשתמש כבר קיים
  const existingUser = await usersDAL.getUserByName(name);
  if (existingUser) throw new Error('User already exists');

  // הצפן את הסיסמה עם salt rounds = 10
  const HashedPassword = await bcrypt.hash(password, 10);
  // צור את המשתמש במסד הנתונים
  const newUser = await usersDAL.addUser({
    HashedPassword,
    name,
    email,
    address,
    phone,
  });

  // צור טוקן לאחר הרשמה
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret, {
    expiresIn: '48h',
  });

  return token;
}





module.exports = { login,register };