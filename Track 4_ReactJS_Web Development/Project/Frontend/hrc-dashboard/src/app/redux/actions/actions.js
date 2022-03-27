// app/redux/actions/actions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import getRows from '../../../utils/api/getRows';
import getBusinesses from '../../../utils/api/getBusinesses';
import getCustomers from '../../../utils/api/getCustomers';

const getTableRows = createAsyncThunk('post/getRows', async (params) => getRows(params));
const getBusinessRows = createAsyncThunk('get/getBusinesses', async () => getBusinesses());
const getCustomersRows = createAsyncThunk('get/getCustomers', async () => getCustomers());
// SAMPLE CODE FOR non-async actions
/* export const GetUsers = (data) => (dispatch) => {
  dispatch({
    type: GET_USERS,
    payload: data,
  });
}; */

// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line object-curly-newline
export { getTableRows, getBusinessRows, getCustomersRows };
