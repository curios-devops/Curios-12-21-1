import { supabase } from '../../lib/supabase';
import type { AuthResponse } from './types';

export async function signInWithEmail(email: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (otpError) throw otpError;
    }

    return { success: true };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sign in'
    };
  }
}

export async function signUpWithEmail(email: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-12), // Generate random secure password
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sign up'
    };
  }
}

export async function signOut(): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sign out'
    };
  }
}

export async function verifyOtp(email: string, token: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('OTP verification error:', error);
    return {
      success: false,
      error: error instanceof Error 
        ? error.message === 'Invalid OTP' 
          ? 'Invalid verification code'
          : error.message
        : 'Failed to verify code'
    };
  }
}