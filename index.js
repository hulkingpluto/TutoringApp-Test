import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './Authentication/RouteA.js'; 
import userRoutes from './Routes/User_Routes/UserR.js'; 
import resourceRoutes from './Routes/Resource_Routes/ResourceR.js';
import resourcefileRoutes from './Routes/Resourcefile_Routes/ResourcefileR.js'
import bookingRoutes from './Routes/Booking_Routes/BookingR.js';
import notificationRoutes from './Routes/Notification_Routes/NotificationR.js';
import virtualtutoringRoutes from './Routes/VirtualTutoring_Routes/VirtualTutoringR.js';
import './Authentication/passport.js'; 

const app = express();


const mongoURI = 'mongodb://localhost:27017/Testdb';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());


// Passport session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/virtualtutoring', virtualtutoringRoutes);
app.use('/api/resourcesfile', resourcefileRoutes);

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'dashboard.html'));
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
