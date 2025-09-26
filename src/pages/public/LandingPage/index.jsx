import FeatureCard from '../../../components/LandingPage/FeatureCard';
import HeroSection from '../../../components/LandingPage/HeroSection';
import ProcessStep from '../../../components/LandingPage/ProcessStep';
import UserProfileCard from '../../../components/LandingPage/UserProfileCard';
import './style.css'


export default function LandingPage() {
  const features = [
    { icon: "fas fa-file-medical", title: "Solicitação", description: "Avaliação médica na UBS ou processo judicial para pacientes com necessidades especiais como AVC, tetraplegia, etc.", bgColor: "bg-blue-50", iconBg: "bg-blue-600" },
    { icon: "fas fa-user-check", title: "Cadastro", description: "Após aprovação, cadastro no sistema com envio de credenciais por e-mail para acesso do beneficiário.", bgColor: "bg-green-50", iconBg: "bg-green-600" },
    { icon: "fas fa-calendar-alt", title: "Agendamento", description: "Agendamento automático das retiradas com notificações por WhatsApp e e-mail. Possibilidade de reagendamento.", bgColor: "bg-purple-50", iconBg: "bg-purple-600" },
  ];

  const processSteps = [
    { icon: "fas fa-hospital", title: "Via Administrativa (UBS)", items: ["Avaliação pelo médico da família", "Prescrição médica quando necessário", "Encaminhamento à Secretaria Municipal"], color: "text-blue-600" },
    { icon: "fas fa-gavel", title: "Via Judicial", items: ["Recurso em caso de negativa administrativa", "Decisão judicial obrigatória", "Concessão automática do benefício"], color: "text-red-600" },
  ];

  const userProfiles = [
    { icon: "fas fa-user", title: "Paciente/Responsável", description: "Reagenda retiradas e acompanha histórico", borderColor: "border-blue-200", textColor: "text-blue-600" },
    { icon: "fas fa-user-tie", title: "Secretaria de Saúde", description: "Cadastra beneficiários e gera relatórios", borderColor: "border-green-200", textColor: "text-green-600" },
    { icon: "fas fa-user-nurse", title: "UBS", description: "Valida status dos pacientes", borderColor: "border-purple-200", textColor: "text-purple-600" },
    { icon: "fas fa-warehouse", title: "Almoxarifado", description: "Registra chegadas e entregas", borderColor: "border-orange-200", textColor: "text-orange-600" },
  ];

  return (
    <>
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Como Funciona o Programa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Um sistema completo para gerenciar a distribuição de fraldas...</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Fluxo do Processo</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {processSteps.map((step, i) => <ProcessStep key={i} {...step} />)}
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
            {userProfiles.map((profile, i) => <UserProfileCard key={i} {...profile} />)}
          </div>
        </div>
      </section>
    </>
  )
}
