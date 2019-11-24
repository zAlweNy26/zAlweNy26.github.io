var keys = {
  GITHID: CryptoJS.AES.decrypt("U2FsdGVkX1+xyv2ntQdFAFn3Aeqn8lmYLtMTqif5qfmB/i3JMAjvCi3ylT/yIJt0", "Alwe").toString(CryptoJS.enc.Utf8),
  GITHUB: CryptoJS.AES.decrypt("U2FsdGVkX1+OgGHSsIc81/93c3G2dg/BpC0ZFANjn+VeXZM7fJ20QxMZBWwv8N2f1tQTBeoOC9pCafqtjAe93g==", "Alwe").toString(CryptoJS.enc.Utf8),
  TWITCH: CryptoJS.AES.decrypt("U2FsdGVkX1/scalSQEqycGqJ8B6uFGqAU94VsXU1///NfZlSM4V1vsipO7Hfw0fP", "Alwe").toString(CryptoJS.enc.Utf8)
}

var gitprofileicon = null, twitchprofileicon = null;
var gitname = null, gitdesc = null, gitinfo1 = null, gitinfo2 = null;
var twitchname = null, twitchdesc = null, twitchinfo1 = null, twitchinfo2 = null;

$.ajax({
  url: "https://api.github.com/users/zAlweNy26?client_id=" + keys.GITHID + "&client_secret=" + keys.GITHUB,
  type: 'GET',
  dataType: 'json',
  success: function (git) {
    gitprofileicon = git.avatar_url;
    gitname = git.login;
    gitdesc = git.public_repos + " <span style='color: lightgrey'>Repositories</span>";
    gitinfo1 = git.following + " <span style='color: lightgrey'>Following</span>";
    gitinfo2 = git.followers + " <span style='color: lightgrey'>Followers</span>";
  },
  error: function () { }
});

$.ajax({
  url: "https://api.github.com/users/zAlweNy26/orgs?client_id=" + keys.GITHID + "&client_secret=" + keys.GITHUB,
  type: 'GET',
  dataType: 'json',
  success: function (git) {
    $('#gitorg').attr("src", git[0].avatar_url);
  },
  error: function () { }
});

$.ajax({
  url: 'https://api.twitch.tv/helix/users?login=MarcoMerrino',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    twitchprofileicon = data.data[0].profile_image_url;
    twitchname = data.data[0].display_name;
    twitchinfo2 = parseInt(data.data[0].view_count).toLocaleString() + "<span style='color: rgb(100, 65, 165)'> total views</span>";
  },
  error: function () { },
  beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
});

$.ajax({
  url: 'https://api.twitch.tv/helix/users/follows?to_id=140861057',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    twitchinfo1 = parseInt(data.total).toLocaleString() + "<span style='color: rgb(100, 65, 165)'> total followers</span>";
  },
  error: function () { },
  beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
});

$.ajax({
  url: 'https://api.twitch.tv/helix/streams?user_id=140861057',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    if (data.data.length === 0) twitchdesc = "Offline";
    else {
      let gameid = data.data[0].game_id, viewers = data.data[0].viewer_count;
      $.ajax({
        url: 'https://api.twitch.tv/helix/games?id=' + gameid,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          twitchname = twitchname + " - " + parseInt(viewers).toLocaleString() + "<span style='color: rgb(100, 65, 165)'> viewers</span>";
          twitchdesc = "<span style='color: rgb(100, 65, 165)'>Playing </span>" + data.data[0].name;
        },
        error: function () { },
        beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
      });
    }
  },
  error: function () { },
  beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
});