/*
Functions needed for login.html
*/

$(function(){
	$('#btnLogIn').click(function(){
		
		//Logs in user
		$.ajax({
			url: '/logIn',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				var json = JSON.parse(response)
				if(json.result == "success"){
					console.log("success");
					window.location.href='userHome';
				}else{
					console.log(json.result)
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});