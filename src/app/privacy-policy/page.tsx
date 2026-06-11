import styles from '../legal.module.css';

export const metadata = {
  title: 'Privacy Policy | CourseHub',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <span className={styles.lastUpdated}>Effective Date: June 11, 2026</span>

      <div className={styles.content}>
        <h2>1. Information We Collect</h2>
        <p>We respect the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. We collect information in the following ways:</p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register with the site using Google OAuth.</li>
          <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the site. <strong>Note:</strong> We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Cashfree, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.</li>
        </ul>

        <h2>2. Use of Your Information</h2>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Process your payments and refunds.</li>
          <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
          <li>Email you regarding your account or order (e.g., sending the Google Drive access link).</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
        </ul>

        <div className={styles.nonRefundableAlert}>
          <h3>3. Digital Delivery & Returns</h3>
          <p>Please note that all purchases made on this platform are NON-REFUNDABLE. Due to the digital nature of our courses, we cannot offer refunds once access has been granted via email. Your email data is used strictly to fulfill this digital delivery.</p>
        </div>

        <h2>4. Disclosure of Your Information</h2>
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows: By Law or to Protect Rights. If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</p>

        <h2>5. Security of Your Information</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
      </div>
    </div>
  );
}
