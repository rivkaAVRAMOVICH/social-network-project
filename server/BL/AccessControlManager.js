const jwt = require('jsonwebtoken');
const dal = require('../DAL/dal');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const secret = process.env.TOKEN_SECRET;

async function login(myuser) {
  const { name, password } = myuser;

  try {
    const user = await dal.getByField("users", name, "name");
    if (!user) throw new Error('User not found');
    const userPassword = await dal.getByField("passwords",user.id,"user_id");
    const match = await bcrypt.compare(password, userPassword.password_hash);
  
    if (!match) throw new Error('Invalid password');
 
 
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '48h'
  });
    return { user, token };
  } catch (error) {
    console.error('Password comparison error:', error.message);
  }

}
async function register({ name, email, password, address, phone }) {
  const existingUser = await dal.getByField("users", name, "name");
  if (existingUser) throw new Error('User already exists');
  const HashedPassword = await bcrypt.hash(password, 10);
  try {
      const userId = await dal.insert("users",{
    name,
    email,
    address,
    phone,
  });
if(!userId){
 throw new Error('Faild insert new user'); 
}
 await dal.insert("passwords",{userId,HashedPassword})
  } catch (error) {
    console.error("error", error.message);
  }
  

  const token = jwt.sign({ id: userId, email: email }, secret, {
    expiresIn: '48h',
  });

  return { userId, token };
}
module.exports = { login, register };