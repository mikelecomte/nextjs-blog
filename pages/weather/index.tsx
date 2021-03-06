import Head from "next/head";
import Link from "next/link";
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

interface Day {
  dt: number;
  weather: Weather[];
  temp: Temp;
  pop: number;
}

interface Weather {
  icon: string;
  main: string;
}

interface Temp {
  min: number;
  max: number;
}

export default function Weather() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const baseUrl = "/api/weather/daily";

  const { data, error } = useSWR(baseUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout home={false}>
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
          <h3 className={utilStyles.headingMd}>Daily Forecast</h3>
        </div>
        <Grid fluid>
          <Row className={utilStyles.forecastContainer}>
            {data.daily.map((day: Day) => {
              return (
                <Col
                  xs={6}
                  md={3}
                  key={day.dt}
                  className={utilStyles.forecastItem}
                >
                  <div>
                    <b>{dateFromTimestamp(day.dt)}</b>
                  </div>
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
      <div className={utilStyles.forecastLink}>
        <Link href={`/weather/hourly`}>
          <a>Hourly forecast</a>
        </Link>
      </div>
    </Layout>
  );
}
