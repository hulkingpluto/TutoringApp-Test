import Resource from "../../Models/Resources.js"; 


export const createResource = async (payload) => {
  try {
    console.log("Creating resource with payload:", payload); 
    const newResource = new Resource(payload);
    const savedResource = await newResource.save();
    return savedResource;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw new Error(`Error creating resource: ${error.message}`);
  }
};


export const getUserResources = async (req, res) => {
  try {
      const userId = req.user.id; 
      const resources = await Resource.find({ uploadedBy: userId });
      
      return resources;
  } catch (error) {
      throw new Error({ message: 'Error fetching resources', error: error.message });
  }
};


export const getAllResources = async () => {
  try {
    const resources = await Resource.find();
    return resources;
  } catch (error) {
    throw new Error(`Error fetching resources: ${error.message}`);
  }
};


export const getResourceById = async (id) => {
  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    throw new Error(`Error fetching resource: ${error.message}`);
  }
};


export const modifyResource = async (id, payload) => {
  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      throw new Error('Resource not found');
    }

    Object.keys(payload).forEach((key) => {
      resource[key] = payload[key];
    });

    const updatedResource = await resource.save();
    return updatedResource;
  } catch (error) {
    throw new Error(`Error updating resource: ${error.message}`);
  }
};


export const deleteResourceById = async (id) => {
  try {
    const result = await Resource.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Resource not found');
    }
    return result;
  } catch (error) {
    throw new Error(`Error deleting resource: ${error.message}`);
  }
};