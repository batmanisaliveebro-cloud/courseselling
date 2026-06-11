/* eslint-disable react/no-unescaped-entities */
import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms of Service | CourseHub',
};

export default function TermsAndConditions() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Service</h1>
      <span className={styles.lastUpdated}>Effective Date: June 11, 2026</span>

      <div className={styles.content}>
        <h2>1. Agreement to Terms</h2>
        <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and CourseHub Inc. ("we," "us" or "our"), concerning your access to and use of our platform and any related services. You agree that by accessing the site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the site and you must discontinue use immediately.</p>

        <h2>2. Intellectual Property Rights</h2>
        <p>Unless otherwise indicated, the Site and all content, video lectures, source code, text, graphics, and databases are our proprietary property and are protected by international copyright and trademark laws. You are granted a limited license only for purposes of viewing the material for personal, non-commercial educational use.</p>

        <h2>3. Delivery Mechanism</h2>
        <p>Upon successful payment processing via Cashfree, an automated system will dispatch a secure Google Drive or OneDrive link to your registered Gmail address. This access link is strictly tied to your authenticated identity and must not be shared, redistributed, or sold.</p>

        <div className={styles.nonRefundableAlert}>
          <h3>4. Strict No-Refund Policy</h3>
          <p>Due to the immediate, digital nature of the educational content provided, ALL SALES ARE FINAL. CourseHub Inc. maintains a strict, non-negotiable NO REFUND policy. Once payment is confirmed and the access link is dispatched to your email, we cannot revoke access, and therefore, no refunds, exchanges, or credits will be provided under any circumstances. By completing a purchase, you legally acknowledge and accept this forfeiture of right to a refund.</p>
        </div>

        <h2>5. User Representations</h2>
        <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Terms of Service; and (4) you will not use the Site for any illegal or unauthorized purpose.</p>

        <h2>6. Prohibited Activities</h2>
        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. Prohibited activity includes systematic retrieval of data, unauthorized framing, engaging in automated use of the system, and attempting to impersonate another user.</p>

        <h2>7. Governing Law</h2>
        <p>These Terms shall be governed by and defined following the laws of your jurisdiction. CourseHub Inc. and yourself irrevocably consent that the courts of your jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
      </div>
    </div>
  );
}
