import { useState, useEffect } from 'react';
import { Calculator, MapPin, Weight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RateCalculator() {
  const [distance, setDistance] = useState<number>(5);
  const [weight, setWeight] = useState<number>(10);
  const [price, setPrice] = useState<number>(0);
  const [isSurge, setIsSurge] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamic Pricing Logic: weight * distance * baseRate * surgeMultiplier
    const baseRate = 0.5; // $0.50 per unit
    const currentHour = new Date().getHours();
    
    // Surge multiplier of 1.5 during 5 PM-8 PM (17-20)
    const surgeMultiplier = (currentHour >= 17 && currentHour <= 20) ? 1.5 : 1.0;
    setIsSurge(surgeMultiplier > 1.0);

    const calculatedPrice = weight * distance * baseRate * surgeMultiplier;
    setPrice(Math.max(calculatedPrice, 15)); // Minimum $15 delivery fee
  }, [distance, weight]);

  const handleBook = () => {
    navigate('/checkout', { state: { estimatedPrice: price, distance, weight } });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 w-full max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-2 rounded-lg">
          <Calculator className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Rate Calculator</h3>
      </div>

      <div className="space-y-6">
        {/* Distance Input */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              Distance (miles)
            </span>
            <span className="text-blue-600 font-semibold">{distance} mi</span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Weight Input */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <Weight className="w-4 h-4 text-gray-400" />
              Item Weight (lbs)
            </span>
            <span className="text-blue-600 font-semibold">{weight} lbs</span>
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Price Display */}
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-100">
          <span className="text-sm text-gray-500 font-medium mb-1">Estimated Cost</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold text-gray-900">${price.toFixed(2)}</span>
          </div>
          {isSurge && (
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full mt-2 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Surge Pricing Active
            </span>
          )}
        </div>

        <button
          onClick={handleBook}
          className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          Book This Rate
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
