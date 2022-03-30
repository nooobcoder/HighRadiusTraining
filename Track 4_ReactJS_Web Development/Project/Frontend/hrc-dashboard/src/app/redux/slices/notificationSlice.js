// Create slice for notification
// Language: javascript

import { createSlice } from '@reduxjs/toolkit';
import reducers from '../reducers/notificationReducers';

const initialState = {
  hasError: false,
  message: 'Hi!',
  title: 'This is a test success message!',
  visible: true,
};

const slice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers,
  extraReducers: null, // Async actions here
});

export const { setNotification, clearNotification } = slice.actions;
export default slice.reducer;
