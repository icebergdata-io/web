import { Hotel, Plane, Star, Palette, ShoppingBag, BarChart, TrendingUp, Layout, Home, Map, CircleDollarSign, Grid } from 'lucide-react';

const travelSolutions = [
  {
    title: "Hotel Data Collection",
    description: "Comprehensive hotel data including rates, availability, amenities, and reviews from multiple OTAs and direct sources.",
    icon: <Hotel className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Booking.com Hotels Database",
        sources: ["booking.com"],
        schema: {
          hotelName: "string",
          starRating: "number",
          address: "object",
          roomTypes: "array",
          priceDetails: "object",
          amenities: "array",
          reviewSummary: "object",
          availability: "object",
          images: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Expedia Properties Database",
        sources: ["expedia.com"],
        schema: {
          propertyId: "string",
          propertyName: "string",
          category: "string",
          rateDetails: "object",
          policies: "object",
          facilities: "array",
          roomOptions: "array",
          reviewStats: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Airbnb Listings Database",
        sources: ["airbnb.com"],
        schema: {
          listingId: "string",
          title: "string",
          hostDetails: "object",
          pricing: "object",
          availability: "object",
          amenities: "array",
          houseRules: "object",
          reviewStats: "object",
          location: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Hotels.com Inventory",
        sources: ["hotels.com"],
        schema: {
          hotelId: "string",
          details: "object",
          roomInfo: "array",
          pricing: "object",
          availability: "object",
          amenities: "array",
          photos: "array",
          ratingOverview: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Flight Information",
    description: "Real-time flight prices, schedules, and availability across multiple airlines and booking platforms.",
    icon: <Plane className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Kayak Flights Database",
        sources: ["kayak.com"],
        schema: {
          flightNumber: "string",
          airline: "object",
          routeDetails: "object",
          prices: "array",
          scheduleInfo: "object",
          seatAvailability: "number",
          aircraftDetails: "object",
          sourceUrl: "string",
          lastScraped: "date"
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
          fareOptions: "array",
          schedules: "array",
          stops: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Google Flights Data",
        sources: ["google.com/flights"],
        schema: {
          searchId: "string",
          itineraries: "array",
          priceHistory: "array",
          carriers: "array",
          priceAlerts: "object",
          legDetails: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Direct Airlines Database",
        sources: ["multiple airline websites"],
        schema: {
          carrier: "string",
          routes: "array",
          fareDetails: "object",
          cabinClasses: "array",
          seatAvailability: "object",
          restrictions: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Travel Reviews & Ratings",
    description: "Aggregated customer reviews, ratings, and sentiment analysis from various travel platforms.",
    icon: <Star className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "TripAdvisor Reviews",
        sources: ["tripadvisor.com"],
        schema: {
          reviewId: "string",
          propertyRef: "string",
          rating: "number",
          reviewText: "string",
          reviewDate: "date",
          userDetails: "object",
          helpfulCount: "number",
          photos: "array",
          managementResponse: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Yelp Travel Database",
        sources: ["yelp.com"],
        schema: {
          businessId: "string",
          reviewsData: "array",
          ratingSummary: "object",
          categories: "array",
          attributes: "object",
          photos: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Google Places Reviews",
        sources: ["google.com/maps"],
        schema: {
          placeId: "string",
          reviewData: "array",
          overallRating: "number",
          placeTypes: "array",
          attributes: "object",
          photos: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Trustpilot Travel Reviews",
        sources: ["trustpilot.com"],
        schema: {
          companyId: "string",
          reviewsData: "array",
          ratingDetails: "object",
          tags: "array",
          companyResponses: "array",
          verifiedStatus: "boolean",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "UI Components & Modals",
    description: "Ready-to-use travel industry components and modal templates for seamless user experience.",
    icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Booking Components",
        sources: ["travel platforms"],
        schema: {
          componentId: "string",
          componentType: "string",
          templates: "array",
          modals: "object",
          styling: "object",
          interactions: "array",
          accessibility: "object",
          localization: "array",
          sourceUrl: "string"
        }
      },
      {
        name: "Travel Search Interface",
        sources: ["booking systems"],
        schema: {
          searchId: "string",
          filters: "array",
          resultsView: "object",
          sortingOptions: "object",
          pagination: "object",
          modals: "array",
          responsiveDesign: "object",
          sourceUrl: "string"
        }
      },
      {
        name: "Reservation System UI",
        sources: ["multiple platforms"],
        schema: {
          bookingFlow: "object",
          formFields: "array",
          validationRules: "object",
          paymentOptions: "object",
          confirmationSteps: "object",
          notifications: "array",
          sourceUrl: "string"
        }
      },
      {
        name: "Travel Dashboard Components",
        sources: ["management systems"],
        schema: {
          widgets: "array",
          analyticsData: "object",
          reports: "array",
          controls: "object",
          modals: "object",
          charts: "array",
          sourceUrl: "string"
        }
      }
    ]
  }
];

const ecommerceSolutions = [
  {
    title: "Product Data Monitoring",
    description: "Track prices, inventory, and product details across multiple e-commerce platforms and marketplaces.",
    icon: <ShoppingBag className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Amazon Products Database",
        sources: ["amazon.com"],
        schema: {
          asin: "string",
          productTitle: "string",
          brand: "string",
          categories: "array",
          priceData: "object",
          features: "array",
          specifications: "object",
          inventoryStatus: "object",
          reviewStats: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Walmart Catalog Data",
        sources: ["walmart.com"],
        schema: {
          productId: "string",
          productDetails: "object",
          pricingInfo: "object",
          availability: "object",
          specifications: "array",
          reviewData: "array",
          variants: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "eBay Listings Database",
        sources: ["ebay.com"],
        schema: {
          listingId: "string",
          productTitle: "string",
          sellerInfo: "object",
          priceData: "object",
          condition: "string",
          shippingDetails: "object",
          bidHistory: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Best Buy Products",
        sources: ["bestbuy.com"],
        schema: {
          sku: "string",
          productInfo: "object",
          pricingData: "object",
          availability: "object",
          specs: "array",
          reviewData: "array",
          warranty: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Competitor Analysis",
    description: "Monitor competitor pricing, promotions, and product launches with automated data collection.",
    icon: <BarChart className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Price Comparison Database",
        sources: ["multiple retailers"],
        schema: {
          productId: "string",
          retailers: "array",
          pricePoints: "array",
          promotions: "array",
          availability: "object",
          priceHistory: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Promotional Campaigns",
        sources: ["retailer websites"],
        schema: {
          campaignId: "string",
          retailer: "string",
          productList: "array",
          discountDetails: "object",
          campaignDuration: "object",
          terms: "string",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Product Launch Tracker",
        sources: ["multiple sources"],
        schema: {
          productId: "string",
          brand: "string",
          launchDate: "date",
          pricingDetails: "object",
          channels: "array",
          marketingInfo: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Market Share Analysis",
        sources: ["multiple platforms"],
        schema: {
          category: "string",
          competitors: "array",
          salesData: "object",
          marketTrends: "array",
          rankings: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Market Intelligence",
    description: "Gather market trends, customer reviews, and product performance data for informed decision-making.",
    icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Consumer Reviews Database",
        sources: ["multiple review sites"],
        schema: {
          productId: "string",
          platform: "string",
          reviewList: "array",
          sentimentAnalysis: "object",
          ratingStats: "object",
          topics: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Category Trends",
        sources: ["market research sites"],
        schema: {
          category: "string",
          trendData: "array",
          growthMetrics: "object",
          demographics: "object",
          forecastData: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Brand Performance",
        sources: ["multiple sources"],
        schema: {
          brand: "string",
          performanceMetrics: "object",
          sentimentData: "object",
          marketShare: "object",
          competitors: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Search Trends Database",
        sources: ["search engines"],
        schema: {
          keyword: "string",
          searchVolume: "object",
          trendData: "array",
          relatedKeywords: "array",
          demographicsInfo: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Interface Components & Modals",
    description: "Comprehensive collection of e-commerce UI components and modal templates for enhanced shopping experience.",
    icon: <Layout className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Product Components",
        sources: ["e-commerce platforms"],
        schema: {
          productCards: "array",
          galleries: "object",
          quickView: "object",
          modals: "array",
          filters: "object",
          cart: "object",
          sourceUrl: "string"
        }
      },
      {
        name: "Checkout Interface",
        sources: ["shopping platforms"],
        schema: {
          steps: "array",
          formFields: "object",
          validationRules: "object",
          paymentMethods: "object",
          modals: "array",
          confirmation: "object",
          sourceUrl: "string"
        }
      },
      {
        name: "Store Management UI",
        sources: ["admin platforms"],
        schema: {
          dashboard: "object",
          inventoryData: "object",
          ordersList: "array",
          modals: "object",
          reports: "array",
          settings: "object",
          sourceUrl: "string"
        }
      },
      {
        name: "Shopping Cart System",
        sources: ["multiple platforms"],
        schema: {
          cartDetails: "object",
          checkoutProcess: "object",
          modals: "array",
          notifications: "object",
          dataPersistence: "object",
          syncOptions: "array",
          sourceUrl: "string"
        }
      }
    ]
  }
];

const realEstateSolutions = [
  {
    title: "Property Listings Monitor",
    description: "Track real-time property listings, prices, and availability across multiple real estate platforms and MLS systems.",
    icon: <Home className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Zillow Properties Database",
        sources: ["zillow.com"],
        schema: {
          zpid: "string",
          addressInfo: "object",
          priceData: "object",
          propertyDetails: "object",
          listingHistory: "array",
          nearbySchools: "array",
          taxesInfo: "object",
          zestimateData: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Realtor.com Listings",
        sources: ["realtor.com"],
        schema: {
          listingId: "string",
          propertyDetails: "object",
          priceData: "object",
          features: "array",
          listingHistory: "array",
          agentInfo: "object",
          photos: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Redfin Database",
        sources: ["redfin.com"],
        schema: {
          propertyId: "string",
          locationData: "object",
          propertyDetails: "object",
          pricingInfo: "object",
          listingHistory: "array",
          insights: "object",
          photos: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Trulia Properties",
        sources: ["trulia.com"],
        schema: {
          listingId: "string",
          propertyDetails: "object",
          priceData: "object",
          neighborhoodInfo: "object",
          listingHistory: "array",
          nearbySchools: "array",
          crimeStats: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Market Analytics",
    description: "Collect and analyze property values, rental rates, and market trends for different locations and property types.",
    icon: <Map className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Market Trends Database",
        sources: ["multiple sources"],
        schema: {
          locationInfo: "object",
          marketMetrics: "object",
          trendData: "array",
          forecastData: "object",
          comparisons: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Rental Rates Analysis",
        sources: ["rental platforms"],
        schema: {
          area: "string",
          rentalRates: "object",
          trendData: "array",
          occupancyStats: "object",
          amenitiesInfo: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Property Value Index",
        sources: ["multiple sources"],
        schema: {
          locationInfo: "object",
          valuesData: "array",
          appreciationRate: "object",
          comparables: "array",
          influencingFactors: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Investment Metrics",
        sources: ["investment platforms"],
        schema: {
          market: "string",
          roiData: "object",
          riskFactors: "array",
          opportunities: "array",
          projections: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Investment Insights",
    description: "Gather data on property investment opportunities, ROI metrics, and neighborhood analytics for informed decisions.",
    icon: <CircleDollarSign className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Investment Properties",
        sources: ["investment sites"],
        schema: {
          propertyId: "string",
          financialData: "object",
          roiAnalysis: "object",
          expensesList: "array",
          projections: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Neighborhood Analytics",
        sources: ["multiple sources"],
        schema: {
          area: "string",
          demographicsData: "object",
          amenities: "array",
          developmentInfo: "object",
          neighborhoodScores: "object",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Market Opportunity Index",
        sources: ["research platforms"],
        schema: {
          market: "string",
          opportunityScore: "object",
          influencingFactors: "array",
          marketTrends: "object",
          potentialRisks: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      },
      {
        name: "Property Management Data",
        sources: ["management platforms"],
        schema: {
          propertyId: "string",
          operationsData: "object",
          maintenanceLogs: "array",
          tenantInfo: "object",
          financials: "array",
          sourceUrl: "string",
          lastScraped: "date"
        }
      }
    ]
  },
  {
    title: "Property Interface & Modals",
    description: "Specialized real estate UI components and modal templates for property listing and management.",
    icon: <Grid className="w-8 h-8 md:w-10 md:h-10" />,
    examples: [
      {
        name: "Property Components",
        sources: ["real estate platforms"],
        schema: {
          listingsData: "array",
          galleries: "object",
          virtualTour: "object",
          modals: "array",
          forms: "object",
          maps: "object",
          sourceUrl: "string"
        }
      },
      {
        name: "Agent Dashboard UI",
        sources: ["agent platforms"],
        schema: {
          leadsData: "array",
          propertiesInfo: "object",
          calendar: "object",
          modals: "array",
          reports: "object",
          communications: "array",
          sourceUrl: "string"
        }
      },
      {
        name: "Property Search Interface",
        sources: ["listing platforms"],
        schema: {
          searchFilters: "object",
          searchResults: "array",
          mapsIntegration: "object",
          modals: "array",
          savedProperties: "object",
          alerts: "array",
          sourceUrl: "string"
        }
      },
      {
        name: "Property Management System",
        sources: ["management platforms"],
        schema: {
          unitsData: "array",
          tenantDetails: "object",
          maintenanceRequests: "object",
          modals: "array",
          billingInfo: "object",
          documents: "array",
          sourceUrl: "string"
        }
      }
    ]
  }
];

export { travelSolutions, ecommerceSolutions, realEstateSolutions };
