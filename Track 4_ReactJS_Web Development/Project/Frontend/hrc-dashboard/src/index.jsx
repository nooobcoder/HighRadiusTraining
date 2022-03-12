import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/redux/store';
import './index.css';

// Using the new React 18 Root API (https://github.com/reactwg/react-18/discussions/5)

const container = document.getElementById('root');
createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
