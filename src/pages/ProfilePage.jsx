import React, { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { TfiMenuAlt } from "react-icons/tfi";
import { GiCastle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ProfileAccom from "../components/ProfileAccom";
import ProfileBooking from "../components/ProfileBooking";

function ProfilePage() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showProfile, setShowProfile] = React.useState(true);
  const [showBookings, setShowBookings] = React.useState(false);
  const [showAccom, setShowAccom] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN)) {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_TOKEN)
      );
      setCurrentUser(user);
    }
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-3 ">
      <div className="w-full flex flex-col items-center gap-10">
        {/* top */}
        <div className="flex flex-col md:flex-row  w-[300px] items-center md:mt-10 gap-3 md:gap-10 justify-center">
          <button
            onClick={() => {
              setShowAccom(false);
              setShowBookings(false);
              setShowProfile(true);
            }}
            className={`ProfileBtns ${showProfile && `bg-red-500 text-white`}`}
          >
            <FiUser />
            My Profile
          </button>
          <button
            onClick={() => {
              setShowAccom(false);
              setShowBookings(true);
              setShowProfile(false);
            }}
            className={`ProfileBtns ${showBookings && `bg-red-500 text-white`}`}
          >
            <TfiMenuAlt />
            My Bookings
          </button>
          <button
            onClick={() => {
              setShowAccom(true);
              setShowBookings(false);
              setShowProfile(false);
            }}
            className={`ProfileBtns ${showAccom && `bg-red-500 text-white`}`}
          >
            <GiCastle />
            My Accommondations
          </button>
        </div>

        {/* bottom */}
        {showProfile && (
          <div className="flex flex-col gap-4 font-serif w-[300px] md:w-[400px] items-center">
            <h3 className="text-lg text-center">
              Logged in as {currentUser?.username} ({currentUser?.email})
            </h3>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="w-full text-white font-semibold hover:bg-red-600 shadow-md hover:shadow-lg py-2 transform duration-100 ease-linear bg-red-500 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}

        {showBookings && (
          <div className="w-full">
            <ProfileBooking />
          </div>
        )}

        {showAccom && (
          <div className="w-full">
            <ProfileAccom />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
