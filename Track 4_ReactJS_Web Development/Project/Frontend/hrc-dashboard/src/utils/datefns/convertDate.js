// Convert date to yyyy-mm-dd format
const convertDateToDBFormat = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStrDBFormat = `${year}-${month}-${day}`;
  console.log(dateStrDBFormat);
  return dateStrDBFormat;
};

export default convertDateToDBFormat;
