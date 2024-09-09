import mongoose from 'mongoose';
import Resourcefile from '../../Models/Resourcefile.js'


export const createResourcefile = async (file, uploadedBy, tags) => {
  if (!file) {
    throw new Error('No file uploaded');
  }

  const newResourcefile = new Resourcefile({
    file: {
      data: file.buffer,
      contentType: file.mimetype,
      originalName: file.originalname,
    },
    uploadedBy: new mongoose.Types.ObjectId(uploadedBy),
    tags: tags ? tags.split(',') : [], 
  });

  
  return await newResourcefile.save();
};

export const getAllResourcesfile = async () => {
  try {
    const resourcesfile = await Resourcefile.find();
    return resourcesfile;
  } catch (error) {
   throw new Error(`Error fetching resourcesfile: ${error.message}`);
  }
};

export const getResourcefileById = async (id) => {
  try {
    const resourcefile = await Resourcefile.findById(id);
    if (!resourcefile) {
      throw new Error('Resourcefile not found');
    }
    return resourcefile;
  } catch (error) {
    throw new Error(`Error fetching resourcefile: ${error.message}`);
  }
};

export const modifyResourcefile = async (id, payload) => {
  try {
    const resourcefile = await Resourcefile.findById(id);
    if (!resourcefile) {
      throw new Error('Resourcefile not found');
    }

    Object.keys(payload).forEach((key) => {
      resourcefile[key] = payload[key];
    });

    const updatedResourcefile = await resourcefile.save();
    return updatedResourcefile;
  } catch (error) {
    throw new Error(`Error updating resourcefile: ${error.message}`);
  }
};

export const deleteResourcefileById = async (id) => {
  try {
    const result = await Resourcefile.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Resourcefile not found');
    }
    return result;
  } catch (error) {
    throw new Error(`Error deleting resourcefile: ${error.message}`);
  }
};
