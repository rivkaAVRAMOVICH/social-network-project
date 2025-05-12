const dal = require('../DAL/dal');

async function getAll(user_id) {
    try {
        return dal.getAll("todos",{user_id:user_id});
    } catch (error) {
        throw new Error("get all todos faild:" + error);
    }
}
async function getById(id) {
    try {
        return dal.getByField("todos",id);
    } catch (error) {
        throw new Error("get todo faild:" + error);

    }

}
async function add(todo) {
    try {
        return dal.insert("todos",todo)
    } catch (error) {
        throw new Error("add todo faild:" + error);

    }
}
async function update(id, todo) {
    try {
        return dal.updateById("todos",id, todo)
    } catch (error) {
        throw new Error("update todo faild:" + error);
    }
}
async function deleteById(id) {
    try {
        return dal.softDeleteById("todos",id)
    } catch (error) {
        throw new Error("deleta todo faild:" + error);
    }
}
async function deleteAll(user_id) {
    try {
        return dal.softDeleteAll("todos",{user_id:user_id})
    } catch (error) {
        throw new Error("delete all todos faild:" + error);
    }
}
async function merge(id, updateData) {
const existingItem = await dal.getByField("todos",id);
if (!existingItem) throw new Error('Entity not found');
const mergedItem = { ...existingItem, ...updateData };
const updated = await dal.updateById("todos",id, mergedItem);
return updated;
}
module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteById,
    deleteAll,
    merge
};