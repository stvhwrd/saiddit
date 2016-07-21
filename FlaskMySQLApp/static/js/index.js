function getPosts(){
	var val;
    $.ajax({
		url: '/getPosts',
		type: 'GET',
		data: {'query':'SELECT Posts.post_id, Posts.publish_time, Posts.edit_time, Posts.title, Posts.url, Posts.body, Posts.upvotes, Posts.downvotes, Posts.subsaiddit, Posts.author_key FROM Posts JOIN Subsaiddits ON subsaiddit=Subsaiddits.title ORDER BY (upvotes-downvotes) DESC LIMIT 12'},
		async: false,
		success: function(response){
			val = response;
			//console.log(response);
		},
		error: function(error){
			console.log(error);
			return "error";
		}
	});
	return val;
}

//data: {'query':'SELECT post_id, publish_time, edit_time, title, url, body, upvotes, downvotes, subsaiddit, author_key FROM Posts JOIN (SELECT * FROM Subsaiddits WHERE front_page) AS sub ON subsaiddit=sub.title ORDER BY (upvotes-downvotes) DESC LIMIT 12'},
		