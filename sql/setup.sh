#!/usr/bin/env bash

# Execute a batch of commands in the mysql shell to create
# and populate the saiddit database and tables

# Check which operating system we're on and execute accordingly
if [[ "$(uname -s)" == 'Darwin' ]]; then
    # execute Mac instruction
    mysql -u csc370 -p < ./db_schema.sql
elif [[ "$(uname -s)" == 'Linux' ]]; then
    # execute Linux (Cloud9) instruction
    mysql-ctl cli < ./db_schema.sql
fi
