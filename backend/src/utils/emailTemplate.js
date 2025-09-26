export const verificationEmailTemplate = (code) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
          color: #333333;
        }
        .code {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
          margin: 20px 0;
        }
        p {
          color: #555555;
          font-size: 14px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Verify your email</h2>
        <p>Thank you for signing up for our Chat App! 
        Please use the code below to verify your email address:</p>
        <div class="code">${code}</div>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Chat App. All rights reserved.
        </div>
      </div>
    </body>
  </html>
`;

export const welcomeEmailTemplate = (username) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #4a90e2;">Welcome to Chat One App, ${username}!</h2>
    <p>We’re thrilled to have you join our community. Get ready to enjoy seamless chatting and explore cool features:</p>
    <ul style="text-align: left; display: inline-block; padding-left: 20px;">
      <li>Send messages and share images effortlessly</li>
      <li>Customize your chat theme and preview chat theme instantly</li>
      <li>Manage your profile with easy update</li>
      <li>Stay in control — logout anytime securely</li>
    </ul>
    <p style="margin-top: 20px;">Start chatting and make the most out of Chat One App! 🚀</p>
    <p style="font-size: 12px; color: #888;">If you didn’t sign up for Chat One App, you can safely ignore this email.</p>
  </div>`;
