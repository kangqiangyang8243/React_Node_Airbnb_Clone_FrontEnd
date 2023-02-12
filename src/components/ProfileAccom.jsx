import axios from "axios";
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdAdd, MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import { toast } from "react-toastify";

function ProfileAccom() {
  const navigate = useNavigate();
  const params = useParams();
  const [places, setPlaces] = React.useState([]);

  //   console.log(params.id);

  useEffect(() => {
    if (params.id) {
      const fetchPlaces = async () => {
        const res = await axios.get(`/places/${params.id}`);
        // console.log(res.data);
        setPlaces(res.data);
      };
      fetchPlaces();
    }
  }, [params]);

  //   console.log(places);

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`/places/${id}`);
        // console.log(res.data);
        // setPlaces(res.data);

        await axios.delete(`/bookings/${id}`);

        toast.success("Delete post successfully");
        navigate("/");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className=" font-serif gap-10 flex flex-col items-center">
      {/* top */}
      <button
        onClick={() => navigate(`/profile/createplaces`)}
        className="flex items-center cursor-pointer shadow-md hover:bg-red-600 gap-3 py-2 px-3 bg-red-500 rounded-full text-white"
      >
        <MdAdd className="text-white w-7 h-7 " />
        <span> Add New Places</span>
      </button>

      {/* bottom */}
      {places?.length > 0 &&
        places
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          ?.map((place) => (
            <div
              key={place?._id}
              className="md:grid grid-cols-3 flex flex-col bg-gray-200 md:w-[80%] mx-auto cursor-pointer group hover:shadow-lg gap-2  md:gap-5  rounded-lg shadow-md hover:bg-gray-300  transform duration-100 ease-linear p-3"
            >
              <div
                onClick={() => navigate(`/places/${place?._id}`)}
                className="w-full col-span-1 overflow-hidden rounded-lg"
              >
                <img
                  src={place?.photos[0]}
                  alt=""
                  className="rounded-lg w-full h-full group-hover:scale-110 cursor-pointer  transform duration-100 ease-linear"
                />
              </div>
              {/* right */}
              <div className="flex flex-col gap-2  col-span-2">
                <div className="flex items-center whitespace-nowrap w-full justify-between">
                  <h3 className="text-lg md:text-2xl font-semibold">
                    {place?.title}
                  </h3>
                  {/* Update Time */}
                  <TimeAgo
                    className="text-gray-500 text-sm md:pr-5"
                    date={place?.updatedAt}
                  />
                </div>
                <p className="line-clamp-2 sm:line-clamp-4 md:line-clamp-6 text-sm text-gray-600">
                  {place?.description}
                </p>
                <div className="w-full flex items-center justify-between">
                  {place?.someoneBook ? (
                    <p className="bg-red-500 text-white px-3 py-2 mt-3 shadow-md">
                      Some One BooK!
                    </p>
                  ) : (
                    <p></p>
                  )}
                  <div className="flex  items-center md:mt-3 pr-3 gap-3 justify-end">
                    <button
                      onClick={() =>
                        navigate(`/profile/editplace/${place?._id}`)
                      }
                    >
                      {" "}
                      <BiEdit className="cursor-pointer md:w-7 md:h-7 hover:text-green-500 text-green-600" />
                    </button>
                    <MdDelete
                      onClick={() => deletePost(place?._id)}
                      className="cursor-pointer md:w-7 md:h-7 hover:text-red-500 text-red-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ProfileAccom;
