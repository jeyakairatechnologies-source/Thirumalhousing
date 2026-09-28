import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Enquiry from '../models/Enquiry.js';
import Gallery from '../models/Gallery.js';
import Settings from '../models/Settings.js';
import { initialProjects, initialEnquiries, initialGallery, initialSettings } from '../data/initialData.js';

const seedDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thirumal_housing';
  try {
    await mongoose.connect(mongoUri);
    console.log('[Seed Script] Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Enquiry.deleteMany();
    await Gallery.deleteMany();
    await Settings.deleteMany();

    // Insert Users
    await User.create({
      name: 'Thirumal Admin',
      email: (process.env.ADMIN_EMAIL || 'admin@thirumalhousing.com').toLowerCase(),
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    });

    // Insert Projects
    await Project.insertMany(initialProjects);

    // Insert Enquiries
    await Enquiry.insertMany(initialEnquiries);

    // Insert Gallery
    await Gallery.insertMany(initialGallery);

    // Insert Settings
    await Settings.create(initialSettings);

    console.log('[Seed Script] Successfully seeded full real-estate database!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Script] Error during database seeding:', error.message);
    process.exit(1);
  }
};

seedDatabase();
