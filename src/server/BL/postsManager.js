const postsDAL = require('../DAL/posts');

async function addPost(post){
    try {
        return postsDAL.addPost(post)
    } catch (error) {
        throw new Error('add post faild:'+ error);
    }
}
async function getContentPostById(id){
    try {
        return postsDAL.getContentPostById(post)
    } catch (error) {
        throw new Error('get content post faild:'+ error);
    }
}
async function getAllPosts(){
    try {
        return postsDAL.getAllPosts()
    } catch (error) {
        throw new Error('get all post faild:'+ error);
    }
}
async function updatePost(id, post) {
    try {
        return postsDAL.updatePost(id, post) 
    } catch (error) {
        throw new Error('update post faild:'+ error);
    }
}
async function deletePost(id){
    try {
        return postsDAL.deletePost(id)
    } catch (error) {
        throw new Error('delet post faild:'+ error);
    }
}
async function deleteAllPost(user_id){
    try {
        return postsDAL.deleteAllPost(user_id)
    } catch (error) {
        throw new Error('delet all posts faild:'+ error);
    }
}