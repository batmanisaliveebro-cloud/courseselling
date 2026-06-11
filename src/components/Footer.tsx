import Link from 'next/link';
import styles from './Footer.module.css';
import { BookOpen, Twitter, Github, Linkedin, Mail } from 'lucide-react';

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
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="GitHub"><Github size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
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
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit"><Mail size={16}/></button>
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
