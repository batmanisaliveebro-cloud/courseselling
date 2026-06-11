import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms and Conditions | CourseHub',
};

export default function TermsAndConditions() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms and Conditions</h1>
      <span className={styles.lastUpdated}>Last updated: June 11, 2026</span>

      <div className={styles.content}>
        <h2>1. Introduction</h2>
        <p>Welcome to CourseHub. By accessing and using our website and purchasing our courses, you agree to be bound by the following terms and conditions.</p>

        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on CourseHub's website for personal, non-commercial transitory viewing only.</p>

        <h2>3. Course Access</h2>
        <p>Upon successful payment, you will receive access to the course materials via a provided Google Drive or OneDrive link in your user dashboard. This access is meant for the purchaser only and must not be shared or distributed.</p>

        <div className={styles.nonRefundableAlert}>
          <h3>Strictly Non-Refundable</h3>
          <p>Once a course is purchased and access is granted, it is 100% NON-REFUNDABLE under any and all circumstances.</p>
        </div>

        <h2>4. Disclaimer</h2>
        <p>The materials on CourseHub's website are provided on an 'as is' basis. CourseHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      </div>
    </div>
  );
}
