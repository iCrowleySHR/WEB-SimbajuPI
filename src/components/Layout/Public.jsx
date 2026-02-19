import { Outlet } from "react-router-dom";
import NavBarLandingPage from '../NavBar/NavBarLandingPage';
import Footer from '../Footer';

export default function LayoutPublic() {
    return (
        <>
            {/* <NavBarLandingPage /> */}
            <main className="bg-gray-100 fade-in min-h-screen flex flex-col">
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
}