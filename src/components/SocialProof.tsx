import { Star, ShieldCheck, Users, PackageCheck } from 'lucide-react';

export default function SocialProof() {
  const stats = [
    { label: 'Items Collected This Month', value: '10,000+', icon: <PackageCheck className="w-6 h-6 text-blue-600" /> },
    { label: 'Happy Customers', value: '99.8%', icon: <Users className="w-6 h-6 text-blue-600" /> },
    { label: 'Average Pickup Time', value: '< 45m', icon: <Star className="w-6 h-6 text-blue-600" /> },
    { label: 'Fully Insured Deliveries', value: '100%', icon: <ShieldCheck className="w-6 h-6 text-blue-600" /> },
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've built a reputation for speed, reliability, and security.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
