import Settings from '../models/Settings.js';
import { getIsMongoConnected } from '../config/db.js';
import { mockStore } from '../data/mockStore.js';

// @desc   Get company settings & contact details
// @route  GET /api/settings
// @access Public
export const getSettings = async (req, res, next) => {
  try {
    if (getIsMongoConnected()) {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create(mockStore.getSettings());
      }
      return res.json({ success: true, data: settings });
    } else {
      const settings = mockStore.getSettings();
      return res.json({ success: true, data: settings });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Update company settings
// @route  PUT /api/settings
// @access Private/Admin
export const updateSettings = async (req, res, next) => {
  try {
    if (getIsMongoConnected()) {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create(req.body);
      } else {
        Object.assign(settings, req.body);
        await settings.save();
      }
      return res.json({ success: true, data: settings });
    } else {
      const settings = mockStore.updateSettings(req.body);
      return res.json({ success: true, data: settings });
    }
  } catch (error) {
    next(error);
  }
};
