const dal = require('../DAL/dal');

async function add(post){
    try {
        return dal.insert("posts",post)
    } catch (error) {
        throw new Error('add post faild:'+ error);
    }
}
async function getById(id){
    try {
        return dal.getByField("posts",id)
    } catch (error) {
        throw new Error('get content post faild:'+ error);
    }
}
async function merge(id, updateData) {
const existingItem = await dal.getByField("posts",id);
if (!existingItem) throw new Error('Entity not found');
const mergedItem = { ...existingItem, ...updateData };
const updated = await dal.updateById("posts",id, mergedItem);
return updated;
}
async function getAll(){
    try {
        return dal.getAll("posts")
    } catch (error) {
        throw new Error('get all post faild:'+ error);
    }
}
async function update(id, post) {
    try {
        return dal.updateById("posts",id, post) 
    } catch (error) {
        throw new Error('update post faild:'+ error);
    }
}
async function deleteById(id){
    try {
        return dal.softDeleteById("posts",id)
    } catch (error) {
        throw new Error('delet post faild:'+ error);
    }
}
async function deleteAll(user_id){
    try {
        return dal.softDeleteAll("posts",{user_id:user_id})
    } catch (error) {
        throw new Error('delet all posts faild:'+ error);
    }
}
module.exports = {
    add,
    getById,
    getAll,
    merge,
    update,
    deleteById,
    deleteAll
};