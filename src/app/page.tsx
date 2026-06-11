"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Star, Users, Eye, TrendingUp, ChevronRight } from 'lucide-react';
import styles from './page.module.css';
import { useState, useEffect } from 'react';

const courses = [
  { id: 'web-dev', title: 'Web Development Mastery', price: 5000, image: '/web_dev_1781175330631.png', rating: 4.9, students: '12K+' },
  { id: 'devops', title: 'DevOps Engineering', price: 10000, image: '/devops_1781175341070.png', rating: 4.8, students: '8K+' },
  { id: 'blockchain', title: 'Blockchain & Web3', price: 20000, image: '/blockchain_1781175359687.png', rating: 4.9, students: '5K+' },
  { id: 'cohort', title: '0-100 Complete Cohort', price: 30000, image: '/full_cohort_1781175453421.png', rating: 5.0, students: '20K+' },
  { id: 'spring-boot', title: 'Java Spring Boot', price: 50000, image: '/spring_boot_1781175465886.png', rating: 4.9, students: '15K+' }
];

const testimonials = [
  { name: "Sarah J.", role: "Frontend Developer at Google", text: "The 0-100 cohort completely changed my career trajectory. The curriculum is world-class." },
  { name: "Michael T.", role: "DevOps Engineer at Amazon", text: "Practical, real-world scenarios. No fluff. Just the exact skills you need to get hired." },
  { name: "Priya R.", role: "Web3 Architect", text: "The Blockchain course dives deeper than any other material online. Highly recommended." }
];

// Reusable animated counter component
const Counter = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  
  return <span>{count.toLocaleString('en-US')}{suffix}</span>;
};

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Enterprise Hero Section */}
      <section className={styles.hero}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        
        <div className={`container ${styles.heroContainer}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroContent}
          >
            <div className={styles.enterpriseBadge}>Trusted by professionals worldwide</div>
            <h1 className={styles.title}>
              Engineering Excellence <br/> Delivered Digitally.
            </h1>
            <p className={styles.subtitle}>
              Master the skills that power the modern web. Our elite cohorts are designed for rapid scaling of your technical capabilities.
            </p>
            <div className={styles.ctaGroup}>
              <a href="#courses" className={styles.primaryBtn}>Explore Catalog <ChevronRight size={18}/></a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <Eye className={styles.statIcon} size={32} />
              <h3 className={styles.statNumber}><Counter end={250} suffix="K+" /></h3>
              <p className={styles.statLabel}>Total Platform Visits</p>
            </div>
            <div className={styles.statCard}>
              <Users className={styles.statIcon} size={32} />
              <h3 className={styles.statNumber}><Counter end={60} suffix="K+" /></h3>
              <p className={styles.statLabel}>Successful Enrollments</p>
            </div>
            <div className={styles.statCard}>
              <Star className={styles.statIcon} size={32} />
              <h3 className={styles.statNumber}>4.9/5</h3>
              <p className={styles.statLabel}>Average Course Rating</p>
            </div>
            <div className={styles.statCard}>
              <TrendingUp className={styles.statIcon} size={32} />
              <h3 className={styles.statNumber}><Counter end={95} suffix="%" /></h3>
              <p className={styles.statLabel}>Placement Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className={styles.coursesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Premium Curriculums</h2>
            <p>Industry-standard education for ambitious engineers.</p>
          </div>

          <div className={styles.courseGrid}>
            {courses.map((course, idx) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={styles.courseCard}
              >
                <Link href={`/course/${course.id}`} className={styles.cardLink}>
                  <div className={styles.imageWrapper}>
                    <Image src={course.image} alt={course.title} fill style={{ objectFit: 'cover' }} />
                    <div className={styles.ratingBadge}>
                      <Star size={14} fill="currentColor" /> {course.rating}
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                      <span className={styles.studentsEnrolled}><Users size={14}/> {course.students} enrolled</span>
                    </div>
                    <h3>{course.title}</h3>
                    <div className={styles.cardFooter}>
                      <span className={styles.price}>₹{course.price.toLocaleString('en-IN')}</span>
                      <span className={styles.viewDetailsBtn}>View Curriculum</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Success Stories</h2>
            <p>Hear from engineers who elevated their careers.</p>
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={styles.testimonialCard}
              >
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.testimonialAuthor}>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
