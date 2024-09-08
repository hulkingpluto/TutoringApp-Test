import express from 'express';
import {
  createResourcefile,
  getAllResourcesfile,
  getResourcefileById,
  modifyResourcefile,
  deleteResourcefileById,
  uploadFile,
} from '../../Controllers/Resourcefile_Controller/ResourcefileC.js';

const router = express.Router();

// Route to get all resources
router.get('/', getAllResourcesfile);

// Route to get a single resource by ID
router.get('/:id', getResourcefileById);

// Route to upload a file
router.post('/upload', uploadFile, createResourcefile);

// Route to update a resource file by ID
router.put('/:id', modifyResourcefile);

// Route to delete a resource file by ID
router.delete('/:id', deleteResourcefileById);

export default router;
