import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CaseStudy from './pages/CaseStudy';
import PrivateCaseStudy from './pages/PrivateCaseStudy';
import CaseStudies from './pages/CaseStudies';
import PrivateCaseStudies from './pages/PrivateCaseStudies';
import PressCoverage from './pages/PressCoverage';
import BookingConfirmation from './pages/BookingConfirmation';
import ServicesPage from './pages/services';
import WebScrapingPage from './pages/services/web-scraping';
import DataIntegrationPage from './pages/services/data-integration';
import CustomSolutionsPage from './pages/services/custom-solutions';
import CarRentalLanding from './pages/industry_landings/CarRentalLanding';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import RefundPage from './pages/RefundPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/web-scraping" element={<WebScrapingPage />} />
            <Route path="services/data-integration" element={<DataIntegrationPage />} />
            <Route path="services/custom-solutions" element={<CustomSolutionsPage />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="private-case-studies" element={<PrivateCaseStudies />} />
            <Route path="case-study" element={<Navigate to="/case-studies" replace />} />
            <Route path="case-study/:sector/:slug" element={<CaseStudy />} />
            <Route path="press" element={<PressCoverage />} />
            <Route path="booking-confirmation" element={<BookingConfirmation />} />
            <Route path="car-rental" element={<CarRentalLanding />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="cookies" element={<CookiesPage />} />
            <Route path="refund" element={<RefundPage />} />
            <Route path="refund-policy" element={<RefundPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="private-case-study/:caseId/:accessToken" element={<PrivateCaseStudy />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
