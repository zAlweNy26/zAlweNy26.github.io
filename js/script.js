var keys = {
  GITHID: CryptoJS.AES.decrypt("U2FsdGVkX1+xyv2ntQdFAFn3Aeqn8lmYLtMTqif5qfmB/i3JMAjvCi3ylT/yIJt0", "Alwe").toString(CryptoJS.enc.Utf8),
  GITHUB: CryptoJS.AES.decrypt("U2FsdGVkX1+OgGHSsIc81/93c3G2dg/BpC0ZFANjn+VeXZM7fJ20QxMZBWwv8N2f1tQTBeoOC9pCafqtjAe93g==", "Alwe").toString(CryptoJS.enc.Utf8),
  GOOGLE: CryptoJS.AES.decrypt("U2FsdGVkX1+sCE5TTd3uCSuLkC3Drt+lMBIIlcHCYMzI2GDERUzblmRJgJq42m7g/xDQSjsKOavi/IBYVt8mnw==", "Alwe").toString(CryptoJS.enc.Utf8),
  TWITCH: CryptoJS.AES.decrypt("U2FsdGVkX1/scalSQEqycGqJ8B6uFGqAU94VsXU1///NfZlSM4V1vsipO7Hfw0fP", "Alwe").toString(CryptoJS.enc.Utf8),
}

var prv1 = null, crt1 = null, prv2 = null, crt2 = null, prv3 = null, crt3 = null, prv4 = null, crt4 = null;
var prv5 = null, crt5 = null, prv6 = null, crt6 = null, prv7 = null, crt7 = null, prv8 = null, crt8 = null, prv9 = null, crt9 = null;

/*$.ajax({
  url: "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=" + keys.STEAM + "&steamids=76561198154675159",
  type: 'GET',
  dataType: 'json',
  beforeSend: function (xhr) {
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  },
  success: function (steam) {
    crt1 = JSON.stringify(steam);
    if (prv1 && crt1 && prv1 !== crt1) $('.steam-content').load(document.URL + ' .steam-content');
    prv1 = crt1;
    $('.steamurl').attr("href", steam.response.players[0].profileurl);
    $('#steamicon').attr("src", steam.response.players[0].avatarfull);
    alert(steam.response.players[0].avatarfull);
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
  },
  error: function () { }
});

$.ajax({
  url: "https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + keys.STEAM + "&steamid=76561198154675159",
  type: 'GET',
  dataType: 'json',
  beforeSend: function (xhr) {
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  },
  success: function (steam) {
    crt2 = JSON.stringify(steam);
    if (prv2 && crt2 && prv2 !== crt2) $('#steamlevel').load(document.URL + ' #steamlevel');
    prv2 = crt2;
    let colors = ["rgb(155, 155, 155)", "rgb(190, 40, 65)", "rgb(215, 90, 65)", "rgb(255, 205, 35)",
      "rgb(70, 120, 60)", "rgb(80, 140, 220)", "rgb(120, 80, 200)", "rgb(195, 80, 200)", 
      "rgb(85, 35, 55)", "rgb(155, 125, 80)", "rgb(155, 155, 155)"], colorlevel = null, level = steam.response.player_level;
    for (let i = 0, mul = 0; i < 1;) {
      if (level >= 0 + mul && level <= 9 + mul) {
        i++;
        if (level < 10) colorlevel = colors[0];
        else if (level <= 100) colorlevel = colors[mul / 10];
        else if (level <= 1000) {
          let val = parseInt(mul.toString().substring(1), 10);
          colorlevel = colors[val / 10];
        }
        $('#steamlevel').css({ "border": "2px solid " + colorlevel });
      }
      if (i == 0) mul += 10;
    }
    $('#steamlevel').html(level);
  },
  error: function () { }
});*/

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
  },
  error: function () { }
});

