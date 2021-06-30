import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../../components/Layout';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const res = await axios.get('/api/entry/entries');
    setPosts(res.data.entriesData);
  }, []);

  return (
    <Layout>
      {posts.map((post) => (
        <div className='card card-body mb-2' key={post.id}>
          <Link href={`/admin/edit/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
    </Layout>
  );
}
