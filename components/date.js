import { parseISO, format, fromUnixTime } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}

export const dateFromTimestamp = (timeStamp) => {
  const date = fromUnixTime(timeStamp);
  return <time dateTime={date}>{format(date, "LLLL d, yyyy")}</time>; 
}