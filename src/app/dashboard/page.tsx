"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { Clock, CheckCircle, Package } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    // Mock fetch purchases
    setTimeout(() => {
      // Mock an existing purchase to show the status
      setPurchases([
        { id: '1', course_title: 'Web Development Mastery', status: 'PENDING' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className={styles.loading}>Loading your learning hub...</div>;

  return (
    <div className={styles.dashboardContainer}>
      <div className="container">
        <h1 className={styles.pageTitle}>My Orders</h1>
        
        {purchases.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={48} className={styles.emptyIcon} />
            <h2>No orders yet</h2>
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
                  <h3>{p.course_title}</h3>
                </div>
                
                {p.status === 'PENDING' ? (
                  <div className={styles.statusPending}>
                    <Clock size={20} />
                    <div>
                      <strong>Order Processing</strong>
                      <p>Your payment is confirmed. Our team is generating your Google Drive access link. It will be sent to your Gmail shortly.</p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.statusDelivered}>
                    <CheckCircle size={20} />
                    <div>
                      <strong>Access Granted</strong>
                      <p>Please check your registered Gmail inbox for the Google Drive link.</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
