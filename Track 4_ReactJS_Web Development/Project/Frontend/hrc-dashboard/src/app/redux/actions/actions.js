// app/redux/actions/actions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import getRows from '../../../utils/api/getRows';

const getTableRows = createAsyncThunk('post/getRows', async () => getRows());

// SAMPLE CODE FOR non-async actions
/* export const GetUsers = (data) => (dispatch) => {
  dispatch({
    type: GET_USERS,
    payload: data,
  });
}; */

// eslint-disable-next-line import/prefer-default-export
export { getTableRows };
