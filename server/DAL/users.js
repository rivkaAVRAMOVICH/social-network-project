// const db = require('.../db'); // חיבור למסד הנתונים
const db = require('../../db/connection');

async function addUser(user) {
  const { HashedPassword, name, email, address, phone } = user;
  // שלב 1: הוספת המשתמש
  const [result] = await db.query(
    `INSERT INTO myappdb.users (name, email, address, phone) VALUES (?, ?, ?, ?)`,
    [name, email, address, phone]
  );

  const userId = result.insertId; // מזהה המשתמש החדש
  // שלב 3: שמירת הסיסמה בטבלת user_passwords
  await db.query(
    `INSERT INTO myappdb.passwords (user_id, password_hash) VALUES (?, ?)`,
    [userId, HashedPassword]
  );

  return userId;
}


async function getUserByName(name) {
  const [rows] = await db.query(
    `SELECT * FROM myappdb.users WHERE name = ?`,
    [name]
  );
  return rows[0];
}
async function getUserById(id) {
  const [rows] = await db.query(
    `SELECT * FROM myappdb.users WHERE id = ?`,
    [id]
  );
  return rows[0];
}
async function getUserPasswordById(id) {
  const [rows] = await db.query(
    `SELECT * FROM myappdb.passwords WHERE user_id = ?`,
    [id]
  );
  return rows[0];
}

async function getAllUsers() {
  const [rows] = await db.query(
    `SELECT * FROM myappdb.users`
  );

  return rows;
}

async function updateUser(user) {
  const { id, name, email, address, phone } = user;
  const [result] = await db.query(
    `UPDATE myappdb.users SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?`,
    [name, email, address, phone, id]
  );
  return result.affectedRows > 0;
}

async function deleteUser(id) {
  const [result] = await db.query(
    `DELETE FROM myappdb.users WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = {
  addUser,
  getUserByName,
  getUserById,
  getUserPasswordById,
  getAllUsers,
  updateUser,
  deleteUser,
};
