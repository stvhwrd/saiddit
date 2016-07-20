//gets the comments data for a specific post and returns it using JSON 
function getComments(post_id){
	var val;
    $.ajax({
		url: '/getComments',
		type: 'GET',
		data: {'query':'SELECT * FROM Comments WHERE parent_post_id='+post_id},
		async: false,
		success: function(response){
			val = response;
		},
		error: function(error){
			console.log(error);
			return "error";
		}
	});
	return val;
}

function getPost(post_id){
	var val;
    $.ajax({
		url: '/getPosts',
		type: 'GET',
		data: {'query':'SELECT * FROM Posts WHERE post_id='+post_id},
		async: false,
		success: function(response){
			val = response;
		},
		error: function(error){
			console.log(error);
			return "error";
		}
	});
	return val;
}