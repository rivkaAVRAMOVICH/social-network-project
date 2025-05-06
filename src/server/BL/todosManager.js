const todosDal = require('../DAL/todos');

async function getAllTodos(user_id) {
    try {
        return todosDal.deleteAllTodos(user_id);
    } catch (error) {
        throw new Error("get all todos faild:" + error);
    }
}
async function getTodoById(id) {
    try {
        return todosDal.getTodoById(id);
    } catch (error) {
        throw new Error("get todo faild:" + error);

    }

}
async function addTodo(todo) {
    try {
        return todosDal.addTodo(todo)
    } catch (error) {
        throw new Error("add todo faild:" + error);

    }
}
async function updateTodo(id, todo) {
    try {
        return todosDal.updateTodo(id, todo)
    } catch (error) {
        throw new Error("update todo faild:" + error);
    }
}
async function deleteTodo(id) {
    try {
        return todosDal.deleteTodo(id)
    } catch (error) {
        throw new Error("deleta todo faild:" + error);
    }
}
async function deleteAllTodos(user_id) {
    try {
        return todosDal.deleteAllTodos(user_id)
    } catch (error) {
        throw new Error("delete all todos faild:" + error);
    }
}
module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
};