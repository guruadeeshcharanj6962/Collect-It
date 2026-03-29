import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import RateCalculator from './RateCalculator';
import { motion } from 'motion/react';

export default function Hero() {
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [previousLocation, setPreviousLocation] = useState('Downtown');
  const city = 'San Francisco';

  useEffect(() => {
    // Mock predictive entry logic
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsReturningUser(true);
      setPreviousLocation(localStorage.getItem('lastLocation') || 'Downtown');
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live in {city}
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              {isReturningUser ? (
                <>
                  Welcome back! <br />
                  <span className="text-blue-600">Need another collection from {previousLocation}?</span>
                </>
              ) : (
                <>
                  The Smartest Way to Move Anything in <span className="text-blue-600">{city}</span>.
                </>
              )}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We collect it, so you don't have to. Experience lightning-fast, reliable, and fully tracked delivery for items of any size.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/checkout"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#pricing"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                View Pricing
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-8 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Under 60 min pickup
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Fully Insured
              </div>
            </div>
          </motion.div>

          {/* Right Column: Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <RateCalculator />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
