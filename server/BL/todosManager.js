const todosDal = require('../DAL/todos');

async function getAll(user_id) {
    try {
        return todosDal.deleteAllTodos(user_id);
    } catch (error) {
        throw new Error("get all todos faild:" + error);
    }
}
async function getById(id) {
    try {
        return todosDal.getTodoById(id);
    } catch (error) {
        throw new Error("get todo faild:" + error);

    }

}
async function add(todo) {
    try {
        return todosDal.addTodo(todo)
    } catch (error) {
        throw new Error("add todo faild:" + error);

    }
}
async function update(id, todo) {
    try {
        return todosDal.updateTodo(id, todo)
    } catch (error) {
        throw new Error("update todo faild:" + error);
    }
}
async function deleteById(id) {
    try {
        return todosDal.deleteTodo(id)
    } catch (error) {
        throw new Error("deleta todo faild:" + error);
    }
}
async function deleteAll(user_id) {
    try {
        return todosDal.deleteAllTodos(user_id)
    } catch (error) {
        throw new Error("delete all todos faild:" + error);
    }
}
module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteById,
    deleteAll
};