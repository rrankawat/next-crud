import Link from 'next/link';
import Layout from '../../components/Layout';
import db from '../../utils/db/index';

export default function Posts({ entriesData }) {
  return (
    <Layout>
      <h1 className='mb-4'>Posts</h1>

      {entriesData.map((entry) => (
        <h5 key={entry.id}>
          <Link href={`/posts/${entry.slug}`}>
            <a>{entry.title}</a>
          </Link>
          <br />
        </h5>
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const entries = await db
    .collection('entries')
    .orderBy('created', 'desc')
    .get();
  const entriesData = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data(),
  }));

  return {
    props: { entriesData },
    revalidate: 10,
  };
};
