export const TextArea = ({
  id,
  label,
  required = false,
  rows = 3,
  cols = 1,
  value,
  setValue,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        required={required}
        rows={rows}
        cols={cols}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="mt-1 w-full bg-slate-200 px-2 py-1 rounded mb-1 outline-1 outline-blue-200 resize-none"
      ></textarea>
    </div>
  );
};
