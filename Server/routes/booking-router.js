const express = require("express");
const booking = require("../model/Booking");
const bookingRouter = express.Router();
const bookingController = require("../controller/booking-controller");

bookingRouter.post("/", bookingController.newBooking);
bookingRouter.get("/:id", bookingController.getBookingById);
bookingRouter.delete("/:id", bookingController.deleteBooking);


module.exports = bookingRouter;
