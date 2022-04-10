import { post } from 'axios';

const getAnalyticsData = async (payload) => {
  const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_PORT } = process.env;
  /* const payload = {
    clear_date: ['2019-01-01', '2020-12-31'],
    due_in_date: ['2019-01-01', '2020-12-31'],
    baseline_create_date: ['2019-01-01', '2020-12-31'],
    invoice_currency: 'USD',
  }; */

  try {
    const { status, data } = await post(
      `http://${REACT_APP_API_SERVER || '192.168.0.134'}:${
        REACT_APP_API_SERVER_PORT || '280'
      }/RESTDatabase_war_exploded/getanalytics`,
      JSON.stringify(payload),
    );

    if (status === 200) {
      console.log('[API /getanalytics] Response: 200 ');
      return data;
    }
    console.log('[API /getanalytics] Response: ', status);

    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
};

export default getAnalyticsData;
