import { post } from 'axios';
// This file is concerned with posting the addform to the server.
const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_PORT } = process.env;

const doSubmit = async (body) => {
  const URL = `http://${REACT_APP_API_SERVER || '192.168.0.134'}:${
    REACT_APP_API_SERVER_PORT || '280'
  }/RESTDatabase_war_exploded/addRow`;

  try {
    // Pass json body to axios post method.
    const { status, data } = await post(URL, JSON.stringify(body));
    if (status === 200) {
      console.log('[API /addRow] Response: 200 ', data);
      return data;
    }

    console.log('[API /addRow] Response: ', status);
    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export default doSubmit;
