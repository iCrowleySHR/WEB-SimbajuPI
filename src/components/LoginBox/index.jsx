import Alert from "../Alert";

export default function LoginBox({ 
    type, 
    icon, 
    color = "blue", 
    fields, 
    message, 
    onSubmit, 
    onFirstAccessClick 
}) {
    const colorConfig = {
        blue: {
            bg: "bg-blue-100",
            icon: "text-blue-600",
            button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
            focus: "focus:ring-blue-500 focus:border-blue-500",
            gradient: "from-blue-500 to-blue-600"
        },
        green: {
            bg: "bg-green-100", 
            icon: "text-green-600",
            button: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
            focus: "focus:ring-green-500 focus:border-green-500",
            gradient: "from-green-500 to-green-600"
        },
        red: {
            bg: "bg-red-100",
            icon: "text-red-600",
            button: "bg-red-600 hover:bg-red-700 focus:ring-red-500", 
            focus: "focus:ring-red-500 focus:border-red-500",
            gradient: "from-red-500 to-red-600"
        },
        purple: {
            bg: "bg-purple-100",
            icon: "text-purple-600", 
            button: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
            focus: "focus:ring-purple-500 focus:border-purple-500",
            gradient: "from-purple-500 to-purple-600"
        }
    };

    const config = colorConfig[color] || colorConfig.blue;

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 transition-all duration-300 hover:shadow-3xl">
            {/* Header */}
            <div className="text-center mb-8">
                <div className={`${config.bg} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transition-transform duration-300 hover:scale-105`}>
                    <i className={`${icon} text-4xl ${config.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{type}</h3>
                <p className="text-gray-600 text-sm">Faça login para acessar sua conta</p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
                {fields.map(({ label, value, onChange, type, placeholder }) => (
                    <div key={label} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-800 uppercase tracking-wide">
                            {label}
                        </label>
                        <input
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            className={`w-full px-4 py-4 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white ${config.focus} focus:ring-2 focus:border-transparent placeholder-gray-400`}
                        />
                    </div>
                ))}

                {message && (
                    <div className="mt-2">
                        <Alert type={message.type} message={message.text} />
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full ${config.button} text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] focus:ring-4 shadow-lg hover:shadow-xl`}
                >
                    <i className="fas fa-sign-in-alt mr-3"></i>
                    Entrar
                </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <button 
                    onClick={onFirstAccessClick} 
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-300 hover:underline flex items-center justify-center mx-auto"
                >
                    <i className="fas fa-user-plus mr-2"></i>
                    Primeiro acesso? Clique aqui
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        </div>
    );
}