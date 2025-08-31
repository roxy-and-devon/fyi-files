#!/bin/bash

echo "Starting repository formatting..."

# Only run IDE helpers if not in CI environment
if [ -z "$CI" ]; then
  echo "Generating IDE helpers..."
  php artisan ide-helper:generate
  php artisan ide-helper:eloquent
  php artisan ide-helper:models -WR
else
  echo "Skipping IDE helpers in CI environment..."
fi

# Run Duster to fix code style
echo "Running Duster fix..."
./vendor/bin/duster fix

# Run Prettier on resources folder
echo "Running Prettier on resources folder..."
npx prettier --write resources/

echo "Formatting complete!"