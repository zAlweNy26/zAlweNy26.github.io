function animateProgress($progressBar, val, currentVal) {
    currentVal = currentVal || 0;
    var step = val * 15 / 1000;
    function animate(currentVal) {
        currentVal += step;
        $progressBar.val(currentVal);
        currentVal < val && requestAnimationFrame(function() {
            animate(currentVal);
        });
    }
    animate(currentVal);
}

window.onload = function() {
    if ($(window).width() < 1280) {
        $("progress").each(function() {
            animateProgress($(this), $(this).val());
        });
    }
    
    const getWindowDimensions = () => {
    const width = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );

    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );

    return { width, height };
  };

  const el = document.getElementById('dimensions');
  const dimensions = JSON.stringify( getWindowDimensions() );

  el.innerHTML = dimensions;
};

$("#switch").click(function() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000);
    $("html").attr("data-theme", $("html").attr("data-theme") == "dark" ? "light" : "dark");
});

$(".flip").click(function() {
    if ($(".flip").hasClass("is-flipped")) $(".flip").removeClass('is-flipped');
    else {
        $(".flip").addClass('is-flipped');
        $("progress").each(function() {
            animateProgress($(this), $(this).val());
        });
    }
});

$("#gh").hover(
    function() {
        $('#profileicon').attr("src", gitprofileicon);
        $('#name').html(gitname);
        $('#desc').html(gitdesc);
        $('#info1').html(gitinfo1);
        $('#info2').html(gitinfo2);
        $("#gitorg").css({
            'display' : 'initial'
        });
        $("#popup").css({
            'animation' : 'scaleUp 0.75s both'
        });
        /*$("#popup::after").css({
            'border-top-color' : '#01ffcd',
            'left' : '25%',
        });*/
    }, function() {
        $("#popup").css({
            'animation' : 'scaleDown 0.75s both',
        });
    }
);

$("#tw").hover(
    function() {
        $("#gitorg").css({
            'display' : 'none'
        });
        $('#profileicon').attr("src", twitchprofileicon);
        $('#name').html(twitchname);
        $('#desc').html(twitchdesc);
        $('#info1').html(twitchinfo1);
        $('#info2').html(twitchinfo2);
        $("#popup").css({
            'animation' : 'scaleUp 0.75s both'
        });
        /*$("#popup::after").css({
            'border-top-color' : '#00ff00',
            'left' : '75%',
        });*/
    }, function() {
        $("#popup").css({
            'animation' : 'scaleDown 0.75s both',
        });
    }
);
