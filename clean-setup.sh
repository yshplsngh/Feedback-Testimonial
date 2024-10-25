#!/bin/bash

echo ""
echo "|-------------------|"
echo "|     Clean Setup    |"
echo "|-------------------|"
echo ""

BASE_DIR="/home/yshplsngh/wd/Testimonial"

remove_dir() {
    rm -rf "$1"
    if [ $? -eq 0 ]; then
        echo "$2 files deleted 🚀"
    else
        echo "Failed to delete $2 files. Exiting..."
        exit 1
    fi
}

remove_dir "$BASE_DIR/node_modules" "root-node_modules"
remove_dir "$BASE_DIR/package-lock.json" "root-package-lock.json"

remove_dir "$BASE_DIR/api/node_modules" "api-node_modules"
remove_dir "$BASE_DIR/api/package-lock.json" "api-package-lock.json"

remove_dir "$BASE_DIR/web/node_modules" "web-node_modules"
remove_dir "$BASE_DIR/web/package-lock.json" "web-package-lock.json"
remove_dir "$BASE_DIR/web/dist" "web-dist"

echo "All files deleted successfully ✅"

cd "$BASE_DIR" || { echo "Failed to navigate to $BASE_DIR. Exiting..."; exit 1; }

echo "Starting installation of dependencies..."
if npm i; then
    echo "Dependencies installed successfully ✅"
else
    echo "Failed to install dependencies. Exiting..."
    exit 1
fi
