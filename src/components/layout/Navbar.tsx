import { useLoader } from '../ui/Loader/LoaderContext';
import Magnetic from '../ui/Magnetic'; // Adjust path based on where you saved Magnetic.tsx

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { isLoading } = useLoader();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 delay-1000 ${
        isLoading ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        
        {/* Logo / Name - Wrapped in Magnetic */}
        <Magnetic>
          <div className="text-white font-bold text-xl tracking-tighter cursor-pointer p-2">
            VPB<span className="text-purple-400">.</span>
          </div>
        </Magnetic>

        {/* Glassmorphism Menu */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-purple-500/5">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide px-6 py-3 block"
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Mobile Menu Button - Wrapped in Magnetic */}
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