import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BsArrowRight, BsMoon } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDateRange, MdOutlinePayment } from "react-icons/md";
import { format } from "date-fns";
function ProfileBooking() {
  const [bookings, setBookings] = useState();
  const navigate = useNavigate();
  const params = useParams();
  //   console.log(id);

  useEffect(() => {
    if (params.id) {
      const fetchPlaces = async () => {
        const res = await axios.get(`/bookings/${params.id}`);
        // console.log(res);
        setBookings(res.data);
      };
      fetchPlaces();
    }
  }, [params]);

  //   console.log(bookings);
  return (
    <div className="flex flex-col gap-10">
      {bookings?.map((booking) => (
        <div
          onClick={() => navigate(`/bookingInfo/${booking._id}`)}
          key={booking?._id}
          className="flex flex-col md:flex-row md:gap-2 shadow-md hover:shadow-lg hover:scale-105 transform duration-100 ease-linear hover:bg-gray-300 cursor-pointer font-serif w-full md:w-[70%] mx-auto rounded-xl p-2 bg-slate-300"
        >
          {/* left */}
          <img
            src={booking?.place?.photos[0]}
            alt=""
            className="rounded-xl w-full h-[300px] md:w-[200px] md:h-[200px]"
          />

          {/* right */}
          <div className="flex flex-col justify-between gap-2 p-3">
            {/* top */}
            <h3 className="text-2xl font-semibold">{booking?.place?.title}</h3>
            {/* middle */}
            <div className="flex items-center gap-5 md:gap-3 whitespace-nowrap flex-wrap">
              <div className="flex items-center gap-3">
                <BsMoon className="w-7 h-7 text-yellow-300" />
                <span className="font-semibold">
                  {booking?.numberOfNight} Night
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FiUsers className="w-7 h-7 text-blue-300" />
                <span className="font-semibold">{booking?.numberOfGuests}</span>
              </div>

              <div className="flex items-center gap-1">
                <MdOutlineDateRange className="w-7 h-7 text-red-300" />
                <span className="font-semibold">
                  {" "}
                  {format(new Date(booking?.checkIn), "yyyy-MM-dd")}
                </span>
                <BsArrowRight />
                <MdOutlineDateRange className="w-7 h-7 text-red-300" />
                <span className="font-semibold">
                  {" "}
                  {format(new Date(booking?.checkOut), "yyyy-MM-dd")}
                </span>
              </div>
            </div>
            {/* bottom */}
            <p className="flex items-center gap-3 mt-3">
              <MdOutlinePayment className="w-7 h-7 text-amber-400" />
              <span className="font-semibold text-lg">
                Total Price:{" "}
                <span className="font-semibold text-xl">${booking?.price}</span>
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileBooking;
