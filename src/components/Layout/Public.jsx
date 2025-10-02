import { Outlet } from "react-router-dom";
import NavBarLandingPage from '../NavBar/NavBarLandingPage';
import Footer from '../Footer';

export default function LayoutPublic() {
    return (
        <>
            <NavBarLandingPage />
            <main className="bg-gray-100 fade-in min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
