import { useNavigate } from "react-router-dom";

export default function ActionButton({
  title,
  description,
  iconClass,
  bgColor = "bg-blue-600",
  hoverColor = "hover:bg-blue-700",
  onClick,
  to,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative w-full text-left
        ${bgColor} ${hoverColor}
        text-white rounded-2xl
        px-6 py-8
        shadow-md hover:shadow-xl
        transition-all duration-300 ease-out
        flex flex-col items-start gap-3
        overflow-hidden
      `}
    >

      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/40 to-transparent group-hover:opacity-20 transition-opacity"></div>

      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
        <i className={`${iconClass} text-2xl`}></i>
      </div>

      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-white/90 mt-1 leading-snug">{description}</p>
      </div>
    </button>
  );
}
