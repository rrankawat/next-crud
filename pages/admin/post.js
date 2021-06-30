import { useState } from 'react';
import { useRouter } from 'next/router';
import dashify from 'dashify';
import axios from 'axios';
import Layout from '../../components/Layout';

const Post = () => {
  const router = useRouter();

  const [content, setContent] = useState({
    title: '',
    body: '',
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    const { title, body } = content;

    const payload = {
      title,
      slug: dashify(title),
      body,
    };

    await axios.post('/api/entry', payload);
    router.push('/admin/edit');
  };

  return (
    <Layout>
      <div className='mb-2'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          value={content.title}
          onChange={onChange}
          className='form-control'
        />
      </div>

      <div className='mb-2'>
        <label>Body</label>
        <textarea
          name='body'
          cols='30'
          rows='10'
          value={content.body}
          onChange={onChange}
          className='form-control'
        />
      </div>

      <button className='btn btn-success' onClick={onSubmit}>
        POST
      </button>
    </Layout>
  );
};

export default Post;
