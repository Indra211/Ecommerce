import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  updateProductsToCart,
  increaseQty,
  decreaseQty,
} from "../redux/ProductSLice";

export const CartProduct = ({ data }) => {
  const { _id, prod_name, prod_cat, prod_pic, prod_price, qty, total } = data;
  const dispatch = useDispatch();
  let quantity = parseInt(qty);
  return (
    <div className="flex mb-2 w-full relative bg-slate-200 p-2 items-center gap-2 border rounded border-slate-800">
      <div className="p-3 bg-white rounded">
        <img className="h-28 w-32 object-cover" src={prod_pic} alt="" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-600  capitalize text-sm">
          {prod_name}
        </h3>
        <p className="font-medium text-slate-400  text-sm">{prod_cat}</p>
        <p className=" text-red-400 capitalize">
          ₹
          <span className="font-bold text-slate-600  text-sm">
            {" "}
            {prod_price}
          </span>
        </p>
        <div className="flex gap-4 items-center">
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (qty !== 1) {
                  dispatch(decreaseQty({ _id, qty: (quantity += 1) }));
                }
              }}
              className=" flex items-center px-2 py-1 rounded bg-slate-300 hover:bg-slate-400 font-semibold"
            >
              <FaMinus />
            </button>
            <p className="font-semibold">{qty}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(increaseQty({ _id, qty: (quantity += 1) }));
              }}
              className="flex items-center px-2 py-1 rounded bg-slate-300 hover:bg-slate-400 font-semibold"
            >
              <FaPlus />
            </button>
          </div>
          <p className="font-medium text-xs">
            Total :<label className="font-semibold text-base">₹ {total}</label>
          </p>
        </div>
        <buuton
          onClick={(e) => {
            e.preventDefault();
            dispatch(updateProductsToCart({ _id }));
          }}
          className="absolute hover:text-red-700 cursor-pointer right-4 top-4 text-xl"
        >
          <MdDelete />
        </buuton>
      </div>
    </div>
  );
};
