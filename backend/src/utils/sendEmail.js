import transporter from "../config/email.config.js";
import { verificationEmailTemplate, welcomeEmailTemplate } from "./emailTemplate.js";

export const sendVerificationEmail = async (to, verificationToken) => {
    let recipient = [to];
    try {
        let response = await transporter.sendMail({
            from: `"Chat app" <${process.env.EMAIL_USER || "no-reply@chatone-app.com"}>`,
            to: recipient,
            subject: "Verify Email Address",
            html: verificationEmailTemplate(verificationToken),
        });

        console.log("Email sent successfully", response.envelope);
    } catch (error) {
        console.error("Error in sending verification email", error);
        throw new Error(`Error in sending verification email ${error}`);
    }
};

export const sendWelcomeEmail = async (to, username) => {
    let recipient = [to];
    try {
        let response = await transporter.sendMail({
            from: `"Chat app" <${process.env.EMAIL_USER || "no-reply@chatone-app.com"}> `,
            to: recipient,
            subject: "Welcome to Chat One app",
            html: welcomeEmailTemplate(username),
        });

        console.log("Welcome Email sent successfully", response.envelope);
    } catch (error) {
        console.error("Error in sending welcome email", error);
        throw new Error(`Error in sending welcome email ${error}`);
    }
};
