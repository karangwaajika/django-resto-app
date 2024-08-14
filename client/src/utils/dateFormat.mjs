export const formatDate = (date_to_format) => {
  const newDate = new Date(date_to_format);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const date = newDate.getDate();

  return { newDate, year, month, date };
};

export const formatToDateString = (date_to_format) => {
  const newDate = new Date(date_to_format);
  const date = newDate.toDateString();
  return date;
};
