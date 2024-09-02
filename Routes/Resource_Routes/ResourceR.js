import express from 'express';
import {
  createResource,
  getAllResources,
  getResourceById,
  modifyResource,
  deleteResourceById,
} from "../../Controllers/Resource_Controller/ResourceC.js"; 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const resources = await getAllResources();
    res.status(200).json(resources); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await getResourceById(id);
    if (resource) {
      res.status(200).json(resource); 
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource', error: error.message });
  }
});


router.post('/', async (req, res) => {
  const newResource = req.body;
  try {
    const resource = await createResource(newResource);
    res.status(201).json(resource); 
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const resource = await modifyResource(id, payload);
    if (resource) {
      res.status(200).json(resource); 
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteResourceById(id);
    if (result) {
      res.status(200).json({ message: 'Resource deleted successfully' }); 
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error: error.message });
  }
});

export default router;
