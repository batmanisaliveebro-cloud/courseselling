import Link from 'next/link';
import styles from './Footer.module.css';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.logo}>
            <BookOpen size={20} color="var(--primary)" />
            <span>CourseHub</span>
          </Link>
          <p className={styles.tagline}>Elevate your skills with premium, industry-leading courses.</p>
        </div>
        
        <div className={styles.footerLinks}>
          <div className={styles.linkGroup}>
            <h3>Legal</h3>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <div className={styles.nonRefundableBadge}>Strictly Non-Refundable</div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CourseHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
