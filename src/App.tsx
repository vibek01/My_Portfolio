import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoaderProvider } from './components/ui/Loader/LoaderContext';
import Loader from './components/ui/Loader/Loader';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/utils/ScrollToTop'; 

// Sections
import Hero from './sections/Hero';
import WorkSection from './sections/Projects/WorkSection';
import ExperienceSection from './sections/Experience/ExperienceSection';
import ContactSection from './sections/Contact/ContactSection';
import Footer from './components/layout/Footer';

// Pages
import About from './pages/About/About';
import NotFound from './pages/NotFound'; 

function AppContent() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-purple-500/30">
      <ScrollToTop /> 
      <Loader />
      <Navbar />
      
      <Routes>
        {/* Route 1: The Main Home Page */}
        <Route path="/" element={
          <>
            <Hero />
            
            {/* 
               REMOVED: <div className="h-[20vh] bg-black w-full"></div> 
               The gap is now handled by margin-top in ExperienceSection CSS
               to prevent layout thrashing.
            */}
            <div className="h-[20vh] bg-black w-full"></div> {/* Keep this one between Hero and Work */}

            <WorkSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
          </>
        } />

        {/* Route 2: The About Page */}
        <Route path="/about" element={<About />} />

        {/* Route 3: 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <Router>
      <LoaderProvider>
        <AppContent />
      </LoaderProvider>
    </Router>
  );
}

export default App;