![](app/static/images/snoo-saiddit.png)

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


### Table of Contents
1. [Installation & Setup](#installation-and-setup)
2. [Cloud9](#cloud9)
  + [Test DB](#test-db)
  + [Credentials](#credentials)
    + [Admin](#admin)
    + [User](#user)
3. [MySQL](#mysql)
  + [CheatSheet](#cheatsheet)
4. [Flask](#flask)
  + [Resources](#resources)
  + [Structure](#structure)
5. [Project Final Expectations and Deliverables](#project-final-expectations-and-deliverables)


----
## Installation and Setup
The following instructions are for [Ubuntu 16.04 LTS](https://wiki.ubuntu.com/XenialXerus/ReleaseNotes).

> Note: The chevrons (❯❯❯) represent the zsh shell command prompt.

### 1. Clone this repository:

```shell
❯❯❯ git clone https://github.com/stvhwrd/saiddit.git saiddit;
❯❯❯ cd saiddit;
```

### 2. [Install MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04):

```shell
❯❯❯ sudo apt update;
❯❯❯ sudo apt install mysql-server;
❯❯❯ sudo mysql_secure_installation;
❯❯❯ sudo mysql_install_db;
```

### 3. [Launch MySQL and create our user](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql):

```shell
❯❯❯ mysql -u saiddituser -p

mysql> CREATE USER 'saiddituser'@'localhost' IDENTIFIED BY 'project';

mysql> GRANT ALL PRIVILEGES ON * . * TO 'saiddituser'@'localhost';

```

### 4. Create the database (will be required to enter password - `project`):

```shell
❯❯❯ cd ./sql;
❯❯❯ mysql -h localhost -u saiddituser -p < ./db_schema.sql;
```

> Note: If you are working in a Cloud9 instance, you may simply use the [setup script](#saiddit-database) at this point.


### 5. Install Python 2.x and pip:

```shell
❯❯❯ sudo apt install python python-pip python-dev build-essential;
```


### 6. Then install python dependencies:

```shell
❯❯❯ sudo apt install libmysqlclient-dev;
❯❯❯ pip install flask flask-mysql;
```

### 7. Now start up your MySQL server, and use the `saiddit` database:

```shell
❯❯❯ mysql -u saiddituser -p;
❯❯❯ use saiddit;
```

### 8. Navigate to the `app` directory, and fire up the Flask app.  These commands assume that your [`pwd`](https://en.wikipedia.org/wiki/Pwd) is `saiddit`.

```shell
❯❯❯ cd ./app
❯❯❯ python app.py
```

### 9. Now open your browser to the port the app is running on:  [http://localhost:8080/](http://localhost:8080/)

---

## Cloud9

[Cloud9](https://c9.io) is a cloud-based dev environment.  You can sign up / sign in with your GitHub account and access a [shared workspace](https://ide.c9.io/stvhwrd/saiddit).  Alternatively, you are welcome to clone it, start from scratch, or ignore it completely.

<br>


### Test DB

[Giuseppe Maxia test_db](https://github.com/datacharmer/test_db) is installed on the Cloud9 instance at https://ide.c9.io/stvhwrd/saiddit, an Ubuntu workspace with a clone of this git repository.

<br>


### Credentials

#### User

Normally you'll want to enter the MySQL command line interface as a user (not root):

`mysql-ctl cli`

<br>


#### Admin

| Username | Password  |
| :------: | :-------- |
| 'saiddituser' | 'project' |

Administrative tasks can be done using the command:

`mysql -p -u saiddituser`

and then entering the password:

`project`

<br>

#### Saiddit Database

Set up the database by running `bash setup.sh` from the `sql` directory.
This runs all commands from `db_schema.sql` in MySQL, which creates and populates the `saiddit` database.

See the diagram below for an visual representation of the Saiddit DB.

<br>

![](Saiddit-entity_relationship.png)
