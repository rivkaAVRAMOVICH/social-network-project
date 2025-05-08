const usersDAL = require('../DAL/users');

// async function update(user) {
//     const existingUser = usersDAL.getUserByName(user.name);
//     if (existingUser) { throw new Error('existing user name') }
//     try {
//         return usersDAL.updateUser(user);
//     } catch (error) {
//         throw new Error('update user faild:'+error);
//     }
// }
async function update(user_id, userUpdates) {
    console.log(user_id);
    const existingUser = await usersDAL.getUserById(user_id);
    if (!existingUser) {
      throw new Error('User not found');
    }
  
    // אם המשתמש שינה את השם — נבדוק שאין שם כפול
    if (
      userUpdates.name &&
      userUpdates.name !== existingUser.name
    ) {
      const userWithSameName = await usersDAL.getUserByName(userUpdates.name);
      if (userWithSameName) {
        throw new Error('User name already exists');
      }
    }
  
    try {
      // נעדכן רק את מה שנשלח (ב-PATCH או ב-PUT)
      const updatedFields = { ...existingUser, ...userUpdates };
      return await usersDAL.updateUser(updatedFields);
    } catch (error) {
      throw new Error('Update user failed: ' + error.message);
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
