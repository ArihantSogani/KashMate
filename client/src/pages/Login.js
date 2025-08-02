import React, { useState } from 'react';
import api from '../config/axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(`Login failed: ${err.message}`);
      } else {
        setError('Login failed. Please try again.');
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

      {/* Login Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in-up">
          <h2 className="text-3xl font-bold text-on-surface mb-2 text-center">Welcome Back</h2>
          <p className="text-on-surface-secondary text-center mb-8">Sign in to your KashMate account</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                placeholder="Enter your password (Min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="text-primary font-semibold hover:underline transition-colors duration-300 text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:scale-100"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-on-surface-secondary">Don't have an account? </span>
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>

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

export default Login;
                              