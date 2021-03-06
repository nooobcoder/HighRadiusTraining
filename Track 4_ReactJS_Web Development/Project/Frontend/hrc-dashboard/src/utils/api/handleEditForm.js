import { post } from 'axios';
// This file is concerned with posting the editform to the server.
const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_PORT, REACT_APP_API_CONTEXT } = process.env;

const doSubmit = async (params, body) => {
  const URL = `http://${REACT_APP_API_SERVER || '192.168.0.134'}:${
    REACT_APP_API_SERVER_PORT || '280'
  }${REACT_APP_API_CONTEXT || '/RESTDatabase_war_exploded'}/editRow`;
  console.log(JSON.stringify(body));
  try {
    // Post data to the server with params
    // Set Cors to *
    const { status, data } = await post(URL, JSON.stringify(body), { params });

    if (status === 200) {
      console.log('[API /editRow] Response: 200 ', data);
      return data;
    }

    console.log('[API /editRow] Response: ', status);
    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export default doSubmit;
