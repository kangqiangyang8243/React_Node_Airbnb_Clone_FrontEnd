import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { BsArrowRight, BsMoon } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdClose, MdOutlineDateRange, MdPlace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

function BookingInfoPage() {
  const [showMorePhoto, setShowMorePhoto] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState([]);
  // console.log(id);
  useEffect(() => {
    if (id) {
      const fetchBooking = async () => {
        const res = await axios.get(`/bookings/singlebooking/${id}`);
        //   console.log(res.data);
        setBookingInfo(res.data);
      };

      fetchBooking();
    }
  }, [id]);
  //   console.log(bookingInfo);

  const CancelBooking = async (placeId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.put(`places/someoneBook/${placeId}`, {
          someoneBook: false,
        });

        await axios.delete(`/bookings/${placeId}`);

        toast.success("Cancel Booking successfully");
        navigate("/");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      {showMorePhoto ? (
        <div className="w-full bg-gray-400  z-50 absolute top-0 ">
          <div className="max-w-7xl relative mx-auto  flex p-5">
            <div className="flex w-full overflow-hidden flex-col shadow-2xl rounded-3xl  p-5  gap-5 flex-grow">
              {bookingInfo?.place?.photos?.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt=""
                  className="w-full h-auto md:h-[650px] shadow-lg hover:scale-105 transform duration-150 ease-out cursor-pointer rounded-3xl"
                />
              ))}
            </div>
            <div
              onClick={() => setShowMorePhoto(false)}
              className=" right-10  top-5 fixed  cursor-pointer flex justify-end "
            >
              <MdClose className="text-white hover:bg-gray-200 rounded-full bg-gray-500 shadow-lg w-10 h-10 md:w-20 md:h-20" />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl  mx-auto  m-3 font-serif">
          {/* info */}
          <div className="w-full gap-3 flex flex-col p-3">
            {/* title */}
            <div className="flex w-full items-center justify-between">
              <h2 className="text-2xl font-semibold px-3">
                {bookingInfo?.place?.title}
              </h2>
            </div>
            <div className="flex w-full items-center justify-between">
              {/* address */}
              <a
                href={
                  `https://maps.google.com/?q=` + bookingInfo?.place?.address
                }
                className="flex items-center gap-1 px-3 underline underline-offset-4 text-blue-400 cursor-pointer hover:text-blue-500"
              >
                <MdPlace className="w-10 h-10" />
                <p>{bookingInfo?.place?.address}</p>
              </a>

              {/* cancel booking */}
              <button
                onClick={() => CancelBooking(bookingInfo?.place?._id)}
                className="md:px-4 md:mr-7 md:py-3 p-2 font-semibold bg-red-500 hover:bg-red-400 text-white rounded-lg shadow-md"
              >
                Cancel Booking
              </button>
            </div>

            {/* booking Info */}
            <div className="w-full flex flex-col md:flex-row gap-5 items-center  p-7  shadow-md hover:shadow-lg transform duration-100 ease-linear hover:bg-gray-300 cursor-pointer font-serif  rounded-xl  bg-gray-200">
              {/* left */}
              <div className="flex flex-col gap-5  flex-grow">
                <h1 className="text-lg md:text-2xl font-semibold whitespace-nowrap">
                  Your Booking Information:
                </h1>
                <div className="flex items-center gap-5 md:gap-3 whitespace-nowrap flex-wrap">
                  <div className="flex items-center gap-3">
                    <BsMoon className="w-7 h-7 text-yellow-300" />
                    <span className="font-semibold md:text-lg">
                      {bookingInfo?.numberOfNight} Night
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiUsers className="w-7 h-7 text-blue-300" />
                    <span className="font-semibold md:text-lg">
                      {bookingInfo?.numberOfGuests}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MdOutlineDateRange className="w-7 h-7 text-red-300" />
                    <span className="font-semibold md:text-lg">
                      {/* {format(new Date(bookingInfo?.checkIn), "yyyy-MM-dd")} */}

                      {moment(bookingInfo?.checkIn).format("YYYY-MM-DD")}
                    </span>
                    <BsArrowRight />
                    <MdOutlineDateRange className="w-7 h-7 text-red-300" />
                    <span className="font-semibold md:text-lg">
                      {moment(bookingInfo?.checkOut).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="md:p-5 p-2 w-full md:w-fit flex flex-col items-center justify-center rounded-lg shadow-md text-white bg-slate-400">
                <p className="md:text-lg whitespace-nowrap">
                  Total Price:{" "}
                  <span className="font-semibold text-green-300 md:text-2xl">
                    ${bookingInfo?.price}
                  </span>
                </p>
              </div>
            </div>

            {/* img */}
            <div className="grid grid-cols-3 gap-3 rounded-3xl  shadow-lg bg-white p-3   relative">
              <div className="overflow-hidden w-full col-span-2 rounded-tl-3xl rounded-bl-3xl">
                <img
                  src={bookingInfo?.place?.photos[0]}
                  alt=""
                  className=" rounded-tl-3xl rounded-bl-3xl  hover:scale-105 transform duration-100 ease-in-out  w-full h-full  cursor-pointer"
                />
              </div>
              <div className=" col-span-1 rounded-tr-3xl rounded-br-3xl flex flex-col overflow-hidden gap-3">
                <img
                  src={bookingInfo?.place?.photos[1]}
                  alt=""
                  className=" rounded-tr-3xl cursor-pointer h-1/2   hover:scale-105 transform duration-100 ease-in-out"
                />
                <img
                  src={bookingInfo?.place?.photos[2]}
                  alt=""
                  className="  rounded-br-3xl cursor-pointer h-1/2  hover:scale-105 transform duration-100 ease-in-out"
                />
              </div>

              <button
                onClick={() => setShowMorePhoto(true)}
                className="absolute bottom-2 right-2 md:bottom-10 md:right-10  bg-slate-100 rounded-lg md:px-5 md:py-3 p-2 hover:bg-slate-300 transform duration-100 ease-in-out hover:shadow-lg shadow-md"
              >
                More Photos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingInfoPage;
