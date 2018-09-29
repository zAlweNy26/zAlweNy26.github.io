var previous = null, current = null, previous1 = null, current1 = null, previous2 = null, current2 = null, previous3 = null, current3 = null;

setInterval(function () {
  $.getJSON("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=6F02CBC0085858AF9A58B3465B9952E4&steamids=76561198154675159", function (steam) {
    current = JSON.stringify(steam);
    if (previous && current && previous !== current) {
      $('.steam-content').load(document.URL + ' .steam-content');
    }
    previous = current;
    $('.steamurl').attr("href", steam.response.players[0].profileurl);
    $('#steamicon').attr("src", steam.response.players[0].avatarfull);
    $('#steamnick').html(steam.response.players[0].personaname);
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
    $('#steamicon').css({ "border": "2px solid " + status });
  });
}, 1000);

setInterval(function () {
  $.getJSON("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=6F02CBC0085858AF9A58B3465B9952E4&steamid=76561198154675159", function (steam) {
    current1 = JSON.stringify(steam);
    if (previous1 && current1 && previous1 !== current1) $('#steamlevel').load(document.URL + ' #steamlevel');
    previous1 = current1;
    $('#steamlevel').html(steam.response.player_level);
  });
}, 1000);

setInterval(function () {
  $.getJSON("https://api.github.com/users/zAlweNy26?client_id=9b8f70a67801fd08fed1&client_secret=a71e8f21e522647cde778a0ee7d17db5a6b433d5", function (git) {
    current2 = JSON.stringify(git);
    if (previous2 && current2 && previous2 !== current2) $('.git-content').load(document.URL + ' .git-content');
    previous2 = current2;
    $('.giturl').attr("href", git.html_url);
    $('#giticon').attr("src", git.avatar_url);
    $('#gitnick').html(git.login);
    $('#gitfollowers').html("<a class='gitlink' href='https://github.com/" + git.login + "?tab=followers' target='_blank'> Followers</a><br>" + git.followers);
    $('#gitfollowing').html("<a class='gitlink' href='https://github.com/" + git.login + "?tab=following' target='_blank'> Following</a><br>" + git.following);
    $('#gitrepos').html("<a class='gitlink' href='https://github.com/" + git.login + "?tab=repositories' target='_blank'> Repositories</a><br>" + git.public_repos);
  });
}, 1000);

$.getJSON("https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=PlayerInsideIT&key=AIzaSyByAZMWWepZNwDqCu2uvrqAy7NPz6rabZ0", function (yt) {
  $('.yturl').attr("href", "https://www.youtube.com/channel/" + yt.items[0].id);
  $('#yticon').attr("src", yt.items[0].snippet.thumbnails.medium.url);
  $('#ytnick').html(yt.items[0].snippet.title + " <span id='favyt'><span class='redbra'>[</span> Favourite Youtuber <span class='redbra'>]</span></span>");
  let a = new Date(yt.items[0].snippet.publishedAt);
  let year = a.getFullYear(), month = a.getMonth(), day = a.getDate();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + (parseInt(month) + 1);
  else month = month + 1;
  let created = day + '/' + month + '/' + year;
  $('#ytsubs').html("<span style='color: rgb(225, 0, 0)'>Subscribers</span><br>" + parseInt(yt.items[0].statistics.subscriberCount).toLocaleString());
  $('#ytvideos').html("<span style='color: rgb(225, 0, 0)'>Uploads</span><br>" + parseInt(yt.items[0].statistics.videoCount).toLocaleString());
  $('#ytviews').html("<span style='color: rgb(225, 0, 0)'>Views</span><br>" + parseInt(yt.items[0].statistics.viewCount).toLocaleString());
  $('#ytsince').html("<span style='color: rgb(225, 0, 0)'>Created at</span><br>" + created);
});