import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Clock, ArrowRight, RefreshCw, Navigation } from 'lucide-react';
import Header from '../components/Header';
import ChatBubble from '../components/ChatBubble';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [agentPosition, setAgentPosition] = useState({ lat: 37.7749, lng: -122.4194 });

  // Simulate agent movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentPosition(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const orderHistory = [
    { id: 'ORD-8921', date: 'Oct 24, 2026', from: 'Downtown Office', to: 'Client Site A', status: 'Delivered', price: '$24.50' },
    { id: 'ORD-8843', date: 'Oct 12, 2026', from: 'Home', to: 'Repair Shop', status: 'Delivered', price: '$18.00' },
    { id: 'ORD-8710', date: 'Sep 30, 2026', from: 'Warehouse', to: 'Downtown Office', status: 'Delivered', price: '$45.00' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your collections and track active deliveries.</p>
          </div>
          <Link
            to="/checkout"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-md flex items-center gap-2"
          >
            New Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Active Delivery (Live Tracking) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Active Delivery</h2>
                    <p className="text-sm text-gray-500">ORD-9042 • Arriving in 12 mins</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Driver: Alex M.</div>
                  <div className="text-sm text-gray-500">Toyota Prius • ABC-123</div>
                </div>
              </div>
              
              {/* Mock Map */}
              <div className="relative h-[400px] bg-gray-200 w-full overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                
                {/* Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <path d="M 100,300 C 200,250 300,350 500,150" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8,8" className="opacity-50" />
                </svg>

                {/* Destination Marker */}
                <div className="absolute top-[150px] right-[20%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded mb-1 shadow-md">Drop-off</div>
                  <MapPin className="w-8 h-8 text-gray-900 fill-white" />
                </div>

                {/* Agent Marker (Animated) */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                  animate={{ x: (agentPosition.lng + 122.4194) * 10000, y: (agentPosition.lat - 37.7749) * -10000 }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                >
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-1 shadow-md whitespace-nowrap">Alex (12m away)</div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50"></div>
                    <Navigation className="w-8 h-8 text-blue-600 fill-white relative z-10 transform -rotate-45" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                Recent Collections
              </h2>
              
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-bold text-gray-500">{order.id}</span>
                        <h3 className="text-sm font-semibold text-gray-900 mt-0.5">{order.date}</h3>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{order.price}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <span className="truncate">{order.from}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{order.to}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        {order.status}
                      </span>
                      <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-3 h-3" />
                        Rebook
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                View All History
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <ChatBubble />
    </div>
  );
}
