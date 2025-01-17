import React, { useState } from 'react';
import Logo from './Logo';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setStatus({ loading: false, success: false, error });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });

      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: 'Failed to send message. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-white via-primary-50 to-white"></div>
      <div className="absolute -right-64 top-0 w-[600px] h-[600px] bg-gradient-to-br from-accent-purple/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <Logo size="medium" className="opacity-90" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">Start Your Data Journey</h2>
            <p className="text-xl text-dark-700 mb-8">
              Ready to transform your data collection and integration? Let&apos;s discuss your needs.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                disabled={status.loading}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                disabled={status.loading}
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                disabled={status.loading}
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                disabled={status.loading}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your data needs"
                className="w-full md:col-span-2 px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                rows="4"
                disabled={status.loading}
              ></textarea>
            </div>
            
            {status.error && (
              <div className="mt-4 text-red-500 text-sm">
                {status.error}
              </div>
            )}
            
            {status.success && (
              <div className="mt-4 text-green-500 text-sm">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <button 
              type="submit"
              disabled={status.loading}
              className="group relative w-full mt-6 rounded-xl text-lg font-semibold overflow-hidden disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 transition-all group-hover:scale-110 duration-300"></div>
              <span className="relative block py-4 text-white">
                {status.loading ? 'Sending...' : 'Schedule Consultation'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 