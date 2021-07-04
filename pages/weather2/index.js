import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import useSWR from "swr";

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
          The weather is {data.current.weather[0].main}. The current temperature
          is {data.current.temp} but it feels like {data.current.feels_like}!
        </p>
      </section>
    </Layout>
  );
}
