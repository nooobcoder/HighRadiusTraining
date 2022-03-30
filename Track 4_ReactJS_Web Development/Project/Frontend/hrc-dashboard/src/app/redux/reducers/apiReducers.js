// SAMPLE CODE FOR REDUCER
/* const initialState = {
  errorMessage: '',
  loading: false,
  users: [],
};

const UserReducer = (state = initialState, { payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, users: payload, loading: false };
    default:
      return state;
  }
};
*/

import {
  getBusinessRows as GetBusinessRows,
  getTableRows as GetTableRows,
  getCustomersRows as GetCustomersRows,
} from '../actions/actions';

const GetRowsReducer = {
  [GetTableRows.fulfilled]: (state, action) => {
    const obj = { ...state.table, rows: [{}], meta: {} };
    obj.rows = action.payload.slice(0, -3);
    obj.meta = action.payload.slice(-3);

    // eslint-disable-next-line no-param-reassign
    state.table = obj;
    // state.rows = action.payload;
  },
  [GetTableRows.rejected]: (state, action) => ({
    ...state,
    rows: [{}],
    error: { hasError: true, errorMessage: action.error.message },
  }),
  [GetBusinessRows.fulfilled]: (state, action) => {
    const obj = { ...state.table };
    obj.businesses = action.payload;

    // eslint-disable-next-line no-param-reassign
    state.table = obj;
    // state.rows = action.payload;
  },
  [GetBusinessRows.rejected]: (state) => ({
    ...state,
    businesses: [{}],
  }),
  [GetCustomersRows.fulfilled]: (state, action) => {
    const obj = { ...state.table };
    obj.customers = action.payload;

    // eslint-disable-next-line no-param-reassign
    state.table = obj;
    // state.rows = action.payload;
  },
  [GetCustomersRows.rejected]: (state) => ({
    ...state,
    customers: [{}],
  }),
};

const reducers = {
  // eslint-disable-next-line max-len
  setSelectedRows: (state, action) => ({
    ...state,
    table: { ...state.table, selectedIndices: action.payload },
  }),
  setError: (state, action) => ({
    ...state,
    error: {
      ...state.error,
      hasError: action.payload.hasError,
      errorMessage: action.payload.message,
    },
  }),
};

export { GetRowsReducer, reducers };
