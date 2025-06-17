
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'evaluator' | 'super_evaluator' | 'user';

export function useUserRole() {
  const { user } = useContext(AuthContext);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) throw error;

        const userRoles = data?.map(row => row.role as UserRole) || [];
        setRoles(userRoles);
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [user]);

  const hasRole = (role: UserRole) => roles.includes(role);
  const isEvaluator = hasRole('evaluator') || hasRole('super_evaluator') || hasRole('admin');
  const isSuperEvaluator = hasRole('super_evaluator') || hasRole('admin');

  return {
    roles,
    hasRole,
    isEvaluator,
    isSuperEvaluator,
    loading
  };
}
