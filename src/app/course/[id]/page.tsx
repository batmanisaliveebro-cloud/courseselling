"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Star, PlayCircle, Check, Lock, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import styles from './course.module.css';

const courses = {
  'web-dev': { 
    title: 'Web Development Mastery', price: 5000, image: '/web_dev_1781175330631.png',
    description: 'Master full-stack web development with modern technologies. Go from zero to deployment ready, building 15+ real-world projects.',
    duration: '12 Weeks', modules: 48, rating: 4.9,
    syllabus: [
      { title: 'Week 1-2: Advanced HTML5 & Modern CSS3 Architecture', duration: '12 Hours', details: ['Semantic HTML', 'CSS Grid & Flexbox Mastery', 'BEM Methodology', 'Responsive Design without Frameworks', 'CSS Animations & Transitions'] },
      { title: 'Week 3-5: Deep Dive into JavaScript (ES6+)', duration: '20 Hours', details: ['Execution Context & Closures', 'Asynchronous JS (Promises, async/await)', 'DOM Manipulation Under the Hood', 'Object Oriented JS & Prototypes', 'Functional Programming Concepts'] },
      { title: 'Week 6-8: React.js & Frontend Engineering', duration: '25 Hours', details: ['Component Lifecycle & Hooks', 'State Management (Redux Toolkit, Zustand)', 'React Router & Client-side Routing', 'Performance Optimization (useMemo, useCallback)', 'Testing with Jest & React Testing Library'] },
      { title: 'Week 9-10: Node.js & Express Backend', duration: '18 Hours', details: ['RESTful API Design', 'Middleware Architecture', 'Authentication (JWT, OAuth)', 'Security Best Practices (Helmet, CORS, Rate Limiting)', 'Error Handling Strategies'] },
      { title: 'Week 11-12: Databases, DevOps & Deployment', duration: '15 Hours', details: ['PostgreSQL & Prisma ORM', 'MongoDB & Mongoose', 'Docker Containerization Basics', 'CI/CD with GitHub Actions', 'Deploying to AWS/Vercel'] }
    ]
  },
  'devops': { 
    title: 'DevOps Engineering & Cloud Architecture', price: 10000, image: '/devops_1781175341070.png',
    description: 'Master Cloud infrastructure, CI/CD pipelines, Docker, Kubernetes, and Infrastructure as Code (Terraform).',
    duration: '16 Weeks', modules: 64, rating: 4.8,
    syllabus: [
      { title: 'Week 1-3: Linux Administration & Shell Scripting', duration: '15 Hours', details: ['Linux File System & Permissions', 'Process Management & Networking', 'Bash Scripting for Automation', 'Vim & CLI Mastery', 'System Monitoring'] },
      { title: 'Week 4-6: Docker & Containerization', duration: '18 Hours', details: ['Docker Architecture', 'Writing optimized Dockerfiles', 'Docker Compose for Multi-container Apps', 'Container Security', 'Registry Management'] },
      { title: 'Week 7-10: Kubernetes Orchestration (CKA Prep)', duration: '30 Hours', details: ['K8s Cluster Architecture', 'Pods, Deployments, & Services', 'StatefulSets & DaemonSets', 'Ingress Controllers & Networking', 'Helm Charts & Package Management'] },
      { title: 'Week 11-13: Infrastructure as Code (Terraform)', duration: '20 Hours', details: ['Terraform State Management', 'Modules & Providers', 'AWS Infrastructure Provisioning', 'Terragrunt & DRY Configurations', 'Policy as Code (Sentinel)'] },
      { title: 'Week 14-16: CI/CD & Observability', duration: '22 Hours', details: ['Jenkins & GitLab CI Advanced Pipelines', 'Prometheus & Grafana Monitoring', 'ELK Stack Logging', 'Incident Response & SRE Practices', 'GitOps with ArgoCD'] }
    ]
  },
  'blockchain': { 
    title: 'Blockchain & Web3 Architecture', price: 20000, image: '/blockchain_1781175359687.png',
    description: 'Build decentralized applications, master Solidity smart contracts, and understand DeFi protocol mechanics.',
    duration: '14 Weeks', modules: 60, rating: 4.9,
    syllabus: [
      { title: 'Week 1-2: Cryptography & Blockchain Fundamentals', duration: '10 Hours', details: ['Hash Functions & Public Key Cryptography', 'Consensus Mechanisms (PoW, PoS)', 'Ethereum Virtual Machine (EVM) Architecture', 'Wallets & Key Management', 'Layer 1 vs Layer 2 Scaling'] },
      { title: 'Week 3-6: Advanced Solidity Programming', duration: '25 Hours', details: ['Data Types & Storage Layout', 'Inheritance & Interfaces', 'Gas Optimization Techniques', 'Assembly (Yul) Basics', 'ERC20, ERC721, and ERC1155 Standards'] },
      { title: 'Week 7-9: Smart Contract Security & Auditing', duration: '20 Hours', details: ['Reentrancy Attacks', 'Front-Running (MEV)', 'Integer Overflow/Underflow (Solidity <0.8)', 'Oracle Manipulation', 'Using Slither & Mythril for Static Analysis'] },
      { title: 'Week 10-12: Fullstack Web3 (dApp Development)', duration: '22 Hours', details: ['Ethers.js & Viem Integration', 'React + Wagmi + RainbowKit', 'IPFS & Decentralized Storage', 'The Graph (Subgraphs) for Data Querying', 'Building a Full NFT Marketplace'] },
      { title: 'Week 13-14: DeFi Protocols Deep Dive', duration: '15 Hours', details: ['Automated Market Makers (Uniswap V2/V3)', 'Lending & Borrowing (Aave)', 'Flash Loans', 'Yield Aggregation', 'Governance (DAOs)'] }
    ]
  },
  'cohort': { 
    title: '0-100 Complete Engineering Cohort', price: 30000, image: '/full_cohort_1781175453421.png',
    description: 'The ultimate zero to hero programming bootcamp. Learn DSA, System Design, Frontend, Backend, and Cloud.',
    duration: '24 Weeks', modules: 120, rating: 5.0,
    syllabus: [
      { title: 'Phase 1 (Weeks 1-6): Data Structures & Algorithms', duration: '60 Hours', details: ['Big O Notation & Time/Space Complexity', 'Arrays, Strings, & Pointers', 'Linked Lists, Stacks, Queues', 'Trees, Tries & Graphs', 'Dynamic Programming & Greedy Algorithms', 'LeetCode Medium/Hard Patterns'] },
      { title: 'Phase 2 (Weeks 7-12): Frontend Mastery', duration: '50 Hours', details: ['Advanced DOM & Browser APIs', 'React 18 (Server Components, Actions)', 'Next.js App Router Architecture', 'State Management at Scale', 'Micro-frontends & Webpack/Vite Internals'] },
      { title: 'Phase 3 (Weeks 13-18): Scalable Backend Systems', duration: '55 Hours', details: ['Node.js & GoLang Foundations', 'Microservices Architecture', 'gRPC & Protocol Buffers', 'Message Queues (Kafka, RabbitMQ)', 'Caching Strategies (Redis)'] },
      { title: 'Phase 4 (Weeks 19-22): System Design & Databases', duration: '45 Hours', details: ['Database Sharding & Replication', 'SQL vs NoSQL Deep Dive', 'CAP Theorem & PACELC', 'Designing URL Shortener, Twitter, Uber', 'Rate Limiting & Consistent Hashing'] },
      { title: 'Phase 5 (Weeks 23-24): DevOps & Final Project', duration: '30 Hours', details: ['AWS Core Services (EC2, S3, RDS)', 'Docker & K8s Deployments', 'Building a Capstone Project (e.g., E-commerce with Microservices)', 'Resume Review & Mock Interviews', 'Open Source Contributions'] }
    ]
  },
  'spring-boot': { 
    title: 'Java Spring Boot Enterprise', price: 50000, image: '/spring_boot_1781175465886.png',
    description: 'Master enterprise-grade backend development with Java 21, Spring Boot 3, and Microservices architecture.',
    duration: '16 Weeks', modules: 80, rating: 4.9,
    syllabus: [
      { title: 'Week 1-3: Java 21 Advanced Concepts', duration: '20 Hours', details: ['Virtual Threads (Project Loom)', 'Record Classes & Pattern Matching', 'Java Memory Model & Garbage Collection', 'Concurrency & Multithreading', 'Streams API & Functional Interfaces'] },
      { title: 'Week 4-7: Spring Boot 3 Core & Data', duration: '30 Hours', details: ['Inversion of Control & Dependency Injection', 'Spring MVC & RESTful APIs', 'Spring Data JPA & Hibernate Internals', 'Transaction Management (ACID)', 'Database Migrations (Flyway/Liquibase)'] },
      { title: 'Week 8-10: Enterprise Security', duration: '22 Hours', details: ['Spring Security Architecture', 'OAuth2 & OIDC Implementation', 'JWT based Authentication', 'Method Level Security', 'Preventing CSRF, XSS, & SQLi'] },
      { title: 'Week 11-13: Microservices with Spring Cloud', duration: '28 Hours', details: ['Service Discovery (Eureka)', 'API Gateway', 'Circuit Breakers (Resilience4j)', 'Distributed Tracing (Zipkin, Sleuth)', 'Event-Driven Architecture with Kafka'] },
      { title: 'Week 14-16: Testing & Production Deployment', duration: '20 Hours', details: ['Unit Testing (JUnit 5, Mockito)', 'Integration Testing (Testcontainers)', 'GraalVM Native Images', 'Performance Tuning & Profiling', 'Deploying Spring Apps to Kubernetes'] }
    ]
  }
};

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();
  const course = courses[id as keyof typeof courses];
  
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  if (!course) return <div className="container" style={{padding: '8rem 0'}}>Course not found</div>;

  const handleEnrollClick = async () => {
    if (authLoading) return;
    
    if (!user) {
      // Trigger Supabase Login if not authenticated
      try {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/checkout/${id}`
          }
        });
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else {
      router.push(`/checkout/${id}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Course Header */}
      <section className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.headerContent}>
            <div className={styles.badge}>MNC Certified Curriculum</div>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.description}>{course.description}</p>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}><Clock size={18}/> {course.duration}</div>
              <div className={styles.metaItem}><BookOpen size={18}/> {course.modules} Modules</div>
              <div className={styles.metaItem}><Star size={18} fill="currentColor" color="#fbbf24"/> {course.rating} Rating</div>
            </div>
            
            <div className={styles.ctaWrapper}>
              <button 
                onClick={handleEnrollClick}
                disabled={authLoading}
                className={styles.enrollBtn}
              >
                {authLoading ? 'Verifying...' : user ? `Enroll Now - ₹${course.price.toLocaleString('en-IN')}` : `Sign In to Enroll - ₹${course.price.toLocaleString('en-IN')}`}
              </button>
              <div className={styles.guaranteeBlock}>
                <p className={styles.deliveryNote}><Check size={14}/> Lifetime Access</p>
                <p className={styles.deliveryNote}><Check size={14}/> Google Drive Delivery</p>
                <p className={styles.deliveryNote}><Lock size={14}/> Secure Checkout</p>
              </div>
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
            <h2>Comprehensive Curriculum</h2>
            <p>An industry-vetted syllabus designed to turn you into a top-tier engineer.</p>
          </div>
          
          <div className={styles.accordion}>
            {course.syllabus.map((mod, idx) => (
              <div 
                key={idx} 
                className={`${styles.accordionItem} ${expandedModule === idx ? styles.expanded : ''}`}
              >
                <div 
                  className={styles.accordionHeader} 
                  onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                >
                  <div className={styles.headerLeft}>
                    <div className={styles.moduleNumber}>Phase {idx + 1}</div>
                    <h3>{mod.title}</h3>
                  </div>
                  <div className={styles.headerRight}>
                    <span className={styles.accordionMeta}>{mod.duration}</span>
                    <ChevronDown 
                      size={20} 
                      className={styles.chevron} 
                      style={{ transform: expandedModule === idx ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                    />
                  </div>
                </div>
                
                {expandedModule === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className={styles.accordionContent}
                  >
                    <ul>
                      {mod.details.map((detail, dIdx) => (
                        <li key={dIdx}><Check size={16} color="var(--success)"/> {detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
