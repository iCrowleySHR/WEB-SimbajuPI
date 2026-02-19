export default function Alert({ type = 'error', message }) {
    const config = {
        success: {
            bg: "bg-green-50",
            border: "border-green-200",
            text: "text-green-700",
            icon: "fas fa-check-circle"
        },
        error: {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-700",
            icon: "fas fa-exclamation-circle"
        },
        warning: {
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            text: "text-yellow-700",
            icon: "fas fa-exclamation-triangle"
        },
        info: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-700",
            icon: "fas fa-info-circle"
        }
    };

    const style = config[type] || config.info;

    return (
        <div className={`${style.bg} ${style.border} border-2 rounded-xl p-5`}>
            <div className="flex items-center space-x-4">
                <i className={`${style.icon} ${style.text} text-1xl`}></i>
                <p className={`${style.text} text-1xl font-medium`}>{message}</p>
            </div>
        </div>
    );
}