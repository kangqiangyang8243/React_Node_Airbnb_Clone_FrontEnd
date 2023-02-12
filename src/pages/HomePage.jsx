import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [places, setPlaces] = React.useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await axios.get(`/places/`);
      // console.log(res.data);
      setPlaces(res.data);
    };
    fetchPlaces();
  }, []);

  // console.log(places);
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 font-serif ">
        {places
          ?.filter((item) => item.someoneBook === false)
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          ?.map((place) => (
            <Link to={`/places/${place?._id}`} key={place?._id}>
              <div className="bg-gray-100 h-full  group shadow-md cursor-pointer overflow-hidden hover:bg-gray-200 hover:shadow-lg transform duration-100 ease-linear p-3 rounded-lg flex flex-col justify-between gap-1">
                <img
                  src={place?.photos[0]}
                  alt=""
                  className="w-full h-1/2 group-hover:scale-110 rounded-lg transform duration-100 ease-linear"
                />
                <h3 className="text-2xl font-semibold">{place?.title}</h3>
                <p className="line-clamp-3 text-gray-500">
                  {place?.description}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-xl">
                    ${place?.price}{" "}
                  </span>{" "}
                  Per Night
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
