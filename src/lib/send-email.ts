'use server'

import nodemailer from 'nodemailer'

const SMTP_SERVER_USERNAME = process.env.MAIL_USER
const SMTP_SERVER_PASSWORD = process.env.MAIL_PASS

export async function sendMailAction(formData: FormData) {
  const email = formData.get('email') as string

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `"Next App" <${SMTP_SERVER_USERNAME}>`,
      to: email,
      subject: 'Seu Número da Sorte 🎲',
      html: `<h1>Olá!</h1><p>Seu número da sorte é <strong>${Math.floor(Math.random() * 10000)}</strong>.</p>`,
    })

    console.log('✅ E-mail enviado:', info.messageId)
    return { success: true }
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error)
    return { success: false }
  }
}
