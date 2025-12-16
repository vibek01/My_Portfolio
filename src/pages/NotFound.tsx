import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <h1 className="text-[15vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none">
        404
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-400 mt-4 mb-12 tracking-wide">
        Lost in the digital void?
      </p>

      <Link 
        to="/" 
        className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-purple-400 hover:scale-105 transition-all duration-300"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;