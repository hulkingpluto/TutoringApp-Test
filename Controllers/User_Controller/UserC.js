import User from "../../Models/User.js";


export const createUser = async (payload) => {
  try {
    const newUser = new User(payload);
    const savedUser = await newUser.save(); 
    return savedUser; 
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};


export const getAllUsers = async () => {
  try {
    const users = await User.find(); 
    return users; 
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};


export const getUserById = async (id) => {
  try {
    const user = await User.findById(id); 
    if (!user) {
      throw new Error('User not found');
    }
    return user; 
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};


export const modifyUser = async (id, payload) => {
  try {
    const user = await User.findById(id); 
    if (!user) {
      throw new Error('User not found');
    }

   
    Object.keys(payload).forEach((key) => {
      user[key] = payload[key];
    });

    const updatedUser = await user.save(); 
    return updatedUser; 
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};


export const deleteUserById = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id); 
    if (!result) {
      throw new Error('User not found');
    }
    return result; 
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
