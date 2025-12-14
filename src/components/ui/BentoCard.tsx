import { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const BentoCard = ({ children, className = "", title }: BentoCardProps) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/5 group ${className}`}>
      {/* Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {title && (
          <h3 className="text-gray-400 text-xs font-medium tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default BentoCard;