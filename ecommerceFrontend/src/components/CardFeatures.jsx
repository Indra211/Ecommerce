import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductsToCart } from "../redux/ProductSLice";
export const CardFeature = ({ name, pic, price, belongs, id }) => {
  const dispatch = useDispatch();
  const handleAddCartProd = (e) => {
    e.stopPropagation();
    dispatch(
      addProductsToCart({
        _id: id,
        prod_cat: belongs,
        prod_name: name,
        prod_price: price,
        prod_pic: pic,
      })
    );
  };
  return (
    <div className="flex flex-col items-center bg-white  py-5 px-4 rounded cursor-pointer drop-shadow hover:shadow-lg">
      <Link
        to={`/menu/${id}`}
        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
      >
        <div className="flex flex-col items-center bg-white w-full min-w-[180px]">
          <div className="h-28 ">
            <img src={pic} className="h-full" alt="" />
          </div>
          <h3 className="font-semibold text-slate-600  capitalize text-sm">
            {name}
          </h3>
          <p className="font-medium text-slate-400  text-sm">{belongs}</p>
          <p className=" text-red-400 capitalize">
            ₹<span className="font-bold text-slate-600  text-sm"> {price}</span>
          </p>
        </div>
      </Link>
      <button
        onClick={handleAddCartProd}
        className="bg-red-500 hover:bg-red-900 px-2 mt-2 py-1 rounded text-white font-semibold"
      >
        Add cart
      </button>
    </div>
  );
};
