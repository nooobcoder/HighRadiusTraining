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

// eslint-disable-next-line object-curly-newline
import {
  getBusinessRows as GetBusinessRows,
  getTableRows as GetTableRows,
  getCustomersRows as GetCustomersRows,
  // eslint-disable-next-line object-curly-newline
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
    error: { hasError: true, message: action.error.message },
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

// eslint-disable-next-line import/prefer-default-export
export { GetRowsReducer };
