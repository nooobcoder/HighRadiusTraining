import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/redux/store';
import './index.css';

// Disabling all console.* in production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}

// Using the new React 18 Root API (https://github.com/reactwg/react-18/discussions/5)
const container = document.getElementById('root');
createRoot(container).render(
  <Provider store={store}>
    <NotificationsProvider autoClose={4000} position="top-left">
      <App />
    </NotificationsProvider>
  </Provider>,
);
