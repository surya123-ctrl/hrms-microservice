const db = require('../db/db');

const findUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const createUser = async (userData) => {
    const { name, email, password, role } = userData;
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    return await db.execute(query, [name, email, password, role || 'EMPLOYEE']);
};

module.exports = {
    findUserByEmail,
    createUser
};