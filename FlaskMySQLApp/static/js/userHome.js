/*
Functions needed for userHome.html
*/

//gets the name of the logged in user, syncronous but I dont know how to do it any other way :(
function getName(){
	var val;
    $.ajax({
		url: '/getName',
		type: 'GET',
		async: false,
		success: function(response){
			var json = JSON.parse(response);
			if(json.result == "success"){
				console.log("success "+json.name);
				val = json.name;
			}else{
				console.log(json.result);
				return "error";
			}
		},
		error: function(error){
			console.log(error);
			return "error";
		}
	});
	return val;
}

//gets the first 12 posts returns the posts using JSON
function getPosts(){
	var val;
    $.ajax({
		url: '/getPosts',
		type: 'GET',
		data: {'query':'SELECT * FROM Posts LIMIT 12'},
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
