import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['all', 'layouts', 'ongoing', 'completed', 'amenities', 'events'],
      default: 'layouts'
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
export default Gallery;
