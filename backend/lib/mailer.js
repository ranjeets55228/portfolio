const nodemailer = require('nodemailer')

async function sendMail(submission){
  // prefer SENDGRID_API_KEY if present (using SMTP endpoint)
  const { SENDGRID_API_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  let transporter

  if (SENDGRID_API_KEY && !SMTP_USER) {
    // Use SendGrid's SMTP relay if only API key provided: requires additional config; easier to use SMTP_HOST
    // fallback: throw to indicate not configured
    throw new Error('SendGrid API: please provide SMTP_USER and SMTP_PASS for SMTP relay or configure SMTP_HOST.')
  }

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    })
  } else {
    throw new Error('SMTP not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS in environment.')
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `New message from portfolio — ${submission.name}`,
    text: `Name: ${submission.name}\nEmail: ${submission.email}\n\n${submission.message}`,
    html: `<p><strong>Name:</strong> ${submission.name}</p><p><strong>Email:</strong> ${submission.email}</p><pre style="white-space:pre-wrap">${submission.message}</pre>`
  }

  const info = await transporter.sendMail(mailOptions)
  return info
}

module.exports = { sendMail }
