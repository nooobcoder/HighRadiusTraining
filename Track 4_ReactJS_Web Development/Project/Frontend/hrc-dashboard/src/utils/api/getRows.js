import { post } from 'axios';

const doPost = async () => {
  try {
    const { status, data } = await post(
      `http://192.168.0.134:280/RESTDatabase_war_exploded/getrows?start=${0}&limit=${20}`,
    );
    if (status === 200) {
      console.log('[API] Response: 200 ');
      return data;
    }
  } catch (e) {
    console.log(e.message);
  }
  return [{}];
};

export default doPost;
