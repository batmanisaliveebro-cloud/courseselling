"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, BookOpen, Star, PlayCircle } from 'lucide-react';
import styles from './course.module.css';

const courses = {
  'web-dev': { 
    title: 'Web Development Mastery', 
    price: 5000, 
    image: '/web_dev_1781175330631.png',
    description: 'Master full-stack web development with modern technologies like React, Node.js, and Postgres. Go from zero to deployment ready.',
    duration: '12 Weeks',
    modules: 48,
    syllabus: [
      { title: 'HTML, CSS & Modern JS', duration: '2 Weeks' },
      { title: 'React & Frontend Architecture', duration: '4 Weeks' },
      { title: 'Backend with Node & Express', duration: '3 Weeks' },
      { title: 'Databases & Deployment', duration: '3 Weeks' }
    ]
  },
  // ... other courses would be defined here similarly
  'devops': { 
    title: 'DevOps Engineering', 
    price: 10000, 
    image: '/devops_1781175341070.png',
    description: 'Master Cloud, CI/CD, Docker, and Kubernetes.',
    duration: '10 Weeks',
    modules: 40,
    syllabus: [
      { title: 'Linux & Scripting', duration: '2 Weeks' },
      { title: 'Docker & Containers', duration: '3 Weeks' },
      { title: 'Kubernetes Orchestration', duration: '3 Weeks' },
      { title: 'CI/CD Pipelines', duration: '2 Weeks' }
    ]
  },
  'blockchain': { 
    title: 'Blockchain & Web3', price: 20000, image: '/blockchain_1781175359687.png',
    description: 'Build decentralized applications and master smart contracts.',
    duration: '14 Weeks', modules: 60,
    syllabus: [{ title: 'Solidity Basics', duration: '4 Weeks' }, { title: 'DeFi Protocols', duration: '10 Weeks' }]
  },
  'cohort': { 
    title: '0-100 Complete Cohort', price: 30000, image: '/full_cohort_1781175453421.png',
    description: 'The ultimate zero to hero programming bootcamp.',
    duration: '24 Weeks', modules: 120,
    syllabus: [{ title: 'Foundation', duration: '8 Weeks' }, { title: 'Advanced Topics', duration: '16 Weeks' }]
  },
  'spring-boot': { 
    title: 'Java Spring Boot', price: 50000, image: '/spring_boot_1781175465886.png',
    description: 'Enterprise-grade backend development with Java.',
    duration: '16 Weeks', modules: 80,
    syllabus: [{ title: 'Java Core', duration: '4 Weeks' }, { title: 'Spring Framework', duration: '12 Weeks' }]
  }
};

export default function CourseDetails() {
  const { id } = useParams();
  const course = courses[id as keyof typeof courses];

  if (!course) return <div className="container" style={{padding: '8rem 0'}}>Course not found</div>;

  return (
    <div className={styles.wrapper}>
      {/* Course Header */}
      <section className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.headerContent}>
            <div className={styles.badge}>Premium Curriculum</div>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.description}>{course.description}</p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}><Clock size={20}/> {course.duration}</div>
              <div className={styles.metaItem}><BookOpen size={20}/> {course.modules} Modules</div>
              <div className={styles.metaItem}><Star size={20} fill="currentColor" color="#fbbf24"/> 4.9 Rating</div>
            </div>
            
            <div className={styles.ctaWrapper}>
              <Link href={`/checkout/${id}`} className={styles.enrollBtn}>
                Enroll Now - ₹{course.price.toLocaleString('en-IN')}
              </Link>
              <p className={styles.deliveryNote}>*Google Drive access link delivered to registered Gmail.</p>
            </div>
          </div>
          <div className={styles.headerImage}>
            <div className={styles.imageWrapper}>
              <Image src={course.image} alt={course.title} fill style={{ objectFit: 'cover' }} priority/>
              <div className={styles.playButton}><PlayCircle size={64}/></div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Syllabus */}
      <section className={styles.syllabusSection}>
        <div className={`container ${styles.syllabusContainer}`}>
          <div className={styles.sectionHeader}>
            <h2>Curriculum Overview</h2>
            <p>What you will learn in this program.</p>
          </div>
          
          <div className={styles.accordion}>
            {course.syllabus.map((mod, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.accordionItem}
              >
                <div className={styles.accordionHeader}>
                  <div className={styles.moduleNumber}>Module {idx + 1}</div>
                  <h3>{mod.title}</h3>
                </div>
                <div className={styles.accordionMeta}>{mod.duration}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