$.ajax({
  url: "https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=PlayerInsideIT&key=" + keys.GOOGLE,
  type: 'GET',
  dataType: 'json',
  success: function (yt) {
    crt3 = JSON.stringify(yt);
    if (prv3 && crt3 && prv3 !== crt3) $('.yt-content').load(document.URL + ' .yt-content');
    prv3 = crt3;
    $('.yturl').attr("href", "https://www.youtube.com/channel/" + yt.items[0].id);
    $('#yticon').attr("src", yt.items[0].snippet.thumbnails.medium.url);
    $('#ytnick').html("<span id='favyt'>Favourite Youtuber</span><br>" + yt.items[0].snippet.title);
    $('#ytsubs').html("<span style='color: rgb(225, 0, 0)'>Subscribers</span><br>" + parseInt(yt.items[0].statistics.subscriberCount).toLocaleString());
    $('#ytvideos').html("<span style='color: rgb(225, 0, 0)'>Videos</span><br>" + parseInt(yt.items[0].statistics.videoCount).toLocaleString());
    $('#ytviews').html("<span style='color: rgb(225, 0, 0)'>Views</span><br>" + parseInt(yt.items[0].statistics.viewCount).toLocaleString());
  },
  error: function () {}
});

$.ajax({
  url: 'https://kitsu.io/api/edge/anime?filter[text]=trigun',
  type: 'GET',
  dataType: 'json',
  success: function (anime) {
    crt4 = JSON.stringify(anime);
    if (prv4 && crt4 && prv4 !== crt4) $('.anime-content').load(document.URL + ' .anime-content');
    prv4 = crt4;
    $('.animeurl').attr("href", "https://kitsu.io/anime/" + anime.data[0].attributes.slug);
    $('#animeicon').attr("src", anime.data[0].attributes.posterImage.tiny);
    $('#animenick').html("<span id='favanime'>Favourite Anime</span><br>" + anime.data[0].attributes.titles.en);
    $('#animerate').html("<span style='color: rgb(225, 0, 0)'>Rating</span><br>" + anime.data[0].attributes.averageRating + " %");
    let datePart1 = anime.data[0].attributes.startDate.match(/\d+/g), year1 = datePart1[0], month1 = datePart1[1], day1 = datePart1[2];
    let datePart2 = anime.data[0].attributes.endDate.match(/\d+/g), year2 = datePart2[0], month2 = datePart2[1], day2 = datePart2[2];
    $('#animestart').html("<span style='color: rgb(225, 0, 0)'>Start Date</span><br>" + day1 + '/' + month1 + '/' + year1);
    $('#animeend').html("<span style='color: rgb(225, 0, 0)'>End Date</span><br>" + day2 + '/' + month2 + '/' + year2);
    $('#animeepisodes').html("<span style='color: rgb(225, 0, 0)'>Episodes</span><br>" + anime.data[0].attributes.episodeCount);
    $('#animeeplength').html("<span style='color: rgb(225, 0, 0)'>Episodes Length</span><br>" + anime.data[0].attributes.episodeLength + " minutes");
    let nsfw;
    if (anime.data[0].attributes.nsfw === "true") nsfw = "Yes";
    else nsfw = "No";
    $('#animensfw').html("<span style='color: rgb(225, 0, 0)'>NSFW</span><br>" + nsfw);
  },
  error: function () {}
});

$.ajax({
  url: 'https://api.twitch.tv/helix/users?login=WizardJo',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    crt5 = JSON.stringify(data);
    if (prv5 && crt5 && prv5 !== crt5) $('.twitch-content').load(document.URL + ' .twitch-content');
    prv5 = crt5;
    $('#twitchicon').attr("src", data.data[0].profile_image_url);
    $('#streamer').html(data.data[0].display_name);
    $('#streamerviews').html(parseInt(data.data[0].view_count).toLocaleString() + "<span style='color: rgb(100, 65, 165)'> total views</span>");
  },
  error: function () { },
  beforeSend: function (xhr) { xhr.setRequestHeader('Client-ID', keys.TWITCH); },
});

$.ajax({
  url: 'https://api.twitch.tv/helix/users/follows?to_id=97539822',
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
  url: 'https://api.twitch.tv/helix/streams?user_id=97539822',
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
