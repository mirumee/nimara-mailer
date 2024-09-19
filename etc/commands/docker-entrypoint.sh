#!/bin/bash

set -e

# Run migrations if DISABLE_MIGRATIONS is not set
if [ -z "$DISABLE_MIGRATIONS" ]; then
    echo "------------------------------"
    echo "Running migrations"
    echo "------------------------------"
    $CMD_PREFIX pnpm db:push
fi

$CMD_PREFIX "$@"
