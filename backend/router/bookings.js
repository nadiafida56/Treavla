import express from 'express';
import { createBooking, getAllBookings,createPendingBooking,finalizeBookingPayment, getBooking } from '../controllers/bookingController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const bookingRoute = express.Router();

// Create a new review for a tour
bookingRoute.post('/', createBooking);
bookingRoute.post("/pending", createPendingBooking);
bookingRoute.post("/finalize", finalizeBookingPayment);
bookingRoute.get('/:id', getBooking);

bookingRoute.get('/',verifyAdmin, getAllBookings);
bookingRoute.post('/getBookings',verifyAdmin, getAllBookings);

export default bookingRoute
