var keys = {
  STEAM: CryptoJS.AES.decrypt("U2FsdGVkX18y9I2sBjzVb0wM58VhiM5D5+08NZt8hR7WHQNg4CYp9hu+k43mq5yl/k8M6URnvq2qgYxjo0tITQ==", "Alwe").toString(CryptoJS.enc.Utf8),
  GOOGLE: CryptoJS.AES.decrypt("U2FsdGVkX1+sCE5TTd3uCSuLkC3Drt+lMBIIlcHCYMzI2GDERUzblmRJgJq42m7g/xDQSjsKOavi/IBYVt8mnw==", "Alwe").toString(CryptoJS.enc.Utf8),
  GITHUB: CryptoJS.AES.decrypt("U2FsdGVkX1+4rZWRZ6lc1/vLA5A4iowER5TxsjQRwxQCuNsb58cLgb1SpINAsVJv4vHg6e9i8oTkTk4VWs9vIg==", "Alwe").toString(CryptoJS.enc.Utf8),
  GITHUBID: CryptoJS.AES.decrypt("U2FsdGVkX195If0+o4hG8auWzkA5a07tfW+nQvLs6Hs8rTYzUcSH2rgfjaxjIwX1", "Alwe").toString(CryptoJS.enc.Utf8)
}

var previous = null, current = null, previous1 = null, current1 = null, previous2 = null, current2 = null;

setInterval(function () {
  $.getJSON("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + keys.STEAM + "&steamids=76561198154675159", function (steam) {
    current = JSON.stringify(steam);
    if (previous && current && previous !== current) $('.steam-content').load(document.URL + ' .steam-content');
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
}, 500);

setInterval(function () {
  $.getJSON("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + keys.STEAM + "&steamid=76561198154675159", function (steam) {
    current1 = JSON.stringify(steam);
    if (previous1 && current1 && previous1 !== current1) $('#steamlevel').load(document.URL + ' #steamlevel');
    previous1 = current1;
    let colors = ["rgb(155, 155, 155)", "rgb(190, 40, 65)", "rgb(215, 90, 65)", "rgb(255, 205, 35)",
      "rgb(70, 120, 60)", "rgb(80, 140, 220)", "rgb(120, 80, 200)",
      "rgb(195, 80, 200)", "rgb(85, 35, 55)", "rgb(155, 125, 80)"], colorlevel = null, level = steam.response.player_level;
    $('#steamlevel').html(level);
    for (let i = 0, mul = 0, stop = 0; i < 2; i++) {
      if (level >= 0 + mul && level <= 9 + mul) {
        stop = 1;
        colorlevel = colors[mul/10];
      }
      if (stop == 0) {
        i = 0;
        mul+= 10;
      }
    }
    $('#steamlevel').css({ "border": "2px solid " + colorlevel });
  });
}, 1000);

setInterval(function () {
  $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&forUsername=PlayerInsideIT&key=" + keys.GOOGLE, function (yt) {
    current2 = JSON.stringify(yt);
    if (previous2 && current2 && previous2 !== current2) $('#steamlevel').load(document.URL + ' #steamlevel');
    previous2 = current2;
    $('.yturl').attr("href", "https://www.youtube.com/channel/" + yt.items[0].id);
    $('#yticon').attr("src", yt.items[0].snippet.thumbnails.medium.url);
    $('#ytnick').html("<span id='favyt'>Favourite Youtuber</span><br>" + yt.items[0].snippet.title);
    $('#ytsubs').html("<span style='color: rgb(225, 0, 0)'>Subscribers</span><br>" + parseInt(yt.items[0].statistics.subscriberCount).toLocaleString());
    $('#ytvideos').html("<span style='color: rgb(225, 0, 0)'>Uploads</span><br>" + parseInt(yt.items[0].statistics.videoCount).toLocaleString());
    $('#ytviews').html("<span style='color: rgb(225, 0, 0)'>Views</span><br>" + parseInt(yt.items[0].statistics.viewCount).toLocaleString());
  });
}, 1000);

$.getJSON("https://api.github.com/users/zAlweNy26?client_id=" + keys.GITHUBID + "&client_secret=" + keys.GITHUB, function (git) {
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

$.getJSON("https://kitsu.io/api/edge/anime?filter[text]=trigun", function (anime) {
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
});