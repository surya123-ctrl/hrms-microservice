const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/response');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.auth_jwt_token;
        if (!token) {
            return sendResponse(res, 401, 'Unauthorized! Please log in.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        sendResponse(res, 401, 'Unauthorized! Please log in.');
    }
}

module.exports = { protect };