const preparePieChart = ({ data }) => {
  const transformedData = {};

  data.forEach((item) => {
    transformedData[item?.invoice_currency?.toUpperCase()] =
      transformedData[item?.invoice_currency] + 1 || 0;
  });

  const transformedDataArray = Object.keys(transformedData).map((key) => ({
    id: key,
    label: key,
    value: transformedData[key],
  }));
  console.log(transformedDataArray);
};

export default preparePieChart;
