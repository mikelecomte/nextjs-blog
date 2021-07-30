import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import useSWR from "swr";
import { dateFromTimestamp } from "../../components/date";

export default function Weather2() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const baseUrl = "/api/weather";

  const { data, error } = useSWR(baseUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          The weather is {data.current.weather[0].main}°. The current
          temperature is {data.current.temp} but it feels like{" "}
          {data.current.feels_like}!
        </p>
      </section>
      {data.daily.map((day) => {
        return (
          <section className={utilStyles.headingMd} key={day.dt}>
            <h2 className={utilStyles.headingLg}>
              {dateFromTimestamp(day.dt)}
            </h2>
            <ul className={utilStyles.list}>
              <li className={utilStyles.listItem}>
                <b>{day.weather[0].main}</b>
              </li>
              <li className={utilStyles.listItem}>Low of {day.temp.min}°</li>
              <li className={utilStyles.listItem}>High of {day.temp.max}°</li>
            </ul>
          </section>
        );
      })}
    </Layout>
  );
}
