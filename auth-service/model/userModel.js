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

const findUserById = async (id) => {
    const [rows] = await db.execute('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
};

const updateOTP = async (email, options, expiry) => {
    const query = 'UPDATE users SET reset_otp = ?, otp_expiry = ? where email = ?';
    return await db.execute(query, [options, expiry, email]);
};

const verifyOTP = async (email, otp) => {
    const query = 'SELECT id FROM users WHERE email = ? AND reset_otp = ? AND otp_expiry > NOW()';
    const [rows] = await db.execute(query, [email, otp]);
    return rows[0];
};

const updatePassword = async (userId, hashedPassword) => {
    const query = 'UPDATE users SET password = ?, reset_otp = NULL, otp_expiry = NULL WHERE id = ?';
    return await db.execute(query, [hashedPassword, userId]);
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
    updateOTP,
    verifyOTP,
    updatePassword
};