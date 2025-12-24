const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
const { findUserByEmail, createUser } = require("../model/userModel");

const setTokenCookie = (res, token) => {
  const options = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  };
  res.cookie("auth_jwt_token", token, options);
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, 400, "Missing Fields");
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return sendResponse(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await createUser({ name, email, password: hashedPassword, role });

    sendResponse(res, 201, "User registered successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(res, 400, "Missing Fields");
    }

    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendResponse(res, 401, "Invalid Credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    setTokenCookie(res, token);

    sendResponse(res, 200, "Login Successful", {
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Internal Server Error");
  }
};

const logout = (req, res) => {
    res.cookie('auth_jwt_token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    });
    sendResponse(res, 200, 'Logout Successful');
}

module.exports = {
  register,
  login,
  logout,
};
