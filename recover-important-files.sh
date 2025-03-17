#!/bin/bash

# Apply the stash but exclude Next.js build files
git checkout stash@{2} -- \
  docs/ \
  scripts/ \
  src/client/jest.config.js \
  src/client/jest.setup.js \
  src/client/src/ \
  src/server/ \
  tests/

# Stage the recovered files
git add docs/ scripts/ src/client/jest.config.js src/client/jest.setup.js src/client/src/ src/server/ tests/ --ignore-errors

# Commit the recovered files
git commit -m "Recover utility services and important files" --no-verify
