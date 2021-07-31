import "../styles/global.css";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import "react-flexbox-grid/dist/react-flexbox-grid.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout home={Component.name === "Home"}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
