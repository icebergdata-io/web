import React, { useState } from 'react';
import Logo from './Logo';

const travelSolutions = [
  {
    title: "Hotel Data Collection",
    description: "Comprehensive hotel data including rates, availability, amenities, and reviews from multiple OTAs and direct sources.",
    icon: "🏨",
    examples: [
      {
        name: "Booking.com Hotels Database",
        sources: ["booking.com"],
        schema: {
          hotelName: "string",
          starRating: "number",
          address: "object",
          roomTypes: "array",
          prices: "object",
          amenities: "array",
          reviews: "array",
          availability: "object",
          images: "array",
          coordinates: "object"
        }
      },
      {
        name: "Expedia Properties Database",
        sources: ["expedia.com"],
        schema: {
          propertyId: "string",
          name: "string",
          category: "string",
          rates: "object",
          policies: "object",
          facilities: "array",
          roomOptions: "array",
          guestRatings: "object"
        }
      },
      {
        name: "Airbnb Listings Database",
        sources: ["airbnb.com"],
        schema: {
          listingId: "string",
          title: "string",
          hostInfo: "object",
          pricing: "object",
          availability: "object",
          amenities: "array",
          rules: "object",
          reviews: "array",
          location: "object"
        }
      },
      {
        name: "Hotels.com Inventory",
        sources: ["hotels.com"],
        schema: {
          hotelId: "string",
          details: "object",
          rooms: "array",
          pricing: "object",
          availability: "object",
          amenities: "array",
          photos: "array",
          ratings: "object"
        }
      }
    ]
  },
  {
    title: "Flight Information",
    description: "Real-time flight prices, schedules, and availability across multiple airlines and booking platforms.",
    icon: "✈️",
    examples: [
      {
        name: "Kayak Flights Database",
        sources: ["kayak.com"],
        schema: {
          flightNumber: "string",
          airline: "object",
          route: "object",
          pricing: "array",
          schedule: "object",
          availability: "number",
          aircraft: "object"
        }
      },
      {
        name: "Skyscanner Routes Database",
        sources: ["skyscanner.com"],
        schema: {
          routeId: "string",
          origin: "object",
          destination: "object",
          carriers: "array",
          prices: "array",
          schedules: "array",
          stops: "array"
        }
      },
      {
        name: "Google Flights Data",
        sources: ["google.com/flights"],
        schema: {
          searchId: "string",
          itineraries: "array",
          priceHistory: "array",
          airlines: "array",
          priceAlerts: "object",
          legDetails: "array"
        }
      },
      {
        name: "Direct Airlines Database",
        sources: ["multiple airline websites"],
        schema: {
          carrier: "string",
          routes: "array",
          fares: "object",
          classes: "array",
          availability: "object",
          rules: "object"
        }
      }
    ]
  },
  {
    title: "Travel Reviews & Ratings",
    description: "Aggregated customer reviews, ratings, and sentiment analysis from various travel platforms.",
    icon: "⭐",
    examples: [
      {
        name: "TripAdvisor Reviews",
        sources: ["tripadvisor.com"],
        schema: {
          reviewId: "string",
          propertyRef: "string",
          rating: "number",
          text: "string",
          date: "date",
          userInfo: "object",
          helpful: "number",
          photos: "array",
          response: "object"
        }
      },
      {
        name: "Yelp Travel Database",
        sources: ["yelp.com"],
        schema: {
          businessId: "string",
          reviews: "array",
          ratings: "object",
          categories: "array",
          attributes: "object",
          photos: "array"
        }
      },
      {
        name: "Google Places Reviews",
        sources: ["google.com/maps"],
        schema: {
          placeId: "string",
          reviews: "array",
          rating: "number",
          types: "array",
          attributes: "object",
          photos: "array"
        }
      },
      {
        name: "Trustpilot Travel Reviews",
        sources: ["trustpilot.com"],
        schema: {
          companyId: "string",
          reviews: "array",
          rating: "object",
          tags: "array",
          responses: "array",
          verified: "boolean"
        }
      }
    ]
  }
];

