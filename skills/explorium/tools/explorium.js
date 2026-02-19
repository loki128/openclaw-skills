/**
 * Explorium API Tool - WORKING VERSION
 * Search for prospects using Explorium's API
 * Base URL: https://api.explorium.ai/v1/
 * Auth: api_key header (not Bearer)
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const API_KEY = '39b27640-980d-4635-90d3-4affbb8c6597';
const BASE_URL = 'https://api.explorium.ai/v1';

/**
 * Search for prospects
 */
export async function searchProspects({ title, company, location, size = 10 }) {
  const url = `${BASE_URL}/prospects`;
  
  const payload = {
    mode: "full",
    page: 1,
    size: parseInt(size) || 10,
    page_size: parseInt(size) || 10
  };
  
  // Add filters if provided
  if (title) payload.title = title;
  if (company) payload.company = company;
  if (location) payload.location = location;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X POST '${url}' \
       -H 'api_key: ${API_KEY}' \
       -H 'Content-Type: application/json' \
       -H 'accept: application/json' \
       -d '${JSON.stringify(payload)}'`
    );
    
    const data = JSON.parse(stdout);
    return formatProspects(data);
  } catch (error) {
    return `Error: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Search for businesses/companies
 */
export async function searchBusinesses({ domain, company_name, size = 10 }) {
  const url = `${BASE_URL}/businesses`;
  
  const payload = {
    mode: "full",
    page: 1,
    size: parseInt(size) || 10,
    page_size: parseInt(size) || 10
  };
  
  if (domain) payload.domain = domain;
  if (company_name) payload.company_name = company_name;
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X POST '${url}' \
       -H 'api_key: ${API_KEY}' \
       -H 'Content-Type: application/json' \
       -H 'accept: application/json' \
       -d '${JSON.stringify(payload)}'`
    );
    
    const data = JSON.parse(stdout);
    return formatBusinesses(data);
  } catch (error) {
    return `Error: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

/**
 * Get technographics for a company
 */
export async function getTechnographics({ domain }) {
  if (!domain) return 'Error: domain is required';
  
  const url = `${BASE_URL}/businesses/enrich/technographics`;
  
  const payload = { domain };
  
  try {
    const { stdout } = await execAsync(
      `curl -s -X POST '${url}' \
       -H 'api_key: ${API_KEY}' \
       -H 'Content-Type: application/json' \
       -H 'accept: application/json' \
       -d '${JSON.stringify(payload)}'`
    );
    
    const data = JSON.parse(stdout);
    return formatTechnographics(data);
  } catch (error) {
    return `Error: ${error.message}\nResponse: ${error.stdout || 'No response'}`;
  }
}

// Formatting helpers
function formatProspects(data) {
  if (!data || !data.data || data.data.length === 0) {
    return 'No prospects found.';
  }
  
  return data.data.map(p => {
    const contact = p.contact_details || {};
    const company = p.company_details || {};
    return `
- ${p.name || 'Unknown'}
  Title: ${p.title || 'N/A'}
  Company: ${company.name || 'N/A'}
  Email: ${contact.email || 'N/A'}
  Phone: ${contact.phone || 'N/A'}
  Location: ${p.location || 'N/A'}
  LinkedIn: ${p.linkedin_url || 'N/A'}
    `.trim();
  }).join('\n\n');
}

function formatBusinesses(data) {
  if (!data || !data.data || data.data.length === 0) {
    return 'No businesses found.';
  }
  
  return data.data.map(b => `
- ${b.name || 'Unknown'}
  Domain: ${b.domain || 'N/A'}
  Industry: ${b.industry || 'N/A'}
  Size: ${b.size || 'N/A'}
  Revenue: ${b.revenue || 'N/A'}
  Location: ${b.location || 'N/A'}
  Description: ${b.description || 'N/A'}
  `.trim()).join('\n\n');
}

function formatTechnographics(data) {
  if (!data || !data.data) {
    return 'No technographics found.';
  }
  
  const tech = data.data;
  return `
Technographics for ${data.entity_id || 'Unknown'}:

Marketing: ${(tech.marketing || []).join(', ') || 'N/A'}
Sales: ${(tech.sales || []).join(', ') || 'N/A'}
Productivity: ${(tech.productivity_and_operations || []).join(', ') || 'N/A'}
IT Security: ${(tech.it_security || []).join(', ') || 'N/A'}
DevOps: ${(tech.devops_and_development || []).join(', ') || 'N/A'}
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
  case 'prospects':
    searchProspects(params).then(console.log);
    break;
  case 'businesses':
    searchBusinesses(params).then(console.log);
    break;
  case 'tech':
    getTechnographics(params).then(console.log);
    break;
  default:
    console.log('Usage: node explorium.js <prospects|businesses|tech> [params...]');
    console.log('');
    console.log('Examples:');
    console.log('  node explorium.js prospects title=CEO size=10');
    console.log('  node explorium.js businesses domain=google.com');
    console.log('  node explorium.js tech domain=google.com');
}