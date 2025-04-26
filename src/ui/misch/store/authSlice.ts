/**
 * @file misch/store/authSlice.ts
 * @module UI/State/Auth
 * @description Authentication Slice
 * 
 * Redux slice for managing authentication state in the application.
 * Handles user login, logout, and persistence of authentication data.
 * 
 * Features:
 * - Manage authentication token and user ID
 * - Persist authentication state in localStorage
 * - Handle login and logout actions
 * - Provide selectors for authentication state
 * 
 * This slice centralizes all authentication-related state management,
 * ensuring consistent handling of user sessions across the application.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { jwtDecode } from 'jwt-decode';

/**
 * Interface for JWT token ID information
 * @interface IdPayload
 * @property {number} id - User ID extracted from JWT token
 */
interface IdPayload {
  id: number;
}

/**
 * Interface representing the authentication state
 * @interface AuthState
 * @property {string | null} token - JWT token for authentication
 * @property {string | null} userId - ID of the authenticated user
 * @property {boolean} isInitialized - Whether the auth state has been initialized
 */
interface AuthState {
  token: string | null;
  userId: string | null;
  isInitialized: boolean;
}

/**
 * Extract user ID from JWT token
 * 
 * This utility function attempts to extract the user ID from a JWT token.
 * If extraction fails, it returns null.
 * 
 * @function getUserIdFromToken
 * @param {string} token - JWT token
 * @returns {string | null} User ID extracted from token or null if extraction fails
 */
export function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  
  try {
    const decodedToken = jwtDecode<IdPayload>(token);
    return String(decodedToken.id);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

/**
 * Load authentication state from localStorage
 * 
 * This function retrieves the authentication state from localStorage
 * and returns it as an AuthState object. If no state exists in localStorage,
 * it returns null values for token and userId.
 * 
 * @function loadStateFromLocalStorage
 * @returns {AuthState} The authentication state from localStorage
 * @private
 */
function loadStateFromLocalStorage() : AuthState {
  const token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  
  // If token exists but userId doesn't, try to extract it from the token
  if (token && !userId) {
    userId = getUserIdFromToken(token);
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }
  
  return {
    token: token ?? null,
    userId: userId ?? null,
    isInitialized: false // Start as not initialized
  }
}

/**
 * Initial authentication state loaded from localStorage or with null values
 * @type {AuthState}
 */
const initialState = loadStateFromLocalStorage();

/**
 * Authentication slice
 * 
 * Redux slice that manages authentication state and provides actions
 * for login and logout operations. The state is persisted in localStorage
 * and automatically loaded on application startup.
 * 
 * @constant {Slice<AuthState>}
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Login action
     * 
     * Updates the authentication state with the provided token and user ID,
     * and persists them in localStorage.
     * 
     * @function login
     * @param {AuthState} state - Current authentication state
     * @param {PayloadAction<{ token: string, userId: string }>} action - Login action with token and user ID
     * @example
     * dispatch(login({ token: 'jwt-token', userId: '123' }));
     */
    login(state, action: PayloadAction<{ token: string, userId: string }>) {
      // Ensure userId is always a string
      const userId = action.payload.userId || getUserIdFromToken(action.payload.token) || '';
      
      state.userId = userId;
      state.token = action.payload.token;
      state.isInitialized = true; // Mark as initialized after login
      
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", userId);
      
      // Additional logging for debugging
      console.log('Login action called with userId:', userId);
    },
    
    /**
     * Mark authentication as initialized
     * 
     * @function initializeComplete
     * @param {AuthState} state - Current authentication state
     * @example
     * dispatch(initializeComplete());
     */
    initializeComplete(state) {
      state.isInitialized = true;
    },
    
    /**
     * Logout action
     * 
     * Clears the authentication state and removes the stored data
     * from localStorage.
     * 
     * @function logout
     * @param {AuthState} state - Current authentication state
     * @example
     * dispatch(logout());
     */
    logout(state) {
      state.token = null;
      state.userId = null;
      // Keep isInitialized as true after logout
      
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

// Export actions and reducer
export const { login, logout, initializeComplete } = authSlice.actions;
export default authSlice.reducer;

/**
 * Selector for getting the user ID from the authentication state
 * 
 * @function selectUserId
 * @param {RootState} state - Redux state
 * @returns {string | null} The user ID or null if not authenticated
 * @example
 * const userId = useAppSelector(selectUserId);
 */
export const selectUserId = (state: RootState) => state.auth.userId;

/**
 * Selector for getting the authentication token from the authentication state
 * 
 * @function selectAuthToken
 * @param {RootState} state - Redux state
 * @returns {string | null} The authentication token or null if not authenticated
 * @example
 * const token = useAppSelector(selectAuthToken);
 */
export const selectAuthToken = (state: RootState) => state.auth.token;

/**
 * Selector for checking if the user is authenticated
 * 
 * @function selectIsAuthenticated
 * @param {RootState} state - Redux state
 * @returns {boolean} True if authenticated, false otherwise
 * @example
 * const isAuthenticated = useAppSelector(selectIsAuthenticated);
 */
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;

/**
 * Selector for checking if auth is initialized
 * 
 * @function selectIsInitialized
 * @param {RootState} state - Redux state
 * @returns {boolean} True if auth state is initialized, false otherwise
 * @example
 * const isInitialized = useAppSelector(selectIsInitialized);
 */
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;
