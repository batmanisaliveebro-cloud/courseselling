import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userEmail, courseTitle, price } = body;

    if (!userEmail || !courseTitle || price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'CourseHub <onboarding@resend.dev>', // Change to your verified domain (e.g. noreply@yourdomain.com) for production
      to: [userEmail],
      subject: `Payment Successful: ${courseTitle}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #000000; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">CourseHub</h1>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #111827; font-size: 20px; margin-top: 0;">Payment Confirmed</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Thank you for your purchase! We have successfully received your payment of <strong>₹${price.toLocaleString('en-IN')}</strong> for <strong>${courseTitle}</strong>.</p>
            
            <div style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin: 30px 0;">
              <h3 style="color: #111827; margin-top: 0; font-size: 16px;">What happens next?</h3>
              <p style="color: #4b5563; font-size: 14px; margin-bottom: 0;">Our admin team is currently setting up your secure Google Drive access. You will receive a second email containing your exclusive access link very shortly.</p>
            </div>
            
            <p style="color: #4b5563; font-size: 14px;">If you have any questions, simply reply to this email. We're here to help.</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #eaeaea;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} CourseHub Inc. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send receipt email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Server error sending receipt:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
