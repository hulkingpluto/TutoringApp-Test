import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Notification message is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
