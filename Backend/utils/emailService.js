const nodemailer = require('nodemailer');

// Create transporter (configure with your email service)
const createTransporter = () => {
  // For Gmail
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD 
    }
  });

};


// Send password reset email
const sendPasswordResetEmail = async (email, resetToken, resetUrl) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@kashmate.com',
      to: email,
      subject: 'Reset Your KashMate Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #14b8a6, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">KashMate</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Financial Companion</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Hello,
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              You recently requested to reset your password for your KashMate account. 
              Click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: #14b8a6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              <strong>Important:</strong> This link will expire in 1 hour for security reasons.
            </p>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              If you didn't request this password reset, please ignore this email. 
              Your password will remain unchanged.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Best regards,<br>
              The KashMate Team
            </p>
          </div>
        </div>
      `,
      text: `
        Reset Your KashMate Password
        
        Hello,
        
        You recently requested to reset your password for your KashMate account.
        
        Click the link below to reset your password:
        ${resetUrl}
        
        This link will expire in 1 hour for security reasons.
        
        If you didn't request this password reset, please ignore this email.
        Your password will remain unchanged.
        
        Best regards,
        The KashMate Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

// Send welcome email (for new registrations)
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@kashmate.com',
      to: email,
      subject: 'Welcome to KashMate!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #14b8a6, #0d9488); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">KashMate</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Financial Companion</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Welcome to KashMate!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Hello ${name},
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Welcome to KashMate! Your account has been successfully created and you're now ready to start managing your finances smarter.
            </p>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #2d5a2d; margin-top: 0;">What you can do with KashMate:</h3>
              <ul style="color: #2d5a2d;">
                <li>Track your income and expenses</li>
                <li>Get AI-powered financial insights</li>
                <li>View detailed monthly reports</li>
                <li>Set and achieve financial goals</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Start your financial journey today by logging into your account!
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Best regards,<br>
              The KashMate Team
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendWelcomeEmail
}; 