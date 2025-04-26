/**
 * @file router/index.tsx
 * @module UI/Router
 * @description Application Router Configuration
 * 
 * This file defines the routing structure of the application using React Router.
 * It includes:
 * - Protected route wrapper for authenticated routes
 * - Authentication state management
 * - Nested routes for product creation
 * - Route definitions for all major application features
 * 
 * The router uses a combination of public and protected routes to manage
 * access control based on user authentication state.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../misch/Store';
import { login, getUserIdFromToken } from '../misch/store/authSlice';
import MainLayout from '../companents/layout/MainLayout';
import LoginContent from '../companents/login/logincontent';

// Lazy load all protected components to prevent them from loading until authentication
const ProductContent = lazy(() => import('../companents/product/productcontent'));
const SettingsContent = lazy(() => import('../companents/setting/setting'));
const OrderContent = lazy(() => import('../companents/order/Ordercontent'));
const UserContent = lazy(() => import('../companents/user/usercontent'));
const ProductDetailsContent = lazy(() => import('../companents/product/productdetailscontent'));
const ProfileContent = lazy(() => import('../companents/profile/profile'));
const UserView = lazy(() => import('../companents/user/userwiew'));
const AddUserContent = lazy(() => import('../companents/user/adduser'));
const Frame = lazy(() => import('../pages/product/ProductCreatio'));
const ProductChoice = lazy(() => import('../companents/product/productChoice'));
const AddProcessor = lazy(() => import('../companents/product/adds/processor'));
const Addcpucoller = lazy(() => import('../companents/product/adds/cpuColler'));
const AddMemory = lazy(() => import('../companents/product/adds/memory'));
const AddHardDrive = lazy(() => import('../companents/product/adds/harddrive'));
const AddVideoCard = lazy(() => import('../companents/product/adds/videocard'));
const AddMotherboard = lazy(() => import('../companents/product/adds/motherboard'));
const AddPowerSupply = lazy(() => import('../companents/product/adds/powersupply'));
const AddPowerhouse = lazy(() => import('../companents/product/adds/powerhouse'));
const OrderView = lazy(() => import('../companents/order/OrderView'));

/**
 * Loading component to show while lazy-loaded components are being loaded
 */
const LoadingFallback = () => <div>Loading...</div>;

/**
 * Protected Route Component
 * @interface PrivateRouteProps
 * @property {React.ReactElement} element - The component to render if authenticated
 */
interface PrivateRouteProps {
  element: React.ReactElement;
}

/**
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Wraps in Suspense to handle lazy loading
 * 
 * @component
 * @param {PrivateRouteProps} props - Component properties
 * @param {React.ReactElement} props.element - The component to render if authenticated
 * @returns {React.ReactElement} Either the protected component or a redirect to login
 * @example
 * <PrivateRoute element={<Dashboard />} />
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  return isAuthenticated ? (
    <Suspense fallback={<LoadingFallback />}>
      {element}
    </Suspense>
  ) : <Navigate to="/login" />;
};

/**
 * Component to wrap nested routes with Suspense
 * @interface NestedRouteProps
 * @property {React.ReactElement} element - The component to render
 */
interface NestedRouteProps {
  element: React.ReactElement;
}

/**
 * Wraps nested routes with Suspense
 * Used for lazy loading child routes
 * 
 * @component
 * @param {NestedRouteProps} props - Component properties
 * @param {React.ReactElement} props.element - The component to render
 * @returns {React.ReactElement} The component wrapped in Suspense
 */
const NestedSuspenseRoute: React.FC<NestedRouteProps> = ({ element }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {element}
    </Suspense>
  );
};

/**
 * Main Router Component
 * 
 * @component
 * @description Configures all application routes and handles authentication state.
 * Includes automatic login from localStorage on initial load.
 * @returns {JSX.Element} The complete routing configuration for the application
 * @example
 * <Provider store={store}>
 *   <HashRouter>
 *     <Router />
 *   </HashRouter>
 * </Provider>
 */
const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  /**
   * Check for stored credentials on initial load
   * Automatically logs in the user if valid credentials exist in localStorage
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    
    if (token) {
      // If token exists but userId is missing, extract it from the token
      if (!userId) {
        userId = getUserIdFromToken(token);
        if (userId) {
          localStorage.setItem("userId", userId);
          console.log('User ID extracted from token and stored in localStorage:', userId);
        }
      }
      
      dispatch(login({ token, userId: userId ?? '' }));
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Main layout wrapper for all routes */}
      <Route element={<MainLayout />}>
        {/* Public route - redirects to home if already authenticated */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <LoginContent />} 
        />
        
        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute element={<ProductContent />} />} />
        <Route path="/products" element={<PrivateRoute element={<ProductContent />} />} />
        <Route path="/setting" element={<PrivateRoute element={<SettingsContent />} />} />
        <Route path="/orders" element={<PrivateRoute element={<OrderContent />} />} />
        <Route path="/users" element={<PrivateRoute element={<UserContent />} />} />
        <Route path="/user/:id" element={<PrivateRoute element={<UserView />} />} />
        <Route path="/profile/:id" element={<PrivateRoute element={<ProfileContent />} />} />
        <Route path="/orderdetails/:id" element={<PrivateRoute element={<OrderView />} />} />
        <Route path="/adduser" element={<PrivateRoute element={<AddUserContent />} />} />
        <Route path="/products/:id" element={<PrivateRoute element={<ProductDetailsContent />} />} />
        
        {/* Nested routes for product creation workflow */}
        <Route path="/addProduct" element={<PrivateRoute element={<Frame />} />}>
          <Route path="select" element={<NestedSuspenseRoute element={<ProductChoice />} />} />
          <Route path="processor" element={<NestedSuspenseRoute element={<AddProcessor />} />} />
          <Route path="cpucooler" element={<NestedSuspenseRoute element={<Addcpucoller />} />} />
          <Route path="memory" element={<NestedSuspenseRoute element={<AddMemory />} />} />
          <Route path="harddrive" element={<NestedSuspenseRoute element={<AddHardDrive />} />} />
          <Route path="videocard" element={<NestedSuspenseRoute element={<AddVideoCard />} />} />
          <Route path="motherboard" element={<NestedSuspenseRoute element={<AddMotherboard />} />} />
          <Route path="powersupply" element={<NestedSuspenseRoute element={<AddPowerSupply />} />} />
          <Route path="powerhouse" element={<NestedSuspenseRoute element={<AddPowerhouse />} />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
