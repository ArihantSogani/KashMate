                    // // client/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Money Manager</h1>
//       <p>Welcome to your money manager app!</p>
//     </div>
//   );
// }

// export default App;


// client/src/App.js
import React from 'react';
import { Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-surface shadow-md">
        <div className="text-primary text-2xl font-bold tracking-tight">💸 Money Manager</div>
        <div>
          {token ? (
            <>
              <Link to="/dashboard" className="text-on-surface hover:text-primary font-semibold mr-4">Dashboard</Link>
              <button onClick={handleLogout} className="bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-on-surface hover:text-primary font-semibold mr-4">Login</Link>
              <Link to="/register" className="bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">Register</Link>
            </>
          )}
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto p-4">
          <Routes>
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="*" element={<div className="text-center text-on-surface-secondary mt-8">Page not found.</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

