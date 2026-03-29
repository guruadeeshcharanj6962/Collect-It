import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import SocialProof from '../components/SocialProof';
import StickyCTA from '../components/StickyCTA';
import ChatBubble from '../components/ChatBubble';
import { generateSchema } from '../metadata';

export default function Home() {
  const schema = generateSchema('San Francisco');

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <SocialProof />
      </main>
      <StickyCTA />
      <ChatBubble />
    </div>
  );
}
