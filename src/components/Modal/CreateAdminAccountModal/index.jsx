import ActionButton from "../../ActionButton";

export default function CreateAdminAccountModal({ isOpen, onClose }) {

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg mx-4 w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Que tipo de conta você deseja criar?
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <ActionButton
                title="Criar nova conta de Almoxarifado"
                description="Crie uma nova conta para o almoxarifado para distribuição dos benefícios."
                iconClass="fas fa-user-tie"
                bgColor="bg-green-600"
                hoverColor="hover:bg-green-700"
                to={"/secretaria/novo-almoxarifado"}
              />
              {/* <ActionButton
                title="Criar nova conta de UBS"
                description="Crie uma nova conta de Unidade Básica de Saúde."
                iconClass="fas fa-plus"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
                to="/secretaria/novo-ubs"
              /> */}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
