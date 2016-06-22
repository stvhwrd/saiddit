### Table of Contents
1. [Cloud9](#cloud9)
  + [Test DB](#test-db)
  + [Credentials](#credentials)
    + [Admin](#admin)
    + [User](#user)
2. [MySQL](#mysql)
  + [CheatSheet](#cheatsheet)
3. [Flask](#flaskapp)
  + [Resources](#resources)
  + [Structure](#structure)

----

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

<br>


### Structure

The basic file structure of a small flask application (as ours will be) is:

````
/FlaskApp
 ├── app.py
 ├── /static
      └── style.css
     /templates
      ├── layout.html
      ├── index.html
      └── login.html
        ...
````
