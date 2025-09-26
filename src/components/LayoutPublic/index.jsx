import NavBarLandingPage from '../NavBar/NavBarLandingPage';
import Footer from '../Footer';

export default function LayoutPublic({ children }) {
  return (
    <>
      <NavBarLandingPage />
        <main className='bg-gray-100 fade-in min-h-screen'>{children}</main>
      <Footer />
    </>
  );
}
