import { useState } from "react";
import { Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../utility/Urls";
import { showToast } from "../utility/Toast";
import { useDispatch } from "react-redux";
import { addUserData } from "../redux/userSlice";
import signUp from "../assest/login-animation.gif";
import { addTokens } from "../redux/AuthTokens";

export const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const response = await fetch(URL.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      try {
        if (response.ok) {
          const jsondata = await response.json();
          if (jsondata.status === "success") {
            showToast(jsondata.status, jsondata.message);
            dispatch(addTokens(jsondata?.data?.token));
            const userData = await fetch(URL.user(email), {
              method: "GET",
              headers: {
                Authorization: `Bearer ${jsondata?.data?.token?.access_token}`,
              },
            });
            const userDataRes = await userData?.json();
            dispatch(addUserData(userDataRes?.data));
            localStorage.setItem("user", JSON.stringify(userDataRes?.data));
            navigation("/");
          } else {
            showToast(jsondata.status, jsondata.message);
          }
        }
      } catch (err) {
        console.log(err);
        showToast("error", "something went wrong");
      }
    }
  };
  return (
    <div className="p-3 md:4">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-2 rounded">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md">
          <img src={signUp} className="w-full" alt="SignUp" />
        </div>
        <form className="w-full py-2 flex flex-col" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full self-center max-w-[150px] bg-blue-400 hover:bg-blue-600 cursor-pointer p-1 rounded-full mt-2 text-white text-base font-semibold"
          >
            LogIn
          </button>
        </form>
        <span className="text-xs">
          Don't have account ?
          <span className="text-sm text-blue-500 curson-pointer">
            <Link to={"/signup"}> SignUp</Link>
          </span>
        </span>
      </div>
    </div>
  );
};
