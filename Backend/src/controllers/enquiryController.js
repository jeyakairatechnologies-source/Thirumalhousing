import Enquiry from '../models/Enquiry.js';
import Project from '../models/Project.js';
import { getIsMongoConnected } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

// @desc   Submit customer enquiry / site visit request
// @route  POST /api/enquiries
// @access Public
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, email, project, projectName, message, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone number are required' });
    }

    let finalProjectName = projectName || '';
    if (project && !finalProjectName) {
      if (getIsMongoConnected()) {
        const projDoc = await Project.findById(project);
        if (projDoc) finalProjectName = projDoc.name;
      } else {
        const projItem = mockStore.getProjectById(project) || mockStore.getProjectBySlug(project);
        if (projItem) finalProjectName = projItem.name;
      }
    }

    const payload = {
      name,
      phone,
      email: email || '',
      project: project || null,
      projectName: finalProjectName,
      message: message || '',
      source: source || 'website',
      status: 'new'
    };

    if (getIsMongoConnected()) {
      const enquiry = await Enquiry.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your enquiry has been submitted. Our sales executive will call you shortly.',
        data: enquiry
      });
    } else {
      const enquiry = mockStore.createEnquiry(payload);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your enquiry has been submitted. Our sales executive will call you shortly.',
        data: enquiry
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Get all enquiries (CRM Leads)
// @route  GET /api/enquiries
// @access Private/Admin
export const getEnquiries = async (req, res, next) => {
  try {
    const { status } = req.query;

    if (getIsMongoConnected()) {
      const query = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      const enquiries = await Enquiry.find(query)
        .populate('project', 'name slug status')
        .sort({ createdAt: -1 });

      return res.json({ success: true, count: enquiries.length, data: enquiries });
    } else {
      const enquiries = mockStore.getEnquiries({ status });
      return res.json({ success: true, count: enquiries.length, data: enquiries });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Update enquiry status or CRM notes
// @route  PUT /api/enquiries/:id
// @access Private/Admin
export const updateEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (getIsMongoConnected()) {
      const enquiry = await Enquiry.findByIdAndUpdate(
        id,
        { ...(status && { status }), ...(notes !== undefined && { notes }) },
        { new: true }
      );
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.json({ success: true, data: enquiry });
    } else {
      const updated = mockStore.updateEnquiry(id, {
        ...(status && { status }),
        ...(notes !== undefined && { notes })
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.json({ success: true, data: updated });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Delete enquiry
// @route  DELETE /api/enquiries/:id
// @access Private/Admin
export const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      const enquiry = await Enquiry.findByIdAndDelete(id);
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.json({ success: true, message: 'Enquiry deleted successfully' });
    } else {
      const deleted = mockStore.deleteEnquiry(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.json({ success: true, message: 'Enquiry deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Get Dashboard Statistics
// @route  GET /api/enquiries/stats
// @access Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    let totalProjects = 0;
    let ongoingProjects = 0;
    let completedProjects = 0;
    let totalEnquiries = 0;
    let newEnquiries = 0;
    let todayEnquiries = 0;
    let recentEnquiries = [];

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    if (getIsMongoConnected()) {
      totalProjects = await Project.countDocuments();
      ongoingProjects = await Project.countDocuments({ status: 'ongoing' });
      ongoingProjects = await Project.countDocuments({ status: 'ongoing' });
      completedProjects = await Project.countDocuments({ status: 'completed' });

      totalEnquiries = await Enquiry.countDocuments();
      newEnquiries = await Enquiry.countDocuments({ status: 'new' });
      todayEnquiries = await Enquiry.countDocuments({ createdAt: { $gte: todayStart } });
      recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);
    } else {
      const projects = mockStore.getProjects();
      totalProjects = projects.length;
      ongoingProjects = projects.filter(p => p.status === 'ongoing').length;
      ongoingProjects = projects.filter(p => p.status === 'ongoing').length;
      completedProjects = projects.filter(p => p.status === 'completed').length;

      const enquiries = mockStore.getEnquiries();
      totalEnquiries = enquiries.length;
      newEnquiries = enquiries.filter(e => e.status === 'new').length;
      todayEnquiries = enquiries.filter(e => new Date(e.createdAt) >= todayStart).length;
      recentEnquiries = enquiries.slice(0, 5);
    }

    return res.json({
      success: true,
      data: {
        totalProjects,
        ongoingProjects,
        ongoingProjects,
        completedProjects,
        totalEnquiries,
        newEnquiries,
        todayEnquiries,
        recentEnquiries
      }
    });
  } catch (error) {
    next(error);
  }
};
