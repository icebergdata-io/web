import React, { useState } from 'react';

const PreCalendlyForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    dataNeeds: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact/pre-calendly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      onSubmit();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative transform overflow-hidden rounded-2xl bg-white px-8 py-12 text-left shadow-xl transition-all w-full max-w-md">
      <div className="absolute right-4 top-4">
        <button
          onClick={onClose}
          className="text-dark-400 hover:text-dark-600 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-dark-900">
          Schedule Your Demo
        </h3>
        <p className="mt-2 text-dark-600">
          Please tell us a bit about yourself to help us prepare for the demo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-700">
            Work Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border border-dark-200 px-4 py-3 text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:ring-primary-500"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-dark-700">
            Your Role
          </label>
          <select
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border border-dark-200 px-4 py-3 text-dark-900 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select your role</option>
            <option value="Engineering">Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Product">Product</option>
            <option value="Business">Business/Operations</option>
            <option value="Executive">Executive</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="dataNeeds" className="block text-sm font-medium text-dark-700">
            What are your primary data needs?
          </label>
          <select
            id="dataNeeds"
            name="dataNeeds"
            required
            value={formData.dataNeeds}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border border-dark-200 px-4 py-3 text-dark-900 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select your primary need</option>
            <option value="Web Scraping">Web Scraping</option>
            <option value="Data Integration">Data Integration</option>
            <option value="Data Cleaning">Data Cleaning & Processing</option>
            <option value="Custom Solution">Custom Solution</option>
            <option value="Not Sure">Not Sure Yet</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple px-6 py-3 text-white font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? 'Processing...' : 'Continue to Schedule'}
        </button>
      </form>
    </div>
  );
};

export default PreCalendlyForm; 