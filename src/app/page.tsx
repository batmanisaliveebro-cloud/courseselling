"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldAlert } from 'lucide-react';
import styles from './page.module.css';

const courses = [
  {
    id: 'web-dev',
    title: 'Web Development Mastery',
    price: 5000,
    image: '/web_dev_1781175330631.png',
    description: 'Master full-stack web development with modern technologies.'
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    price: 10000,
    image: '/devops_1781175341070.png',
    description: 'Learn cloud infrastructure, CI/CD, Docker, and Kubernetes.'
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    price: 20000,
    image: '/blockchain_1781175359687.png',
    description: 'Build decentralized applications and master smart contracts.'
  },
  {
    id: 'cohort',
    title: '0-100 Complete Cohort',
    price: 30000,
    image: '/full_cohort_1781175453421.png',
    description: 'The ultimate zero to hero programming bootcamp.'
  },
  {
    id: 'spring-boot',
    title: 'Java Spring Boot',
    price: 50000,
    image: '/spring_boot_1781175465886.png',
    description: 'Enterprise-grade backend development with Java.'
  }
];

export default function Home() {
  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroContent}
          >
            <h1 className={styles.title}>
              Level Up Your <span className={styles.highlight}>Tech Career</span> Today
            </h1>
            <p className={styles.subtitle}>
              Premium courses designed by industry experts to get you hired. 
              Start learning the most in-demand skills in tech.
            </p>
            <div className={styles.ctaGroup}>
              <a href="#courses" className={styles.primaryBtn}>Explore Courses</a>
            </div>
            
            <div className={styles.trustBadges}>
              <div className={styles.badge}><CheckCircle size={16}/> Lifetime Access</div>
              <div className={styles.badge}><CheckCircle size={16}/> Industry Projects</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="courses" className={styles.coursesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Premium Cohorts</h2>
            <p>Choose your path to mastery.</p>
            
            <div className="non-refundable-banner">
              <ShieldAlert size={20} />
              <span>ALL PURCHASES ARE STRICTLY NON-REFUNDABLE</span>
            </div>
          </div>

          <div className={styles.courseGrid}>
            {courses.map((course, idx) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.courseCard}
              >
                <div className={styles.imageWrapper}>
                  <Image src={course.image} alt={course.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.cardContent}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.price}>₹{course.price.toLocaleString('en-IN')}</span>
                    <Link href={`/checkout/${course.id}`} className={styles.buyBtn}>
                      Buy Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
