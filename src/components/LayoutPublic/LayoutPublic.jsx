import NavBarLandingPage from '../NavBarLandingPage';
import Footer from '../Footer';

export default function LayoutPublic({ children }) {
  return (
    <>
      <NavBarLandingPage />
      <main>{children}</main>
      <Footer />
    </>
  );
}
