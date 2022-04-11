import { get } from 'axios';

const doPost = async () => {
  const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_PORT, REACT_APP_API_CONTEXT } = process.env;

  try {
    const { status, data } = await get(
      `http://${REACT_APP_API_SERVER || '192.168.0.134'}:${REACT_APP_API_SERVER_PORT || '280'}${
        REACT_APP_API_CONTEXT || '/RESTDatabase_war_exploded'
      }/getbusinesses`,
    );
    if (status === 200) {
      console.log('[API /getBusinesses] Response: 200 ');
      // Return except the last three indices from the array
      return data.slice(0, -3);
    }
    console.log('[API /getBusinesses] Response: ', status);
    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export default doPost;
