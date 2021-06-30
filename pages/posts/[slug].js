import { useRouter } from 'next/router';
import db from '../../utils/db/index';
import Layout from '../../components/Layout';

export default function Post({ entry }) {
  const router = useRouter();

  if (router.fallback) {
    return <div>Loading...</div>;
  }

  if (!entry) {
    return <div>Not Found</div>;
  }

  return (
    <Layout>
      <h1>{entry.title}</h1>
      <h4>{entry.created}</h4>
      <p>{entry.body}</p>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const entries = await db.collection('entries').get();
  const paths = entries.docs.map((entry) => ({
    params: {
      slug: entry.data().slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const res = await db.collection('entries').where('slug', '==', slug).get();
  const entry = res.docs.map((entry) => entry.data());

  if (entry.length) {
    return {
      props: {
        entry: entry[0],
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
