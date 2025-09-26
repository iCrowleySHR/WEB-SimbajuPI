import Footer from '../Footer';
import NavBarAuth from '../NavBar/NavBarAuth';

export default function LayoutPrivate({ children }) {
  return (
    <>
      <NavBarAuth />
        <main className="container mx-auto px-4 py-8 bg-gray-100 max-w-full " >
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      <Footer />
    </>
  );
}
