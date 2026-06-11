/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { ShieldCheck, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching orders:", error);
    } else if (data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSendLink = async (order: any) => {
    const driveLink = prompt(`Enter the Google Drive link for ${order.course_title}:`);
    if (!driveLink) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/send-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          userEmail: order.user_email,
          courseTitle: order.course_title,
          driveLink: driveLink
        })
      });

      if (res.ok) {
        // Update database status
        const { error: updateError } = await supabase
          .from('orders')
          .update({ status: 'DELIVERED' })
          .eq('id', order.id);

        if (updateError) {
          console.error("Failed to update status in DB:", updateError);
          alert("Email sent, but failed to update status in database.");
        } else {
          alert("Link sent successfully to " + order.user_email);
          fetchOrders(); // Refresh table
        }
      } else {
        alert("Error sending email. Check server logs.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send link");
    }
    setActionLoading(false);
  };

  return (
    <div className={styles.adminWrapper}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1><ShieldCheck size={32} /> Admin Control Panel</h1>
            <p>Real-time database records of all paying customers.</p>
          </div>
          <button onClick={fetchOrders} className={styles.refreshBtn} disabled={loading}>
            <RefreshCw size={16} className={loading ? styles.spin : ''} /> Refresh Data
          </button>
        </div>

        <div className={styles.tableContainer}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading real database records...</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>No orders found in the database.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date & Time</th>
                  <th>Customer Email</th>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Amount Paid</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>{order.user_email}</td>
                    <td><span className={styles.badgeCode}>{order.course_id}</span></td>
                    <td>{order.course_title}</td>
                    <td><strong style={{ color: '#10b981' }}>₹{order.price?.toLocaleString('en-IN')}</strong></td>
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
                          disabled={actionLoading}
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
          )}
        </div>
      </div>
    </div>
  );
}
