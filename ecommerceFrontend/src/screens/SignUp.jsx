import { useState } from "react";
import signUp from "../assest/login-animation.gif";
import { Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { imgtobase64 } from "../utility/ImagetoBase64";
import { URL } from "../utility/Urls";
import { showToast } from "../utility/Toast";
import { useDispatch } from "react-redux";
import { addUserData } from "../redux/userSlice";
import { addTokens } from "../redux/AuthTokens";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const handleUploadImage = async (img) => {
    try {
      const base64Data = await imgtobase64(img);
      setProfilePic(base64Data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password?.length >= 8) {
      if (password === cnfPassword) {
        const response = await fetch(URL.signup, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            profilePic,
          }),
        });
        const jsonData = await response.json();
        if (jsonData?.status === "success") {
          showToast(jsonData.status, jsonData.message);
          dispatch(addTokens(jsonData?.data?.token));
          const userData = await fetch(URL.user(email), {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jsonData?.data?.token?.access_token}`,
            },
          });
          const userDataRes = await userData?.json();
          dispatch(addUserData(userDataRes?.data));
          localStorage.setItem("user", JSON.stringify(userDataRes?.data));
          navigation("/");
        } else {
          showToast(jsonData.status, jsonData.message);
        }
      } else {
        alert("Passwords are not match");
        setCnfPassword("");
        setPassword("");
      }
    } else {
      showToast(
        "error",
        "Kindly check all fields and password should be more than 8 characters"
      );
    }
  };
  return (
    <div className="p-3 md:4">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-2 rounded">
        {/* <h1 className="text-center text-2x1 font-bold">Sign Up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={profilePic ? profilePic : signUp}
            className="w-full"
            alt="SignUp"
          />
          <label htmlFor={"profileImage"} className="cursor-pointer">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center">
              <p className="text-sm p-1 tex-white">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                handleUploadImage(e.target.files[0]);
              }}
            />
          </label>
        </div>
        <form className="w-full py-2 flex flex-col" onSubmit={handleSubmit}>
          <Input
            label={"First Name"}
            id={"firstName"}
            type={"text"}
            required={true}
            value={firstName}
            setValue={setFirstName}
          />
          <Input
            label={"Last Name"}
            id={"lastName"}
            type={"text"}
            required={true}
            value={lastName}
            setValue={setLastName}
          />
          <Input
            type={"email"}
            label={"Email"}
            id={"email"}
            required={true}
            value={email}
            setValue={setEmail}
          />
          <Input
            type={"password"}
            label={"Password"}
            id={"password"}
            required={true}
            value={password}
            setValue={setPassword}
          />
          <Input
            type={"password"}
            label={"Confirm Password"}
            id={"conformPassword"}
            required={true}
            value={cnfPassword}
            setValue={setCnfPassword}
          />
          <button
            type="submit"
            className="w-full self-center max-w-[150px] bg-blue-400 hover:bg-blue-600 cursor-pointer p-1 rounded-full mt-2 text-white text-base font-semibold"
          >
            Submit
          </button>
        </form>
        <span className="text-xs">
          Already have account ?
          <span className="text-sm text-blue-500 curson-pointer">
            <Link to={"/login"}> Log In</Link>
          </span>
        </span>
      </div>
    </div>
  );
};
