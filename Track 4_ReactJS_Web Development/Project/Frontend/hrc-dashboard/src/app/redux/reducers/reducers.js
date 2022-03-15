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

import { getTableRows as GetTableRows } from '../actions/actions';

const GetRowsReducer = {
  [GetTableRows.fulfilled]: (state, action) => {
    const obj = { rows: [{}], meta: {} };
    obj.rows = action.payload.slice(0, -1);
    obj.meta = action.payload.slice(-1);

    // eslint-disable-next-line no-param-reassign
    state.table = obj;
    // state.rows = action.payload;
  },
  [GetTableRows.rejected]: (state) => {
    // eslint-disable-next-line no-param-reassign
    state.api.rows = [{}];
  },
};

// eslint-disable-next-line import/prefer-default-export
export { GetRowsReducer };