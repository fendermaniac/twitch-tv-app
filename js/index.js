//Users Format: https://wind-bow.glitch.me/twitch-api/users/freecodecamp
//Channels Format: https://wind-bow.glitch.me/twitch-api/channels/freecodecamp
//Streams Format: https://wind-bow.glitch.me/twitch-api/streams/ESL_SC2
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "primevideo", "habathcx", "RobotCaleb", "noobs2ninjas"];

function twitchStatus(){
  var output = "<ul class='list-group'>";
  $.each(streams, function(s, streams){    
    
    var bio;
    
    $.getJSON('https://wind-bow.glitch.me/twitch-api/users/' + streams, function(user) {
      
      if (user.bio == null){
        bio = "No bio available...";
      }
      else {
        bio = user.bio;
      }
      
    });
    
    $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + streams, function(data) {
      
      var streamStatus;
      var additional;
      $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/' + streams, function(streams) {
        //console.log(streams);
        if (streams.stream == null){
         streamStatus = "offline <span style=\"color:red;\" class=\"glyphicon glyphicon-ban-circle\" aria-hidden=\"true\"></span>"; 
          
        output += '<li class="list-group-item"> <img src="' + data.logo + '"width=50px id="thumb"> <strong>' + data.display_name + '</strong>: ' + bio + " </br> <strong>Status:</strong> <a href=" + data.url + " target=_blank>" +  streamStatus + '</a></li>';            
        }
        else {
          streamStatus = streams.stream.stream_type + " <span style=\"color:green;\" class=\"glyphicon glyphicon-ok-circle\" aria-hidden=\"true\"></span>";

        output += '<li class="list-group-item"> <img src="' + data.logo + '"width=50px id="thumb"> <strong>' + data.display_name + '</strong>: ' + bio + " </br> <strong>Stream Info:</strong> " +data.status+ " </br> <strong>Status:</strong> <a href=" + data.url + " target=_blank> " +  streamStatus + '</a></li>';   
        
         } 
     
    $("#users").empty();
    $('#users').append(output); 
    });
    });    
        });
    output += "</ul>";
}


$(document).ready(twitchStatus);