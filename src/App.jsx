import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import PressCoverage from './pages/PressCoverage';
import BookingConfirmation from './pages/BookingConfirmation';
import NotFound from './pages/NotFound';
import CaseStudy from './pages/CaseStudy';
import CaseStudies from './pages/CaseStudies';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'press',
        element: <PressCoverage />,
      },
      {
        path: 'case-studies',
        element: <CaseStudies />,
      },
      {
        path: 'case-study/:slug',
        element: <CaseStudy />,
      },
      {
        path: 'booking-confirmation',
        element: <BookingConfirmation />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
