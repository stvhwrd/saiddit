
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
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
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
VALUES("bob",     "sha256$CrAFRnjr$b41dd1a93ef7cc9a1713321de0e158d0cc63e5b98d98ba533a6a3638e373277c")

INSERT INTO Accounts (username, password)
VALUES ("james",  "sha256$NhfLNEOY$a392487514f840c431363d2781990cdc4d03d4b0b6a6563526a554474ab6b709")

INSERT INTO Accounts (username, password)
VALUES ("kobe",   "sha256$1BKkuA36$a953540c3240b38bcf4b4b061f93f5e6ff357a0a79c7b31c5a62d517f8ea4101")

INSERT INTO Accounts (username, password)
VALUES ("luke",   "sha256$ZUGpvc8h$7dba7d9c77aae3b57f2fe17ad2e3ef561269ea0746e4c185d2ee61353b7ebb6f")

INSERT INTO Accounts (username, password)
VALUES ("paul",   "sha256$225Z93wE$5236f15b7c200d7376aad625783dba2c6a785c110101be59a28ce1dbd9daa08b")

INSERT INTO Accounts (username, password)
VALUES ("rudy",   "sha256$TnW5iu3t$bcc6d7d7a6eea4ff35bbac2363a097e79920724f3bfb0e9518d91e3eb7f3eb89")

INSERT INTO Accounts (username, password)
VALUES ("sarah",  "sha256$PgGFrrU1$f1f6c482b9a350d8a8d044a18e7a191b5d95764dbb3c0a8a63b867016574870c")

INSERT INTO Accounts (username, password)
VALUES ("sidney", "sha256$ik2xz7bv$acc52890170ed94663ad6346f180a596d389817ae5f208bbf95420cdcb2c9cb5")

INSERT INTO Accounts (username, password)
VALUES ("yoda",   "sha256$7KTwhXlz$04b4eda631d69d41282e95e7952aaa1f4ecbd88be4a2cf33056ec62493d694d9")


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

INSERT INTO Posts (title, url, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test1", "www.google.com", "news", "yoda", 2, 0);

INSERT INTO Posts (title, url, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test2", "www.youtube.com", "movies", "sarah", 1, 1);

INSERT INTO Posts (title, url, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test3", "las vegas gets a team", "hockey", "kobe", 0, 2);

INSERT INTO Posts (title, url, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test4", "www.yelp.com", "funny", "james", 0, 1);

INSERT INTO Posts (title, url, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test5", "www.google.com", "all", "yoda", 0, 0);

INSERT INTO Posts (title, body, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test6", "words", "news", "yoda", 0, 0);

INSERT INTO Posts (title, body, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test7", "the green mile", "movies", "sarah", 0, 0);

INSERT INTO Posts (title, body, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test8", "gibberish", "news", "bob", 0, 0);

INSERT INTO Posts (title, body, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test9", "slightly longer gibberish", "funny", "rudy", 0, 0);

INSERT INTO Posts (title, body, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test10", "oilers will win the cup jk", "hockey", "paul", 0, 0);

INSERT INTO Posts (title, body, subsaiddit, author_key, upvotes, downvotes)
VALUES ("test11", "www.google.com", "news", "yoda", 0, 0);


/* Comments */

INSERT INTO Comments (body, parent_post_id, upvotes, downvotes, parent_message, commentor_id)
VALUES ("I absolutely disagree with this", 7, 15, 4, NULL, "yoda");

INSERT INTO Comments (body, parent_post_id, upvotes, downvotes, parent_message, commentor_id)
VALUES ("This is hilarious", 3, 100, 900, NULL, "kobe");

INSERT INTO Comments (body, parent_post_id, upvotes, downvotes, parent_message, commentor_id)
VALUES ("I speak Latin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac scelerisque velit. See?", 4, 1, 54, NULL, "james");

INSERT INTO Comments (body, parent_post_id, upvotes, downvotes, parent_message, commentor_id)
VALUES ("I don't usually agree with yoda, but here, I think he's right.", 7, 1, 0, 1, "sarah");

INSERT INTO Comments (body, parent_post_id, upvotes, downvotes, parent_message, commentor_id)
VALUES ("The Chicago Blackhawks, as good as they are, are undoubtedly one of the most underrated teams in the league.", 2, 1000, 0, NULL, "yoda");


/* Favourites */

INSERT INTO Favourites (user_id, post_id)
VALUES ("yoda", 3);

INSERT INTO Favourites (user_id, post_id)
VALUES ("sarah", 3);

INSERT INTO Favourites (user_id, post_id)
VALUES ("sarah", 1);

INSERT INTO Favourites (user_id, post_id)
VALUES ("james", 4);

INSERT INTO Favourites (user_id, post_id)
VALUES ("kobe", 8);


/* Friends */

INSERT INTO Friends (user_id, friend_id)
VALUES ("yoda", "sarah");

INSERT INTO Friends (user_id, friend_id)
VALUES ("yoda", "kobe");

INSERT INTO Friends (user_id, friend_id)
VALUES ("paul", "james");

INSERT INTO Friends (user_id, friend_id)
VALUES ("sidney", "sarah");

INSERT INTO Friends (user_id, friend_id)
VALUES ("luke", "yoda");


/* Subscribes */

INSERT INTO Subscribes (user_id, subsaidd_id)
VALUES ("yoda", "hockey");

INSERT INTO Subscribes (user_id, subsaidd_id)
VALUES ("yoda", "movies");

INSERT INTO Subscribes (user_id, subsaidd_id)
VALUES ("yoda", "news");

INSERT INTO Subscribes (user_id, subsaidd_id)
VALUES ("kobe", "funny");

INSERT INTO Subscribes (user_id, subsaidd_id)
VALUES ("james", "news");

INSERT INTO Subscribes (user_id, subsaidd_id)
VALUES ("james", "funny");


/* PostVotes */

INSERT INTO PostVotes (user_id, vote, post_id)
VALUES ("james", 1, 1);

INSERT INTO PostVotes (user_id, vote, post_id)
VALUES ("yoda", 1, 1);

INSERT INTO PostVotes (user_id, vote, post_id)
VALUES ("yoda", 0, 4);

INSERT INTO PostVotes (user_id, vote, post_id)
VALUES ("sarah", 0, 2);

INSERT INTO PostVotes (user_id, vote, post_id)
VALUES ("james", 1, 2);

INSERT INTO PostVotes (user_id, vote, post_id)
VALUES ("sarah", 0, 3);

INSERT INTO PostVotes (user_id, vote, post_id)
VALUES ("james", 0, 3);


/* CommentVotes */

INSERT INTO CommentVotes (user_id, vote, comment_id)
VALUES ("yoda", 1, 1);

INSERT INTO CommentVotes (user_id, vote, comment_id)
VALUES ("sarah", 1, 2);

INSERT INTO CommentVotes (user_id, vote, comment_id)
VALUES ("james", 1, 1);

INSERT INTO CommentVotes (user_id, vote, comment_id)
VALUES ("kobe", 1, 2);

INSERT INTO CommentVotes (user_id, vote, comment_id)
VALUES ("bob", 1, 1);
