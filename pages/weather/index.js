import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Image from "next/image";
import useSWR from "swr";
import { dateFromTimestamp } from "../../components/date";
import { Grid, Row, Col } from "react-flexbox-grid/dist/react-flexbox-grid";

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
          {`The weather is ${data.current.weather[0].main}. The current temperature is ${data.current.temp}° but it feels like ${data.current.feels_like}°!`}
        </p>
      </section>
      <Grid fluid>
        <Row>
          {data.daily.map((day) => {
            return (
              <Col xs={6} md={3} key={day.dt}>
                <section className={utilStyles.headingMd}>
                  <p>
                    <b>{dateFromTimestamp(day.dt)}</b>
                  </p>
                  <ul className={utilStyles.list}>
                    <li className={utilStyles.listItem}>
                      <Image
                        priority
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        className={utilStyles.borderCircle}
                        height={100}
                        width={100}
                        alt={day.weather[0].main}
                      />
                    </li>
                    <li className={utilStyles.listItem}>
                      <small className={utilStyles.lightText}>
                        <b>Lo</b> {day.temp.min}°
                      </small>
                    </li>
                    <li className={utilStyles.listItem}>
                      <small className={utilStyles.lightText}>
                        <b>Hi</b> {day.temp.max}°
                      </small>
                    </li>
                  </ul>
                </section>
              </Col>
            );
          })}
        </Row>
      </Grid>
    </Layout>
  );
}
