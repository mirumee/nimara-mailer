#!/bin/bash

# Cleanup
rm -rf build package.zip
# Install deps
pnpm install --frozen-lockfile --prod
pnpm build:serverless
pnpm build:server
# Create zip
cd build;	zip -r -D ../artifact.zip .
