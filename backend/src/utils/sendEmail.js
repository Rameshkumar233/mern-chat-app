import  brevo  from "@getbrevo/brevo"
import { verificationEmailTemplate, welcomeEmailTemplate } from "./emailTemplate.js";

const isDev = process.env.NODE_ENV === "development";

const apiInstance = new brevo.TransactionalEmailsApi()
const apiKey = apiInstance.authentications["apiKey"]
apiKey.apiKey = process.env.BREVO_API_KEY


export const sendVerificationEmail = async (to, verificationToken) => {
    const emailData = {
        sender: {email : process.env.EMAIL_USER},
        to: [{email: isDev ? process.env.EMAIL_USER : to}],
        subject: "Verify Email Address",
        htmlContent: verificationEmailTemplate(verificationToken)
    }

    try {
        const info = await apiInstance.sendTransacEmail(emailData);
        console.log("Verify Email sent successfully", info.body);
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email ${error}`);
    }
};

export const sendWelcomeEmail = async (to, username) => {
    const emailData = {
        sender: {email : process.env.EMAIL_USER},
        to: [{email: isDev ? process.env.EMAIL_USER : to}],
        subject: "Welcome to Chat App",
        htmlContent: welcomeEmailTemplate(username)
    }
    try {
        const info = await apiInstance.sendTransacEmail(emailData);
        console.log("Welcome Email sent successfully", info.body);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email ${error}`);
    }
};
