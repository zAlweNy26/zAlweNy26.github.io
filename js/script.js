var prv0 = null, crt0 = null, prv5 = null, crt5 = null, prv6 = null, crt6 = null;
var prv7 = null, crt7 = null, prv8 = null, crt8 = null, prv9 = null, crt9 = null;

$.ajax({
  url: "https://api.github.com/users/zAlweNy26?client_id=" + keys.GITHID + "&client_secret=" + keys.GITHUB,
  type: 'GET',
  dataType: 'json',
  success: function (git) {
    crt8 = JSON.stringify(git);
    if (prv8 && crt8 && prv8 !== crt8) $('.git-content').load(document.URL + ' .git-content');
    prv8 = crt8;
    $('.giturl').attr("href", git.html_url);
    $('#giticon').attr("src", git.avatar_url);
    $('#gitnick').html(git.login);
    $('#gitfollowers').html(git.followers + "<a href='https://github.com/zAlweNy26?tab=followers' target='_blank'> Followers</a>");
    $('#gitfollowing').html(git.following + "<a href='https://github.com/zAlweNy26?tab=following' target='_blank'> Following</a>");
    $('#gitrepos').html(git.public_repos + "<a href='https://github.com/zAlweNy26?tab=repositories' target='_blank'> Repositories</a>");
  },
  error: function () { }
});

$.ajax({
  url: "https://api.github.com/users/zAlweNy26/orgs?client_id=" + keys.GITHID + "&client_secret=" + keys.GITHUB,
  type: 'GET',
  dataType: 'json',
  success: function (git) {
    crt9 = JSON.stringify(git);
    if (prv9 && crt9 && prv9 !== crt9) $('.git-content').load(document.URL + ' .git-content');
    prv9 = crt9;
    $('#gitorg').attr("src", git[0].avatar_url);
    $('#gitorgurl').attr("href", "https://github.com/" + git[0].login);
  },
  error: function () { }
});

$.ajax({
  url: 'https://api.twitch.tv/helix/users?login=MarcoMerrino',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    crt5 = JSON.stringify(data);
    if (prv5 && crt5 && prv5 !== crt5) $('.twitch-content').load(document.URL + ' .twitch-content');
    prv5 = crt5;
    $('#twitchicon').attr("src", data.data[0].profile_image_url);
    $('#streamer').html(data.data[0].display_name);
    $('#streamerviews').html(parseInt(data.data[0].view_count).toLocaleString() + "<span style='color: rgb(100, 65, 165)'> total views</span>");
	//window.alert(data.data[0].id);
  },
  error: function () { },
  beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
});

$.ajax({
  url: 'https://api.twitch.tv/helix/users/follows?to_id=140861057',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    crt6 = JSON.stringify(data);
    if (prv6 && crt6 && prv6 !== crt6) $('.twitch-content').load(document.URL + ' .twitch-content');
    prv6 = crt6;
    $('#streamerfollowers').html(parseInt(data.total).toLocaleString() + "<span style='color: rgb(100, 65, 165)'> total followers</span>");
  },
  error: function () { },
  beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
});

$.ajax({
  url: 'https://api.twitch.tv/helix/streams?user_id=140861057',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    crt7 = JSON.stringify(data);
    if (prv7 && crt7 && prv7 !== crt7) $('.twitch-content').load(document.URL + ' .twitch-content');
    prv7 = crt7;
    if (data.data.length === 0) {
      $('#streamerplaying').html("Offline");
    } else {
      let gameid = data.data[0].game_id, viewers = data.data[0].viewer_count;
      $.ajax({
        url: 'https://api.twitch.tv/helix/games?id=' + gameid,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          crt0 = JSON.stringify(data);
          if (prv0 && crt0 && prv0 !== crt0) $('.twitch-content').load(document.URL + ' .twitch-content');
          prv0 = crt0;
          $('#streamer').html($('#streamer').text() + " - " + parseInt(viewers).toLocaleString() + "<span style='color: rgb(100, 65, 165)'> viewers</span>");
          $('#streamerplaying').html("<span style='color: rgb(100, 65, 165)'>Playing </span>" + data.data[0].name);
        },
        error: function () { },
        beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
      });
    }
  },
  error: function () { },
  beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
});