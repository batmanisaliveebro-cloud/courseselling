import Link from 'next/link';
import styles from './Footer.module.css';
import { BookOpen, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        {/* Brand Column */}
        <div className={styles.footerColumn}>
          <Link href="/" className={styles.logo}>
            <BookOpen size={24} color="#ffffff" />
            <span>CourseHub</span>
          </Link>
          <p className={styles.tagline}>
            Engineering excellence delivered digitally. We build the top 1% of tech talent globally.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className={styles.footerColumn}>
          <h3>Platform</h3>
          <Link href="/#courses">All Courses</Link>
          <Link href="/dashboard">Student Dashboard</Link>
          <Link href="#">Success Stories</Link>
          <Link href="#">Enterprise</Link>
        </div>

        <div className={styles.footerColumn}>
          <h3>Legal & Support</h3>
          <Link href="/terms-and-conditions">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="#">Refund Policy</Link>
          <Link href="#">Contact Us</Link>
        </div>

        {/* Newsletter Column */}
        <div className={styles.footerColumn}>
          <h3>Stay Updated</h3>
          <p className={styles.newsletterText}>Get the latest course drops and tech news directly to your inbox.</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email" required />
            <button type="button"><Mail size={16}/></button>
          </form>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>&copy; {new Date().getFullYear()} CourseHub Inc. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <span>Strictly Non-Refundable Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
