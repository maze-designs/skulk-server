#!/bin/bash

cd "${0%/*}"

if [[ -z "${TEST}" ]]; then
echo "Make sure the server is running and you've removed the database file prior to running."
read -p "Press enter to continue"
fi

fail_trigger="Fatal - Terminating"

for test in ./*.test.rb; do
  t=$(ruby $test)
  echo "$t"
  if [[ "$t" == *"$fail_trigger"* ]]; then
    exit 1
  fi

done
