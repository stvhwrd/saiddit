/**
 * Unless otherwise mentioned, 'Account A' =yoda,
 * and 'Account A's friend' = sarah
*/


/* (1) Get all of the posts by account A, sorted by highest ranking (upvotes - downvotes) */
SELECT post_id
FROM Posts
WHERE author_key = “yoda”
ORDER BY (upvotes - downvotes) DESC;


/* (2) Get all of the posts from account A friends, sorted by highest ranking */
SELECT post_id
FROM posts
INNER JOIN (
	SELECT friend_id
	FROM friends
	WHERE user_id = “yoda”
	) AS friendList ON friendList.friend_id = author_key;


/* (3) Get accounts A subscribed subsaiddit (include defaults) */
SELECT subsaidd_id
FROM subscribes
INNER JOIN subsaiddits
WHERE user_id = “yoda”
	OR front_page = 1
GROUP BY subsaidd_id;


/* (4) Get account A favourite posts */
SELECT post_id
FROM favourites
WHERE user_id = ”yoda”;


/*
 * (5) Get account A's friends favourite post.
 *
 * (A query can also be structured like in (4) with friend's name,
 * but the resulting query time is the same.)
*/
SELECT post_id
FROM favourites
WHERE user_id = (
		SELECT friends.friend_id
		FROM friends
		WHERE friends.user_id = “yoda”
			AND friends.friend_id = ”sarah”
		);


/* (6) Get account A friend's subscribed subsaiddits (no duplicates) */
SELECT subsaidd_id
FROM subscribes
INNER JOIN subsaiddits
WHERE user_id = (
		SELECT friends.friend_id
		FROM friends
		WHERE friends.user_id = “yoda”
			AND friends.friend_id = ”sarah”
		)
	OR front_page = 1
GROUP BY subsaidd_id;


/* (7) Get all of subsaiddit S’s creator posts,	 here we are assuming creator is 'sarah' */
SELECT post_id
FROM subsaiddits
INNER JOIN ON creator_key = posts.author_key
WHERE creator_key = “sarah”;


/* (8) Get all of the posts in subsaidit S that contain some text (basic search) */
SELECT post_id
FROM posts
WHERE subsaiddit = "news"
	AND TEXT LIKE 'words';
