// const db = require('.../db'); // חיבור למסד הנתונים
const db  = require('../../db/connection');
async function addUser(user) {
  const {id, name, email, address, phon } = user;
  const [result] = await db.query(
    `INSERT INTO myappdb.users (id, name, email, address, phon) VALUES (?,?, ?, ?, ?)`,
    [id,name, email, address, phon]
  );
  return result.insertId;
}

async function getUserById(id) {
  const [rows] = await db.query(
    `SELECT * FROM myappdb.users WHERE id = ?`,
    [id]
  );
  console.log(JSON.stringify(rows[0]));
  return rows[0];
}
async function getUserPasswordById(id) {
    const [rows] = await db.query(
      `SELECT * FROM myappdb.passwords WHERE user_id = ?`,
      [id]
    );
    console.log(JSON.stringify(rows[0]));
    return rows[0];
  }
async function getAllUsers() {
  const [rows] = await db.query(
    `SELECT * FROM myappdb.users`
  );
  console.log(JSON.stringify(rows));
  return rows;
}

async function updateUser(id, user) {
  const { name, email, address, phon } = user;
  const [result] = await db.query(
    `UPDATE myappdb.users SET name = ?, email = ?, address = ?, phon = ? WHERE id = ?`,
    [name, email, address, phon, id]
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
  getUserById,
  getUserPasswordById,
  getAllUsers,
  updateUser,
  deleteUser,
};
// var user1={
//     id:222,
// name:'111',
// email:'111',
// address:'111',
// phon:'111'
// }
// addUser(user1);
// getUserById(123);
// getUserPasswordById(215639212);
// getAllUsers();
// updateUser(123, user1);
// deleteUser(222)