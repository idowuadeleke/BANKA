const nodemailer = require('nodemailer');

class Helper {
  static async sendEmail(receiver, data, req, res) {
    try {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'noreply.banka@gmail.com',
          pass: '@delek34567',
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"BANKA" <noreply.banka@gmail.com>',
        to: receiver,
        subject: `${data.type} alert notification`,
        html: ` Hi <b>Idowu,</b>
                <p>Your account ${data.accountnumber} has been ${data.type}ed with ₦${data.amount}.<p>
                <p> Balance : ₦${data.newbalance} </p>`,
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

export default Helper;
