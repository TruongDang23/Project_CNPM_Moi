import nodemailer from 'nodemailer'
import { htmlToText } from 'html-to-text'

class Email {
  constructor(user, url) {
    this.to = user.Email
    this.firstName = user.HoTen.split(' ')[0]
    this.url = url
    this.from = `Your Company <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  generateHtml(subject, newPassword) {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>${subject}</h2>
        <p>Chào ${this.firstName},</p>
        <p>Mật khẩu mới của bạn là: <strong>${newPassword}</strong></p>
        <p>Vui lòng đăng nhập và thay đổi mật khẩu của bạn ngay lập tức.</p>
        <p>Trân trọng,</p>
        <p>Your Company</p>
      </div>
    `
  }

  async send(subject, newPassword) {
    const html = this.generateHtml(subject, newPassword)
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  async sendNewPassword(newPassword) {
    await this.send('Mật khẩu mới của bạn', newPassword)
  }
}

export default Email
