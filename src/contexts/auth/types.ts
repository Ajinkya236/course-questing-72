
import { Session, User, AuthError } from '@supabase/supabase-js';

export interface UserData {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export interface AuthResponse {
  error: AuthError | Error | null;
  data: any;
}

export interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResponse>;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  isAuthenticating: boolean;
}
