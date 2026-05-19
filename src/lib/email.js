import nodemailer from 'nodemailer';
import { getLogger } from './logger';

const logger = getLogger('EmailService');

// Create reusable transporter object using the default SMTP transport
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    logger.warn('SMTP credentials not fully provided. Falling back to mock email service.');
    return {
      sendMail: async (options) => {
        logger.info(`[MOCK EMAIL] Sent to: ${options.to}, Subject: ${options.subject}`);
        logger.debug(`[MOCK EMAIL BODY]:\n${options.html || options.text}`);
        return { messageId: 'mock-email-id' };
      }
    };
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port || '587', 10),
    secure: port === '465', // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

export const transporter = createTransporter();

/**
 * Send an email
 * @param {Object} options - Email options ({ to, subject, text, html })
 */
export const sendEmail = async (options) => {
  try {
    const from = process.env.SMTP_FROM || '"Shree Balaji" <noreply@shreebalaji.in>';
    const info = await transporter.sendMail({
      from,
      ...options,
    });
    logger.info(`Email sent to ${options.to} (MessageID: ${info.messageId})`);
    return true;
  } catch (error) {
    logger.error(`Failed to send email to ${options.to}:`, error.message);
    return false;
  }
};

/**
 * Send a welcome email
 * @param {string} email - The recipient's email address
 * @param {string} username - The display name / username
 */
export const sendWelcomeEmail = async (email, username) => {
  if (!email || !email.includes('@')) {
    // username-only registrations won't have a valid email — skip silently
    return false;
  }

  return sendEmail({
    to: email,
    subject: 'Welcome to Shree Balaji Platform!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5;">Welcome, ${username}!</h2>
        <p>Thank you for registering at Shree Balaji. We're excited to have you onboard.</p>
        <p>Start exploring our premium courses and take your tech career to the next level.</p>
        <br/>
        <p>Best regards,<br/>The Shree Balaji Team</p>
      </div>
    `,
    text: `Welcome ${username}! Thank you for registering at Shree Balaji. Start exploring our premium courses today.`
  });
};
