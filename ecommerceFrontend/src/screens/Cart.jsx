import { useSelector } from "react-redux";
import { HomeCard } from "../components/HomeCard";
import { CartProduct } from "../components/CartProductCard";
import empty from "../assest/empty.gif";
export const Cart = () => {
  const cart_data = useSelector((state) => state.products.cartItems);
  const totalPrice = cart_data?.reduce(
    (acc, cur) => acc + parseInt(cur?.total),
    0
  );
  const totalItems = cart_data?.reduce((acc, cur) => acc + cur?.qty, 0);
  return (
    <div>
      <div className="p-2 md:pd-4">
        <h2 className="text-lg font-bold text-slate-600 ">Your Cart Items</h2>
        {cart_data?.length > 0 ? (
          <div className="md:flex">
            <div className="flex md:flex-1 flex-col">
              {cart_data?.map((item, index) => (
                <CartProduct key={item?._id} data={item} />
              ))}
            </div>
            <div className="md:flex-1 w-full ml-auto">
              <h2 className="text-lg font-bold text-white bg-blue-400 p-2 ">
                Summary
              </h2>
              <div className="flex justify-between  px-2 py-1 border-b-2 font-semibold">
                <h3>Total Qty</h3>
                <p>{totalItems}</p>
              </div>
              <div className="flex justify-between px-2 py-2 font-semibold">
                <p>Total Price</p>
                <p className="text-red-600 font-bold">₹ {totalPrice}</p>
              </div>
              <button className="w-full text-lg py-2 px-4 bg-red-700 rounded  text-white font-bold">
                Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img src={empty} className="w-80 h-80 object-cover rounded-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};
