import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Image from "next/image";
import useSWR from "swr";
import { dateFromTimestamp } from "../../components/date";
import { Grid, Row, Col } from "react-flexbox-grid/dist/react-flexbox-grid";

export default function Hourly() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const baseUrl = "/api/weather/hourly";

  const { data, error } = useSWR(baseUrl, fetcher);

  const weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";

  if (error) return <div>{error}</div>;
  if (!data) return <div>loading...</div>;

  if (data && !data.processed) {
    data.hourly.forEach((h) => {
      const date = new Date(h.dt * 1000);
      const day = date.getDay();

      h.day = day;
    });

    const days = data.hourly.map((h) => h.day);

    const dataWithDays = days.reduce(
      (acc, curr) => ((acc[curr] = {}), acc),
      {}
    );

    const keys = Object.keys(dataWithDays);

    keys.forEach((k) => {
      dataWithDays[k] = data.hourly.filter((h) => h.day === Number(k));
    });

    data.hourly = dataWithDays;
    data.processed = true;
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <div className={utilStyles.weatherSummary}>
          <h3 className={utilStyles.headingMd}>Kitchener, ON</h3>
          <div className={utilStyles.currentWeather}>
            <Image
              priority
              src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
              className={utilStyles.borderCircle}
              height={100}
              width={100}
              alt={data.current.weather[0].main}
            />
            {`Feels like ${data.current.feels_like}°`}
          </div>
        </div>
      </section>
      <section>
        <div className={utilStyles.weatherSummary}>
          <h3 className={utilStyles.headingMd}>Next 48 Hours</h3>
          {console.log(data)}
          {Object.keys(data.hourly).map((day) => (
            <div key={day}>
              <h3 className={utilStyles.headingMd}>{weekdays[day]}</h3>
              <Grid fluid>
                <Row>
                  {data.hourly[day].map((hour) => (
                    <Col
                      xs={6}
                      md={4}
                      key={hour.dt}
                      className={utilStyles.forecastItemHourly}
                    >
                      <div>{dateFromTimestamp(hour.dt, true)}</div>
                      <div>
                        <small className={utilStyles.lightText}>
                          {Math.round(Number(hour.temp))}°
                        </small>
                      </div>
                      <div>
                        <small className={utilStyles.lightText}>
                          {hour.weather[0].description}
                        </small>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Grid>
            </div>
          ))}
        </div>
      </section>
      <div className={utilStyles.forecastLink}>
        <Link href={`/weather`}>
          <a>← Daily Forecast</a>
        </Link>
      </div>
    </Layout>
  );
}
