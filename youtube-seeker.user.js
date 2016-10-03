// ==UserScript==
// @name        YouTube seeker
// @namespace  http://aycabta.github.io/
// @version    0.1.0
// @description  benry
// @include    /^https:\/\/www\.youtube\.com\/watch\?v=/
// @copyright  2016+, Code Ass
// ==/UserScript==

(function() {
    var player = document.getElementById("movie_player");
    var savedTime = null;
    var seekSeconds = 5;
    document.addEventListener("keydown", function(e) {
        var to = null;
        switch (e.keyCode) {
            case 219: // [
                seekSeconds--;
                console.log("seek with " + seekSeconds + " seconds");
                break;
            case 221: // ]
                seekSeconds++;
                console.log("seek with " + seekSeconds + " seconds");
                break;
            case 85: // u
                to = player.getCurrentTime() - seekSeconds;
                break;
            case 79: // o
                to = player.getCurrentTime() + seekSeconds;
                break;
            case 83: // s
                savedTime = player.getCurrentTime();
                break;
            case 82: // r
                if (savedTime !== null) {
                    to = savedTime;
                }
                break;
            case 73: // i ...secret feature
                switch (player.getPlayerState()) {
                    case 1: // playing
                        player.pauseVideo();
                        break;
                    default:
                        player.playVideo();
                        break;
                }
                break;
        }
        if (to !== null) {
            if (to < 0) {
                to = 0;
            } else if (to > player.getDuration()) {
                to = player.getDuration();
            }
            player.seekTo(to, true);
        }
    });
})();
