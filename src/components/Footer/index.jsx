
import Logo from "../Logo";
export default function Footer() {
    return(
        <>
            <footer className="bg-gray-800 text-white py-8  ">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-4">
                        <Logo size={80} />
                        <p className="text-lg font-semibold">Secretaria Municipal de Saúde</p>
                    </div>
                    <p className="text-gray-400">Sistema de Distribuição de Fraldas - Cuidando com dignidade</p>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-500">© 2025 - Todos os direitos reservados</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