const ecommerceSolutions = [
  {
    title: "Product Data Monitoring",
    description: "Track prices, inventory, and product details across multiple e-commerce platforms and marketplaces.",
    icon: "🛍️",
    examples: [
      {
        name: "Amazon Products Database",
        sources: ["amazon.com"],
        schema: {
          asin: "string",
          title: "string",
          brand: "string",
          category: "array",
          price: "object",
          features: "array",
          specs: "object",
          inventory: "object",
          reviews: "array"
        }
      },
      {
        name: "Walmart Catalog Data",
        sources: ["walmart.com"],
        schema: {
          productId: "string",
          details: "object",
          pricing: "object",
          availability: "object",
          specifications: "array",
          reviews: "array",
          variants: "array"
        }
      },
      {
        name: "eBay Listings Database",
        sources: ["ebay.com"],
        schema: {
          listingId: "string",
          title: "string",
          seller: "object",
          price: "object",
          condition: "string",
          shipping: "object",
          bids: "array"
        }
      },
      {
        name: "Best Buy Products",
        sources: ["bestbuy.com"],
        schema: {
          sku: "string",
          productInfo: "object",
          pricing: "object",
          availability: "object",
          specs: "array",
          reviews: "array",
          warranty: "object"
        }
      }
    ]
  },
  {
    title: "Competitor Analysis",
    description: "Monitor competitor pricing, promotions, and product launches with automated data collection.",
    icon: "📊",
    examples: [
      {
        name: "Price Comparison Database",
        sources: ["multiple retailers"],
        schema: {
          productId: "string",
          retailers: "array",
          prices: "array",
          promotions: "array",
          availability: "object",
          history: "array"
        }
      },
      {
        name: "Promotional Campaigns",
        sources: ["retailer websites"],
        schema: {
          campaignId: "string",
          retailer: "string",
          products: "array",
          discounts: "object",
          duration: "object",
          terms: "string"
        }
      },
      {
        name: "Product Launch Tracker",
        sources: ["multiple sources"],
        schema: {
          productId: "string",
          brand: "string",
          launchDate: "date",
          pricing: "object",
          channels: "array",
          marketing: "object"
        }
      },
      {
        name: "Market Share Analysis",
        sources: ["multiple platforms"],
        schema: {
          category: "string",
          competitors: "array",
          sales: "object",
          trends: "array",
          rankings: "object"
        }
      }
    ]
  },
  {
    title: "Market Intelligence",
    description: "Gather market trends, customer reviews, and product performance data for informed decision-making.",
    icon: "📈",
    examples: [
      {
        name: "Consumer Reviews Database",
        sources: ["multiple review sites"],
        schema: {
          productId: "string",
          platform: "string",
          reviews: "array",
          sentiment: "object",
          ratings: "object",
          topics: "array"
        }
      },
      {
        name: "Category Trends",
        sources: ["market research sites"],
        schema: {
          category: "string",
          trends: "array",
          growth: "object",
          demographics: "object",
          forecasts: "array"
        }
      },
      {
        name: "Brand Performance",
        sources: ["multiple sources"],
        schema: {
          brand: "string",
          metrics: "object",
          sentiment: "object",
          share: "object",
          competitors: "array"
        }
      },
      {
        name: "Search Trends Database",
        sources: ["search engines"],
        schema: {
          keyword: "string",
          volume: "object",
          trends: "array",
          related: "array",
          demographics: "object"
        }
      }
    ]
  }
];

const realEstateSolutions = [
  {
    title: "Property Listings Monitor",
    description: "Track real-time property listings, prices, and availability across multiple real estate platforms and MLS systems.",
    icon: "🏠",
    examples: [
      {
        name: "Zillow Properties Database",
        sources: ["zillow.com"],
        schema: {
          zpid: "string",
          address: "object",
          price: "object",
          details: "object",
          history: "array",
          schools: "array",
          taxes: "object",
          zestimate: "object"
        }
      },
      {
        name: "Realtor.com Listings",
        sources: ["realtor.com"],
        schema: {
          listingId: "string",
          property: "object",
          price: "object",
          features: "array",
          history: "array",
          agent: "object",
          photos: "array"
        }
      },
      {
        name: "Redfin Database",
        sources: ["redfin.com"],
        schema: {
          propertyId: "string",
          location: "object",
          details: "object",
          pricing: "object",
          history: "array",
          insights: "object",
          photos: "array"
        }
      },
      {
        name: "Trulia Properties",
        sources: ["trulia.com"],
        schema: {
          listingId: "string",
          details: "object",
          price: "object",
          neighborhood: "object",
          history: "array",
          schools: "array",
          crime: "object"
        }
      }
    ]
  },
  {
    title: "Market Analytics",
    description: "Collect and analyze property values, rental rates, and market trends for different locations and property types.",
    icon: "📊",
    examples: [
      {
        name: "Market Trends Database",
        sources: ["multiple sources"],
        schema: {
          location: "object",
          metrics: "object",
          trends: "array",
          forecasts: "object",
          comparisons: "array"
        }
      },
      {
        name: "Rental Rates Analysis",
        sources: ["rental platforms"],
        schema: {
          area: "string",
          rates: "object",
          trends: "array",
          occupancy: "object",
          amenities: "object"
        }
      },
      {
        name: "Property Value Index",
        sources: ["multiple sources"],
        schema: {
          location: "object",
          values: "array",
          appreciation: "object",
          comparables: "array",
          factors: "object"
        }
      },
      {
        name: "Investment Metrics",
        sources: ["investment platforms"],
        schema: {
          market: "string",
          roi: "object",
          risks: "array",
          opportunities: "array",
          projections: "object"
        }
      }
    ]
  },
  {
    title: "Investment Insights",
    description: "Gather data on property investment opportunities, ROI metrics, and neighborhood analytics for informed decisions.",
    icon: "💰",
    examples: [
      {
        name: "Investment Properties",
        sources: ["investment sites"],
        schema: {
          propertyId: "string",
          financials: "object",
          roi: "object",
          expenses: "array",
          projections: "object"
        }
      },
      {
        name: "Neighborhood Analytics",
        sources: ["multiple sources"],
        schema: {
          area: "string",
          demographics: "object",
          amenities: "array",
          development: "object",
          scores: "object"
        }
      },
      {
        name: "Market Opportunity Index",
        sources: ["research platforms"],
        schema: {
          market: "string",
          score: "object",
          factors: "array",
          trends: "object",
          risks: "array"
        }
      },
      {
        name: "Property Management Data",
        sources: ["management platforms"],
        schema: {
          property: "string",
          operations: "object",
          maintenance: "array",
          tenants: "object",
          financials: "array"
        }
      }
    ]
  }
];

