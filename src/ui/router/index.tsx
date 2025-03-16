import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '../pages/Product';
import Settings from '../pages/Settings';
import Order from '../pages/Orders';
import Users from '../pages/User';
import Login from '../pages/Login';
import { RootState, useAppDispatch } from '../misch/Store';
import { login } from '../misch/store/authSlice';

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
    
    console.log('Checking localStorage auth data:', { token });
    
    if (token) {
    
      dispatch(login({ token }));
      console.log('Restored auth state from localStorage');
    }
  }, [dispatch]);
  
  
  console.log('Current auth status:', { isAuthenticated });
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      <Route
        path="/products"
        element={<PrivateRoute element={<Product />} />}
      />
      <Route
        path="/setting"
        element={<PrivateRoute element={<Settings />} />}
      />
      <Route
        path="/orders"
        element={<PrivateRoute element={<Order />} />}
      />
      <Route
        path="/users"
        element={<PrivateRoute element={<Users />} />}
      />
      <Route
        path="/"
        element={<PrivateRoute element={<Product />} />}
      />
    </Routes>
  );
};

export default Router;