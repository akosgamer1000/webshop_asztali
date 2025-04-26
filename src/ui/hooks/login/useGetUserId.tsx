/**
 * @file hooks/login/useGetUserId.tsx
 * @module UI/Hooks/Login
 * @description User ID Retrieval Hook
 * 
 * A custom hook that consistently provides the current user's ID,
 * retrieving it from either the Redux store or decoding it from the JWT token.
 * This ensures that the user ID is always available, even if there are timing issues
 * with localStorage or the Redux store.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../misch/Store';
import { getUserIdFromToken } from '../../misch/store/authSlice';

/**
 * Custom hook to reliably get the current user's ID
 * 
 * @function useGetUserId
 * @returns {string | null} The current user's ID or null if not authenticated
 * @example
 * const userId = useGetUserId();
 * 
 * if (userId) {
 *   // User is authenticated, proceed with ID-dependent operations
 * } else {
 *   // User is not authenticated, handle accordingly
 * }
 */
const useGetUserId = (): string | null => {
  // Get user ID from Redux state
  const reduxUserId = useSelector((state: RootState) => state.auth.userId);
  const token = useSelector((state: RootState) => state.auth.token);
  
  // State to store the resolved user ID
  const [userId, setUserId] = useState<string | null>(reduxUserId);

  useEffect(() => {
    // If Redux already has the user ID, use it
    if (reduxUserId) {
      setUserId(reduxUserId);
      return;
    }
    
    // If Redux doesn't have the user ID but has the token, try to extract it
    if (token && !reduxUserId) {
      const extractedId = getUserIdFromToken(token);
      if (extractedId) {
        setUserId(extractedId);
        
        // Update localStorage for consistency
        localStorage.setItem("userId", extractedId);
        console.log('User ID extracted from token in hook:', extractedId);
      }
    }
  }, [reduxUserId, token]);

  return userId;
};

export default useGetUserId; 