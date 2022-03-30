// SAMPLE CODE FOR STORE
/* import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
export default configureStore({
  reducer: {
    user: userSlice,
  },
});
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import notificationReducer from './slices/notificationSlice';

// Combine apiReducer and notificationReducer
const combinedReducer = combineReducers({ api: apiReducer, notification: notificationReducer });

export default configureStore({
  reducer: combinedReducer,
  devTools: true,
});
