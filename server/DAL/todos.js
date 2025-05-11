const db = require('../../db/connection');

async function getAllTodos(user_id) {
  const [rows] = await db.query('SELECT * FROM myappdb.todos WHERE user_id = ?', [user_id]);
  return rows;
}
async function getTodoById(id) {
  const [rows] = await db.query('SELECT * FROM myappdb.todos  WHERE id = ?', [id]);
  //   console.log(JSON.stringify(rows[0]));
  return rows[0];
}
async function addTodo(todo) {
  const { user_id, title, completed = false } = todo;
  const [result] = await db.query(
    'INSERT INTO myappdb.todos  (user_id, title, completed) VALUES (?, ?, ?)',
    [user_id, title, completed]
  );
  return { id: result.insertId, ...todo };
}
async function updateTodo(id, todo) {
  const { title, completed, } = todo;
  const [result] = await db.query(
    `UPDATE myappdb.todos SET title = ?, completed = ? WHERE id = ?`,
    [title, completed, id]
  );


  return result.affectedRows > 0;
}
async function deleteTodo(id) {
  const [result] = await db.query('DELETE FROM myappdb.todos  WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
async function deleteAllTodos(user_id) {
  const [result] = await db.query('DELETE FROM myappdb.todos  WHERE user_id = ?', [user_id]);
  return result.affectedRows > 0;
}
module.exports = {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos
};