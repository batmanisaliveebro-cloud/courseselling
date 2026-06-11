"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShieldAlert, CreditCard, Lock, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';
import styles from '../checkout.module.css';

const courses = {
  'web-dev': { title: 'Web Development Mastery', price: 5000, modules: 48, rating: 4.9 },
  'devops': { title: 'DevOps Engineering', price: 10000, modules: 64, rating: 4.8 },
  'blockchain': { title: 'Blockchain & Web3', price: 20000, modules: 60, rating: 4.9 },
  'cohort': { title: '0-100 Complete Cohort', price: 30000, modules: 120, rating: 5.0 },
  'spring-boot': { title: 'Java Spring Boot', price: 50000, modules: 80, rating: 4.9 }
};

export default function Checkout() {
  const { courseId } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initCheckout = async () => {
      // Check Auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        // Force login if somehow they bypassed the guard
        await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href } });
        return;
      }
      setUser(session.user);
      setAuthLoading(false);

      if (courseId && typeof courseId === 'string' && courses[courseId as keyof typeof courses]) {
        setCourse(courses[courseId as keyof typeof courses]);
      } else {
        router.push('/');
      }
    };
    initCheckout();
  }, [courseId, router]);

  const handlePayment = async () => {
    setLoading(true);
    // Placeholder for Cashfree Integration
    alert("Cashfree integration triggered. Simulating successful payment...");
    // Simulate API delay
    setTimeout(() => {
      router.push('/dashboard');
      setLoading(false);
    }, 1500);
  };

  if (authLoading || !course) return <div className={styles.loadingScreen}><div className={styles.spinner}></div></div>;

  return (
    <div className={styles.checkoutWrapper}>
      <div className={`container ${styles.checkoutContainer}`}>
        
        {/* Left Pane - Order Summary */}
        <div className={styles.leftPane}>
          <Link href={`/course/${courseId}`} className={styles.backLink}><ArrowLeft size={16}/> Back to Course</Link>
          
          <div className={styles.coursePreview}>
            <div className={styles.badge}>MNC Certified</div>
            <h1>{course.title}</h1>
            <p className={styles.subtitle}>You are enrolling in the industry-leading curriculum.</p>
          </div>

          <div className={styles.includesBox}>
            <h3>What's included</h3>
            <ul>
              <li><CheckCircle size={18} color="#10b981"/> Full Lifetime Access</li>
              <li><CheckCircle size={18} color="#10b981"/> {course.modules} In-depth Modules</li>
              <li><CheckCircle size={18} color="#10b981"/> Private Alumni Community</li>
              <li><CheckCircle size={18} color="#10b981"/> Priority Code Reviews</li>
              <li><CheckCircle size={18} color="#10b981"/> Certificate of Completion</li>
            </ul>
          </div>
          
          <div className={styles.testimonialBlock}>
            <p>"The best investment I've ever made in my career. The ROI is simply unmatched."</p>
            <span>— Senior Engineer at Microsoft</span>
          </div>
        </div>

        {/* Right Pane - Payment Details */}
        <div className={styles.rightPane}>
          <div className={styles.paymentBox}>
            <h2>Order Details</h2>
            
            <div className={styles.userInfo}>
              <div className={styles.avatar}>{user.email[0].toUpperCase()}</div>
              <div>
                <span className={styles.userLabel}>Account</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>{course.title}</span>
                <span>₹{course.price.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Taxes & Fees</span>
                <span>Included</span>
              </div>
              <div className={styles.priceDivider}></div>
              <div className={styles.priceTotal}>
                <span>Total Due Today</span>
                <span>₹{course.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className={styles.emailNotice}>
              <Mail size={20} />
              <p>Delivery: Google Drive access link will be sent to <strong>{user.email}</strong> upon confirmation.</p>
            </div>

            <div className={styles.nonRefundableAlert}>
              <ShieldAlert size={24} />
              <div>
                <h3>Strictly Non-Refundable</h3>
                <p>Digital purchases are final and cannot be refunded under any circumstances.</p>
              </div>
            </div>

            <button 
              onClick={handlePayment} 
              disabled={loading}
              className={styles.payButton}
            >
              {loading ? <div className={styles.spinnerSmall}></div> : (
                <>
                  Pay ₹{course.price.toLocaleString('en-IN')} Securely <CreditCard size={18} />
                </>
              )}
            </button>
            
            <div className={styles.secureBadge}>
              <Lock size={14} /> Encrypted & secured by Cashfree Payments
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
