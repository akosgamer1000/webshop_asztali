/**
 * @file misch/Store.ts
 * @module UI/State
 * @description Redux Store Configuration
 * 
 * This file configures the Redux store for the application using Redux Toolkit.
 * It sets up the root reducer and exports typed versions of useDispatch and useSelector.
 * 
 * The store includes the following reducers:
 * - auth: Handles authentication state
 * - settings: Manages application settings
 * 
 * This configuration provides a central state management solution for the application,
 * with TypeScript typing support for better development experience.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import settingsReducer from "./store/settingsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

/**
 * Redux store instance configured with all application reducers
 * @constant {Object} store
 */
const store = configureStore({
    reducer:{
        auth: authReducer,        // Authentication state management
        settings: settingsReducer // Application settings management
    }
});

/**
 * Type for the entire Redux state tree
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type for the Redux dispatch function
 * @typedef {typeof store.dispatch} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Typed version of useDispatch hook
 * @function useAppDispatch
 * @returns {AppDispatch} Typed dispatch function
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(login({ token, userId }));
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed version of useSelector hook
 * @function useAppSelector
 * @template T - Return type of the selector function
 * @param {(state: RootState) => T} selector - Selector function
 * @returns {T} The selected state
 * @example
 * const isAuthenticated = useAppSelector(state => !!state.auth.token);
 */
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;