export const convertToDateTime = (date_to_format) => {
  const newDate = new Date(date_to_format);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const dateTime = `[${year}-${month}-${date} at ${hour}h:${minute}']`;
  return dateTime;
};

export const formatToDateString = (date_to_format) => {
  const newDate = new Date(date_to_format);
  const date = newDate.toDateString();
  return date;
};

// export const convertToDateTime = (date_to_format) => {
//   const newDate = new Date(date_to_format);
//   const date = newDate.toLocaleTimeString();
//   return date;
// };
