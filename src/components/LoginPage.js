import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import NetFlixLogo from "./NetFlixLogo";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [signIn, setSignIn] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    // validate the form data

    const error = checkValidData(email.current.value, password.current.value);
    if (error === "Email ID is not valid!!") {
      setEmailErrorMessage("Email ID is not valid!!");
    } else if (error === "Password is not Strong!") {
      setPasswordErrorMessage("Password is not Strong!!");
    } else if (error === null) {
      setEmailErrorMessage(null);
      setPasswordErrorMessage(null);
    }

    if (error) return;
    // Signin Signup process logic

    if (!signIn) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Sign up
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/104058195?s=400&u=47926a3e24673a08c71beb865574434e545cf253&v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          console.log(user);
          setErrorMessage(!null);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // sign In logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setErrorMessage(!null);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handleSignInSignUp = () => {
    setSignIn(!signIn);
  };

  return (
    <div className="w-full px-8 absolute py-2 bg-gradient-to-b from-zinc-950">
      <NetFlixLogo />
      <div className="sm: w-full lg:w-3/12 ml-auto mr-auto mt-5 p-2 bg-black text-center rounded-sm  bg-gradient from-zinc-900 opacity-85 lg:h-[700px]">
        {signIn && (
          <h1 className="text-start text-white text-3xl font-bold mt-4 -mb-8 lg:ml-16">
            Sign In
          </h1>
        )}
        {!signIn && (
          <h1 className="text-start text-white text-3xl font-bold mt-4 lg:ml-16">
            Sign Up
          </h1>
        )}
        <form
          className="sm: lg:w-8/12 flex flex-col mt-8 ml-auto mr-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          {!signIn && (
            <div className="relative w-full text-start ml-auto mr-auto  ">
              <label className="text-white absolute text-[0.75rem] left-4 top-1 w-full pt-1 ">
                Full Name
              </label>
              <input
                ref={name}
                type="text"
                className="p-2  rounded-sm bg-slate-900 border text-white pl-4 text-[1rem] pt-6 m w-full "
              />
            </div>
          )}
          <div
            className="relative w-full text-start ml-auto mr-auto mt-8"
            //   (signUp && "mt-8 bg-black")
          >
            <label className="text-white absolute text-[0.75rem] left-4 top-1 w-full pt-1 ">
              Email
            </label>
            <input
              ref={email}
              type="text"
              className="p-2  rounded-sm bg-slate-900 border text-white pl-4 text-[1rem] pt-6 m w-full "
            />
          </div>
          <p className="text-red-500 font-medium p-2 ">{emailErrorMessage}</p>
          <div className="relative w-full text-start ml-auto mr-auto mt-8  ">
            <label className="text-white absolute text-[0.75rem] left-4 top-1 w-full pt-1 ">
              Password
            </label>
            <input
              ref={password}
              type="password"
              className="p-2  rounded-sm bg-slate-900 border text-white pl-4 text-[1rem] pt-6 m w-full "
            />
          </div>

          <p className="text-red-600 p-2 ">{passwordErrorMessage}</p>
          <p className="text-red-600 p-2 ">{errorMessage}</p>

          <button
            className="p-2 bg-red-600 w-full ml-auto mr-auto mt-8 text-white font-bold rounded-sm m-2"
            onClick={handleButtonClick}
          >
            {signIn ? "Sign In" : "Sign Up"}
          </button>
          {signIn && (
            <h1 className="w-full text-gray-300 text-[16px] mt-2">OR</h1>
          )}
          {signIn && (
            <button className="p-2 bg-zinc-400 text-[18px] w-full ml-auto mr-auto mt-8 text-white font-bold rounded-sm m-2">
              Use a sign-in code
            </button>
          )}
          {signIn && (
            <h1 className="w-full text-white text-xl mt-2">Forget Password?</h1>
          )}

          <h1 className="w-full text-gray-300 text-start text-[16px] mt-5">
            {signIn ? " New to Netflix?" : " Back to"}

            <span
              className="font-bold text-white ml-1 cursor-pointer text-[18px]"
              onClick={() => handleSignInSignUp()}
            >
              {signIn ? " Sign-up now." : " Sign-In."}
            </span>
          </h1>

          <h1 className="w-full text-gray-200  text-start text-[13px] mt-5">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </h1>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
