export default function Layout({ children }) {
  return (
    <div className='container py-4'>
      <h2 className='text-center mb-5 text-primary'>CRUD APP</h2>
      {children}
    </div>
  );
}
