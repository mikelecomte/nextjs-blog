import { format, fromUnixTime } from "date-fns";

export const dateFromTimestamp = (timeStamp, timeOnly = false) => {
  const date = fromUnixTime(timeStamp);

  if (!timeOnly && isToday(date)) {
    return <time dateTime={date.toString()}>Today</time>;
  }

  return <time dateTime={date.toString()}>{format(date, timeOnly ? "p" : "cccc")}</time>;
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
