var keys = {
  STEAM: CryptoJS.AES.decrypt("U2FsdGVkX18y9I2sBjzVb0wM58VhiM5D5+08NZt8hR7WHQNg4CYp9hu+k43mq5yl/k8M6URnvq2qgYxjo0tITQ==", "Alwe").toString(CryptoJS.enc.Utf8),
  GOOGLE: CryptoJS.AES.decrypt("U2FsdGVkX1+sCE5TTd3uCSuLkC3Drt+lMBIIlcHCYMzI2GDERUzblmRJgJq42m7g/xDQSjsKOavi/IBYVt8mnw==", "Alwe").toString(CryptoJS.enc.Utf8),
  TWITCH: CryptoJS.AES.decrypt("U2FsdGVkX1/scalSQEqycGqJ8B6uFGqAU94VsXU1///NfZlSM4V1vsipO7Hfw0fP", "Alwe").toString(CryptoJS.enc.Utf8),
}

var previous = null, current = null, previous1 = null, current1 = null, previous2 = null, current2 = null, previous3 = null, current3 = null;

$.ajax({
  url: "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=" + keys.STEAM + "&steamids=76561198154675159",
  type: 'GET',
  dataType: 'json',
  success: function (steam) {
    current = JSON.stringify(steam);
    if (previous && current && previous !== current) $('.steam-content').load(document.URL + ' .steam-content');
    previous = current;
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
  error: function () { },
  beforeSend: function (xhr) { 
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); 
    xhr.setRequestHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    xhr.setRequestHeader('Access-Control-Allow-Credentials', true); 
  }
});

$.ajax({
  url: "https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + keys.STEAM + "&steamid=76561198154675159",
  type: 'GET',
  dataType: 'json',
  success: function (steam) {
    current1 = JSON.stringify(steam);
    if (previous1 && current1 && previous1 !== current1) $('#steamlevel').load(document.URL + ' #steamlevel');
    previous1 = current1;
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
  error: function () { },
  beforeSend: function (xhr) {
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    xhr.setRequestHeader('Access-Control-Allow-Credentials', true); 
  }
});

$.ajax({
  url: "https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=PlayerInsideIT&key=" + keys.GOOGLE,
  type: 'GET',
  dataType: 'json',
  success: function (yt) {
    current2 = JSON.stringify(yt);
    if (previous2 && current2 && previous2 !== current2) $('.yt-content').load(document.URL + ' .yt-content');
    previous2 = current2;
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
