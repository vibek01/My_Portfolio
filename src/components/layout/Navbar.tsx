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
  const [activeTab, setActiveTab] = useState('Home');
  
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isHome = location.pathname === '/';

  // === DYNAMIC SCROLL SPY ===
  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveTab('About');
      return;
    }

    if (isHome) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        const projectsSection = document.getElementById('projects');
        const contactSection = document.getElementById('contact');

        let currentSection = 'Home';
        const triggerPoint = scrollY + (windowHeight / 3);

        if (contactSection && triggerPoint >= contactSection.offsetTop) {
          currentSection = 'Contact';
        } else if (projectsSection && triggerPoint >= projectsSection.offsetTop) {
          currentSection = 'Projects';
        }

        if (scrollY < 100) {
          currentSection = 'Home';
        }

        setActiveTab(currentSection);
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname, isHome]);

  // === NAVIGATION HANDLER ===
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string, name: string) => {
    setIsMenuOpen(false);
    setActiveTab(name);

    if (isHome) {
      if (path === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
      else if (path.startsWith('/#')) {
        e.preventDefault();
        const id = path.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${id}`);
        }
      }
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          
          {/* Logo */}
          <Magnetic>
            <Link 
              to="/" 
              onClick={(e) => handleNavigation(e, '/', 'Home')}
              className="relative z-50 text-white font-bold text-xl tracking-tighter cursor-pointer p-2 block mix-blend-difference"
            >
              VPB<span className="text-purple-400">.</span>
            </Link>
          </Magnetic>

          {/* 
             === DESKTOP MENU CONTAINER CONTROLS ===
             1. BLUR INTENSITY: 'backdrop-blur-2xl'. 
                - Options: blur-sm, blur-md, blur-lg, blur-xl, blur-2xl, blur-3xl.
             2. BACKGROUND DARKNESS: 'bg-white/5'. 
                - Increase opacity (e.g., bg-white/10) for a lighter look.
                - Use 'bg-black/20' for a darker, tinted glass look.
             3. BORDER: 'border-white/10'.
          */}
          <div className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-lg shadow-purple-500/5">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              
              return (
                <Magnetic key={link.name}>
                  {link.name === 'About' || link.name === 'Home' ? (
                    <Link
                      to={link.path}
                      onClick={(e) => handleNavigation(e, link.path, link.name)}
                      className={`relative text-sm font-medium transition-colors tracking-wide px-5 py-3 block ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {link.name}
                      {isActive && <ActiveGlow />}
                    </Link>
                  ) : (
                    <a
                      href={isHome ? link.path.replace('/', '') : link.path}
                      onClick={(e) => handleNavigation(e, link.path, link.name)}
                      className={`relative text-sm font-medium transition-colors tracking-wide px-5 py-3 block ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {link.name}
                      {isActive && <ActiveGlow />}
                    </a>
                  )}
                </Magnetic>
              );
            })}
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
                  onClick={(e) => handleNavigation(e, link.path, link.name)}
                  className={`text-5xl font-bold transition-colors tracking-tighter block opacity-0 ${
                    activeTab === link.name ? 'text-purple-400' : 'text-white hover:text-purple-400'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={isHome ? link.path.replace('/', '') : link.path}
                  ref={(el) => { linkRefs.current[index] = el }}
                  onClick={(e) => handleNavigation(e, link.path, link.name)}
                  className={`text-5xl font-bold transition-colors tracking-tighter block opacity-0 ${
                    activeTab === link.name ? 'text-purple-400' : 'text-white hover:text-purple-400'
                  }`}
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

// === GLOW EFFECT CONTROLS ===
const ActiveGlow = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
      
      {/* 
         1. AMBIENT HAZE (The soft glow)
         - LENGTH: 'w-[80%]' (Increase to 90% or 100% for wider glow)
         - BLUR: 'blur-2xl' (Change to blur-xl or blur-3xl)
         - INTENSITY: 'bg-purple-500/20' (Change /20 to /40 for stronger color)
      */}
      <div className="absolute bottom-0 w-[80%] h-8 bg-purple-500/20 blur-2xl rounded-full" />

      {/* 
         2. THE SHARP LINE (The tapered shape)
         - LENGTH: 'w-[80%]'
         - COLOR: 'via-purple-400' (Change to via-purple-300 for brighter line)
      */}
      <div className="absolute bottom-[2px] w-[80%] h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      
      {/* 
         3. THE CORE (The hotspot)
         - LENGTH: 'w-[40%]'
         - INTENSITY: 'opacity-80' (Change to 100 for max brightness)
      */}
      <div className="absolute bottom-[2px] w-[40%] h-[3px] bg-purple-300 blur-[3px] opacity-80" />
    </div>
  );
};

export default Navbar;