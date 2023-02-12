import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookingForm({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN)) {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_TOKEN)
      );
      setName(user.username);
      setUser(user);
    }
  }, []);
  // console.log(user);
  function calculateTotalPrice(cin, cout, dprice) {
    let totalPrice = 0;
    if (cin && cout) {
      totalPrice =
        dprice * differenceInCalendarDays(new Date(cout), new Date(cin));

      return totalPrice;
    } else {
      return totalPrice;
    }
  }
  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  // console.log(numberOfNights);
  const validationFields = () => {
    if (checkIn === "" || checkOut === "") {
      toast.error("Please Select the CheckIn or CheckOut Date");
      return false;
    } else if (name === "") {
      toast.error("Please Enter Your Name");
      return false;
    } else if (phone === "") {
      toast.error("Please Enter Your Phone Number");
      return false;
    } else if (numberOfGuests > place?.maxGuests) {
      toast.error(`The Maximum Guests cannot be over than ${place?.maxGuests}`);
      return false;
    }
    return true;
  };

  const handleBooking = async () => {
    try {
      if (validationFields()) {
        await axios.post(`/bookings/createbooking`, {
          user: user?._id,
          place: place?._id,
          checkIn,
          checkOut,
          name,
          phone,
          numberOfNight: numberOfNights,
          numberOfGuests,
          price: place?.price * numberOfNights,
        });

        await axios.put(`places/someoneBook/${place?._id}`, {
          someoneBook: true,
        });

        toast.success("You Have Booking Successfully!");
        navigate("/");
      } else {
        toast.error("Something went wrong with your request fields!");
      }
    } catch (error) {
      toast.error("Something went wrong with your Booking request!");
    }
  };

  const ResetBtn = () => {
    setCheckIn("");
    setCheckOut("");
    setNumberOfGuests(1);
    setName("");
    setPhone("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full flex flex-col font-serif items-center p-2">
      <h1 className="mb-5 text-xl ">
        Price: <span className="text-2xl font-semibold ">${place?.price}</span>{" "}
        Per Night
      </h1>

      {/* booking info */}
      <div className="flex flex-col w-full border rounded-xl">
        {/* booking date */}
        <div className="flex items-center w-full">
          {/* checkin */}
          <div className="w-[50%] p-3 flex flex-col justify-center">
            <label className="text-lg font-semibold">Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          {/* checkout */}
          <div className="border-l flex-grow flex flex-col justify-center p-3">
            <label className="text-lg font-semibold">Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* booking customer info*/}
        <div className="flex items-center w-full border-t">
          <div className="w-[50%] p-3 flex flex-col justify-center">
            <label className="text-lg font-semibold">Your Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Enter your name.."
              className="w-full rounded-lg p-2 border shadow-md focus:shadow-lg"
            />
          </div>
          <div className="border-l flex-grow flex flex-col justify-center p-3">
            <label className="text-lg font-semibold">Phone Number:</label>
            <input
              type="number"
              value={phone}
              placeholder="Enter phone number.."
              onChange={(ev) => setPhone(ev.target.value)}
              className="w-full rounded-lg p-2 border shadow-md focus:shadow-lg"
            />
          </div>
        </div>

        {/* booking night */}
        <div className=" flex flex-col border-t px-3 py-5 ">
          <label className="text-lg font-semibold">Number of Guest</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            min={1}
            max={place?.maxGuests}
            className="w-full rounded-lg p-2 border shadow-md focus:shadow-lg"
          />
        </div>
      </div>

      {/* button */}
      <button
        onClick={handleBooking}
        className="py-3 shadow-md hover:bg-green-400 bg-green-500 text-white w-full rounded-lg mt-5"
      >
        Booking
      </button>

      <div className="flex w-full items-center justify-between gap-2 py-5">
        <button
          onClick={ResetBtn}
          className="py-3 shadow-md hover:bg-red-400 bg-red-500 text-white w-[200px] rounded-lg"
        >
          Discard
        </button>
        <p className="md:text-xl pr-3 whitespace-nowrap">
          Total Price:{" "}
          <span className="text-2xl font-semibold text-green-400">
            {" "}
            ${calculateTotalPrice(checkIn, checkOut, place?.price)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default BookingForm;
