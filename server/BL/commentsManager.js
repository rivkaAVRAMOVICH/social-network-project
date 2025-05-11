const commentsDal = require('../DAL/comments');

async function add(comment) {
    try {
        return commentsDal.addComment(comment);
    } catch (error) {
        throw new Error("add comment faild:" + error);
    }
}
async function getById(id) {
    try {
        return commentsDal.getCommentById(id);
    } catch (error) {
        throw new Error("get comment faild:" + error);
    }
}
async function getAll(post_id) {
    try {
        return commentsDal.getAllcomments(post_id);
    } catch (error) {
        throw new Error("get all comments faild:" + error);
    }
}
async function update(id, comment) {
    try {
        return commentsDal.updateComment(id, comment);
    } catch (error) {
        throw new Error("update comment faild:" + error);
    }
}
async function deleteById(id) {
     console.log(id);
    try {
        return commentsDal.deleteComment(id);
    } catch (error) {
        throw new Error("delete comment faild:" + error);
    }
}
module.exports = {
    add,
    getById,
    getAll,
    update,
    deleteById
};
