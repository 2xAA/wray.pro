export const padMonthFromDate = (date) => {
  const string = `${new Date(date).getMonth() + 1}`;
  return string.padStart(2, "0");
};
