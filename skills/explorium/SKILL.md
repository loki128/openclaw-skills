# Explorium Skill

Search for companies and leads using Explorium's B2B data API.

## Usage

```
@explorium search companies in software industry in California
@explorium find leads for marketing agencies in New York with 50+ employees
@explorium get company info for explorium.ai
```

## Configuration

Add your API key to `config.yaml`:

```yaml
api_key: "your-api-key-here"
base_url: "https://api.explorium.ai/v1"
```

## Tools

- `search_companies` - Search for companies by filters
- `get_company` - Get detailed info on a specific company
- `find_leads` - Find contact leads for companies