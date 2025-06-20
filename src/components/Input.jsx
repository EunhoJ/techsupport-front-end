export default function Input({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-[#203D4E] border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
      />
    </div>
  );
}
