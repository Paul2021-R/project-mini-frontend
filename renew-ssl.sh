#!/bin/sh

cd /home/hansol/workspace/project-mini-frontend

echo "--- (1 / 2) Certbot Renewal Process ---"

docker compose run --rm certbot renew

echo "--- (2 / 2) Nginx Setting Reload ---"

docker compose exec nginx nginx -s reload

echo "--- Renewal Finished ---"