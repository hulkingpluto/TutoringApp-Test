import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  modifyUser,
  createUser, 
} from '../../Controllers/User_Controller/UserC.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(user); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});


router.post('/', async (req, res) => {
  const newUser = req.body;
  try {
    const user = await createUser(newUser);
    res.status(201).json(user); 
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const user = await modifyUser(id, payload);
    if (user) {
      res.status(200).json(user); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUserById(id);
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' }); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

export default router;
