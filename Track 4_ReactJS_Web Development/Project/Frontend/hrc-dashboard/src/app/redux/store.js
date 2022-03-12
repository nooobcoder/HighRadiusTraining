// SAMPLE CODE FOR STORE
/* import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
export default configureStore({
  reducer: {
    user: userSlice,
  },
});
 */

import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './slices/apiSlice';

export default configureStore({ reducer: { api: apiSlice }, devTools: true });
