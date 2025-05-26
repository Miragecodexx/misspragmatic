import { google } from 'googleapis'

// Initialize the Google Calendar API client
const calendar = google.calendar({
  version: 'v3',
  auth: new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  ),
})

// Set up OAuth2 client with refresh token
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
})

calendar.context._options.auth = oauth2Client

export async function createCalendarEvent({
  name,
  email,
  program,
  date,
  message,
}: {
  name: string
  email: string
  program: string
  date: string
  message?: string
}) {
  try {
    const event = {
      summary: `Consultation: ${program} with ${name}`,
      description: `
Program: ${program}
Client: ${name}
Email: ${email}
${message ? `\nAdditional Notes: ${message}` : ''}
      `.trim(),
      start: {
        dateTime: new Date(date).toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
        timeZone: 'UTC',
      },
      attendees: [
        { email },
        { email: process.env.ADMIN_EMAIL || 'admin@enoeka.com' },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    }

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
      conferenceDataVersion: 1,
    })

    return {
      success: true,
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
    }
  } catch (error) {
    console.error('Google Calendar error:', error)
    return { success: false, error }
  }
}

export async function checkAvailability(date: string): Promise<boolean> {
  try {
    const startTime = new Date(date)
    const endTime = new Date(new Date(date).getTime() + 60 * 60 * 1000) // 1 hour later

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    })

    const busySlots = response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || '']?.busy || []
    return busySlots.length === 0
  } catch (error) {
    console.error('Availability check error:', error)
    return false
  }
}

export async function getAvailableSlots(startDate: Date, days: number = 7) {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + days)

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    })

    const busySlots = response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || '']?.busy || []
    const availableSlots = []

    // Generate available slots for each day
    for (let d = 0; d < days; d++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + d)

      // Business hours: 9 AM to 5 PM
      for (let hour = 9; hour < 17; hour++) {
        const slotStart = new Date(currentDate)
        slotStart.setHours(hour, 0, 0, 0)

        const slotEnd = new Date(slotStart)
        slotEnd.setHours(slotStart.getHours() + 1)

        // Check if slot overlaps with any busy period
        const isAvailable = !busySlots.some(
          (busy) =>
            new Date(busy.start) < slotEnd && new Date(busy.end) > slotStart
        )

        if (isAvailable && slotStart > new Date()) {
          availableSlots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
          })
        }
      }
    }

    return { success: true, slots: availableSlots }
  } catch (error) {
    console.error('Available slots error:', error)
    return { success: false, error }
  }
} 