import { format, fromUnixTime } from "date-fns";

export const dateFromTimestamp = (timeStamp) => {
  const date = fromUnixTime(timeStamp);

  if (isToday(date)) {
    return <time dateTime={date}>Today</time>;
  }

  return <time dateTime={date}>{format(date, "cccc")}</time>;
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
