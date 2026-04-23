import Footer from '../Footer';
import { Outlet } from "react-router-dom";
import NavBarAuth from '../NavBar/NavBarAuth';

export default function ResetPasswordLayout() {
    return (
        <>
            <main className="container mx-auto px-4 py-8 bg-gray-100 max-w-full fade-in min-h-screen" >
                <div className="max-w-7xl mx-auto">
                    <Outlet/>
                </div>
            </main>
            <Footer />
        </>
    );
}
