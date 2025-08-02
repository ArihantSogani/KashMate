import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

function About() {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/reviews', reviewForm);
      setSuccess(true);
      setReviewForm({ name: '', email: '', rating: 5, message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setReviewForm(prev => ({ ...prev, rating: index + 1 }))}
        className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-400 transition-colors`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-surface/20">
      {/* Left Sidebar */}
      <div className="w-64 bg-surface/80 backdrop-blur-sm border-r border-surface/30 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-surface/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">ℹ️</span>
            </div>
            <div>
              <h2 className="font-semibold text-on-surface">About</h2>
              <p className="text-xs text-on-surface-secondary">Our App</p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="p-4 space-y-4">
                     <div className="bg-background/50 rounded-lg p-3">
             <p className="text-xs text-on-surface-secondary mb-1">Version</p>
             <p className="text-lg font-bold text-primary">1.1.0</p>
           </div>
          <div className="bg-background/50 rounded-lg p-3">
            <p className="text-xs text-on-surface-secondary mb-1">Status</p>
            <p className="text-lg font-bold text-green-400">Active</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 mt-auto space-y-3">
          <button
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </button>
          <button
            className="w-full bg-red-500/20 text-red-400 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-red-500/30 hover:bg-red-500/30"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-surface/60 backdrop-blur-sm border-b border-surface/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-on-surface">About KashMate</h1>
              {/* <p className="text-sm text-on-surface-secondary">Smart finance tracking for everyone</p> */}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-on-surface-secondary">Live</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-background text-4xl font-bold">💸</span>
              </div>
                             <h2 className="text-3xl font-bold text-on-surface mb-4">Welcome to KashMate v1.1.0</h2>
              <p className="text-lg text-on-surface-secondary max-w-2xl mx-auto">
                Your intelligent finance companion with advanced filtering, transaction history, 
                and dynamic summaries. Track expenses, manage income, and gain insights with 
                beautiful visualizations and smart analytics.
              </p>
            </div>

            {/* Current Features */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
                             <h3 className="text-2xl font-bold text-on-surface mb-6 flex items-center">
                 <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                 Version 1.1.0 Features
               </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-sm">📊</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Smart Dashboard</h4>
                      <p className="text-sm text-on-surface-secondary">Real-time overview with transaction filtering and dynamic summaries</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm">📅</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Transaction History</h4>
                      <p className="text-sm text-on-surface-secondary">Complete transaction history with date filtering and type-based filtering</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Advanced Filtering</h4>
                      <p className="text-sm text-on-surface-secondary">Filter by transaction type (Income/Expense) and specific dates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 text-sm">📈</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Dynamic Summaries</h4>
                      <p className="text-sm text-on-surface-secondary">Real-time income, expense, and balance calculations based on filters</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">🔐</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Password Recovery</h4>
                      <p className="text-sm text-on-surface-secondary">Forgot password functionality with email-based reset system</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-400 text-sm">🎨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Modern UI/UX</h4>
                      <p className="text-sm text-on-surface-secondary">Fluid animations, micro-interactions, and responsive design</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Payment Tracking</h4>
                      <p className="text-sm text-on-surface-secondary">Track expenses by Cash, Card, and UPI with detailed breakdowns</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm">⚙️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Profile Management</h4>
                      <p className="text-sm text-on-surface-secondary">Update profile, email, and password with secure authentication</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Features */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
              <h3 className="text-2xl font-bold text-on-surface mb-6 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                Upcoming Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm">🤖</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">AI-Powered Insights</h4>
                      <p className="text-sm text-on-surface-secondary">Smart suggestions for budget optimization and spending patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-sm">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Mobile App</h4>
                      <p className="text-sm text-on-surface-secondary">Native mobile applications for iOS and Android</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-sm">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Budget Goals</h4>
                      <p className="text-sm text-on-surface-secondary">Set and track budget goals with progress indicators</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 text-sm">📊</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Advanced Reports</h4>
                      <p className="text-sm text-on-surface-secondary">Detailed financial reports and export functionality</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 text-sm">🔔</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Smart Notifications</h4>
                      <p className="text-sm text-on-surface-secondary">Bill reminders and spending alerts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-400 text-sm">🌐</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Multi-Currency</h4>
                      <p className="text-sm text-on-surface-secondary">Support for multiple currencies and exchange rates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Form */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-surface/30">
              <h3 className="text-2xl font-bold text-on-surface mb-6 flex items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
                Share Your Experience
              </h3>
              
              {success && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-400 text-sm">Thank you for your review! Your feedback helps us improve.</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-secondary mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={reviewForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-secondary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={reviewForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-secondary mb-2">
                    Rating *
                  </label>
                  <div className="flex space-x-1">
                    {renderStars(reviewForm.rating)}
                  </div>
                  <p className="text-xs text-on-surface-secondary mt-1">
                    {reviewForm.rating} out of 5 stars
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-secondary mb-2">
                    Your Review *
                  </label>
                  <textarea
                    name="message"
                    value={reviewForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-background/50 border border-surface/30 rounded-lg focus:border-primary focus:outline-none text-on-surface resize-none"
                    placeholder="Share your experience with KashMate..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 text-background py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 