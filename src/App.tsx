import { LoaderProvider } from './components/ui/Loader/LoaderContext';
import Loader from './components/ui/Loader/Loader';
import Navbar from './components/layout/Navbar';
import Hero from './sections/Hero';
import WorkSection from './sections/Projects/WorkSection';
import ExperienceSection from './sections/Experience/ExperienceSection';

function App() {
  return (
    <LoaderProvider>
      <main className="bg-black min-h-screen text-white selection:bg-purple-500/30">
        <Loader />
        <Navbar />
        <Hero />
        
        {/* Spacer between Hero and Projects */}
        <div className="h-[20vh] bg-black w-full"></div>

        {/* Projects Section */}
        <WorkSection />
        
        {/* Experience Section (Immediate follow) */}
        <ExperienceSection />
        
        {/* Footer Placeholder */}
        <div className="h-[50vh] bg-black flex items-center justify-center border-t border-white/10">
          <p className="text-gray-600">Footer Coming Next...</p>
        </div>
      </main>
    </LoaderProvider>
  );
}

export default App;