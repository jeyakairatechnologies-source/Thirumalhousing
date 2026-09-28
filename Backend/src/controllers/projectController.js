import Project from '../models/Project.js';
import { getIsMongoConnected } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';
import { generateSlug } from '../utils/generateSlug.js';

// @desc   Get all projects with filtering
// @route  GET /api/projects
// @access Public
export const getProjects = async (req, res, next) => {
  try {
    const { status, search, featured, admin } = req.query;

    if (getIsMongoConnected()) {
      const query = {};
      // Public requests only see published projects; admin=true bypasses this
      if (admin !== 'true') {
        query.isPublished = { $ne: false };
      }
      if (status && status !== 'all') {
        query.status = status;
      }
      if (featured === 'true') {
        query.isFeatured = true;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { 'location.city': { $regex: search, $options: 'i' } },
          { 'location.district': { $regex: search, $options: 'i' } }
        ];
      }

      const projects = await Project.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    } else {
      const projects = mockStore.getProjects({
        status,
        search,
        isFeatured: featured === 'true'
      });
      return res.json({ success: true, count: projects.length, data: projects });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Get single project by slug or ID
// @route  GET /api/projects/:slug
// @access Public
export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (getIsMongoConnected()) {
      let project = await Project.findOne({ slug });
      if (!project && slug.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findById(slug);
      }

      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      return res.json({ success: true, data: project });
    } else {
      const project = mockStore.getProjectBySlug(slug) || mockStore.getProjectById(slug);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: project });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Create new project
// @route  POST /api/projects
// @access Private/Admin
export const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body };

    if (!projectData.name) {
      return res.status(400).json({ success: false, message: 'Project name is required' });
    }

    const DEFAULT_IMG = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80';
    if (!projectData.mainImage || !projectData.mainImage.trim()) {
      projectData.mainImage = DEFAULT_IMG;
    }
    if (!projectData.images || projectData.images.length === 0) {
      projectData.images = [projectData.mainImage];
    }

    if (!projectData.slug) {
      projectData.slug = generateSlug(projectData.name);
    }

    if (getIsMongoConnected()) {
      const existing = await Project.findOne({ slug: projectData.slug });
      if (existing) {
        projectData.slug = `${projectData.slug}-${Date.now()}`;
      }
      const project = await Project.create(projectData);
      return res.status(201).json({ success: true, data: project });
    } else {
      const project = mockStore.createProject(projectData);
      return res.status(201).json({ success: true, data: project });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Update project
// @route  PUT /api/projects/:id
// @access Private/Admin
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.name && !updates.slug) {
      updates.slug = generateSlug(updates.name);
    }

    if (getIsMongoConnected()) {
      const project = await Project.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
      });
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: project });
    } else {
      const updated = mockStore.updateProject(id, updates);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: updated });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Delete project
// @route  DELETE /api/projects/:id
// @access Private/Admin
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (getIsMongoConnected()) {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, message: 'Project deleted successfully' });
    } else {
      const deleted = mockStore.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, message: 'Project deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};
