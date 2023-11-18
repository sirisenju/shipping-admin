import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // navigate to admin
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div className="w-full sm:w-[80%] mx-auto flex gap-x-2 py-2">
        <img src=" /assets/logo.png" alt="" />
        <div className="">
          <p className="text-lg">UPs Global Fleet</p>
          <p className=" text-xs">Courier Service</p>
        </div>
      </div>
      <div className="w-full sm:w-[80%] mx-auto flex justify-center">
        <div className="w-full p-2 md:w-[50%] pt-[5%] pb-[5%]">
          <h1 className=" text-3xl pb-2">Login</h1>
          <p className=" text-lg pb-14">
            Input email or username below to login
          </p>
          <form action="" onSubmit={handleLogin}>
            <div className="pb-4">
              <input
                type="text"
                placeholder="Email or Username"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                className="w-full pl-2 h-10 rounded-md outline-none border-2 border-[#848185]"
              />
            </div>
            <div className="pb-1">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                className="w-full h-10 pl-2 rounded-md outline-none border-2 border-[#848185]"
              />
            </div>
            <div className="pt-5 text-white">
              <button
                type="submit"
                className="w-full bg-[#ED7D1A] text-center rounded-md py-2"
              >
                Login
              </button>
              {error && <span>Wrong email or password</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginAdmin;
