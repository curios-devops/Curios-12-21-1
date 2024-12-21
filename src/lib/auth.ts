import { supabase } from './supabase';
import { AuthError } from '@supabase/supabase-js';

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export async function signInWithEmail(email: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error instanceof AuthError ? error.message : 'Failed to sign in'
    };
  }
}

export async function signUpWithEmail(email: string): Promise<AuthResponse> {
  return signInWithEmail(email); // Using passwordless auth for both flows
}

export async function verifyOtp(email: string, token: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'  // Changed from 'magiclink' to 'email'
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('OTP verification error:', error);
    return {
      success: false,
      error: error instanceof AuthError 
        ? error.message === 'Invalid OTP' 
          ? 'Invalid verification code'
          : error.message
        : 'Failed to verify code'
    };
  }
}