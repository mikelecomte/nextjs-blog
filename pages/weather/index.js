import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=43.451637&lon=-80.492531&appid=${process.env.WEATHER_KEY}&units=metric`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default function Weather({ data }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          The weather is {data.current.weather[0].main}. The current temperature
          is {data.current.temp} but it feels like {data.current.feels_like}!
        </p>
      </section>
    </Layout>
  );
}
