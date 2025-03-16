import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './misch/Store';
import Router from './router';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Router />
      </HashRouter>
    </Provider>
  );
};

export default App;
