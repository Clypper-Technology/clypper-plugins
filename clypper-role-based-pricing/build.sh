#!/bin/bash

PLUGIN_NAME="clypper-role-based-pricing"
DIST_DIR="dist"
BUILD_DIR="${DIST_DIR}/${PLUGIN_NAME}"

VERSION=$(grep -oP 'Version:\s*\K[\d.]+' woo-roles-rules-b2b.php)
BUILD_FILE="${PLUGIN_NAME}-${VERSION}.zip"

# Clean previous builds
echo "Cleaning..."
rm -rf "$BUILD_DIR"
rm -f "${DIST_DIR}/${BUILD_FILE}"

#npm run build

# Create dist directory
mkdir -p "$BUILD_DIR"

echo "Copying plugin files..."
#cp -R admin "$BUILD_DIR/"
cp -R includes "$BUILD_DIR/"
cp -R licensing "$BUILD_DIR/"
#cp -R public "$BUILD_DIR/"
cp -R assets "$BUILD_DIR/"
cp -R vendor "$BUILD_DIR/"
cp readme.txt "$BUILD_DIR/"
cp changelog.txt "$BUILD_DIR/"
cp clypper-role-based-pricing.php "$BUILD_DIR/"

# Create ZIP inside dist
echo "Creating ZIP..."
cd "$DIST_DIR"
zip -r "$BUILD_FILE" "${PLUGIN_NAME}"
cd ..

# Remove temporary build folder
echo "Cleaning up..."
rm -rf "$BUILD_DIR"
