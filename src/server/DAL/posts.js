const db  = require('../../db/connection');
async function addPost(post) {
  const { user_id, title, content } = post;
  const [result] = await db.query(
    `INSERT INTO myappdb.posts (user_id, title , content) VALUES (?,?, ?)`,
    [user_id, title, content]
  );
  return result.insertId;
}
async function getContentPostById(id) {
  const [rows] = await db.query(
    `SELECT * FROM myappdb.posts WHERE id = ?`,
    [id]
  );
  console.log(JSON.stringify(rows[0]));
  return rows[0];
}
async function getAllPosts() {
  const [rows] = await db.query(
    `SELECT id, user_id, title FROM myappdb.posts`
  );
  console.log(JSON.stringify(rows));
  return rows;
}
async function updatePost(id, post) {
  const { title, content } = post;
  const [result] = await db.query(
    `UPDATE myappdb.posts SET title  = ?, content = ? WHERE id = ?`,
    [title, content, id]
  );
  return result.affectedRows > 0;
}
async function deletePost(id) {
  const [result] = await db.query(
    `DELETE FROM myappdb.posts WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}
async function deleteAllPost(user_id) {
    const [result] = await db.query(
      `DELETE FROM myappdb.posts WHERE user_id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
  
module.exports = {
  addPost,
  getContentPostById,
  getAllPosts,
  updatePost,
  deletePost,
  deleteAllPost
};
var post={
    user_id: 123,
    title:"rcev555",
    content:"cdfhjjvghmghhngfxdcgvhbj555"
}
addPost(post);
