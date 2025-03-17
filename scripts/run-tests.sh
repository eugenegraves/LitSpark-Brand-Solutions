#!/bin/bash
# Test runner script for LitSpark Brand Solutions
# This script runs all the tests for the file upload and email functionality

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  LitSpark Brand Solutions Test Suite ${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# Function to run a test and check its result
run_test() {
  local test_name=$1
  local test_command=$2
  
  echo -e "${YELLOW}Running ${test_name}...${NC}"
  echo -e "${BLUE}Command: ${test_command}${NC}"
  echo ""
  
  # Run the test
  eval $test_command
  
  # Check the result
  if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ ${test_name} completed successfully!${NC}"
  else
    echo ""
    echo -e "${RED}❌ ${test_name} failed!${NC}"
  fi
  
  echo -e "${BLUE}--------------------------------------${NC}"
  echo ""
}

# Check if Jest is installed
if ! command -v jest &> /dev/null; then
  echo -e "${YELLOW}Jest is not installed globally. Using local Jest from node_modules...${NC}"
  JEST="npx jest"
else
  JEST="jest"
fi

# 1. Run unit tests for email service
run_test "Email Service Unit Tests" "$JEST --testPathPattern=tests/server/utils/emailService.test.js"

# 2. Run unit tests for file upload service
run_test "File Upload Service Unit Tests" "$JEST --testPathPattern=tests/server/utils/fileUploadService.test.js"

# 3. Run email accessibility tests
run_test "Email Accessibility Tests" "node scripts/test-email-accessibility.js"

# 4. Ask if user wants to run the email service test (sends actual emails)
echo -e "${YELLOW}Do you want to run the email service test? This will send actual emails.${NC}"
echo -e "${YELLOW}Enter the recipient email address or press Enter to skip:${NC}"
read -r email_address

if [ -n "$email_address" ]; then
  # Set the test email environment variable
  export TEST_EMAIL=$email_address
  
  # Run the email service test
  run_test "Email Service Test" "node scripts/test-email-service.js"
else
  echo -e "${BLUE}Skipping email service test.${NC}"
  echo ""
fi

# 5. Run file upload service test
run_test "File Upload Service Test" "node scripts/test-file-upload-service.js"

# Summary
echo -e "${BLUE}======================================${NC}"
echo -e "${GREEN}All tests completed!${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""
echo -e "${YELLOW}Note:${NC}"
echo -e "1. Check the test results above for any failures."
echo -e "2. If you ran the email service test, check the recipient inbox for the test emails."
echo -e "3. The email accessibility test output is saved in the 'scripts/email-accessibility-output' directory."
echo ""
