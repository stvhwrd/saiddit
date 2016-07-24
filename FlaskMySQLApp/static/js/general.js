//general functions that saiddit uses

//adds posts data
function addPosts(){
    var i = 0;

    var data = getPosts();
    
    //Sets the initial html for the posts
    for(i = 0; i<data.length; i++){
      var temp = data[i][0];
      var post = "<a id="+temp+" href=\"/comments\" onclick=\"location.href=this.href+'?post_id='+this.id;return false;\"><h3><span id=title" + i + "></span></h3></a>\
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
      document.getElementById(vote).innerHTML = "   " + (parseInt(data[i][6])-parseInt(data[i][7])) + "   ";
      vote = 'vote';
    }
}

//adds subsaiddit names to dropdown
function addSubsaiddits(){
    var i = 0;
    
    var subsaiddits = getSubsaiddits();
    var subHTML = "";
    for(i = 0; i < subsaiddits.length; i++){
        if(subsaiddits[i][4]){
            subHTML += "<li><a id="+subsaiddits[i][0]+" href='/subsaiddits' onclick=\"location.href=this.href+'?subsaiddit_id='+this.id;return false;\"><b>"+subsaiddits[i][0]+"</b></a></li>";
        }else{
            subHTML += "<li><a id="+subsaiddits[i][0]+" href='/subsaiddits' onclick=\"location.href=this.href+'?subsaiddit_id='+this.id;return false;\">"+subsaiddits[i][0]+"</a></li>";
        }
      }
    document.getElementById("subs").innerHTML = subHTML;
}

//adds parent post data in the comment page
function addParentPost(){
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
}

//adds the comments to the page
function addComments(){
    var parameter = window.location.search.substring(1);
    parameter = parameter.split("=");
    parameter = parameter[1];
    
    
    var comments = getComments(parameter);
    var commentLength = comments.length;
    var commentHTML = "";
    var i = 0;
    for(i = 0; i<commentLength; i++){
    commentHTML += "<div class='tab'>\
                      <div class='panel panel-default'>\
                        <div class=panel-heading>Commented by <b>"+comments[i][7]+"</b><span class=pull-right>"+(comments[i][4]-comments[i][5])+"</span></div>\
                        <div class=panel-body>"+comments[i][2]+"</div>\
                        <div replyToId"+comments[i][0]+"></div>\
                      </div>\
                    </div>";
    }
    document.getElementById("comments").innerHTML = commentHTML;
}

//adds the current subsaiddit name to the dropdown menu
function addSubsaidditName() {
    var parameter = window.location.search.substring(1);
    parameter = parameter.split("=");
    parameter = parameter[1];
    document.getElementById("subsaiddit_name").innerHTML = "Current Subsaiddit: "+parameter;
}

//adds the current subsaiddit name to the dropdown menu
function addSubsaidditPosts() {
    var parameter = window.location.search.substring(1);
    parameter = parameter.split("=");
    parameter = parameter[1];
    
    var i = 0;

    var data = getSubsaidditPosts(parameter);
    
    //Sets the initial html for the posts
    for(i = 0; i<data.length; i++){
      var temp = data[i][0];
      var post = "<a id="+temp+" href=\"/comments\" onclick=\"location.href=this.href+'?post_id='+this.id;return false;\"><h3><span id=title" + i + "></span></h3></a>\
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
      document.getElementById(vote).innerHTML = "   " + (parseInt(data[i][6])-parseInt(data[i][7])) + "   ";
      vote = 'vote';
    }
}

//returns the data for the top 12 posts from a particular subsaiddit
function getSubsaidditPosts(subsaiddit_id){
    var val;
    var query = "SELECT Posts.post_id, Posts.publish_time, Posts.edit_time, Posts.title, Posts.url, Posts.body, Posts.upvotes, Posts.downvotes, Posts.subsaiddit, Posts.author_key FROM Posts JOIN Subsaiddits ON subsaiddit=Subsaiddits.title WHERE Subsaiddits.title='"+subsaiddit_id+"' ORDER BY (upvotes-downvotes) DESC LIMIT 12";
    $.ajax({
		url: '/getQuery',
		type: 'GET',
		
		data: {'query':query},
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

//returns the post data from the server
function getPosts(){
	var val;
    $.ajax({
		url: '/getQuery',
		type: 'GET',
		
		//If the front page doesnt load right, try changing the query to this? SELECT * FROM Posts JOIN (SELECT * FROM Subsaiddits WHERE front_page) AS sub ON subsaiddit=sub.title ORDER BY (upvotes-downvotes) DESC LIMIT 12
		data: {'query':'SELECT Posts.post_id, Posts.publish_time, Posts.edit_time, Posts.title, Posts.url, Posts.body, Posts.upvotes, Posts.downvotes, Posts.subsaiddit, Posts.author_key FROM Posts JOIN Subsaiddits ON subsaiddit=Subsaiddits.title WHERE Subsaiddits.front_page ORDER BY (upvotes-downvotes) DESC LIMIT 12'},
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

//returns the subsaiddit names from the server
function getSubsaiddits(){
	var val;
    $.ajax({
		url: '/getQuery',
		type: 'GET',
		
		//If the front page doesnt load right, try changing the query to this? SELECT * FROM Posts JOIN (SELECT * FROM Subsaiddits WHERE front_page) AS sub ON subsaiddit=sub.title ORDER BY (upvotes-downvotes) DESC LIMIT 12
		data: {'query':'SELECT * FROM Subsaiddits'},
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

//gets the comments data for a specific post and returns it using JSON 
function getComments(post_id){
	var val;
    $.ajax({
		url: '/getQuery',
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

//returns the data for a single post from the server
function getPost(post_id){
	var val;
    $.ajax({
		url: '/getQuery',
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

//allows the user to log in using the login button
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

//allows the user to signup using the signup button
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

