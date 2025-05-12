const db = require('../../db/connection');

async function insert(tableName, data) {
  if (!tableName || typeof data !== 'object') {
    throw new Error('Invalid arguments passed to insertRow');
  }
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  const columns = keys.join(', ');
  const sql = `INSERT INTO myappdb.${tableName} (${columns}) VALUES (${placeholders})`;
  const [result] = await db.query(sql, values);
  return result.insertId;
}
async function getByField(tableName, idValue, idColumn = 'id') {
  if (!tableName || !idValue) {
    throw new Error('Invalid arguments passed to getById');
  }

  const sql = `SELECT * FROM myappdb.${tableName} WHERE ${idColumn} = ? AND isDeleted = false`;
  const [rows] = await db.query(sql, [idValue]);

  return rows[0] || null;
}

async function getAll(tableName, filter = {}) {
  if (!tableName) {
    throw new Error('Table name is required');
  }
  const conditions = ['isDeleted = false'];
  const values = [];
  for (const [key, value] of Object.entries(filter)) {
    conditions.push(`${key} = ?`);
    values.push(value);
  }
  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM myappdb.${tableName} ${whereClause}`;
  const [rows] = await db.query(sql, values);
  return rows;
}

async function updateById(tableName, id, updateData,) {
  if (!tableName || !id || typeof updateData !== 'object') {
    throw new Error('Invalid arguments passed to updateById');
  }
  const keys = Object.keys(updateData);
  const values = Object.values(updateData);

  if (keys.length === 0) {
    throw new Error('No fields to update');
  }
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE myappdb.${tableName} SET ${setClause} WHERE id = ?`;

  const [result] = await db.query(sql, [...values, id]);
  return result.affectedRows > 0;
}

async function softDeleteById(tableName, id) {
  if (!tableName || !id) {
    throw new Error('Invalid arguments passed to softDeleteById');
  }

  const sql = `UPDATE myappdb.${tableName} SET isDeleted = true WHERE id= ?`;
  const [result] = await db.query(sql, [id]);

  return result.affectedRows > 0;
}
async function softDeleteAll(tableName, filter = null) {
  if (!tableName) {
    throw new Error('Table name is required');
  }

  let sql = `UPDATE myappdb.${tableName} SET isDeleted = true`;
  const values = [];

  if (filter && typeof filter === 'object' && Object.keys(filter).length > 0) {
    const conditions = Object.keys(filter).map(key => `${key} = ?`).join(' AND ');
    values.push(...Object.values(filter));
    sql += ` WHERE ${conditions}`;
  }

  const [result] = await db.query(sql, values);
  return result.affectedRows > 0;
}
module.exports = {
    insert,
    getByField,
    getAll,
    updateById,
    softDeleteById,
   softDeleteAll
};