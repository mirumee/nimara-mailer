#!/bin/bash

# Cleanup
rm -rf build artifact.zip
# Install deps
pnpm install --frozen-lockfile --prod
# Create bundle
pnpm build
# Create zip
cd build;	zip -r -D ../artifact.zip .
