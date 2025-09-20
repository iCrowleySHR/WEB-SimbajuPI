import './style.css'
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <section className="hero-bg bg- text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <i className="fas fa-heartbeat text-6xl mb-6 text-blue-200"></i>
            <h1 className="text-5xl font-bold mb-6">
              Sistema de Distribuição de Fraldas
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Secretaria Municipal de Saúde - Cuidando com dignidade e
              eficiência
            </p>
            <Link to="/login">
              <button
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg cursor-pointer"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Acessar Sistema
              </button>
            </Link>

          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Como Funciona o Programa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Um sistema completo para gerenciar a distribuição de fraldas para pacientes com necessidades especiais</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-medical text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Solicitação</h3>
              <p className="text-gray-600">Avaliação médica na UBS ou processo judicial para pacientes com necessidades especiais como AVC, tetraplegia, etc.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-check text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Cadastro</h3>
              <p className="text-gray-600">Após aprovação, cadastro no sistema com envio de credenciais por e-mail para acesso do beneficiário.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Agendamento</h3>
              <p className="text-gray-600">Agendamento automático das retiradas com notificações por WhatsApp e e-mail. Possibilidade de reagendamento.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Fluxo do Processo</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  <i className="fas fa-hospital mr-2"></i>Via Administrativa (UBS)
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-2 mt-1"></i>Avaliação pelo médico da família</li>
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-2 mt-1"></i>Prescrição médica quando necessário</li>
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-2 mt-1"></i>Encaminhamento à Secretaria Municipal</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-red-600 mb-3">
                  <i className="fas fa-gavel mr-2"></i>Via Judicial
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-2 mt-1"></i>Recurso em caso de negativa administrativa</li>
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-2 mt-1"></i>Decisão judicial obrigatória</li>
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-2 mt-1"></i>Concessão automática do benefício</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Perfis de Usuário</h2>
            <p className="text-gray-600">Cada perfil tem acesso específico às funcionalidades do sistema</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-colors">
              <i className="fas fa-user text-4xl text-blue-600 mb-4"></i>
              <h3 className="font-semibold text-gray-800 mb-2">Paciente/Responsável</h3>
              <p className="text-sm text-gray-600">Reagenda retiradas e acompanha histórico</p>
            </div>

            <div className="text-center p-6 border-2 border-green-200 rounded-xl hover:border-green-400 transition-colors">
              <i className="fas fa-user-tie text-4xl text-green-600 mb-4"></i>
              <h3 className="font-semibold text-gray-800 mb-2">Secretaria de Saúde</h3>
              <p className="text-sm text-gray-600">Cadastra beneficiários e gera relatórios</p>
            </div>

            <div className="text-center p-6 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-colors">
              <i className="fas fa-user-nurse text-4xl text-purple-600 mb-4"></i>
              <h3 className="font-semibold text-gray-800 mb-2">UBS</h3>
              <p className="text-sm text-gray-600">Valida status dos pacientes</p>
            </div>

            <div className="text-center p-6 border-2 border-orange-200 rounded-xl hover:border-orange-400 transition-colors">
              <i className="fas fa-warehouse text-4xl text-orange-600 mb-4"></i>
              <h3 className="font-semibold text-gray-800 mb-2">Almoxarifado</h3>
              <p className="text-sm text-gray-600">Registra chegadas e entregas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Requisitos para Participar</h2>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <h3 className="font-semibold text-blue-600 mb-3">
                    <i className="fas fa-check-circle mr-2"></i>Condições Elegíveis
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• AVC (Acidente Vascular Cerebral)</li>
                    <li>• Tetraplegia</li>
                    <li>• Outras condições médicas específicas</li>
                    <li>• Prescrição médica obrigatória</li>
                  </ul>
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-green-600 mb-3">
                    <i className="fas fa-map-marker-alt mr-2"></i>Requisitos Básicos
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Ser morador do município</li>
                    <li>• Ter avaliação médica na UBS</li>
                    <li>• Documentação completa</li>
                    <li>• Processo administrativo ou judicial</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
