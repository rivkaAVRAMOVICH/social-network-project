const connection = require('./connection');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
// const { log } = require('console');
// const initDB = async () => {
//   try {
//     await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
//     await connection.query(`USE ${process.env.DB_NAME}`);

//     // Users table
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100),
//         email VARCHAR(100) UNIQUE,
//         address VARCHAR(100),
//         phon VARCHAR(20)
//       );
//     `);

//     // Posts table
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS posts (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT,
//         title VARCHAR(200),
//         content TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//       );
//     `);

//     // Todos table
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS todos (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT,
//         title VARCHAR(200),
//         completed BOOLEAN DEFAULT FALSE,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//       );
//     `);

//     // Comments table
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS comments (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         post_id INT,
//         user_id INT,
//         comment TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//       );
//     `);
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS passwords (
//         user_id INT PRIMARY KEY,
//         password_hash VARCHAR(255) NOT NULL,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//       );
//     `);
//     const [rows] = await connection.query(`SELECT COUNT(*) as count FROM users`);
//     if (rows[0].count === 0) {
//       await connection.query(`INSERT INTO users (name, email) VALUES (?, ?)`, ['Admin', 'admin@example.com']);
//       console.log('✔️ Database initialized with default data.');
//     } else {
//       console.log('ℹ️ Database already initialized.');
//     }

//     process.exit();
//   } catch (err) {
//     console.error('❌ DB init failed:', err);
//     process.exit(1);
//   }
// };

// initDB();
// const connection = require('./connection');
async function initDB() {
  try {
    console.log(process.env.DB_NAME);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);
    await connection.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      address VARCHAR(100),
      phon VARCHAR(20)
    );`);

    await connection.query(`CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(200),
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);

    await connection.query(`CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(200),
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);

    await connection.query(`CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT,
      user_id INT,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);

    await connection.query(`CREATE TABLE IF NOT EXISTS passwords (
      user_id INT PRIMARY KEY,
      password_hash VARCHAR(255) NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);

    const [rows] = await connection.query(`SELECT COUNT(*) as count FROM users`);
    if (rows[0].count === 0) {
      await connection.query(
        `INSERT INTO users (id, name, email, address, phon) VALUES (?, ?, ?, ?, ?)`,
        ['215639212', 'Admin', 'admin@example.com', '123 Admin St', '050-0000000']
      );

      await connection.query(
        `INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)`,
        ['215639212', '123']
      );

      await connection.query(
        `INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)`,
        ['215639212', 'Welcome Post', 'This is a sample welcome post.']
      );

      await connection.query(
        `INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)`,
        ['215639212', 'Set up profile', false]
      );

      console.log('✔️ Database initialized with default data.');
    } else {
      console.log('ℹ️ Database already initialized.');
    }

    process.exit();
  } catch (err) {
    console.error('❌ DB init failed:', err);
    process.exit(1);
  }
}

initDB(); // ← קריאה לפונקציה

