import Booking from "../../Models/Booking.js"; 
import Notification from "../../Models/Notification.js"; 


export const createBooking = async (payload) => {
  try {
    const newBooking = new Booking(payload);
    const savedBooking = await newBooking.save();

    
    const studentNotification = new Notification({
    message: `${savedBooking.meetingType} booking confirmed for ${savedBooking.sessionDate} at ${savedBooking.sessionTime} `,
    user: savedBooking.student, 
  });
  await studentNotification.save();
  
  
    const tutorNotification = new Notification({
    message: `You have a new ${savedBooking.meetingType} booking with ${savedBooking.studentName} on ${savedBooking.sessionDate} at ${savedBooking.sessionTime}`,
    user: savedBooking.tutor, 
  });
  await tutorNotification.save();

  
    return savedBooking;
  } catch (error) {
    throw new Error(`Error creating booking: ${error.message}`);
  }
};


export const getAllBookings = async () => {
  try {
    const bookings = await Booking.find().populate('student tutor'); 
    return bookings;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
};


export const getBookingById = async (id) => {
  try {
    const booking = await Booking.findById(id).populate('student tutor notifications');
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  } catch (error) {
    throw new Error(`Error fetching booking: ${error.message}`);
  }
};


export const modifyBooking = async (id, payload) => {
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    
    Object.keys(payload).forEach((key) => {
      booking[key] = payload[key];
    });

    
    const updatedBooking = await booking.save();
    return updatedBooking;
  } catch (error) {
    throw new Error(`Error updating booking: ${error.message}`);
  }
};


export const cancelBooking = async (id, reason) => {
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    
    booking.status = 'Cancelled';
    booking.cancellationReason = reason;

    
    const cancelledBooking = await booking.save();
  
    
    const studentCancellationNotification = new Notification({
    message: `Your booking on ${cancelledBooking.sessionDate} was cancelled. Reason: ${reason}`,
    user: cancelledBooking.student, 
  });
  await studentCancellationNotification.save();
  
  
    const tutorCancellationNotification = new Notification({
    message: `The booking with ${cancelledBooking.studentName} on ${cancelledBooking.sessionDate} was cancelled. Reason: ${reason}`,
    user: cancelledBooking.tutor, 
  });
  await tutorCancellationNotification.save();

    return cancelledBooking;
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`);
  }
};


export const deleteBookingById = async (id) => {
  try {
    const result = await Booking.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Booking not found');
    }
    return result;
  } catch (error) {
    throw new Error(`Error deleting booking: ${error.message}`);
  }
};
