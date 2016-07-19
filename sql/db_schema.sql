
/**  Create/reset the database */

DROP DATABASE IF EXISTS saiddit;
CREATE DATABASE saiddit;

USE saiddit;



/*  end */


/** Create the tables */

CREATE TABLE Accounts (
    username VARCHAR(255) PRIMARY KEY,
    password CHAR(80) NOT NULL,
    reputation INT DEFAULT 0
    );


CREATE TABLE Subsaiddits (
    title VARCHAR(255) PRIMARY KEY,
    description VARCHAR(512),
    creator_key VARCHAR(255) NOT NULL,
    creation_time DATETIME,
    front_page BOOLEAN DEFAULT 0,

    FOREIGN KEY (creator_key) REFERENCES Accounts(username) ON DELETE CASCADE
    );


CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    publish_time DATETIME,
    edit_time DATETIME,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(2048),
    body TEXT,
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    subsaiddit VARCHAR(255) NOT NULL,
    author_key VARCHAR(255) NOT NULL,

    FOREIGN KEY (subsaiddit) REFERENCES Subsaiddits(title) ON DELETE CASCADE,
    FOREIGN KEY (author_key) REFERENCES Accounts(username) ON DELETE CASCADE
    );


CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    creation_time DATETIME,
    body text,
    parent_post_id INT NOT NULL,
    upvotes INT,
    downvotes INT,
    parent_message INT,
    commentor_id VARCHAR(255) NOT NULL,

    FOREIGN KEY (parent_post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (commentor_id) REFERENCES Accounts(username) ON DELETE CASCADE
    );


CREATE TABLE Favourites (
    user_id VARCHAR(255),
    post_id INT,

    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Accounts(username) ON DELETE CASCADE
    );


CREATE TABLE Friends (
    user_id VARCHAR(255) NOT NULL,
    friend_id VARCHAR(255) NOT NULL,

    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES Accounts(username) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES Accounts(username) ON DELETE CASCADE
    );


CREATE TABLE Subscribes (
    user_id VARCHAR(255) NOT NULL,
    subsaidd_id VARCHAR(255) NOT NULL,

    PRIMARY KEY (user_id, subsaidd_id),
    FOREIGN KEY (user_id) REFERENCES Accounts(username) ON DELETE CASCADE,
    FOREIGN KEY (subsaidd_id) REFERENCES Subsaiddits(title) ON DELETE CASCADE
    );


CREATE TABLE PostVotes (
    user_id VARCHAR(255) NOT NULL,
    vote BOOLEAN NOT NULL,
    post_id INT NOT NULL,

    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES Accounts(username) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE
    );


CREATE TABLE CommentVotes (
    user_id VARCHAR(255) NOT NULL,
    vote BOOLEAN NOT NULL,
    comment_id INT NOT NULL,

    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES Accounts(username) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comments(comment_id) ON DELETE CASCADE
    );


/** Triggers for adding for time-stamping certain insertions */

CREATE TRIGGER create_time_subsaiddit
BEFORE INSERT ON Subsaiddits
FOR EACH ROW
SET NEW.creation_time = NOW();


CREATE TRIGGER create_time_post
BEFORE INSERT ON Posts
FOR EACH ROW
SET NEW.publish_time = NOW();


CREATE TRIGGER create_time_comment
BEFORE INSERT ON Comments
FOR EACH ROW
SET NEW.creation_time = NOW();



/** Populate the tables */

/* Accounts */

INSERT INTO Accounts (username, password)
VALUES ("bob", "bob");

INSERT INTO Accounts (username, password)
VALUES ("sarah", "sarah");

INSERT INTO Accounts (username, password)
VALUES ("james", "james");

INSERT INTO Accounts (username, password)
VALUES ("rudy", "rudy");

INSERT INTO Accounts (username, password)
VALUES ("yoda", "yoda");

INSERT INTO Accounts (username, password)
VALUES ("paul", "paul");

INSERT INTO Accounts (username, password)
VALUES ("kobe", "kobe");

INSERT INTO Accounts (username, password)
VALUES ("sidney", "sidney");

INSERT INTO Accounts (username, password)
VALUES ("luke", "luke");



/* Subsaiddits */

INSERT INTO Subsaiddits (title, description, creator_key, front_page)
VALUES ("news", "things that are news", "yoda", 1);

INSERT INTO Subsaiddits (title, description, creator_key, front_page)
VALUES ("movies", "talk about movies", "yoda", 1);

INSERT INTO Subsaiddits (title, description, creator_key, front_page)
VALUES ("funny", "you will laugh", "sarah", 0);

INSERT INTO Subsaiddits (title, description, creator_key, front_page)
VALUES ("all", "the best of saiddit", "james", 0);

INSERT INTO Subsaiddits (title, description, creator_key, front_page)
VALUES ("hockey", "go bar down", "sidney", 0);


/* Posts */

INSERT INTO Posts (title, url, subsaiddit, author_key)
VALUES ("test1", "www.google.com", "news", "yoda");

INSERT INTO Posts (title, url, subsaiddit, author_key)
VALUES ("test2", "www.youtube.com", "movies", "sarah");

INSERT INTO Posts (title, url, subsaiddit, author_key)
VALUES ("test3", "las vegas gets a team", "hockey", "kobe");

INSERT INTO Posts (title, url, subsaiddit, author_key)
VALUES ("test4", "www.yelp.com", "funny", "james");

INSERT INTO Posts (title, url, subsaiddit, author_key)
VALUES ("test5", "www.google.com", "all", "yoda");

INSERT INTO Posts (title, body, subsaiddit, author_key)
VALUES ("test6", "words", "news", "yoda");

INSERT INTO Posts (title, body, subsaiddit, author_key)
VALUES ("test7", "the green mile", "movies", "sarah");

INSERT INTO Posts (title, body, subsaiddit, author_key)
VALUES ("test8", "gibberish", "news", "bob");

INSERT INTO Posts (title, body, subsaiddit, author_key)
VALUES ("test9", "slightly longer gibberish", "funny", "rudy");

INSERT INTO Posts (title, body, subsaiddit, author_key)
VALUES ("test10", "oilers will win the cup", "hockey", "paul");


/*
