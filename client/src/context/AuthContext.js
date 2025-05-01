import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set axios default header with token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  // Check if user is logged in
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Get current user info if token exists
          const userInfo = JSON.parse(localStorage.getItem('user'));
          if (userInfo) {
            setCurrentUser(userInfo);
          }
        } catch (err) {
          console.error('Error loading user:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setCurrentUser(null);
          setError('Session expired. Please login again.');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      
      return res.data.user;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Error logging in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register student
  const registerStudent = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Registering student with data:', formData);
      
      // Make sure axios is correctly configured
      axios.defaults.baseURL = axios.defaults.baseURL || window.location.origin;
      
      const res = await axios.post('/api/auth/register/student', formData);
      console.log('Registration successful, response:', res.data);
      return res.data;
    } catch (err) {
      console.error('Register student error:', err);
      if (err.response) {
        console.error('Server response:', err.response.data);
        setError(err.response.data?.message || 'Error registering student');
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from server. Please check your connection.');
      } else {
        console.error('Error setting up request:', err.message);
        setError('Error setting up request: ' + err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register teacher
  const registerTeacher = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/auth/register/teacher', formData);
      return res.data;
    } catch (err) {
      console.error('Register teacher error:', err);
      setError(err.response?.data?.message || 'Error registering teacher');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    login,
    registerStudent,
    registerTeacher,
    logout,
    isAuthenticated: !!token,
    isAdmin: currentUser?.role === 'admin',
    isTeacher: currentUser?.role === 'teacher',
    isStudent: currentUser?.role === 'student',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 