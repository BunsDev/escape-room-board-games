import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const Logo = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  useIntersectionObserver(logoRef, (entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });

  return (
    <div ref={logoRef} className="relative w-12 h-12 opacity-0 transition-all duration-1000 transform translate-y-4 group">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-300 group-hover:scale-110"
      >
        {/* Face Shape */}
        <path
          d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
          className="fill-purple-500"
        />
        
        {/* Eyes */}
        <path
          d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
          className="fill-purple-300"
        />
        <path
          d="M16 10C17.1046 10 18 9.10457 18 8C18 6.89543 17.1046 6 16 6C14.8954 6 14 6.89543 14 8C14 9.10457 14.8954 10 16 10Z"
          className="fill-purple-300"
        />
        
        {/* Beak */}
        <path
          d="M12 11L10 14H14L12 11Z"
          className="fill-purple-300"
        />
        
        {/* Magnifying Glass */}
        <g className="transform origin-bottom-right transition-transform duration-300 group-hover:rotate-12">
          <circle
            cx="16"
            cy="16"
            r="2.5"
            className="stroke-purple-300"
            strokeWidth="1.5"
          />
          <line
            x1="18"
            y1="18"
            x2="20"
            y2="20"
            className="stroke-purple-300"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};