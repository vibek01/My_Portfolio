import { LoaderProvider } from './components/ui/Loader/LoaderContext';
import Loader from './components/ui/Loader/Loader';
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';

function App() {
  return (
    <LoaderProvider>
      <main className="bg-black min-h-screen text-white selection:bg-purple-500/30">
        <Loader />
        <Navbar />
        <Hero />
        <About />
        
        {/* Placeholder for Projects Section */}
        <div id="projects" className="h-screen bg-black flex items-center justify-center">
          <p className="text-gray-600">Projects Coming Next...</p>
        </div>
      </main>
    </LoaderProvider>
  );
}

export default App;