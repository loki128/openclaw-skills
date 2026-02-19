/**
 * Gmail SMTP Tool
 * Send emails via Gmail using App Password
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const EMAIL = 'lukita@cleopatradelights.com';
const APP_PASSWORD = 'cnus hxpm ovvg ceqw';

/**
 * Send email via Gmail SMTP
 */
export async function sendEmail({ to, subject, body }) {
  if (!to || !subject || !body) {
    return 'Error: to, subject, and body are required';
  }
  
  // Create email content
  const emailContent = `From: ${EMAIL}
To: ${to}
Subject: ${subject}
Content-Type: text/plain; charset=utf-8

${body}`;
  
  try {
    // Use curl with SMTP
    const { stdout, stderr } = await execAsync(
      `echo '${emailContent.replace(/'/g, "'\\''")}' | curl -s --url 'smtps://smtp.gmail.com:465' \
       --ssl-reqd \
       --mail-from '${EMAIL}' \
       --mail-rcpt '${to}' \
       --user '${EMAIL}:${APP_PASSWORD}' \
       --upload-file -`
    );
    
    if (stderr && !stderr.includes('100')) {
      return `Error: ${stderr}`;
    }
    
    return `Email sent successfully!\nTo: ${to}\nSubject: ${subject}`;
  } catch (error) {
    return `Error sending email: ${error.message}`;
  }
}

// CLI interface
const [,, command, ...args] = process.argv;

const params = {};
args.forEach(arg => {
  const [key, value] = arg.split('=');
  if (key && value) params[key] = value;
});

switch (command) {
  case 'send':
    sendEmail(params).then(console.log);
    break;
  default:
    console.log('Usage: node gmail.js send to=email@example.com subject="Subject" body="Message"');
}