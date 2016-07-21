function getPosts(){
	var val;
    $.ajax({
		url: '/getPosts',
		type: 'GET',
		
		//If the front page doesnt load right, try changing the query to this? SELECT * FROM Posts JOIN (SELECT * FROM Subsaiddits WHERE front_page) AS sub ON subsaiddit=sub.title ORDER BY (upvotes-downvotes) DESC LIMIT 12
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
