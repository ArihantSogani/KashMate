import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setSuccess(response.data.message);
      // In development, show the token for testing
      if (response.data.resetToken) {
        setResetToken(response.data.resetToken);
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(`Request failed: ${err.message}`);
      } else {
        setError('Request failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Branding Header */}
      <div className="lg:hidden bg-gradient-to-br from-primary via-teal-500 to-cyan-600 animate-background-pan bg-[length:200%_200%] relative overflow-hidden py-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col items-center text-white px-6 animate-slide-in-left">
          <h1 className="text-3xl font-bold mb-2">KashMate</h1>
          <p className="text-white/90 text-center text-sm">
            Your intelligent financial companion
          </p>
        </div>
      </div>

      {/* Desktop Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-teal-500 to-cyan-600 animate-background-pan bg-[length:200%_200%] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 animate-slide-in-left">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">KashMate</h1>
            <p className="text-xl mb-8 text-white/90">
              Your intelligent financial companion for smarter money management
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white/80">Track expenses effortlessly</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white/80">Get AI-powered insights</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white/80">Achieve your financial goals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in-up">
          <h2 className="text-3xl font-bold text-on-surface mb-2 text-center">Forgot Password</h2>
          <p className="text-on-surface-secondary text-center mb-8">
            Enter your email address and we'll send you a link to reset your password
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:scale-100"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-on-surface-secondary">Remember your password? </span>
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline transition-colors duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-4 bg-income/10 border border-income/20 rounded-lg">
              <p className="text-income text-center text-sm font-medium">{success}</p>
              {resetToken && (
                <div className="mt-3 p-3 bg-surface rounded border">
                  <p className="text-on-surface-secondary text-xs mb-2">Development Token (remove in production):</p>
                  <p className="text-on-surface text-xs break-all font-mono">{resetToken}</p>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-expense/10 border border-expense/20 rounded-lg">
              <p className="text-expense text-center text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 