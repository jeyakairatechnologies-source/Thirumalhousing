import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB, getIsMongoConnected } from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Enquiry from './models/Enquiry.js';
import Gallery from './models/Gallery.js';
import Settings from './models/Settings.js';
import { initialProjects, initialEnquiries, initialGallery, initialSettings } from './data/initialData.js';

const PORT = process.env.PORT || 5000;

const seedMongoIfEmpty = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: 'Thirumal Admin',
        email: (process.env.ADMIN_EMAIL || 'admin@thirumalhousing.com').toLowerCase(),
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin'
      });
      console.log(`[Seed] Initialized default admin: ${process.env.ADMIN_EMAIL || 'admin@thirumalhousing.com'}`);
    }

    const hasNewProject = await Project.findOne({ slug: 'thirumal-nagar-i-block-kovilpatti' });
    if (!hasNewProject) {
      await Project.deleteMany({});
      const cleanProjects = initialProjects.map(({ _id, ...rest }) => rest);
      await Project.insertMany(cleanProjects);
      console.log(`[Seed] Seeded ${cleanProjects.length} Kovilpatti & Sivakasi real-estate projects into MongoDB.`);
    }

    const enquiryCount = await Enquiry.countDocuments();
    if (enquiryCount === 0) {
      const cleanEnquiries = initialEnquiries.map(({ _id, project, ...rest }) => ({
        ...rest,
        project: null
      }));
      await Enquiry.insertMany(cleanEnquiries);
      console.log(`[Seed] Successfully seeded ${cleanEnquiries.length} CRM customer leads.`);
    }

    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      const cleanGallery = initialGallery.map(({ _id, ...rest }) => rest);
      await Gallery.insertMany(cleanGallery);
    }

    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create(initialSettings);
    }
  } catch (err) {
    console.warn(`[Seed] MongoDB auto-seed notice: ${err.message}`);
  }
};

const printEnvConfig = () => {
  console.log(`====================================================`);
  console.log(`  THIRUMAL HOUSING - BACKEND SERVER CONFIGURATION`);
  console.log(`====================================================`);
  console.log(`  PORT               : ${PORT}`);
  console.log(`  NODE_ENV           : ${process.env.NODE_ENV || 'development'}`);
  console.log(`  MONGO_URI          : ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thirumal_housing'}`);
  console.log(`  JWT_SECRET         : ${process.env.JWT_SECRET ? '[CONFIGURED]' : '[DEFAULT KEY]'}`);
  console.log(`  JWT_EXPIRE         : ${process.env.JWT_EXPIRE || '7d'}`);
  console.log(`  ADMIN_EMAIL        : ${process.env.ADMIN_EMAIL || 'admin@thirumalhousing.com'}`);
  console.log(`  CLOUDINARY_CLOUD   : ${process.env.CLOUDINARY_CLOUD_NAME || '[Not Set - using local uploads]'}`);
  console.log(`====================================================`);
};

const startServer = async () => {
  printEnvConfig();

  // Connect to database
  const connected = await connectDB();
  if (connected) {
    await seedMongoIfEmpty();
  }

  const server = app.listen(PORT, () => {
    console.log(`[Server] Live and listening on: http://localhost:${PORT}`);
    console.log(`[Server] Health check endpoint: http://localhost:${PORT}/api/health`);
    console.log(`[Server] Database Status      : ${getIsMongoConnected() ? 'MongoDB Active' : 'Resilient In-Memory/Seed Store Active'}`);
    console.log(`====================================================\n`);
  });

  return server;
};

startServer();
