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
import NotFound from './pages/NotFound'; // Import the 404 page

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
            <div className="h-[20vh] bg-black w-full"></div>
            <WorkSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
          </>
        } />

        {/* Route 2: The About Page */}
        <Route path="/about" element={<About />} />

        {/* Route 3: 404 Page (Must be last) */}
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