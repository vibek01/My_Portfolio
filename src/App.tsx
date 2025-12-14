import { LoaderProvider } from './components/ui/Loader/LoaderContext';
import Loader from './components/ui/Loader/Loader';
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import WorkSection from './sections/Projects/WorkSection';

function App() {
  return (
    <LoaderProvider>
      <main className="bg-black min-h-screen text-white selection:bg-purple-500/30">
        <Loader />
        <Navbar />
        <Hero />
        
        {/* The Horizontal Scroll Section */}
        <WorkSection />
        
        {/* Spacer for Footer later */}
        <div className="h-[50vh] bg-black flex items-center justify-center border-t border-white/10">
          <p className="text-gray-600">Contact Section Coming Next...</p>
        </div>
      </main>
    </LoaderProvider>
  );
}

export default App;