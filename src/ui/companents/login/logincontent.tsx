/**
 * @file companents/login/logincontent.tsx
 * @module UI/Components/Login
 * @description Login Content Component
 * 
 * A form component that handles user authentication.
 * Features:
 * - Email and password input fields
 * - Form validation
 * - Error handling
 * - Loading states
 * - JWT token management
 * - Role-based access control
 * - Automatic redirection after login
 * 
 * This component provides the user authentication interface and handles the login
 * process, including token validation, role verification, and state management.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from '../../misch/Store';
import { login } from '../../misch/store/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../../misch/Axios';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../misch/Store';
import { jwtDecode } from 'jwt-decode';

/**
 * Interface for JWT token role information
 * @interface RolePayload
 * @property {string} role - User role extracted from JWT token
 */
interface RolePayload {
  role: string;
}

/**
 * Interface for JWT token ID information
 * @interface IdPayload
 * @property {number} id - User ID extracted from JWT token
 */
interface IdPayload {
  id: number;
}

/**
 * Login form component that handles user authentication
 * @component
 * @returns {JSX.Element} A login form with email and password fields
 * @example
 * <Route path="/login" element={<LoginContent />} />
 */
const LoginContent: React.FC = () => {
  /**
   * Form input references for email and password fields
   * @type {React.RefObject<HTMLInputElement>}
   */
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  /**
   * Component state for error messages and loading status
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  /**
   * Hooks for navigation and state management
   */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  /**
   * Redirect if already authenticated
   * Prevents accessing the login page when already logged in
   */
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User already authenticated, redirecting to home');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Ensure userId is properly stored in localStorage after authentication
   * This helps prevent issues with userId being missing on initial login
   */
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<IdPayload>(token);
          localStorage.setItem("userId", String(decodedToken.id));
          console.log('User ID stored in localStorage:', decodedToken.id);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    }
  }, [isAuthenticated]);

  /**
   * Handles form submission and authentication
   * @function handleSubmit
   * @param {React.FormEvent} e - Form submission event
   * @inner
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Get form values
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validate form inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { email, password: '******' });
      
      // Attempt to authenticate with the server
      const response = await axios.post('/auth/login', {
        email,
        password
      });
      
      console.log('Login API response:', response.data);
      
      // Validate response format
      if (!response.data.access_token) {
        throw new Error('Invalid response format: missing token');
      }

      // Check user role
      const role = jwtDecode<RolePayload>(response.data.access_token).role;
      if (role !== "admin") {
        throw new Error('Please log in with an admin user');
      }

      // Log full decoded token to see its structure
      const decodedToken = jwtDecode(response.data.access_token);
      console.log('Full decoded token payload:', decodedToken);

      // Extract user ID from token
      const userId = jwtDecode<IdPayload>(response.data.access_token).id;
      console.log('User ID:', userId);
      
      // Update Redux store with authentication state
      dispatch(login({
        token: response.data.access_token,
        userId: String(userId)  // Explicitly convert to string
      }));
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 100);
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different types of errors
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Login failed');
        console.log('Error response data:', err.response?.data);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container with responsive layout
    <div className="flex-1 overflow-x-auto mt-5 flex items-center justify-center">
      {/* Login form container */}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg m-4">
        {/* Form header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {/* Login form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Error message display */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          {/* Form input fields */}
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email input */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                ref={emailRef}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            
            {/* Password input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                ref={passwordRef}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContent;