function getPosts(){
	var val;
    $.ajax({
		url: '/getPosts',
		type: 'GET',
		data: {'query':'SELECT * FROM Posts'},
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
