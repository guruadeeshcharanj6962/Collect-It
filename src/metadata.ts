export const generateSchema = (city: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Collect It",
    "image": "https://example.com/logo.png",
    "description": `The smartest way to move anything in ${city}. On-demand delivery service with real-time tracking.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "telephone": "+1-800-555-0199",
    "url": "https://example.com",
    "sameAs": [
      "https://www.facebook.com/collectit",
      "https://www.twitter.com/collectit"
    ]
  };
};

export const metadata = {
  title: 'Collect It - On-Demand Delivery',
  description: 'We collect it, so you don\'t have to. Experience lightning-fast, reliable, and fully tracked delivery for items of any size.',
  keywords: 'delivery, courier, on-demand, local delivery, same-day delivery',
};
