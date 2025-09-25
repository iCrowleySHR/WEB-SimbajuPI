import NavBarLandingPage from '../NavBarLandingPage';
import Footer from '../Footer';

export default function LayoutPublic({ children }) {
  return (
    <>
      <NavBarLandingPage />
        <main className='bg-gray-100'>{children}</main>
      <Footer />
    </>
  );
}
