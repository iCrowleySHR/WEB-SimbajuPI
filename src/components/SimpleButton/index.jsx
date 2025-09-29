export default function SimpleButton({ children, onClick, color = "blue" }) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`text-white px-5 py-2 rounded-lg shadow transition ${colors[color]}`}
    >
      {children}
    </button>
  );
}
