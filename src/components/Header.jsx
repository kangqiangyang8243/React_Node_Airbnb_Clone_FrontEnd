import React, { useEffect } from "react";
import { SiYourtraveldottv } from "react-icons/si";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
function Header() {
  const [currentUser, setCurrentUser] = React.useState(null);
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN)) {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_TOKEN)
      );
      setCurrentUser(user);
    }
  }, []);

  // console.log(currentUser);
  return (
    <div className="w-full shadow-md bg-white sticky z-10 top-0">
      <div className="max-w-7xl font-serif mx-auto flex items-center justify-between py-4 px-2  ">
        {/* left */}
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer text-pink-500">
            <SiYourtraveldottv className="w-10 h-10" />
            <h3 className="text-2xl font-semibold ">airbnb</h3>
          </div>
        </Link>

        {/* middle */}
        <div className="md:inline-flex hidden divide-x gap-2 border border-gray-300 p-2 rounded-full shadow-lg ">
          <h3 className="cursor-pointer hover:underline-offset-4 hover:scale-105 transform duration-100 ease-linear hover:underline">
            Anywhere
          </h3>
          <h3 className="pl-2 cursor-pointer hover:underline-offset-4 hover:scale-105 transform duration-100 ease-linear hover:underline">
            Any week
          </h3>

          <h3 className="flex items-center">
            <p className="px-2 cursor-pointer hover:underline-offset-4 hover:scale-105 transform duration-100 ease-linear hover:underline">
              Any guests
            </p>
            <BsSearch className="w-6 h-6 font-semibold text-white bg-red-500 cursor-pointer p-1 rounded-full" />
          </h3>
        </div>

        {/* right */}
        <div className="flex items-center gap-1 text-gray-700 border border-gray-300 px-2 py-1 shadow-sm rounded-full">
          <AiOutlineMenuUnfold className="w-8 h-8 cursor-pointer hover:text-pink-600" />
          <Link to={currentUser ? `/profile/${currentUser?._id}` : "/login"}>
            <HiUserCircle className="w-8 h-8 cursor-pointer hover:text-pink-600" />
          </Link>

          {currentUser && <p>{currentUser?.username}</p>}
        </div>
      </div>
    </div>
  );
}

export default Header;
