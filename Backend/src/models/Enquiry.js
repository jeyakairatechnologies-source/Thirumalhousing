import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null
    },
    projectName: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'project-page'],
      default: 'website'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'interested', 'converted', 'closed'],
      default: 'new'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
