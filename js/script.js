$.getJSON("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=6F02CBC0085858AF9A58B3465B9952E4&steamid=76561198154675159", function (steam) {
  $('#steamlevel').html(steam.response.player_level);
});

$.getJSON("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=6F02CBC0085858AF9A58B3465B9952E4&steamids=76561198154675159", function (steam) {
  $('.steamurl').attr("href", steam.response.players[0].profileurl);
  $('#steamicon').attr("src", steam.response.players[0].avatarmedium);
  $('#steamnick').html(steam.response.players[0].personaname);
  $('#steamname').html(steam.response.players[0].realname);
  let a = new Date(steam.response.players[0].lastlogoff * 1000);
  let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  let year = a.getFullYear(), month = months[a.getMonth()], day = a.getDate(), hour = a.getHours(), min = a.getMinutes(), sec = a.getSeconds();
  if (day < 10) day = "0" + day;
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  let logoff = day + ' ' + month + ' ' + year + ' at ' + hour + ':' + min + ':' + sec, status = "", profilestatus = steam.response.players[0].personastate;
  if (profilestatus === 0) {
    status = "rgb(75, 75, 75)";
    $('#steamlogoff').html("Last log off :");
    $('#steamdate').html(logoff);
  }
  else if (profilestatus === (2 || 3 || 4)) status = "rgb(30, 90, 165)";
  else if (profilestatus === (1 || 5 || 6)) status = "rgb(45, 130, 235)";
  if (profilestatus !== 0 && steam.response.players[0].gameid === undefined) {
    $('#steamlogoff').css({ "color": "rgb(45, 130, 235)" });
    $('#steamlogoff').html("Online");
    $('#steamdate').hide();
  } else if (profilestatus === 1 && steam.response.players[0].gameid !== undefined) {
    status = "rgb(150, 210, 60)";
    $('#steamlogoff').css({ "color": status });
    $('#steamlogoff').html("Playing");
    $('#steamdate').css({ "color": status });
    $('#steamdate').html(steam.response.players[0].gameextrainfo);
  }
  $('#steamicon').css({ "border": "2px solid " + status});
});

$.getJSON("https://api.github.com/users/zAlweNy26?client_id=9b8f70a67801fd08fed1&client_secret=a71e8f21e522647cde778a0ee7d17db5a6b433d5", function (git) {
  $('.giturl').attr("href", git.html_url);
  $('#giticon').attr("src", git.avatar_url);
  $('#gitnick').html(git.login);
  $('#gitfollowers').html(git.followers + "<a href='https://github.com/zAlweNy26?tab=followers' target='_blank'> Followers</a>");
  $('#gitfollowing').html(git.following + "<a href='https://github.com/zAlweNy26?tab=following' target='_blank'> Following</a>");
  $('#gitrepos').html(git.public_repos + "<a href='https://github.com/zAlweNy26?tab=repositories' target='_blank'> Repositories</a>");
});