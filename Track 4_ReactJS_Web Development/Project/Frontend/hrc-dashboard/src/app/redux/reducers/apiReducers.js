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
  getCustomersRows as GetCustomersRows,
  getTableRows as GetTableRows,
} from '../actions/actions';

const GetRowsReducer = {
  [GetTableRows.fulfilled]: (state, action) => {
    const obj = { ...state.table, rows: [{}], meta: {} };
    obj.rows = action.payload.slice(0, -3);
    obj.meta = action.payload.slice(-3);
    obj.filteredRows = [];
    return { ...state, table: obj };
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
  setSelectedRows: (state, action) => ({
    ...state,
    table: { ...state.table, selectedIndices: action.payload },
  }),
  setTableRows: (state, action) => ({
    ...state,
    table: { ...state.table, rows: action.payload },
  }),
  setError: (state, action) => ({
    ...state,
    error: {
      ...state.error,
      hasError: action.payload.hasError,
      errorMessage: action.payload.message,
    },
  }),
  setFilteredRows: (state, { payload }) => {
    // action has a cust_number payload.
    // Filter state.table.rows by cust_number
    const filteredRows = state.table.rows.filter((row) =>
      row.cust_number.toString().includes(payload),
    );
    return { ...state, table: { ...state.table, filteredRows } };
  },
  setPredictions: (state, { payload }) => {
    // Payload Format
    /*
      [
        {
            "aging_bucket": "0-15",
            "doc_id": "1930659387"
        },
      ]
    */
    // Merge payload into state.table.rows if payload.doc_id match
    const rows = state.table.rows.map((row) => {
      const match = payload.find((p) => p.doc_id === row.doc_id);
      if (match) {
        return { ...row, ...match };
      }
      return row;
    });
    return { ...state, table: { ...state.table, rows } };
  },
};

export { GetRowsReducer, reducers };
