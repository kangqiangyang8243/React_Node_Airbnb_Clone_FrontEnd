import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PerksComponents from "../components/PerksComponents";

function CreatePlacePage() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [owner, setOwner] = React.useState();
  const [photos, setPhotos] = React.useState([]);
  const [picLink, setPicLink] = React.useState([]);
  const [link, setLink] = React.useState("");
  const [multiPicLink, setMultiPicLink] = React.useState([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN)) {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_TOKEN)
      );
      setCurrentUser(user);
      setOwner(user?._id);
    }
  }, []);

  //   console.log(currentUser);
  //   console.log(owner);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine images to one array
    const ConcatFile = picLink.concat(multiPicLink);
    // let arr = [];
    //   upload picture to cloud
    for (let i = 0; i < ConcatFile.length; i++) {
      const formData = new FormData();
      formData.append("file", ConcatFile[i]);
      formData.append("upload_preset", "mfjdauro");

      try {
        await axios
          .post("https://api.cloudinary.com/v1_1/dj5qwihzu/upload", formData)
          .then((res) => {
            photos.push(res.data.url);
          });

        //   router.push("/admin");
      } catch (error) {
        toast.error("Something uploading went wrong");
        console.log(error);
      }
    }

    // console.log("1", photos);

    if (photos) {
      try {
        const postData = {
          owner,
          title,
          address,
          photos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        };

        await axios.post("/places/createplaces", postData);
        toast.success("New Places created successfully!");
        navigate("/");
      } catch (error) {
        toast.error("Something creating went wrong");
        console.log(error);
      }
    }

    // setMultiPicLink(null);
    // setPicLink(null);
  };

  const multiImg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImg = e.target.files[i];
      setMultiPicLink((prev) => [...prev, newImg]);
    }
  };

  //   console.log(multiPicLink);

  const deleteFile = (i) => {
    const s = picLink.filter((item, index) => index !== i);
    setPicLink(s);
  };

  const deleteMultiLinkFile = (i) => {
    const s = multiPicLink.filter((item, index) => index !== i);
    setMultiPicLink(s);
  };
  //   console.log("file", files);
  //   console.log(multiPicLink);

  return (
    <div className=" max-w-7xl font-serif mx-auto p-3">
      <div className="w-[80%] mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-7  p-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xl">Title</label>
            <p className="text-gray-500">
              Title of your place, should be short and catchy as in
              advertisemnet.
            </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="createPlaceInput"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xl">Address</label>
            <p className="text-gray-500">Address to this place.</p>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
              className="createPlaceInput"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xl">Photos</label>
            <p className="text-gray-500">More = Better.</p>
            <div className="flex gap-3 mb-2">
              <input
                accept=".jpg,.jpeg,.png,.gif,.jfif"
                type="text"
                value={link}
                placeholder="Image Link"
                className="createPlaceInput"
                id="url"
                onChange={(e) => setLink(e.target.value)}
              />
              <label
                htmlFor="url"
                onClick={() => {
                  setPicLink([...picLink, link]);
                  setLink("");
                }}
                className="p-2 whitespace-nowrap bg-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
              >
                Add Photo
              </label>
            </div>
            <div className="flex gap-2">
              {picLink &&
                picLink?.map((file, index) => (
                  <img
                    onClick={() => deleteFile(index)}
                    key={index}
                    src={file}
                    alt=""
                    className="w-20 h-20 rounded-lg shadow-md hover:scale-105 transform duration-100 ease-linear cursor-pointer"
                  />
                ))}
              {multiPicLink &&
                multiPicLink?.map((link, index) => (
                  <img
                    onClick={() => deleteMultiLinkFile(index)}
                    key={index}
                    src={URL.createObjectURL(link)}
                    alt=""
                    className="w-20 h-20 rounded-lg shadow-md hover:scale-105 transform duration-100 ease-linear cursor-pointer"
                  />
                ))}

              <input
                type="file"
                id="file"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.jfif"
                hidden
                onChange={multiImg}
              />
              <label
                htmlFor="file"
                className="w-20 h-20 shadow-md border bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center"
              >
                <BiCloudUpload className="w-10 h-10 text-slate-500" />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xl">Description</label>
            <p className="text-gray-500">Description of the place.</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="createPlaceInput h-24"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xl">Perks</label>
            <p className="text-gray-500">Select all the perks of your place.</p>
            <PerksComponents perks={perks} setPerks={setPerks} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xl">Extra Info</label>
            <p className="text-gray-500">House Rules, Etc.</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder="Extra Information"
              className="createPlaceInput h-24"
            />
          </div>

          <div className="flex flex-col  gap-3">
            <label className="text-2xl font-semibold">Check In&Out Times</label>
            <p className="text-gray-500">
              Add check in and check out times, remember to have sometime window
              for cleaning the room between guests.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Check In Times</label>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="number"
                  placeholder="Check In Times"
                  className="createPlaceInput"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Check Out Times</label>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="number"
                  placeholder="Check Out Times"
                  className="createPlaceInput"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Maximum Guests</label>
                <input
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  type="number"
                  placeholder="Guest maximum"
                  className="createPlaceInput"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Price Per Night</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Price per Night"
                  className="createPlaceInput"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-500 py-2 text-white tracking-wide rounded-lg shadow-md hover:bg-red-600 mb-5"
          >
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePlacePage;
