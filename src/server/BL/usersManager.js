const usersDAL = require('../DAL/users');

async function updateUser(user) {
    const existingUser = usersDAL.getUserByName(user.name);
    if (existingUser) { throw new Error('existing user name') }
    try {
        return usersDAL.updateUser(user);
    } catch (error) {
        throw new Error('update user faild:'+error);
    }
}
async function addUser(user) {
    try {
        return usersDAL.addUser(user)
    } catch (error) {
        throw new Error('add user faild:'+error);
    }
}
async function getAllUsers(){
    try {
        return usersDAL.getAllUsers();
    } catch (error) {
        throw new Error('get all users faild:'+error);
    }
}
async function deleteUser(id){
    try {
        return usersDAL.deleteUser(id)
    } catch (error) {
        throw new Error('delet user faild:'+error);
    }
}
