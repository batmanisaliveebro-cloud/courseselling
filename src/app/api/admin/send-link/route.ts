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
      from: 'CourseHub <onboarding@resend.dev>', // Change to your verified domain for production
      to: [userEmail],
      subject: `Your access to ${courseTitle} is ready!`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #000000; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">CourseHub</h1>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #111827; font-size: 20px; margin-top: 0;">Your Course is Ready!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Your exclusive access to <strong>${courseTitle}</strong> has been granted. You can now access all premium modules, resources, and materials via the secure Google Drive link below.</p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${driveLink}" style="background-color: #10b981; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">Access Course Materials</a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; border-left: 4px solid #e5e7eb; padding-left: 15px; margin-bottom: 30px;">
              <strong>Note:</strong> This link is strictly tied to your registered email address. Do not share this link with anyone else as it may result in an automated ban.
            </p>
            
            <p style="color: #4b5563; font-size: 14px;">Happy learning!</p>
            <p style="color: #4b5563; font-size: 14px; margin-top: 5px;">- The CourseHub Team</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #eaeaea;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} CourseHub Inc. All rights reserved.</p>
          </div>
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
