#!/bin/bash

echo "=€ Starting repository formatting..."

# Run IDE Helper commands
echo "=Ý Generating IDE helpers..."
php artisan ide-helper:generate
php artisan ide-helper:eloquent
php artisan ide-helper:models -WR

# Run Duster to fix code style
echo "( Running Duster fix..."
./vendor/bin/duster fix

# Run Prettier on resources folder
echo "<¨ Running Prettier on resources folder..."
npx prettier --write resources/

echo " Formatting complete!"