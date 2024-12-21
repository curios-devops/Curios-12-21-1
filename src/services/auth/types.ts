import { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export type AuthMode = 'signin' | 'signup';