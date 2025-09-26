import Footer from '../Footer';
import NavBarAuth from '../NavBar/NavBarAuth';

export default function LayoutPrivate({ children }) {
  return (
    <>
      <NavBarAuth />
        <main className='bg-gray-100'>{children}</main>
      <Footer />
    </>
  );
}
