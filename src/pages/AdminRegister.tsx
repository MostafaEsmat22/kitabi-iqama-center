
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminRegistrationForm from '@/components/auth/AdminRegistrationForm';

const AdminRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return <AdminRegistrationForm />;
};

export default AdminRegister;
