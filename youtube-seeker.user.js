// ==UserScript==
// @name       YouTube Seeker
// @license    MIT
// @namespace  https://github.com/aycabta
// @version    0.2.1
// @description  benry
// @include    /^https:\/\/www\.youtube\.com\/watch\?.*v=.*$/
// @copyright  2016+, Code Ass
// ==/UserScript==

(function() {
    function initialize() {
        var savedTime = null;
        var seekSeconds = 5;
        var isShownControls = true;
        var leftControls = document.getElementsByClassName('ytp-left-controls')[0];
        var secondsInfo = document.createElement('div');
        secondsInfo.style.color = '#BBB';
        secondsInfo.classList.add('ytp-time-display');
        secondsInfo.classList.add('notranslate');
        var secondsText = document.createTextNode('seek ' + seekSeconds.toString(10))
        secondsInfo.appendChild(secondsText);
        leftControls.appendChild(secondsInfo);
        document.addEventListener("keydown", function(e) {
            var to = null;
            var player = document.getElementById("movie_player");
            switch (e.keyCode) {
                case 219: // [
                    seekSeconds--;
                    console.log("seek with " + seekSeconds + " seconds");
                    secondsText.textContent = 'seek ' + seekSeconds.toString(10);
                    break;
                case 221: // ]
                    seekSeconds++;
                    console.log("seek with " + seekSeconds + " seconds");
                    secondsText.textContent = 'seek ' + seekSeconds.toString(10);
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
                case 72: // h
                    if (isShownControls) {
                        player.hideControls();
                        isShownControls = false;
                    } else {
                        player.showControls();
                        isShownControls = true;
                    }
                    break;
                case 73: // i
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
                console.log("seek to " + to);
                player.seekTo(to, true);
            }
        });
    };

    if (window.top === window.self) {
        var script = document.createElement ('script');
        script.textContent = '(' + initialize.toString() + ')()';
        var head = document.getElementsByTagName ('head')[0];
        setTimeout(function() {
            head.appendChild(script);
        }, 200);
    }
})();
