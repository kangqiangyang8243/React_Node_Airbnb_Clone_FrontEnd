import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiCloudUpload, BiRadio, BiWifi } from "react-icons/bi";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { MdLocalParking } from "react-icons/md";
import { TfiLayoutMediaCenter } from "react-icons/tfi";
function PerksComponents({ perks, setPerks }) {
  const handleCheck = (e) => {
    // console.log(e.target.checked);
    // console.log(e.target.name);
    if (e.target.checked) {
      setPerks((prev) => [...prev, e.target.name]);
    } else {
      const newPerks = perks.filter((item) => item !== e.target.name);
      setPerks(newPerks);
    }
  };
  //   console.log(perks);

  return (
    <div className="flex justify-between  flex-wrap md:flex-nowrap gap-2">
      <div className="flex font-serif text-lg shadow-md items-center border gap-2 px-2 py-4 w-full justify-center rounded-lg">
        <input
          type="checkbox"
          name="wifi"
          onChange={(e) => handleCheck(e)}
          className="cursor-pointer w-5 h-5 rounded-lg"
        />
        <label className="flex  items-center gap-2 cursor-pointer">
          <BiWifi className="w-7 h-7" />
          <p className="text-md">WIFI</p>
        </label>
      </div>

      <div className="flex font-serif text-lg shadow-md items-center border gap-2 px-2 py-4 w-full justify-center rounded-lg">
        <input
          type="checkbox"
          name="parking"
          onChange={(e) => handleCheck(e)}
          className="cursor-pointer w-5 h-5 rounded-lg"
        />
        <label className="flex  items-center gap-2 cursor-pointer">
          <MdLocalParking className="w-7 h-7" />
          <p className="text-md">FREE PARKING</p>
        </label>
      </div>

      <div className="flex font-serif text-lg shadow-md items-center border gap-2 px-2 py-4 w-full justify-center rounded-lg">
        <input
          type="checkbox"
          name="TV"
          onChange={(e) => handleCheck(e)}
          className="cursor-pointer w-5 h-5 rounded-lg"
        />
        <label className="flex  items-center gap-2 cursor-pointer">
          <TfiLayoutMediaCenter className="w-7 h-7" />
          <p className="text-md">TV</p>
        </label>
      </div>

      <div className="flex font-serif text-lg shadow-md items-center border gap-2 px-2 py-4 w-full justify-center rounded-lg">
        <input
          type="checkbox"
          name="Radio"
          onChange={(e) => handleCheck(e)}
          className="cursor-pointer w-5 h-5 rounded-lg"
        />
        <label className="flex  items-center gap-2 cursor-pointer">
          <BiRadio className="w-7 h-7" />
          <p className="text-md">Radio</p>
        </label>
      </div>

      <div className="flex font-serif text-lg shadow-md items-center border gap-2 px-2 py-4 w-full justify-center rounded-lg">
        <input
          type="checkbox"
          name="Pets"
          onChange={(e) => handleCheck(e)}
          className="cursor-pointer w-5 h-5 rounded-lg"
        />
        <label className="flex  items-center gap-2 cursor-pointer">
          <AiOutlineLike className="w-7 h-7" />
          <p className="text-md">Pets</p>
        </label>
      </div>

      <div className="flex font-serif text-lg shadow-md items-center border gap-2 px-2 py-4 w-full justify-center rounded-lg">
        <input
          type="checkbox"
          onChange={(e) => handleCheck(e)}
          name="private_entrance"
          className="cursor-pointer w-5 h-5 rounded-lg"
        />
        <label className="flex  items-center gap-2 cursor-pointer">
          <RiGitRepositoryPrivateLine className="w-7 h-7" />
          <p className="text-md">Private Entrance</p>
        </label>
      </div>
    </div>
  );
}

export default PerksComponents;
