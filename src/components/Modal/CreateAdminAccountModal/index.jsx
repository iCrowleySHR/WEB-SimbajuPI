import ActionButton from "../../ActionButton";

export default function CreateAdminAccountModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <i className="fas fa-user-plus text-blue-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Criar Nova Conta
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Selecione o tipo de conta
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <ActionButton
            title="Criar conta de Almoxarifado"
            description="Conta para distribuição e gestão de benefícios"
            iconClass="fas fa-warehouse"
            bgColor="bg-green-500"
            textColor="text-white"
            iconColor="text-white"
            to="/secretaria/novo-almoxarifado"
          />

          <ActionButton
            title="Criar conta de UBS"
            description="Unidade Básica de Saúde"
            iconClass="fas fa-hospital"
            bgColor="bg-blue-500"
            textColor="text-white"
            iconColor="text-white"
            to="/secretaria/novo-ubs"
          />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium"
          >
            <i className="fas fa-times mr-2"></i>
            Fechar
          </button>
        </div>

        {/* Decorative Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-t-2xl"></div>
      </div>
    </div>
  );
}
