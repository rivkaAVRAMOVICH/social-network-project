const postsDAL = require('../DAL/posts');

async function add(post){
    try {
        return postsDAL.addPost(post)
    } catch (error) {
        throw new Error('add post faild:'+ error);
    }
}
async function getById(id){
    try {
        return postsDAL.getContentPostById(post)
    } catch (error) {
        throw new Error('get content post faild:'+ error);
    }
}
async function getAll(){
    try {
        return postsDAL.getAllPosts()
    } catch (error) {
        throw new Error('get all post faild:'+ error);
    }
}
async function update(id, post) {
    try {
        return postsDAL.updatePost(id, post) 
    } catch (error) {
        throw new Error('update post faild:'+ error);
    }
}
async function deleteById(id){
    try {
        return postsDAL.deletePost(id)
    } catch (error) {
        throw new Error('delet post faild:'+ error);
    }
}
async function deleteAll(user_id){
    try {
        return postsDAL.deleteAllPost(user_id)
    } catch (error) {
        throw new Error('delet all posts faild:'+ error);
    }
}
module.exports = {
    add,
    getById,
    getAll,
    update,
    deleteById,
    deleteAll
};