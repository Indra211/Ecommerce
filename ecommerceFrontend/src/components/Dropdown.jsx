export const Dropdown = ({
  options = [],
  id,
  label,
  value,
  setValue,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        className="mt-1 w-full bg-slate-200 px-2 py-1 rounded mb-1 outline-1 outline-blue-200"
      >
        {options?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
