import { Link, useNavigate } from 'react-router-dom'; // Correction ici
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate(); // Initialisation de navigate
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username / Email is required!';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required!';
    } else if (formData.password.length <= 8) {
      newErrors.password = 'Password must be more than 8 characters!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/auth/login',
          {
            username: formData.username,
            password: formData.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Login response:', response);
        if (response.data) {
          setSubmitted(true);
          console.log(response.data.response);
          localStorage.setItem('user', JSON.stringify(response.data));
          // Navigation basée sur le rôle
          navigate(
            response.data.role === 'admin'
              ? '/admin'
              : response.data.role === 'hr'
              ? '/hr'
              : '/employee'
          );
        }
      } catch (error) {
        setErrors({ ...errors, submit: 'Invalid credentials or server error' });
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="flex w-full max-w-4xl items-center justify-between gap-8">
        <div className="hidden md:block md:w-1/3">
          <img
            src="src/assets/bg_pic.png"
            alt="Login illustration"
            className="w-full"
          />
        </div>

        <div className="w-full md:w-1/2 max-w-md">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-semibold text-gray-900">Log In</h1>
            <p className="text-gray-600">Welcome Back.</p>
            <p className="text-gray-600">Please Enter Your Details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600">
                Email or Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Exemple@Exemple.com / usrname"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="mt-1 text-right">
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  I forgot my password
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
