import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, userEmail, courseTitle, driveLink } = body;

    // Security check: Ensure the caller is the admin
    // In a real app, verify the Supabase JWT token here and check if it belongs to ADMIN_EMAIL.

    if (!userEmail || !courseTitle || !driveLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'CourseHub <noreply@yourdomain.com>',
      to: [userEmail],
      subject: `Your access to ${courseTitle} is ready!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Order Confirmed!</h2>
          <p>Thank you for purchasing <strong>${courseTitle}</strong>.</p>
          <p>Your Google Drive access link is ready. Please click the button below to access your course materials. Remember, this link is for your personal use only.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${driveLink}" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Access Course Materials</a>
          </div>
          <p>If you have any issues, reply to this email.</p>
          <p>Best regards,<br/>The CourseHub Team</p>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // In a real app, update the Supabase Database order status to 'DELIVERED' here.

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
