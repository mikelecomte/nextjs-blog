import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Image from "next/image";
import useSWR from "swr";
import { dateFromTimestamp } from "../../components/date";
import { Grid, Row, Col } from "react-flexbox-grid/dist/react-flexbox-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";

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
          <h3 className={utilStyles.headingMd}>Forecast</h3>
        </div>
        <Grid fluid>
          <Row className={utilStyles.forecastContainer}>
            {data.daily.map((day) => {
              return (
                <Col
                  xs={6}
                  md={3}
                  key={day.dt}
                  className={utilStyles.forecastItem}
                >
                  <b>{dateFromTimestamp(day.dt)}</b>
                  <div className={utilStyles.forecastItemDetail}>
                    <div>
                      <Image
                        priority
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        className={utilStyles.borderCircle}
                        height={100}
                        width={100}
                        alt={day.weather[0].main}
                      />
                    </div>
                    <div>
                      <small className={utilStyles.lightText}>
                        <FontAwesomeIcon icon={faArrowUp} />{" "}
                        {Math.round(day.temp.max)}°
                      </small>
                    </div>
                    <div>
                      <small className={utilStyles.lightText}>
                        <FontAwesomeIcon icon={faArrowDown} />{" "}
                        {Math.round(day.temp.min)}°
                      </small>
                    </div>
                    <div>
                      <small className={utilStyles.lightText}>
                        <FontAwesomeIcon icon={faUmbrella} />{" "}
                        {`${Math.round(Number(day.pop * 100))}%`}
                      </small>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Grid>
      </section>
    </Layout>
  );
}
