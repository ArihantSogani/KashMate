import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
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
      const response = await axios.post('/api/auth/register', { name, email, password });

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
    <div className="h-full flex justify-center items-center p-4">
      <div className="bg-surface rounded-lg shadow-md p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-on-surface mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-on-surface-secondary mb-1 text-sm" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-background border border-surface focus:border-primary focus:outline-none text-on-surface text-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-on-surface-secondary mb-1 text-sm" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 rounded-lg bg-background border border-surface focus:border-primary focus:outline-none text-on-surface text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-on-surface-secondary mb-1 text-sm" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 rounded-lg bg-background border border-surface focus:border-primary focus:outline-none text-on-surface text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-background py-2 rounded-lg font-semibold mt-2 hover:opacity-90 transition disabled:opacity-60 text-sm"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {error && <p className="text-expense text-center mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
