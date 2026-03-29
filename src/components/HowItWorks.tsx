import { Smartphone, Truck, Map } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: '1. Request',
      description: 'Enter your pickup and drop-off details in our app or website. Get an instant quote.',
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: '2. Collection',
      description: 'A vetted driver arrives within 60 minutes to safely collect your items.',
    },
    {
      icon: <Map className="w-8 h-8 text-blue-600" />,
      title: '3. Tracked Delivery',
      description: 'Follow your item in real-time until it reaches its destination securely.',
    },
  ];

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to move anything across the city.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
