import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
  getDashboardStats
} from '../controllers/enquiryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getDashboardStats);

router.route('/')
  .post(createEnquiry)
  .get(protect, adminOnly, getEnquiries);

router.route('/:id')
  .put(protect, adminOnly, updateEnquiry)
  .delete(protect, adminOnly, deleteEnquiry);

export default router;
