import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PressCoverage from './pages/PressCoverage';
import BookingConfirmation from './pages/BookingConfirmation';
import NotFound from './pages/NotFound';

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
    <RouterProvider router={router} />
  );
}

export default App;
