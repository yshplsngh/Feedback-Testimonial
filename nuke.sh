#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "
╭━━━━━━━━━━━━━━━━━━━━━╮
│     Clean Setup      │
╰━━━━━━━━━━━━━━━━━━━━━╯
"

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}
print_error() {
    echo -e "${RED}✗${NC} $1"
}
print_status() {
    echo -e "${YELLOW}➜${NC} $1"
}

clean_project() {
    if npm cache clean --force; then
        print_success "npm cache cleaned"
    else
        print_error "Failed to clean npm cache"
        exit 1
    fi

    find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
    find . -iname "dist" -type d -prune -print -exec rm -rf '{}' \;
    find . -iname "package-lock.json" -type f -print -exec rm -f '{}' \;

    print_status "Installing dependencies..."
    if npm install; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi

    print_success "Setup completed successfully!"
}

clean_project


#BASE_DIR="/home/yshplsngh/wd/Testimonial"
#
#remove_dir() {
#    rm -rf "$1"
#    if [ $? -eq 0 ]; then
#        echo "$2 files deleted 🚀"
#    else
#        echo "Failed to delete $2 files. Exiting..."
#        exit 1
#    fi
#}
#
#remove_dir "$BASE_DIR/node_modules" "root-node_modules"
#remove_dir "$BASE_DIR/package-lock.json" "root-package-lock.json"
#
#remove_dir "$BASE_DIR/api/node_modules" "api-node_modules"
#remove_dir "$BASE_DIR/api/package-lock.json" "api-package-lock.json"
#
#remove_dir "$BASE_DIR/web/node_modules" "web-node_modules"
#remove_dir "$BASE_DIR/web/package-lock.json" "web-package-lock.json"
#remove_dir "$BASE_DIR/web/dist" "web-dist"
#
#echo "All files deleted successfully ✅"
#
#cd "$BASE_DIR" || { echo "Failed to navigate to $BASE_DIR. Exiting..."; exit 1; }
#
#echo "Starting installation of dependencies..."
#if npm i; then
#    echo "Dependencies installed successfully ✅"
#else
#    echo "Failed to install dependencies. Exiting..."
#    exit 1
#fi