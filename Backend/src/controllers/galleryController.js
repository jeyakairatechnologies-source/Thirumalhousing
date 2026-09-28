import Gallery from '../models/Gallery.js';
import { getIsMongoConnected } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

// @desc   Get gallery items
// @route  GET /api/gallery
// @access Public
export const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;

    if (getIsMongoConnected()) {
      const query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      const gallery = await Gallery.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: gallery.length, data: gallery });
    } else {
      const gallery = mockStore.getGallery(category);
      return res.json({ success: true, count: gallery.length, data: gallery });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Add gallery item
// @route  POST /api/gallery
// @access Private/Admin
export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, category, imageUrl, description } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const DEFAULT_IMG = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80';
    const finalImageUrl = (imageUrl && imageUrl.trim()) ? imageUrl.trim() : DEFAULT_IMG;

    if (getIsMongoConnected()) {
      const item = await Gallery.create({
        title,
        category: category || 'layouts',
        imageUrl: finalImageUrl,
        description: description || ''
      });
      return res.status(201).json({ success: true, data: item });
    } else {
      const item = mockStore.createGalleryItem({
        title,
        category: category || 'layouts',
        imageUrl: finalImageUrl,
        description: description || ''
      });
      return res.status(201).json({ success: true, data: item });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Delete gallery item
// @route  DELETE /api/gallery/:id
// @access Private/Admin
export const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      const item = await Gallery.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Gallery item not found' });
      }
      return res.json({ success: true, message: 'Gallery item deleted successfully' });
    } else {
      const deleted = mockStore.deleteGalleryItem(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Gallery item not found' });
      }
      return res.json({ success: true, message: 'Gallery item deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};
