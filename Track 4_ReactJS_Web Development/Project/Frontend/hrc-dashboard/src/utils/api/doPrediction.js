import { post } from 'axios';

const { REACT_APP_FLASK_SERVER, REACT_APP_FLASK_SERVER_PORT } = process.env;

const doPrediction = async (payload) => {
  const URL = `http://${REACT_APP_FLASK_SERVER || '192.168.0.134'}:${
    REACT_APP_FLASK_SERVER_PORT || '5000'
  }`;
  try {
    const { status, data } = await post(`http://${URL}/get_prediction`, {
      data: payload,
    });

    if (status === 200) {
      console.log('[API /doPrediction] Response: 200 ', data);
      // Return except the last three indices from the array
      return data;
    }
    console.log('[API /doPrediction] Response: ', status);
    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export default doPrediction;
