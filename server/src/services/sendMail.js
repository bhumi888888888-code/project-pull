import nodeMailer from "nodeMailer";
import { ENV } from "../lib/ENV.js";

const sendMail = async ({to, subject, message, template, data}) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASSWORD,
    }
  });

  if (template) {
    transporter.use('compile', hbs({
      viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve('./views/emails'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views/emails'),
      extName: ".hbs",
    }));
  }

  const mailOptions = {
    from: ENV.SMTP_USER,
    to,
    subject,
    html: message,
    template: template,
    context: data,
  }

  const info = await transporter.sendMail(mailOptions)

  return info;

}

export default sendMail;
