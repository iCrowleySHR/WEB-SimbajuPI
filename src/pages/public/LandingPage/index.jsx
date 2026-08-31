import { useEffect } from 'react';
import FeatureCard from '../../../components/LandingPage/FeatureCard';
import HeroSection from '../../../components/LandingPage/HeroSection';
import ProcessStep from '../../../components/LandingPage/ProcessStep';
import UserProfileCard from '../../../components/LandingPage/UserProfileCard';
import './style.css'


export default function LandingPage() {

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const features = [
    { icon: "fas fa-file-medical", title: "Solicitação", description: "Avaliação médica na UBS ou processo judicial para pacientes com necessidades especiais como AVC, tetraplegia, etc.", bgColor: "bg-blue-50/30", iconBg: "bg-blue-600" },
    { icon: "fas fa-user-check", title: "Cadastro", description: "Após aprovação, cadastro no sistema com envio de credenciais por e-mail para acesso do beneficiário.", bgColor: "bg-green-50/30", iconBg: "bg-green-600" },
    { icon: "fas fa-calendar-alt", title: "Agendamento", description: "Agendamento melhorado junto as retiradas com notificações por e-mail. Possibilidade de reagendamento.", bgColor: "bg-purple-50/30", iconBg: "bg-purple-600" },
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

      {/* ─── Como Funciona ─── */}
      <section className="relative py-20 bg-white overflow-hidden hidden md:block">
        {/* Corner decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-50/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-4">
              <i className="fas fa-info-circle" />
              Passo a passo
            </div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              Como Funciona o Programa
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              Um sistema completo para gerenciar a distribuição de fraldas
            </p>
            <div className="mt-3 w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {features.map((f, i) => (
              <div key={i} className={`reveal-up delay-${i + 1}`}>
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Fluxo do Processo ─── */}
      <section className="relative py-20 bg-gray-50 overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.04),transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-semibold mb-4">
              <i className="fas fa-route" />
              Trilhas
            </div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              Fluxo do Processo
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
              Duas vias de acesso para garantir o benefício a quem precisa
            </p>
            <div className="mt-3 w-16 h-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className={`reveal-up delay-${i + 1}`}>
                <ProcessStep {...step} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Perfis de Usuário ─── */}
      <section className="relative py-20 bg-white overflow-hidden hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-sm font-semibold mb-4">
              <i className="fas fa-users" />
              Equipe
            </div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              Perfis de Usuário
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
              Cada perfil tem acesso específico às funcionalidades do sistema
            </p>
            <div className="mt-3 w-16 h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto items-stretch">
            {userProfiles.map((profile, i) => (
              <div key={i} className={`reveal-up delay-${Math.min(i + 1, 4)}`}>
                <UserProfileCard {...profile} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
