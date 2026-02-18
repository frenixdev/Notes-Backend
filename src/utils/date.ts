export const getCurrentDate = (): string => {
  const date = new Date();
  const hr = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const period = hr / 12 >= 1 ? "pm" : "am";

  return `${hr % 12}:${min}:${sec} ${period}`;
};
