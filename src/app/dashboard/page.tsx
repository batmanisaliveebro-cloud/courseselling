"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { Lock, Unlock, ExternalLink } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would check Supabase Auth Session
    // and fetch purchases from the DB.
    // For now, we simulate a logged in user with 0 purchases if they just signed in.
    
    const fetchPurchases = async () => {
      try {
        // const { data: session } = await supabase.auth.getSession();
        // if (!session?.session) router.push('/');
        
        // Mock data fetch
        setTimeout(() => {
          setPurchases([]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchPurchases();
  }, [router]);

  if (loading) {
    return <div className={styles.loading}>Loading your learning hub...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className="container">
        <h1 className={styles.pageTitle}>My Dashboard</h1>
        
        {purchases.length === 0 ? (
          <div className={styles.emptyState}>
            <Lock size={48} className={styles.emptyIcon} />
            <h2>No courses purchased yet</h2>
            <p>Ready to level up? Explore our premium cohorts and start your journey.</p>
            <button onClick={() => router.push('/#courses')} className={styles.primaryBtn}>
              Browse Courses
            </button>
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {purchases.map(p => (
              <div key={p.id} className={styles.purchaseCard}>
                <div className={styles.purchaseHeader}>
                  <Unlock size={20} className={styles.unlockedIcon} />
                  <h3>{p.course_title}</h3>
                </div>
                <p>Status: Active Lifetime Access</p>
                <a href={p.drive_link} target="_blank" rel="noopener noreferrer" className={styles.accessBtn}>
                  Access Materials <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
