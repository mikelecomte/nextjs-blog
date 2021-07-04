import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Messing around with stuff based on{" "}
          <a href="https://nextjs.org/learn">the Next.js tutorial</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Tests</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem} key={`/weather`}>
            <Link href={`/weather`}>
              <a>Weather</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              Fetch weather using SSR
            </small>
          </li>
          <li className={utilStyles.listItem} key={`/weather2`}>
            <Link href={`/weather2`}>
              <a>Weather2</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              Fetch weather using API and SWR
            </small>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
