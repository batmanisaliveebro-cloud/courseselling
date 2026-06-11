/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    // Mock fetch orders - only show completed (DELIVERED) orders for the student
    setTimeout(() => {
      const fetchedOrders = [
        { id: 'ORD-002', course_title: '0-100 Complete Cohort', status: 'DELIVERED', link: 'https://drive.google.com/drive/folders/mock_link' },
        { id: 'ORD-003', course_title: 'Web Development Mastery', status: 'DELIVERED', link: 'https://drive.google.com/drive/folders/mock_link_2' }
      ];
      setPurchases(fetchedOrders);
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
                  {p.status === 'DELIVERED' && (
                    <a href={p.link} target="_blank" rel="noreferrer" className={styles.accessBtn}>
                      Access Course Materials
                    </a>
                  )}
                </div>
                <div className={styles.statusDelivered}>
                  <CheckCircle size={20} />
                  <div>
                    <strong>Access Granted</strong>
                    <p>Please check your registered Gmail inbox for the Google Drive link.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
