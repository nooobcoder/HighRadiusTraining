/* This utility function generates the structure of the table
   by parsing the JSON received from the api /getRows.
*/
const generateColumnNames = (row) => row && Object.keys(row);

// eslint-disable-next-line import/prefer-default-export
export { generateColumnNames };
