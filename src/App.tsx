import { LoaderProvider } from './components/ui/Loader/LoaderContext';
import Loader from './components/ui/Loader/Loader';
import Hero from './sections/Hero';

function App() {
  return (
    <LoaderProvider>
      <main className="bg-black min-h-screen text-white">
        <Loader />
        <Hero />
        {/* Other sections (About, Projects) will go here later */}
      </main>
    </LoaderProvider>
  );
}

export default App;