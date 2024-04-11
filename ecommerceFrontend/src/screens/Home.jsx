import { useSelector } from "react-redux";
import { HomeCard } from "../components/HomeCard";
import { CardFeature } from "../components/CardFeatures";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { FilterProd } from "../components/FilterProd";
import { MenuList } from "../components/MenuList";
import { useDispatch } from "react-redux";
import { addUserData } from "../redux/userSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userData.userdata);
  const products_data = useSelector((state) => state.products.product_data);
  const homeProductList =
    products_data?.length > 5 ? products_data?.slice(1, 5) : products_data;
  const cardRef = useRef();
  const nextProd = () => {
    cardRef.current.scrollLeft += 500;
  };
  const prevProd = () => {
    cardRef.current.scrollLeft -= 500;
  };
  const getUser = localStorage.getItem("user");
  useEffect(() => {
    if (getUser) {
      dispatch(addUserData(JSON.parse(getUser)));
    }
  }, []);
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="flex gap-3 items-center  bg-slate-500 font-medium text-white rounded-full w-36 px-2">
            <p className="text-sm">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold">
            The Fasted Delivery in{" "}
            <span className="text-orange-900">Your Home</span>
          </h2>
          <p className="py-2 text-base text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            facere inventore quis et modi minus distinctio nisi, maxime nulla
            pariatur ad tenetur ipsam dolor molestias reiciendis explicabo ea
            atque dolorem?
          </p>
          <button className="font-bold bg-blue-500 text-white px-4 py-2 rounded-full">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex gap-6 flex-wrap p-4 justify-center">
          {homeProductList?.map((item) => (
            <>
              <HomeCard
                id={item?._id}
                key={item.prod_pic}
                name={item?.prod_name}
                pic={item?.prod_pic}
                price={item?.prod_price}
                belongs={item?.prod_cat}
              />
            </>
          ))}
        </div>
      </div>
      <div className="">
        <div className="flex justify-between mb-1">
          <h2 className="font-bold text-2xl text-slate-900">All Products</h2>
          <div className="flex gap-6 items-center">
            <span
              onClick={prevProd}
              className="bg-slate-300 text-2xl rounded cursor-pointer"
            >
              <IoIosArrowBack />
            </span>
            <span
              onClick={nextProd}
              className="bg-slate-300 text-2xl rounded cursor-pointer"
            >
              <IoIosArrowForward />
            </span>
          </div>
        </div>
        <div
          ref={cardRef}
          className="flex gap-10 overflow-scroll scrollbar-none scroll-smooth transistion-all"
        >
          {products_data?.map((item) => (
            <CardFeature
              key={item._id}
              id={item?._id}
              name={item?.prod_name}
              pic={item?.prod_pic}
              price={item?.prod_price}
              belongs={item?.prod_cat}
            />
          ))}
        </div>
      </div>
      <MenuList label={"Your Products"} />
    </div>
  );
};
