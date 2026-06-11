import styles from '../legal.module.css';

export const metadata = {
  title: 'Privacy Policy | CourseHub',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <span className={styles.lastUpdated}>Last updated: June 11, 2026</span>

      <div className={styles.content}>
        <h2>1. Information We Collect</h2>
        <p>We collect information to provide better services to our users. This includes:</p>
        <ul>
          <li><strong>Information you provide to us:</strong> Such as your name, email address (via Google Sign-In), and billing information (processed securely by Cashfree).</li>
          <li><strong>Information we get from your use of our services:</strong> Such as log information and device details.</li>
        </ul>

        <h2>2. How We Use Information We Collect</h2>
        <p>We use the information we collect from all our services to provide, maintain, protect and improve them, to develop new ones, and to protect CourseHub and our users.</p>

        <h2>3. Payment Processing</h2>
        <p>We use Cashfree as our payment gateway. We do not store your raw credit card or banking details on our servers. All transactions are securely processed by Cashfree.</p>

        <div className={styles.nonRefundableAlert}>
          <h3>Non-Refundable Policy</h3>
          <p>Please note that all purchases made on this platform are NON-REFUNDABLE. Due to the digital nature of our courses, we cannot offer refunds once access has been granted.</p>
        </div>

        <h2>4. Information Security</h2>
        <p>We work hard to protect CourseHub and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold. We use Supabase for secure data storage and Google OAuth for authentication.</p>
      </div>
    </div>
  );
}
