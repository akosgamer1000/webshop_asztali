/**
 * Redux Store Configuration
 * 
 * This file configures the Redux store for the application using Redux Toolkit.
 * It sets up the root reducer and exports typed versions of useDispatch and useSelector.
 * 
 * The store includes the following reducers:
 * - auth: Handles authentication state
 * - settings: Manages application settings
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import settingsReducer from "./store/settingsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Configure the Redux store with combined reducers
const store = configureStore({
    reducer:{
        auth: authReducer,        // Authentication state management
        settings: settingsReducer // Application settings management
    }
});

// Type definitions for TypeScript support
export type RootState = ReturnType<typeof store.getState>  // Type for the entire Redux state
export type AppDispatch = typeof store.dispatch;          // Type for the dispatch function

// Typed versions of Redux hooks for better TypeScript support
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()    // Typed dispatch hook
export const useAppSelector = useSelector.withTypes<RootState>();     // Typed selector hook

export default store;