/**
 * Nylas Email API Tool
 * Unified email access through Nylas
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const API_KEY = 'nyk_v0_ZzZjxJobzBoeGWC3V1tDtQE0puix7pjtPlkXVOk3Ekw1sThzxu92waPvb7wJr7Kv';
const BASE_URL = 'https://api.nylas.com/v3';

/**
 * Check latest emails
 */
export async function checkEmail({ limit = 10, unread_only = false }) {
  const url = `${BASE_URL}/messages`;
  
  const queryParams = new URLSearchParams();
  queryParams.append('limit', String(limit));
  if (unread_only) queryParams.append('unread', 'true');
  
  const fullUrl = `${url}?${queryParams.toString()}`;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X GET '${fullUrl}' \
       -H 'Authorization: Bearer ${API_KEY}' \
       -H 'Accept: application/json'`
    );
    
    const data = JSON.parse(stdout);
    return formatEmails(data);
  } catch (error) {
    return `Error checking email: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Send an email
 */
export async function sendEmail({ to, subject, body, from }) {
  if (!to || !subject || !body) {
    return 'Error: to, subject, and body are required';
  }
  
  const url = `${BASE_URL}/messages`;
  
  const payload = {
    subject: subject,
    body: body,
    to: [{ email: to }]
  };
  
  if (from) payload.from = [{ email: from }];
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X POST '${url}' \
       -H 'Authorization: Bearer ${API_KEY}' \
       -H 'Content-Type: application/json' \
       -H 'Accept: application/json' \
       -d '${JSON.stringify(payload)}'`
    );
    
    const data = JSON.parse(stdout);
    return `Email sent successfully!\nID: ${data.id || 'N/A'}`;
  } catch (error) {
    return `Error sending email: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Search emails
 */
export async function searchEmails({ query, from, to, limit = 10 }) {
  const url = `${BASE_URL}/messages/search`;
  
  const payload = {
    query: query || '',
    limit: parseInt(limit) || 10
  };
  
  if (from) payload.from = from;
  if (to) payload.to = to;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X POST '${url}' \
       -H 'Authorization: Bearer ${API_KEY}' \
       -H 'Content-Type: application/json' \
       -H 'Accept: application/json' \
       -d '${JSON.stringify(payload)}'`
    );
    
    const data = JSON.parse(stdout);
    return formatEmails(data);
  } catch (error) {
    return `Error searching emails: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Get unread count
 */
export async function getUnreadCount() {
  const url = `${BASE_URL}/messages?unread=true&limit=1`;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X GET '${url}' \
       -H 'Authorization: Bearer ${API_KEY}' \
       -H 'Accept: application/json'`
    );
    
    const data = JSON.parse(stdout);
    const count = data.total_count || data.length || 0;
    return `Unread emails: ${count}`;
  } catch (error) {
    return `Error getting unread count: ${error.message}`;
  }
}

// Formatting helpers
function formatEmails(data) {
  if (!data || !data.data || data.data.length === 0) {
    return 'No emails found.';
  }
  
  return data.data.map(e => {
    const from = e.from && e.from[0] ? e.from[0].email : 'Unknown';
    const subject = e.subject || '(No subject)';
    const date = e.date ? new Date(e.date).toLocaleDateString() : 'Unknown date';
    const unread = e.unread ? ' [UNREAD]' : '';
    
    return `
- ${subject}${unread}
  From: ${from}
  Date: ${date}
  ID: ${e.id}
    `.trim();
  }).join('\n\n');
}

// CLI interface
const [,, command, ...args] = process.argv;

const params = {};
args.forEach(arg => {
  const [key, value] = arg.split('=');
  if (key && value) params[key] = value;
});

switch (command) {
  case 'check':
    checkEmail(params).then(console.log);
    break;
  case 'send':
    sendEmail(params).then(console.log);
    break;
  case 'search':
    searchEmails(params).then(console.log);
    break;
  case 'unread':
    getUnreadCount().then(console.log);
    break;
  default:
    console.log('Usage: node nylas.js <check|send|search|unread> [params...]');
    console.log('');
    console.log('Examples:');
    console.log('  node nylas.js check limit=10');
    console.log('  node nylas.js send to=john@example.com subject=Hello body="Message text"');
    console.log('  node nylas.js search query=invoice');
    console.log('  node nylas.js unread');
}