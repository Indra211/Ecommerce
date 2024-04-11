import { ImSpoonKnife } from "react-icons/im";

export const FilterProd = ({ label, onClick, selected }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`text-3xl p-2 bg-orange-300 rounded-full cursor-pointer ${
          selected ? "border-2 border-blue-600" : "border-none"
        }`}
      >
        <ImSpoonKnife onClick={onClick} />
      </div>
      <p className="text-center font-semibold my-1 capitalize">{label}</p>
    </div>
  );
};
