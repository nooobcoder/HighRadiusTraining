import { get } from 'axios';

const doGet = async () => {
  try {
    const { status, data } = await get(
      'http://192.168.0.134:280/RESTDatabase_war_exploded/getcustomers',
    );
    if (status === 200) {
      console.log('[API /getCustomers] Response: 200 ');
      // Return except the last three indices from the array
      return data.slice(0, -3);
    }
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
  return [{}];
};

export default doGet;
