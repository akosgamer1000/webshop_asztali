/**
 * Product Creation Frame Component
 * 
 * A layout component that serves as a container for the product creation workflow.
 * It uses React Router's Outlet component to render nested routes for different
 * steps of the product creation process.
 */

import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Frame component that renders nested routes for product creation
 * @returns {JSX.Element} A container that renders the current step of product creation
 */
const Frame: React.FC = () => {
  return <Outlet />;
};

export default Frame;