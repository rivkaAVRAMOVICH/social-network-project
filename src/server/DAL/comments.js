const db = require('../../db/connection');
async function addComment(comment) {
    const { user_id, post_id, content } = comment;
    const [result] = await db.query(
        `INSERT INTO myappdb.comments (user_id, post_id , content) VALUES (?,?, ?)`,
        [user_id, post_id, content]
    );
    return result.insertId;
}

async function getCommentById(id) {
    const [rows] = await db.query(
        `SELECT * FROM myappdb.comments WHERE id = ?`,
        [id]
    );
    console.log(JSON.stringify(rows[0]));
    return rows[0];
}
async function getAllcomments(post_id) {
    const [rows] = await db.query(
        `SELECT * FROM myappdb.comments WHERE post_id=?`, [post_id]
    );
    console.log(JSON.stringify(rows));
    return rows;
}

async function updateComment(id, comment) {
    const { content } = comment;
    const [result] = await db.query(
        `UPDATE myappdb.comments SET content = ? WHERE id = ?`,
        [content, id]
    );
    return result.affectedRows > 0;
}

async function deleteComment(id) {
    const [result] = await db.query(
        `DELETE FROM myappdb.comments WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
}

module.exports = {
    addComment,
    getCommentById,
    getAllcomments,
    updateComment,
    deleteComment
};
comment = {
    user_id: 215639212,
    post_id: 2,
    content: "12"
}
updateComment(1, comment)