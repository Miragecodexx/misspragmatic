import sgMail from '@sendgrid/mail'

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) => {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM || 'noreply@enoeka.com',
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('SendGrid error:', error)
    return { success: false, error }
  }
}

export const emailTemplates = {
  newsletter: (email: string) => ({
    subject: 'Welcome to Eno Eka's Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Our Community!</h2>
        <p>Dear valued subscriber,</p>
        <p>Thank you for joining Eno Eka's newsletter. Get ready to receive exclusive insights, career tips, and industry trends directly in your inbox.</p>
        <p>Your first newsletter will arrive this Monday.</p>
        <p>Best regards,<br>Eno Eka</p>
      </div>
    `,
  }),

  contact: (name: string, email: string, message: string) => ({
    subject: 'New Contact Form Submission',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `,
  }),

  consultation: (name: string, email: string, program: string, date: string, message: string) => ({
    subject: 'New Consultation Booking',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Consultation Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Preferred Date:</strong> ${new Date(date).toLocaleString()}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message provided.'}</p>
      </div>
    `,
  }),

  confirmConsultation: (name: string, program: string, date: string) => ({
    subject: 'Your Consultation with Eno Eka is Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Consultation Confirmed!</h2>
        <p>Dear ${name},</p>
        <p>Your consultation for the ${program} program has been confirmed for:</p>
        <p style="font-size: 18px; font-weight: bold;">${new Date(date).toLocaleString()}</p>
        <p>Please make sure to:</p>
        <ul>
          <li>Be available 5 minutes before the scheduled time</li>
          <li>Have a stable internet connection</li>
          <li>Prepare any specific questions you'd like to discuss</li>
        </ul>
        <p>Looking forward to speaking with you!</p>
        <p>Best regards,<br>Eno Eka</p>
      </div>
    `,
  }),
} 