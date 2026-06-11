"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShieldAlert, CreditCard, Lock } from 'lucide-react';
import styles from '../checkout.module.css';

const courses = {
  'web-dev': { title: 'Web Development Mastery', price: 5000 },
  'devops': { title: 'DevOps Engineering', price: 10000 },
  'blockchain': { title: 'Blockchain & Web3', price: 20000 },
  'cohort': { title: '0-100 Complete Cohort', price: 30000 },
  'spring-boot': { title: 'Java Spring Boot', price: 50000 }
};

export default function Checkout() {
  const { courseId } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseId && typeof courseId === 'string' && courses[courseId as keyof typeof courses]) {
      setCourse(courses[courseId as keyof typeof courses]);
    } else {
      router.push('/');
    }
  }, [courseId, router]);

  const handlePayment = async () => {
    setLoading(true);
    // Placeholder for Cashfree Integration
    // 1. Call /api/checkout to get payment session id
    // 2. Load Cashfree JS SDK and open payment modal
    // 3. On success, verify webhook and grant access
    alert("Cashfree integration will trigger here once configured.");
    setLoading(false);
  };

  if (!course) return <div className="container" style={{padding: '4rem 0'}}>Loading...</div>;

  return (
    <div className={styles.checkoutWrapper}>
      <div className={`container ${styles.checkoutContainer}`}>
        <div className={styles.checkoutDetails}>
          <h1>Complete Your Purchase</h1>
          
          <div className={styles.orderSummary}>
            <div className={styles.summaryRow}>
              <span>Course</span>
              <span className={styles.highlight}>{course.title}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Lifetime Access</span>
              <span>Included</span>
            </div>
            <div className={styles.summaryDivider}></div>
            <div className={styles.summaryRowTotal}>
              <span>Total Amount</span>
              <span>₹{course.price.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className={styles.nonRefundableAlert}>
            <ShieldAlert size={32} />
            <div>
              <h2>STRICTLY NON-REFUNDABLE</h2>
              <p>By proceeding with this payment, you acknowledge that this purchase is final and cannot be refunded under any circumstances.</p>
            </div>
          </div>

          <button 
            onClick={handlePayment} 
            disabled={loading}
            className={styles.payButton}
          >
            {loading ? 'Processing...' : (
              <>
                <CreditCard size={20} />
                Pay ₹{course.price.toLocaleString('en-IN')} Securely
              </>
            )}
          </button>
          
          <div className={styles.secureBadge}>
            <Lock size={14} /> Payments secured by Cashfree
          </div>
        </div>
      </div>
    </div>
  );
}
