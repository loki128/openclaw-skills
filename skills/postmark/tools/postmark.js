/**
 * Postmark Email API Tool
 * Send transactional emails
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const API_KEY = 'b547f844-05ed-47fa-971c-d92a8f86154b';
const BASE_URL = 'https://api.postmarkapp.com';
const SERVER_TOKEN = 'b547f844-05ed-47fa-971c-d92a8f86154b'; // Same as API key for server

/**
 * Send a transactional email
 */
export async function sendEmail({ to, subject, body, from, html = false }) {
  if (!to || !subject || !body) {
    return 'Error: to, subject, and body are required';
  }
  
  // Default from address (should be configured)
  const fromAddress = from || 'noreply@example.com';
  
  const payload = {
    From: fromAddress,
    To: to,
    Subject: subject,
    TextBody: html ? undefined : body,
    HtmlBody: html ? body : undefined,
    MessageStream: 'outbound'
  };
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X POST '${BASE_URL}/email' \
       -H 'Accept: application/json' \
       -H 'Content-Type: application/json' \
       -H 'X-Postmark-Server-Token: ${SERVER_TOKEN}' \
       -d '${JSON.stringify(payload)}'`
    );
    
    const data = JSON.parse(stdout);
    
    if (data.ErrorCode) {
      return `Error: ${data.Message}`;
    }
    
    return `Email sent!\nTo: ${to}\nSubject: ${subject}\nMessage ID: ${data.MessageID}\nStatus: ${data.Message}`;
  } catch (error) {
    return `Error sending email: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Send email using template
 */
export async function sendTemplate({ to, template_id, template_model, from }) {
  if (!to || !template_id) {
    return 'Error: to and template_id are required';
  }
  
  const fromAddress = from || 'noreply@example.com';
  
  const payload = {
    From: fromAddress,
    To: to,
    TemplateId: parseInt(template_id),
    TemplateModel: template_model ? JSON.parse(template_model) : {},
    MessageStream: 'outbound'
  };
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X POST '${BASE_URL}/email/withTemplate' \
       -H 'Accept: application/json' \
       -H 'Content-Type: application/json' \
       -H 'X-Postmark-Server-Token: ${SERVER_TOKEN}' \
       -d '${JSON.stringify(payload)}'`
    );
    
    const data = JSON.parse(stdout);
    
    if (data.ErrorCode) {
      return `Error: ${data.Message}`;
    }
    
    return `Template email sent!\nTo: ${to}\nTemplate: ${template_id}\nMessage ID: ${data.MessageID}`;
  } catch (error) {
    return `Error sending template: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Check email delivery status
 */
export async function checkStatus({ message_id }) {
  if (!message_id) {
    return 'Error: message_id is required';
  }
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X GET '${BASE_URL}/messages/outbound/${message_id}/details' \
       -H 'Accept: application/json' \
       -H 'X-Postmark-Server-Token: ${SERVER_TOKEN}'`
    );
    
    const data = JSON.parse(stdout);
    return formatMessageDetails(data);
  } catch (error) {
    return `Error checking status: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Get bounce reports
 */
export async function getBounces({ count = 10 }) {
  try {
    const { stdout } = await execAsync(
      `curl -s -X GET '${BASE_URL}/bounces?count=${count}' \
       -H 'Accept: application/json' \
       -H 'X-Postmark-Server-Token: ${SERVER_TOKEN}'`
    );
    
    const data = JSON.parse(stdout);
    
    if (!data.Bounces || data.Bounces.length === 0) {
      return 'No bounces found.';
    }
    
    return data.Bounces.map(b => `
- ${b.Email}
  Type: ${b.Type}
  Subject: ${b.Subject}
  Bounced At: ${b.BouncedAt}
    `.trim()).join('\n\n');
  } catch (error) {
    return `Error getting bounces: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

// Formatting helpers
function formatMessageDetails(data) {
  if (!data) return 'Message not found.';
  
  return `
Message Details:
- ID: ${data.MessageID}
- To: ${data.Recipient}
- Subject: ${data.Subject}
- Status: ${data.Status}
- Sent At: ${data.SentAt || 'N/A'}
- Delivered At: ${data.DeliveredAt || 'Pending'}
- Opened: ${data.ReadAt ? 'Yes at ' + data.ReadAt : 'No'}
  `.trim();
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
  case 'template':
    sendTemplate(params).then(console.log);
    break;
  case 'status':
    checkStatus(params).then(console.log);
    break;
  case 'bounces':
    getBounces(params).then(console.log);
    break;
  default:
    console.log('Usage: node postmark.js <send|template|status|bounces> [params...]');
    console.log('');
    console.log('Examples:');
    console.log('  node postmark.js send to=john@example.com subject=Hello body="Message"');
    console.log('  node postmark.js template to=john@example.com template_id=12345');
    console.log('  node postmark.js status message_id=abc-123');
    console.log('  node postmark.js bounces count=10');
}