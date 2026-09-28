import express from 'express';
import {
  getGallery,
  createGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, adminOnly, createGalleryItem);

router.route('/:id')
  .delete(protect, adminOnly, deleteGalleryItem);

export default router;
