const jwt = require('jsonwebtoken');
const usersDAL = require('../DAL/users');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const secret = process.env.TOKEN_SECRET;

async function login({ name, password }) {
  const user = await usersDAL.getUserByName(name);
  if (!user) throw new Error('User not found');
const userPassword=await usersDAL.getUserPasswordById(user.id);
  const match = await bcrypt.compare(password, userPassword);
  if (!match) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '48h'
  });
  return token;
}

module.exports = { login };