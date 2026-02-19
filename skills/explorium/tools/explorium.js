/**
 * Explorium API Tool
 * Search for companies and leads
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const execAsync = promisify(exec);

// Load config
const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = join(__dirname, '..', 'config.yaml');

let config = { api_key: '', base_url: 'https://api.explorium.ai/v1' };
try {
  const configContent = readFileSync(configPath, 'utf8');
  // Simple YAML parsing
  configContent.split('\n').forEach(line => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      config[key] = value.replace(/^["']|["']$/g, '');
    }
  });
} catch (e) {
  console.error('Config load error:', e.message);
}

/**
 * Search for companies using Explorium API
 */
export async function searchCompanies({ industry, location, size, limit = 10 }) {
  const url = `${config.base_url}/companies/search`;
  
  const queryParams = new URLSearchParams();
  if (industry) queryParams.append('industry', industry);
  if (location) queryParams.append('location', location);
  if (size) queryParams.append('size', size);
  queryParams.append('limit', String(limit));
  
  const fullUrl = `${url}?${queryParams.toString()}`;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -H "Authorization: Bearer ${config.api_key}" "${fullUrl}"`
    );
    
    const data = JSON.parse(stdout);
    return formatCompanies(data);
  } catch (error) {
    return `Error searching companies: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Get detailed info about a specific company
 */
export async function getCompany({ domain }) {
  const url = `${config.base_url}/companies/${domain}`;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -H "Authorization: Bearer ${config.api_key}" "${url}"`
    );
    
    const data = JSON.parse(stdout);
    return formatCompanyDetail(data);
  } catch (error) {
    return `Error getting company: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Find leads/contacts for companies
 */
export async function findLeads({ company, title, location, limit = 10 }) {
  const url = `${config.base_url}/leads/search`;
  
  const queryParams = new URLSearchParams();
  if (company) queryParams.append('company', company);
  if (title) queryParams.append('title', title);
  if (location) queryParams.append('location', location);
  queryParams.append('limit', String(limit));
  
  const fullUrl = `${url}?${queryParams.toString()}`;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -H "Authorization: Bearer ${config.api_key}" "${fullUrl}"`
    );
    
    const data = JSON.parse(stdout);
    return formatLeads(data);
  } catch (error) {
    return `Error finding leads: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

// Formatting helpers
function formatCompanies(data) {
  if (!data || !data.companies || data.companies.length === 0) {
    return 'No companies found.';
  }
  
  return data.companies.map(c => 
    `- ${c.name} (${c.domain})\n  Industry: ${c.industry}\n  Location: ${c.location}\n  Size: ${c.size || 'Unknown'}`
  ).join('\n\n');
}

function formatCompanyDetail(data) {
  if (!data) return 'Company not found.';
  
  return `
# ${data.name}
- Domain: ${data.domain}
- Industry: ${data.industry}
- Location: ${data.location}
- Size: ${data.size || 'Unknown'}
- Revenue: ${data.revenue || 'Unknown'}
- Description: ${data.description || 'No description'}
  `.trim();
}

function formatLeads(data) {
  if (!data || !data.leads || data.leads.length === 0) {
    return 'No leads found.';
  }
  
  return data.leads.map(l =>
    `- ${l.name}\n  Title: ${l.title}\n  Company: ${l.company}\n  Email: ${l.email || 'N/A'}\n  LinkedIn: ${l.linkedin || 'N/A'}`
  ).join('\n\n');
}

// CLI interface
const [,, command, ...args] = process.argv;

const params = {};
args.forEach(arg => {
  const [key, value] = arg.split('=');
  if (key && value) params[key] = value;
});

switch (command) {
  case 'search':
    searchCompanies(params).then(console.log);
    break;
  case 'company':
    getCompany(params).then(console.log);
    break;
  case 'leads':
    findLeads(params).then(console.log);
    break;
  default:
    console.log('Usage: node explorium.js <search|company|leads> [params...]');
}