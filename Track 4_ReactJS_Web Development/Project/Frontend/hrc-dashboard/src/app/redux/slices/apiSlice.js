// SAMPLE CODE FOR SLICE
/* export const initialState = {
  users: [],
  loading: false,
  error: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = false;
    },
    createUser: (state, action) => {
      state.users.unshift(action.payload);
      state.loading = false;
    },
    deleteUser: (state, action) => {
      state.users.filter((user) => user.id !== action.payload.id);
      state.loading = false;
    },
  },
});
export const { createUser, deleteUser, getUser } = userSlice.actions;
export default userSlice.reducer;
*/

import { createSlice } from '@reduxjs/toolkit';
import { GetRowsReducer } from '../reducers/reducers';

const initialState = {
  table: {
    rows: [{}],
    meta: [{}],
    selectedIndices: [],
  },
  loading: false,
};

const apiSlice = createSlice({
  name: 'getRows',
  initialState,
  // Add non-async reducers here
  reducers: {
    // eslint-disable-next-line max-len
    setSelectedRows: (state, action) => ({ ...state, table: { ...state.table, selectedIndices: action.payload } }),
  },
  // Add async reducers here
  extraReducers: GetRowsReducer,
});

export const { setSelectedRows } = apiSlice.actions;
export default apiSlice.reducer;
