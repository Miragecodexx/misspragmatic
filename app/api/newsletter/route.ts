import { NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/utils/email'
import { insertDocument, collections } from '@/utils/db'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Store in database
    const dbResult = await insertDocument(collections.newsletter, { email })
    if (!dbResult.success) {
      throw new Error('Failed to store subscription')
    }

    // Send welcome email
    const template = emailTemplates.newsletter(email)
    const emailResult = await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    })

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error)
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        email 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
} 