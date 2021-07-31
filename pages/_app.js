import "../styles/global.css";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
