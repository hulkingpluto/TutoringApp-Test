import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  modifyUser,
  createUser,
  loginUser, 
} from '../../Controllers/User_Controller/UserC.js';
import multer from 'multer';
import User from '../../Models/User.js';


const upload = multer({ storage: multer.memoryStorage() });
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

router.get('/:userId/profile-picture', async (req, res) => {
  try {
      const user = await User.findById(req.params.userId);

      if (!user || !user.profilePicture || !user.profilePicture.data) {
          // If no picture is found, send the default image
          return res.sendFile(path.join(__dirname, '../Icons/default-profile.png')); // Adjust path if necessary
      }

      // Set the content type and send the image data
      res.set('Content-Type', user.profilePicture.contentType);
      res.send(user.profilePicture.data);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching profile picture', error: error.message });
  }
});


router.post('/', upload.single('profilePicture'), async (req, res) => {
  const { file } = req; // Get the uploaded file
  const { role, email, password, fname, lname } = req.body; // Get other form fields
  try {
    // Create the user with the profile picture
    const { user, token } = await createUser(
      { role, email, password, fname, lname },
      file // Pass the file data to the createUser function
    );

    // Optionally, you can also save the file as a resource if needed
    // const resourcefile = await createResourcefile(file, user._id, []); // Assuming tags are optional

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({  userId: user._id, token });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error.message });
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
