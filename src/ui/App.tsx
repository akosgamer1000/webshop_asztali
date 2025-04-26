/**
 * @file App.tsx
 * @module UI/Core
 * @description Main App Component
 * 
 * This is the root component of the application that sets up the core providers:
 * - Redux store for state management
 * - HashRouter for client-side routing
 * 
 * The component serves as the entry point for the React application and wraps
 * all other components with necessary providers.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './misch/Store';
import Router from './router';
import AuthInitializer from './companents/auth/AuthInitializer';

/**
 * Root component that sets up the application's core infrastructure
 * @component
 * @returns {JSX.Element} The configured application with all providers
 * @example
 * // In main.tsx
 * import App from './App';
 * 
 * ReactDOM.createRoot(document.getElementById('root')!).render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>
 * );
 */
const App: React.FC = () => {
  return (
    // Redux Provider - Makes the store available to all child components
    <Provider store={store}>
      {/* HashRouter - Provides client-side routing using URL hash */}
      <HashRouter>
        {/* AuthInitializer - Ensures auth state is initialized before rendering */}
        <AuthInitializer>
          {/* Router component - Defines the application's routing structure */}
          <Router />
        </AuthInitializer>
      </HashRouter>
    </Provider>
  );
};

export default App;
