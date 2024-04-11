import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MenuList } from "../components/MenuList";
import { addProductsToCart } from "../redux/ProductSLice";

export const Menu = () => {
  const dispatch = useDispatch();
  const products_data = useSelector((state) => state.products.product_data);
  const { filterby } = useParams();
  const proDisplay = products_data?.filter((item) => item?._id === filterby);
  // if (filterby) {
  //   var { _id, prod_cat, prod_name, prod_price, prod_pic } = proDisplay?.[0];
  // }
  const handleAddCartProd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addProductsToCart(proDisplay?.[0]));
  };
  return (
    <div className="p-2 md:p-4">
      {filterby && (
        <div className="md:flex w-full max-w-4xl bg-white m-auto">
          <div className="max-w-md overflow-hidden max-h-[300px]">
            <img
              src={proDisplay?.[0]?.prod_pic}
              className="w-full h-full hover:scale-105 transition-all"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-600  capitalize text-xl md:text-2xl">
              {proDisplay?.[0]?.prod_name}
            </h3>
            <p className="font-medium text-slate-600  text-sm">
              {proDisplay?.[0]?.prod_cat}
            </p>
            <p className=" text-red-400 capitalize">
              ₹
              <span className="font-bold text-slate-600  text-sm">
                {" "}
                {proDisplay?.[0]?.prod_price}
              </span>
            </p>
            <div className="flex gap-4 items-center justify-center">
              <button className="bg-red-500 hover:bg-red-900 px-2 mt-2 py-1 rounded text-white min-w-24 font-semibold">
                Buy
              </button>
              <button
                onClick={handleAddCartProd}
                className="bg-red-500 hover:bg-red-900 px-2 mt-2 py-1 rounded text-white min-w-24 font-semibold"
              >
                Add cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-semibold">Description : </p>
              <p>{proDisplay?.[0]?.prod_desc}</p>
            </div>
          </div>
        </div>
      )}
      <MenuList label={"Your Products"} screen={"menu"} />
    </div>
  );
};
