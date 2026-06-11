"use client";

import Link from 'next/link';
import { LogIn, LogOut, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  // In a real app, this would use Supabase auth state listener
  useEffect(() => {
    // Placeholder for auth check
  }, []);

  const handleLogin = async () => {
    // Placeholder for Supabase Google SignIn
    alert("Google Sign-In will be initialized here once Supabase is configured.");
  };

  const handleLogout = async () => {
    // Placeholder for Supabase SignOut
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <BookOpen size={24} color="white" />
          </div>
          <span>CourseHub</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Courses</Link>
          {user && <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>}
        </div>

        <div className={styles.authButtons}>
          {user ? (
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
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
