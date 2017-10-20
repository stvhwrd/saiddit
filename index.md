![](https://raw.githubusercontent.com/stvhwrd/saiddit/master/app/static/images/snoo-saiddit.png)

> A minimal MySQL-based replica of core reddit functionality.

The application is called "Saiddit".  It's an online community forum that allows accounts to post text and links to a given "subsaiddit" and allows other accounts to upvote, downvote, and comment on the posts.  The requirements elicitation team has extracted the following requirements:

* **An account** has:
    * username
    * salted hash password
    * reputation (upvotes minus downvotes).
* An account can:
    * post to any subsaiddit
    * comment on any post
    * maintain a friend list of other accounts
    * maintain a list of favourite posts
    * subscribe to a subsaiddit
    * upvote or downvote (not both) once per post or comment
    
* **A post** has:
    * author
    * date/time published
    * date/time edited (if applicable)
    * title
    * text (if it is a 'text' post)
    * URL (if it is a 'link' post)
    * upvotes
    * downvotes
    * subsaiddit it belongs to
    
* **A comment** has:
    * author
    * date/time published
    * text
    * the post it belongs to
    * upvotes
    * downvotes
    * the comment it is replying to (if applicable)
    
* **A subsaiddit** has:
    * title
    * description
    * author/creator
    * date/time created
    * default, or not default (whether it's shown on frontpage for unauthenticated user)

----

### Table of Contents
1. [Installation & Setup](#installation-and-setup)
2. [MySQL](#mysql)
  + [CheatSheet](#cheatsheet)
3. [Flask](#flaskapp)
  + [Resources](#resources)
  + [Structure](#structure)
4. [Saiddit Database](#saiddit-database)
5. [Contributors](#credit)

----

# Installation and Setup
The following instructions are for [Ubuntu 16.04 LTS](https://wiki.ubuntu.com/XenialXerus/ReleaseNotes).

> Note: The chevrons (❯❯❯) represent the zsh shell command prompt.

## 1. Clone this repository:

```shell
❯❯❯ git clone https://github.com/stvhwrd/saiddit.git saiddit;
❯❯❯ cd saiddit;
```

## 2. [Install MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04):

```shell
❯❯❯ sudo apt update;
❯❯❯ sudo apt install mysql-server;
❯❯❯ sudo mysql_secure_installation;
❯❯❯ sudo mysql_install_db;
```

## 3. [Launch MySQL and create our user](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql) with passowrd `secretpassword`:

```shell
❯❯❯ mysql -u saiddituser -p

mysql> CREATE USER 'saiddituser'@'localhost' IDENTIFIED BY 'secretpassword';

mysql> GRANT ALL PRIVILEGES ON * . * TO 'saiddituser'@'localhost';

```

## 4. Create the database (will be required to enter the sudo password)

```shell
❯❯❯ cd ./sql;
❯❯❯ mysql -h localhost -u saiddituser -p < ./db_schema.sql;
```

> Note: If you are working in a Cloud9 instance, you may simply use the [setup script](#saiddit-database) at this point.


## 5. Install Python 2.x and pip:

```shell
❯❯❯ sudo apt install python python-pip python-dev build-essential;
```


## 6. Then install python dependencies:

```shell
❯❯❯ sudo apt install libmysqlclient-dev;
❯❯❯ pip install flask flask-mysql;
```

## 7. Now start up your MySQL server, and use the `saiddit` database:

```shell
❯❯❯ mysql -u saiddituser -p;
❯❯❯ use saiddit;
```

## 8. Navigate to the `app` directory, and fire up the Flask app.  These commands assume that your [`pwd`](https://en.wikipedia.org/wiki/Pwd) is `saiddit`.

```shell
❯❯❯ cd ./app
❯❯❯ python app.py
```

## 9. Now open your browser to the port the app is running on:  [http://localhost:8080/](http://localhost:8080/)

---
# MySQL

"MySQL (officially pronounced as "My S-Q-L") is an open-source relational database management system... the world's second most widely used RDBMS, and the most widely used open-source client–server model RDBMS." - [Wikipedia](https://en.wikipedia.org/wiki/MySQL)

## Cheatsheet

Here's a handy cheat sheet for playing with MySQL: [Sven Hofmann's MySQL Cheatsheet](https://gist.github.com/hofmannsven/9164408#file-readme-md)

<br>

----

# Flask

Flask is a Python web framework built with a small core and easy-to-extend philosophy.  We use it to interface between the HTML/CSS/JS frontend and the MySQL backend.

<br>


## Resources:

* [Why is Flask a good web framework choice?](https://www.fullstackpython.com/flask.html)
* [Flask-MySQLdb’s documentation](http://flask-mysqldb.readthedocs.io/en/latest/)
* [Creating a Web App From Scratch Using Python Flask and MySQL](http://code.tutsplus.com/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql--cms-22972)
* [Python Web Application Development Using Flask and MySQL](http://codehandbook.org/python-web-application-development-using-flask-and-mysql/)
* [A Quick Guide to Using MySQL in Python](http://ianhowson.com/a-quick-guide-to-using-mysql-in-python.html)

<br>


## Structure

The basic file structure of a small flask application is:

````
app/
├── app.py
└── static/
    └── style.css
    templates/
    ├── layout.html
    ├── index.html
    └── login.html
        ...
````

----

# Saiddit Database

Set up the database by running `bash setup.sh` from the `sql` directory.
This runs all commands from `db_schema.sql` in MySQL, which creates and populates the `saiddit` database.

See the diagram below for an E/R diagram representation of the Saiddit DB.

<br>

![](https://raw.githubusercontent.com/stvhwrd/saiddit/master/saiddit-entity_relationship.png)

----

# Credit

All contributors are listed on [this page](https://github.com/stvhwrd/saiddit/graphs/contributors).
