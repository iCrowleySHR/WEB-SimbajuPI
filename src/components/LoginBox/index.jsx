import Alert from "../Alert";

export default function LoginBox({ 
    type, 
    icon, 
    color, 
    fields, 
    message, 
    onSubmit, 
    onFirstAccessClick 
}) {
    return (
        <div className={`bg-white rounded-xl shadow-xl p-8`}>
            <div className="text-center mb-6">
                <div className={`bg-${color}-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${icon} text-3xl text-${color}-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{type}</h3>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                {fields.map(({ label, value, onChange, type, placeholder }) => (
                    <div key={label}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                        <input
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-transparent`}
                        />
                    </div>
                ))}

                {message && <Alert type={message.type} message={message.text} />}

                <button
                    type="submit"
                    className={`w-full bg-${color}-600 hover:bg-${color}-700 text-white font-medium py-3 rounded-lg transition-colors`}
                >
                    <i className="fas fa-sign-in-alt mr-2"></i>Entrar
                </button>
            </form>

            <div className="mt-4 text-center">
                <button onClick={onFirstAccessClick} className="text-blue-600 hover:text-blue-800 text-sm">
                    Primeiro acesso? Clique aqui
                </button>
            </div>
        </div>
    );
}
