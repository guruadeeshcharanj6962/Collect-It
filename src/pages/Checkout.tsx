import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, User, MapPin, Truck, Loader2, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import { cn } from '../lib/utils';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { estimatedPrice?: number; distance?: number; weight?: number } | null;

  const [price] = useState(state?.estimatedPrice || 25.00);
  const [zipCode, setZipCode] = useState('');
  const [isGuest, setIsGuest] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [assignedDriver, setAssignedDriver] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simulate Agentic Route Optimization based on Zip Code
  useEffect(() => {
    if (zipCode.length === 5) {
      setIsOptimizing(true);
      setAssignedDriver(null);
      
      // Simulate API call to Gemini/Backend for nearest driver
      const timer = setTimeout(() => {
        const drivers = ['Alex M. (0.8 mi away)', 'Sarah T. (1.2 mi away)', 'David K. (2.5 mi away)'];
        // Mock logic: pick a driver based on zip code hash
        const hash = zipCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        setAssignedDriver(drivers[hash % drivers.length]);
        setIsOptimizing(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setAssignedDriver(null);
    }
  }, [zipCode]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Order Confirmed!</h2>
          <p className="text-gray-600">
            Your collection has been booked. {assignedDriver ? `${assignedDriver.split(' ')[0]} is on the way.` : 'A driver will be assigned shortly.'}
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Order Total</div>
            <div className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</div>
          </div>
          <p className="text-sm text-gray-500 animate-pulse">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your booking in seconds.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Guest Checkout Toggle */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-full", isGuest ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600")}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Guest Checkout</h3>
                  <p className="text-sm text-gray-500">No account required</p>
                </div>
              </div>
              <button
                onClick={() => setIsGuest(!isGuest)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  isGuest ? "bg-blue-600" : "bg-gray-200"
                )}
              >
                <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform", isGuest ? "translate-x-6" : "translate-x-1")} />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              
              {/* Collection Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  Collection Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" placeholder="Jane" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" placeholder="Doe" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" placeholder="123 Market St" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input 
                      required 
                      type="text" 
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" 
                      placeholder="94105" 
                    />
                  </div>
                </div>

                {/* Agentic Route Optimization Feedback */}
                <div className="mt-4 h-12">
                  {isOptimizing && (
                    <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Optimizing route & finding nearest driver...
                    </div>
                  )}
                  {assignedDriver && !isOptimizing && (
                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                      <Truck className="w-4 h-4" />
                      Driver Assigned: <span className="font-semibold">{assignedDriver}</span>
                    </div>
                  )}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Payment Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  Payment Method
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input required type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border pl-10" placeholder="0000 0000 0000 0000" />
                      <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                      <input required type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" placeholder="12/28" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input required type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border" placeholder="123" />
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-6 flex items-center justify-center gap-6 text-gray-400">
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <Lock className="w-4 h-4" />
                    256-bit Encryption
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    Secure Checkout
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ${price.toFixed(2)}
                    <Lock className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>$15.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance ({state?.distance || 5} mi)</span>
                  <span>${((state?.distance || 5) * 1.5).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight ({state?.weight || 10} lbs)</span>
                  <span>${((state?.weight || 10) * 0.5).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>${price.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-900 text-sm mb-1">Collect It Guarantee</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Your items are fully insured up to $1,000 during transit. Track your driver in real-time.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
