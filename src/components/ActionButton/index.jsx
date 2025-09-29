import { useNavigate } from "react-router-dom";

export default function ActionButton({ title, description, iconClass, bgColor, hoverColor, onClick, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-white p-6 rounded-xl transition-colors text-left ${bgColor} ${hoverColor} cursor-pointer`}
    >
      <i className={`${iconClass} text-2xl mb-3`}></i>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
}
