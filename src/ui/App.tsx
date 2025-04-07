/**
 * Main App Component
 * 
 * This is the root component of the application that sets up the core providers:
 * - Redux store for state management
 * - HashRouter for client-side routing
 * 
 * The component serves as the entry point for the React application and wraps
 * all other components with necessary providers.
 */

import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './misch/Store';
import Router from './router';

// Root component that sets up the application's core infrastructure
const App: React.FC = () => {
  return (
    // Redux Provider - Makes the store available to all child components
    <Provider store={store}>
      {/* HashRouter - Provides client-side routing using URL hash */}
      <HashRouter>
        {/* Router component - Defines the application's routing structure */}
        <Router />
      </HashRouter>
    </Provider>
  );
};

export default App;
