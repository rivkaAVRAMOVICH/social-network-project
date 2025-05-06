const usersDAL = require('../DAL/users');

async function update(user) {
    const existingUser = usersDAL.getUserByName(user.name);
    if (existingUser) { throw new Error('existing user name') }
    try {
        return usersDAL.updateUser(user);
    } catch (error) {
        throw new Error('update user faild:'+error);
    }
}
async function add(user) {
    try {
        return usersDAL.addUser(user)
    } catch (error) {
        throw new Error('add user faild:'+error);
    }
}
async function getAll(){
    try {
        return usersDAL.getAllUsers();
    } catch (error) {
        throw new Error('get all users faild:'+error);
    }
}
async function deleteById(id){
    try {
        return usersDAL.deleteUser(id)
    } catch (error) {
        throw new Error('delet user faild:'+error);
    }
}
module.exports = {
    add,
    getAll,
    update,
    deleteById
};
