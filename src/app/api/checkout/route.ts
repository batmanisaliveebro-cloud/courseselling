import { NextResponse } from 'next/server';
import axios from 'axios';

// Ensure these are NOT prefixed with NEXT_PUBLIC_ for maximum security
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// Use sandbox for dev, change to https://api.cashfree.com/pg/orders for production
const isProduction = process.env.CASHFREE_ENVIRONMENT === 'production';
const CASHFREE_URL = isProduction 
  ? 'https://api.cashfree.com/pg/orders' 
  : 'https://sandbox.cashfree.com/pg/orders';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId, price, customerEmail, customerPhone = '9999999999', customerId = 'user_123' } = body;

    // Securely generate a unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Call Cashfree API securely from the backend
    const response = await axios.post(
      CASHFREE_URL,
      {
        order_amount: price,
        order_currency: 'INR',
        order_id: orderId,
        customer_details: {
          customer_id: customerId,
          customer_phone: customerPhone,
          customer_email: customerEmail,
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/${courseId}?order_id={order_id}`,
        },
      },
      {
        headers: {
          'x-client-id': CASHFREE_APP_ID || 'placeholder_app_id',
          'x-client-secret': CASHFREE_SECRET_KEY || 'placeholder_secret_key',
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      }
    );

    // Return only the payment_session_id to the client (highly secure)
    return NextResponse.json({
      payment_session_id: response.data.payment_session_id,
      order_id: orderId,
    });
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message;
    console.error('Cashfree API Error:', errorDetails);
    return NextResponse.json(
      { 
        error: 'Failed to generate payment session securely.', 
        details: errorDetails
      },
      { status: 500 }
    );
  }
}
