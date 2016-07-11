#!/usr/bin/env bash

# execute a batch of commands in the mysql shell to create the saiddit database and tables
mysql-ctl cli < ./db_schema.sql
