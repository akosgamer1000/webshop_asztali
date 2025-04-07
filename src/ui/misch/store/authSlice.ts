/**
 * Authentication Slice
 * 
 * Redux slice for managing authentication state in the application.
 * Handles user login, logout, and persistence of authentication data.
 * 
 * Features:
 * - Manage authentication token and user ID
 * - Persist authentication state in localStorage
 * - Handle login and logout actions
 * - Provide selectors for authentication state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing the authentication state
 * @interface AuthState
 * @property {string | null} token - JWT token for authentication
 * @property {string | null} userId - ID of the authenticated user
 */
interface AuthState {
  token: string | null;
  userId: string | null;
}

/**
 * Load authentication state from localStorage
 * 
 * This function retrieves the authentication state from localStorage
 * and returns it as an AuthState object. If no state exists in localStorage,
 * it returns null values for token and userId.
 * 
 * @returns {AuthState} The authentication state from localStorage
 */
function loadStateFromLocalStorage() : AuthState {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return {
    token: token ?? null,
    userId: userId ?? null,
  }
}

// Initialize state from localStorage or with null values
const initialState = loadStateFromLocalStorage();

/**
 * Authentication slice
 * 
 * Redux slice that manages authentication state and provides actions
 * for login and logout operations. The state is persisted in localStorage
 * and automatically loaded on application startup.
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
     * @param {AuthState} state - Current authentication state
     * @param {PayloadAction<{ token: string, userId: string }>} action - Login action with token and user ID
     */
    login(state, action: PayloadAction<{ token: string, userId: string }>) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },
    /**
     * Logout action
     * 
     * Clears the authentication state and removes the stored data
     * from localStorage.
     * 
     * @param {AuthState} state - Current authentication state
     */
    logout(state) {
      state.token = null;
      state.userId = null;
      
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

/**
 * Selector for getting the user ID from the authentication state
 * 
 * @param {Object} state - Redux state
 * @param {AuthState} state.auth - Authentication state
 * @returns {string | null} The user ID or null if not authenticated
 */
export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;