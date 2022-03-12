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
    // console.log(action.payload);
    // eslint-disable-next-line no-param-reassign
    state.rows = action.payload;
  },
  [GetTableRows.rejected]: (state) => {
    // eslint-disable-next-line no-param-reassign
    state.api.rows = [{}];
  },
};

// eslint-disable-next-line import/prefer-default-export
export { GetRowsReducer };
