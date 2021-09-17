import Head from "next/head";
import { GetStaticProps } from 'next'
import Layout, { siteTitle } from "../../components/layout";
import { connectToDatabase } from "../../util/mongodb";
import utilStyles from "../../styles/utils.module.css";

export default function StoryTime({ messages }) {
  return (
    <Layout home={false}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Story Time Messages</h2>
        <ul className={utilStyles.list}>
          {messages.map(({ text }) => (
            <li className={utilStyles.listItem} key={text}>
              <p>{text}</p>
              <hr />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { db } = await connectToDatabase();

  const messages = await db
    .collection("messages")
    .find({}, { projection: { _id: 0 } })
    .sort({ submissionId: 1 })
    .limit(1000)
    .toArray();

  return {
    props: {
      messages: messages,
    },
    revalidate: 60, // In seconds
  };
}
