import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLoader } from '../ui/Loader/LoaderContext';
import Magnetic from '../ui/Magnetic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Contact', path: '/#contact' },
];

const Navbar = () => {
  const { isLoading } = useLoader();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isHome = location.pathname === '/';

  // === FIX: Unified Smooth Scroll Handler ===
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // 1. Always close the mobile menu first
    setIsMenuOpen(false);

    // 2. Check if we are currently on the Home Page
    if (isHome) {
      
      // Case A: Clicking "Home" -> Scroll to Top
      if (path === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Case B: Clicking Hash Links (#projects, #contact) -> Scroll to Section
      else if (path.startsWith('/#')) {
        e.preventDefault();
        const id = path.replace('/#', ''); // Extract "projects" from "/#projects"
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    // 3. If we are on "About" page, let React Router/Browser handle the navigation naturally.
  };

  // Toggle Mobile Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when route changes (backup safety)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // GSAP Animation for Mobile Menu
  useGSAP(() => {
    if (isMenuOpen) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, { y: '0%', duration: 0.8, ease: 'power3.inOut' });
      tl.fromTo(linkRefs.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        "-=0.4"
      );
    } else {
      gsap.to(menuRef.current, { y: '-100%', duration: 0.8, ease: 'power3.inOut' });
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* === MAIN NAVBAR === */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 delay-1000 ${
          isLoading ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          
          {/* Logo - Smooth Scroll to Top */}
          <Magnetic>
            <Link 
              to="/" 
              onClick={(e) => handleNavigation(e, '/')}
              className="relative z-50 text-white font-bold text-xl tracking-tighter cursor-pointer p-2 block mix-blend-difference"
            >
              VPB<span className="text-purple-400">.</span>
            </Link>
          </Magnetic>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-purple-500/5">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                {/* 
                  We use <Link> for internal pages (Home, About).
                  We use <a> for Hash links (Projects, Contact) to ensure ID targeting works.
                  Both use handleNavigation to intercept clicks on Home page.
                */}
                {link.name === 'About' || link.name === 'Home' ? (
                  <Link
                    to={link.path}
                    onClick={(e) => handleNavigation(e, link.path)}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide px-6 py-3 block"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={isHome ? link.path.replace('/', '') : link.path}
                    onClick={(e) => handleNavigation(e, link.path)}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide px-6 py-3 block"
                  >
                    {link.name}
                  </a>
                )}
              </Magnetic>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Magnetic>
            <button 
              onClick={toggleMenu}
              className="md:hidden relative z-50 text-white p-2 mix-blend-difference"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </Magnetic>
        </div>
      </nav>

      {/* === MOBILE FULLSCREEN OVERLAY === */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center md:hidden translate-y-[-100%]"
      >
        <div className="flex flex-col gap-8 items-center">
          {navLinks.map((link, index) => (
            <div key={link.name} className="overflow-hidden">
              {link.name === 'About' || link.name === 'Home' ? (
                <Link
                  to={link.path}
                  ref={(el) => { linkRefs.current[index] = el }}
                  onClick={(e) => handleNavigation(e, link.path)}
                  className="text-5xl font-bold text-white hover:text-purple-400 transition-colors tracking-tighter block opacity-0"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={isHome ? link.path.replace('/', '') : link.path}
                  ref={(el) => { linkRefs.current[index] = el }}
                  onClick={(e) => handleNavigation(e, link.path)}
                  className="text-5xl font-bold text-white hover:text-purple-400 transition-colors tracking-tighter block opacity-0"
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;