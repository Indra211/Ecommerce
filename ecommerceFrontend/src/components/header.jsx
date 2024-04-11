import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../utility/Toast";
import { updateUserData } from "../redux/userSlice";
import { admin_email } from "../utility/const";

export const Header = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userData.userdata);
  const cart_data = useSelector((state) => state.products.cartItems);
  const [showMenu, setShowmenu] = useState(false);
  const handleMenu = () => {
    setShowmenu(!showMenu);
  };
  const navigation = useNavigate();
  return (
    <header className="fixed shadow-md  bg-white w-full h-16 px-2 md:px-4 z-50">
      <div className="flex items-center h-full justify-between">
        <div
          onClick={() => {
            navigation("/");
          }}
          className="cursor-pointer"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Indra
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex gap-4 md:gap-8 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <Link to={"cart"}>
            <div className="text-2xl text-slate-600 relative">
              <BsCartFill />
              <div className="absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 text-xs rounded-full text-center">
                {cart_data?.length}
              </div>
            </div>
          </Link>
          <div className="text-2xl text-slate-600 ">
            <div
              className="border-2 border-solid border-slate-600 p-0.5 rounded-full cursor-pointer"
              onClick={handleMenu}
            >
              {userdata?.profilePic ? (
                <img
                  src={userdata?.profilePic}
                  className="w-8  h-8 rounded-full"
                  alt="user"
                />
              ) : (
                <FaUserAlt />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md text-base">
                <p
                  className="whotespace-nowrap cursor-pointer"
                  onClick={handleMenu}
                >
                  {userdata?.email === admin_email && (
                    <Link to={"newproduct"}> New Product</Link>
                  )}
                </p>
                <p
                  className="whotespace-nowrap cursor-pointer"
                  onClick={handleMenu}
                >
                  <Link
                    to={"login"}
                    onClick={() => {
                      if (userdata?.email) {
                        showToast("success", "Logout Sucessfull");
                        dispatch(updateUserData({}));
                      }
                    }}
                  >
                    {userdata?.email ? "Logout" : "Login"}
                  </Link>
                  <div className="flex flex-col md:hidden">
                    <p>
                      {" "}
                      <Link to={""}>Home</Link>
                    </p>
                    <p>
                      {" "}
                      <Link to={"menu"}>Menu</Link>
                    </p>
                    <p>
                      {" "}
                      <Link to={"about"}>About</Link>
                    </p>
                    <p>
                      {" "}
                      <Link to={"contact"}>Contact</Link>
                    </p>
                  </div>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
