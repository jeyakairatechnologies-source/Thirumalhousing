import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['ongoing', 'ongoing', 'completed'],
      default: 'ongoing'
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    location: {
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      district: { type: String, default: '' },
      state: { type: String, default: 'Tamil Nadu' },
      latitude: { type: Number, default: 9.1726 },
      longitude: { type: Number, default: 77.8687 }
    },
    description: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      default: ''
    },
    price: {
      startingFrom: { type: Number, required: true },
      priceUnit: { type: String, default: 'Lakhs' }
    },
    totalArea: { type: String, required: true },
    totalUnits: { type: Number, required: true },
    availableUnits: { type: Number, required: true },
    approvalType: { type: String, default: 'DTCP & RERA Approved' },
    reraNumber: { type: String, default: '' },
    possessionDate: { type: String, default: '' },
    highlights: [{ type: String }],
    amenities: [{ type: String }],
    specifications: {
      type: Object,
      default: {}
    },
    images: [{ type: String }],
    mainImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    },
    floorPlans: [{ type: String }],
    brochure: { type: String, default: '' },
    mapUrl: { type: String, default: '' },
    // SEO
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' }
  },
  { timestamps: true }
);

// Only return published projects for public queries (can be overridden in admin)
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
