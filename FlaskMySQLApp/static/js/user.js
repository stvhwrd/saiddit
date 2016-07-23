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

//Adds the users name to the top of the page
function addName(){
    document.getElementById("name").innerHTML = getName();   
}

//adds posts data for a signed in user
function addSignedInPosts(){
    var i = 0;

    var data = getPosts();
    
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
      if(data[i][4] != null){
        document.getElementById(text).innerHTML = data[i][4];
      }else{
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