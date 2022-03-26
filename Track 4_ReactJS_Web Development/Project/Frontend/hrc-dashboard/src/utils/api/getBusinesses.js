import { get } from 'axios';

const doPost = async () => {
  try {
    const { status, data } = await get(
      'http://192.168.0.134:280/RESTDatabase_war_exploded/getbusinesses',
    );
    if (status === 200) {
      console.log('[API /getBusinesses] Response: 200 ');
      // Return except the last three indices from the array
      return data.slice(0, -3);
    }
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
  return [{}];
};

export default doPost;
