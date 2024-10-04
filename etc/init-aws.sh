#!/bin/bash
set -eo pipefail

# https://docs.localstack.cloud/references/init-hooks/

SEPARATOR='----------------------------------------------------------------------------'
ENDPOINT_URL="http://localhost:4566"
QUEUE_NAME="nimara-mailer-queue"

echo -e "\n"
echo $SEPARATOR
echo -e "Running AWS create queue command for ${QUEUE_NAME}.\n"
aws sqs create-queue --region ${AWS_DEFAULT_REGION} --endpoint-url=${ENDPOINT_URL} --queue-name ${QUEUE_NAME}
echo -e "\nCreated queue ${QUEUE_NAME}"


echo $SEPARATOR
echo -e "Running AWS verify email identity command for ${FROM_EMAIL}.\n"
aws ses verify-email-identity --region ${AWS_DEFAULT_REGION} --endpoint-url=${ENDPOINT_URL} --email-address ${FROM_EMAIL}
echo -e "\nVerified ${FROM_EMAIL}"

echo $SEPARATOR
echo -e "Running AWS verify domain identity command for ${FROM_DOMAIN}.\n"
aws ses verify-domain-identity --region ${AWS_DEFAULT_REGION} --endpoint-url=${ENDPOINT_URL} --domain ${FROM_DOMAIN}
echo -e "\nVerified ${FROM_DOMAIN}"

echo $SEPARATOR
