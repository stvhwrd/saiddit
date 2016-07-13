/*
Functions needed for signup.html
*/

$(function(){
	$('#btnSignUp').click(function(){
		
		//signs user up
		$.ajax({
			url: '/signUp',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
		
		//allows login from signup page
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
