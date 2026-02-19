#!/bin/bash
# Send email via Postmark

curl -s -X POST 'https://api.postmarkapp.com/email' \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "X-Postmark-Server-Token: b547f844-05ed-47fa-971c-d92a8f86154b" \
  -d "{
    \"From\": \"lukita@cleopatradelights.com\",
    \"To\": \"$1\",
    \"Subject\": \"$2\",
    \"TextBody\": \"$3\",
    \"MessageStream\": \"outbound\"
  }"