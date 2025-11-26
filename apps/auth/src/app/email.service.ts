import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendPasswordResetEmail(email: string, token: string) {
    // TODO: Implement actual email sending logic (e.g., using nodemailer, SendGrid, etc.)
    // For now, we'll just log it. In production, replace this with actual email service
    
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    
    console.log('\n========================================');
    console.log('📧 Password Reset Email');
    console.log('========================================');
    console.log(`To: ${email}`);
    console.log(`Subject: Password Reset Request`);
    console.log(`Reset Link: ${resetLink}`);
    console.log('\n🔑 RESET TOKEN (Copy this exactly):');
    console.log('----------------------------------------');
    console.log(token);
    console.log('----------------------------------------');
    console.log(`Token Length: ${token.length} characters`);
    console.log('========================================\n');
    
    // In production, uncomment and configure:
    // await this.sendEmail({
    //   to: email,
    //   subject: 'Password Reset Request',
    //   html: `
    //     <h2>Password Reset Request</h2>
    //     <p>You requested to reset your password. Click the link below to reset it:</p>
    //     <a href="${resetLink}">Reset Password</a>
    //     <p>Or copy this token: ${token}</p>
    //     <p>This link will expire in 1 hour.</p>
    //   `,
    // });
    
    return { success: true, message: 'Password reset email sent' };
  }
}

