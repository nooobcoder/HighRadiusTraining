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
import { GetRowsReducer, reducers } from '../reducers/apiReducers';

const initialState = {
  table: {
    rows: [{}],
    filteredRows: [],
    businesses: [{}],
    customers: [{}],
    meta: [{}],
    selectedIndices: [],
  },
  loading: false,
  error: {
    hasError: false,
    errorMessage: '',
  },
};

const apiSlice = createSlice({
  name: 'getRows',
  initialState,
  // Add non-async reducers here
  reducers,
  // Add async reducers here
  extraReducers: GetRowsReducer,
});

export const { setSelectedRows, setError, setFilteredRows, setTableRows, getTableRows } = apiSlice.actions;
export default apiSlice.reducer;
