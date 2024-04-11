import { useSelector } from "react-redux";
import { CardFeature } from "./CardFeatures";
import { FilterProd } from "./FilterProd";
import { useState } from "react";

export const MenuList = ({ label, screen }) => {
  const products_data = useSelector((state) => state.products.product_data);
  const cat_list = products_data?.map((item) => item?.prod_cat);
  const [filterCatType, setFilterCatType] = useState("");
  const filterProds = filterCatType
    ? products_data?.filter(
        (item) => item?.prod_cat?.toLowerCase() === filterCatType?.toLowerCase()
      )
    : [];

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl text-slate-900 mb-4">{label}</h2>
        <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
          {[...new Set(cat_list)]?.map((item, index) => (
            <FilterProd
              key={index}
              label={item}
              onClick={(e) => {
                e.preventDefault();
                filterCatType === item
                  ? setFilterCatType("")
                  : setFilterCatType(item);
              }}
              selected={item === filterCatType}
            />
          ))}
        </div>
      </div>
      <div
        className={`flex gap-10 ${
          screen === "menu"
            ? "flex-wrap justify-center"
            : "overflow-scroll scrollbar-none scroll-smooth transistion-all "
        }`}
      >
        {filterCatType
          ? filterProds?.map((item) => (
              <CardFeature
                id={item?._id}
                key={item._id}
                name={item?.prod_name}
                pic={item?.prod_pic}
                price={item?.prod_price}
                belongs={item?.prod_cat}
              />
            ))
          : products_data?.map((item) => (
              <CardFeature
                id={item?._id}
                key={item._id}
                name={item?.prod_name}
                pic={item?.prod_pic}
                price={item?.prod_price}
                belongs={item?.prod_cat}
              />
            ))}
      </div>
    </>
  );
};
