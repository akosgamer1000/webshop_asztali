import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '../pages/product/Product';
import Settings from '../pages/Settings';
import Order from '../pages/order/Orders';
import Users from '../pages/user/User';
import Login from '../pages/login/Login';
import { RootState, useAppDispatch } from '../misch/Store';
import { login } from '../misch/store/authSlice';
import Ordertetails from '../pages/order/Orderdetails';
import Productdetails from '../pages/product/Productdetails';
import Profile from '../pages/Profile';
import Userwiew from '../pages/user/userprof';
import AddUser from '../pages/user/Adduserpage';
import Frame from '../pages/product/ProductCreatio';
import ProductChoice from '../companents/product/productChoice';
import Addcpucoller from '../companents/product/adds/cpuColler'
import MainLayout from '../companents/layout/MainLayout';

import AddProcessor from '../companents/product/adds/processor';
import AddMemory from '../companents/product/adds/memory';
import AddHardDrive from '../companents/product/adds/harddrive';
import AddVideoCard from '../companents/product/adds/videocard';
import AddMotherboard from '../companents/product/adds/motherboard';
import AddPowerSupply from '../companents/product/adds/powersupply';
import AddPowerhouse from '../companents/product/adds/powerhouse';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  
  console.log('Auth state in PrivateRoute:', { 
    isAuthenticated, 
    token: useSelector((state: RootState) => state.auth.token)
  });
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log('Checking localStorage auth data:', { token });
    
    if (token) {
      dispatch(login({ token, userId: userId ?? '' }));
      console.log('Restored auth state from localStorage');
    }
  }, [dispatch]);
  
  console.log('Current auth status:', { isAuthenticated });
  
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        
        
        <Route element={<PrivateRoute element={<React.Fragment />} />}>
          <Route path="/" element={<Product />} />
          <Route path="/products" element={<Product />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<Userwiew />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/orderdetails/:id" element={<Ordertetails />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/products/:id" element={<Productdetails />} />
          
          <Route path="/addProduct" element={<Frame />}>
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
      </Route>
    </Routes>
  );
};

export default Router;
