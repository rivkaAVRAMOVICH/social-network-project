const jwt = require('jsonwebtoken');
const dal = require('../DAL/dal');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const accessSecret = process.env.TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;



function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, accessSecret, { expiresIn: '50m' });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, refreshSecret, { expiresIn: '7d' });
}


async function login(myuser) {
  const { name, password } = myuser;

  try {
    const user = await dal.getByField("users", name, "name");
    if (!user) throw new Error('User not found');
    const userPassword = await dal.getByField("passwords",user.id,"user_id");
    const match = await bcrypt.compare(password, userPassword.password_hash);
    if (!match) throw new Error('Invalid password');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken };
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
  
  const user = { id: userId, email };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { userId, accessToken, refreshToken };
}
module.exports = { login, register };