const TabPanel = ({ children, isActive }) => (
  <div className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
    {children}
  </div>
);

const Solutions = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [activeExample, setActiveExample] = useState(null);

  const renderExampleDetails = (example) => (
    <div className="mt-4 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-bold text-dark-900">{example.name}</h4>
        <div className="text-sm text-dark-600">
          Sources: {example.sources.join(', ')}
        </div>
      </div>
      <div className="bg-dark-900/5 rounded-xl p-4">
        <h5 className="text-sm font-medium text-dark-900 mb-2">Schema Structure:</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(example.schema).map(([key, type]) => (
            <div key={key} className="flex items-start space-x-2">
              <span className="text-primary-600 font-mono text-sm">{key}:</span>
              <span className="text-dark-600 font-mono text-sm">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSolutionCard = (solution, index) => (
    <div
      key={index}
      className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-white/20"
    >
      <div className="text-4xl mb-6 bg-gradient-to-br from-primary-100 to-transparent w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {solution.icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-dark-900 mb-4 group-hover:text-primary-600 transition-colors">
        {solution.title}
      </h3>
      <p className="text-dark-600 leading-relaxed mb-6">
        {solution.description}
      </p>
      
      {/* Database Examples */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-dark-900">Available Databases:</h4>
        <div className="grid grid-cols-2 gap-2">
          {solution.examples.map((example, exampleIndex) => (
            <button
              key={exampleIndex}
              onClick={() => setActiveExample(activeExample === exampleIndex ? null : exampleIndex)}
              className={`p-3 text-left rounded-xl transition-all duration-300 ${
                activeExample === exampleIndex
                  ? 'bg-primary-50 text-primary-600'
                  : 'hover:bg-dark-50 text-dark-600'
              }`}
            >
              <div className="text-sm font-medium">{example.name}</div>
              <div className="text-xs opacity-75">{example.sources[0]}</div>
            </button>
          ))}
        </div>
        {activeExample !== null && renderExampleDetails(solution.examples[activeExample])}
      </div>
    </div>
  );

  return (
    <section id="solutions" className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white">
      <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-accent-purple/5 to-accent-cyan/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <Logo size="medium" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
              Industry Solutions
            </span>
          </h2>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Specialized web scraping solutions tailored for your industry needs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-xl bg-white/50 backdrop-blur-sm shadow-lg p-1.5 border border-white/20">
            <button
              onClick={() => setActiveTab('travel')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'travel'
                  ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-lg'
                  : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              Travel Industry
            </button>
            <button
              onClick={() => setActiveTab('ecommerce')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'ecommerce'
                  ? 'bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg'
                  : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              E-commerce
            </button>
            <button
              onClick={() => setActiveTab('realestate')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'realestate'
                  ? 'bg-gradient-to-r from-accent-cyan to-primary-600 text-white shadow-lg'
                  : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              Real Estate
            </button>
          </div>
        </div>

        {/* Tab Panels */}
        <div className="relative min-h-[400px]">
          <TabPanel isActive={activeTab === 'travel'}>
            <div className="grid md:grid-cols-2 gap-12">
              {travelSolutions.map((solution, index) => renderSolutionCard(solution, index))}
            </div>
          </TabPanel>

          <TabPanel isActive={activeTab === 'ecommerce'}>
            <div className="grid md:grid-cols-2 gap-12">
              {ecommerceSolutions.map((solution, index) => renderSolutionCard(solution, index))}
            </div>
          </TabPanel>

          <TabPanel isActive={activeTab === 'realestate'}>
            <div className="grid md:grid-cols-2 gap-12">
              {realEstateSolutions.map((solution, index) => renderSolutionCard(solution, index))}
            </div>
          </TabPanel>
        </div>
      </div>
    </section>
  );
};

export default Solutions; 