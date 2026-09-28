import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getIsMongoConnected } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

const generateToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET || 'thirumal_housing_super_secret_jwt_key_2026',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// @desc   Auth user & get token
// @route  POST /api/auth/login
// @access Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (getIsMongoConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.email, user.role)
          }
        });
      }
    } else {
      // Fallback store check
      const user = mockStore.getUserByEmail(email);
      if (user) {
        const isMatch = bcrypt.compareSync(password, user.passwordHash);
        if (isMatch) {
          return res.json({
            success: true,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: generateToken(user._id, user.email, user.role)
            }
          });
        }
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

// @desc   Get current logged in user
// @route  GET /api/auth/me
// @access Private
export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};
