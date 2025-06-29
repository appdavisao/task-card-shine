
import AdminPanel from '@/components/AdminPanel';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <AdminPanel />
      </div>
    </div>
  );
};

export default Admin;
