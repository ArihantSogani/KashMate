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
      // const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/login');
    } catch (err) {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-surface rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-on-surface mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-on-surface-secondary mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-surface focus:border-primary focus:outline-none text-on-surface"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-on-surface-secondary mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-background border border-surface focus:border-primary focus:outline-none text-on-surface"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-on-surface-secondary mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-background border border-surface focus:border-primary focus:outline-none text-on-surface"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-background py-2 rounded-lg font-semibold mt-2 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {error && <p className="text-expense text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
