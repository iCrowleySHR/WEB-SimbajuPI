import './style.css'
import NavBarLandingPage from '../../components/NavBarLandingPage'
import Footer from '../../components/Footer'

export default function LandingPage() {
    return(
        <>
            <NavBarLandingPage/>
              
            <section class="hero-bg bg- text-white py-20">
                <div class="container mx-auto px-4 text-center">
                  <div class="max-w-4xl mx-auto">
                    <i class="fas fa-heartbeat text-6xl mb-6 text-blue-200"></i>
                    <h1 class="text-5xl font-bold mb-6">
                      Sistema de Distribuição de Fraldas
                    </h1>
                    <p class="text-xl mb-8 text-blue-100">
                      Secretaria Municipal de Saúde - Cuidando com dignidade e
                      eficiência
                    </p>
                    <button
                      onclick="showLogin()"
                      class="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
                    >
                      <i class="fas fa-sign-in-alt mr-2"></i>Acessar Sistema
                    </button>
                  </div>
                </div>
            </section> 

            {/* continuação aqui */}

            <Footer/>
        </>
    )
}
