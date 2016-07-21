function getPosts(){
	var val;
    $.ajax({
		url: '/getPosts',
		type: 'GET',
		data: {'query':'SELECT * FROM Posts JOIN (SELECT * FROM Subsaiddits WHERE front_page) AS sub ON subsaiddit=sub.title ORDER BY (upvotes-downvotes) DESC LIMIT 12'},
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
