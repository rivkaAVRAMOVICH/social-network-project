const jwt = require('jsonwebtoken');
const usersDAL = require('../DAL/users');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const accessSecret = process.env.TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;



function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, accessSecret, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, refreshSecret, { expiresIn: '7d' });
}


async function login(myuser) {
  const { name, password } = myuser;

  try {
    const user = await usersDAL.getUserByName(name);
    if (!user) throw new Error('User not found');

    const userPassword = await usersDAL.getUserPasswordById(user.id);
    const match = await bcrypt.compare(password, userPassword.password_hash);
    if (!match) throw new Error('Invalid password');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.error('❌ שגיאה בהתחברות:', error.message);
    throw error;
  }
}

async function register({ name, email, password, address, phone }) {
  const existingUser = await usersDAL.getUserByName(name);
  if (existingUser) throw new Error('User already exists');

  const HashedPassword = await bcrypt.hash(password, 10);

  const userId = await usersDAL.addUser({
    HashedPassword,
    name,
    email,
    address,
    phone,
  });

  const user = { id: userId, email };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { userId, accessToken, refreshToken };
}
module.exports = { login, register };