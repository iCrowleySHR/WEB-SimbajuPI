export default function Alert({ type = 'error', message }) {
    const baseClasses = "px-4 py-3 rounded mb-4";
    const colors = {
        error: "bg-red-100 border border-red-400 text-red-700",
        success: "bg-green-100 border border-green-400 text-green-700",
    };

    if (!message) return null;

    return (
        <div className={`${baseClasses} ${colors[type]}`} role="alert">
            {message}
        </div>
    );
}
