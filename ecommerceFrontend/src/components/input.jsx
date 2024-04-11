import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
export const Input = ({
  id,
  label,
  type,
  required = false,
  value,
  setValue,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {type === "password" ? (
        <>
          <label htmlFor={id}> {label}</label>
          <div className="flex items-center mb-1 pt-0 px-2 py-1 bg-slate-200 rounded focus-within:outline focus-within:outline-blue-200">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type={show ? "text" : "password"}
              id={id}
              name={id}
              required={required}
              className="mt-1 w-full bg-slate-200 outline-none border-none"
            />
            <span onClick={() => setShow(!show)} className="px-1 mt-1">
              {show ? <BiShow /> : <BiHide />}
            </span>
          </div>
        </>
      ) : (
        <>
          <label htmlFor={id}> {label}</label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={type}
            id={id}
            name={id}
            required={required}
            className="mt-1 w-full bg-slate-200 px-2 py-1 rounded mb-1 outline-1 outline-blue-200"
          />
        </>
      )}
    </div>
  );
};
