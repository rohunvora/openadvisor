"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface User {
  id: string;
  handle: string;
  name: string;
  profileImage?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for auth token in URL params (from Twitter OAuth callback)
    const token = searchParams.get('token');
    const handle = searchParams.get('handle');
    const authType = searchParams.get('auth_type');
    const error = searchParams.get('error');

    if (error) {
      console.error('Auth error:', error);
      // TODO: Show toast notification
      // Clean URL
      router.replace('/');
      setLoading(false);
      return;
    }

    if (token && handle && authType === 'twitter') {
      // Store auth data
      localStorage.setItem('openadvisor_token', token);
      localStorage.setItem('openadvisor_handle', handle);
      
      // Set user data
      setUser({
        id: '', // Will be updated when we fetch full user data
        handle,
        name: handle, // Temporary until we fetch full data
      });

      // Clean URL
      router.replace('/');
      setLoading(false);
      return;
    }

    // Check for existing session
    const existingToken = localStorage.getItem('openadvisor_token');
    const existingHandle = localStorage.getItem('openadvisor_handle');
    
    if (existingToken && existingHandle) {
      setUser({
        id: '',
        handle: existingHandle,
        name: existingHandle,
      });
    }
    
    setLoading(false);
  }, [searchParams, router]);

  const login = () => {
    // Redirect to Twitter OAuth
    window.location.href = process.env.NEXT_PUBLIC_API_URL 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/twitter`
      : 'http://localhost:8080/api/auth/twitter';
  };

  const logout = () => {
    localStorage.removeItem('openadvisor_token');
    localStorage.removeItem('openadvisor_handle');
    setUser(null);
    router.push('/');
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
} 