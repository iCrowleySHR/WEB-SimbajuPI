import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import LayoutPublic from './components/LayoutPublic/LayoutPublic';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <LayoutPublic>
                        <LandingPage />
                    </LayoutPublic>
                } />
                <Route path="/login" element={
                    <LayoutPublic>
                        <Login />
                    </LayoutPublic>
                } />
                <Route path="/secretaria" element={
                    <LayoutPublic>
                        <Login />
                    </LayoutPublic>
                } />
            </Routes>
        </>
    );
}

export default App;
