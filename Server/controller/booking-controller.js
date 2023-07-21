const express = require("express");
const Booking = require("../model/Booking");
const Movie = require("../model/Movie");
const User = require("../model/User");
const mongoose = require("mongoose");

// const newBooking = async (req, res, next) => {
//   const { movie, date, seatNumber, user } = req.body;
//   let existingMovie;
//   let existingUser;
//   try {
//     existingMovie = await Movie.findById(movie);
//     existingUser = await User.findOne({ _id: user });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Unable to find movie or user" });
//   }
//   if (!existingMovie) {
//     return res.status(404).json({ message: "Movie not found" });
//   }
//   if (!existingUser) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   let booking;
//   try {
//     booking = new Booking({
//       movie,
//       date: new Date(`${date}`),
//       seatNumber,
//       user,
//     });

//     const session = await mongoose.startSession();

//     session.startTransaction({ retryWrites: true });
//     existingUser.booking.push(booking);
//     existingMovie.booking.push(booking);
//     await existingUser.save({ session });
//     await existingMovie.save({ session });
//     await booking.save({ session });
//     session.commitTransaction();
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Unable to create booking" });
//   }

//   return res.status(201).json({ booking });
// };











const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  console.log(user)
  console.log(movie)
  console.log(date)
  console.log(seatNumber)
  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findOne({ _id: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to find movie or user" });
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();

    session.startTransaction({ retryWrites: true });
    existingUser.booking.push(booking);
    existingMovie.booking.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to create booking" });
  }

  return res.status(201).json({ booking });
};

const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Booking.findById(id);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
  };
  
  //if we want to delete booking
  const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Booking.findByIdAndRemove(id).populate("user movies");
  console.log(booking)
     
  
      const session = await mongoose.startSession();
      session.startTransaction();
      booking.user.booking.pull(booking);
      booking.movie.booking.pull(booking);
      await booking.movie.save({ session });
      await booking.user.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ message: "Booking deleted successfully" });
  };
  

module.exports = {
  newBooking,
  getBookingById,
  deleteBooking 
};
