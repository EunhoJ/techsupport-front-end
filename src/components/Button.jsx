export default function Button({
  children,
  type = "button",
  onClick,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        text-[#203D4E] bg-[#E0D449] hover:brightness-110 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center
        transition-colors duration-200
        ${fullWidth ? "w-full" : "w-auto"}
      `}
    >
      {children}
    </button>
  );
}
