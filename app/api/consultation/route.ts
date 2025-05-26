import { NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/utils/email'
import { insertDocument, collections } from '@/utils/db'
import { createCalendarEvent, checkAvailability } from '@/utils/calendar'

export async function POST(req: Request) {
  try {
    const { name, email, program, preferredDate, message } = await req.json()

    // Validate inputs
    if (!name || !email || !program || !preferredDate) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate date is in the future
    const bookingDate = new Date(preferredDate)
    if (bookingDate < new Date()) {
      return NextResponse.json(
        { error: 'Consultation date must be in the future' },
        { status: 400 }
      )
    }

    // Check calendar availability
    const isAvailable = await checkAvailability(preferredDate)
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Selected time slot is not available' },
        { status: 400 }
      )
    }

    // Create calendar event
    const calendarResult = await createCalendarEvent({
      name,
      email,
      program,
      date: preferredDate,
      message,
    })

    if (!calendarResult.success) {
      throw new Error('Failed to create calendar event')
    }

    // Store in database with calendar event details
    const dbResult = await insertDocument(collections.consultations, {
      name,
      email,
      program,
      preferredDate: bookingDate,
      message,
      status: 'confirmed',
      eventId: calendarResult.eventId,
      meetLink: calendarResult.meetLink,
    })

    if (!dbResult.success) {
      throw new Error('Failed to store consultation booking')
    }

    // Send notification email to admin
    const adminTemplate = emailTemplates.consultation(name, email, program, preferredDate, message)
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@enoeka.com',
      subject: adminTemplate.subject,
      html: adminTemplate.html + `<p>Google Meet Link: ${calendarResult.meetLink}</p>`,
    })

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error)
    }

    // Send confirmation email to user
    const userTemplate = emailTemplates.confirmConsultation(name, program, preferredDate)
    const userEmailResult = await sendEmail({
      to: email,
      subject: userTemplate.subject,
      html: userTemplate.html + `
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="margin: 0;"><strong>Meeting Link:</strong> <a href="${calendarResult.meetLink}">${calendarResult.meetLink}</a></p>
          <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
            Click the link above to join the meeting at the scheduled time.
          </p>
        </div>
      `,
    })

    if (!userEmailResult.success) {
      console.error('Failed to send user confirmation:', userEmailResult.error)
    }

    return NextResponse.json(
      { 
        message: 'Consultation booked successfully',
        data: { 
          name, 
          email, 
          program, 
          preferredDate: bookingDate.toISOString(),
          message,
          meetLink: calendarResult.meetLink,
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Consultation booking error:', error)
    return NextResponse.json(
      { error: 'Failed to book consultation' },
      { status: 500 }
    )
  }
} 