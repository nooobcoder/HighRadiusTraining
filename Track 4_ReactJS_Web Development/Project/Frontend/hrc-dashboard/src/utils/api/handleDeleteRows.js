import axios from 'axios';
// This file is concerned with DELETE the deleteForm to the server.
const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_PORT, REACT_APP_API_CONTEXT } = process.env;

const doDelete = async (selectedIndices) => {
  const URL = `http://${REACT_APP_API_SERVER || '192.168.0.134'}:${
    REACT_APP_API_SERVER_PORT || '280'
  }${REACT_APP_API_CONTEXT || '/RESTDatabase_war_exploded'}/deleteRow`;

  // Loop through selectedIndices and append comma ',' to each index.
  const selectedIndicesString = selectedIndices.reduce((curr, next) => `${curr + next},`, '');

  try {
    const params = { sl_no: selectedIndicesString };
    // Pass urlParams to axios delete method.
    const { status, data } = await axios.delete(URL, { params });

    if (status === 200) {
      console.log('[API /deleteRow] Response: 200 ', data);
      return data;
    }

    console.log('[API /deleteRow] Response: ', status, data);
    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export default doDelete;
