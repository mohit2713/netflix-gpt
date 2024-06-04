import React from "react";
import NetFlixLogo from "./NetFlixLogo";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="flex justify-between">
      <NetFlixLogo />
      {user && (
        <div className="mr-8 mt-4 ">
          <img className="w-14 bg-slate-400" src={user?.photoURL} alt="user" />
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white p-2 m-2 font-bold rounded-md"
          >
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Browse;
