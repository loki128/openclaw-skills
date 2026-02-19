# Gmail Email Skill

Send and check emails via Gmail using App Password.

## Usage

```
@gmail send to=someone@example.com subject="Hello" body="Message"
@gmail check inbox
@gmail search from=boss@company.com
```

## Configuration

App password stored in config.yaml.

## Tools

- `send_email` - Send email via Gmail SMTP
- `check_inbox` - Read latest emails
- `search_emails` - Search by criteria