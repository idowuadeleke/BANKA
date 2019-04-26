import dotenv from 'dotenv';
const nodemailer = require('nodemailer');

dotenv.config();

class EmailNotificationMarshal {
  static async sendEmail(receiver, data, req, res) {
    try {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAILPASSWORD,
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: `"BANKA" <${process.env.EMAIL}>`,
        to: receiver,
        subject: `${data.type} notification`,
        html: ` Hi,
                <p>Your account ${data.accountNumber} has been ${data.type}ed with ₦${data.amount}.<p>
                <p> Balance : ₦${data.newBalance} </p>`,
      });

      return 'email sent';
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'An error occured while sending email',
      });
    }
  }
}

export default EmailNotificationMarshal;
