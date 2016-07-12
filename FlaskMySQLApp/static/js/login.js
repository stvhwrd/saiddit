/*
Functions needed for login.html
*/

$(function(){
	$('#btnLogIn').click(function(){

		$.ajax({
			url: '/logIn',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});