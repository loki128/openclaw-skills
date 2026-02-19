# Postmark Email Skill

Send transactional emails via Postmark API.

## Usage

```
@postmark send to=john@example.com subject="Hello" body="Message"
@postmark send template=welcome to=newuser@example.com
@postmark check status of email-id
```

## Configuration

API key stored in `config.yaml`.

## Tools

- `send_email` - Send transactional email
- `send_template` - Send using template
- `check_status` - Check delivery status
- `get_bounces` - View bounce reports