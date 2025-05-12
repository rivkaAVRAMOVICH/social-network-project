const dal = require('../DAL/dal');

async function add(comment) {
    try {
        return dal.insert("comments",comment);
        
    } catch (error) {
        throw new Error("add comment faild:" + error);
    }
}
async function merge(id, updateData) {
const existingItem = await dal.getByField("comments",id);
if (!existingItem) throw new Error('Entity not found');
const mergedItem = { ...existingItem, ...updateData };
const updated = await dal.updateById("comments",id, mergedItem);
return updated;
}
async function getById(id) {
    try {
        return dal.getByField("comments",id);
    } catch (error) {
        throw new Error("get comment faild:" + error);
    }
}
async function getAll(post_id) {
    try {
        return dal.getAll("comments",{post_id:post_id});
    } catch (error) {
        throw new Error("get all comments faild:" + error);
    }
}
async function update(id, comment) {
    try {
        return dal.updateById("comments",id, comment);
    } catch (error) {
        throw new Error("update comment faild:" + error);
    }
}
async function deleteById(id) {
    try {
        return dal.softDeleteById("comments",id);
    } catch (error) {
        throw new Error("delete comment faild:" + error);
    }
}
module.exports = {
    add,
    getById,
    getAll,
    update,
    deleteById,
    merge
};
