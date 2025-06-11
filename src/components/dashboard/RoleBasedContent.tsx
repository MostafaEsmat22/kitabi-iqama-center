
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';

interface RoleBasedContentProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

const RoleBasedContent = ({ allowedRoles, children, fallback = null }: RoleBasedContentProps) => {
  const { profile } = useAuth();
  
  if (!profile || !allowedRoles.includes(profile.role)) {
    return fallback;
  }
  
  return <>{children}</>;
};

export default RoleBasedContent;
