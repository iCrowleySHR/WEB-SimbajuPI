import { Link } from 'react-router-dom';

export default function NavBarLandingPage() {
    return (
        <>
            <header className="bg-white shadow-lg border-b-4 border-blue-600">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/">
                            <div className="flex items-center space-x-3 ">
                                <i className="fas fa-heartbeat text-blue-600 text-2xl"></i>
                                <h1 className="text-xl font-bold text-gray-800">Sistema de Distribuição de Fraldas</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
