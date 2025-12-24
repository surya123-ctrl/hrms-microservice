const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', protect, getMe);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// 1. Forgot & Reset Password
// HRMS mein aksar log password bhool jate hain. Aapko email-based reset system chahiye hoga.

// API: /api/auth/forgot-password (User email dalega, usse reset link ya OTP jayega).

// API: /api/auth/reset-password (New password update karne ke liye).

// 2. Change Password (Logged-in User)
// Security ke liye har 3-6 mahine mein password badalna zaroori hota hai.

// API: /api/auth/change-password (Old password + New password).

// 3. "Get Me" (Check Auth State)
// Jab user page refresh karta hai, toh frontend ko kaise pata chalega ki user logged in hai?

// API: /api/auth/me

// Logic: Ye API cookie check karegi, token verify karegi aur database se user ka current data (name, role, permissions) la kar degi.

// 4. Update Profile (Basic Info)
// User apni basic details (phone number, profile picture) change kar sake.

// API: /api/auth/update-profile

// 5. Role-Based Access Control (RBAC) - Admin Only
// HRMS mein sirf Admin hi decide karta hai ki kaun "Manager" hai aur kaun "Employee".

// API: /api/auth/update-role (Admin can change any user's role).

// 6. Account Lockout/Status
// Agar koi Employee resign kar deta hai, toh uska access band karna padta hai.

// API: /api/auth/update-status (Active/Inactive toggle).

module.exports = router;