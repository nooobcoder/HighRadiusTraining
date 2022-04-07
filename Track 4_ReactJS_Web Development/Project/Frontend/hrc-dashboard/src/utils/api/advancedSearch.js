import { post } from 'axios';

const { REACT_APP_API_SERVER, REACT_APP_API_SERVER_PORT } = process.env;

async function advancedSearch() {
  const URL = `http://${REACT_APP_API_SERVER || '192.168.0.134'}:${
    REACT_APP_API_SERVER_PORT || '280'
  }/RESTDatabase_war_exploded/advancedSearch`;

  try {
    const payload = {
      doc_id: 1929873765,
      invoice_id: 1929873765,
      cust_number: 200792734,
      business_year: 2009,
    };

    // Send data to axios post
    const { status, data } = await post(URL, payload);
    if (status === 200) {
      console.log('[API /advancedSearch] Response: 200 ', data);
      return data;
    }
    console.log('[API /advancedSearch] Response: ', status);
    return {};
  } catch (e) {
    console.error(e.message);
    throw new Error(e);
  }
}

export default advancedSearch;
