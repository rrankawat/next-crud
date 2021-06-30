import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../../components/Layout';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;

  const [content, setContent] = useState({
    title: '',
    body: '',
  });

  useEffect(async () => {
    if (id) {
      const res = await axios.get(`/api/entry/${id}`);
      const { title, body } = res.data;
      setContent({ title, body });
    }
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setContent((preState) => ({ ...preState, [name]: value }));
  };

  const onSubmit = async () => {
    const { title, body } = content;

    await axios.put(`/api/entry/${id}`, { title, body });
    router.push('/admin/edit');
  };

  const onDelete = async () => {
    await axios.delete(`/api/entry/${id}`);
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
        Update
      </button>
      <button className='btn btn-danger ms-2' onClick={onDelete}>
        Delete
      </button>
    </Layout>
  );
}
