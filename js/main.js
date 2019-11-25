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
    $("progress").each(function() {
        animateProgress($(this), $(this).val());
    });
};

$("#gh").hover(
    function() {
        $('#profileicon').attr("src", gitprofileicon);
        $('#name').html(gitname);
        $('#desc').html(gitdesc);
        $('#info1').html(gitinfo1);
        $('#info2').html(gitinfo2);
        $("#popup").css({
            'animation' : 'scaleUp 0.75s both'
        });
        $("#popup::after").css({
            'border-top-color' : '#01ffcd',
            'left' : '25%',
        });
    }, function() {
        $("#popup").css({
            'animation' : 'scaleDown 0.5s both',
        });
    }
);

$("#tw").hover(
    function() {
        $('#profileicon').attr("src", twitchprofileicon);
        $('#name').html(twitchname);
        $('#desc').html(twitchdesc);
        $('#info1').html(twitchinfo1);
        $('#info2').html(twitchinfo2);
        $("#popup").css({
            'animation' : 'scaleUp 0.75s both'
        });
        $("#popup::after").css({
            'border-top-color' : '#00ff00',
            'left' : '75%',
        });
    }, function() {
        $("#popup").css({
            'animation' : 'scaleDown 0.5s both',
        });
    }
);