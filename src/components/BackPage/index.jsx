import { useNavigate } from "react-router-dom";

export default function BackPage({ label = "Voltar", to = null, className = "" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium ${className} cursor-pointer`}
        >
            <i className="fas fa-arrow-left"></i>
            <span>{label}</span>
        </button>
    );
}
