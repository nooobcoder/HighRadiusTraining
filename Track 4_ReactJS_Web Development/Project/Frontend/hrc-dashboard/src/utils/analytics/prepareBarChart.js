/* eslint-disable no-unsafe-optional-chaining */
const preparePieChart = ({ data }) => {
  const transformedData = {};

  /* 
    transformedData format -> [
    { business: 'Business 1', 'No. of Customers': 10, 'Total Open Amount': 15 },
    { business: 'Business 2', 'No. of Customers': 20, 'Total Open Amount': 22 },
    { business: 'Business 3', 'No. of Customers': 30, 'Total Open Amount': 50 },
    { business: 'Business 4', 'No. of Customers': 40, 'Total Open Amount': 90 },
    { business: 'Business 5', 'No. of Customers': 50, 'Total Open Amount': 42 },
    { business: 'Business 6', 'No. of Customers': 60, 'Total Open Amount': 36 }
  ]
  */

  data.forEach((item) => {
    transformedData[item.business_code?.toUpperCase() || 'undefined'] = {
      no_of_customers: transformedData[item.business_code]?.no_of_customers + 1 || 0,
      total_open_amount: transformedData[item.business_code]?.total_open_amount + 1 || 0,
    };
  });

  /* {
    "U001": {
        "no_of_customers": 235,
        "total_open_amount": 235
    },
    "U013": {
        "no_of_customers": 1,
        "total_open_amount": 1
    },
    "undefined": {
        "no_of_customers": 2,
        "total_open_amount": 2
    }
}
 */
  const transformedDataArray = Object.keys(transformedData).map((item) => ({
    business: item,
    'No. of Customers': transformedData[item].no_of_customers,
    'Total Open Amount': transformedData[item].total_open_amount,
  }));

  return transformedDataArray;
};

export default preparePieChart;
