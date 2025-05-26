import { NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/utils/email'
import { insertDocument, collections } from '@/utils/db'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Store in database
    const dbResult = await insertDocument(collections.contacts, {
      name,
      email,
      message,
    })

    if (!dbResult.success) {
      throw new Error('Failed to store contact submission')
    }

    // Send notification email to admin
    const template = emailTemplates.contact(name, email, message)
    const emailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@enoeka.com',
      subject: template.subject,
      html: template.html,
    })

    if (!emailResult.success) {
      console.error('Failed to send notification email:', emailResult.error)
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        data: { name, email, message }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 