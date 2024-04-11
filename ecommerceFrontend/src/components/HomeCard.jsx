import { Link } from "react-router-dom";

export const HomeCard = ({ name, pic, price, belongs, id }) => {
  return (
    <Link
      to={`/menu/${id}`}
      onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
    >
      <div className="bg-white p-2 rounded shadow-lg">
        <div className="min-h-[150px] w-32">
          <img src={pic} className=" w-full h-full" alt="" />
        </div>
        <h3 className="font-semibold text-slate-600 text-center capitalize text-sm">
          {name}
        </h3>
        <p className="font-medium text-slate-400 text-center text-sm">
          {belongs}
        </p>
        <p className="text-center text-red-400 capitalize">
          ₹<span className="font-bold text-slate-600  text-sm"> {price}</span>
        </p>
      </div>
    </Link>
  );
};
