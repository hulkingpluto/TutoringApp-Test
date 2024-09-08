import mongoose from 'mongoose';
import Resourcefile from '../../Models/Resourcefile.js';
import multer from 'multer';

// Multer setup to store file in memory
const storage = multer.memoryStorage();
export const uploadFile = multer({ storage }).single('file');

// Create a new resource file
export const createResourcefile = async (req, res) => {
  try {
    const { file } = req;
    const { uploadedBy, tags } = req.body;

    // Check if a file is uploaded
    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    // Create a new resourcefile document
    const newResourcefile = new Resourcefile({
      file: {
        data: file.buffer,
        contentType: file.mimetype,
        originalName: file.originalname,
      },
      uploadedBy: mongoose.Types.ObjectId(uploadedBy),
      tags: tags ? tags.split(',') : [], // Split comma-separated tags
    });

    // Save to database
    const savedResourcefile = await newResourcefile.save();
    return res.status(201).json(savedResourcefile); // Send saved file back as response
  } catch (error) {
    console.error('Error creating resourcefile:', error);
    return res.status(500).send(`Error creating resourcefile: ${error.message}`);
  }
};

// Fetch all resource files
export const getAllResourcesfile = async (req, res) => {
  try {
    const resourcesfile = await Resourcefile.find();
    res.json(resourcesfile);
  } catch (error) {
    res.status(500).send(`Error fetching resourcesfile: ${error.message}`);
  }
};

// Fetch a single resource file by ID
export const getResourcefileById = async (req, res) => {
  try {
    const resourcefile = await Resourcefile.findById(req.params.id);
    if (!resourcefile) {
      return res.status(404).send('Resourcefile not found');
    }
    res.json(resourcefile);
  } catch (error) {
    res.status(500).send(`Error fetching resourcefile: ${error.message}`);
  }
};

// Modify a resource file
export const modifyResourcefile = async (req, res) => {
  try {
    const resourcefile = await Resourcefile.findById(req.params.id);
    if (!resourcefile) {
      return res.status(404).send('Resourcefile not found');
    }

    Object.keys(req.body).forEach((key) => {
      resourcefile[key] = req.body[key];
    });

    const updatedResourcefile = await resourcefile.save();
    res.json(updatedResourcefile);
  } catch (error) {
    res.status(500).send(`Error updating resourcefile: ${error.message}`);
  }
};

// Delete a resource file by ID
export const deleteResourcefileById = async (req, res) => {
  try {
    const result = await Resourcefile.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send('Resourcefile not found');
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(`Error deleting resourcefile: ${error.message}`);
  }
};
