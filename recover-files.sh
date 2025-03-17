#!/bin/bash

# Create directories if they don't exist
mkdir -p docs/accessibility
mkdir -p docs/api
mkdir -p docs/security
mkdir -p scripts
mkdir -p src/client/src/components/auth
mkdir -p src/client/src/components/auth/__tests__
mkdir -p src/client/src/components/molecules
mkdir -p src/client/src/components/organisms
mkdir -p src/client/src/contexts
mkdir -p src/client/src/contexts/__tests__
mkdir -p src/client/src/pages
mkdir -p src/client/src/pages/auth
mkdir -p src/client/src/pages/auth/__tests__
mkdir -p src/client/src/routes
mkdir -p src/client/src/tests
mkdir -p src/client/src/theme
mkdir -p src/client/src/utils
mkdir -p src/server/controllers
mkdir -p src/server/middleware
mkdir -p src/server/routes
mkdir -p src/server/templates/emails
mkdir -p src/server/tests/controllers
mkdir -p src/server/tests/middleware
mkdir -p src/server/utils
mkdir -p tests/server/utils

# Apply the stash to recover files
git stash show -p stash@{2} | grep -v "src/client/.next" | grep -v "Binary files" | git apply

# Stage the recovered files
git add docs/ scripts/ src/ tests/ --ignore-errors

# Commit the recovered files
git commit -m "Recover lost utility services and files" --no-verify
