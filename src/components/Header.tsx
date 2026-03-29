import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Package } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className={cn('text-xl font-bold tracking-tight', isScrolled ? 'text-gray-900' : 'text-gray-900 lg:text-white')}>
              Collect It
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className={cn('text-sm font-medium hover:text-blue-600 transition-colors', isScrolled ? 'text-gray-600' : 'text-gray-800 lg:text-gray-200')}>
              Dashboard
            </Link>
            <Link to="/login" className={cn('text-sm font-medium hover:text-blue-600 transition-colors', isScrolled ? 'text-gray-600' : 'text-gray-800 lg:text-gray-200')}>
              Login / Sign Up
            </Link>
            <Link
              to="/checkout"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={cn('w-6 h-6', isScrolled ? 'text-gray-900' : 'text-gray-900')} />
            ) : (
              <Menu className={cn('w-6 h-6', isScrolled ? 'text-gray-900' : 'text-gray-900')} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-4 px-4 flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="text-gray-800 font-medium py-2 px-4 hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="text-gray-800 font-medium py-2 px-4 hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login / Sign Up
          </Link>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl text-center shadow-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
