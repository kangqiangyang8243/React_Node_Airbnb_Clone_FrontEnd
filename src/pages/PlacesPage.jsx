import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose, MdPlace } from "react-icons/md";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import TimeAgo from "react-timeago";

function PlacesPage() {
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [place, setPlace] = useState();
  const { id } = useParams();
  const [showMorePhoto, setShowMorePhoto] = useState(false);

  // console.log(id);
  useEffect(() => {
    if (id) {
      const fetchPlace = async () => {
        const res = await axios.get(`/places/singlePlace/${id}`);
        setPlace(res.data);
        // console.log(res.data);
      };

      fetchPlace();
    }
  }, [id]);

  // console.log(place);

  return (
    <>
      {showMorePhoto ? (
        <div className="w-full bg-gray-400  z-50 absolute top-0 ">
          <div className="max-w-7xl relative mx-auto  flex p-5">
            <div className="flex w-full overflow-hidden flex-col shadow-2xl rounded-3xl  p-5  gap-5 flex-grow">
              {place?.photos?.map((photo, index) => (
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
              <h2 className="text-2xl font-semibold px-3">{place?.title}</h2>
              {place?.someoneBook ? (
                <p className="bg-red-500 text-white px-3 py-2 mt-3 shadow-md">
                  Some One BooK!
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <div className="flex w-full items-center justify-between">
              {/* address */}
              <a
                href={`https://maps.google.com/?q=` + place?.address}
                className="flex items-center gap-1 px-3 underline underline-offset-4 text-blue-400 cursor-pointer hover:text-blue-500"
              >
                <MdPlace className="w-10 h-10" />
                <p>{place?.address}</p>
              </a>

              {/* Update Time */}
              <TimeAgo
                className="text-gray-500 md:pr-5 whitespace-nowrap"
                date={place?.updatedAt}
              />
            </div>

            {/* img */}
            <div className="grid grid-cols-3 gap-3 rounded-3xl  shadow-lg bg-white p-3   relative">
              <div className="overflow-hidden w-full col-span-2 rounded-tl-3xl rounded-bl-3xl">
                <img
                  src={place?.photos[0]}
                  alt=""
                  className=" rounded-tl-3xl rounded-bl-3xl  hover:scale-105 transform duration-100 ease-in-out  w-full h-full  cursor-pointer"
                />
              </div>
              <div className=" col-span-1 rounded-tr-3xl rounded-br-3xl flex flex-col overflow-hidden gap-3">
                <img
                  src={place?.photos[1]}
                  alt=""
                  className=" rounded-tr-3xl cursor-pointer h-1/2   hover:scale-105 transform duration-100 ease-in-out"
                />
                <img
                  src={place?.photos[2]}
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

            {/* description and check date and booking widget */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 px-3 mt-3">
              {/* description and check date */}
              <div className="md:w-[60%] flex flex-col gap-2 px-2">
                {/* description */}
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-gray-600 md:w-[90%]">
                  {showMoreDesc
                    ? place?.description
                    : place?.description.substring(0, 300).concat(".....")}{" "}
                  <span
                    onClick={() => setShowMoreDesc(!showMoreDesc)}
                    className="text-blue-400 cursor-pointer"
                  >
                    {showMoreDesc ? "Show Less" : "Show More"}
                  </span>
                </p>
                {/* check date */}
                <div className="mt-3">
                  <p>
                    Check-in: <span>{place?.checkIn}</span>
                  </p>
                  <p>
                    Check-out: <span>{place?.checkOut}</span>
                  </p>
                  <p>
                    Maximum Guests: <span>{place?.maxGuests}</span>
                  </p>
                </div>
              </div>
              {/* booking widget */}
              <div className="flex-1">
                <BookingForm place={place} />
              </div>
            </div>

            {/* extra info */}
            <div className="w-full mt-3 rounded-lg shadow-md bg-white p-5 flex flex-col gap-3">
              <h3 className="text-xl font-semibold">Extra Information</h3>
              <p className="text-gray-600 ">{place?.extraInfo}</p>
            </div>
          </div>

          {/* {place?.photos?.slice(0, 3)?.map((photo) => (
        <img src={photo} alt="" />
      ))} */}
        </div>
      )}
    </>
  );
}

export default PlacesPage;
