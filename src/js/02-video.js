import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
    
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const KEY_VALUE = 'videoplayer-current-time';

const onPlay = function ({ seconds }) { localStorage.setItem(KEY_VALUE, seconds) };

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(KEY_VALUE)).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


