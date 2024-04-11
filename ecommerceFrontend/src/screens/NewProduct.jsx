import { useState } from "react";
import { Input, Dropdown, TextArea } from "../components";
import { BsCloudUpload } from "react-icons/bs";
import { imgtobase64 } from "../utility/ImagetoBase64";
import { URL } from "../utility/Urls";
import { showToast } from "../utility/Toast";

export const NewProduct = () => {
  const [prod_name, setProd_Name] = useState("");
  const [prod_price, setProd_price] = useState("");
  const [prod_desc, setProd_desc] = useState("");
  const [prod_pic, setProd_pic] = useState("");
  const [prod_cat, setProd_cat] = useState("");
  const handleUploadImage = async (img) => {
    try {
      const base64Data = await imgtobase64(img);
      setProd_pic(base64Data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      prod_name &&
      prod_cat &&
      prod_cat?.toLowerCase() !== "select" &&
      prod_desc &&
      prod_pic &&
      prod_price
    ) {
      const response = await fetch(URL.uploadProduct, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prod_desc,
          prod_cat,
          prod_name,
          prod_price,
          prod_pic,
        }),
      });
      const jsonData = await response.json();
      if (jsonData.status === "success") {
        showToast(jsonData?.status, jsonData.message);
        setProd_Name("");
        setProd_cat("");
        setProd_pic("");
        setProd_desc("");
        setProd_price("");
      }
    } else {
      showToast("error", "Please give All Values");
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-2"
        onSubmit={handleSubmit}
      >
        <Input
          id={"name"}
          label={"Name"}
          value={prod_name}
          setValue={setProd_Name}
          required={true}
        />
        <Dropdown
          required={true}
          value={prod_cat}
          setValue={setProd_cat}
          id={"Category"}
          label={"Category"}
          options={[
            "Select",
            "Friut",
            "IceCream",
            "Pizza",
            "Dosa",
            "Vegetable",
            "Rice",
            "Cake",
          ]}
        />
        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 mb-3 rounded flex items-center justify-center cursor-pointer">
            {!prod_pic ? (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            ) : (
              <img src={prod_pic} alt="" className="h-full" />
            )}

            <input
              id="image"
              className="hidden w-full h-full"
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadImage(e.target.files[0])}
              required
            />
          </div>
        </label>
        <Input
          id={"price"}
          label={"Price"}
          type={"text"}
          value={prod_price}
          setValue={setProd_price}
          required={true}
        />
        <TextArea
          id={"description"}
          value={prod_desc}
          setValue={setProd_desc}
          required={true}
          label={"Description"}
        />
        <button
          type="submit"
          className="w-full self-center bg-blue-400 hover:bg-blue-600 cursor-pointer p-1 rounded-full mt-2 text-white text-base font-semibold"
        >
          Save
        </button>
      </form>
    </div>
  );
};
