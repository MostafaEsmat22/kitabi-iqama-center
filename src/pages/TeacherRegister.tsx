
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import TeacherRegistrationForm from '@/components/auth/TeacherRegistrationForm';

const TeacherRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return <TeacherRegistrationForm />;
};

export default TeacherRegister;
