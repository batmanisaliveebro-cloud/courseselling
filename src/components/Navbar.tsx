/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from 'next/link';
import { LogIn, LogOut, BookOpen, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      
      // Security measure: Clear the access_token from the URL hash after a successful login
      if (event === 'SIGNED_IN' && window.location.hash.includes('access_token')) {
        // Replace the current URL in the browser history without the hash fragment
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      alert("Authentication configuration is missing or invalid. Please check your Supabase environment variables.");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <BookOpen size={24} color="#ffffff" />
          <span>CourseHub</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/#courses" className={styles.navLink}>Catalog</Link>
          <Link href="/terms-and-conditions" className={styles.navLink}>Terms</Link>
          {user && <Link href="/dashboard" className={styles.navLink}>My Courses</Link>}
        </div>

        <div className={styles.authButtons}>
          {loading ? (
            <div className={styles.loadingPulse}></div>
          ) : user ? (
            <div className={styles.userMenu}>
              <span className={styles.userEmail}><User size={14}/> {user.email?.split('@')[0]}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className={styles.loginBtn}>
              <LogIn size={18} />
              <span>Sign In with Google</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
