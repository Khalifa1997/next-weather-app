export const convertTime = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);
  const hours = date.getUTCHours().toString();
  const mins = date.getUTCMinutes().toString();

  return {
    hours: hours.length === 1 ? "0" + hours : hours,
    mins: mins.length === 1 ? "0" + mins : mins,
  };
};
