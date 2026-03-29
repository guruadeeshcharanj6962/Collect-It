import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past hero section (approx 600px)
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      )}
    >
      <Link
        to="/checkout"
        className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-gray-900/30 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
      >
        Book Collection
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
