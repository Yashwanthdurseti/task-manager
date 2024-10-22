import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import './App.css'; 

const App = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      setToken('');
      setUsername('');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <nav>
            <Link to="/">Home</Link>
            {token ? ( // Only show Tasks, welcome message and logout when logged in
              <>
                <Link to="/tasks">Tasks</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
          {token && (
            <div className="user-info">
              <span className="username">Welcome, {username}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>
        <Routes>
          <Route path="/" element={<h1>Welcome!</h1>} />
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
          {token ? (
            <Route path="/tasks" element={<TaskList token={token} />} />
          ) : (
            <Route path="/tasks" element={<h1>Please log in to view tasks.</h1>} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
