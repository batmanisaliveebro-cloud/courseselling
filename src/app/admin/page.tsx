/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { ShieldCheck, Mail, CheckCircle } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([
    { id: 'ORD-001', userEmail: 'student@example.com', courseTitle: 'Web Development Mastery', status: 'PENDING', date: '2026-06-11' },
    { id: 'ORD-002', userEmail: 'another@example.com', courseTitle: '0-100 Complete Cohort', status: 'DELIVERED', date: '2026-06-10' }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Component mounted
  }, []);

  const handleSendLink = async (order: any) => {
    const driveLink = prompt("Enter the Google Drive link for this course:");
    if (!driveLink) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/send-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          userEmail: order.userEmail,
          courseTitle: order.courseTitle,
          driveLink: driveLink
        })
      });

      if (res.ok) {
        alert("Link sent successfully to " + order.userEmail);
        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'DELIVERED' } : o));
      } else {
        alert("Error sending email. Check server logs.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send link");
    }
    setLoading(false);
  };

  return (
    <div className={styles.adminWrapper}>
      <div className="container">
        <div className={styles.header}>
          <h1><ShieldCheck size={32} /> Admin Control Panel</h1>
          <p>Manage orders and dispatch course access links.</p>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Email</th>
                <th>Course</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.userEmail}</td>
                  <td>{order.courseTitle}</td>
                  <td>
                    <span className={order.status === 'PENDING' ? styles.badgeWarning : styles.badgeSuccess}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === 'PENDING' ? (
                      <button 
                        className={styles.actionBtn} 
                        onClick={() => handleSendLink(order)}
                        disabled={loading}
                      >
                        <Mail size={16} /> Send Link
                      </button>
                    ) : (
                      <span className={styles.deliveredText}><CheckCircle size={16}/> Delivered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
