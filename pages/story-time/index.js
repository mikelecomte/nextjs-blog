import { connectToDatabase } from "../../util/mongodb";
import utilStyles from "../../styles/utils.module.css";

export default function StoryTime({ messages }) {
  return (
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
  );
}

export async function getStaticProps() {
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
