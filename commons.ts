export const convertTime = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);
  return { hours: date.getHours, mins: date.getMinutes };
};
