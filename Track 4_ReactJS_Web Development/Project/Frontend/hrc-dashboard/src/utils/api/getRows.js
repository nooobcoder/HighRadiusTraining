import { post } from 'axios';

const doPost = async ({ start = 0, limit = 10 }) => {
  const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_PORT } = process.env;

  try {
    const { status, data } = await post(
      `http://${REACT_APP_API_SERVER || '192.168.0.134'}:${
        REACT_APP_API_SERVER_PORT || '280'
      }/RESTDatabase_war_exploded/getrows?start=${start}&limit=${limit}`,
    );
    if (status === 200) {
      data[data.length - 3] = { ...data[data.length - 3], start, limit };
      console.log('[API /getRows] Response: 200 ');
      return data;
    }
    console.log('[API /addRow] Response: ', status);
    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export default doPost;
