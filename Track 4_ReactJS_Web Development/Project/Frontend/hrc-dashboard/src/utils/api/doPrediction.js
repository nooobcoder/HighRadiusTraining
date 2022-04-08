import { post } from 'axios';

const doPrediction = async (payload) => {
  try {
    const { status, data } = await post('http://192.168.0.134:5000/get_prediction', {
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
