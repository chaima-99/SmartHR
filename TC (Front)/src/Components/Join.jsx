import React, { useState } from 'react';
import './login.css';

const Join = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
        <div className="illustration">
          {/* Add an SVG or image for the person illustration */}
        </div>
      </div>
      <div className="login-right">
        <h1>Log In</h1>
        <p>Welcome back. Please Enter Your Details.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="youremail@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="form-footer">
            <a href="#" className="forgot-password">
              I forgot my password
            </a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
