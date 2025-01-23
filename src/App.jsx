import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CaseStudy from './pages/CaseStudy';
import CaseStudies from './pages/CaseStudies';
import PressCoverage from './pages/PressCoverage';
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="case-study/:sector/:slug" element={<CaseStudy />} />
            <Route path="press" element={<PressCoverage />} />
            <Route path="booking-confirmation" element={<BookingConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
