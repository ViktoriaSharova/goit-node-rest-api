import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const msg = { ...data, from: "slastena.vika890@gmail.com" };
    await sgMail.send(msg);
    return true;
  };

export default sendEmail;