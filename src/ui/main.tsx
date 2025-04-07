/**
 * Application Entry Point
 * 
 * This file serves as the main entry point for the React application.
 * It:
 * - Creates the root React element
 * - Renders the App component inside React's StrictMode
 * - Mounts the application to the DOM element with id 'root'
 * 
 * StrictMode is enabled to help identify potential problems in the application
 * during development.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
