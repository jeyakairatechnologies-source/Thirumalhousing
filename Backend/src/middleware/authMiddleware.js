import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getIsMongoConnected } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'thirumal_housing_super_secret_jwt_key_2026');

      if (getIsMongoConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const user = mockStore.getUserById(decoded.id) || mockStore.getUserByEmail(decoded.email);
        if (user) {
          const { passwordHash, ...safeUser } = user;
          req.user = safeUser;
        }
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found or authorization revoked' });
      }

      return next();
    } catch (error) {
      console.error('[AuthMiddleware] JWT verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'staff')) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin role required' });
  }
};
