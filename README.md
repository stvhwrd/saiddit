![](FlaskMySQLApp/static/images/snoo-saiddit.png)

### Table of Contents
1. [Installation & Setup](#installation-and-setup)
2. [Cloud9](#cloud9)
  + [Test DB](#test-db)
  + [Credentials](#credentials)
    + [Admin](#admin)
    + [User](#user)
3. [MySQL](#mysql)
  + [CheatSheet](#cheatsheet)
4. [Flask](#flaskapp)
  + [Resources](#resources)
  + [Structure](#structure)
5. [Project Final Expectations and Deliverables](#project-final-expectations-and-deliverables)


----
## Installation and Setup
(Ubuntu 14.04 LTS)

#### Note: The chevrons (❯❯❯) represent the bash/zsh shell command prompt.

### 1. Clone this repository:

```
❯❯❯ git clone https://github.com/stvhwrd/csc370-project.git saiddit;
❯❯❯ cd saiddit;
```

### 2. [Install MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04):

```
❯❯❯ sudo apt-get update;
❯❯❯ sudo apt-get install mysql-server;
❯❯❯ sudo mysql_secure_installation;
❯❯❯ sudo mysql_install_db;
```

### 3. [Launch MySQL and create our user](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql):

```
❯❯❯ mysql -u csc370 -p

mysql> CREATE USER 'csc370'@'localhost' IDENTIFIED BY 'project';

mysql> GRANT ALL PRIVILEGES ON * . * TO 'csc370'@'localhost';

```

### 4. Create the database (will be required to enter password - `project`):

```
❯❯❯ cd ./sql;
❯❯❯ mysql -h localhost -u csc370 -p < ./db_schema.sql;
```

#### Note: If you are working in a Cloud9 instance, you may simply use the [setup script](#saiddit-database) at this step.


### 5. Install Python 2.x and pip:

```
❯❯❯ sudo apt-get install python python-pip python-dev build-essential;
```


### 6. Then install python dependencies:

```
❯❯❯ sudo apt-get install libmysqlclient-dev;
❯❯❯ pip install flask flask-mysql;
````

### 7. Now start up your MySQL server, and use the saiddit database:

````
❯❯❯ mysql -u csc370 -p;
❯❯❯ use saiddit;
````

### 8. Navigate to the `FlaskMySQLApp` folder, and fire up the Flask app:

#### Note: the FlaskMySQLApp is a nested directory within the main `saiddit` directory. These instructions assume that your present working directory is `saiddit`.  Type `pwd` to find out which directory you are "in".

````
❯❯❯ cd ./FlaskMySQLApp
❯❯❯ python app.py
````

### 9. Now open your browser to the port the app is running on:  http://0.0.0.0:8080/



## Cloud9

[Cloud9](https://c9.io) is a cloud-based dev environment.  You can sign up / sign in with your GitHub account and access a [shared workspace](https://ide.c9.io/stvhwrd/csc370-project).  The team ([@dylgol](https://github.com/dylgol), [@sterlinglaird](https://github.com/sterlinglaird), [@stvhwrd](https://github.com/stvhwrd)) will always have access to the shared workspace, but you are welcome to clone it, start from scratch, or ignore it completely.

<br>


### Test DB

[Giuseppe Maxia test_db](https://github.com/datacharmer/test_db) is installed on the Cloud9 instance at https://ide.c9.io/stvhwrd/csc370-project, an Ubuntu workspace with a clone of this git repository.

<br>


### Credentials

#### User

Normally you'll want to enter the MySQL command line interface as a user (not root):

`mysql-ctl cli`

<br>


#### Admin

| Username | Password  |
| :------: | :-------- |
| 'csc370' | 'project' |

Administrative tasks can be done using the command prefix:

`mysql -p -u csc370`

and then entering the password:

`project`

<br>

#### Saiddit Database

Setup the database by `bash setup.sh` in the sql folder.
This inputs the contents of db_schema.sql into MySQL

<br>
<br>

## MySQL

"MySQL (officially pronounced as "My S-Q-L") is an open-source relational database management system... the world's second most widely used RDBMS, and the most widely used open-source client–server model RDBMS." - [Wikipedia](https://en.wikipedia.org/wiki/MySQL)

### Cheatsheet

Here's a handy cheat sheet for playing with MySQL: [Sven Hofmann's MySQL Cheatsheet](https://gist.github.com/hofmannsven/9164408#file-readme-md)

<br>
<br>


## Flask

Flask is a Python web framework built with a small core and easy-to-extend philosophy.  We will be using it to interface between the HTML frontend and the MySQL backend.

<br>


### Resources:

* [Why is Flask a good web framework choice?](https://www.fullstackpython.com/flask.html)
* [Flask-MySQLdb’s documentation](http://flask-mysqldb.readthedocs.io/en/latest/)
* [Creating a Web App From Scratch Using Python Flask and MySQL](http://code.tutsplus.com/tutorials/creating-a-web-app-from-scratch-using-python-flask-and-mysql--cms-22972)
* [Python Web Application Development Using Flask and MySQL](http://codehandbook.org/python-web-application-development-using-flask-and-mysql/)
* [A Quick Guide to Using MySQL in Python](http://ianhowson.com/a-quick-guide-to-using-mysql-in-python.html)
<br>


### Structure

The basic file structure of a small flask application (as ours will be) is:

````
FlaskApp/
├── app.py
└── static/
    └── style.css
    templates/
    ├── layout.html
    ├── index.html
    └── login.html
        ...
````

<br>
<br>


## Project Final Expectations and Deliverables


1. E/R diagram for your solution.

2. Passwords must be stored in a salted hash format (no plaintext passwords)

3. Translate your E/R diagram into tables in MySQL and include the necessary constraints.

4. Create forms to populate your tables.

5. Create a logged-in “front-page” for a given account.  A front-page shows the top-voted posts for an account’s subscribed subsaiddits.

6. Create a “default” front-page (not logged-in) that includes only the top-voted posts from the default subsaiddits.

7. Create a form to delete a post (and all of its comments)

8. Create and execute the following SQL queries (Will be tested in demo):

  * Get all of the posts by account A, sorted by highest rating (upvotes minus downvotes)

  * Get all of the posts from account A’s friends, sorted by highest rating.

  * Get account A’s subscrbed subsaiddits (include the default subsaiddits)

  * Get account A’s favourite posts

  * Get account A’s friends’ favourite posts

  * Get all of subsaiddit S’s creator’s posts

  * Get all of the posts in subsaiddit S that contain ``<some text>`` (Very basic search)

9. What query in section 8 took the most time to execute?  Why?


That's all we have to do.
