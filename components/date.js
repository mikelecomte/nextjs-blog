import { format, fromUnixTime } from "date-fns";

export const dateFromTimestamp = (timeStamp, withTime = false) => {
  const date = fromUnixTime(timeStamp);

  if (!withTime && isToday(date)) {
    return <time dateTime={date}>Today</time>;
  }

  return (
    <time dateTime={date}>{format(date, withTime ? "ccc p" : "cccc")}</time>
  );
};

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
