import { post } from 'axios';

const doPost = async ({ start = 0, limit = 10 }) => {
  try {
    const { status, data } = await post(
      `http://192.168.0.134:280/RESTDatabase_war_exploded/getrows?start=${start}&limit=${limit}`,
    );
    if (status === 200) {
      data[data.length - 1] = { ...data[data.length - 1], start, limit };
      console.log('[API] Response: 200 ');
      return data;
    }
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
  return [{}];
};

export default doPost;
