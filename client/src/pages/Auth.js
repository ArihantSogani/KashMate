import React, { useState } from 'react';
import api from '../config/axios';
import { useNavigate, Link } from 'react-router-dom';

function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/auth/login', { 
        email: loginEmail, 
        password: loginPassword 
      });
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/auth/register', { 
        name: registerName, 
        email: registerEmail, 
        password: registerPassword 
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(`Registration failed: ${err.message}`);
      } else {
        setError('Registration failed. Please try again.');
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

      {/* Auth Forms Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-background">
        <div className="w-full max-w-md relative">
          {/* Login Form */}
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isLoginView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-full invisible'
            }`}
          >
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-on-surface mb-2 text-center">Welcome Back</h2>
              <p className="text-on-surface-secondary text-center mb-8">Sign in to your KashMate account</p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
                <button
                  onClick={() => setIsLoginView(false)}
                  className="text-primary font-semibold hover:underline transition-colors duration-300"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Register Form */}
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              !isLoginView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full invisible'
            }`}
          >
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-on-surface mb-2 text-center">Join KashMate</h2>
              <p className="text-on-surface-secondary text-center mb-8">Create your account to get started</p>
              
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="register-name">
                    Full Name
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                    placeholder="Enter your full name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="register-email">
                    Email
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                    placeholder="Enter your email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-on-surface-secondary mb-2 text-sm font-medium" htmlFor="register-password">
                    Password
                    <span className="ml-1 text-xs text-on-surface-secondary">
                      (min. 6 characters)
                    </span>
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-on-surface transition-all duration-300"
                    placeholder="Create a password (min. 6 characters)"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    minLength={6}
                    title="Password must be at least 6 characters long"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-background py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:scale-100"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <span className="text-on-surface-secondary">Already have an account? </span>
                <button
                  onClick={() => setIsLoginView(true)}
                  className="text-primary font-semibold hover:underline transition-colors duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
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

export default Auth; 