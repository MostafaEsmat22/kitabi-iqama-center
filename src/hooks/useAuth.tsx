import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { loginSchema, registerSchema, resetPasswordSchema } from '@/lib/validations';
import { toast } from 'sonner';

type Profile = Database['public']['Tables']['profiles']['Row'];

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw new AuthError('Error fetching profile', error.code);
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Validate input
      loginSchema.parse({ email, password });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new AuthError(error.message, error.status?.toString());
      }

      return { data, error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
        return { data: null, error };
      }
      toast.error('Invalid login credentials');
      return { data: null, error: new AuthError('Invalid login credentials') };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Validate input
      registerSchema.parse({ email, password, full_name: fullName });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw new AuthError(error.message, error.status?.toString());
      }

      toast.success('Registration successful! Please check your email for verification.');
      return { data, error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
        return { data: null, error };
      }
      toast.error('Registration failed');
      return { data: null, error: new AuthError('Registration failed') };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new AuthError(error.message, error.status?.toString());
      }
      toast.success('Signed out successfully');
      return { error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
        return { error };
      }
      return { error: new AuthError('Failed to sign out') };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Validate input
      resetPasswordSchema.parse({ email });

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw new AuthError(error.message, error.status?.toString());
      }

      toast.success('Password reset instructions sent to your email');
      return { error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
        return { error };
      }
      return { error: new AuthError('Failed to send reset instructions') };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw new AuthError(error.message, error.status?.toString());
      }

      toast.success('Password updated successfully');
      return { error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
        return { error };
      }
      return { error: new AuthError('Failed to update password') };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      toast.error('No user logged in');
      return { error: new AuthError('No user logged in') };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw new AuthError(error.message, error.code);
      }

      if (data) {
        setProfile(data);
        toast.success('Profile updated successfully');
      }

      return { data, error: null };
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
        return { data: null, error };
      }
      return { data: null, error: new AuthError('Failed to update profile') };
    }
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAdmin: profile?.role === 'admin',
    isTeacher: profile?.role === 'teacher',
    isStudent: profile?.role === 'student',
  };
};
