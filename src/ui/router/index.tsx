/**
 * Application Router Configuration
 * 
 * This file defines the routing structure of the application using React Router.
 * It includes:
 * - Protected route wrapper for authenticated routes
 * - Authentication state management
 * - Nested routes for product creation
 * - Route definitions for all major application features
 */

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../misch/Store';
import { login } from '../misch/store/authSlice';
import MainLayout from '../companents/layout/MainLayout';
import ProductContent from '../companents/product/productcontent';
import SettingsContent from '../companents/setting/setting';
import OrderContent from '../companents/order/Ordercontent';
import UserContent from '../companents/user/usercontent';
import LoginContent from '../companents/login/logincontent';
import ProductDetailsContent from '../companents/product/productdetailscontent';
import ProfileContent from '../companents/profile/profile';
import UserView from '../companents/user/userwiew';
import AddUserContent from '../companents/user/adduser';
import Frame from '../pages/product/ProductCreatio';
import ProductChoice from '../companents/product/productChoice';
import AddProcessor from '../companents/product/adds/processor';
import Addcpucoller from '../companents/product/adds/cpuColler';
import AddMemory from '../companents/product/adds/memory';
import AddHardDrive from '../companents/product/adds/harddrive';
import AddVideoCard from '../companents/product/adds/videocard';
import AddMotherboard from '../companents/product/adds/motherboard';
import AddPowerSupply from '../companents/product/adds/powersupply';
import AddPowerhouse from '../companents/product/adds/powerhouse';
import OrderView from '../companents/order/OrderView';

/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication.
 * Redirects to login if user is not authenticated.
 * 
 * @param {React.ReactElement} element - The component to render if authenticated
 * @returns {React.ReactElement} Either the protected component or a redirect to login
 */
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

/**
 * Main Router Component
 * 
 * Configures all application routes and handles authentication state.
 * Includes automatic login from localStorage on initial load.
 */
const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  // Check for stored credentials on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
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
          <Route path="select" element={<ProductChoice />} />
          <Route path="processor" element={<AddProcessor />} />
          <Route path="cpucooler" element={<Addcpucoller />} />
          <Route path="memory" element={<AddMemory />} />
          <Route path="harddrive" element={<AddHardDrive />} />
          <Route path="videocard" element={<AddVideoCard />} />
          <Route path="motherboard" element={<AddMotherboard />} />
          <Route path="powersupply" element={<AddPowerSupply />} />
          <Route path="powerhouse" element={<AddPowerhouse />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
