const db = require('../../db/connection');

async function addComment(comment) {
    const { user_id, post_id, content } = comment;
    const [result] = await db.query(
        `INSERT INTO myappdb.comments (user_id, post_id , content) VALUES (?,?, ?)`,
        [user_id, post_id, content]
    );
    return result.insertId;
}
async function getCommentById(post_id) {
    const [rows] = await db.query(
        `SELECT * FROM myappdb.comments WHERE post_id=?`, [post_id]
    );
    return rows;
}
async function getAllcomments(post_id) {
    const [rows] = await db.query(
        `SELECT * FROM myappdb.comments WHERE post_id=?`, [post_id]
    );
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
