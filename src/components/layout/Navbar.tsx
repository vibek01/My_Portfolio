import { Link, useLocation } from 'react-router-dom'; // Import Link
import { useLoader } from '../ui/Loader/LoaderContext';
import Magnetic from '../ui/Magnetic';

// Updated Links: 'href' changed to 'path'
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/#projects' }, // Hash link for homepage sections
  { name: 'Contact', path: '/#contact' },
];

const Navbar = () => {
  const { isLoading } = useLoader();
  const location = useLocation();

  // Helper to handle navigation
  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 delay-1000 ${
        isLoading ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        
        {/* Logo */}
        <Magnetic>
          <Link to="/" className="text-white font-bold text-xl tracking-tighter cursor-pointer p-2 block">
            VPB<span className="text-purple-400">.</span>
          </Link>
        </Magnetic>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-purple-500/5">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              {/* 
                 If it's the About page, use standard Link.
                 If it's a hash link (#projects), use standard anchor tag.
              */}
              {link.name === 'About' || link.name === 'Home' ? (
                <Link
                  to={link.path}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide px-6 py-3 block"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={isHome ? link.path.replace('/', '') : link.path} // Handle hash links from other pages
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide px-6 py-3 block"
                >
                  {link.name}
                </a>
              )}
            </Magnetic>
          ))}
        </div>

        {/* Mobile Menu Placeholder */}
        <Magnetic>
          <div className="md:hidden text-white cursor-pointer p-4">
            Menu
          </div>
        </Magnetic>
      </div>
    </nav>
  );
};

export default Navbar;