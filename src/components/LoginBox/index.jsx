import Alert from "../Alert";

export default function LoginBox({ 
    type, 
    icon, 
    color = "blue", 
    fields, 
    message, 
    onSubmit, 
    onFirstAccessClick,
    forgotPasswordLink // NOVO
}) {
    const colorConfig = {
        blue: {
            bg: "bg-blue-50",
            icon: "text-blue-600",
            button: "bg-blue-600 hover:bg-blue-700",
            focus: "focus:ring-blue-500 focus:border-blue-500",
            gradient: "from-blue-500 to-blue-600",
            light: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-600"
        },
        green: {
            bg: "bg-green-50", 
            icon: "text-green-600",
            button: "bg-green-600 hover:bg-green-700",
            focus: "focus:ring-green-500 focus:border-green-500",
            gradient: "from-green-500 to-green-600",
            light: "bg-green-50",
            border: "border-green-200",
            text: "text-green-600"
        },
        red: {
            bg: "bg-red-50",
            icon: "text-red-600",
            button: "bg-red-600 hover:bg-red-700", 
            focus: "focus:ring-red-500 focus:border-red-500",
            gradient: "from-red-500 to-red-600",
            light: "bg-red-50",
            border: "border-red-200",
            text: "text-red-600"
        },
        purple: {
            bg: "bg-purple-50",
            icon: "text-purple-600", 
            button: "bg-purple-600 hover:bg-purple-700",
            focus: "focus:ring-purple-500 focus:border-purple-500",
            gradient: "from-purple-500 to-purple-600",
            light: "bg-purple-50",
            border: "border-purple-200",
            text: "text-purple-600"
        }
    };

    const config = colorConfig[color] || colorConfig.blue;

    return (
        <div className="relative bg-white rounded-3xl shadow-lg p-8 w-full max-w-md border border-gray-200">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center space-x-4 mb-3">
                    <div className={`${config.bg} w-14 h-14 rounded-lg flex items-center justify-center shadow-sm`}>
                        <i className={`${icon} text-2xl ${config.icon}`}></i>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{type}</h3>
                        <p className={`text-sm ${config.text} font-medium mt-1`}>
                            <i className="fas fa-lock mr-1"></i>
                            Acesso seguro
                        </p>
                    </div>
                </div>
                
                {/* Separator */}
                <div className="h-px w-full bg-gray-100"></div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
                {fields.map(({ label, value, onChange, type, placeholder }) => (
                    <div key={label} className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-1.5">
                            <i className={`fas fa-circle text-xs ${config.text}`}></i>
                            <span>{label}</span>
                        </label>
                        <input
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            className={`w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg transition ${config.focus} bg-white placeholder:text-gray-400 text-gray-800`}
                        />
                    </div>
                ))}

                {/* Alert message */}
                {message && message.text && (
                    <div className="mt-2">
                        <Alert type={message.type} message={message.text} />
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className={`w-full ${config.button} text-white font-semibold py-3 px-4 rounded-lg text-base shadow-sm hover:shadow-md transition flex items-center justify-center space-x-2`}
                >
                    <i className="fas fa-sign-in-alt text-sm"></i>
                    <span>Entrar</span>
                </button>

                {/* Forgot password */}
                {forgotPasswordLink && (
                    <div className="">
                        <a
                            href={forgotPasswordLink}
                            className={`text-sm font-medium ${config.text} hover:underline`}
                        >
                            Esqueci minha senha
                        </a>
                    </div>
                )}
            </form>

            {/* Footer */}
            <div className="mt-3 pt-4">
                <div className="border-t border-gray-200 mb-4"></div>
                
                <button 
                    onClick={onFirstAccessClick} 
                    className={`w-full ${config.text} font-medium text-sm flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-gray-50 transition`}
                >
                    <i className="fas fa-user-plus"></i>
                    <span>Primeiro acesso? Clique aqui</span>
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>

            {/* Simple corner decoration */}
            <div className={`absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 ${config.border} rounded-tl-lg opacity-30`}></div>
            <div className={`absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 ${config.border} rounded-br-lg opacity-30`}></div>
        </div>
    );
}