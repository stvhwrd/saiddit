#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb as mdb
import sys
from flask import Flask
app = Flask(__name__)

try:

    # connect to the DB
    # parameters: connect(host, username, password, database_name)
    con = mdb.connect('localhost', 'testuser', 'test623', 'testdb')

    # the database connection gives us the cursor object to traverse records
    # from result set
    cur = con.cursor()

    # execute a query on the database we're connected to
    cur.execute("SELECT VERSION()")

    # we fetch the data.  since we're only fetching one
    # record we use 'fetchone()'
    ver = cur.fetchone()

    # declare and initialize the html string with the string that is our one
    # record we queried for
    html_string = "<table>" + \
                    "<tr>" + \
                        "<td>Database: %s" % ver + "</td>" + \
                        "<td>Billy</td>" + \
                        "<td>Johns</td>" + \
                        "<td>1-888-2484</td>" + \
                    "</tr>" + \
                    "<tr>" + \
                        "<td>Database version: %s</td>" % ver + \
                        "<td>Jillian-Jennifer-Mae-Lynn-Rose</td>" + \
                        "<td>Smith</td>" + \
                        "<td>50</td>" + \
                    "</tr>" + \
                  "</table>"

    @app.route('/')
    def hello_world():
        return html_string

except mdb.Error, e:

    print "Error %d: %s" % (e.args[0], e.args[1])
    sys.exit(1)

finally:

    if con:
        con.close()

if __name__ == '__main__':
    app.run()
