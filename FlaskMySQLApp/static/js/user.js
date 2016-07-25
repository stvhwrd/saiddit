//functions for logged in users only

//returns the users name from the server
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

//allows the user to submit a comment to the server
$(function(){
	$('#btnSubmitComment').click(function(){

		//submits comment
		$.ajax({
			url: '/comment',
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

//allows the user to submit a post to the server
$(function(){
	$('#btnSubmitPost').click(function(){

		//submits post
		$.ajax({
			url: '/post',
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

//Adds the users name to the top of the page
function addName(){
    document.getElementById("name").innerHTML = getName();
}

//adds posts data for a signed in user
function addSignedInPosts(){
    var i = 0;

    var data = getSignedInPosts();

    //Sets the initial html for the posts
    for(i = 0; i<data.length; i++){
      var temp = data[i][0];
      var post = "<a id="+temp+" href=\"/userComments\" onclick=\"location.href=this.href+'?post_id='+this.id;return false;\"><h3><span id=title" + i + "></span></h3></a>\
                  <div class=\"panel panel-info\">\
                    <div class=\"panel-heading\">Posted by <b id=user" + i + "></b> to <b id=sub" + i + "></b> <span id=vote" + i + " class=\"pull-right\"></span> <p></p> </div>\
                    <div class=\"panel-body\"><span id=text" + i + "></span></div>\
                  </div>";
      document.getElementById("post"+i).innerHTML = post;
    }

    //Adds title data to page
    var title = 'title';
    for(i = 0; i < data.length; i++ ){
      title = title + String(i);
      document.getElementById(title).innerHTML = data[i][3];
      title = 'title';
    }

    //Adds post content data to page
    var text = 'text';
    for(i = 0; i < data.length; i++ ){
      text = text + String(i);
      if(data[i][4] != null && data[i][4] != ""){
        document.getElementById(text).innerHTML = data[i][4];
      }else if(data[i][5] != null && data[i][5] != ""){
         document.getElementById(text).innerHTML = data[i][5];
      }
      text = 'text';
    }

    //Adds posted by username data to page
    var user = 'user';
    for(i = 0; i < data.length; i++ ){
      user = user + String(i);
      document.getElementById(user).innerHTML = data[i][9];
      user = 'user';
    }

    //Adds posted to subsaiddit data to page
    var sub = 'sub';
    for(i = 0; i < data.length; i++ ){
      sub = sub + String(i);
      document.getElementById(sub).innerHTML = data[i][8];
      sub = 'sub';
    }

    //Adds voting data to page
    var vote = 'vote';
    for(i = 0; i < data.length; i++ ){
      vote = vote + String(i);
      document.getElementById(vote).innerHTML = "<button type=\"button\" onclick='upvotePost(this.value)' value='"+data[i][0]+"' class=\"btn btn-primary\"> upvote </button>  " + (parseInt(data[i][6])-parseInt(data[i][7])) + "  <button type=\"button\" onclick='downvotePost(this.value)' value='"+data[i][0]+"' class=\"btn btn-primary\">downvote</button>";
      vote = 'vote';
    }
}

//adds subsaiddit names to dropdown for a signed in user
function addSignedInSubsaiddits(){
    var i = 0;

    var subsaiddits = getSubsaiddits();
    var userSubsaiddits = getUserSubsaiddits();

    var subHTML = "";
    for(i = 0; i < userSubsaiddits.length; i++){
      subHTML += "<li><a id="+userSubsaiddits[i][0]+" href='/userSubsaiddits' onclick=\"location.href=this.href+'?subsaiddit_id='+this.id;return false;\"><b>"+userSubsaiddits[i][0]+"</b></a> <button id='btnUnsubscribe' value="+userSubsaiddits[i][0]+" type='button'  onclick='unsubscribe(this.value)' class='btn btn-default btn-xs'>Unsubscribe</button></li>";
    }

    var skip = false;
    var j = 0;

    for(i = 0; i < subsaiddits.length; i++){
      for(j = 0; j < userSubsaiddits.length; j++){
        if(subsaiddits[i][0] == userSubsaiddits[j][0]){
          skip = true;
        }
      }
      if(skip){

      }else{
        subHTML += "<li><a id="+subsaiddits[i][0]+" href='/userSubsaiddits' onclick=\"location.href=this.href+'?subsaiddit_id='+this.id;return false;\">"+subsaiddits[i][0]+"</a> <button value="+subsaiddits[i][0]+" type='button' onclick='subscribe(this.value)' class='btn btn-default btn-xs'>Subscribe</button></li>";
      }
      skip = false;
    }
    document.getElementById("subs").innerHTML = subHTML;
}

//adds parent post data in the comment page
function addSignedInParentPost(){
    var parameter = window.location.search.substring(1);
    parameter = parameter.split("=");
    parameter = parameter[1];

    //Populates post infomation
    var post = getPost(parameter);
    document.getElementById('title').innerHTML = post[0][3];
    document.getElementById('user').innerHTML = post[0][9];
    document.getElementById('subsaiddit').innerHTML = post[0][8];
    document.getElementById('votes').innerHTML = "   " + (post[0][6]-post[0][7]) + "   ";
    document.getElementById('content').innerHTML = ((post[0][4] != null) ? post[0][4] : post[0][5]);
    document.getElementById('post_id').value = post[0][0];
}

//adds the current subsaiddit name to the dropdown menu
function addSignedInSubsaidditPosts() {
    var parameter = window.location.search.substring(1);
    parameter = parameter.split("=");
    parameter = parameter[1];

    var i = 0;

    var data = getSubsaidditPosts(parameter);

    //Sets the initial html for the posts
    for(i = 0; i<data.length; i++){
      var temp = data[i][0];
      var post = "<a id="+temp+" href=\"/userComments\" onclick=\"location.href=this.href+'?post_id='+this.id;return false;\"><h3><span id=title" + i + "></span></h3></a>\
                  <div class=\"panel panel-info\">\
                    <div class=\"panel-heading\">Posted by <b id=user" + i + "></b> to <b id=sub" + i + "></b> <span id=vote" + i + " class=\"pull-right\"></span> <p></p> </div>\
                    <div class=\"panel-body\"><span id=text" + i + "></span></div>\
                  </div>";
      document.getElementById("post"+i).innerHTML = post;
    }

    //Adds title data to page
    var title = 'title';
    for(i = 0; i < data.length; i++ ){
      title = title + String(i);
      document.getElementById(title).innerHTML = data[i][3];
      title = 'title';
    }

     //Adds post content data to page
    var text = 'text';
    for(i = 0; i < data.length; i++ ){
      text = text + String(i);
      if(data[i][4] != null && data[i][4] != ""){
        document.getElementById(text).innerHTML = data[i][4];
      }else if(data[i][5] != null && data[i][5] != ""){
         document.getElementById(text).innerHTML = data[i][5];
      }
      text = 'text';
    }

    //Adds posted by username data to page
    var user = 'user';
    for(i = 0; i < data.length; i++ ){
      user = user + String(i);
      document.getElementById(user).innerHTML = data[i][9];
      user = 'user';
    }

    //Adds posted to subsaiddit data to page
    var sub = 'sub';
    for(i = 0; i < data.length; i++ ){
      sub = sub + String(i);
      document.getElementById(sub).innerHTML = data[i][8];
      sub = 'sub';
    }

    //Adds voting data to page
    var vote = 'vote';
    for(i = 0; i < data.length; i++ ){
      vote = vote + String(i);
      document.getElementById(vote).innerHTML = "<button type=\"button\" onclick='upvotePost(this.value)' value='"+data[i][0]+"' class=\"btn btn-primary\"> upvote </button>  " + (parseInt(data[i][6])-parseInt(data[i][7])) + "  <button type=\"button\" onclick='downvotePost(this.value)' value='"+data[i][0]+"' class=\"btn btn-primary\">downvote</button>";
      vote = 'vote';
    }
}

//returns the post data from the server
function getSignedInPosts(){
  var user = getName();

	var val;
    $.ajax({
		url: '/getQuery',
		type: 'GET',

		//If the front page doesnt load right, try changing the query to this? SELECT * FROM Posts JOIN (SELECT * FROM Subsaiddits WHERE front_page) AS sub ON subsaiddit=sub.title ORDER BY (upvotes-downvotes) DESC LIMIT 12
		data: {'query':'SELECT Posts.post_id, Posts.publish_time, Posts.edit_time, Posts.title, Posts.url, Posts.body, Posts.upvotes, Posts.downvotes, Posts.subsaiddit, Posts.author_key FROM Posts JOIN Subscribes ON Posts.subsaiddit=Subscribes.subsaidd_id WHERE Subscribes.user_id="'+user+'" ORDER BY (upvotes-downvotes) DESC LIMIT 12'},
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

//returns the users subscribed subsaiddits
function getUserSubsaiddits(){
  var user = getName();

	var val;
    $.ajax({
		url: '/getQuery',
		type: 'GET',

		//If the front page doesnt load right, try changing the query to this? SELECT * FROM Posts JOIN (SELECT * FROM Subsaiddits WHERE front_page) AS sub ON subsaiddit=sub.title ORDER BY (upvotes-downvotes) DESC LIMIT 12
		data: {'query':'SELECT Subsaiddits.title FROM Subsaiddits JOIN Subscribes ON Subsaiddits.title=Subscribes.subsaidd_id WHERE Subscribes.user_id="'+user+'"'},
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

//allows the user to unsubscribe from a subsaiddit
function unsubscribe(subsaiddit){

	$.ajax({
		url: '/unsubscribe',
		data: {'subsaiddit_id':subsaiddit},
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
}

//allows the user to subscribe to a subsaiddit
function subscribe(subsaiddit){

	$.ajax({
		url: '/subscribe',
		data: {'subsaiddit_id':subsaiddit},
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
}

//allows the user to upvote a post
function upvotePost(post_id){

  $.ajax({
		url: '/upvotePost',
		data: {'post_id':post_id},
		type: 'POST',
		success: function(response){

		},
		error: function(error){
			console.log(error);
		}
	});
}

//allows the user to downvote a post
function downvotePost(post_id){

  $.ajax({
		url: '/downvotePost',
		data: {'post_id':post_id},
		type: 'POST',
		success: function(response){

		},
		error: function(error){
			console.log(error);
		}
	});
}


//allows the user to submit a comment to the server
$(function(){
	$('#btnDeletePost').click(function(){

		//deletes comment
		$.ajax({
			url: '/deletePost',
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

// //allows the user to delete a post
// function deletePost(post_id){

//   $.ajax({
// 		url: '/deletePost',
// 		data: {'post_id':post_id},
// 		type: 'POST',
// 		success: function(response){

// 		},
// 		error: function(error){
// 			console.log(error);
// 		}
// 	});
// }