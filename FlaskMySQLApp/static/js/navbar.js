/*
This file has functions related to the navigation bar at the top of each webpage, must included in every 
    webpage.
*/

$(function(){
	$('#btnSignUp').click(function(){

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
	});
});

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