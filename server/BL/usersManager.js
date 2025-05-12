const dal = require('../DAL/dal');

async function merge(id, updateData) {
const existingItem = await dal.getByField("users",id);
if (!existingItem) throw new Error('Entity not found');
 if (
      userUpdates.name &&
      userUpdates.name !== existingUser.name
    ) {
      const userWithSameName = await dal.getByField("users",userUpdates.name,"name");
      if (userWithSameName) {
        throw new Error('User name already exists');
      }
    }
const mergedItem = { ...existingItem, ...updateData };
const updated = await dal.updateById("users",id, mergedItem);
return updated;
}
async function update(user_id, userUpdates) {
    const existingUser = await usersDAL.getUserById(user_id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    if (userUpdates.name !== existingUser.name) {
      const userWithSameName = await dal.getByField("users",userUpdates.name,"name");
      if (userWithSameName) {
        throw new Error('User name already exists');
      }
    }
    try {
      return await dal.updateById("users",user_id,userUpdates);
    } catch (error) {
      throw new Error('Update user failed: ' + error.message);
    }
  }
async function add(user) {
    try {
        return dal.insert("users",user)
    } catch (error) {
        throw new Error('add user faild:'+error);
    }
}
async function getAll(){
    try {
        return dal.getAll("users");
    } catch (error) {
        throw new Error('get all users faild:'+error);
    }
}
async function deleteById(id){
    try {
        return dal.deleteById("users",id)
    } catch (error) {
        throw new Error('delet user faild:'+error);
    }
}
module.exports = {
    add,
    getAll,
    update,
    deleteById,
    merge
};
